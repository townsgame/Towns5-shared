/**
 * @author ©Towns.cz
 * @fileOverview Creates class Resources
 */
//======================================================================================================================
//Creating module


/**
 * @param {object} Resources
 * @constructor
 */
var Resources = module.exports = function(resources){

    for(var key in resources){
        //todo check
        this[key]=resources[key];
    }

};





/**
 * @param {number} k
 * @return {bool} success
 */
Resources.prototype.deepCopy = function(){

    return new Resources(this);

};



/**
 * Checks whether this contains a given resources
 * @param {object} Resources
 * @return {bool} contains
 */
Resources.prototype.contains = function(resources){

    for(var key in resources){

        if(!isDefined(this[key])){
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
Resources.prototype.add = function(resources){

    for(var key in resources){

        if(!isDefined(this[key])){
            this[key]=0;
        }

        this[key]+=resources[key];

    }

    return true;

};



/**
 * Remove given resources
 * @param {object} Resources
 * @return {bool} success
 */
Resources.prototype.remove = function(resources){

    if(!this.contains(resources))return false;

    for(var key in resources){

        this[key]-=resources[key];

    }

    return true;

};




/**
 * @param {number} k
 * @return {bool} success
 */
Resources.prototype.multiply = function(k){

    for(var key in this){

        this[key] = this[key] * k;

    }

    return true;

};