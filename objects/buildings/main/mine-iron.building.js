/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Těžba železa",
    type: "building",
    subtype: "main",

    design: {
        type: "model",
        data:  {
            "name": "root",
            "particles": [
                {
                    "name": "",
                    "particles": [
                        {
                            "name": "",
                            "shape": {
                                "type": "prism",
                                "n": 6,
                                "top": 0.25,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "stone_bricks",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 20,
                                "y": 20,
                                "z": 30
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
                            "name": "",
                            "particles": [
                                {
                                    "name": "u",
                                    "particles": [
                                        {
                                            "name": "",
                                            "shape": {
                                                "type": "prism",
                                                "n": 6,
                                                "top": 0.3,
                                                "bottom": 1,
                                                "rotated": false
                                            },
                                            "material": "stone_plain",
                                            "position": {
                                                "x": 10,
                                                "y": 0,
                                                "z": 0
                                            },
                                            "size": {
                                                "x": 15,
                                                "y": 15,
                                                "z": 20
                                            },
                                            "rotation": 0,
                                            "skew": {
                                                "z": {
                                                    "x": 0,
                                                    "y": 0
                                                }
                                            }
                                        }
                                    ],
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "size": 1,
                                    "rotation": 0,
                                    "skew": {
                                        "z": {
                                            "x": 0,
                                            "y": 0
                                        }
                                    }
                                },
                                {
                                    "link": "u",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "rotation": 120
                                },
                                {
                                    "link": "u",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "rotation": 240
                                }
                            ],
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
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
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 0
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
            "size": 1.3
        }
    },

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 1//[lifes / round]
            }
        },/**/
        /**/{
            "type": "regenerate",
            "params":{
                "regenerate": 1800//[s]
            }
        },/**/
        /**/{
            "type": "repair",
            "params":{
                "repair": 100//[%]
            }
        },/**/
        /**/{
            "type": "mine",
            "params":{
                "resource": "iron",//[resource]
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
                "throughput": 50//[%]
            }
        }
    ]

}
;

