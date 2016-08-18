/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionRegenerateParamsObject{
        regenerate: number;
    }


    World.game.installActionClass(
        {
            regenerate: 100,
        },
        class extends TOWNS.Game.Action {

            public params:ActionRegenerateParamsObject;

            getType() {
                return ('regenerate');
            }


            countPriceBase() {
                return ((1 / this.params.regenerate) * 3600 * 0.05);
            }


            getPriceResources() {

                return ([
                    new TOWNS.Resources({'wood': 4}),
                    new TOWNS.Resources({'clay': 2}),
                    new TOWNS.Resources({'stone': 2}),
                    new TOWNS.Resources({'iron': 2})
                ]);
            }



        }
    );

}