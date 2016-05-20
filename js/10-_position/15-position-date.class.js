/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================


/**
 * Global position on towns map with time
 */
T.PositionDate = class extends T.Position{

    constructor(x,y,date){

        super(x,y);


        if(date===0){
            date = new Date();
        }else
        if(typeof date==='number'){
            date = new Date(date);
        }


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
     * Return only position
     * @returns {T.Position}
     */
    getPosition(){
        return new T.Position(this.x,this.y);
    }



    /**
     * Converts Position to simple string
     * @return {string}
     */
    toString(){

        return '['+this.x+','+this.y+'] at '+this.date;

    }



};




