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
        data: {
            name:'root',
            particles: [
                {
                    name: '',
                    shape: {
                        type: 'prism',
                        n:4,
                        rotated:false,
                        top: 1,
                        bottom: 1
                    },
                    material: ['clay',0],
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:40,z:40},
                    rotation: 0
                }
                /*
                ,{
                    link: Locale.get('shape cube'),
                    position: {x:0,y:0,z:40},
                    size: 0.7,
                    rotation: 45
                }
                */
            ]
        }
    },

    actions: {

    }

}
;

