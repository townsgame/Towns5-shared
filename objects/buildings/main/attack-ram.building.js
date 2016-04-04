/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Beranidlo",
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
                            "name": "wheel",
                            "shape": {
                                "type": "prism",
                                "n": 20,
                                "rotated": true,
                                "top": 1,
                                "bottom": 1
                            },
                            "material": "wood_fence",
                            "position": {
                                "x": 15,
                                "y": 20,
                                "z": 0
                            },
                            "size": {
                                "x": 5,
                                "y": 20,
                                "z": 20
                            },
                            "rotation": 0
                        },
                        {
                            "link": "wheel",
                            "position": {
                                "x": -15,
                                "y": 20,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "wheel",
                            "position": {
                                "x": 15,
                                "y": -20,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "wheel",
                            "position": {
                                "x": -15,
                                "y": -20,
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
                        "z": 6
                    },
                    "size": {
                        "x": 35,
                        "y": 76,
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
                    "name": "m",
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
                            "material": "clay_bricks",
                            "position": {
                                "x": -8,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 5,
                                "y": 10,
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
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "clay_bricks",
                            "position": {
                                "x": 8,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 5,
                                "y": 10,
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
                                "z": 15
                            },
                            "size": {
                                "x": 2,
                                "y": 2,
                                "z": 15
                            },
                            "rotation": 0,
                            "skew": {
                                "z": {
                                    "x": -4,
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
                                "z": 15
                            },
                            "size": {
                                "x": 2,
                                "y": 2,
                                "z": 15
                            },
                            "rotation": 0,
                            "skew": {
                                "z": {
                                    "x": 4,
                                    "y": 0
                                }
                            }
                        }
                    ],
                    "position": {
                        "x": 0,
                        "y": -20,
                        "z": 16
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
                    "link": "m",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 16
                    },
                    "rotation": 0
                },
                {
                    "link": "m",
                    "position": {
                        "x": 0,
                        "y": 20,
                        "z": 16
                    },
                    "rotation": 0
                },
                {
                    "name": "",
                    "shape": {
                        "type": "prism",
                        "n": 20,
                        "top": 1,
                        "bottom": 1,
                        "rotated": true
                    },
                    "material": "wood_fence",
                    "position": {
                        "x": 0,
                        "y": 7,
                        "z": 24
                    },
                    "size": {
                        "x": 35,
                        "y": 13,
                        "z": 13
                    },
                    "rotation": 90,
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
                        "n": 9,
                        "top": 1,
                        "bottom": 1,
                        "rotated": true
                    },
                    "material": "wood_raw",
                    "position": {
                        "x": 0,
                        "y": 40,
                        "z": 23
                    },
                    "size": {
                        "x": 3,
                        "y": 15,
                        "z": 15
                    },
                    "rotation": 90,
                    "skew": {
                        "z": {
                            "x": 0,
                            "y": 0
                        }
                    }
                }
            ],
            "rotation": 0,
            "size": 0.6
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
        /**/{
            "type": "attack",
            "params":{
                "distance": 1,//[fields]
                "strength": 5,//[lifes / round]
                "rounds": 1,//[rounds]
                "cooldown": 2//[s]
            }
        },/**/
        /**/{
         "type": "move",
         "params":{
         "speed": 1//[fields / s]

         }
         },/**/
        /**/{
            "type": "throughput",
            "params":{
                "throughput": 20//[%]
            }
        }
    ]

}
;

