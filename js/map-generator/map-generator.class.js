
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
//-----------------------Loading modules if running under node js
if(typeof window=='undefined'){

    A.Terrain = require(__dirname+'/../classes/terrain.class.js');

}
//-----------------------
//======================================================================================================================



Towns.MapGenerator.MapGenerator = module.exports  = function(getZ,biotope,virtualObjectGenerator){

    this.getZ = getZ;
    this.biotope = biotope;
    this.virtualObjectGenerator = virtualObjectGenerator;

};



//private
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




//private
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


//private
Towns.MapGenerator.MapGenerator.prototype.getMapArrayCircle = function(center_integer,radius){


    var bounds=1;


    var z_map=this.getZMapCircle(center_integer,radius);

    var map=this.terrainMap(z_map);

    return(map);

};

//private
Towns.MapGenerator.MapGenerator.prototype.convertMapArrayToObjects = function(map_array,center_integer,radius){

    var objects=[];

    for (var y = 0; y < radius * 2; y++) {
        for (var x = 0; x < radius * 2; x++) {

            if (typeof(map_array[y][x]) === 'undefined')continue;


            var object = new Towns.MapGenerator.Terrain(map_array[y][x]);


            object.x=center_integer.x-radius+x;
            object.y=center_integer.y-radius+y;


            objects.push(object);


        }
    }

    return(objects);
};




//private
Towns.MapGenerator.MapGenerator.prototype.getPureMap = function(center,radius){

    center_integer={
        x: Math.floor(center.x),
        y: Math.floor(center.y)
    };

    var map_array = this.getMapArrayCircle(center_integer,radius);
    var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);
    return(objects);

};




//private
Towns.MapGenerator.MapGenerator.prototype.getVirtualObjectsFromTerrainObjects = function(objects){

    var self = this;

    var virtual_objects = [];
    objects.forEach(function(object){

        self.virtualObjectGenerator(object,virtual_objects);

    });

    return(virtual_objects);

};





//======================================================================================================================
//======================================================================================================================





Towns.MapGenerator.MapGenerator.prototype.completeMap = function(real_objects,center,radius,virtual_objects){

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






Towns.MapGenerator.MapGenerator.prototype.getMapArray = function(real_objects,center,radius){


    this.completeMap(real_objects,center,radius,false);

    //--------------------------Create empty array
    var map_array=[];
    for (var y = 0; y < (radius*2); y++) {
        map_array[y]=[];
        for (var x = 0; x < (radius * 2); x++) {
            map_array[y][x]=false;
        }
    }

    //--------------------------

    //--------------------------Fill array


    real_objects.forEach(function(object){

        if(object.type!='terrain')return;

        if(object.design.data.size==1) {//todo is this optimalization effective?
            //--------------------------

            var x = Math.floor(object.x - center.x + radius);
            var y = Math.floor(object.y - center.y + radius);

            map_array[y][x]
                =
                T.MapGenerator.terrains[object.design.data.image];//todo maybe better

            //--------------------------
        }else {
            //--------------------------

            var x_from = Math.floor(object.x - center.x + radius - object.design.data.size);
            var x_to = Math.ceil(object.x - center.x + radius + object.design.data.size);

            var y_from = Math.floor(object.y - center.y + radius - object.design.data.size);
            var y_to = Math.ceil(object.y - center.y + radius + object.design.data.size);


            var xc = radius + center.x - object.x;
            var yc = radius + center.y - object.y;


            for (var y = y_from; y <= y_to; y++) {

                if (typeof map_array[y] === 'undefined')continue;

                for (var x = x_from; x <= x_to; x++) {


                    if (typeof map_array[y][x] === 'undefined')continue;


                    if (T.Math.xy2dist(x - xc, y - yc) <= object.design.data.size) {

                        map_array[y][x]
                            =
                            T.MapGenerator.terrains[object.design.data.image];//todo maybe better

                    }
                }
            }

            //--------------------------
        }

    });
    //--------------------------

    return map_array;


};



/*
Towns.MapGenerator.MapGenerator.prototype.getTerrainObjectOnPosition = function(real_objects,position){
    return Terrain;
};


Towns.MapGenerator.MapGenerator.prototype.findNearestTerrain = function(material_terrains,position,terrain){
    return 8;
};*/






