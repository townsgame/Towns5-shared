/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Kamenná věž",
    type: "building",
    subtype: "main",

    design: {
        type: "model",
        data:  {
            "name": "root",
            "particles": [
                {
                    "name": "floor",
                    "particles": [
                        {
                            "name": "pillar",
                            "particles": [
                                {
                                    "name": "",
                                    "shape": {
                                        "type": "prism",
                                        "n": 4,
                                        "top": 1,
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
                                        "x": 10,
                                        "y": 10,
                                        "z": 20
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
                                    "shape": {
                                        "type": "prism",
                                        "n": 4,
                                        "top": 2,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "stone_bricks",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 20
                                    },
                                    "size": {
                                        "x": 10,
                                        "y": 10,
                                        "z": 20
                                    },
                                    "rotation": 0,
                                    "skew": {
                                        "z": {
                                            "x": 0.3,
                                            "y": 0.3
                                        }
                                    }
                                }
                            ],
                            "position": {
                                "x": 10,
                                "y": 10,
                                "z": 0
                            },
                            "size": 1,
                            "rotation": 180,
                            "skew": {
                                "z": {
                                    "x": 0,
                                    "y": 0
                                }
                            }
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": -10,
                                "y": 10,
                                "z": 0
                            },
                            "rotation": 270
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 10,
                                "y": -10,
                                "z": 0
                            },
                            "rotation": 90
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": -10,
                                "y": -10,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "name": "",
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "stone_bricks",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 40
                            },
                            "size": {
                                "x": 40,
                                "y": 40,
                                "z": 5
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
                    "link": "floor",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 45
                    },
                    "rotation": 0
                },
                {
                    "name": "",
                    "shape": {
                        "type": "prism",
                        "n": 4,
                        "top": 0,
                        "bottom": 1,
                        "rotated": false
                    },
                    "material": "clay_roof",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 90
                    },
                    "size": {
                        "x": 30,
                        "y": 30,
                        "z": 30
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
            "rotation": 0,
            "size": 1
        }
    },

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 10//[lifes / round]
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
        /**/{
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

