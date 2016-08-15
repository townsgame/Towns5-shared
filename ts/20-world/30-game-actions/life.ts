/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

module T.World {

    interface ActionLifeParamsObject{
        life: number;
        max_life: number;
    }

    World.game.installActionClass(
        {
            life: 1,
            max_life: 1
        },
        class extends T.Game.Action {

            public params:ActionLifeParamsObject;

            getType() {
                return ('life');
            }


            countPriceBase() {
                return (0);
            }


            getPriceResources() {

                return ([new T.Resources()]);
            }


        }
    );


}