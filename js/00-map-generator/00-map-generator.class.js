
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
////-----------------------Creating namespace T (=global.Towns)
var T = global.Towns;
var A/*Actual Namespace*/ = T;
module.exports = Towns;
//-----------------------
//======================================================================================================================



A.MapGenerator = function(getZ,biotope,virtualObjectGenerator){

    this.getZ = getZ;
    this.biotope = biotope;
    this.virtualObjectGenerator = virtualObjectGenerator;

};



//private
A.MapGenerator.prototype.getZMapCircle = function(center_integer,radius){

    var map=[];

    for(var y=0;y<=radius*2;y++){

        map[y]=[];

        for(var x=0;x<=radius*2;x++){


            if(
                Math.pow(x-radius+1/2,2)
                +
                Math.pow(y-radius+1/2,2)
                >
                Math.pow(radius,2)
            )continue;


            map[y][x]=this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);


        }
    }

    return(map);

};




//private
A.MapGenerator.prototype.terrainMap = function(map){

    var map_bg=[];

    for(var y=0,l=map.length;y<l;y++){
        map_bg[y]=[];
        for(var x=0;x<l;x++){

            if(typeof(map[y][x])==='undefined')continue;

            map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);

        }
    }

    return(map_bg);

};


//private
A.MapGenerator.prototype.getMapArrayCircle = function(center_integer,radius){


    var bounds=1;


    var z_map=this.getZMapCircle(center_integer,radius);

    var map=this.terrainMap(z_map);

    return(map);

};

//private
A.MapGenerator.prototype.convertMapArrayToObjects = function(map_array,center_integer,radius){

    var objects=[];

    for (var y = 0; y < radius * 2; y++) {
        for (var x = 0; x < radius * 2; x++) {

            if (typeof(map_array[y][x]) === 'undefined')continue;


            var object = new T.Objects.Terrain(map_array[y][x]);


            object.x=center_integer.x-radius+x;
            object.y=center_integer.y-radius+y;


            objects.push(object);


        }
    }

    return(objects);
};




//private
A.MapGenerator.prototype.getPureMap = function(center,radius){

    center_integer={
        x: Math.floor(center.x),
        y: Math.floor(center.y)
    };

    var map_array = this.getMapArrayCircle(center_integer,radius);
    var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);
    return(objects);

};




//private
A.MapGenerator.prototype.getVirtualObjectsFromTerrainObjects = function(objects){

    var self = this;

    var virtual_objects = [];
    objects.forEach(function(object){

        self.virtualObjectGenerator(object,virtual_objects);

    });

    return(virtual_objects);

};





//=================================================PUBLIC===============================================================





A.MapGenerator.prototype.completeObjects = function(real_objects,center,radius,virtual_objects){

    var virtual_objects = virtual_objects || true;

    var terrains_objects = this.getPureMap(center, radius);

    terrains_objects.forEach(function(object){
        real_objects.push(object);
    });


    if(virtual_objects){

        console.log('Getting virtual objects');

        var virtual_objects = this.getVirtualObjectsFromTerrainObjects(real_objects);

        virtual_objects.forEach(function(object){
            real_objects.push(object);
        });

    }else{

        console.log('NOT Getting virtual objects');

    }




    return(real_objects);

};







