/**
 * @author ©Towns.cz
 * @fileOverview Sample of game and object instance usage.
 */
//======================================================================================================================


//Loading Instance of Game
var game = require('../inits/game.init.js');


//Creating sample object
var foo_building = {

    name: "Foo",
    type: "building",
    subtype: "wall",
    design: {
        type: "model",
        data: {
            particles: [
                {
                    shape:{
                        type: 'prism',
                        n:4,
                        top:1
                    },
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:50,y:50,z:50},
                    rotation: {"xy":0,"xz":0}

                }
            ]
        }

    },

    life: 80,
    actions:[
        {
            type: 'defence',
            params:{
                strength: 80
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



    ]

};

//max_life is number
var max_life = game.getObjectMaxLife(foo_building);

//price is instance of Resources
var price = game.getObjectPrice(foo_building);


console.log('Maximum amount life of object is: '+max_life);
console.log('Price of object is: ',price);