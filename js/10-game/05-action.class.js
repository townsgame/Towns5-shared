/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================


T.Game.Action = class{


    /**
     *
     * @param {string} type 'ACTIVE' or 'PASSIVE'
     * @param {object} ability_params {param: type}
     * @param {function} ability_price_base
     * @param {Array} ability_price_resources_list
     * @param {function} execute
     * @constructor
     */
     constructor(type, ability_params, ability_price_base, ability_price_resources_list, execute=false){


        if(['ACTIVE','PASSIVE'].indexOf(type)==-1)throw new Error('Unknown type of T.Game.Action '+type);
        if(execute===false && type==='ACTIVE')throw new Error('ACTIVE T.Game.Action must have execute function');
        if(execute!==false && type==='PASSIVE')throw new Error('PASSIVE T.Game.Action can not have execute function');


        this.type = type;
        this.ability_params = ability_params;
        this.ability_price_base = ability_price_base;
        this.ability_price_resources_list = ability_price_resources_list;
        this.execute = execute;
    }



};



