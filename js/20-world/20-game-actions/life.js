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
            return('action');
        }


        countPriceBase(){
            return(0);
        }


        getPriceResources(){

            return([
                //new T.Resources({'wood':   0}),
                //new T.Resources({'clay':   0}),
                //new T.Resources({'stone':  0}),
                //new T.Resources({'iron':   0})
            ]);
        }


        static execute(){
        }




    }
);






/*{
 'distance': {type:'number',default:0},
 'strength': {type:'number',default:0},
 'rounds': {type:'number',default:1},
 'cooldown': {type:'number',default:1}
 }*/