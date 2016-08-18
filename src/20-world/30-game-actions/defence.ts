/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

namespace T.World {

    interface ActionDefenceParamsObject{
        defence: number;
    }


    World.game.installActionClass(
        {
            defence: 0
        },
        class extends T.Game.Action {

            public params:ActionDefenceParamsObject;

            getType() {
                return ('defence');
            }


            countPriceBase() {
                return ((this.params.defence) * 800 * 0.05);
            }


            getPriceResources() {

                return ([
                    new T.Resources({'wood': 2}),
                    new T.Resources({'clay': 2}),
                    new T.Resources({'stone': 1}),
                    //new T.Resources({'iron':   0})
                ]);
            }


        }
    );


}
