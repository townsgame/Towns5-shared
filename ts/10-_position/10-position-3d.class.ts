/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================

module T {

    export class Position3D {


        constructor(x, y, z) {

            if (typeof x == 'object') {

                this.x = x.x;
                this.y = x.y;
                this.z = x.z;

            } else {

                this.x = x;
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




