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

//---------------------------------------------Throughput
'throughput': new T.Game.Action(
    'PASSIVE',
    {
        'throughput': 'number'
    },
    function(params){
        return((Math.pow(params.throughput/100,2))*10*K);//todo
    },
    T.Resources.newSingles({
        'wood':   2,
        'clay':   3,
        'stone':  1,
        'iron':   0
    })
)