var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;/**
 * @author ©Towns.cz
 * @fileOverview Creating namespace Towns
 */
//======================================================================================================================


global.Towns = {};
module.exports = global.Towns;


var T = global.Towns;


/**
 * @author ©Towns.cz
 * @fileOverview Creates static class game
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;



/**
 *
 * @param {array} action_type_list
 * @param {function} max_life_modifier
 * @param {function} price_key_modifier
 * @constructor
 */
A.Game = function(action_type_list,max_life_modifier,price_key_modifier){

    this.action_type_list = action_type_list;
    this.max_life_modifier = max_life_modifier;
    this.price_key_modifier = price_key_modifier;

};



/**
 *
 * @param {object} Object
 * @return {array} of numbers
 */
A.Game.prototype.getObjectPriceBases = function(object){

    var self=this;
    var price_bases=[];


    if(typeof object.actions=='undefined'){
        return([]);
    }


    object.actions.forEach(function(action){


        if(typeof self.action_type_list[action.type]!='undefined'){

            var action_type = self.action_type_list[action.type];

            //---------------Checking params
            for(var param in action_type.params){
                var param_type = action_type.params[param];

                if(typeof action.params[param]!=param_type){
                    throw new Error('Param '+param+' should be '+param_type+' in action '+action.type);
                }

            }
            //---------------

            var price_base = Math.ceil(action_type.price_base(action.params));//

            //---------------Checking non negative value
            if(price_base<0){
                throw new Error('Params in action '+action.type+' should not make this action negative');
            }
            //---------------


            price_bases.push(price_base);

        }else{
            throw new Error('Unknown action type '+action.type);
        }


    });

    return(price_bases);

};



/**
 *
 * @param {object} Object
 * @return {number} maximum life of object
 */
A.Game.prototype.getObjectMaxLife = function(object){

    var price_bases=this.getObjectPriceBases(object);
    var price_base = price_bases.reduce(function(pv, cv) { return pv + cv; }, 0);


    price_base=this.max_life_modifier(price_base);

    return(price_base);

};




/**
 *
 * @param {object} Object
 * @return {array} of Resources
 */
A.Game.prototype.getObjectPrices = function(object){

    //console.log(this);

    var price_bases=this.getObjectPriceBases(object);


    var self=this;
    var prices=[];


    if(typeof object.actions=='undefined'){
        return([]);
    }

    var design_resources = self.getObjectDesignPrice(object);

    object.actions.forEach(function(action,i){

        var action_type = self.action_type_list[action.type];


        action_type.price_resources_list.sort(function(A,B){//todo is it safe?

            return design_resources.compare(A.clone().signum())-design_resources.compare(B.clone().signum());

        });


        var price_resources = action_type.price_resources_list[0].clone();


        price_resources.multiply(price_bases[i]);
        prices.push(price_resources);


    });

    return(prices);

};



/**
 *
 * @param {object} Object
 * @return {object} Resources - price of object
 */
A.Game.prototype.getObjectPrice = function(object){

    var price = new T.Resources({});

    //console.log('empty price',price);

    var prices=this.getObjectPrices(object);

    prices.forEach(function(price_){

        price.add(price_);

    });

    price.apply(this.price_key_modifier);

    return(price);

};


/**
 * todo maybe this should be under model.class.js?
 * @param {object} Object
 * @return {object} Resources - design amount of resources
 */
A.Game.prototype.getObjectDesignPrice = function(object){

    if(!object.hasOwnProperty('design'))throw new Error('Object should have design!');
    if(object.design.type!='model')throw new Error('Object should have design of type model!');


    var price = new T.Resources({});


    model = new T.Model(object.design.data);

    linear_particles = model.getLinearParticles();


    linear_particles.forEach(function(linear_particle){

        var volume=
            linear_particle.size.x *
            linear_particle.size.y *
            linear_particle.size.z;

        var material=linear_particle.material.split('_');
        material=material[0];

        var price_={};
        price_[material]=volume;

        price.add(price_);

    });

    /*console.log('price of');
    console.log(object.design.data);
    console.log(price);*/

    //price.multiply(0.01);

    return(price);

};

/**
 * @author ©Towns.cz
 * @fileOverview Creates class actions
 */
//======================================================================================================================
T.Game = T.Game || {};
var A/*Actual Namespace*/ = T.Game;




/**
 *
 * @param {string} type enum('active', 'passive', 'triggered') //todo refactor
 * @param {object} params {param: type}
 * @param {function} price_base
 * @param {array} price_resources_list
 * @param {function} perform
 * @constructor
 */
A.ActionType = function(type, params, price_base, price_resources_list, perform){
    this.type = type;
    this.params = params;
    this.price_base = price_base;
    this.price_resources_list = price_resources_list;
    this.perform = perform;
};


/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;



/**
 *
 * @param {function} getZ
 * @param {Array} z_normalizing_table
 * @param {T.MapGenerator.Biotope} biotope
 * @param {function} virtualObjectGenerator
 * @constructor
 */
A.MapGenerator = function(getZ,z_normalizing_table,biotope,virtualObjectGenerator){

    this.getZ = getZ;
    this.z_normalizing_table = z_normalizing_table;
    this.biotope = biotope;
    this.virtualObjectGenerator = virtualObjectGenerator;


};


/**
 *
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.getZMapCircle = function(center_integer,radius){

    var map=[];

    for(var y=0;y<=radius*2;y++){

        map[y]=[];

        for(var x=0;x<=radius*2;x++){


            if(
                Math.pow(x-radius+1/2,2)
                +
                Math.pow(y-radius+1/2,2)
                >
                Math.pow(radius,2)
            )continue;


            var z = this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);


            map[y][x] = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];




        }
    }

    return(map);

};


/**
 *
 * @param {Array} map
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.terrainMap = function(map){

    var map_bg=[];

    for(var y=0,l=map.length;y<l;y++){
        map_bg[y]=[];
        for(var x=0;x<l;x++){

            if(typeof(map[y][x])==='undefined')continue;

            map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);

        }
    }

    return(map_bg);

};


/**
 *
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.getMapArrayCircle = function(center_integer,radius){


    var bounds=1;


    var z_map=this.getZMapCircle(center_integer,radius);

    var map=this.terrainMap(z_map);

    return(map);

};



/**
 *
 * @param {Array} map_array
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.convertMapArrayToObjects = function(map_array,center_integer,radius){

    var objects= new T.Objects.Array();

    for (var y = 0; y < radius * 2; y++) {
        for (var x = 0; x < radius * 2; x++) {

            if (typeof(map_array[y][x]) === 'undefined')continue;


            var object = new T.Objects.Terrain(map_array[y][x]);


            object.x=center_integer.x-radius+x;
            object.y=center_integer.y-radius+y;


            objects.push(object);


        }
    }

    return(objects);
};


/**
 *
 * @param {T.Position} center
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.getPureMap = function(center,radius){

    center_integer={
        x: Math.floor(center.x),
        y: Math.floor(center.y)
    };

    var map_array = this.getMapArrayCircle(center_integer,radius);
    var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);
    return(objects);

};


/**
 *
 * @param {T.Objects.Array} objects
 * @returns {T.Objects.Array}
 * @private
 */
