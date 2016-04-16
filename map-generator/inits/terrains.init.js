
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;
//-----------------------

//-----------------------Loading modules if running under node js
if(typeof window=='undefined'){

    A.Terrain = require(__dirname+'/../classes/terrain.class.js');

}
//-----------------------
//======================================================================================================================




A.terrains = module.exports = [
    new A.Terrain(0, '#000000', 'temnota'),
    new A.Terrain(1, '#337EFA' ,'moře'),
    new A.Terrain(2, '#545454' ,'dlažba'),
    new A.Terrain(3, '#EFF7FB' ,'sníh/led'),
    new A.Terrain(4, '#F9F98D' ,'písek'),
    new A.Terrain(5, '#878787' ,'kamení'),
    new A.Terrain(6, '#5A2F00' ,'hlína'),
    new A.Terrain(7, '#EFF7FB' ,'sníh/led'),
    new A.Terrain(8, '#2A7302' ,'tráva(normal)'),
    new A.Terrain(9, '#51F311' ,'tráva(toxic)'),
    new A.Terrain(10,'#535805' ,'les'),
    new A.Terrain(11,'#337EFA' ,'řeka'),
    new A.Terrain(12,'#8ABC02' ,'tráva(jaro)'),
    new A.Terrain(13,'#8A9002' ,'tráva(pozim)')
];



