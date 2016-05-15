var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;/**
 * @author ©Towns.cz
 * @fileOverview Initialize namespace Towns
 */
//======================================================================================================================

/**
 * Towns namespace - under this object are all Towns classes and instances.
 * @type {object}
 */
global.Towns = {};
module.exports = global.Towns;


var T = global.Towns;


/**
 * Checks existence of namespace. If not exists, this function creates it.
 * @param namespace eg. 'Objects.Array'
 * @returns {boolean}
 */
T.setNamespace = function(namespace){

    namespace=namespace.split('.');

    var Actual=this;

    var key;
    for(var i= 0,l=namespace.length;i<l;i++){

        key=namespace[i];

        if(key==='T')throw new Error('Cant set namespace T under T!');

        if(typeof Actual[key]==='undefined'){

            Actual[key]={};
            Actual=Actual[key];

        }else{

            Actual=Actual[key];

        }


    }

    return(true);

};
/**
 * @author ©Towns.cz
 * @fileOverview Creates static T.ArrayFunctions
 */
//======================================================================================================================


/**
 * Additional functions to manipulate with array.
 */
T.ArrayFunctions=((function(){"use strict";function constructor$0() {}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};


    /**
     * @static
     * Searches an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @returns {number} Key of object with this ID, -1 if not exist
     */
    static$0.id2i = function(array, id) {

        for (var i in array) {
            if (array[i].id == id)return i;
        }
        return -1;

    };


//======================================================================================================================

    /**
     * @static
     * Searches an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @param {string} error_message when iten not exists
     * @returns {object} Object with this ID, null if not exist
     */
    static$0.id2item = function(array, id) {var error_message = arguments[2];if(error_message === void 0)error_message = false;

        for (var i in array) {
            if (array[i].id == id)return array[i];
        }

        if (error_message) {
            throw new Error(error_message);
        } else {
            return null;
        }

    };


    //======================================================================================================================

    /**
     * @static
     * Delete an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @returns {boolean}
     */
    static$0.idRemove = function(array, id) {//todo refactor use this not splice

        for (var i in array) {
            if (array[i].id == id) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;

    };


    //======================================================================================================================


    /**
     * Iterate through 2D array
     * @static
     * @param array
     * @param {function} callback
     */
    static$0.iterate2D = function(array, callback) {

        //r(array);

        for (var y = 0, yLen = array.length; y < yLen; y++) {
            for (var x = 0, xLen = array[y].length; x < xLen; x++) {

                callback(y, x);
                /*todo refactor to x,y*/

            }
        }

    };

    //======================================================================================================================

    /**
     * @static
     * @param array
     * @param from
     * @param to
     * @return {array} Removed items
     */
    static$0.removeItems = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };


    //======================================================================================================================


    /** todo should it be under T.ArrayFunctions
     *
     * @param {object} obect
     * @param {array} path
     */
    static$0.filterPath = function(object, path, setValue) {


        if (!is(object)) {//todo should it be here?
            throw new Error('filterPath: Object is undefined.');
        }

        if (!is(path.forEach)) {
            r(path);
            throw new Error('filterPath: T.Path is not correct array.');
        }


        for(var path_i in path) {

            var object_key = path[path_i];

            if (path_i < path.length - 1 || typeof setValue == 'undefined') {

                if (typeof object[object_key] == 'undefined') {

                    return (undefined);
                    //throw new Error('filterPath: Key \''+object_key+'\' in path in object is undefined');
                }

                object = object[object_key];

            } else {

                object[object_key] = setValue;

                return (true);


            }

        }

        return (object);


    };


    //======================================================================================================================


    /**
     *
     * @param {Array} array
     * @returns {Array} Array containing only unique values
     */
    static$0.unique = function(array) {
        var n = {}, r = [];
        for (var i = 0; i < array.length; i++) {
            if (!n[array[i]]) {
                n[array[i]] = array;
                r.push(array[i]);
            }
        }
        return r;
    };


    //======================================================================================================================


    /**
     * Creates html table from JS array
     * @param {Array} array array
     * @param {string} additional_class
     * @returns {string} html
     */
    static$0.array2table = function(array) {var additional_class = arguments[1];if(additional_class === void 0)additional_class = '';
        //todo check

        var html = '';

        var rows = array.length;
        var cols_table = array[0].length;//todo is is best solution?


        html += '<table class="' + additional_class + '">';
        for (var row = 0; row < rows; row++) {


            html += '<tr>';

            var cols = array[row].length;
            var cols_span = cols_table - cols;

            for (var col = 0; col < cols; col++) {

                if (col == cols - 1 && cols_span !== 0) {

                    html += '<td colspan="' + (cols_span + 1) + '">';

                } else {

                    html += '<td>';

                }


                html += array[row][col];
                html += '</td>';


            }

            html += '</tr>';


        }
        html += '</table>';

        return (html);

    };


MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Color
 */
//======================================================================================================================

/**
 * Object which represents RGBA color.
 */
T.Color = ((function(){"use strict";var static$0={},proto$0={};

    /**
     *
     * @param r red from 0 to 255
     * @param g green from 0 to 255
     * @param b blue from 0 to 255
     * @param a alpha from 0 to 255
     */
    function constructor$0(r, g, b){var a = arguments[3];if(a === void 0)a = 255;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     * Repairs overflowed colors
     * @private
     */
    proto$0.bounds = function(){

        this.r = Math.round(this.r);
        this.g = Math.round(this.g);
        this.b = Math.round(this.b);
        this.a = Math.round(this.a);

        if (this.r > 255) {
            this.r = 255;
        }
        if (this.r < 0) {
            this.r = 0;
        }
        if (this.g > 255) {
            this.g = 255;
        }
        if (this.g < 0) {
            this.g = 0;
        }
        if (this.b > 255) {
            this.b = 255;
        }
        if (this.b < 0) {
            this.b = 0;
        }

        if (this.a > 255) {
            this.a = 255;
        }
        if (this.a < 0) {
            this.a = 0;
        }
    };


    /**
     * Get css representation of this color
     * @returns {string} eg. rgb(100,200,200)
     */
    proto$0.getCssColor = function(){

        this.bounds();
        if (this.a == 255) {
            return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        } else {
            //r('rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a/255*100)/100 + ')');
            return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a / 255 * 100) / 100 + ')';
        }

    };

    /**
     * Get hex representation of this color (ignores alpha chanel.)
     * @returns {string} eg. #00ff00
     */
    proto$0.getHex = function(){
        this.bounds();
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    };


    /**
     * Creates new T.Color form hex code of color
     * @param {string} hex code of color eg. #00ff00
     * @returns {T.Color} Color
     */
    static$0.createFromHex = function(hex){

        var result, shorthandRegex;

        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return new T.Color(
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            );
        } else {

            throw new Error('Error while creating T.Color from '+hex);

        }
    };

MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})());

/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game
 */
//======================================================================================================================

/**
 * Game conditions
 */
T.Game = ((function(){"use strict";var proto$0={};
    
    
     /**
     *
     * @param {Object.<T.Game.Action>} action_list
     * @param {function} max_life_modifier
     * @param {function} price_key_modifier
     * @constructor
     */
    function constructor$0(action_list,max_life_modifier,price_key_modifier){
    
        this.action_list = action_list;
        this.max_life_modifier = max_life_modifier;
        this.price_key_modifier = price_key_modifier;
    
    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});
    
    
    
    /**
     *
     * @param {object} Object
     * @return {array} of numbers
     */
    proto$0.getObjectPriceBases = function(object){
    
        var self=this;
        var price_bases=[];
    
    
        if(typeof object.actions=='undefined'){
            return([]);
        }
    
    
        object.actions.forEach(function(actionAbility){
    
    
            if(typeof self.action_list[actionAbility.type]!=='undefined'){
    
                var action = self.action_list[actionAbility.type];
    
                //---------------Checking params

                for(var param in actionAbility.params){
                    var param_type = action.ability_params[param];
    
                    if(typeof actionAbility.params[param]!==param_type){
                        throw new Error('Param '+param+' should be '+param_type+' instead of '+typeof(actionAbility.ability_params[param])+' in action ability '+actionAbility.type);
                    }
    
                }
                //---------------

                var price_base = Math.ceil(action.ability_price_base(actionAbility.params));//
    
                //---------------Checking non negative value
                if(price_base<0){
                    throw new Error('Params in action ability '+actionAbility.type+' should not make this action negative');
                }
                //---------------
    
    
                price_bases.push(price_base);
    
            }else{
                throw new Error('Unknown action type '+actionAbility.type);
            }
    
    
        });
    
        return(price_bases);
    
    };
    
    
    
    /**
     *
     * @param {object} Object
     * @return {number} maximum life of object
     */
    proto$0.getObjectMaxLife = function(object){
    
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
    proto$0.getObjectPrices = function(object){
    
        //console.log(this);
    
        var price_bases=this.getObjectPriceBases(object);
    
    
        var self=this;
        var prices=[];
    
    
        if(typeof object.actions=='undefined'){
            return([]);
        }
    
        var design_resources = self.getObjectDesignPrice(object);
    
        object.actions.forEach(function(action,i){
    
            var action = self.action_list[action.type];
    
    
            action.ability_price_resources_list.sort(function(a,b){//todo is it safe?
    
                return design_resources.compare(a.clone().signum())-design_resources.compare(b.clone().signum());
    
            });
    
    
            var price_resources = action.ability_price_resources_list[0].clone();
    
    
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
    proto$0.getObjectPrice = function(object){
    
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
    proto$0.getObjectDesignPrice = function(object){
    
        if(!object.hasOwnProperty('design'))throw new Error('Object should have design!');
        if(object.design.type!='model')throw new Error('Object should have design of type model!');
    
    
        var price = new T.Resources({});
    
    
        var model = new T.Model(object.design.data);
    
        var linear_particles = model.getLinearParticles();
    
    
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



    proto$0.getAction = function(action_key){

        var action = this.action_list[action_key];

        if(typeof action=='undefined')throw new Error('Unknown action type '+action_key+'.');


        return(action);
    };
    
MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================


T.Game.Action = ((function(){"use strict";


    /**
     *
     * @param {string} type 'ACTIVE' or 'PASSIVE'
     * @param {object} ability_params {param: type}
     * @param {function} ability_price_base
     * @param {Array} ability_price_resources_list
     * @param {function} execute
     * @constructor
     */
     function constructor$0(type, ability_params, ability_price_base, ability_price_resources_list){var execute = arguments[4];if(execute === void 0)execute = false;


        if(['ACTIVE','PASSIVE'].indexOf(type)==-1)throw new Error('Unknown type of T.Game.Action '+type);
        if(execute===false && type==='ACTIVE')throw new Error('ACTIVE T.Game.Action must have execute function');
        if(execute!==false && type==='PASSIVE')throw new Error('PASSIVE T.Game.Action can not have execute function');


        this.type = type;
        this.ability_params = ability_params;
        this.ability_price_base = ability_price_base;
        this.ability_price_resources_list = ability_price_resources_list;
        this.execute = execute;
    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});



;return constructor$0;})());





/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator
 */
//======================================================================================================================


T.MapGenerator = ((function(){"use strict";var proto$0={};

    /**
     *
     * @param {function} getZ
     * @param {Array} z_normalizing_table
     * @param {T.MapGenerator.Biotope} biotope
     * @param {function} virtualObjectGenerator
     * @constructor
     */
    function constructor$0(getZ,z_normalizing_table,biotope,virtualObjectGenerator){

        this.getZ = getZ;
        this.z_normalizing_table = z_normalizing_table;
        this.biotope = biotope;
        this.virtualObjectGenerator = virtualObjectGenerator;


    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     *
     * @param {T.Position} center_integer
     * @param {number} radius
     * @returns {Array}
     * @private
     */
    proto$0.getZMapCircle = function(center_integer,radius){

        var map=[];

        for(var y=0;y<=radius*2;y++){

            map[y]=[];

            for(var x=0;x<=radius*2;x++){


                if(
                    Math.pow(x-radius+1/2,2)+
                    Math.pow(y-radius+1/2,2)>
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
    proto$0.terrainMap = function(map){

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
    proto$0.getMapArrayCircle = function(center_integer,radius){


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
    proto$0.convertMapArrayToObjects = function(map_array,center_integer,radius){

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
     * @param {T.Position} not_center
     * @returns {Array}
     * @private
     */
    proto$0.getPureMap = function(center,radius){var not_center = arguments[2];if(not_center === void 0)not_center = false;

        //console.log(center,not_center);

        var center_integer={
            x: Math.floor(center.x),
            y: Math.floor(center.y)
        };

        if(not_center)
        not_center={
            x: not_center.x-center_integer.x,
            y: not_center.y-center_integer.y
        };



        /*var map_array = this.getMapArrayCircle(center_integer,radius);
        var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);/**/


        var objects= new T.Objects.Array();

        var x,y,z,t,object;
        for(y=0;y<=radius*2;y++){
            for(x=0;x<=radius*2;x++){


                if(
                    Math.pow(x-radius+1/2,2)+
                    Math.pow(y-radius+1/2,2)>
                    Math.pow(radius,2)
                )continue;


                if(not_center)
                if(
                    Math.pow(x-not_center.x-radius+1/2,2)+
                    Math.pow(y-not_center.y-radius+1/2,2)<=
                    Math.pow(radius,2)
                )continue;


                z = this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);
                z = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];

                t = this.biotope.getZTerrain(z);

                //console.log(t);

                object= new T.Objects.Terrain(t);
                object.x=center_integer.x-radius+x;
                object.y=center_integer.y-radius+y;


                objects.push(object);

            }
        }


        return(objects);

    };


    /**
     *
     * @param {T.Objects.Array} objects
     * @returns {T.Objects.Array}
     * @private
     */
    proto$0.getVirtualObjectsFromTerrainObjects = function(objects){


        var virtual_objects = [];
        var objects_1x1_raw = objects.get1x1TerrainObjects().getAll();


        for(var i=0,l=objects_1x1_raw.length;i<l;i++){

            this.virtualObjectGenerator(objects_1x1_raw[i],virtual_objects);

        }

        return(virtual_objects);

    };





//=================================================PUBLIC===============================================================


    /**
     * Complete terrain and virtual objects into Objects Array
     * @param {T.Objects.Array} real_objects
     * @param {T.Position} center
     * @param {number} radius
     * @param {boolean} virtual_objects
     * @param {T.Position} not_center Dont get objects near this center.
     * @returns {T.Objects.Array}}
     */
    proto$0.getCompleteObjects = function(real_objects,center,radius){var natural_objects = arguments[3];if(natural_objects === void 0)natural_objects = true;var not_center = arguments[4];if(not_center === void 0)not_center = false;



        var complete_objects = this.getPureMap(center, radius, not_center);



        real_objects.forEach(function(object){
            complete_objects.push(object);
        });



        if(natural_objects){

            var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);

            virtual_objects.forEach(function(object){
                complete_objects.push(object);
            });

        }




        return(complete_objects);

    };
    


MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator.Biotope
 */
//======================================================================================================================


T.MapGenerator.Biotope = ((function(){"use strict";var proto$0={};

    /**
     *
     * @param {Array} terrains
     * @constructor
     */
    function constructor$0(terrains){

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

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     *
     * @param {number} z
     * @returns {T.Objects.Terrain}
     */
    proto$0.getZTerrain = function(z){


        for(var i=this.terrains.length-1;i>=0;i--){

            if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

        }


    };



MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());



/**
 * @author ©Towns.cz
 * @fileOverview Creates static class T.Math
 */
//======================================================================================================================



/**
 * Mathematical functions to Towns
 */
T.Math=((function(){"use strict";function constructor$0() {}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};


    /**
     *
     * @static
     * @param {number}
     * @return {number}
     */
    static$0.sign = function(x) {//todo Math.sign || this
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
    static$0.baseLog = function(base, number) {
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
    static$0.prettyNumber = function(number,number_of_non_zero_digits){

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
    static$0.angleDiff = function(deg1,deg2){
        var a = deg1 - deg2;
        a = (a + 180) % 360 - 180;
        return(a);
    };

    //-------------------------

    /**
     * @static
     * @param {number} radians
     * @return {number} degrees
     */
    static$0.rad2deg = function(radians){
        return(radians * (180/Math.PI));
    };

    //-------------------------

    /**
     * @static
     * @param {number} degrees
     * @return {number} radians
     */
    static$0.deg2rad = function(degrees){
        return(degrees * (Math.PI/180));
    };

    //-------------------------

    /**
     * @static
     * @param x
     * @param y
     * @return {number} distance
     */
    static$0.xy2dist = function(x,y){
        return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
    };


    //-------------------------

    //todo refactor to position
    static$0.xy2distDeg = function(x,y){

        var output={};

        output.dist = this.xy2dist(x,y);
        output.deg = this.rad2deg(Math.atan2(y,x));

        return(output);

    };

    //-------------------------

    //todo refactor to position
    static$0.distDeg2xy = function(dist,deg){

        var rad=this.deg2rad(deg);

        var output={};

        output.x = Math.cos(rad)*dist;
        output.y = Math.sin(rad)*dist;

        return(output);

    };

    //-------------------------

    //todo mybe refactor to position
    static$0.xyRotate = function(x,y,deg){

        //nevyuzivam funkce Towns.A.xy2distDeg a A.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
        var dist = this.xy2dist(x,y);
        var rad = Math.atan2(y,x);

        rad += this.deg2rad(deg);

        var output={};
        output.x = Math.cos(rad)*dist;
        output.y = Math.sin(rad)*dist;

        return(output);

    };

    //======================================================================================================================


    static$0.randomSeedPosition = function(seed,position){


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
    static$0.toFloat = function(value,defval){

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
    static$0.toInt = function(value,defval){

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
    static$0.bounds = function(value,min,max){

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
    static$0.lineCollision = function(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y){



        var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
        var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
        var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
        var collision;

        // Detect coincident lines (has a problem, read below)
        if (denominator === 0){

            //var collision= (numerator1 == 0 && numerator2 == 0);
            collision=false;

        }else{

            var r = numerator1 / denominator;
            var s = numerator2 / denominator;

            collision=((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

        }




        //-------------------------------Debug TDD do not delete

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



        return collision;

    };







    static$0.blurXY = function(generator,blur) {

        return(function (x, y) {

            var sum = 0;
            var count = 0;

            var xx,yy;

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




    static$0.bytesToSize = function(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };


    /**
     *
     * @param {number} a_start
     * @param {number} a_position
     * @param {number} a_end
     * @param {number} b_start
     * @param {number} b_end
     * @returns {number}
     */
    static$0.proportions = function(a_start,a_position,a_end,b_start,b_end){


        var a_whole = a_end-a_start;
        var b_whole = b_end-b_start;

        var a_part = a_end-a_position;
        var b_part = (b_whole*a_part)/a_whole;

        return(b_end-b_part);


    };

    
    
MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Model
 */
//======================================================================================================================



T.Model = ((function(){"use strict";var proto$0={};




    /**
     * @param {object} Model json
     * @return {boolean} false in case of fail
     * @constructor
     */
    function constructor$0(json){

        if(typeof(json)=='undefined')return false;

        this.name=json.name;
        this.particles=json.particles;
        this.rotation=json.rotation;
        this.size=json.size;

        if(typeof(this.rotation)=='undefined')this.rotation=0;
        if(typeof(this.size)=='undefined')this.size=1;
    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    proto$0.clone = function (){
        return(new T.Model(JSON.parse(JSON.stringify(this))));
    };



    /**
     * @param {number} rotation
     * @param {number} size
     */
    proto$0.addRotationSize = function(rotation,size){

        if(typeof rotation === 'undefined')rotation=0;
        if(typeof size === 'undefined')size=1;

        this.rotation+=rotation;
        this.size=this.size*size;

    };





    /**
     * @param {string} dimension x,y,z,xy
     * @return {number} range
     */
    proto$0.range = function(dimension){

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



    /**
     * @param {number} move_x
     * @param {number} move_y
     * @param {number} move_z
     */
    proto$0.moveBy = function(move_x,move_y,move_z){

        if(typeof move_x === 'undefined')move_x=0;
        if(typeof move_y === 'undefined')move_y=0;
        if(typeof move_z === 'undefined')move_z=0;

        for(var i in this.particles){


            this.particles[i].position.x+=move_x;
            this.particles[i].position.y+=move_y;
            this.particles[i].position.z+=move_z;

        }



    };

    
    
    
    /**
     * Return Z of joining model
     * @param {object} Model
     * @param {number} move_x
     * @param {number} move_y
     */
    proto$0.joinModelZ = function(model,move_x,move_y){//todo second param should be position

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
    
    
    
    
    /**
     * Join models together
     * @param {object} Model
     * @param {number} move_x
     * @param {number} move_y
     */
    proto$0.joinModel = function(model,move_x,move_y){//todo second param should be position

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




    /**
     * Deep copy this and converts links to raw data
     * @returns {object} Model
     */
    proto$0.getDeepCopyWithoutLinks = function() {


        var model = this.clone();

        //---------------------------------------------Convert links to raw data


        var findParticleByName = function(particles, name) {//todo move to prototype

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


        var particlesLinks = function(particles) {//todo move to prototype


            //r(particles);

            for (var i in particles) {


                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Link
                if (typeof(particles[i].link)!='undefined') {


                    var linked_particle = findParticleByName(model.particles, particles[i].link);

                    if (linked_particle === false) {
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




    /**
     * Get 1D array of particles
     * @returns {Array} array of particles
     */
    proto$0.getLinearParticles = function(){


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
                    };
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


    /**
     *
     * @param path
     * @returns {object} part of this
     */
    proto$0.filterPath = function(path){

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




    /**
     *
     * @param path
     * @returns {object} part of this
     */
    proto$0.filterPathSiblings = function(path){

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


    
    

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author Towns.cz
 * @fileOverview Creates static class T.Model.Particles
 */
//======================================================================================================================


/**
 * Model Particles
 */
T.Model.Particles = ((function(){"use strict";function constructor$0() {}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};


    /**
     * Add missing params into particle
     * @static
     * @param {object} particle
     * @return {object} particle
     */
    static$0.addMissingParams = function(particle) {//todo ?? maybe rename


        if (typeof particle.skew === 'undefined') {
            particle.skew = {};
        }
        if (typeof particle.skew.z === 'undefined') {
            particle.skew.z = {x: 0, y: 0};
        }

        //-------------

        if (typeof particle.shape.top === 'undefined') {
            particle.shape.top = 1;
        }


        if (typeof particle.shape.bottom === 'undefined') {
            particle.shape.bottom = 1;
        }


        if (typeof particle.rotation === 'undefined') {
            particle.rotation = 0;
        }

        return (particle);

    };


    //======================================================================================================================

    /**
     * Get 3D model from particle
     * @static
     * @param particle
     * @return {object} 3D model
     */
    static$0.get3D = function(particle) {

        var resource = {};

        particle=this.addMissingParams(particle);

        if (particle.shape.type == 'prism') {

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
            resource.points = [];
            resource.polygons = [[], []];
            resource.polygons2D = [[], []];
            var base;

            for (var level = 0; level < 2; level++) {


                //---------------------------


                if (level === 0) {
                    base = particle.shape.bottom;

                } else {
                    base = particle.shape.top;
                }


                //--------

                var x__, y__, z__;

                for (var n = 0; n < particle.shape.n; n++) {

                    //------------------XYZ ratio

                    if (!is(particle.shape.rotated)) {

                        x__ = 0.5 * x_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + x_ * (level * particle.skew.z.x);
                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + y_ * (level * particle.skew.z.y);
                        z__ = z_ * level;

                    } else {

                        var tmp = (2 - (Math.cos(T.Math.deg2rad(180 / particle.shape.n))));//todo better

                        x__ = x_ * ((level * 2) - 1);//*(level-0.5);//+x_*(level*particle.skew.z.x),

                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n));//+y_*(level*particle.skew.z.y),


                        z__ = (1) * 0.5 * (

                                z_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                                z_ * ((Math.cos(T.Math.deg2rad(180 / particle.shape.n)))) * tmp

                            );

                    }


                    //------------------ XY Rotation

                    var DistDeg_ = T.Math.xy2distDeg(x__, y__);//todo refactor all like DistDeg, etc...
                    DistDeg_.deg += particle.rotation;
                    var xy_ = T.Math.distDeg2xy(DistDeg_.dist, DistDeg_.deg);

                    x__ = xy_.x;
                    y__ = xy_.y;


                    //------------------

                    resource.points.push([x + x__, y + y__, z + z__]);


                    if (level === 0) {

                        //r(n,1,particle.shape.n,(n+1+particle.shape.n));
                        resource.polygons[0].push(n + 1);
                        resource.polygons[1].push(n + 1 + particle.shape.n);

                        resource.polygons2D[0].push(n + 1);
                        resource.polygons2D[1].push(n + 1 + particle.shape.n);


                        resource.polygons.push([
                            (n !== 0 ? n : particle.shape.n),
                            n + 1,
                            n + 1 + particle.shape.n,
                            (n !== 0 ? n : particle.shape.n) + particle.shape.n

                        ]);

                    }

                }
            }
            /**/

            //-------------------------------------------------------------------
        } else {

            throw 'Unknown particle shape ' + particle.shape.type;

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
    static$0.get2Dlines = function(particle, base) {


        var resource = this.get3D(particle);

        var lines = [];

        var polygons2D = [resource.polygons2D[base]];

        for (var pn in polygons2D) {

            /*lines[pn]=[];

             for(var pt in resource.polygons[pn]) {

             var point = resource.points[resource.polygons[pn][pt] - 1];
             lines[pn][ps] = [point[0], point[1]];

             }*/

            var point1, point2;

            for (var i = -1, l = polygons2D[pn].length; i < l - 1; i++) {


                if (i != -1) {
                    point1 = i;
                } else {
                    point1 = l - 1;
                }


                point2 = i + 1;


                //r(resource.polygons[pn],point1);

                point1 = resource.points[polygons2D[pn][point1] - 1];
                point2 = resource.points[polygons2D[pn][point2] - 1];


                lines.push(
                    [
                        {
                            x: point1[0],
                            y: point1[1]
                        }, {
                        x: point2[0],
                        y: point2[1]
                    }
                    ]
                );


            }

        }


        //r(lines);

        return (lines);

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
    static$0.collisionLinesDetect = function(lines1, lines2) {

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
    static$0.collision2D = function(particle1, particle2) {


        var lines1 = Particles.get2Dlines(particle1, 1);
        var lines2 = Particles.get2Dlines(particle2, 0);

        //-------------------------------Corner collision


        var collision = Particles.collisionLinesDetect(lines1, lines2);

        //-------------------------------Inner convex collision

        /**/
        if (!collision) {

            collision = function () {


                var k = 100;

                var outer, inner;

                for (i = 0; i < 2; i++) {

                    if (i === 0) {
                        outer = JSON.parse(JSON.stringify(lines2));
                        inner = /*deepCopy*/(lines1[0]);
                    } else {
                        outer = JSON.parse(JSON.stringify(lines1));
                        inner = /*deepCopy*/(lines2[0]);
                    }


                    var inner1 = JSON.parse(JSON.stringify(inner));
                    var inner2 = JSON.parse(JSON.stringify(inner));


                    var inner_vector_x = inner[1].x - inner[0].x;
                    var inner_vector_y = inner[1].y - inner[0].y;

                    inner1[0].x -= inner_vector_x * k;
                    inner1[0].y -= inner_vector_y * k;


                    inner2[1].x += inner_vector_x * k;
                    inner2[1].y += inner_vector_y * k;


                    inner1 = [inner1];
                    inner2 = [inner2];

                    var collision1 = Particles.collisionLinesDetect(inner1, outer);
                    var collision2 = Particles.collisionLinesDetect(inner2, outer);


                    if (collision1 && collision2) {

                        return (true);

                    }

                }


                return (false);

            }();


        }
        /**/


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

        return (collision);

    };

MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})());

/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Array
 */
//======================================================================================================================
T.setNamespace('Objects');



//todo T.Objects.Array = class extends Array{



T.Objects.Array = ((function(){"use strict";var static$0={},proto$0={};


    /**
     *
     * @param {Array} objects
     * todo ????????? @constructor
     */
    function constructor$0(objects){

        this.objects = [];

        if(objects instanceof Array)
            objects.forEach(this.push,this);

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    proto$0.getAll = function(){
        return this.objects;
    };



    proto$0.forEach = function(){
        return this.objects.forEach.apply(this.objects,arguments);
    };



    static$0.initInstance = function(object) {

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

            console.log(object);
            throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
        }
        //----------------------------------

        return(object);


    };

    /**
     * Push new object into Objects Array
     * @param object
     * @returns {Number}
     */
    proto$0.push = function(object){
        return this.objects.push(T.Objects.Array.initInstance(object));
    };


    /**
     * Update or push object into Objects Array
     * @param object
     */
    proto$0.update = function(object){
        if(!this.setById(object.id,object)){
            this.push(object);
        }
    };


    /**
     *
     * @param {string} id
     * @returns {object}
     */
    proto$0.getById = function(id){

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
    proto$0.setById = function(id,object){

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
    proto$0.removeId = function(id,object){

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
    proto$0.filterTypes = function(){

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
    proto$0.getMapOfTerrainCodes = function(center,radius){//todo maybe refactor to getTerrainCodes2DArray or getTerrainCodesMap

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

        var terrain_objects_raw = this.filterTypes('terrain').getAll();//.slice().reverse();

        var x,y;


        var object;
        for(var i=0,l=terrain_objects_raw.length;i<l;i++){
            object=terrain_objects_raw[i];


            if(object.design.data.size==1) {//todo is this optimalization effective?
                //--------------------------

                x = Math.floor(object.x - center.x + radius);
                y = Math.floor(object.y - center.y + radius);

                map_array[y][x] = object.getCode();

                //--------------------------
            }else {
                //--------------------------

                var x_from = Math.floor(object.x - center.x + radius - object.design.data.size);
                var x_to = Math.ceil(object.x - center.x + radius + object.design.data.size);

                var y_from = Math.floor(object.y - center.y + radius - object.design.data.size);
                var y_to = Math.ceil(object.y - center.y + radius + object.design.data.size);


                var xc = object.x - center.x + radius;
                var yc = object.y - center.y + radius;


                for (y = y_from; y <= y_to; y++) {

                    if (typeof map_array[y] === 'undefined')continue;

                    for (x = x_from; x <= x_to; x++) {


                        if (typeof map_array[y][x] === 'undefined')continue;


                        if (T.Math.xy2dist(x - xc, y - yc) <= object.design.data.size) {

                            map_array[y][x] = object.getCode();


                        }
                    }
                }

                //--------------------------
            }

        };
        //--------------------------

        return map_array;


    };


    /**
     *
     * @returns {T.Objects.Array}
     */
    proto$0.get1x1TerrainObjects = function(){


        var terrain_objects_1x1=new T.Objects.Array();


        var terrain_objects_raw = this.filterTypes('terrain').getAll().slice().reverse();//normal Array

        //--------------------------Fill array

        var blocked_positions={};
        var object_1x1, key;



        var object;
        for(var i=0,l=terrain_objects_raw.length;i<l;i++){
            object=terrain_objects_raw[i];


            if (object.design.data.size == 1) {
                //--------------------------

                object_1x1 = object;

                key = 'x' + Math.round(object_1x1.x) + 'y' + Math.round(object_1x1.y);

                if (typeof blocked_positions[key] === 'undefined') {
                    blocked_positions[key] = true;

                    terrain_objects_1x1.push(object_1x1);

                }

                //--------------------------
            } else {
                //--------------------------

                var x_from = Math.floor(-object.design.data.size);
                var x_to = Math.ceil(object.design.data.size);

                var y_from = Math.floor(-object.design.data.size);
                var y_to = Math.ceil(object.design.data.size);


                for (var y = y_from; y <= y_to; y++) {
                    for (var x = x_from; x <= x_to; x++) {

                        if (T.Math.xy2dist(x, y) <= object.design.data.size) {

                            object_1x1 = object.clone();

                            object_1x1.design.data.size = 1;
                            object_1x1.x = Math.round(object_1x1.x+x);
                            object_1x1.y = Math.round(object_1x1.y+y);

                            key = 'x' + object_1x1.x + 'y' + object_1x1.y;

                            if (typeof blocked_positions[key] == 'undefined') {
                                blocked_positions[key] = true;

                                terrain_objects_1x1.push(object_1x1);

                            }


                        }
                    }
                }

                //--------------------------
            }

        }
        //--------------------------

        return terrain_objects_1x1;


    };




    //todo jsdoc
    proto$0.getTerrainOnPosition = function(position){


        for(var i=this.objects.length-1;i>=0;i--){
            if (this.objects[i].type != 'terrain')continue;


            if(this.objects[i].design.data.size<=position.getDistance(new T.Position(this.objects[i].x,this.objects[i].y))){
                return(this.objects[i]);
            }
        }

        return(null);

    };




    //todo jsdoc
    proto$0.getNearestTerrainPositionWithCode = function(position,terrain_code){

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

     getMapOfCollisionCodes(real_objects,position){
     return Terrain;
     };

     */

    

MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})());




/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Object
 */
//======================================================================================================================



T.Objects.Object = ((function(){"use strict";var proto$0={};

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
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================



T.Objects.Building = ((function(super$0){"use strict";super$0=T.Objects.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};


    proto$0.clone = function(){//todo all classes should have this method
        return(new T.Objects.Building(JSON.parse(JSON.stringify(this))));
    };


    proto$0.getModel = function(){
        if(!(this.design.data instanceof T.Model)){
            this.design.data=new T.Model(this.design.data);
        }

        return(this.design.data);
    };


    proto$0.getActionAbility = function(action_key){

        return this.actions[action_key];

    };

MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Natural
 */
//======================================================================================================================




T.Objects.Natural = ((function(super$0){"use strict";super$0=T.Objects.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};

    proto$0.clone = function(){//todo all classes should have this method
        return(new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
    };


    proto$0.getCode = function(){
        return(this.design.data.image);
    };



MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================



T.Objects.Story = ((function(super$0){"use strict";super$0=T.Objects.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};

    proto$0.clone = function(){//todo all classes should have this method
        return(new T.Objects.Story(JSON.parse(JSON.stringify(this))));
    };

    proto$0.getMarkdown = function(){
        return(this.content.data);
    };




MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================



T.Objects.Terrain = ((function(super$0){"use strict";super$0=T.Objects.Object;function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};


    proto$0.clone = function(){//todo all classes should have this method
        return(new T.Objects.Terrain(JSON.parse(JSON.stringify(this))));
    };


    proto$0.getCode = function(prefered_width){

        return(this.design.data.image);

    };


    proto$0.getColor = function(){

        return(this.design.data.color);

    };






    //todo getImage(){}


MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());


/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Path
 */
//======================================================================================================================



T.Path = ((function(){"use strict";var static$0={},proto$0={};


    /**
     * @param {T.Position} start
     * @param {T.Position} end
     * @param {number} speed in parcel/s
     * @param {array} map collision
     * @param {object} Position map_topleft center of collision map
     //todo colision map
     * @constructor
     */
    function constructor$0(start, end, speed, map, map_topleft) {

        var distance,xNext,yNext;

        this.positions = [];

        //--------------


        if (map[Math.round(end.y) - map_topleft.y][Math.round(end.x) - map_topleft.x] === false) {

            throw 'Wrong Destination';//todo throw real Errors not strings
        }


        //--------------

        T.ArrayFunctions.iterate2D(map, function (y, x) {
            if (map[y][x] !== false)
                map[y][x] = true;
        });


        //--------------

        map[Math.round(start.y) - map_topleft.y][Math.round(start.x) - map_topleft.x] = 0;




        var pathfinder1/*todo better name*/ = function (y, x) {

            if (typeof map[y][x] === 'number' && map[y][x] >= 0) {

                for (var yNext = y - 1; yNext <= y + 1; yNext++) {
                    for (var xNext = x - 1; xNext <= x + 1; xNext++) {


                        if (map[yNext][xNext] === true || limit < 2)
                            if (xNext == x ? yNext != y : yNext == y)
                                if (!(xNext == x && yNext == y))
                                    if (xNext >= 0)
                                        if (yNext >= 0)
                                            if (xNext < (map_radius * 2))/*todo is it OK to use (map_radius*2)???*/
                                                if (yNext < (map_radius * 2)) {

                                                    var distance = T.Math.xy2dist(yNext - y, xNext - x);
                                                    //r(distance,map[y][x] - Math.abs(map[yNext][xNext]),limit);
                                                    if ((map[yNext][xNext] === true || limit < 2) /*&& map[y][x] - Math.abs(map[yNext][xNext])>distance*/) {

                                                        //r('OK');
                                                        map[yNext][xNext] = -(map[y][x] + /*map[yNext][xNext]*/distance);
                                                        //r(map[yNext][xNext],map[y][x] + map[yNext][xNext]);
                                                    }
                                                }


                    }
                }


            }


        };

        var pathfinder2/*todo better name*/ = function (y, x) {
            if (typeof map[y][x] === 'number')
                map[y][x] = Math.abs(map[y][x]);
        };

        var finished = false;
        for (var limit = 0; limit < 100 && !finished; limit++) {


            T.ArrayFunctions.iterate2D(map, pathfinder1);

            T.ArrayFunctions.iterate2D(map, pathfinder2);


            //r(map[Math.round(end.y)-map_topleft.y][Math.round(end.x)-map_topleft.x]);
            if (typeof map[Math.round(end.y) - map_topleft.y][Math.round(end.x) - map_topleft.x] == 'number') {
                finished = true;
            }

        }

        //--------------

        //mapWindow(map);

        if (!finished) {
            throw 'Cant find path';
        }

        //--------------


        finished = false;
        var x = Math.round(end.x) - map_topleft.x,
            y = Math.round(end.y) - map_topleft.y;


        for (limit = 0; limit < 20 && !finished; limit++) {

            if (limit !== 0)
                this.positions.push(new T.Position(x + map_topleft.x, y + map_topleft.y));

            distance = 0;
            xNext = false;
            yNext = false;

            for (var yTest = y - 1; yTest <= y + 1; yTest++) {
                for (var xTest = x - 1; xTest <= x + 1; xTest++) {


                    //r(xTest-x,yTest-y);

                    if (xTest != x || yNext != y)
                        if (xTest >= 0)
                            if (yTest >= 0)
                                if (xTest < (map_radius * 2))/*todo is it OK to use (map_radius*2)???*/
                                    if (yTest < (map_radius * 2))
                                        if (typeof map[yTest][xTest] === 'number') {

                                            //r(map[y][x] - map[yTest][xTest]);
                                            if (map[y][x] - map[yTest][xTest] >= distance) {

                                                distance = map[y][x] - map[yTest][xTest];
                                                xNext = xTest;
                                                yNext = yTest;

                                            }


                                        }

                }
            }

            if (xNext === false || yNext === false)throw new Error('Error in path', xNext, yNext);

            //r(xNext-x,yNext-y,distance);
            //ewrgfd;

            x = xNext;
            y = yNext;

            if (x == Math.round(start.x) - map_topleft.x && y == Math.round(start.y) - map_topleft.y) {
                finished = true;
            }


        }

        //--------------

        this.positions.push(start);
        this.positions.reverse();
        this.positions.push(end);


        //------------------------------------------

        this.times = [new Date()];
        var ms = this.times[0].getTime();

        for (var i = 1, l = this.positions.length; i < l; i++) {

            distance = T.Math.xy2dist(this.positions[i].x - this.positions[i - 1].x, this.positions[i].y - this.positions[i - 1].y);

            ms += Math.round(distance * 1000 / speed);

            this.times.push(new Date(ms));


        }


    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


//----------------------------------------------------------

    /**
     * @return {object} Position current
     */
    proto$0.recount = function() {


        var actualDate = new Date();
        var actualMs = actualDate.getTime();


        for (var i = 0, l = this.times.length - 1; i < l; i++) {


            var chunkStartMs = this.times[i].getTime();
            var chunkStopMs = this.times[i + 1].getTime();

            if (actualMs >= chunkStartMs && actualMs < chunkStopMs) {

                var chunkProgress = (actualMs - chunkStartMs) / (chunkStopMs - chunkStartMs);

                var chunkXDelta = this.positions[i + 1].x - this.positions[i].x;
                var chunkYDelta = this.positions[i + 1].y - this.positions[i].y;

                return (new T.Position(this.positions[i].x + (chunkXDelta * chunkProgress), this.positions[i].y + (chunkYDelta * chunkProgress)));


            }


        }

        return (false);

    };

    //----------------------------------------------------------

    /**
     *
     * @return {number} current rotation in degrees
     */
    proto$0.rotation = function() {


        var actualDate = new Date();
        var actualMs = actualDate.getTime();


        for (var i = 0, l = this.times.length - 1; i < l; i++) {


            var chunkStartMs = this.times[i].getTime();
            var chunkStopMs = this.times[i + 1].getTime();

            if (actualMs >= chunkStartMs && actualMs < chunkStopMs) {

                var chunkXDelta = this.positions[i + 1].x - this.positions[i].x;
                var chunkYDelta = this.positions[i + 1].y - this.positions[i].y;

                var chunkDistDeg = T.Math.xy2distDeg(chunkYDelta, chunkXDelta);
                return (chunkDistDeg.deg + 90);


            }


        }

        return (false);

    };


    //----------------------------------------------------------

    /**
     * @return {boolean} is this in progress = true, finished or not yet started=false
     */
    proto$0.inProgress = function() {

        var stopMs = this.times[this.times.length - 1];

        var actualDate = new Date();
        var actualMs = actualDate.getTime();

        return (actualMs < stopMs);

    };


    //----------------------------------------------------------


    /**
     * @static
     * @param {object} T.Path
     * @return {boolean} true = inserted object is path and it is in progress
     */
    static$0.is = function(path) {


        if (!is(path)) return false;
        if (!is(path.inProgress)) return false;
        if (!path.inProgress()) return false;

        return true;

    };

MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================


T.Position3D = ((function(){"use strict";var proto$0={};


    function constructor$0(x,y,z){

        if(typeof x == 'object'){

            this.x= x.x;
            this.y= x.y;
            this.z= x.z;

        }else{

            this.x= x;
            this.y= y;
            this.z= z;

        }

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});



    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    proto$0.clone = function(){
        return new T.Position3D(this);
    };



    /**
     * Converts Position3D to simple string
     * @return {string}
     */
    proto$0.toString = function(){

        return '['+this.x+','+this.y+','+this.z+']';

    };



MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());





/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================


T.PositionPolar = ((function(){"use strict";var proto$0={};

    function constructor$0(distance,degrees){

        if(typeof distance == 'number' && typeof degrees == 'number'){

            this.distance= distance;
            this.degrees= degrees;

        }
        //todo check

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    proto$0.clone = function(){
        return new T.PositionPolar(this);
    };



    proto$0.getPosition = function(){

        var radians = this.getRadians();

        return(new T.Position(
            Math.cos(radians)*this.distance,
            Math.sin(radians)*this.distance
        ));


    };


    proto$0.getDistance = function(){

        return this.distance;

    };


    proto$0.getDegrees = function(){

        return this.degrees;

    };


    proto$0.getRadians = function(){

        return T.Math.deg2rad(this.degrees);

    };



    /**
     * Converts Position to simple string
     * @return {string}
     */
    proto$0.toString = function(){

        return ''+this.distance+','+this.degrees+'°';

    };



MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());





/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================


/**
 * Global position on towns map
 */
T.Position = ((function(){"use strict";var proto$0={};

    function constructor$0(x,y){


        if(typeof x == 'object'){

            this.x= x.x;
            this.y= x.y;

        }else
        if(/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x)){

            x= x.split(',');
            this.x= parseFloat(x[0]);
            this.y= parseFloat(x[1]);

        }else
        if(typeof x == 'number' && typeof y == 'number'){

            this.x= x;
            this.y= y;

        }
        //todo check

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    proto$0.clone = function(){
        return new T.Position(this);
    };



    proto$0.plus = function(position){

        this.x+=position.x;
        this.y+=position.y;
        return this;

    };


    proto$0.multiply = function(k){

        this.x=this.x*k;
        this.y=this.y*k;
        return this;

    };



    proto$0.getPositionPolar = function(){

        return(new T.PositionPolar(
            T.Math.xy2dist(this.x,this.y),
            T.Math.rad2deg(Math.atan2(this.y,this.x))
        ));

    };


    proto$0.getDistance = function(position){

        return T.Math.xy2dist(position.x-this.x,position.y-this.y);

    };


    /**
     * Converts Position to simple string
     * @return {string}
     */
    proto$0.toString = function(){

        return ''+this.x+','+this.y+'';

    };



MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());





/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================




T.Resources = ((function(){"use strict";var static$0={},proto$0={};

    /**
     * @param {object} Resources
     * @constructor
     */
    function constructor$0(resources)
    {

        for (var key in resources) {
            if (typeof resources[key] == 'number') {
                this[key] = Math.ceil(resources[key]);
            }
        }

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     * @static
     * @return {array} new Resources
     */
    static$0.newSingles = function(resources){

        var resources_array = [];

        for (var key in resources) {
            if (typeof resources[key] == 'number') {
                if (resources[key] > 0) {

                    var resources_ = {};
                    resources_[key] = resources[key];

                    resources_array.push(new T.Resources(resources_));

                }
            }
        }

        return resources_array;

    };


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    proto$0.clone = function(){
        return new T.Resources(this);
    };



    /**
     * Checks whether this contains a given resources
     * @param {object} Resources
     * @return {bool} contains
     */
    proto$0.contains = function(resources){

        for (var key in resources) {

            if (typeof this[key] == 'number') {
                return false;
            }

            if (this[key] < resources[key]) {
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
    proto$0.add = function(resources){

        for (var key in resources) {

            if (typeof this[key] == 'undefined') {
                this[key] = 0;
            }

            if (typeof this[key] == 'number') {
                this[key] += resources[key];
            }

        }

        return this;

    };



    /**
     * @param {number} k
     * @return this
     */
    proto$0.multiply = function(k){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                this[key] = Math.ceil(this[key] * k);
            }


        }

        return this;

    };



    /**
     * @param {number} k
     * @return this
     */
    proto$0.signum = function(k){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] > 0) {

                    this[key] = 1;

                } else {

                    this[key] = 0;

                }

            }


        }

        return this;

    };



    /**
     * @param {function} modifier
     * @return this
     */
    proto$0.apply = function(modifier){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                this[key] = modifier(this[key]);
            }

        }

        return this;

    };



    /**
     *
     * @return {Array} all resources keys
     */
    proto$0.extractKeys = function(){

        var keys = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                keys.push(key);
            }


        }

        return (keys);

    };



    /**
     *
     * @param {object} Resoures
     * @return {number} Distance between this and given Resources
     */
    proto$0.compare = function(resoures){

        var resources_A = this;
        var resources_B = resoures;

        var keys = [];

        keys = keys.concat(resources_A.extractKeys());
        keys = keys.concat(resources_B.extractKeys());


        keys = keys.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });


        var distance = 0;

        for (var i in keys) {

            var key = keys[i];

            var val_A = resources_A[key];
            var val_B = resources_B[key];


            if (typeof val_A == 'undefined')val_A = 0;
            if (typeof val_B == 'undefined')val_B = 0;

            distance += Math.pow(val_A - val_B, 2);

        }

        distance = Math.sqrt(distance);


        return (distance);

    };



    /**
     * Remove given resources
     * @param {object} Resources
     * @return {bool} success
     */
    proto$0.remove = function(resources){

        if (!this.contains(resources))return false;

        for (var key in resources) {

            this[key] -= resources[key];

        }

        return true;

    };



    /**
     * Converts Resources to simple string
     * @return {string}
     */
    proto$0.toString = function(){

        var strings = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] !== 0) {
                    strings.push(this[key] + ' ' + key);
                }

            }

        }

        return strings.join(', ');

    };



    proto$0.toHTML = function(){//todo put url prefix into params

        var strings = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] !== 0) {

                    var name = T.Locale.get('resource', key);
                    var value = this[key];

                    value = value.toLocaleString(/*'en-US''de-DE'*/);//todo todo better solution

                    strings.push('<div><img src="/media/image/resources/' + key + '.png" title="' + name + '" alt="' + name + '" >' + value + '</div>');
                }

            }

        }
        strings = strings.join(' ');
        strings = '<div class="resources">' + strings + '</div>';

        return strings;

    };



MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================


T.User = ((function(){"use strict";var proto$0={};


    /**
     * @param {object} user raw user data
     */
    function constructor$0(user){

        for(var key in user){
            var this_key = key;
            this[this_key] = user[key];
        }

    }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});


    /**
     *
     * @returns {string} HTML code of users signature
     */
    proto$0.getSignatureHTML = function(){

        var name;

        if(this.profile.name || this.profile.surname){

            name = this.profile.name+' '+this.profile.surname;

        }else{

            name = this.profile.username;

        }


        var email_md5 = md5(this.profile.email);


        var signature_html = ("\
\n\
\n                <div class=\"user-signature\">\
\n                    <img class=\"user-image\" src=\"https://1.gravatar.com/avatar/") + email_md5 + ("?s=80&r=pg&d=mm\">\
\n\
\n                    <div class=\"user-signature-text\">\
\n                        <h1 class=\"user-name\">")+name+("</h1>\
\n                        <p>")+this.profile.signature.html2text()+("</p>\
\n                    </div>\
\n\
\n                </div>\
\n\
\n            ");

        return(signature_html);

    };


MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());

/**
 * @author ©Towns.cz
 * @fileOverview Creates instance T.World.terrains
 */
//======================================================================================================================
T.setNamespace('World');



T.World.terrains = [
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
 * @fileOverview Creates instance T.World.mapGenerator
 */
//======================================================================================================================



T.World.mapGenerator = new T.MapGenerator(

    T.Math.blurXY(function(x,y){

        //todo//var key='x'+x+'y'+y;
        //todo//if(typeof z_map_cache[key]!='undefined'){
        //todo//    return(z_map_cache[key]);
        //todo//}


        var div=100;


        var n= 0;
        var max_possible_n=0;

        var _x,_y;

        var k=0.4;
        var k_=1-k;

        for(var i= 0;i<11;i++){

            n += Math.round(Math.pow(x*y-66, 2)) % (div + 1);

            max_possible_n+=div;

            //x=Math.floor(x/3);
            //y=Math.floor(y/3);
            //var xy = T.Math.xyRotate(x,y,57);
            //x=xy.x;
            //y=xy.y;

            _x=(-y*k)+(x*k_);
            _y=(x*k)+(y*k_);

            x=Math.floor(_x/4);
            y=Math.floor(_y/4);
        }



        n=n/max_possible_n;

        if(n<0)n-=Math.floor(n);
        if(n>1)n-=Math.floor(n);

        //todo//z_map_cache[key]=n;
        return(n);

    },2)
    ,
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0001,0.0001,0.0001,0.0001,0.0001,0.0001,0.0002,0.0003,0.0003,0.0005,0.0006,0.0007,0.0009,0.001,0.001,0.001,0.0012,0.0014,0.0015,0.0016,0.0021,0.0025,0.003,0.0033,0.0034,0.0037,0.0038,0.0042,0.0046,0.0049,0.0057,0.0065,0.0068,0.0072,0.0074,0.0079,0.0084,0.009,0.0096,0.0105,0.0115,0.0123,0.0131,0.0142,0.0148,0.0159,0.0166,0.0184,0.019,0.0204,0.021,0.022,0.0232,0.0245,0.026,0.0266,0.0277,0.029,0.0297,0.031,0.0318,0.0331,0.0346,0.0361,0.0378,0.0389,0.0404,0.0414,0.0431,0.0456,0.0475,0.0501,0.0517,0.0533,0.0548,0.0566,0.0589,0.0609,0.0622,0.0635,0.0658,0.0678,0.0692,0.0712,0.0733,0.0751,0.0774,0.079,0.0813,0.0837,0.0859,0.088,0.0902,0.0927,0.0961,0.0988,0.1003,0.1031,0.105,0.1071,0.11,0.1113,0.1137,0.1165,0.1187,0.1218,0.1243,0.1277,0.1297,0.1323,0.1353,0.1371,0.1395,0.1426,0.1449,0.1474,0.1509,0.1536,0.156,0.1582,0.1605,0.1633,0.1662,0.1692,0.1726,0.1755,0.1781,0.1813,0.1842,0.1869,0.1899,0.1939,0.1975,0.2001,0.2029,0.207,0.2108,0.2135,0.2158,0.2187,0.221,0.2238,0.226,0.2283,0.2326,0.2362,0.2394,0.2427,0.2455,0.2485,0.2508,0.2532,0.2568,0.2594,0.2628,0.2651,0.2678,0.2712,0.2738,0.276,0.2792,0.2819,0.2852,0.2885,0.2908,0.2943,0.2969,0.2994,0.3019,0.3049,0.3077,0.3108,0.3135,0.3162,0.3194,0.3216,0.3243,0.3276,0.3307,0.3334,0.336,0.3386,0.3421,0.3443,0.3462,0.3484,0.351,0.3535,0.3569,0.3593,0.3618,0.3642,0.3659,0.3681,0.3706,0.3722,0.3742,0.3772,0.3794,0.3816,0.3837,0.3865,0.3879,0.3907,0.3925,0.3947,0.3967,0.3985,0.3998,0.4021,0.4035,0.4054,0.4067,0.4088,0.4107,0.4133,0.4141,0.4161,0.4177,0.4193,0.4209,0.4219,0.4234,0.4245,0.4264,0.4283,0.4302,0.4318,0.4327,0.4346,0.4363,0.4381,0.44,0.4409,0.4435,0.445,0.4462,0.4484,0.4492,0.4506,0.4518,0.4533,0.4548,0.4554,0.456,0.4573,0.4588,0.4605,0.4616,0.463,0.4638,0.4656,0.4663,0.4672,0.4684,0.4696,0.4708,0.4721,0.473,0.4737,0.4747,0.4756,0.4765,0.4781,0.4791,0.4802,0.4809,0.4819,0.4824,0.483,0.4838,0.4847,0.4859,0.4865,0.487,0.4875,0.4883,0.4894,0.4901,0.4907,0.4915,0.4929,0.4934,0.494,0.4949,0.4955,0.496,0.4967,0.4971,0.4975,0.4981,0.499,0.4997,0.5005,0.5008,0.5018,0.5024,0.5032,0.5038,0.5042,0.5046,0.505,0.5059,0.5067,0.507,0.5074,0.5077,0.5084,0.5086,0.5095,0.5104,0.5109,0.5117,0.5122,0.5129,0.5136,0.514,0.5141,0.5145,0.515,0.5153,0.5157,0.5162,0.5169,0.5172,0.5176,0.518,0.5186,0.5193,0.5197,0.5202,0.5207,0.5209,0.5214,0.5218,0.5223,0.5231,0.5237,0.5244,0.5246,0.5249,0.5259,0.5261,0.5269,0.5272,0.5275,0.5281,0.5283,0.5285,0.5291,0.5302,0.531,0.5317,0.532,0.5326,0.5334,0.5336,0.5341,0.5343,0.5345,0.5349,0.5353,0.5357,0.5364,0.5377,0.5382,0.5388,0.5393,0.5399,0.5403,0.5412,0.5419,0.543,0.5437,0.5446,0.5457,0.5466,0.5476,0.5482,0.5486,0.5491,0.5495,0.5503,0.5506,0.5515,0.5522,0.5527,0.554,0.555,0.5553,0.5557,0.5562,0.5569,0.5578,0.5586,0.5595,0.5608,0.5616,0.5626,0.5634,0.5645,0.5652,0.5667,0.5673,0.5683,0.5697,0.5707,0.5723,0.5739,0.575,0.5758,0.5771,0.5779,0.5791,0.5803,0.5817,0.5833,0.5849,0.5865,0.5876,0.5884,0.5899,0.5919,0.5929,0.5942,0.5954,0.5969,0.5987,0.5998,0.6018,0.6036,0.6052,0.6063,0.6077,0.6099,0.6116,0.6136,0.6154,0.6166,0.6185,0.6201,0.6223,0.6238,0.6258,0.6278,0.6295,0.631,0.6324,0.6344,0.6358,0.6372,0.6395,0.6414,0.6434,0.6451,0.6472,0.6493,0.6513,0.6536,0.6559,0.6578,0.6598,0.6622,0.6638,0.667,0.6696,0.671,0.674,0.6765,0.679,0.6811,0.6836,0.6861,0.6884,0.6903,0.6933,0.6946,0.6976,0.6997,0.7027,0.7049,0.7084,0.7109,0.7128,0.7164,0.7189,0.7222,0.7245,0.7271,0.7305,0.7326,0.7367,0.7398,0.7421,0.7443,0.7461,0.7483,0.7507,0.754,0.7566,0.7587,0.7615,0.7639,0.7662,0.7693,0.7723,0.7753,0.7769,0.7797,0.7822,0.7843,0.7869,0.7891,0.7918,0.7944,0.7982,0.801,0.8041,0.8068,0.8094,0.812,0.8148,0.8174,0.82,0.8219,0.824,0.8259,0.8287,0.8311,0.8333,0.8349,0.8374,0.841,0.8433,0.8456,0.8481,0.8518,0.854,0.8562,0.8588,0.862,0.864,0.8666,0.8693,0.8719,0.8737,0.8749,0.8773,0.8793,0.8816,0.8839,0.887,0.8888,0.8905,0.8924,0.8948,0.8966,0.8986,0.9009,0.9029,0.9039,0.9063,0.908,0.9095,0.911,0.9125,0.915,0.9173,0.9186,0.9209,0.9228,0.9249,0.9259,0.927,0.929,0.9303,0.9322,0.9332,0.9343,0.9356,0.9372,0.9387,0.9407,0.9427,0.944,0.9459,0.9473,0.949,0.9508,0.9521,0.9533,0.9555,0.9569,0.958,0.9592,0.9606,0.9612,0.9617,0.962,0.9627,0.9642,0.9646,0.9658,0.967,0.968,0.9684,0.9688,0.9698,0.9706,0.9719,0.9727,0.974,0.9747,0.9761,0.9774,0.9785,0.9793,0.9802,0.9811,0.9817,0.9823,0.9828,0.984,0.9846,0.9851,0.9858,0.9863,0.9869,0.987,0.9874,0.9879,0.9886,0.9888,0.9895,0.9903,0.9904,0.9907,0.9912,0.9913,0.9917,0.992,0.9928,0.9929,0.9936,0.9939,0.9942,0.9946,0.9949,0.9955,0.9955,0.9959,0.9963,0.9964,0.9966,0.9966,0.9968,0.9969,0.9971,0.9973,0.9978,0.9981,0.9985,0.9986,0.9988,0.9988,0.9989,0.9989,0.999,0.999,0.999,0.9993,0.9993,0.9993,0.9993,0.9993,0.9993,0.9996,0.9996,0.9997,0.9997,0.9997,0.9998,0.9999,0.9999,0.9999,0.9999,0.9999,0.9999,0.9999,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ,

    new T.MapGenerator.Biotope([

        { amount: 120 , terrain: T.World.terrains[ 1]},//moře
        { amount: 40 , terrain: T.World.terrains[11]},//řeka
        { amount: 30 , terrain: T.World.terrains[ 4]},//písek
        { amount: 20 , terrain: T.World.terrains[12]},//tráva jaro
        { amount: 40 , terrain: T.World.terrains[ 9]},//tráva toxic
        { amount: 20 , terrain: T.World.terrains[10]},//les
        { amount: 10 , terrain: T.World.terrains[ 8]},//tráva normal
        { amount: 20 , terrain: T.World.terrains[10]},//les
        { amount: 20 , terrain: T.World.terrains[12]},//tráva jaro
        { amount: 50 , terrain: T.World.terrains[ 4]},//písek
        { amount: 10 , terrain: T.World.terrains[13]},//tráva pozim
        { amount: 20 , terrain: T.World.terrains[ 5]},//kamení
        { amount: 60 , terrain: T.World.terrains[ 3]},//sníh/led
        { amount: 5 , terrain: T.World.terrains[10]},//les
        { amount: 60 , terrain: T.World.terrains[ 7]},//sníh/led
        { amount: 10 , terrain: T.World.terrains[ 5]},//kamení



    ]),


    function(object,virtual_objects){

        if(object.type!='terrain')return;

        if(object.getCode()==5){
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
        if(object.getCode()==10){
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
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================


var K=0.05;


T.World.game = new T.Game(
    {
        //---------------------------------------------Defense
        'defense': new T.Game.Action(
            'PASSIVE',
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
        'regenerate': new T.Game.Action(
            'PASSIVE',
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
        'repair': new T.Game.Action(
            'ACTIVE',
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
            function(object,by){

            }
        ),
        //---------------------------------------------Mine
        'mine': new T.Game.Action(
            'PASSIVE',
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
        'attack': new T.Game.Action(
            'ACTIVE',
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
            }),function(object_attacker,object_attacked,resources_attacker){

                r(object_attacker.getActionAbility('attack'));
                r(object_attacker.getActionAbility('defence'));
                r(object_attacked.getActionAbility('defence'));




            }
        ),
        //---------------------------------------------Move
        'move': new T.Game.Action(
            'ACTIVE',
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
            function(object,position,objects){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new T.Game.Action(
            'PASSIVE',
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
        )/**/
        //---------------------------------------------


    },
    T.Math.prettyNumber,
    T.Math.prettyNumber

);