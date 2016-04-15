/**
 * @author ©Towns.cz
 * @fileOverview Creates class actions
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.Game
var Towns = Towns || {};
Towns.Game = Towns.Game || {};
var A/*Actual Namespace*/ = Towns.Game;
//-----------------------
//======================================================================================================================


/**
 *
 * @param {string} type enum('active', 'passive', 'triggered') //todo refactor
 * @param {object} params {param: type}
 * @param {function} price_base
 * @param {array} price_resources_list
 * @param {function} perform
 * @constructor
 */
A.ActionType = module.exports = function(type, params, price_base, price_resources_list, perform){
    this.type = type;
    this.params = params;
    this.price_base = price_base;
    this.price_resources_list = price_resources_list;
    this.perform = perform;
};
