/**
 * @author ©Towns.cz
 * @fileOverview Creates class Position 3D
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;


A.Position3D = class{


    constructor(x,y,z){

        if(typeof x == 'object'){

            this.x= x.x;
            this.y= x.y;
            this.z= x.z;

        }else{

            this.x= x;
            this.y= y;
            this.z= z;

        }

    }



    /**
     * Converts Position3D to simple string
     * @return {string}
     */
    toString(){

        return '['+this.x+','+this.y+','+this.z+']';

    }



};




