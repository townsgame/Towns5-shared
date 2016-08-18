/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================

module T {


    interface Position3DObject {
        x:number;
        y:number;
        z:number;
    }

    export class Position3D {

        public x: number;
        public y: number;
        public z: number;

        constructor(x_or_object: number | Position3DObject, y?: number, z?: number) {

            let x:number;

            if (typeof x_or_object === 'object') {

                this.x = x_or_object.x;
                this.y = x_or_object.y;
                this.z = x_or_object.z;

            } else
            if (typeof x_or_object === 'number'){

                this.x = x_or_object;
                this.y = y;
                this.z = z;

            }

        }


        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        clone() {
            return new T.Position3D(this);
        }


        /**
         * Converts Position3D to simple string
         * @return {string}
         */
        toString() {

            return '[' + this.x + ',' + this.y + ',' + this.z + ']';

        }


    }

}




