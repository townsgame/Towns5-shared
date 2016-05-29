/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        throughput:   0
    },
    class extends T.Game.Action{


        static getType(){
            return('throughput');
        }


        countPriceBase(){
            return((Math.pow(this.params.throughput/100,2))*10*0.05);//todo
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   2}),
                new T.Resources({'clay':   3}),
                new T.Resources({'stone':  1}),
                new T.Resources({'iron':   0})
            ]);
        }


    }
);

