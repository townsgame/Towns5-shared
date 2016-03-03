/**
 * @author ©Towns.cz
 * @fileOverview Creates class actions
 */
//======================================================================================================================
//Creating module

/**
 *
 * @param {string} type enum('active', 'passive', 'triggered')
 * @param {object} params {param: type}
 * @param {function} price_base
 * @param {array} price_resource_list
 * @param {function} perform
 * @constructor
 */
var Action = module.exports = function(type,params,price_base,price_resource_list,perform){
    //todo
};


/**
 *
 * @param {object} params
 * @return {number} amount of energy to create this action with given params
 */
Action.prototype.getPriceBase = function(params){
    //todo
};


/**
 *
 * @param {object} params
 * @return {array} possible combinations of resources to create this action with given params
 */
Action.prototype.getPriceResourceList = function(params){
    //todo
};
