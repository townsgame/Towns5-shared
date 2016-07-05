/**
 * @author ©Towns.cz
 * @fileOverview Creates static class TMath
 */
//======================================================================================================================


module T {


    interface position {
        x: number;
        y: number;
    }

    interface positionPolar {
        dist: number;
        deg: number;
    }



    /**
     * Mathematical functions to Towns
     */
    export class TMath {


        /**
         *
         * @static
         * @param {number}
         * @return {number}
         */
        static sign(x: number): number {//todo Math.sign || this
            x = +x; // convert to a number
            if (x === 0 || isNaN(x)) {
                return x;
            }
            return x > 0 ? 1 : -1;
        }

        //-------------------------

        /**
         *
         * @static
         * @param base
         * @param number
         * @returns {number}
         */
        static baseLog(base: number, number: number): number {
            return Math.log(number) / Math.log(base);
        }

        //-------------------------

        /**
         *
         * @static
         * @param {number} number
         * @param {number} number_of_non_zero_digits
         * @return {number} Cuts unless digits to zero
         */
        static prettyNumber(number: number, number_of_non_zero_digits: number): number {

            number_of_non_zero_digits = number_of_non_zero_digits || 2;//todo refactor like this


            var digits = Math.ceil(TMath.baseLog(10, number));
            var k = Math.pow(10, number_of_non_zero_digits - digits);

            //console.log(digits,k);


            number = number * k;
            //console.log(number);
            number = Math.round(number);
            //console.log(number);
            number = number / k;

            //console.log(number);

            return number;

        }

        //-------------------------

        /**
         * Difference between two angeles
         * @static
         * @param {number} deg1
         * @param {number} deg2
         * @return {number} <0;180> degrees difference
         */
        static angleDiff(deg1: number, deg2:number):number {
            var deg = Math.abs(deg1 - deg2) % 360;
            if (deg > 180)deg = 360 - deg;
            return (deg);
        }

        //-------------------------

        /**
         * @static
         * @param {number} radians
         * @return {number} degrees
         */
        static rad2deg(radians:number):number {
            return (radians * (180 / Math.PI)) % 360;
        }

        //-------------------------

        /**
         * @static
         * @param {number} degrees
         * @return {number} radians
         */
        static deg2rad(degrees:number):number {
            return (degrees % 360 * (Math.PI / 180));
        }

        //-------------------------

