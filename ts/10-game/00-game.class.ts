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
    
        this.action_classes = {};
        this.action_empty_instances = {};
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
    
    
        if(typeof object.actions.length===0){
            console.warn('In object '+object+' there are no actions!');//todo all objects should be converted to string like this
        }
    
    
        object.actions.forEach(function(action){
    

            var price_base = Math.ceil(action.countPriceBase());//


            //---------------Checking NaN  value
            if(isNaN(price_base)){
                console.warn('Params in action ability '+action.type+' makes price bese NaN.');
                price_base=0;
            }
            //---------------

            //---------------Checking non negative value
            if(price_base<0){
                throw new Error('Params in action ability '+action.type+' should not make this action negative');//todo maybe only warn
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



    installActionClass(action_empty_instance_params,action_class){

        var type = action_class.getType();

        if(typeof type!=='string'){
            throw new Error('Error while installing action class into game instance: action class has no type!');
        }else
        if(typeof this.action_classes[type] !== 'undefined'){
            throw new Error('Error while installing action class into game instance: there is already installed action with type '+type);
        }



        var action_empty_instance = new action_class({
            type: type,
            params: action_empty_instance_params
        });


        //Adding method clone to installed action class
        action_class.prototype.clone = function(){
            return(new action_class(JSON.parse(JSON.stringify(this))));
        };


        
        this.action_classes[type] = action_class;
        this.action_empty_instances[type] = action_empty_instance;
    
    
    
    }



    getActionClass(action_type){

        var action_class = this.action_classes[action_type];

        if(typeof action_class=='undefined'){

            throw new Error('In this game instance thare is no action class type '+action_type+'. There are only these action types: '+ T.ArrayFunctions.getKeys(this.action_classes).join(', '));

        }

        return(action_class);

    }


    newActionInstance(action){

        //todo solve defense vs. defence
        if(action.type==='defense'){
            action.type='defence';
            action.params.defence=action.params.defense;
            delete action.params.defense;
        }

        var action_class = this.getActionClass(action.type);

        return new action_class(action);
    }




    createActionExecute(action_type){

        var game = this;

        var action_class = this.getActionClass(action_type);


        var execute = function (...args){

            args.unshift(game);

            return action_class.execute.apply(this,args);

        };


        return(execute);
    }



    getActionEmptyInstance(action_type){

        var action_instance = this.action_empty_instances[action_type];

        if(typeof action_instance==='undefined'){
            throw new Error('In this game instance thare is no action class type '+action_type);
        }

        return(action_instance);


    }



    /*getActionExecute(action_key){

        var action = this.action_classes[action_key];

        if(typeof action=='undefined')throw new Error('Unknown action type '+action_key+'.');

        var game = this;



        var execute = function(){

            var args = [game].push.call(arguments);
            return action.execute_callback.apply(this,args);

        };



        return(execute);
    }*/
    
};