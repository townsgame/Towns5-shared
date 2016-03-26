/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions
 */
//======================================================================================================================
//Loading modules

if(typeof Game=='undefined'){

    var Game = require(__dirname+'/../classes/game.class.js');
    var ActionType = require(__dirname+'/../classes/action-type.class.js');
    var Resources = require(__dirname+'/../classes/resources.class.js');

}

//======================================================================================================================
//Creating module


var K=0.05;


var game = module.exports = new Game(
    {
        //---------------------------------------------Defense
        'defense': new ActionType(
            'passive',
            {
                'defense': 'number'
            },
            function(params){
                return((params.defense)*800*K);
            },
            Resources.newSingles({//todo in future should be resources and k in separate file.
                'wood':   2,
                'clay':   2,
                'stone':  1,
                'iron':   0
            })
        ),
        //---------------------------------------------Regenerate
        'regenerate': new ActionType(
            'passive',
            {
                'regenerate': 'number'
            },
            function(params){
                return((1/params.regenerate)*3600*K);
            },
            Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  2,
                'iron':   2
            })
        ),
        //---------------------------------------------Repair
        'repair': new ActionType(
            'active',
            {
                'repair': 'number'
            },
            function(params){
                return((1/(params.repair/100))*1000*K);
            },
            Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  3,
                'iron':   4
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Mine
        'mine': new ActionType(
            'passive',
            {
                'resource': 'string',
                'amount': 'number'
            },
            function(params){
                return((params.amount)*3600*K);
            },
            Resources.newSingles({
                'wood':   3,
                'clay':   2,
                'stone':  2,
                'iron':   4
            })
        ),
        //---------------------------------------------Attack
        'attack': new ActionType(
            'active',
            {
                'distance': 'number',
                'strength': 'number',
                'rounds': 'number',
                'cooldown': 'number'
            },
            function(params){
                return((Math.pow(params.distance,2)*params.strength*params.rounds*(1/params.cooldown))*100*K);
            },
            Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  3,
                'iron':   2
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Move
        'move': new ActionType(
            'active',
            {
                'speed': 'number'
            },
            function(params){
                return((Math.pow(params.speed,2))*10*K);
            },
            Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  0,
                'iron':   1
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new ActionType(
            'passive',
            {
                'throughput': 'number'
            },
            function(params){
                return((Math.pow(params.throughput/100,2))*10*K);//todo
            },
            Resources.newSingles({
                'wood':   2,
                'clay':   3,
                'stone':  1,
                'iron':   0
            })
        )
        //---------------------------------------------


    }
);