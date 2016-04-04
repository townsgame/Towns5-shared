/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Těžba hlíny",
    type: "building",
    subtype: "main",

    design: {
        type: "model",
        data:  {
            "name": "",
            "particles": [
                {
                    "name": "grid",
                    "particles": [
                        {
                            "name": "i",
                            "shape": {
                                "type": "prism",
                                "n": 4,
                                "rotated": false,
                                "top": 1,
                                "bottom": 1
                            },
                            "material": "wood_fence",
                            "position": {
                                "x": 5,
                                "y": 0,
                                "z": 0
                            },
                            "size": {
                                "x": 1,
                                "y": 40,
                                "z": 2
                            },
                            "rotation": 0
                        },
                        {
                            "link": "i",
                            "position": {
                                "x": -5,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "i",
                            "position": {
                                "x": 10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "i",
                            "position": {
                                "x": -10,
                                "y": 0,
                                "z": 0
                            },
                            "rotation": 0
                        },
                        {
                            "link": "i",
                            "position": {
                                "x": 0,
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
                    "link": "grid",
                    "position": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    "rotation": 90
                },
                {
                    "name": "",
                    "particles": [
                        {
                            "name": "",
                            "shape": {
                                "type": "prism",
                                "n": 9,
                                "top": 0.2,
                                "bottom": 1,
                                "rotated": false
                            },
                            "material": "stone_bricks",
                            "position": {
                                "x": 5,
                                "y": 5,
                                "z": 0
                            },
                            "size": {
                                "x": 20,
                                "y": 15,
                                "z": 20
                            },
                            "rotation": 320,
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
            "position": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "size": 1.8,
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
                "repair": 50//[%]
            }
        },/**/
        /**/{
            "type": "mine",
            "params":{
                "resource": "clay",//[resource]
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