A.MapGenerator.prototype.getVirtualObjectsFromTerrainObjects = function(objects){

    var self = this;

    var virtual_objects = [];
    objects.get1x1TerrainObjects().forEach(function(object){

        self.virtualObjectGenerator(object,virtual_objects);

    });

    return(virtual_objects);

};





//=================================================PUBLIC===============================================================


/**
 * Complete terrain and virtual objects into Objects Array
 * @param {T.Objects.Array} real_objects
 * @param {T.Position} center
 * @param {number} radius
 * @param {boolean} virtual_objects
 * @returns {T.Objects.Array}}
 */
A.MapGenerator.prototype.getCompleteObjects = function(real_objects,center,radius,virtual_objects){

    if(typeof virtual_objects == 'undefined')virtual_objects = true;


    var complete_objects = this.getPureMap(center, radius);



    real_objects.forEach(function(object){
        complete_objects.push(object);
    });



    if(virtual_objects){

        var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);

        virtual_objects.forEach(function(object){
            complete_objects.push(object);
        });

    }




    return(complete_objects);

};










/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.MapGenerator = T.MapGenerator || {};
var A/*Actual Namespace*/ = T.MapGenerator;



/**
 *
 * @param {Array} terrains
 * @constructor
 */
A.Biotope = function(terrains){

    var sum=0;
    terrains.forEach(function(terrain){
        sum+=terrain.amount;
    });


    var from=0;
    terrains.forEach(function(terrain){

        terrain.from=from/sum;
        from+=terrain.amount;

    });

    //console.log(terrains);
    this.terrains = terrains;

};


/**
 *
 * @param {number} z
 * @returns {T.Objects.Terrain}
 */
A.Biotope.prototype.getZTerrain = function(z){


    for(var i=this.terrains.length-1;i>=0;i--){

        if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

    }


};


/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Math
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;




A.Math = {};



/**
 *
 * @static
 * @param {number}
 * @return {number}
 */
A.Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};

//-------------------------

/**
 *
 * @static
 * @param base
 * @param number
 * @returns {number}
 */
A.Math.baseLog = function(base, number) {
    return Math.log(number) / Math.log(base);
};

//-------------------------

/**
 *
 * @static
 * @param {number} number
 * @param {number} number_of_non_zero_digits
 * @return {number} Cuts unless digits to zero
 */
A.Math.prettyNumber = function(number,number_of_non_zero_digits){

    number_of_non_zero_digits = number_of_non_zero_digits || 2;//todo refactor like this


    var digits=Math.ceil(T.Math.baseLog(10,number));
    var k = Math.pow(10,number_of_non_zero_digits-digits);

    //console.log(digits,k);


    number=number*k;
    //console.log(number);
    number=Math.round(number);
    //console.log(number);
    number=number/k;

    //console.log(number);

    return number;

};

//-------------------------

/**
 * Difference between two angeles
 * @static
 * @param {number} degrees 1
 * @param {number} degrees 2
 * @return {number} degrees difference
 */
A.Math.angleDiff = function(deg1,deg2){
    var a = deg1 - deg2;
    var a = (a + 180) % 360 - 180;
    return(a);
};

//-------------------------

/**
 * @static
 * @param {number} radians
 * @return {number} degrees
 */
A.Math.rad2deg = function(radians){
    return(radians * (180/Math.PI));
};

//-------------------------

/**
 * @static
 * @param {number} degrees
 * @return {number} radians
 */
A.Math.deg2rad = function(degrees){
    return(degrees * (Math.PI/180));
};

//-------------------------

/**
 * @static
 * @param x
 * @param y
 * @return {number} distance
 */
A.Math.xy2dist = function(x,y){
    return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
};


//-------------------------

//todo refactor to position
A.Math.xy2distDeg = function(x,y){

    var output={};

    output['dist'] = this.xy2dist(x,y);
    output['deg'] = this.rad2deg(Math.atan2(y,x));

    return(output);

};

//-------------------------

