/**
 * @author ©Towns.cz
 * @fileOverview Creates static class game
 */
//======================================================================================================================
//Loading modules

if(typeof Resources=='undefined'){

    require(__dirname+'/../classes-static/math.static.js');

    var Resources = require(__dirname+'/resources.class.js');
    var Model = require(__dirname+'/model.class.js');

}



//======================================================================================================================
//Creating module

/**
 *
 * @param {array} action_type_list
 * @constructor
 */
var Game = module.exports = function(action_type_list){

    this.action_type_list = action_type_list;

};



/**
 *
 * @param {object} Object
 * @return {array} of numbers
 */
Game.prototype.getObjectPriceBases = function(object){

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
Game.prototype.getObjectMaxLife = function(object){

    var price_bases=this.getObjectPriceBases(object);
    var price_base = price_bases.reduce(function(pv, cv) { return pv + cv; }, 0);


    price_base=Math.prettyNumber(price_base);

    return(price_base);

};




/**
 *
 * @param {object} Object
 * @return {array} of Resources
 */
Game.prototype.getObjectPrices = function(object){

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

            return design_resources.compare(A)-design_resources.compare(B);

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
Game.prototype.getObjectPrice = function(object){

    var price = new Resources({});

    //console.log('empty price',price);

    var prices=this.getObjectPrices(object);

    prices.forEach(function(price_){

        price.add(price_);

    });

    price.prettyNumbers();

    return(price);

};


/**
 * todo maybe this should be under model.class.js?
 * @param {object} Object
 * @return {object} Resources - design amount of resources
 */
Game.prototype.getObjectDesignPrice = function(object){

    if(!object.hasOwnProperty('design'))throw new Error('Object should have design!');
    if(object.design.type!='model')throw new Error('Object should have design of type model!');


    var price = new Resources({});


    model = new Model(object.design.data);

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


    return(price);

};
