


//todo in future this should be extended from object
var Terrain = function(imageCode, color, name_cz){

    this.type="terrain";
    this.name=name_cz;
    this.design = {}
    this.design.type = "terrain";
    this.design.data = {};
    this.design.data.image = imageCode;
    this.design.data.size = 1;
    this.design.data.color = color;


};


Terrain.prototype.getImage = function(prefered_width){

    return(this.design.data.color);

};



Terrain.prototype.getColor = function(){

    return(this.design.data.color);

};