/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionThroughputParamsObject{
        throughput: number;
    }


    World.game.installActionClass(
        {
            throughput: 0
        },
        class extends TOWNS.Game.Action {

            public params:ActionThroughputParamsObject;

            getType() {
                return ('throughput');
            }


            countPriceBase() {
                return ((Math.pow(this.params.throughput / 100, 2)) * 10 * 0.05);//todo
            }


            getPriceResources() {

                return ([
                    new TOWNS.Resources({'wood': 2}),
                    new TOWNS.Resources({'clay': 3}),
                    new TOWNS.Resources({'stone': 1}),
                    new TOWNS.Resources({'iron': 0})
                ]);
            }


        }
    );

}