/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Hliněná cesta",
    type: "building",
    subtype: "path",

    design: {
        type: "model",
        data:  {
            "name": "root",
            "particles": [
                {
                    "name": "",
                    "shape": {
                        "type": "prism",
                        "n": 4,
                        "rotated": false,
                        "top": 1,
                        "bottom": 1
                    },
                    "material": "clay_bricks",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    "size": {
                        "x": 50,
                        "y": 50,
                        "z": 4
                    },
                    "rotation": 0
                }
            ],
            "rotation": 0,
            "size": 1
        }
    },

    actions: [
        /*/{
            "type": "defense",
            "params":{
                "defense": 1//[lifes / round]
            }
        },/**/
        /*/{
            "type": "regenerate",
            "params":{
                "regenerate": 3600//[s]
            }
        },/**/
        /**/{
            "type": "repair",
            "params":{
                "repair": 100//[%]
            }
        },/**/
        /*/{
            "type": "mine",
            "params":{
                "resource": "wood",//[resource]
                "amount": 1//[resources / s]
            }
        },/**/
        /*/{
            "type": "attack",
            "params":{
                "distance": 1,//[fields]
                "strength": 1,//[lifes / round]
                "rounds": 1,//[rounds]
                "cooldown": 600//[s]
            }
        },/**/
        /*/{
         "type": "move",
         "params":{
         "speed": 1//[fields / s]

         }
         },/**/
        /**/{
            "type": "throughput",
            "params":{
                "throughput":120//[%]
            }
        }
    ]

}
;

