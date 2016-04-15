/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.Game
var Towns = Towns || {};
Towns.Game = Towns.Game || {};
var A/*Actual Namespace*/ = Towns.Game;
//-----------------------

//-----------------------Loading modules
Towns.Math = Towns.Math || require(__dirname+'/../../math/math.js');
A.Game = A.Game || require(__dirname+'/../classes/game.class.js');
A.ActionType = A.ActionType || require(__dirname+'/../classes/action-type.class.js');
A.Resources = A.Resources || require(__dirname+'/../classes/resources.class.js');
//-----------------------
//======================================================================================================================



var K=0.05;


A.game = module.exports = new A.Game(
    {
        //---------------------------------------------Defense
        'defense': new A.ActionType(
            'passive',
            {
                'defense': 'number'
            },
            function(params){
                return((params.defense)*800*K);
            },
            A.Resources.newSingles({//todo in future should be resources and k in separate file.
                'wood':   2,
                'clay':   2,
                'stone':  1,
                'iron':   0
            })
        ),
        //---------------------------------------------Regenerate
        'regenerate': new A.ActionType(
            'passive',
            {
                'regenerate': 'number'
            },
            function(params){
                return((1/params.regenerate)*3600*K);
            },
            A.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  2,
                'iron':   2
            })
        ),
        //---------------------------------------------Repair
        'repair': new A.ActionType(
            'active',
            {
                'repair': 'number'
            },
            function(params){
                return((1/(params.repair/100))*1000*K);
            },
            A.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  3,
                'iron':   4
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Mine
        'mine': new A.ActionType(
            'passive',
            {
                'resource': 'string',
                'amount': 'number'
            },
            function(params){
                return((params.amount)*3600*K);
            },
            A.Resources.newSingles({
                'wood':   3,
                'clay':   2,
                'stone':  2,
                'iron':   4
            })
        ),
        //---------------------------------------------Attack
        'attack': new A.ActionType(
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
            A.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  3,
                'iron':   2
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Move
        'move': new A.ActionType(
            'active',
            {
                'speed': 'number'
            },
            function(params){
                return((Math.pow(params.speed,2))*10*K);
            },
            A.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  0,
                'iron':   1
            }),
            function(object,params){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new A.ActionType(
            'passive',
            {
                'throughput': 'number'
            },
            function(params){
                return((Math.pow(params.throughput/100,2))*10*K);//todo
            },
            A.Resources.newSingles({
                'wood':   2,
                'clay':   3,
                'stone':  1,
                'iron':   0
            })
        )
        //---------------------------------------------


    },
    Towns.Math.angleDiff,
    Towns.Math.angleDiff

);