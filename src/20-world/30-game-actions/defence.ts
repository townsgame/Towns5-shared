/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionDefenceParamsObject{
        defence: number;
    }


    World.game.installActionClass(
        {
            defence: 0
        },
        class extends TOWNS.Game.Action {

            public params:ActionDefenceParamsObject;

            getType() {
                return ('defence');
            }


            countPriceBase() {
                return ((this.params.defence) * 800 * 0.05);
            }


            getPriceResources() {

                return ([
                    new TOWNS.Resources({'wood': 2}),
                    new TOWNS.Resources({'clay': 2}),
                    new TOWNS.Resources({'stone': 1}),
                    //new TOWNS.Resources({'iron':   0})
                ]);
            }


        }
    );


}
