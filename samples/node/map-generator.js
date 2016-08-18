/**
 * @author ©Towns.cz
 * @fileOverview Sample of Map generator usage
 */
//======================================================================================================================


//Loading Towns Namespace
var T = require(__dirname+'/../../build/towns-shared.js');


var map_radius = 20;
var map_center = new TOWNS.Position(10000,100);
var map_not_center = map_center.clone().plus(new TOWNS.Position(-30,0));
var ascii=['  ',' ~','##','~~','::','XX','Y@','~/','tt','--','||','^^','.~','\\\\','//'];


var objects_from_server = new TOWNS.Objects.Array(/*[{},{},...]*/);

var objects_all = TOWNS.World.mapGenerator.getCompleteObjects(objects_from_server,map_center,map_radius,false,map_not_center);

var map = objects_all.getMapOfTerrainCodes(map_center,map_radius);


for (var y = 0; y < map_radius * 2; y++) {

    var row='';

    for (var x = 0; x < map_radius * 2; x++) {

        if (!map[y][x]){

            row+=ascii[0];

        }else{

            //console.log(map[y][x]);

            row+=ascii[map[y][x]];

        }




    }

    console.log(row);


}




