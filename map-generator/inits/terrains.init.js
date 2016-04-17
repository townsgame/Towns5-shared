
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;
//-----------------------

//-----------------------Loading modules if running under node js
if(typeof window=='undefined'){

    A.Terrain = require(__dirname+'/../classes/terrain.class.js');

}
//-----------------------
//======================================================================================================================



A.terrains = module.exports = [
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 0 ,color: '#000000', size: 1}}, name: 'temnota'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 1 ,color: '#337EFA', size: 1}}, name: 'moře'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 2 ,color: '#545454', size: 1}}, name: 'dlažba'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 3 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 4 ,color: '#F9F98D', size: 1}}, name: 'písek'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 5 ,color: '#878787', size: 1}}, name: 'kamení'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 6 ,color: '#5A2F00', size: 1}}, name: 'hlína'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 7 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 8 ,color: '#2A7302', size: 1}}, name: 'tráva(normal)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 9 ,color: '#51F311', size: 1}}, name: 'tráva(toxic)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 10,color: '#535805', size: 1}}, name: 'les'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 11,color: '#337EFA', size: 1}}, name: 'řeka'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 12,color: '#8ABC02', size: 1}}, name: 'tráva(jaro)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 13,color: '#8A9002', size: 1}}, name: 'tráva(pozim)'})
];


A.terrains[5].setVirtualObjectsGenerator(function(position){
    return([{

        x: position.x,
        y: position.y,
        type: 'natural',
        design: {
            type: 'natural',
            data:{
                image:'rock0dark0'
            }
        }

    }]);

});


A.terrains[10].setVirtualObjectsGenerator(function(position){
    return([{

        x: position.x,
        y: position.y,
        type: 'natural',
        design: {
            type: 'natural',
            data:{
                image:'tree0'
            }
        }

    }]);

});


/*A.terrains[4].bindVirtualObject( {
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



});*/
