/**
 * @author ©Towns.cz
 * @fileOverview Creates class resources
 */
//======================================================================================================================
//Creating module


var Resources = module.exports = function(resources){

    for(var key in resources){
        this[key]=resources[key];
    }

};




/**
 * Checks whether this contains a given resources
 * @param {object} Resources
 * @return {bool}
 */
Resources.prototype.contains = function(resources){
    //todo
};



/**
 * Add given resources
 * @param {object} Resources
 * @return {bool}
 */
Resources.prototype.add = function(resources){
    //todo
};



/**
 * Remove given resources
 * @param {object} Resources
 * @return {bool}
 */
Resources.prototype.remove = function(resources){
    //todo
};
