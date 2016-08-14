/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================

module T.World {

    export var game = new T.Game(
        T.TMath.prettyNumber,
        T.TMath.prettyNumber
    );

}