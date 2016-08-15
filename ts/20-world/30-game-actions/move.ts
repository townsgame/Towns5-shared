/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

module T.World {

    World.game.installActionClass(
        {
            speed: 0
        },
        class extends T.Game.Action {


            getType() {
                return ('move');
            }


            countPriceBase() {
                return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
            }


            getPriceResources() {

                return ([
                    new T.Resources({'wood': 2}),
                    //new T.Resources({'clay':   0}),
                    //new T.Resources({'stone':  0}),
                    new T.Resources({'iron': 1})
                ]);
            }


            static execute(game, object, destinations/*,objects_nearby,resources*/) {

                //---------------------Checking action//todo maybe auto
                var action = object.getAction('move');
                if (action instanceof T.Game.Action) {
                } else {
                    throw new Error('Object has not ability to move');
                }
                //---------------------


                var start_position = object.getPosition();
                destinations.unshift(start_position);

                //r(destinations);

                object.path = T.Path.newConstantSpeed(destinations, action.params.speed);


                //---------------------Set usage//todo maybe auto
                object.getAction('move').nowExecuted();//todo is it needed
                //---------------------

            }


            /*static tick(){//todo maybe ??? todo
             }*/


        }
    );

}