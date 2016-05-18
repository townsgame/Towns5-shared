/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        defense:   0
    },
    class extends T.Game.Action{


        static getType(){
            return('defense');
        }


        countPriceBase(){
            return((this.params.defense)*800*K);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   2}),
                new T.Resources({'clay':   2}),
                new T.Resources({'stone':  1}),
                //new T.Resources({'iron':   0})
            ]);
        }




    }
);



