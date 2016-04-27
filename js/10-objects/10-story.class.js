
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Story = class extends A.Object{

    clone(){//todo all classes should have this method
        return(new T.Objects.Story(JSON.parse(JSON.stringify(this))));
    }

    getMarkdown(){
        return(this.content.data);
    }




};
