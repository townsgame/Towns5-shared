/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game
 */
//======================================================================================================================

/**
 * Game conditions
 */
T.Game = class{
    
    
     /**
     *
     * @param {Object.<T.Game.Action>} action_list
     * @param {function} max_life_modifier
     * @param {function} price_key_modifier
     * @constructor
     */
    constructor(action_list,max_life_modifier,price_key_modifier){
    
        this.action_list = action_list;
        this.max_life_modifier = max_life_modifier;
        this.price_key_modifier = price_key_modifier;
    
    }
    
    
    
    /**
     *
     * @param {object} Object
     * @return {array} of numbers
     */
    getObjectPriceBases(object){
    
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
    
    }
    
    
    
    /**
     *
     * @param {object} Object
     * @return {number} maximum life of object
     */
    getObjectMaxLife(object){
    
        var price_bases=this.getObjectPriceBases(object);
        var price_base = price_bases.reduce(function(pv, cv) { return pv + cv; }, 0);
    
    
        price_base=this.max_life_modifier(price_base);
    
        return(price_base);
    
    }
    
    
    
    
    /**
     *
     * @param {object} Object
     * @return {array} of Resources
     */
    getObjectPrices(object){
    
        //console.log(this);
    
        var price_bases=this.getObjectPriceBases(object);
    
    
        var self=this;
        var prices=[];
    
    
        if(typeof object.actions=='undefined'){
            return([]);
        }
    
        var design_resources = self.getObjectDesignPrice(object);
    
        object.actions.forEach(function(action_ability,i){
    
            var action = self.action_list[action_ability.type];
    
    
            action.ability_price_resources_list.sort(function(a,b){//todo is it safe?
    
                return design_resources.compare(a.clone().signum())-design_resources.compare(b.clone().signum());
    
            });
    
    
            var price_resources = action.ability_price_resources_list[0].clone();
    
    
            price_resources.multiply(price_bases[i]);
            prices.push(price_resources);
    
    
        });
    
        return(prices);
    
    }
    
    
    
    /**
     *
     * @param {object} Object
     * @return {object} Resources - price of object
     */
    getObjectPrice(object){
    
        var price = new T.Resources({});
    
        //console.log('empty price',price);
    
        var prices=this.getObjectPrices(object);
    
        prices.forEach(function(price_){
    
            price.add(price_);
    
        });
    
        price.apply(this.price_key_modifier);
    
        return(price);
    
    }
    


    /**
     * @param {T.Objects.Building} Object
     * @return {T.Resources} design amount of resources
     */
    getObjectDesignPrice(object){

        return object.getModel().aggregateResourcesVolumes();
    
    }



    getAction(action_key){

        var action = this.action_list[action_key];

        if(typeof action=='undefined')throw new Error('Unknown action type '+action_key+'.');


        return(action);
    }
    
};