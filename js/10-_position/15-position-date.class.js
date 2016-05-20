/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================


/**
 * Global position on towns map with time
 */
T.PositionDate = class extends T.Position{

    constructor(x,y,time){

        super(x,y);

        this.date=date;

    }


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    clone(){
        return new T.PositionDate(this);
    }




    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return '['+this.x+','+this.y+'] at '+this.date;

    }



};




