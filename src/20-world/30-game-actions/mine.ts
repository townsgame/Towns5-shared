/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

namespace T.World {

    interface ActionMineParamsObject{
        wood: number;
        iron: number;
        clay: number;
        stone: number;
    }


    World.game.installActionClass(
        {
            wood: 0,
            iron: 0,
            clay: 0,
            stone: 0
        },
        class extends T.Game.Action {

            public params:ActionMineParamsObject;

            getType() {
                return ('mine');
            }


            countPriceBase() {
                var amount = this.params.wood + this.params.iron + this.params.clay + this.params.stone;
                return amount * 3600 * 0.05;
            }


            getPriceResources() {

                return ([
                    new T.Resources({'wood': 3}),
                    new T.Resources({'clay': 2}),
                    new T.Resources({'stone': 2}),
                    new T.Resources({'iron': 4})
                ]);
            }


            /*static tick(){//todo or maybe execute
             }*/


        }
    );

}
