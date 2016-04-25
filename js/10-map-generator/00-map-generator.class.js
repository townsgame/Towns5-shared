
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;



/**
 *
 * @param {function} getZ
 * @param {Array} z_normalizing_table
 * @param {T.MapGenerator.Biotope} biotope
 * @param {function} virtualObjectGenerator
 * @constructor
 */
A.MapGenerator = function(getZ,z_normalizing_table,biotope,virtualObjectGenerator){

    this.getZ = getZ;
    this.z_normalizing_table = z_normalizing_table;
    this.biotope = biotope;
    this.virtualObjectGenerator = virtualObjectGenerator;


};


/**
 *
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
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


            var z = this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);


            map[y][x] = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];




        }
    }

    return(map);

};


/**
 *
 * @param {Array} map
 * @returns {Array}
 * @private
 */
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


/**
 *
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.getMapArrayCircle = function(center_integer,radius){


    var bounds=1;


    var z_map=this.getZMapCircle(center_integer,radius);

    var map=this.terrainMap(z_map);

    return(map);

};



/**
 *
 * @param {Array} map_array
 * @param {T.Position} center_integer
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.convertMapArrayToObjects = function(map_array,center_integer,radius){

    var objects= new T.Objects.Array();

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


/**
 *
 * @param {T.Position} center
 * @param {number} radius
 * @returns {Array}
 * @private
 */
A.MapGenerator.prototype.getPureMap = function(center,radius){

    center_integer={
        x: Math.floor(center.x),
        y: Math.floor(center.y)
    };

    var map_array = this.getMapArrayCircle(center_integer,radius);
    var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);
    return(objects);

};


/**
 *
 * @param {T.Objects.Array} objects
 * @returns {T.Objects.Array}
 * @private
 */
A.MapGenerator.prototype.getVirtualObjectsFromTerrainObjects = function(objects){

    var self = this;

    var virtual_objects = [];
    objects.get1x1TerrainObjects().forEach(function(object){

        self.virtualObjectGenerator(object,virtual_objects);

    });

    return(virtual_objects);

};





//=================================================PUBLIC===============================================================


/**
 * Complete terrain and virtual objects into Objects Array
 * @param {T.Objects.Array} real_objects
 * @param {T.Position} center
 * @param {number} radius
 * @param {boolean} virtual_objects
 * @returns {T.Objects.Array}}
 */
A.MapGenerator.prototype.getCompleteObjects = function(real_objects,center,radius,virtual_objects){

    if(typeof virtual_objects == 'undefined')virtual_objects = true;


    var complete_objects = this.getPureMap(center, radius);



    real_objects.forEach(function(object){
        complete_objects.push(object);
    });



    if(virtual_objects){

        var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);

        virtual_objects.forEach(function(object){
            complete_objects.push(object);
        });

    }




    return(complete_objects);

};








