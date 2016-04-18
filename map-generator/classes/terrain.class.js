
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;//todo refactor this should not be under MapGenerator namespace
//-----------------------
//======================================================================================================================



Towns.MapGenerator.Terrain = module.exports = function(object){

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

Towns.MapGenerator.Terrain.prototype.getCode = function(prefered_width){

    return(this.design.data.image);

};


/*Towns.MapGenerator.Terrain.prototype.getImage = function(prefered_width){
};*/



Towns.MapGenerator.Terrain.prototype.getColor = function(){

    return(this.design.data.color);

};



