/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

module T.World {

    game.installActionClass(
        {
            defence: 0
        },
        class extends T.Game.Action {


            static getType() {
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
