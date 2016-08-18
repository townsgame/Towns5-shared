/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================

namespace TOWNS {

    export class PositionPolar {

        constructor(public distance: number,public degrees: number) {
        }


        /**
         * Return deep clone of this.
         * @returns {TOWNS.Resources}
         */
        clone() {
            return new TOWNS.PositionPolar(this.distance,this.degrees);
        }


        getPosition() {

            var radians = this.getRadians();

            return (new TOWNS.Position(
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

            return TOWNS.TMath.deg2rad(this.degrees);

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




