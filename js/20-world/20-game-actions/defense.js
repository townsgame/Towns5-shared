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

/*
//---------------------------------------------Defense

    function(params){
        return((params.defense)*800*K);
    },
    T.Resources.newSingles({//todo in future should be resources and k in separate file.
        'wood':   2,
        'clay':   2,
        'stone':  1,
        'iron':   0
    })
),
*/





/*{
 'distance': {type:'number',default:0},
 'strength': {type:'number',default:0},
 'rounds': {type:'number',default:1},
 'cooldown': {type:'number',default:1}
 }*/