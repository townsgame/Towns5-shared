/**
 * @author ©Towns.cz
 * @fileOverview Sample of Map generator usage
 */
//======================================================================================================================


//Loading Instance of mapGenerator
var mapGenerator = require('../inits/map-generator.init.js');

    map_radius = 2,
    map_center = {
        x: 10000,
        y: 100
    };

var objects = mapGenerator.getMap(map_center,map_radius);


console.log('List of virtual objects of type terrain near ['+map_center.x+','+map_center.y+']:');
console.log(objects);



