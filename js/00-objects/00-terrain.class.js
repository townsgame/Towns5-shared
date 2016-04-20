
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace T (=global.Towns).MapGenerator
var T = global.Towns;
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;//todo refactor this should not be under MapGenerator namespace
module.exports = Towns;
//-----------------------
//======================================================================================================================



A.Terrain = function(object){

    for(var key in object){
        this[key] = object[key];
    }

    /*this.type="terrain";
    this.name=name_cz;
    this.design = {};
    this.design.type = "terrain";
    this.design.data = {};
    this.design.data.image = imageCode;
    this.design.data.size = 1;
    this.design.data.color = color;*/


};

A.Terrain.prototype.getCode = function(prefered_width){

    return(this.design.data.image);

};


/*Towns.Objects.Terrain.prototype.getImage = function(prefered_width){
};*/



A.Terrain.prototype.getColor = function(){

    return(this.design.data.color);

};



