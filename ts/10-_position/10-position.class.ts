/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================


module T {

    /**
     * Global position on towns map
     */
    export class Position {

        constructor(x, y) {


            if (typeof x == 'object') {

                this.x = x.x;
                this.y = x.y;
                return;

            } else if (/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x)) {

                x = x.split(',');
                this.x = parseFloat(x[0]);
                this.y = parseFloat(x[1]);
                return;

            } else if (typeof x == 'number' && typeof y == 'number') {

                this.x = x;
                this.y = y;
                return;

            }
            //todo check
            throw new Error('Wrong constructor params while creating T.Position!');

        }


        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        clone() {
            return new T.Position(this);
        }


        plus(position) {

            this.x += position.x;
            this.y += position.y;
            return this;

        }



        minus(position) {

            this.x -= position.x;
            this.y -= position.y;
            return this;

        }


        multiply(k) {

            this.x = this.x * k;
            this.y = this.y * k;
            return this;

        }


        getFloored() {
            return new T.Position(Math.floor( this.x),Math.floor( this.y));


        }

        getPositionPolar() {

            return (new T.PositionPolar(
                T.TMath.xy2dist(this.x, this.y),
                T.TMath.rad2deg(Math.atan2(this.y, this.x))
            ));

        }


        getDistance(position) {

            return T.TMath.xy2dist(position.x - this.x, position.y - this.y);

        }


        /**
         * Converts Position to simple string
         * @return {string}
         */
        toString() {

            return '' + this.x + ',' + this.y + '';

        }


    }

}



