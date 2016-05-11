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
     * @param {Object.<T.Game.ActionType>} action_type_list
     * @param {function} max_life_modifier
     * @param {function} price_key_modifier
     * @constructor
     */
    constructor(action_type_list,max_life_modifier,price_key_modifier){
    
        this.action_type_list = action_type_list;
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
    
        object.actions.forEach(function(action,i){
    
            var action_type = self.action_type_list[action.type];
    
    
            action_type.price_resources_list.sort(function(a,b){//todo is it safe?
    
                return design_resources.compare(a.clone().signum())-design_resources.compare(b.clone().signum());
    
            });
    
    
            var price_resources = action_type.price_resources_list[0].clone();
    
    
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
     * todo maybe this should be under model.class.js?
     * @param {object} Object
     * @return {object} Resources - design amount of resources
     */
    getObjectDesignPrice(object){
    
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
    
    }



    createAction(action_key,object){

        var action_type = this.action_type_list[action_key];
        var action_config = object.actions[action_key];

        if(typeof action_type=='undefined')throw new Error('Unknown action type '+action_key+'.');
        if(typeof action_config=='undefined')throw new Error('Object '+object.name+' has no action '+action_key+'.');

        var action = new T.Game.Action(action_type,action_config);

        return(action);
    }
    
};