
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Object
 */
//======================================================================================================================



T.Objects.Object = class{

    /**
     * @param {object} object
     */
    constructor(object){

        for(var key in object){

            var this_key = key;

            if(this_key=='_id')this_key='id';//todo maybe better solution

            this[this_key] = object[key];
        }

    }

    //todo jsdoc
    getPosition(){
        return(new T.Position(this.x,this.y));
    }


    /**
     * @returns {boolean}
     */
    isMoving(){
        return(false);
    }


    /**
     *
     * @returns {string}
     */
    toString(){
        return('['+this.name+']');
    }

};
