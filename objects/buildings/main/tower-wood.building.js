/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Dřevěná věž",
    type: "building",
    subtype: "main",

    "design": {
        "type": "model",
        "data": {
            "name": "",
            "particles": [
                {
                    "name": "floor",
                    "particles": [
                        {
                            "name": "site",
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
                                            "x": 4,
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
                                    "material": "wood_fence",
                                    "position": {
                                        "x": 0,
                                        "y": 0,
                                        "z": 35
                                    },
                                    "size": {
                                        "x": 40,
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
                                }
                            ],
                            "position": {
                                "x": 0,
                                "y": 10,
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
                                "y": -10,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "site",
                            "position": {
                                "x": 10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 90
                        },
                        {
                            "link": "site",
                            "position": {
                                "x": -10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 90
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
                    "particles": [
                        {
                            "name": "anchor",
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "top": 1,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "shadow",
                            "position": {
                                "x": 10,
                                "y": 10,
                                "z": 0
                            },
                            "size": {
                                "x": 10,
                                "y": 10,
                                "z": 4
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
                            "link": "anchor",
                            "position": {
                                "x": 10,
                                "y": -10,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "anchor",
                            "position": {
                                "x": -10,
                                "y": 10,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "anchor",
                            "position": {
                                "x": -10,
                                "y": -10,
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
                    "link": "floor",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 40
                    },
                    "rotation": 0
                },
                {
                    "name": "",
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
                                "x": 30,
                                "y": 30,
                                "z": 4
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
                                    "name": "pillar",
                                    "shape": {
                                        "type": "prism",
                                        "n": 4,
                                        "top": 1,
                                        "bottom": 1,
                                        "rotated": false
                                    },
                                    "material": "wood_raw",
                                    "position": {
                                        "x": 7,
                                        "y": 7,
                                        "z": 0
                                    },
                                    "size": {
                                        "x": 4,
                                        "y": 4,
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
                                    "link": "pillar",
                                    "position": {
                                        "x": -7,
                                        "y": 7,
                                        "z": 0
                                    },
                                    "rotation": 0
                                },
                                {
                                    "link": "pillar",
                                    "position": {
                                        "x": 7,
                                        "y": -7,
                                        "z": 0
                                    },
                                    "rotation": 0
                                },
                                {
                                    "link": "pillar",
                                    "position": {
                                        "x": -7,
                                        "y": -7,
                                        "z": 0
                                    },
                                    "rotation": 0
                                }
                            ],
                            "position": {
                                "x": 0,
                                "y": 0,
                                "z": 3
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
                            "particles": [
                                {
                                    "name": "",
                                    "shape": {
                                        "type": "prism",
                                        "n": 8,
                                        "top": 0,
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
                                        "x": 28,
                                        "y": 28,
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
                                "z": 22
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
                        "z": 80
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
    },

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 5//[lifes / round]
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