        /**
         * @static
         * @param x
         * @param y
         * @return {number} distance
         */
        static xy2dist(x:number, y:number):number {
            return (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        }


        //-------------------------


        static xy2distDeg(x:number, y:number):positionPolar {

            var output = {
                dist: TMath.xy2dist(x, y),
                deg:  TMath.rad2deg(Math.atan2(y, x))

            };


            return (output);

        }

        //-------------------------


        static distDeg2xy(dist:number, deg:number):position {

            var rad = TMath.deg2rad(deg);

            var output = {
                x: Math.cos(rad) * dist,
                y: Math.sin(rad) * dist

            };

            return (output);

        }

        //-------------------------

        //todo mybe refactor to position
        static xyRotate(x: number, y:number, deg:number):position {


            var dist = TMath.xy2dist(x, y);
            var rad = Math.atan2(y, x);

            rad += TMath.deg2rad(deg);


            var output = {
                x: Math.cos(rad) * dist,
                y: Math.sin(rad) * dist

            };

            return (output);

        }

        //======================================================================================================================


        static randomSeedPosition(seed:number, position:position) {


            return (Math.sin(Math.pow((position.x * position.y) - seed, 2)) + 1) / 2;

        }

        //======================================================================================================================


        /**
         * Converts multitype to float
         * @static
         * @param value
         * @param {number} defval
         * @return {number}
         */
        static toFloat(value:any, defval=0):number {

            //if (typeof defval === 'undefined')defval = 0;
            if (typeof value === 'undefined')return (defval);

            value = parseFloat(value);
            if (isNaN(value)) {
                return (defval);
            } else {
                return (value);
            }

        }

        //----------------------------------------------------------

        /**
         * Converts multitype to integer
         * @static
         * @param value
         * @param {number} defval
         * @return {number}
         */
        static toInt(value:any, defval=0):number {

            if (typeof(value) === 'undefined')return (defval);

            value = parseInt(value);
            if (isNaN(value)) {
                return (defval);
            } else {
                return (value);
            }

        }

        //----------------------------------------------------------

        /**
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        static bounds(value:number, min:number, max:number):number {

            if (value < min)return min;
            if (value > max)return max;
            return value;

        }


        /**
         * Is point[b1x,b1y] colliding line?
         * @param {number} a1x
         * @param {number} a1y
         * @param {number} a2x
         * @param {number} a2y
         * @param {number} b1x
         * @param {number} b1y
         * @returns {boolean}
         */
        static isOnLine(a1x:number, a1y:number, a2x:number, a2y:number, b1x:number, b1y:number): boolean {

            a2x -= a1x;
            a2y -= a1y;

            b1x -= a1x;
            b1y -= a1y;


            var aSlope = a2y / a2x;
            var bSlope = b1y / b1x;


            if (aSlope != bSlope)return false;


            var aDist = TMath.xy2dist(a2y, a2x);
            var bDist = TMath.xy2dist(b1y, b1x);

            return (aDist >= bDist);

        }


        /**
         * Is line A colliding line B?
         * @static
         * @param {number} a1x
         * @param {number} a1y
         * @param {number} a2x
         * @param {number} a2y
         * @param {number} b1x
         * @param {number} b1y
         * @param {number} b2x
         * @param {number} b2y
         * @return {boolean}
         */
        static lineCollision(a1x:number, a1y:number, a2x:number, a2y:number, b1x:number, b1y:number, b2x:number, b2y:number): boolean {


            var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
            var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
            var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
            var collision;

            //console.log(denominator,numerator1,numerator2);

            // Detect coincident lines (has a problem, read below)
            if (denominator === 0) {

                //var collision= (numerator1 == 0 && numerator2 == 0);
                //collision=false;

                var bOnA = TMath.isOnLine(a1x, a1y, a2x, a2y, b1x, b1y);
                var aOnB = TMath.isOnLine(b1x, b1y, b2x, b2y, a1x, a1y);

                return (bOnA || aOnB);


            } else {

                var r = numerator1 / denominator;
                var s = numerator2 / denominator;

                collision = ((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

            }


            //-------------------------------Debug TDD do not delete

            /*var size=50;
             var src=createCanvasViaFunctionAndConvertToSrc(
             size*2,size*2,function(ctx){

             //ctx.strokeStyle = '#000000';
             //ctx.strokeWidth = 2;

             ctx.beginPath();
             ctx.moveTo(a1x+size,a1y+size);
             ctx.lineTo(a2x+size,a2y+size);
             ctx.stroke();
             ctx.closePath();


             ctx.beginPath();
             ctx.moveTo(b1x+size,b1y+size);
             ctx.lineTo(b2x+size,b2y+size);
             ctx.stroke();
             ctx.closePath();

             }


             );
             $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');*/

            //-------------------------------


            return collision;

        }


        static blurXY(generator:Function, blur:number) {

            return (function (x, y) {

                var sum = 0;
                var count = 0;

                var xx, yy;

                for (xx = x - blur; xx <= x + blur; xx++) {

                    for (yy = y - blur; yy <= y + blur; yy++) {

                        if (Math.pow(blur, 2) < Math.pow(xx - x, 2) + Math.pow(yy - y, 2))continue;

                        sum += generator(xx, yy);
                        count++;

                    }
                }

                return (sum / count);

            });

        }


        static bytesToSize(bytes:number):string {
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0B';
            var i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
        }


        /**
         *
         * @param {number} a_start
         * @param {number} a_position
         * @param {number} a_end
         * @param {number} b_start
         * @param {number} b_end
         * @returns {number}
         */
        static proportions(a_start:number, a_position:number, a_end:number, b_start:number, b_end:number):number {


            var a_whole = a_end - a_start;
            var b_whole = b_end - b_start;

            var a_part = a_end - a_position;
            var b_part = (b_whole * a_part) / a_whole;

            return (b_end - b_part);


        }


    }


}