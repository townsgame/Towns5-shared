/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions
 */
//======================================================================================================================
//Loading modules

var Game = require('../classes/game.class.js');
var ActionType = require('../classes/action-type.class.js');

//======================================================================================================================
//Creating module

var game = module.exports = new Game(
    {
        attack: new ActionType(

        )


    }
);