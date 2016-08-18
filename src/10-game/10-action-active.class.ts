/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Game.Action
 */
//======================================================================================================================

namespace TOWNS.Game {


    interface ActionActiveParamsObject{
     cooldown: number;
     }
    interface ActionObject{
        type: string;
        params: ActionActiveParamsObject;
    }

    export class ActionActive extends TOWNS.Game.Action{


        public last_use:number;
        public type:string;
        public params:ActionActiveParamsObject;



        /**
         * In how many seconds can be this action instance executed?
         * @returns {number}
         */
        canBeExecutedIn() {


            if (typeof this.params.cooldown === 'number') {

                if (typeof this.last_use === 'undefined') {
                    return (0);
                }

                var s = Math.abs(this.last_use - new Date()) / 1000;

                if (this.params.cooldown <= s) {
                    return (0);
                } else {
                    return (this.params.cooldown - s);
                }

            } else {

                return (0);

            }
        }


        /**
         * Can be this action instance executed now?
         * @returns {boolean}
         */
        canBeExecutedNow() {
            return (this.canBeExecutedIn() === 0);
        }


        /**
         * Set actual date as date of execution this action instance
         */
        nowExecuted() {
            this.last_use = new Date()/1;
        }




    }

}