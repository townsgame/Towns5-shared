/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Katapult",
    type: "building",
    subtype: "main",

    design: {
        type: "model",
        data:  {
            "name": "root",
            "particles": [
                {
                    "name": "site",
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
                                "x": -10,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 5,
                                "y": 5,
                                "z": 40
                            },
                            "rotation": 0,
                            "skew": {
                                "z": {
                                    "x": 2,
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
                                "x": 10,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 5,
                                "y": 5,
                                "z": 40
                            },
                            "rotation": 0,
                            "skew": {
                                "z": {
                                    "x": -2,
                                    "y": 0
                                }
                            }
                        },
                        {
                            "name": "",
                            "shape": {
                                "type": "prism",
                                "n": 3,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "wood_fence",
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 10
                            },
                            "size": {
                                "x": 30,
                                "y": 5,
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
                                "x": 40,
                                "y": 3,
                                "z": 3
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
                        "y": 6,
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
                    "link": "site",
                    "position": {
                        "x": 0,
                        "y": -6,
                        "z": 0
                    },
                    "rotation": 0
                },
                {
                    "name": "",
                    "shape": {
                        "type": "prism",
                        "n": 6,
                        "top": 1,
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
                        "x": 5,
                        "y": 15,
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
                    "name": "",
                    "shape": {
                        "type": "prism",
                        "n": 9,
                        "top": 1,
                        "bottom": 1,
                        "rotated": false
                    },
                    "material": "wood_raw",
                    "position": {
                        "x": 10,
                        "y": 0,
                        "z": 20
                    },
                    "size": {
                        "x": 7,
                        "y": 3,
                        "z": 60
                    },
                    "rotation": 0,
                    "skew": {
                        "z": {
                            "x": -5,
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
                    "material": "stone_plain",
                    "position": {
                        "x": 10,
                        "y": 0,
                        "z": 15
                    },
                    "size": {
                        "x": 10,
                        "y": 10,
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
                    "material": "wood_fence",
                    "position": {
                        "x": 13,
                        "y": 0,
                        "z": 11
                    },
                    "size": {
                        "x": 3,
                        "y": 25,
                        "z": 3
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
                "distance": 5,//[fields]
                "strength": 1,//[lifes / round]
                "rounds": 5,//[rounds]
                "cooldown": 600//[s]
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

