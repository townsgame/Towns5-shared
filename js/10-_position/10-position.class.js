/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================


/**
 * Global position on towns map
 */
T.Position = class{

    constructor(x,y){


        if(typeof x == 'object'){

            this.x= x.x;
            this.y= x.y;

        }else
        if(/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x)){

            x= x.split(',');
            this.x= parseFloat(x[0]);
            this.y= parseFloat(x[1]);

        }else
        if(typeof x == 'number' && typeof y == 'number'){

            this.x= x;
            this.y= y;

        }
        //todo check

    }


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    clone(){
        return new T.Position(this);
    }



    plus(position){

        this.x+=position.x;
        this.y+=position.y;
        return this;

    }


    multiply(k){

        this.x=this.x*k;
        this.y=this.y*k;
        return this;

    }



    getPositionPolar(){

        return(new T.PositionPolar(
            T.Math.xy2dist(this.x,this.y),
            T.Math.rad2deg(Math.atan2(this.y,this.x))
        ));

    }


    getDistance(position){

        return T.Math.xy2dist(position.x-this.x,position.y-this.y);

    }


    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return ''+this.x+','+this.y+'';

    }



};




