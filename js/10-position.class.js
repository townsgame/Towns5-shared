/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================


T.Position = class{

    constructor(x,y){

        if(typeof x == 'object'){

            this.x= x.x;
            this.y= x.y;

        }else{

            this.x= x;
            this.y= y;

        }

    }


    getMoved(x,y){

        return new T.Position(this.x+x,this.y+y);

    }


    getDistance(position){

        return T.Math.xy2dist(position.x-this.x,position.y-this.y);

    }



    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return '['+this.x+','+this.y+']';

    }



};




