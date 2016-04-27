
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Building = class extends A.Object{


    clone(){//todo all classes should have this method
        return(new T.Objects.Building(JSON.parse(JSON.stringify(this))));
    }


    getModel(){
        if(!(this.design.data instanceof T.Model)){
            this.design.data=new T.Model(this.design.data);
        }

        return(this.design.data);
    }

};
