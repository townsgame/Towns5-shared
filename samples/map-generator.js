/**
 * @author ©Towns.cz
 * @fileOverview Sample of Map generator usage
 */
//======================================================================================================================


//Loading Instance of mapGenerator
var mapGenerator = require('../inits/map-generator.init.js');

map_radius = 20,
    map_center = {
        x: 10000,
        y: 100
    };
var ascii=['  ',' ~','##','~~','::','XX','Y@','~/','tt','--','||','^^','.~','\\\\','//'];


var map = mapGenerator.getMapArray([],map_center,map_radius);


for (var y = 0; y < map_radius * 2; y++) {

    var row='';

    for (var x = 0; x < map_radius * 2; x++) {

        if (typeof(map[y][x]) === 'undefined'){

            row+=ascii[0];

        }else{

            row+=ascii[map[y][x].design.data.image];

        }




    }

    console.log(row);


}




