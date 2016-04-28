
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};




T.Objects.Object = class{

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

};
