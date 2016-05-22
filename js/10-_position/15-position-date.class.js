/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================


/**
 * Global position on towns map with time
 */
T.PositionDate = class extends T.Position{

    constructor(x,y,date=0){

        if(typeof x === 'object'){

            y= x.y;
            date= x.date;
            x= x.x;

        }

        super(x,y);


        if(date===0){
            date = new Date();
        }else
        if(typeof date==='number' || typeof date==='string'){
            date = new Date(date);
        }


        if(isNaN(date/1)){
            throw new Error('To construct PositionDate is needed valid Date not '+date+'.');
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

        return '['+this.x+','+this.y+'] at '
            + (this.date.getDay()+1)+'.'+(this.date.getMonth()+1)+'.'+this.date.getFullYear()
            +' '+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds();

    }



};




