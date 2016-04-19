
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace T (=global.Towns).MapGenerator
var T = global.Towns;
T.MapGenerator = T.MapGenerator || {};
var A/*Actual Namespace*/ = T.MapGenerator;
module.exports = Towns;
//-----------------------
//======================================================================================================================





A.Biotope = function(terrains){

    this.terrains = terrains;

};



A.Biotope.prototype.getZTerrain = function(z){


    for(var i=this.terrains.length-1;i>=0;i--){

        if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

    }


};