//todo refactor to position
A.Math.distDeg2xy = function(dist,deg){

    var rad=this.deg2rad(deg);

    var output={};

    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//-------------------------

//todo mybe refactor to position
A.Math.xyRotate = function(x,y,deg){

    //nevyuzivam funkce Towns.A.xy2distDeg a A.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
    var dist = this.xy2dist(x,y);
    var rad = Math.atan2(y,x);

    rad += this.deg2rad(deg);

    var output={};
    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//======================================================================================================================


A.Math.randomSeedPosition = function(seed,position){


    return (Math.sin(Math.pow((position.x*position.y)-seed,2))+1)/2;

};

//======================================================================================================================


/**
 * Converts multitype to float
 * @static
 * @param value
 * @param {number} defval
 * @return {number}
 */
A.Math.toFloat = function(value,defval){

    if(typeof defval === 'undefined')defval=0;
    if(typeof value ==='undefined')return(defval);

    value=parseFloat(value);
    if(isNaN(value)){
        return(defval);
    }else{
        return(value);
    }

};

//----------------------------------------------------------

/**
 * Converts multitype to integer
 * @static
 * @param value
 * @param {number} defval
 * @return {number}
 */
A.Math.toInt = function(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseInt(value);
    if(isNaN(value)){
        return(defval);
    }else{
        return(value);
    }

};

//----------------------------------------------------------

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
A.Math.bounds = function(value,min,max){

    if(value<min)return min;
    if(value>max)return max;
    return value;

};


//----------------------------------------------------------

/**
 * Is line A colliding line B?
 * @static
 * @param a1x
 * @param a1y
 * @param a2x
 * @param a2y
 * @param b1x
 * @param b1y
 * @param b2x
 * @param b2y
 * @return {boolean}
 */
A.Math.lineCollision = function(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y){



    var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
    var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
    var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));

    // Detect coincident lines (has a problem, read below)
    if (denominator == 0){

        //var collision= (numerator1 == 0 && numerator2 == 0);
        collision=false;

    }else{

        var r = numerator1 / denominator;
        var s = numerator2 / denominator;

        var collision=((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

    }




    //-------------------------------Debug TDD

    /*var size=50;
    var src=createCanvasViaFunctionAndConvertToSrc(
        size*2,size*2,function(ctx){

            //ctx.strokeStyle = '#000000';
            //ctx.strokeWidth = 2;

            ctx.beginPath();
            ctx.moveTo(a1x+size,a1y+size);
            ctx.lineTo(a2x+size,a2y+size);
            ctx.stroke();
            ctx.closePath();


            ctx.beginPath();
            ctx.moveTo(b1x+size,b1y+size);
            ctx.lineTo(b2x+size,b2y+size);
            ctx.stroke();
            ctx.closePath();

        }


    );
    $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');*/

    //-------------------------------

    //console.log(collision);

    return collision;

};







A.Math.blurXY = function(generator,blur) {

    return(function (x, y) {

        var sum = 0;
        var count = 0;


        for (xx = x - blur; xx <= x + blur; xx++) {

            for (yy = y - blur; yy <= y + blur; yy++) {

                if (Math.pow(blur, 2) < Math.pow(xx - x, 2) + Math.pow(yy - y, 2))continue;

                sum += generator(xx, yy);
                count++;

            }
        }

        return (sum / count);

    });

};




A.Math.bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Model
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;
module.exports = Towns;




/**
 * @param {object} Model json
 * @return {boolean} false in case of fail
 * @constructor
 */
A.Model = function (json){

    if(typeof(json)=='undefined')return false;

    this.name=json.name;
    this.particles=json.particles;
    this.rotation=json.rotation;
    this.size=json.size;

    if(typeof(this.rotation)=='undefined')this.rotation=0;
    if(typeof(this.size)=='undefined')this.size=1;
};
//==================================================

/**
 * @param {number} rotation
 * @param {number} size
 */
A.Model.prototype.addRotationSize = function(rotation,size){

    if(typeof rotation === 'undefined')rotation=0;
    if(typeof size === 'undefined')size=1;

    this.rotation+=rotation;
    this.size=this.size*size;

};






//==================================================

//todo jsdoc
A.Model.prototype.clone = function(){

    return new T.Model(JSON.parse(JSON.stringify(this)));

};


//==================================================

/**
 * @param {string} dimension x,y,z,xy
 * @return {number} range
 */
A.Model.prototype.range = function(dimension){

    if(dimension=='xy'){

        return T.Math.xy2dist(this.range('x'),this.range('y')*this.size);

    }


    var particlesLinear=this.getLinearParticles();

    var max=false,min=false,max_,min_;
    for(var i in particlesLinear){


        min_=particlesLinear[i].position[dimension];
        max_=particlesLinear[i].position[dimension]+particlesLinear[i].size[dimension];

        //todo feature reverse

        if(max===false)max=max_;
        if(min===false)min=min_;


        if(max_>max)max=max_;
        if(min_<min)min=min_;

    }


    return(Math.abs(min-max)/*this.size*/);//todo rotation



};


//==================================================

/**
 * @param {number} move_x
 * @param {number} move_y
 * @param {number} move_z
 */
A.Model.prototype.moveBy = function(move_x,move_y,move_z){

    if(typeof move_x === 'undefined')move_x=0;
    if(typeof move_y === 'undefined')move_y=0;
    if(typeof move_z === 'undefined')move_z=0;

    for(var i in this.particles){


        this.particles[i].position.x+=move_x;
        this.particles[i].position.y+=move_y;
        this.particles[i].position.z+=move_z;

    }



};
//==================================================

/**
 * Return Z of joining model
 * @param {object} Model
 * @param {number} move_x
 * @param {number} move_y
 */
A.Model.prototype.joinModelZ = function(model,move_x,move_y){//todo second param should be position

    //var  model_=deepCopyModel(model);
    //model_.moveBy(move_x,move_y);//todo maybe delete moveBy

    //var max_z=this.range('z');


    var this_linear_particles=this.getLinearParticles();
    var model_linear_particles=model.getLinearParticles();


    var distances=[0];
    for(var i in model_linear_particles){

        model_linear_particles[i].position.x+=move_x;
        model_linear_particles[i].position.y+=move_y;

        for(var ii in this_linear_particles){//todo maybe optimize by pre-sorting


            if(Particles.collision2D(this_linear_particles[ii],model_linear_particles[i])){

                r(this_linear_particles[ii],model_linear_particles[i]);


                distances.push(this_linear_particles[ii].position.z+this_linear_particles[ii].size.z);

            }



        }

    }

    var max_z=Math.max.apply(Math,distances);

    return max_z;

};
//==================================================

/**
 * Join models together
 * @param {object} Model
 * @param {number} move_x
 * @param {number} move_y
 */
A.Model.prototype.joinModel = function(model,move_x,move_y){//todo second param should be position

    var max_z=this.joinModelZ(model,move_x,move_y);


    this.particles=[
        JSON.parse(JSON.stringify(this)),
        JSON.parse(JSON.stringify(model))
    ];

    this.particles[1].position={
        x:move_x,
        y:move_y,
        z:max_z
    };

    this.rotation=0;
    this.size=1;

};



//======================================================================================================================


/**
 * Deep copy this and converts links to raw data
 * @returns {object} Model
 */
A.Model.prototype.getDeepCopyWithoutLinks = function() {


    var model = this.clone();

    //---------------------------------------------Convert links to raw data


    var findParticleByName = function (particles, name) {//todo move to prototype

        for (var i in particles) {

            if (particles[i].name == name) {
                return (particles[i]);
            }

            if (typeof(particles[i].particles)!='undefined') {
                var finded_particle = findParticleByName(particles[i].particles, name);

                if (finded_particle !== false) {
                    return (finded_particle);
                }

            }


        }

        return (false);

    };


    var particlesLinks = function (particles) {//todo move to prototype


        //r(particles);

        for (var i in particles) {


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Link
            if (typeof(particles[i].link)!='undefined') {


                var linked_particle = findParticleByName(model.particles, particles[i].link);

                if (linked_particle == false) {
                    throw new Error('Invalid link ' + particle.link);
                }

                linked_particle = JSON.parse(JSON.stringify(linked_particle));

                if (typeof(particles[i].rotation)!='undefined') {
                    linked_particle.rotation = particles[i].rotation;
                }
                if (typeof(particles[i].size)!='undefined') {
                    linked_particle.size = particles[i].size;
                }
                if (typeof(particles[i].position)!='undefined') {
                    linked_particle.position = particles[i].position;
                }
                //todo skew


                particles[i] = linked_particle;
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Group
            if (typeof(particles[i].particles)!='undefined') {

                particlesLinks(particles[i].particles);

            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        }

    };


    particlesLinks(model.particles);

    return(model);

};


//======================================================================================================================


/**
 * Get 1D array of particles
 * @returns {Array} array of particles
 */
A.Model.prototype.getLinearParticles = function(){


    var particlesLinear=[];

    //---------------------------------------------Convert particles to 1D particles

    var particles2Linear = function(particles,position,rotation,size){//todo move to prototype

        if(typeof position === 'undefined')position=false;
        if(typeof rotation === 'undefined')rotation=0;
        if(typeof size === 'undefined')size=1;


        if(position===false){
            position={
                x:0,
                y:0,
                z:0
            };
        }

        particles.forEach(function(particle){

            //particle=deepCopy(particle);



            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Default params of particle, group or link
            if(!particle.position){
                particle.position={
                    x:0,
                    y:0,
                    z:0
                }
            }
            if(typeof(particle.rotation)=='undefined')particle.rotation=0;
            if(typeof(particle.size)=='undefined')particle.size=1;
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Position, Rotation and size //todo skew

            var distDeg = T.Math.xy2distDeg(particle.position.x, particle.position.y);

            distDeg.dist = distDeg.dist * size;
            distDeg.deg += rotation;

            var xy = T.Math.distDeg2xy(distDeg.dist, distDeg.deg);

            particle.rotation += rotation;

            particle.position.x = xy.x;
            particle.position.y = xy.y;
            particle.position.z = particle.position.z * size;

            particle.position.x += position.x;
            particle.position.y += position.y;
            particle.position.z += position.z;

            if(typeof particle.size == 'number') {

                particle.size = particle.size * size;

            }else{

                particle.size.x = particle.size.x * size;
                particle.size.y = particle.size.y * size;
                particle.size.z = particle.size.z * size;

            }

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




            //------------------------------------------Particle
            if(typeof(particle.particles)!='undefined'){

                particles2Linear(particle.particles,particle.position,particle.rotation,particle.size);

            }else
            //------------------------------------------Group
            if(typeof(particle.shape)!='undefined'){

                particlesLinear.push(particle);

            }
            //------------------------------------------



        });


    };

    var model=this.getDeepCopyWithoutLinks();

    particles2Linear(model.particles,false,model.rotation,model.size);

    //todo strict mode//delete model;

    return(particlesLinear);

};

//======================================================================================================================

/**
 *
 * @param path
 * @returns {object} part of this
 */
A.Model.prototype.filterPath = function(path){

    var model=this;

    if(typeof(path.forEach)=='undefined'){
        r(path);
        throw new Error('Path is not correct array.');
    }


    path.forEach(function(i){
        model = model.particles[i];
    });


    return(model);

};



//======================================================================================================================

/**
 *
 * @param path
 * @returns {object} part of this
 */
A.Model.prototype.filterPathSiblings = function(path){

    var model=this.getDeepCopyWithoutLinks();
    var current=model;

    if(typeof(path.forEach)=='undefined'){
        r(path);
        throw new Error('Path is not correct array.');
    }


    path.forEach(function(particle_i,path_ii){

        /*if(path_ii<path.length-1){

         current = current.particles[particle_i];

         }else{*/

        var me = current.particles[particle_i];

        current.particles = [me];

        current=me;
        //}


    });

    return(model);

};


/**
 * @author Towns.cz
 * @fileOverview Creates object Particles with static methods
 */
//======================================================================================================================
T.Model = T.Model || {};
var A/*Actual Namespace*/ = T.Model;



A.Particles = {};


/**
 * Add missing params into particle
 * @static
 * @param {object} particle
 * @return {object} particle
 */
A.Particles.cParams = function(particle){//todo ?? maybe rename


    if(typeof particle.skew==='undefined'){
        particle.skew={};
    }
    if(typeof particle.skew.z==='undefined'){
        particle.skew.z={x:0,y:0};
    }

    //-------------

    if(typeof particle.shape.top === 'undefined') {
        particle.shape.top = 1;
    }


    if(typeof particle.shape.bottom === 'undefined') {
        particle.shape.bottom = 1;
    }


    if(typeof particle.rotation === 'undefined'){
        particle.rotation=0;
    }

    return(particle);

};


//======================================================================================================================

/**
 * Get 3D model from particle
 * @static
 * @param particle
 * @return {object} 3D model
 */
A.Particles.get3D = function(particle){

    var resource={};



    particle= T.Model.Particles.cParams(particle);//todo refactor use replace cParams with ||

    if(particle.shape.type=='prism') {

        //-------------------------------------------------------------------prism

        var x = particle.position.x;
        var y = particle.position.y;
        var z = particle.position.z;// * 2;


        var x_ = particle.size.x;
        var y_ = particle.size.y;
        var z_ = particle.size.z;


        //r(x_,y_);
        //r(particle.shape.n);


        /**/
        resource.points=[];
        resource.polygons=[[],[]];
        resource.polygons2D=[[],[]];

        for(var level=0;level<2;level++){


            //---------------------------


            if(level==0){
                var base=particle.shape.bottom;

            }else{
                var base=particle.shape.top;
            }


            //--------

            for(var n = 0;n<particle.shape.n;n++){

                //------------------XYZ ratio

                if(!is(particle.shape.rotated)){

                    var x__=0.5*x_*Math.cos(n/particle.shape.n*Math.PI*2+T.Math.deg2rad(180+180/particle.shape.n))*base+x_*(level*particle.skew.z.x),
                        y__=0.5*y_*Math.sin(n/particle.shape.n*Math.PI*2+T.Math.deg2rad(180+180/particle.shape.n))*base+y_*(level*particle.skew.z.y),
                        z__=z_*level;

                }else{

                    var tmp=(2-(Math.cos(T.Math.deg2rad(180/particle.shape.n))));//todo better

                    var x__=x_*((level*2)-1);//*(level-0.5);//+x_*(level*particle.skew.z.x),

                        y__=0.5*y_*Math.sin(n/particle.shape.n*Math.PI*2+T.Math.deg2rad(180+180/particle.shape.n));//+y_*(level*particle.skew.z.y),


                        z__=(1)*0.5*(


                                z_*Math.cos(n/particle.shape.n*Math.PI*2+T.Math.deg2rad(180+180/particle.shape.n))*tmp


                                +z_*((Math.cos(T.Math.deg2rad(180/particle.shape.n))))*tmp
                            );

                }




                //------------------ XY Rotation

                var DistDeg_=T.Math.xy2distDeg(x__,y__);//todo refactor all like DistDeg, etc...
                DistDeg_.deg+=particle.rotation;
                var xy_=T.Math.distDeg2xy(DistDeg_.dist,DistDeg_.deg);

                x__=xy_.x;
                y__=xy_.y;



                //------------------

                resource.points.push([x+x__,y+y__,z+z__]);



                if(level==0){

                    //r(n,1,particle.shape.n,(n+1+particle.shape.n));
                    resource.polygons[0].push(n+1);
                    resource.polygons[1].push(n+1+particle.shape.n);

                    resource.polygons2D[0].push(n+1);
                    resource.polygons2D[1].push(n+1+particle.shape.n);


                    resource.polygons.push([
                        (n!=0?n:particle.shape.n),
                        n+1,
                        n+1+particle.shape.n,
                        (n!=0?n:particle.shape.n)+particle.shape.n

                    ]);

                }

            }
        }/**/

        //-------------------------------------------------------------------
    }else{

        throw 'Unknown particle shape '+particle.shape.type;

    }

    return resource;

};


/**
 * Get 2D lines from particle
 * @static
 * @param {object} particle
 * @param {number} base 0=bottom, 1=top
 * @return {Array} 2D lines
 */
A.Particles.get2Dlines = function(particle,base){


    var resource=this.get3D(particle);

    var lines=[];

    var polygons2D=[resource.polygons2D[base]];

    for(var pn in polygons2D){

        /*lines[pn]=[];

        for(var pt in resource.polygons[pn]) {

            var point = resource.points[resource.polygons[pn][pt] - 1];
            lines[pn][ps] = [point[0], point[1]];

        }*/

        for(var i=-1,l=polygons2D[pn].length;i<l-1;i++){


            if(i!=-1)
                var point1=i;
            else
                var point1=l-1;

            var point2=i+1;


            //r(resource.polygons[pn],point1);

            point1 = resource.points[polygons2D[pn][point1] - 1];
            point2 = resource.points[polygons2D[pn][point2] - 1];


            lines.push(
                [
                    {
                        x: point1[0],
                        y: point1[1]
                    },{
                        x: point2[0],
                        y: point2[1]
                    }
                ]
            );


        }

    }



    //r(lines);

    return(lines);

};


//======================================================================================================================

//todo maybe refactor move to Math
/**
 * Detect collision between 2 2D lines
 * @static
 * @param {array} lines1
 * @param (array) lines2
 * @return {boolean}
 */
A.Particles.collisionLinesDetect = function(lines1,lines2){

    for (var i1 in lines1) {
        for (var i2 in lines2) {

            if (T.Math.lineCollision(
                    lines1[i1][0].x,
                    lines1[i1][0].y,
                    lines1[i1][1].x,
                    lines1[i1][1].y,
                    lines2[i2][0].x,
                    lines2[i2][0].y,
                    lines2[i2][1].x,
                    lines2[i2][1].y
                )) {

                //r('collision2D is true', particle1, particle2);
                return (true);
            }


        }
    }

    return false;


};

//----------------------------------------------------------------------------------------------------------------------

/**
 * Detect collision between 2 particles
 * @static
 * @param {object} particle1 bottom
 * @param (object) particle2 top
 * @return {boolean}
 */
A.Particles.collision2D = function(particle1,particle2){


    var lines1 = Particles.get2Dlines(particle1,1);
    var lines2 = Particles.get2Dlines(particle2,0);

    //-------------------------------Corner collision


    var collision=Particles.collisionLinesDetect(lines1,lines2);

    //-------------------------------Inner convex collision

    /**/if(!collision){

        collision=function(){


            var k=100;

            for(i=0;i<2;i++){

                if(i==0){
                    var outer=JSON.parse(JSON.stringify(lines2));
                    var inner=/*deepCopy*/(lines1[0]);
                }else{
                    var outer=JSON.parse(JSON.stringify(lines1));
                    var inner=/*deepCopy*/(lines2[0]);
                }



                var inner1=JSON.parse(JSON.stringify(inner));
                var inner2=JSON.parse(JSON.stringify(inner));



                var inner_vector_x=inner[1].x-inner[0].x;
                var inner_vector_y=inner[1].y-inner[0].y;

                inner1[0].x-=inner_vector_x*k;
                inner1[0].y-=inner_vector_y*k;


                inner2[1].x+=inner_vector_x*k;
                inner2[1].y+=inner_vector_y*k;


                inner1=[inner1];
                inner2=[inner2];

                var collision1=Particles.collisionLinesDetect(inner1,outer);
                var collision2=Particles.collisionLinesDetect(inner2,outer);


                if(collision1 && collision2){

                    return(true);

                }

            }


            return(false);

        }();


    }/**/


    //-------------------------------

    //-------------------------------Debug TDD
    /**var size=100;
    var src=createCanvasViaFunctionAndConvertToSrc(
        size*2,size*2,function(ctx){

            //ctx.strokeStyle = '#000000';
            //ctx.strokeWidth = 2;

            ctx.beginPath();

            var lines_=[lines1,lines2];
            for(var key in lines_){

                ctx.beginPath();
                for(var i= 0,l=lines_[key].length;i<l;i++){

                   ctx.moveTo(lines_[key][i][0].x+size,lines_[key][i][0].y+size);
                   ctx.lineTo(lines_[key][i][1].x+size,lines_[key][i][1].y+size);

                }
                ctx.stroke();
                ctx.closePath();

            }

        }


    );
    $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');/**/
    //-------------------------------

    return(collision);


};

/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




//todo ES6 style:     A.Array = class extends Array{


/**
 *
 * @param {Array} objects
 * @constructor
 */
A.Array = function(objects){

    this.objects = [];

    if(objects instanceof Array)
        objects.forEach(this.push,this);

};


A.Array.prototype.getAll = function(){
    return this.objects;
};



A.Array.prototype.forEach = function(){
    return this.objects.forEach.apply(this.objects,arguments);
};



A.Array.initInstance = function(object) {

    //----------------------------------
    if (object.type == 'building') {

        object = new T.Objects.Building(object);

    } else if (object.type == 'terrain') {

        object = new T.Objects.Terrain(object);

    } else if (object.type == 'story') {

        object = new T.Objects.Story(object);

    } else if (object.type == 'natural') {

        object = new T.Objects.Natural(object);

    } else {
        throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
    }
    //----------------------------------

    return(object);


};


A.Array.prototype.push = function(object){
    return this.objects.push(T.Objects.Array.initInstance(object));
};


/**
 *
 * @param {string} id
 * @returns {object}
 */
A.Array.prototype.getById = function(id){

    if(typeof id!=='string')throw new Error('getById: id should be string');

    for(var i in this.objects){
        if(this.objects[i].id==id)return this.objects[i];
    }

    return null;
};


/**
 *
 * @param {string} id
 * @param {object} object
 * @returns {boolean}
 */
A.Array.prototype.setById = function(id,object){

    if(typeof id!=='string')throw new Error('setById: id should be string');

    for(var i in this.objects){
        if(this.objects[i].id==id){

            this.objects[i]=T.Objects.Array.initInstance(object);
            return(true);

        }
    }

    return false;
};




/**
 *
 * @param {string} id
 * @returns {boolean}
 */
A.Array.prototype.removeId = function(id,object){

    if(typeof id!=='string')throw new Error('removeId: id should be string');

    for(var i in this.objects){
        if(this.objects[i].id==id){

            this.objects.splice(i,1);
            return(true);

        }
    }

    return false;
};




/**
 * @param {string} type
 * @returns {T.Objects.Array}
 */
A.Array.prototype.filterTypes = function(){

    var filtered_objects=new T.Objects.Array();
    var types=Array.prototype.slice.call(arguments);

    this.forEach(function(object){

        if(types.indexOf(object.type)==-1)return;

        filtered_objects.push(object);

    });

    return(filtered_objects);
};


/**
 *
 * @param {T.Position} center
 * @param {number} radius
 * @returns {Array}
 */
A.Array.prototype.getMapOfTerrainCodes = function(center,radius){//todo maybe refactor to getTerrainCodes2DArray or getTerrainCodesMap

    /*var radius = size/2;
    var center ={
        x: topleft.x+radius,
        y: topleft.y+radius
    };*/

    //--------------------------Create empty array
    var map_array=[];
    for (var y = 0; y < radius*2; y++) {
        map_array[y]=[];
        for (var x = 0; x < radius*2; x++) {
            map_array[y][x]=false;
        }
    }

    //--------------------------

    //--------------------------Fill array


    this.objects.forEach(function(object){

        if(object.type!='terrain')return;

        if(object.design.data.size==1) {//todo is this optimalization effective?
            //--------------------------

            var x = Math.floor(object.x - center.x + radius);
            var y = Math.floor(object.y - center.y + radius);

            map_array[y][x] = object.getCode();

            //--------------------------
        }else {
            //--------------------------

            var x_from = Math.floor(object.x - center.x + radius - object.design.data.size);
            var x_to = Math.ceil(object.x - center.x + radius + object.design.data.size);

            var y_from = Math.floor(object.y - center.y + radius - object.design.data.size);
            var y_to = Math.ceil(object.y - center.y + radius + object.design.data.size);


            var xc = radius + center.x - object.x;
            var yc = radius + center.y - object.y;


            for (var y = y_from; y <= y_to; y++) {

                if (typeof map_array[y] === 'undefined')continue;

                for (var x = x_from; x <= x_to; x++) {


                    if (typeof map_array[y][x] === 'undefined')continue;


                    if (T.Math.xy2dist(x - xc, y - yc) <= object.design.data.size) {

                        map_array[y][x] = object.getCode();


                    }
                }
            }

            //--------------------------
        }

    });
    //--------------------------

    return map_array;


};





//todo jsdoc
A.Array.prototype.get1x1TerrainObjects = function(){


    var terrain_objects_1x1=new T.Objects.Array();


    var terrain_objects = this.filterTypes('terrain').getAll().reverse();//normal Array

    //--------------------------Fill array

    var blocked_positions={};

    terrain_objects.forEach(function(object){


        if(object.design.data.size==1) {
            //--------------------------

            var object_1x1 = object;

            var key = 'x'+object_1x1.x+'y'+object_1x1.y;
            if(typeof blocked_positions[key]=='undefined'){
                blocked_positions[key]=true;

                terrain_objects_1x1.push(object_1x1);

            }

            //--------------------------
        }else {
            //--------------------------

            var x_from = Math.floor(- object.design.data.size);
            var x_to = Math.ceil(object.design.data.size);

            var y_from = Math.floor(- object.design.data.size);
            var y_to = Math.ceil(object.design.data.size);




            for (var y = y_from; y <= y_to; y++) {
                for (var x = x_from; x <= x_to; x++) {

                    if (T.Math.xy2dist(x,y) <= object.design.data.size) {

                        var object_1x1 = object.clone();

                        object_1x1.design.data.size=1;
                        object_1x1.x+=x;
                        object_1x1.y+=y;

                        var key = 'x'+object_1x1.x+'y'+object_1x1.y;
                        if(typeof blocked_positions[key]=='undefined'){
                            blocked_positions[key]=true;

                            terrain_objects_1x1.push(object_1x1);

                        }



                    }
                }
            }

            //--------------------------
        }

    });
    //--------------------------

    return terrain_objects_1x1;


};




//todo jsdoc
A.Array.prototype.getTerrainOnPosition = function(position){


 for(var i=this.objects.length-1;i>=0;i--){
     if (this.objects[i].type != 'terrain')continue;


     if(this.objects[i].design.data.size<=position.getDistance(new T.Position(this.objects[i].x,this.objects[i].y))){
         return(this.objects[i]);
     }
 }

 return(null);

};




//todo jsdoc
A.Array.prototype.getNearestTerrainPositionWithCode = function(position,terrain_code){

    var terrain_objects_1x1 = this.get1x1TerrainObjects();

    var min_distance=-1;
    var nearest_terrain_1x1=false;

    terrain_objects_1x1.forEach(function(terrain_1x1){

        var distance = terrain_1x1.getPosition().getDistance(position);

        if(min_distance===-1 || min_distance>distance){
            min_distance=distance;
            nearest_terrain_1x1=terrain_1x1;
        }

    });

    if(nearest_terrain_1x1===false){

        return null;

    }else{

        return nearest_terrain_1x1.getPosition();

    }





};



/*

 A.Array.prototype.getMapOfCollisionCodes = function(real_objects,position){
 return Terrain;
 };

 */




/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Object = ((function(){"use strict";var proto$0={};

    function constructor$0(object){

        for(var key in object){

            var this_key = key;

            if(this_key=='_id')this_key='id';//todo maybe better solution

            this[this_key] = object[key];
        }

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});

    //todo jsdoc
    proto$0.getPosition = function(){
        return(new T.Position(this.x,this.y));
    };

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Building = ((function(super$0){"use strict";super$0=A.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};


    proto$0.getModel = function(){
        if(!(this.design.data instanceof T.Model)){
            this.design.data=new T.Model(this.design.data);
        }

        return(this.design.data);
    };

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Natural = ((function(super$0){"use strict";super$0=A.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};



    proto$0.getCode = function(){
        return(this.design.data.image);
    };

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Story = ((function(super$0){"use strict";super$0=A.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};

    proto$0.getMarkdown = function(){
        return(this.content.data);
    };

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;//todo refactor this should not be under MapGenerator namespace




A.Terrain = ((function(super$0){"use strict";super$0=A.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};

    proto$0.getCode = function(prefered_width){

        return(this.design.data.image);

    };


    proto$0.getColor = function(){

        return(this.design.data.color);

    };



    proto$0.clone = function(){//todo all classes should have this method

        return(new T.Objects.Terrain(JSON.parse(JSON.stringify(this))));

    };


    //todo getImage(){}


MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class Position
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;




A.Position = function(x,y){

    if(typeof x == 'object'){

        this.x= x.x;
        this.y= x.y;

    }else{

        this.x= x;
        this.y= y;

    }

};


A.Position.prototype.getMoved = function(x,y){

    return new T.Position(this.x+x,this.y+y);

};


A.Position.prototype.getDistance = function(position){

    return T.Math.xy2dist(position.x-this.x,position.y-this.y);

};



/**
 * Converts Position to simple string
 * @return {string}
 */
A.Position.prototype.toString = function(){

    return '['+this.x+','+this.y+']';

};


/**
 * @author ©Towns.cz
 * @fileOverview Creates class Resources
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;




/**
 * @param {object} Resources
 * @constructor
 */
A.Resources = function(resources){

    for(var key in resources){
        if(typeof resources[key]=='number') {
            this[key] = Math.ceil(resources[key]);
        }
    }

};





/**
 * @static
 * @return {array} new Resources
 */
A.Resources.newSingles = function(resources){

    var resources_array=[];

    for(var key in resources){
        if(typeof resources[key]=='number') {
            if(resources[key]>0) {

                var resources_={};
                resources_[key]=resources[key];

                resources_array.push(new T.Resources(resources_));

            }
        }
    }

    return resources_array;

};





/**
 * @param {number} k
 * @return {bool} success
 */
A.Resources.prototype.clone = function(){

    return new T.Resources(this);

};



/**
 * Checks whether this contains a given resources
 * @param {object} Resources
 * @return {bool} contains
 */
A.Resources.prototype.contains = function(resources){

    for(var key in resources){

        if(typeof this[key]=='number'){
            return false;
        }

        if(this[key]<resources[key]){
            return false;
        }
    }

    return true;

};



/**
 * Add given resources
 * @param {object} Resources
 * @return {bool} success
 */
A.Resources.prototype.add = function(resources){

    for(var key in resources){

        if(typeof this[key]=='undefined'){
            this[key]=0;
        }

        if(typeof this[key]=='number') {
            this[key] += resources[key];
        }

    }

    return this;

};



/**
 * @param {number} k
 * @return this
 */
A.Resources.prototype.multiply = function(k){

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution
            this[key] = Math.ceil(this[key] * k);
        }


    }

    return this;

};



/**
 * @param {number} k
 * @return this
 */
A.Resources.prototype.signum = function(k){

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution

            if(this[key]>0){

                this[key]=1;

            }else{

                this[key]=0

            }

        }


    }

    return this;

};



/**
 * @param {function} modifier
 * @return this
 */
A.Resources.prototype.apply = function(modifier){

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution
            this[key] = modifier(this[key]);
        }

    }

    return this;

};


/**
 *
 * @return {Array} all resources keys
*/
A.Resources.prototype.extractKeys = function(){

    var keys=[];

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution
            keys.push(key);
        }


    }

    return(keys);

};


/**
 *
 * @param {object} Resoures
 * @return {number} Distance between this and given Resources
 */
A.Resources.prototype.compare = function(resoures){

    var resources_A=this;
    var resources_B=resoures;

    var keys=[];

    keys=keys.concat(resources_A.extractKeys());
    keys=keys.concat(resources_B.extractKeys());


    keys=keys.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });


    var distance=0;

    for(var i in keys){

        var key = keys[i];

        val_A = resources_A[key];
        val_B = resources_B[key];


        if(typeof val_A=='undefined')val_A=0;
        if(typeof val_B=='undefined')val_B=0;

        distance+=Math.pow(val_A-val_B,2);

    }

    distance=Math.sqrt(distance);


    return(distance);

};



/**
 * Remove given resources
 * @param {object} Resources
 * @return {bool} success
 */
A.Resources.prototype.remove = function(resources){

    if(!this.contains(resources))return false;

    for(var key in resources){

        this[key]-=resources[key];

    }

    return true;

};


/**
 * Converts Resources to simple string
 * @return {string}
 */
A.Resources.prototype.toString = function(){

    var strings = [];

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution

            if(this[key]!=0){
                strings.push(this[key]+' '+key);
            }

        }

    }

    return strings.join(', ');

};






A.Resources.prototype.toHTML = function(){//todo put url prefix into params

    var strings = [];

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution

            if(this[key]!=0){

                var name = Locale.get('resource',key);
                var value = this[key];

                value=value.toLocaleString(/*'en-US''de-DE'*/);//todo todo better solution

                strings.push('<div><img src="/media/image/resources/'+key+'.png" title="'+name+'" alt="'+name+'" >'+value+'</div>');
            }

        }

    }
    strings=strings.join(' ');
    strings='<div class="resources">'+strings+'</div>';

    return strings;

};

