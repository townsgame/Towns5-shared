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
     * @param {function} max_life_modifier
     * @param {function} price_key_modifier
     * @constructor
     */
    constructor(max_life_modifier,price_key_modifier){
    
        this.action_list = [];
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
    
    
        if(typeof object.actions.length==0){
            console.warn('In object '+object+' there are no actions!');//todo all objects should be converted to string like this
        }
    
    
        object.actions.forEach(function(action){
    

            var price_base = Math.ceil(action.countPriceBase());//

            //---------------Checking non negative value
            if(price_base<0){
                throw new Error('Params in action ability '+actionAbility.type+' should not make this action negative');//todo maybe only warn
            }
            //---------------

            price_bases.push(price_base);

    
    
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


        var price_bases=this.getObjectPriceBases(object);
    
    
        var self=this;
        var prices=[];

    
        var design_resources = object.getModel().aggregateResourcesVolumes();


        object.actions.forEach(function(action,i){
    

            var price_resources_list =
            action.getPriceResources().sort(function(a,b){//todo is it safe?
    
                return design_resources.compare(a.clone().signum())-design_resources.compare(b.clone().signum());
    
            });
    
    
            var price_resources = price_resources_list[0].clone();
    
    
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



    installActionClass(action_class){
        this.action_list.push(action_class);
    }



    getActionClass(action){

        for(var i= 0,l=this.action_list.length;i<l;i++){
            if(this.action_list[i].getType()==action.type){

                return this.action_list[i];

            }
        }

        throw new Error('In this game instance thare is no action class type '+action.type);

    }


    createActionInstance(action){
        action_class = getActionClass(action);
        return new action_class(action);
    }




    executeAction(action){

        var game = this;

        action_class = getActionClass(action);


        var execute = function(){

            var args = [game].push.call(arguments);
            return action_class.execute.apply(this,args);

        };


        return(execute);
    }



    getActionEmptyInstance(action){



    }



    /*getActionExecute(action_key){

        var action = this.action_list[action_key];

        if(typeof action=='undefined')throw new Error('Unknown action type '+action_key+'.');

        var game = this;



        var execute = function(){

            var args = [game].push.call(arguments);
            return action.execute_callback.apply(this,args);

        };



        return(execute);
    }*/
    
};