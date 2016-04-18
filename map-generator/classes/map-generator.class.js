
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
////-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;
//-----------------------
//======================================================================================================================



Towns.MapGenerator.MapGenerator = module.exports  = function(getZ,biotope,virtualObjectGenerator){

    this.getZ = getZ;
    this.biotope = biotope;
    this.virtualObjectGenerator = virtualObjectGenerator;

};




Towns.MapGenerator.MapGenerator.prototype.getZMapCircle = function(center_integer,radius){

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





Towns.MapGenerator.MapGenerator.prototype.terrainMap = function(map){

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



Towns.MapGenerator.MapGenerator.prototype.getMapArrayCircle = function(center,radius){


    var bounds=1;


    center_integer={
        x: Math.floor(center.x),
        y: Math.floor(center.y)
    };

    var z_map=this.getZMapCircle(center_integer,radius);

    var map=this.terrainMap(z_map);

    return(map);

};


Towns.MapGenerator.MapGenerator.prototype.convertMapArrayToObjects = function(map_array,center,radius){

    var objects=[];

    for (var y = 0; y < radius * 2; y++) {
        for (var x = 0; x < radius * 2; x++) {

            if (typeof(map_array[y][x]) === 'undefined')continue;


            var object = new Towns.MapGenerator.Terrain(map_array[y][x]);


            object.x=center_integer.x+x;
            object.y=center_integer.y+y;


            objects.push(object);


        }
    }

    return(objects);
};





Towns.MapGenerator.MapGenerator.prototype.getMap = function(center,radius){

    var map_array = this.getMapArrayCircle(center,radius);
    var objects = this.convertMapArrayToObjects(map_array,center,radius);
    return(objects);

};





//======================================================================================================================





Towns.MapGenerator.MapGenerator.prototype.getVirtualObjects = function(objects){

    var self = this;

    var virtual_objects = [];
    objects.forEach(function(object){

        self.virtualObjectGenerator(object,virtual_objects);

    });

    return(virtual_objects);

};