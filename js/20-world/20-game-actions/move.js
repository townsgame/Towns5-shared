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
            return((Math.pow(this.params.speed,2))*10*K);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   2}),
                //new T.Resources({'clay':   0}),
                //new T.Resources({'stone':  0}),
                new T.Resources({'iron':   1})
            ]);
        }


        /*static execute(){
        }


        static tick(){//todo maybe ??? todo
        }*/


    }
);

