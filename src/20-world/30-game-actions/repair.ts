/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionRepairParamsObject{
        repair: number;
        cooldown: number;
    }


    World.game.installActionClass(
        {
            repair: 0
        },
        class extends TOWNS.Game.ActionActive {

            public params:ActionRepairParamsObject;

            getType() {
                return ('repair');
            }


            countPriceBase() {
                return ((1 / (this.params.repair / 100)) * 1000 * 0.05);
            }


            getPriceResources() {

                return ([
                    new TOWNS.Resources({'wood': 4}),
                    new TOWNS.Resources({'clay': 2}),
                    new TOWNS.Resources({'stone': 3}),
                    new TOWNS.Resources({'iron': 4})
                ]);
            }


            /*static execute(){
             //todo
             }*/


        }
    );


}