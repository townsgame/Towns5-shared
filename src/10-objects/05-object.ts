
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Objects.Object
 */
//======================================================================================================================

namespace TOWNS.Objects {


    export class Object {

        public id:string;
        public x:number;
        public y:number;
        public type:string;
        public name:string;


        /**
         * @param {object} object
         */
        constructor(object) {

            for (var key in object) {

                var this_key = key;

                if (this_key == '_id')this_key = 'id';//todo maybe better solution

                this[this_key] = object[key];
            }

        }


        static init(object) {

            if(object instanceof TOWNS.Objects.Object){
                return (object);
            }

            //----------------------------------
            if (object.type == 'building') {

                object = new TOWNS.Objects.Building(object);

            } else if (object.type == 'terrain') {

                object = new TOWNS.Objects.Terrain(object);

            } else if (object.type == 'story') {

                object = new TOWNS.Objects.Story(object);

            } else if (object.type == 'natural') {

                object = new TOWNS.Objects.Natural(object);

            } else {

                console.log(object);
                throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
            }
            //----------------------------------

            return (object);

        }


        getPosition():Position {
            return (new TOWNS.Position(this.x, this.y));
        }


        /**
         * @returns {boolean}
         */
        isMoving():boolean {
            return (false);
        }


        /**
         *
         * @returns {string}
         */
        toString():string {
            return ('[' + this.name + ']');
        }

    }

}
