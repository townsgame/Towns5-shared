
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

    this.virtual_objects = [];
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



Towns.MapGenerator.Terrain.prototype.bindVirtualObject = function(virtual_object){

    this.virtual_objects.push(virtual_object);
    console.log(this.virtual_objects);

};



Towns.MapGenerator.Terrain.prototype.getVirtualObjects = function(position){



    //if(Math.random()>0.5)return([]);
    if(this.virtual_objects.length==0)return([]);

    var virtual_object={};

    for(var key in this.virtual_objects[0]){

        virtual_object[key] = this.virtual_objects[0][key];

    }

    virtual_object.x=position.x;
    virtual_object.y=position.y;



    return([virtual_object]);

};
