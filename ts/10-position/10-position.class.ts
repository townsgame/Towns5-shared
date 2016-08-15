/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================


module T {

    interface Position {
        x:number;
        y:number;
    }


    /**
     * Global position on towns map
     */
    export class Position {

        public x:number;
        public y:number;

        constructor(x_or_object_or_string: number | Position | string, y?: number) {

            let x:number;

            if (typeof x_or_object_or_string === 'object') {

                this.x = x_or_object_or_string.x;
                this.y = x_or_object_or_string.y;
                return;

            }else
            if(typeof x_or_object_or_string === 'string'){

                if (/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x_or_object_or_string)) {

                    let x_y:Array;
                    x_y = x_or_object_or_string.split(',');
                    this.x = parseFloat(x_y[0]);
                    this.y = parseFloat(x_y[1]);
                    return;

                }else{
                    throw new Error('When creating Position, string must be in format x,y not '+x_or_object_or_string);
                }

            } else if (typeof x_or_object_or_string === 'number') {

                this.x = x_or_object_or_string;
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


        plus(position: Position) {

            this.x += position.x;
            this.y += position.y;
            return this;

        }



        minus(position: Position) {

            this.x -= position.x;
            this.y -= position.y;
            return this;

        }


        multiply(k: number) {

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


        getDistance(position: Position) {

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



