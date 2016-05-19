/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================



T.World.game.installActionClass(
    {
        life:   1
    },
    class extends T.Game.Action{


        static getType(){
            return('life');
        }


        countPriceBase(){
            return(this.params.life*0.05);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   1}),
                new T.Resources({'clay':   1}),
                new T.Resources({'stone':  1}),
                new T.Resources({'iron':   1})
            ]);
        }



    }
);




