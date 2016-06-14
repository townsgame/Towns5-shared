
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Object
 */
//======================================================================================================================

module T.Objects {

    export class Object {

        public x;
        public y;
        public type;
        public name;

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

            if(object instanceof T.Objects.Object){
                return (object);
            }

            //----------------------------------
            if (object.type == 'building') {

                object = new T.Objects.Building(object);

            } else if (object.type == 'terrain') {

                object = new T.Objects.Terrain(object);

            } else if (object.type == 'story') {

                object = new T.Objects.Story(object);

            } else if (object.type == 'natural') {

                object = new T.Objects.Natural(object);

            } else {

                console.log(object);
                throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
            }
            //----------------------------------

            return (object);

        }


        getPosition():Position {
            return (new T.Position(this.x, this.y));
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
