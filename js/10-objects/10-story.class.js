
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;




A.Story = class extends A.Object{

    getMarkdown(){
        return(this.content.data);
    }

};
