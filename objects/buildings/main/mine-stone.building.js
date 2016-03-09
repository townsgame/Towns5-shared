/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Kamenolom",
    type: "building",
    subtype: "main",

    design: {
        type: "model",
        data: {
            name:'root',

            "particles": [ { "name": "", "particles": [ { "name": "floor", "particles": [ { "name": "row", "particles": [ { "name": "brick", "shape": { "type": "prism", "n": 4, "rotated": false, "top": 1, "bottom": 1.1 }, "color": "#cccccc", "position": { "x": 0, "y": 0, "z": 0 }, "size": { "x": 7, "y": 14, "z": 5 }, "rotation": 0 }, { "link": "brick", "position": { "x": 10, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 30, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 20, "y": 0, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "row", "position": { "x": 0, "y": 15, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "floor", "position": { "x": -6, "y": 0, "z": 0 }, "rotation": 290 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "color": "#cccccc", "position": { "x": 17, "y": -17, "z": 0 }, "size": { "x": 25, "y": 25, "z": 18 }, "rotation": 30, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "color": "#cccccc", "position": { "x": 23, "y": -6, "z": 0 }, "size": { "x": 25, "y": 19, "z": 12 }, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } } ]


        }
    },

    actions: {

    }

}
;

