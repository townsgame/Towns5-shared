/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================

namespace T {

    export class PositionPolar {

        constructor(public distance: number,public degrees: number) {
        }


        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        clone() {
            return new T.PositionPolar(this.distance,this.degrees);
        }


        getPosition() {

            var radians = this.getRadians();

            return (new T.Position(
                Math.cos(radians) * this.distance,
                Math.sin(radians) * this.distance
            ));


        }


        getDistance() {

            return this.distance;

        }


        getDegrees() {

            return (this.degrees + 360) % 360;

        }


        getRadians() {

            return T.TMath.deg2rad(this.degrees);

        }


        /**
         * Converts Position to simple string
         * @return {string}
         */
        toString() {

            return '' + this.distance + ',' + this.degrees + '°';

        }


    }

}




