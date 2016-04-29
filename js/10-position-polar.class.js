/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================


T.PositionPolar = class{

    constructor(distance,degrees){

        if(typeof distance == 'number' && typeof degrees == 'number'){

            this.distance= distance;
            this.degrees= degrees;

        }
        //todo check

    }


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    clone(){
        return new T.PositionPolar(this);
    }



    getPosition(){

        var radians = this.getRadians();

        return(new T.Position(
            output.x = Math.cos(radians)*this.distance,
            output.y = Math.sin(radians)*this.distance
        ));


    }


    getDistance(){

        return this.distance;

    }


    getDegrees(){

        return this.degrees;

    }


    getRadians(){

        return T.Math.deg2rad(this.degrees);

    }



    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return ''+this.distance+','+this.degrees+'°';

    }



};




