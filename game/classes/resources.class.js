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
 * @static
 * @return {array} new Resources
 */
Resources.newSingles = function(resources){

    var resources_array=[];

    for(var key in resources){
        if(typeof resources[key]=='number') {
            if(resources[key]>0) {

                var resources_={};
                resources_[key]=resources[key];

                resources_array.push(new Resources(resources_));

            }
        }
    }

    return resources_array;

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
 * @param {function} modifier
 * @return this
 */
Resources.prototype.apply = function(modifier){

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
Resources.prototype.extractKeys = function(){

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
Resources.prototype.compare = function(resoures){

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
Resources.prototype.remove = function(resources){

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

