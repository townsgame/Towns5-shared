
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;//todo refactor this should not be under MapGenerator namespace




A.Terrain = class extends A.Object{

    getCode(prefered_width){

        return(this.design.data.image);

    }


    getColor(){

        return(this.design.data.color);

    }


    //todo getImage(){}


};

