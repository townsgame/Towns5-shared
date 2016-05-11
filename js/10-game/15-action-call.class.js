/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.ActionCall
 */
//======================================================================================================================


T.Game.ActionCall = class {

    constructor(action,args){

        this.action=action;
        this.args=args;
    }


    test(){

    }



    getPrice(){


    }


    simulate(){


    }



    execute(resources){

        var price = this.getPrice();

        if(resources.contains(price)){

            return this.simulate();

        }else{

            throw new Error('Not enough resources to execute action call.');
        }

    }




};