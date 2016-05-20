/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionTime
 */
//======================================================================================================================


/**
 * Global position on towns map with time
 */
T.PositionTime = class extends T.Position{

    constructor(x,y,time){

        super(x,y);

        this.time=time;

    }


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    clone(){
        return new T.PositionTime(this);
    }




    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return '['+this.x+','+this.y+'] at '+time;

    }



};




