/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    interface ActionMoveParamsObject{
        speed: number;
        cooldown: number;
    }


    World.game.installActionClass(
        {
            speed: 0,
            cooldown: 0
        },
        class extends TOWNS.Game.ActionActive {

            public params:ActionMoveParamsObject;

            getType() {
                return ('move');
            }


            countPriceBase() {
                return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
            }


            getPriceResources() {

                return ([
                    new TOWNS.Resources({'wood': 2}),
                    //new TOWNS.Resources({'clay':   0}),
                    //new TOWNS.Resources({'stone':  0}),
                    new TOWNS.Resources({'iron': 1})
                ]);
            }


            static execute(game, object, destinations/*,objects_nearby,resources*/) {

                //---------------------Checking action//todo maybe auto
                var action = object.getAction('move');
                if (action instanceof TOWNS.Game.Action) {
                } else {
                    throw new Error('Object has not ability to move');
                }
                //---------------------


                var start_position = object.getPosition();
                destinations.unshift(start_position);

                //r(destinations);

                object.path = TOWNS.Path.newConstantSpeed(destinations, action.params.speed);


                //---------------------Set usage//todo maybe auto
                object.getAction('move').nowExecuted();//todo is it needed
                //---------------------

            }


            /*static tick(){//todo maybe ??? todo
             }*/


        }
    );

}