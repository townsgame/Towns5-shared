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




'mine': new T.Game.Action(
    'PASSIVE',
    {
        'resource': 'string',
        'amount': 'number'
    },
    function(params){
        return((params.amount)*3600*K);
    },
    T.Resources.newSingles({
        'wood':   3,
        'clay':   2,
        'stone':  2,
        'iron':   4
    })
),