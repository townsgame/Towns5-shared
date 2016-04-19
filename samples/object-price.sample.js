/**
 * @author ©Towns.cz
 * @fileOverview Sample of game and object instance usage.
 */
//======================================================================================================================


//Loading Instance of Game
var game = require('../inits/game.init.js');


//Creating sample object
var object = {

    name: "Foo",
    type: "building",
    subtype: "wall",

    life: 80,
    actions:[
        {
            type: 'defense',
            params:{
                defense: 80
            }
        },
        {
            type: 'attack',
            params:{
                strength: 100,
                rounds: 10,
                distance: 2,
                cooldown: 500
            }
        }



    ],


    "design": {
        "type": "model",
        "data": {
            "name":"root",

            "particles": [ { "name": "", "particles": [ { "name": "floor", "particles": [ { "name": "row", "particles": [ { "name": "brick", "shape": { "type": "prism", "n": 4, "rotated": false, "top": 1, "bottom": 1.1 }, "material": "stone_bricks", "position": { "x": 0, "y": 0, "z": 0 }, "size": { "x": 7, "y": 14, "z": 5 }, "rotation": 0 }, { "link": "brick", "position": { "x": 10, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 30, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 20, "y": 0, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "row", "position": { "x": 0, "y": 15, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "floor", "position": { "x": -6, "y": 0, "z": 0 }, "rotation": 290 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "material": "stone_bricks", "position": { "x": 17, "y": -17, "z": 0 }, "size": { "x": 25, "y": 25, "z": 18 }, "rotation": 30, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "material": "stone_bricks", "position": { "x": 23, "y": -6, "z": 0 }, "size": { "x": 25, "y": 19, "z": 12 }, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } } ]

        }
    }


};

//max_life is number
var max_life = game.getObjectMaxLife(object);

//price is instance of Resources
var price = game.getObjectPrice(object);


console.log('Maximum amount life of '+object.type+' is: '+max_life);
console.log('Price of '+object.type+' is: ',price.toString());