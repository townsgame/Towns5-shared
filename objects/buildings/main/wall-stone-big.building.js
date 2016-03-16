/**
 * @author ©Towns.cz
 * @author Pavol Hejný
 * @fileOverview Building of main pack for migrations
 */
//======================================================================================================================


module.exports=
{
    name: "Velká hradba",
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

    actions: [
        /**/{
            "type": "defense",
            "params":{
                "defense": 6//[lifes / round]
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

