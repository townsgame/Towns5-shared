
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator
 */
//======================================================================================================================


T.MapGenerator = class{

    /**
     *
     * @param {function} getZ
     * @param {Array} z_normalizing_table
     * @param {T.MapGenerator.Biotope} biotope
     * @param {function} virtualObjectGenerator
     * @constructor
     */
    constructor(getZ: Function,z_normalizing_table: Array,biotope: Array,virtualObjectGenerator: Function){

        this.getZ = getZ;
        this.z_normalizing_table = z_normalizing_table;
        this.biotope = biotope;
        this.virtualObjectGenerator = virtualObjectGenerator;


    }


    /**
     *
     * @param {T.Position} center_integer
     * @param {number} radius
     * @returns {Array}
     * @private
     */
    getZMapCircle(center_integer: number,radius: number){

        var map=[];

        for(var y=0;y<=radius*2;y++){

            map[y]=[];

            for(var x=0;x<=radius*2;x++){


                if(
                    Math.pow(x-radius+1/2,2)+
                    Math.pow(y-radius+1/2,2)>
                    Math.pow(radius,2)
                )continue;


                var z = this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);


                map[y][x] = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];




            }
        }

        return(map);

    }


    /**
     *
     * @param {Array} map
     * @returns {Array}
     * @private
     */
    terrainMap(map: Array){

        var map_bg=[];

        for(var y=0,l=map.length;y<l;y++){
            map_bg[y]=[];
            for(var x=0;x<l;x++){

                if(typeof(map[y][x])==='undefined')continue;

                map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);

            }
        }

        return(map_bg);

    }


    /**
     *
     * @param {T.Position} center_integer
     * @param {number} radius
     * @returns {Array}
     * @private
     */
    getMapArrayCircle(center_integer: number,radius: number){


        var bounds=1;


        var z_map=this.getZMapCircle(center_integer,radius);

        var map=this.terrainMap(z_map);

        return(map);

    }



    /**
     *
     * @param {Array} map_array
     * @param {T.Position} center_integer
     * @param {number} radius
     * @returns {Array}
     * @private
     */
    convertMapArrayToObjects(map_array: Array,center_integer: number,radius: number){

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
    }


    /**
     *
     * @param {T.Position} center
     * @param {number} radius
     * @param {T.Position} not_center
     * @returns {Array}
     * @private
     */
    getPureMap(center: Position,radius: number, not_center=false){

        //console.log(center,not_center);

        var center_integer={
            x: Math.floor(center.x),
            y: Math.floor(center.y)
        };

        if(not_center)
        not_center={
            x: not_center.x-center_integer.x,
            y: not_center.y-center_integer.y
        };



        /*var map_array = this.getMapArrayCircle(center_integer,radius);
        var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);/**/


        var objects= new T.Objects.Array();

        var x: number,y: number,z: number,t: number,object: Object;
        for(y=0;y<=radius*2;y++){
            for(x=0;x<=radius*2;x++){


                if(
                    Math.pow(x-radius+1/2,2)+
                    Math.pow(y-radius+1/2,2)>
                    Math.pow(radius,2)
                )continue;


                if(not_center)
                if(
                    Math.pow(x-not_center.x-radius+1/2,2)+
                    Math.pow(y-not_center.y-radius+1/2,2)<=
                    Math.pow(radius,2)
                )continue;


                z = this.getZ(x-radius+center_integer.x,y-radius+center_integer.y);
                z = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];

                t = this.biotope.getZTerrain(z);

                //console.log(t);

                object= new T.Objects.Terrain(t);
                object.x=center_integer.x-radius+x;
                object.y=center_integer.y-radius+y;


                objects.push(object);

            }
        }


        return(objects);

    }


    /**
     *
     * @param {T.Objects.Array} objects
     * @returns {T.Objects.Array}
     * @private
     */
    getVirtualObjectsFromTerrainObjects(objects: Array){


        var virtual_objects = [];
        var objects_1x1_raw = objects.get1x1TerrainObjects().getAll();


        for(var i=0,l=objects_1x1_raw.length;i<l;i++){

            this.virtualObjectGenerator(objects_1x1_raw[i],virtual_objects);

        }

        return(virtual_objects);

    }





//=================================================PUBLIC===============================================================


    /**
     * Complete terrain and virtual objects into Objects Array
     * @param {T.Objects.Array} real_objects
     * @param {T.Position} center
     * @param {number} radius
     * @param {boolean} virtual_objects
     * @param {T.Position} not_center Dont get objects near this center.
     * @returns {T.Objects.Array}}
     */
    getCompleteObjects(real_objects:T.Objects.Array,center:T.Position,radius:number,natural_objects=true,not_center=false){



        var complete_objects = this.getPureMap(center, radius, not_center);



        real_objects.forEach(function(object){
            complete_objects.push(object);
        });



        if(natural_objects){

            var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);

            virtual_objects.forEach(function(object){
                complete_objects.push(object);
            });

        }




        return(complete_objects);

    }
    


};
