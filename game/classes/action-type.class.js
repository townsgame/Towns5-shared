/**
 * @author ©Towns.cz
 * @fileOverview Creates class actions
 */
//======================================================================================================================
//Creating module

/**
 *
 * @param {string} type enum('active', 'passive', 'triggered') //todo refactor
 * @param {object} params {param: type}
 * @param {function} price_base
 * @param {array} price_resources
 * @param {function} perform
 * @constructor
 */
var ActionType = module.exports = function(type, params, price_base, price_resources, perform){
    this.type = type;
    this.params = params;
    this.price_base = price_base;
    this.price_resources = price_resources;
    this.perform = perform;
};