/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.World = T.World || {};
var A/*Actual Namespace*/ = T.World;




A.terrains = [
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 0 ,color: '#000000', size: 1}}, name: 'temnota'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 1 ,color: '#337EFA', size: 1}}, name: 'moře'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 2 ,color: '#545454', size: 1}}, name: 'dlažba'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 3 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 4 ,color: '#F9F98D', size: 1}}, name: 'písek'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 5 ,color: '#878787', size: 1}}, name: 'kamení'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 6 ,color: '#5A2F00', size: 1}}, name: 'hlína'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 7 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 8 ,color: '#2A7302', size: 1}}, name: 'tráva(normal)'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 9 ,color: '#51F311', size: 1}}, name: 'tráva(toxic)'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 10,color: '#535805', size: 1}}, name: 'les'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 11,color: '#6aa2ff', size: 1}}, name: 'řeka'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 12,color: '#8ABC02', size: 1}}, name: 'tráva(jaro)'}),
    new T.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 13,color: '#8A9002', size: 1}}, name: 'tráva(pozim)'})
];



/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.World = T.World || {};
var A/*Actual Namespace*/ = T.World;




//todo//var z_map_cache={};


A.mapGenerator = new T.MapGenerator(

    T.Math.blurXY(function(x,y){

        //todo//var key='x'+x+'y'+y;
        //todo//if(typeof z_map_cache[key]!='undefined'){
        //todo//    return(z_map_cache[key]);
        //todo//}


        var div=100;


        var n= 0;
        var max_possible_n=0;


        for(var i= 0;i<13;i++){

            n += Math.round(Math.pow(x*y-66, 2)) % (div + 1);

            max_possible_n+=div;

            x=Math.floor(x/3);
            y=Math.floor(y/3);

            var xy = T.Math.xyRotate(x,y,57);

            x=xy.x;
            y=xy.y;

        }



        n=n/max_possible_n;

        if(n<0)n-=Math.floor(n);
        if(n>1)n-=Math.floor(n);

        //todo//z_map_cache[key]=n;
        return(n);

    },2)
    ,
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0002,0.0002,0.0002,0.0002,0.0002,0.0002,0.0002,0.0002,0.0002,0.0002,0.0003,0.0003,0.0003,0.0003,0.0004,0.0005,0.0006,0.0007,0.0009,0.0009,0.0009,0.001,0.0011,0.0011,0.0011,0.0011,0.0012,0.0012,0.0013,0.0013,0.0015,0.0016,0.0017,0.0017,0.0017,0.002,0.0021,0.0023,0.0024,0.0028,0.0031,0.0033,0.0034,0.0037,0.0044,0.0045,0.0047,0.0049,0.0049,0.0051,0.0054,0.0058,0.0061,0.0062,0.0064,0.0067,0.0071,0.0074,0.0075,0.0078,0.0082,0.0083,0.0084,0.0088,0.0092,0.0097,0.0102,0.0107,0.0112,0.0123,0.0131,0.0139,0.0147,0.0149,0.0153,0.0163,0.0168,0.0175,0.0181,0.0188,0.0193,0.0203,0.0212,0.022,0.0221,0.0224,0.0227,0.0232,0.0239,0.0251,0.0256,0.0264,0.0268,0.0281,0.0286,0.0294,0.0301,0.0312,0.0317,0.0328,0.0338,0.035,0.0356,0.0368,0.0377,0.0387,0.0402,0.0409,0.0422,0.0438,0.0446,0.0458,0.0475,0.0486,0.0502,0.0513,0.052,0.0534,0.0539,0.0548,0.056,0.0568,0.0578,0.0595,0.0607,0.0624,0.0634,0.0644,0.0664,0.0677,0.0694,0.071,0.072,0.0734,0.0747,0.0757,0.0767,0.0785,0.0794,0.0805,0.0817,0.0826,0.084,0.0856,0.087,0.0883,0.0898,0.0915,0.0923,0.094,0.0945,0.0958,0.0972,0.0983,0.0996,0.1014,0.1031,0.1048,0.1057,0.1072,0.1087,0.1103,0.1111,0.1126,0.1143,0.1161,0.1171,0.1189,0.1203,0.1219,0.1238,0.1251,0.1261,0.1273,0.129,0.1303,0.1315,0.1324,0.1331,0.1341,0.1355,0.1368,0.1387,0.1397,0.1408,0.1427,0.1437,0.145,0.1462,0.1479,0.1498,0.1512,0.1521,0.1538,0.1549,0.1566,0.1581,0.1594,0.1616,0.1628,0.1642,0.1652,0.1669,0.1682,0.17,0.1713,0.1727,0.1742,0.1764,0.1782,0.1795,0.1817,0.1835,0.1851,0.1859,0.1865,0.188,0.1894,0.191,0.1921,0.1935,0.1947,0.1962,0.1975,0.1986,0.2001,0.2011,0.2022,0.2028,0.2046,0.2058,0.2069,0.2079,0.2093,0.2105,0.2122,0.2135,0.2145,0.2154,0.2163,0.2171,0.2183,0.2193,0.22,0.2212,0.2221,0.2235,0.2245,0.2261,0.2276,0.2284,0.2293,0.2303,0.2313,0.2327,0.2341,0.2356,0.2369,0.2374,0.2392,0.2405,0.242,0.2435,0.2449,0.2466,0.2481,0.25,0.2509,0.2525,0.2539,0.2552,0.2561,0.2577,0.2589,0.2615,0.2627,0.2646,0.2657,0.2671,0.269,0.2706,0.2719,0.2732,0.2743,0.2764,0.2779,0.28,0.2818,0.2828,0.2844,0.2866,0.288,0.2892,0.2912,0.2926,0.2938,0.2963,0.2979,0.2996,0.3013,0.3028,0.3052,0.3066,0.3077,0.3098,0.312,0.3142,0.3159,0.3173,0.3194,0.3213,0.3231,0.3258,0.3281,0.3297,0.332,0.3347,0.3363,0.3384,0.3409,0.3432,0.3464,0.3483,0.35,0.3528,0.3564,0.3592,0.3624,0.3651,0.3687,0.3708,0.3732,0.3755,0.379,0.3811,0.3836,0.3865,0.3888,0.3912,0.3948,0.3974,0.3998,0.4019,0.4045,0.4082,0.4106,0.4145,0.4168,0.4195,0.4221,0.4247,0.4266,0.4293,0.4313,0.4364,0.439,0.4432,0.4467,0.4498,0.4531,0.4553,0.4588,0.4614,0.4654,0.4689,0.4725,0.4765,0.4786,0.4813,0.4857,0.4898,0.4931,0.4975,0.5013,0.5058,0.5102,0.5134,0.5177,0.5224,0.5252,0.5292,0.5327,0.5366,0.5404,0.5433,0.5484,0.5514,0.5548,0.5591,0.5624,0.5661,0.5702,0.5745,0.5791,0.5832,0.5869,0.5914,0.5954,0.6003,0.6041,0.6087,0.6126,0.6173,0.6215,0.6263,0.6304,0.6348,0.6383,0.6414,0.6452,0.6494,0.6525,0.6563,0.6604,0.6647,0.6691,0.672,0.6752,0.6806,0.6839,0.6879,0.6916,0.6961,0.701,0.7046,0.7077,0.7116,0.7164,0.7194,0.7235,0.7288,0.7331,0.7371,0.7412,0.7475,0.7527,0.7562,0.761,0.7647,0.7685,0.7722,0.7761,0.7809,0.7852,0.7893,0.7931,0.7961,0.799,0.8027,0.8068,0.8099,0.8133,0.8171,0.8213,0.8259,0.8294,0.8336,0.8377,0.8407,0.8441,0.8479,0.8513,0.8546,0.858,0.8611,0.8636,0.8679,0.8715,0.8751,0.8782,0.8813,0.8846,0.888,0.891,0.8943,0.8967,0.9004,0.903,0.9054,0.9082,0.9113,0.9142,0.9167,0.9189,0.9213,0.9236,0.9269,0.9291,0.9309,0.9331,0.9362,0.9384,0.9397,0.9418,0.944,0.9455,0.9474,0.9489,0.9505,0.9533,0.955,0.9564,0.9581,0.96,0.9614,0.9626,0.9641,0.9658,0.9679,0.9688,0.9706,0.9718,0.9731,0.9744,0.9757,0.9767,0.9785,0.9796,0.9806,0.9817,0.9827,0.9832,0.9838,0.9846,0.9851,0.9859,0.9864,0.9867,0.9876,0.9885,0.9887,0.9891,0.9898,0.9902,0.9912,0.9913,0.9917,0.9922,0.9928,0.9931,0.9932,0.9932,0.9938,0.9941,0.9943,0.9947,0.9954,0.996,0.9961,0.9961,0.9962,0.9965,0.9966,0.9969,0.997,0.9972,0.9974,0.9975,0.9976,0.998,0.998,0.9981,0.9981,0.9986,0.9987,0.9989,0.999,0.9992,0.9992,0.9992,0.9994,0.9995,0.9995,0.9996,0.9996,0.9996,0.9996,0.9997,0.9997,0.9997,0.9997,0.9997,0.9998,0.9998,0.9998,0.9999,0.9999,0.9999,0.9999,0.9999,0.9999,0.9999,0.9999,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ,

    new T.MapGenerator.Biotope([

        { amount: 120 , terrain: A.terrains[ 1]},//moře
        { amount: 40 , terrain: A.terrains[11]},//řeka
        { amount: 30 , terrain: A.terrains[ 4]},//písek
        { amount: 20 , terrain: A.terrains[12]},//tráva jaro
        { amount: 40 , terrain: A.terrains[ 9]},//tráva toxic
        { amount: 20 , terrain: A.terrains[ 8]},//tráva normal
        { amount: 20 , terrain: A.terrains[10]},//les
        { amount: 50 , terrain: A.terrains[ 4]},//písek
        { amount: 10 , terrain: A.terrains[13]},//tráva pozim
        { amount: 20 , terrain: A.terrains[ 5]},//kamení
        { amount: 60 , terrain: A.terrains[ 3]},//sníh/led
        { amount: 10 , terrain: A.terrains[10]},//les
        { amount: 60 , terrain: A.terrains[ 7]},//sníh/led
        { amount: 10 , terrain: A.terrains[ 5]},//kamení



    ]),


    function(object,virtual_objects){

        if(object.type!='terrain')return;

        if(object.design.data.image==5){
            virtual_objects.push(
                {

                    x: object.x,//todo
                    y: object.y,//todo
                    type: 'natural',
                    design: {
                        type: 'natural',
                        data:{
                            image:'rock'+Math.floor(T.Math.randomSeedPosition(1,{x:object.x,y:object.y})*6)%6+'dark'+Math.floor(T.Math.randomSeedPosition(2,{x:object.x,y:object.y})*4)%4,
                            size: 0.5+T.Math.randomSeedPosition(5,{x:object.x,y:object.y})*1
                        }
                    }

                }
            );


        }else
        if(object.design.data.image==10){
                        virtual_objects.push(
                {

                    x: object.x,//todo
                    y: object.y,//todo
                    type: 'natural',
                    design: {
                        type: 'natural',
                        data:{
                            image:'tree'+Math.floor(T.Math.randomSeedPosition(3,{x:object.x,y:object.y})*10)%10,
                            size: 1+T.Math.randomSeedPosition(6,{x:object.x,y:object.y})/2
                        }
                    }

                }
            );


        }


    }


);



















