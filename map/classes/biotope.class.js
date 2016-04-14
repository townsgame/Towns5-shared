



var Biotope = function(terrains){

    this.terrains = terrains;



};



Biotope.prototype.getZTerrain = function(z){


    for(var i=this.terrains.length-1;i>=0;i--){

        //console.log(z +'>='+ this.terrains[i].from);
        if(z >= this.terrains[i].from ) return(this.terrains[i].terrain);

    }

    return('ahoj');

};