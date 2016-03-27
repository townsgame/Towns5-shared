/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Dřevorubec",
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
                            "name": "woods",
                            "particles": [
                                {
                                    "name": "wood",
                                    "shape": {
                                        "type": "prism",
                                        "n": 4,
                                        "top": 1,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "wood_fence",
                                    "position": {
                                        "x": -10,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "size": {
                                        "x": 5,
                                        "y": 50,
                                        "z": 5
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
                                    "link": "wood",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 0
                                    },
                                    "rotation": 0
                                },
                                {
                                    "link": "wood",
                                    "position": {
                                        "x": 10,
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
                        },
                        {
                            "link": "woods",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 5
                            },
                            "rotation": 90
                        },
                        {
                            "link": "woods",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 10
                            },
                            "rotation": 30
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
                    "name": "t",
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
                            "material": "wood_raw",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 7,
                                "y": 7,
                                "z": 50
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
                                "y": 7,
                                "z": 50
                            },
                            "size": {
                                "x": 7,
                                "y": 40,
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
                            "name": "",
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "iron_plates",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 20,
                                "y": 20,
                                "z": 10
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
                            "material": "wood_boards",
                            "position": {
                                "x": 0,
                                "y": 20,
                                "z": 4
                            },
                            "size": {
                                "x": 2,
                                "y": 2,
                                "z": 50
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
                        "x": 20,
                        "y": -25,
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
                    "link": "t",
                    "position": {
                        "x": -20,
                        "y": -25,
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
                    "material": "wood_boards",
                    "position": {
                        "x": 0,
                        "y": -4,
                        "z": 4
                    },
                    "size": {
                        "x": 60,
                        "y": 2,
                        "z": 2
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
                "throughput": 50//[%]
            }
        }
    ]

}
;

