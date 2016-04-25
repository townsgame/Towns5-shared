
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Building = class extends A.Object{


    getModel(){
        if(!(this.design.data instanceof T.Model)){
            this.design.data=new T.Model(this.design.data);
        }

        return(this.design.data);
    }

};
