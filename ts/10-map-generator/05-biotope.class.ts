
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator.Biotope
 */
//======================================================================================================================


T.MapGenerator.Biotope = class{

    /**
     *
     * @param {Array} terrains
     * @constructor
     */
    constructor(terrains){

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

    }


    /**
     *
     * @param {number} z
     * @returns {T.Objects.Terrain}
     */
    getZTerrain(z: number){


        for(var i=this.terrains.length-1;i>=0;i--){

            if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

        }


    }



};


