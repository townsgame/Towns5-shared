/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================


T.Game.Action = class {

    constructor(action_type,action_config){
        this.type=action_type;
        this.config=action_config;
    }




    createActionCall(){

        //subject.actions.

        var actionCall = new T.Game.ActionCall(this,arguments);

        return(actionCall);

    }




};