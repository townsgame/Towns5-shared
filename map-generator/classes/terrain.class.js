
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;
//-----------------------
//======================================================================================================================



Towns.MapGenerator.Terrain = module.exports = function(imageCode, color, name_cz){

    this.type="terrain";
    this.name=name_cz;
    this.design = {}
    this.design.type = "terrain";
    this.design.data = {};
    this.design.data.image = imageCode;
    this.design.data.size = 1;
    this.design.data.color = color;


};


Towns.MapGenerator.Terrain.prototype.getImage = function(prefered_width){

    return(this.design.data.color);

};



Towns.MapGenerator.Terrain.prototype.getColor = function(){

    return(this.design.data.color);

};

