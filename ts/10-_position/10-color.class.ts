/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Color
 */
//======================================================================================================================


module T {
    /**
     * Object which represents RGBA color.
     */
    export class Color {

        /**
         *
         * @param r red from 0 to 255
         * @param g green from 0 to 255
         * @param b blue from 0 to 255
         * @param a alpha from 0 to 255
         */
        constructor(public r: number,public g: number,public b: number,public a = 255) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        /**
         * Get deep clone od T.Color
         * @returns {T.Color}
         */
        clone():T.Color{
            return new T.Color(this.r,this.g,this.b,this.a);
        }


        /**
         * Repairs overflowed colors
         * @private
         */
        bounds() {

            this.r = Math.round(this.r);
            this.g = Math.round(this.g);
            this.b = Math.round(this.b);
            this.a = Math.round(this.a);

            if (this.r > 255) {
                this.r = 255;
            }
            if (this.r < 0) {
                this.r = 0;
            }
            if (this.g > 255) {
                this.g = 255;
            }
            if (this.g < 0) {
                this.g = 0;
            }
            if (this.b > 255) {
                this.b = 255;
            }
            if (this.b < 0) {
                this.b = 0;
            }

            if (this.a > 255) {
                this.a = 255;
            }
            if (this.a < 0) {
                this.a = 0;
            }
        }


        /**
         * Get css representation of this color
         * @returns {string} eg. rgb(100,200,200)
         */
        getCssColor() {

            this.bounds();
            if (this.a == 255) {
                return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
            } else {
                //r('rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a/255*100)/100 + ')');
                return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a / 255 * 100) / 100 + ')';
            }

        }

        /**
         * Get hex representation of this color (ignores alpha chanel.)
         * @returns {string} eg. #00ff00
         */
        getHex() {
            this.bounds();
            return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
        }


        /**
         * Creates new T.Color form hex code of color
         * @param {string} hex code of color eg. #00ff00
         * @returns {T.Color} Color
         */
        static createFromHex(hex: string) {

            var result, shorthandRegex;

            shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return new T.Color(
                    parseInt(result[1], 16),
                    parseInt(result[2], 16),
                    parseInt(result[3], 16)
                );
            } else {

                throw new Error('Error while creating T.Color from ' + hex);

            }
        }

    }

}