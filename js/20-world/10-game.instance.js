/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================


var K=0.05;


T.World.game = new T.Game(
    {
        //---------------------------------------------Defense
        'defense': new T.Game.ActionType(
            'PASSIVE',
            {
                'defense': 'number'
            },
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
        //---------------------------------------------Regenerate
        'regenerate': new T.Game.ActionType(
            'PASSIVE',
            {
                'regenerate': 'number'
            },
            function(params){
                return((1/params.regenerate)*3600*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  2,
                'iron':   2
            })
        ),
        //---------------------------------------------Repair
        'repair': new T.Game.ActionType(
            'ACTIVE',
            {
                'repair': 'number'
            },
            function(params){
                return((1/(params.repair/100))*1000*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  3,
                'iron':   4
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Mine
        'mine': new T.Game.ActionType(
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
        //---------------------------------------------Attack
        'attack': new T.Game.ActionType(
            'ACTIVE',
            {
                'distance': 'number',
                'strength': 'number',
                'rounds': 'number',
                'cooldown': 'number'
            },
            function(params){
                return((Math.pow(params.distance,2)*params.strength*params.rounds*(1/params.cooldown))*100*K);
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  3,
                'iron':   2
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Move
        'move': new T.Game.ActionType(
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
            function(object,params){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new T.Game.ActionType(
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
        //---------------------------------------------


    },
    T.Math.prettyNumber,
    T.Math.prettyNumber

);