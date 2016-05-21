/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        speed:   0
    },
    class extends T.Game.Action{


        static getType(){
            return('move');
        }


        countPriceBase(){
            return((Math.pow(this.params.speed,2))*10*0.05);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   2}),
                //new T.Resources({'clay':   0}),
                //new T.Resources({'stone':  0}),
                new T.Resources({'iron':   1})
            ]);
        }


        static execute(game,object,destination_position,objects_nearby,resources){


            var start_position=object.getPosition();

            object.path = T.Path.newConstantSpeed([
                    start_position, destination_position
                ],1);

            //---------------------Set usage
            object.getAction('move').nowExecuted();//todo is it needed


        }


        /*static tick(){//todo maybe ??? todo
        }*/


    }
);

