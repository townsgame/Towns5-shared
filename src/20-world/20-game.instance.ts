/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance TOWNS.World.game
 */
//======================================================================================================================

namespace TOWNS.World {

    export var game = new TOWNS.Game(
        TOWNS.TMath.prettyNumber,
        TOWNS.TMath.prettyNumber
    );

}