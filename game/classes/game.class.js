/**
 * @author ©Towns.cz
 * @fileOverview Creates static class game
 */
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

    return(price_base);

};




/**
 *
 * @param {object} Object
 * @return {array} of Resources
 */
Game.prototype.getObjectPrices = function(object){

    var price_bases=this.getObjectPriceBases(object);


    var self=this;
    var prices=[];


    object.actions.forEach(function(action,i){

        var action_type = self.action_type_list[action.type];

        var price_resource = action_type.price_resource.clone();

        price_resource.multiply(price_bases[i]);
        prices.push(price_resource);

    });

    return(prices);

};



/**
 *
 * @param {object} Object
 * @return {object} Resources - price of object
 */
Game.prototype.getObjectPrice = function(object){

    var prices=this.getObjectPrices(object);

    price = prices[0].clone().multiply(0);//todo maybe better

    //console.log('empty price',price);

    prices.forEach(function(price_){

        price.add(price_);

    });


    return(price);

};