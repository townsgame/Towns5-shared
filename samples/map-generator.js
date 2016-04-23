/**
 * @author ©Towns.cz
 * @fileOverview Sample of Map generator usage
 */
//======================================================================================================================


//Loading Towns Namespace
var T = require(__dirname+'/../build/towns-shared.js');


map_radius = 20,
    map_center = {
        x: 10000,
        y: 100
    };
var ascii=['  ',' ~','##','~~','::','XX','Y@','~/','tt','--','||','^^','.~','\\\\','//'];


var objects = new T.Objects.Array();

var objects = T.World.mapGenerator.getCompleteObjects(objects,map_center,map_radius,false);

var map = objects.getMapOfTerrainCodes(map_center,map_radius);


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




