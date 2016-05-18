/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        wood:   0,
        iron:   0,
        clay:   0,
        stone:   0
    },
    class extends T.Game.Action{


        static getType(){
            return('mine');
        }


        countPriceBase(){
            return((this.params.amount)*3600*K);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   3}),
                new T.Resources({'clay':   2}),
                new T.Resources({'stone':  2}),
                new T.Resources({'iron':   4})
            ]);
        }


        /*static tick(){//todo or maybe execute
        }*/




    }
);


