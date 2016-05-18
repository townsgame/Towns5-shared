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

//---------------------------------------------Move
'move': new T.Game.Action(
    'ACTIVE',
    {
        'speed': 'number'
    },
    function(params){
        return((Math.pow(params.speed,2))*10*K);
    },
    T.Resources.newSingles({
        'wood':   2,
        'clay':   0,
        'stone':  0,
        'iron':   1
    }),
    function(object,position,objects){

    }
),