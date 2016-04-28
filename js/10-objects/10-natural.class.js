
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};




T.Objects.Natural = class extends A.Object{

    clone(){//todo all classes should have this method
        return(new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
    }


    getCode(){
        return(this.design.data.image);
    }



};
