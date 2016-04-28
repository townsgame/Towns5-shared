
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================



T.Objects.Building = class extends T.Objects.Object{


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
