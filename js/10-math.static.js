/**
 * @author ©Towns.cz
 * @fileOverview Creates static class T.Math
 */
//======================================================================================================================



/**
 * Mathematical functions to Towns
 */
T.Math=class{


    /**
     *
     * @static
     * @param {number}
     * @return {number}
     */
    static sign(x) {//todo Math.sign || this
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
    static baseLog(base, number) {
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
    static prettyNumber(number,number_of_non_zero_digits){

        number_of_non_zero_digits = number_of_non_zero_digits || 2;//todo refactor like this


        var digits=Math.ceil(T.Math.baseLog(10,number));
        var k = Math.pow(10,number_of_non_zero_digits-digits);

        //console.log(digits,k);


        number=number*k;
        //console.log(number);
        number=Math.round(number);
        //console.log(number);
        number=number/k;

        //console.log(number);

        return number;

    }

    //-------------------------

    /**
     * Difference between two angeles
     * @static
     * @param {number} degrees 1
     * @param {number} degrees 2
     * @return {number} degrees difference
     */
    static angleDiff(deg1,deg2){
        var a = deg1 - deg2;
        a = (a + 180) % 360 - 180;
        return(a);
    }

    //-------------------------

    /**
     * @static
     * @param {number} radians
     * @return {number} degrees
     */
    static rad2deg(radians){
        return(radians * (180/Math.PI));
    }

    //-------------------------

    /**
     * @static
     * @param {number} degrees
     * @return {number} radians
     */
    static deg2rad(degrees){
        return(degrees * (Math.PI/180));
    }

    //-------------------------

    /**
     * @static
     * @param x
     * @param y
     * @return {number} distance
     */
    static xy2dist(x,y){
        return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
    }


    //-------------------------

    //todo refactor to position
    static xy2distDeg(x,y){

        var output={};

        output.dist = this.xy2dist(x,y);
        output.deg = this.rad2deg(Math.atan2(y,x));

        return(output);

    }

    //-------------------------

    //todo refactor to position
    static distDeg2xy(dist,deg){

        var rad=this.deg2rad(deg);

        var output={};

        output.x = Math.cos(rad)*dist;
        output.y = Math.sin(rad)*dist;

        return(output);

    }

    //-------------------------

    //todo mybe refactor to position
    static xyRotate(x,y,deg){

        //nevyuzivam funkce Towns.A.xy2distDeg a A.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
        var dist = this.xy2dist(x,y);
        var rad = Math.atan2(y,x);

        rad += this.deg2rad(deg);

        var output={};
        output.x = Math.cos(rad)*dist;
        output.y = Math.sin(rad)*dist;

        return(output);

    }

    //======================================================================================================================


    static randomSeedPosition(seed,position){


        return (Math.sin(Math.pow((position.x*position.y)-seed,2))+1)/2;

    }

    //======================================================================================================================


    /**
     * Converts multitype to float
     * @static
     * @param value
     * @param {number} defval
     * @return {number}
     */
    static toFloat(value,defval){

        if(typeof defval === 'undefined')defval=0;
        if(typeof value ==='undefined')return(defval);

        value=parseFloat(value);
        if(isNaN(value)){
            return(defval);
        }else{
            return(value);
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
    static toInt(value,defval){

        if(typeof(value)==='undefined')return(defval);

        value=parseInt(value);
        if(isNaN(value)){
            return(defval);
        }else{
            return(value);
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
    static bounds(value,min,max){

        if(value<min)return min;
        if(value>max)return max;
        return value;

    }


    //----------------------------------------------------------

    /**
     * Is line A colliding line B?
     * @static
     * @param a1x
     * @param a1y
     * @param a2x
     * @param a2y
     * @param b1x
     * @param b1y
     * @param b2x
     * @param b2y
     * @return {boolean}
     */
    static lineCollision(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y){



        var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
        var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
        var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
        var collision;

        // Detect coincident lines (has a problem, read below)
        if (denominator === 0){

            //var collision= (numerator1 == 0 && numerator2 == 0);
            collision=false;

        }else{

            var r = numerator1 / denominator;
            var s = numerator2 / denominator;

            collision=((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

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







    static blurXY(generator,blur) {

        return(function (x, y) {

            var sum = 0;
            var count = 0;

            var xx,yy;

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




    static bytesToSize(bytes) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0B';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
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
    static proportions(a_start,a_position,a_end,b_start,b_end){


        var a_whole = a_end-a_start;
        var b_whole = b_end-b_start;

        var a_part = a_end-a_position;
        var b_part = (b_whole*a_part)/a_whole;

        return(b_end-b_part);


    }

    
    
};