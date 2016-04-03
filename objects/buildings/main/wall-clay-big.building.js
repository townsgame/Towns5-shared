/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Velká zeď",
    type: "building",
    subtype: "wall",

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
                        "y": 10,
                        "z": 35
                    },
                    "rotation": 0
                },
                {
                    "name": "",
                    "particles": [
                        {
                            "name": "o",
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "clay_bricks",
                            "position": {
                                "x": 12,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 10,
                                "y": 10,
                                "z": 7
                            },
                            "rotation": 0,
                            "skew": {
                                "z": {
                                    "x": 0,
                                    "y": 0
                                }
                            }
                        },
                        {
                            "link": "o",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "o",
                            "position": {
                                "x": -12,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        }
                    ],
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 35
                    },
                    "size": 1,
                    "rotation": 0,
                    "skew": {
                        "z": {
                            "x": 0,
                            "y": 0
                        }
                    }
                }
            ],
            "rotation": 0,
            "size": 1
        }
    },

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 2//[lifes / round]
            }
        },/**/
        /**/{
            "type": "regenerate",
            "params":{
                "regenerate": 3600//[s]
            }
        },/**/
        /**/{
            "type": "repair",
            "params":{
                "repair": 50//[%]
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
                "throughput": 0//[%]
            }
        }
    ]

}
;

