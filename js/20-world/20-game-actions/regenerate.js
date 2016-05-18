/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        regenerate:   100,
    },
    class extends T.Game.Action{


        static getType(){
            return('regenerate');
        }


        countPriceBase(){
            return((1/this.params.regenerate)*3600*K);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   4}),
                new T.Resources({'clay':   2}),
                new T.Resources({'stone':  2}),
                new T.Resources({'iron':   2})
            ]);
        }


        /*static execute(){//todo maybe tick????
        }*/




    }
);

