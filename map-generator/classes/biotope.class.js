
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================



//-----------------------Creating namespace MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
//-----------------------
//======================================================================================================================





Towns.MapGenerator.Biotope = module.exports = function(terrains){

    this.terrains = terrains;

};



module.exports.prototype.getZTerrain = function(z){


    for(var i=this.terrains.length-1;i>=0;i--){

        if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

    }

    return('ahoj');

};
