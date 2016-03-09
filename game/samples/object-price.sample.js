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



    ]

};

//max_life is number
var max_life = game.getObjectMaxLife(object);

//price is instance of Resources
var price = game.getObjectPrice(object);


console.log('Maximum amount life of '+object.type+' is: '+max_life);
console.log('Price of '+object.type+' is: ',price.toString());