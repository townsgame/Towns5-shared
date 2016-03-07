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
    this.type = type;
    this.params = params;
    this.price_base = price_base;
    this.price_resource_list = price_resource_list;
    this.perform = perform;
};


/**
 *
 * @param {object} params
 * @return {number} amount of energy to create this action with given params
 */
Action.prototype.getPriceBase = function(params){

    var price = this.price_base(params);
    return(price);

};


/**
 *
 * @param {object} params
 * @return {array} possible combinations of resources to create this action with given params
 */
Action.prototype.getPriceResourceList = function(params){

    var price = this.getPriceBase(params);

    var price_resource_list = [];

    this.price_resource_list.forEach(function(resources){

        price_resource_list.push(
            resources.deepCopy().multiply(price)
        );

    });

    return(price_resource_list);

};