/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions
 */
//======================================================================================================================
T.World = T.World || {};
var A/*Actual Namespace*/ = T.World;





var K=0.05;


A.game = new T.Game(
    {
        //---------------------------------------------Defense
        'defense': new T.Game.ActionType(
            'passive',
            {
                'defense': 'number'
            },
            function(params){
                return((params.defense)*800*K);
            },
            T.Resources.newSingles({//todo in future should be resources and k in separate file.
                'wood':   2,
                'clay':   2,
                'stone':  1,
                'iron':   0
            })
        ),
        //---------------------------------------------Regenerate
        'regenerate': new T.Game.ActionType(
            'passive',
            {
                'regenerate': 'number'
            },
            function(params){
                return((1/params.regenerate)*3600*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  2,
                'iron':   2
            })
        ),
        //---------------------------------------------Repair
        'repair': new T.Game.ActionType(
            'active',
            {
                'repair': 'number'
            },
            function(params){
                return((1/(params.repair/100))*1000*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  3,
                'iron':   4
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Mine
        'mine': new T.Game.ActionType(
            'passive',
            {
                'resource': 'string',
                'amount': 'number'
            },
            function(params){
                return((params.amount)*3600*K);
            },
            T.Resources.newSingles({
                'wood':   3,
                'clay':   2,
                'stone':  2,
                'iron':   4
            })
        ),
        //---------------------------------------------Attack
        'attack': new T.Game.ActionType(
            'active',
            {
                'distance': 'number',
                'strength': 'number',
                'rounds': 'number',
                'cooldown': 'number'
            },
            function(params){
                return((Math.pow(params.distance,2)*params.strength*params.rounds*(1/params.cooldown))*100*K);
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  3,
                'iron':   2
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Move
        'move': new T.Game.ActionType(
            'active',
            {
                'speed': 'number'
            },
            function(params){
                return((Math.pow(params.speed,2))*10*K);
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  0,
                'iron':   1
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new T.Game.ActionType(
            'passive',
            {
                'throughput': 'number'
            },
            function(params){
                return((Math.pow(params.throughput/100,2))*10*K);//todo
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   3,
                'stone':  1,
                'iron':   0
            })
        )
        //---------------------------------------------


    },
    T.Math.prettyNumber,
    T.Math.prettyNumber

);