/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Velká palisáda",
    type: "building",
    subtype: "wall",

    design: {
        type: "model",
        data:  {
            "name": "root",
            "particles": [
                {
                    "name": "",
                    "particles": [
                        {
                            "name": "pillar",
                            "particles": [
                                {
                                    "name": "",
                                    "shape": {
                                        "type": "prism",
                                        "n": 20,
                                        "top": 1,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "wood_raw",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "size": {
                                        "x": 6,
                                        "y": 6,
                                        "z": 35
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
                                        "n": 13,
                                        "top": 0,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "wood_raw",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 35
                                    },
                                    "size": {
                                        "x": 6,
                                        "y": 6,
                                        "z": 15
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
                                        "top": 1,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "wood_raw",
                                    "position": {
                                        "x": 0,
                                        "y": 10,
                                        "z": 0
                                    },
                                    "size": {
                                        "x": 4,
                                        "y": 4,
                                        "z": 25
                                    },
                                    "rotation": 0,
                                    "skew": {
                                        "z": {
                                            "x": 0,
                                            "y": -2
                                        }
                                    }
                                }
                            ],
                            "position": {
                                "x": -25,
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
                            "link": "pillar",
                            "position": {
                                "x": -20,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": -15,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": -10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": -5,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 5,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 15,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 20,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "pillar",
                            "position": {
                                "x": 25,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
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
            "size": 1
        }
    },

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 4//[lifes / round]
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

