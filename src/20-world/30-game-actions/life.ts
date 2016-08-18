/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionLifeParamsObject{
        life: number;
        max_life: number;
    }

    World.game.installActionClass(
        {
            life: 1,
            max_life: 1
        },
        class extends TOWNS.Game.Action {

            public params:ActionLifeParamsObject;

            getType() {
                return ('life');
            }


            countPriceBase() {
                return (0);
            }


            getPriceResources() {

                return ([new TOWNS.Resources()]);
            }


        }
    );


}