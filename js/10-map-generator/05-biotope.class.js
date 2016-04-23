
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
T.MapGenerator = T.MapGenerator || {};
var A/*Actual Namespace*/ = T.MapGenerator;



/**
 *
 * @param {Array} terrains
 * @constructor
 */
A.Biotope = function(terrains){

    var sum=0;
    terrains.forEach(function(terrain){
        sum+=terrain.amount;
    });


    var from=0;
    terrains.forEach(function(terrain){

        terrain.from=from/sum;
        from+=terrain.amount;

    });

    //console.log(terrains);
    this.terrains = terrains;

};


/**
 *
 * @param {number} z
 * @returns {T.Objects.Terrain}
 */
A.Biotope.prototype.getZTerrain = function(z){


    for(var i=this.terrains.length-1;i>=0;i--){

        if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

    }


};

