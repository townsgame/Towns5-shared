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
        if(typeof resources[key]=='number') {
            this[key] = Math.ceil(resources[key]);
        }
    }

};





/**
 * @param {number} k
 * @return {bool} success
 */
Resources.prototype.clone = function(){

    return new Resources(this);

};



/**
 * Checks whether this contains a given resources
 * @param {object} Resources
 * @return {bool} contains
 */
Resources.prototype.contains = function(resources){

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
Resources.prototype.add = function(resources){

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
 * @return {bool} success
 */
Resources.prototype.multiply = function(k){

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution
            this[key] = Math.ceil(this[key] * k);
        }


    }

    return this;

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





Resources.prototype.toString = function(){

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

