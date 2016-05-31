
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Array
 */
//======================================================================================================================
T.setNamespace('Objects');



//todo T.Objects.Array = class extends Array{



T.Objects.Array = class{


    /**
     *
     * @param {Array} objects
     * todo ????????? @constructor
     */
    constructor(objects){

        this.objects = [];

        if(objects instanceof Array)
            objects.forEach(this.push,this);

    }


    getAll(){
        return this.objects;
    }



    forEach(){
        return this.objects.forEach.apply(this.objects,arguments);
    }


    filter(callback){

        var filtered_objects=new T.Objects.Array();

        //r(filtered_objects.objects);

        filtered_objects.objects = this.objects.filter(callback);

        return(filtered_objects);

    }



    static initInstance(object) {

        //----------------------------------
        if (object.type == 'building') {

            object = new T.Objects.Building(object);

        } else if (object.type == 'terrain') {

            object = new T.Objects.Terrain(object);

        } else if (object.type == 'story') {

            object = new T.Objects.Story(object);

        } else if (object.type == 'natural') {

            object = new T.Objects.Natural(object);

        } else {

            console.log(object);
            throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
        }
        //----------------------------------

        return(object);


    }

    /**
     * Push new object into Objects Array
     * @param object
     * @returns {Number}
     */
    push(object){
        return this.objects.push(T.Objects.Array.initInstance(object));
    }


    /**
     * Update or push object into Objects Array
     * @param object
     */
    update(object){
        if(!this.setById(object.id,object)){
            this.push(object);
        }
    }


    /**
     *
     * @param {string} id
     * @returns {object}
     */
    getById(id){

        if(typeof id!=='string')throw new Error('getById: id should be string');

        for(var i in this.objects){
            if(this.objects[i].id==id)return this.objects[i];
        }

        return null;
    }


    /**
     *
     * @param {string} id
     * @param {object} object
     * @returns {boolean}
     */
    setById(id,object){

        if(typeof id!=='string')throw new Error('setById: id should be string');

        for(var i in this.objects){
            if(this.objects[i].id==id){

                this.objects[i]=T.Objects.Array.initInstance(object);
                return(true);

            }
        }

        return false;
    }




    /**
     *
     * @param {string} id
     * @returns {boolean}
     */
    removeId(id,object){

        if(typeof id!=='string')throw new Error('removeId: id should be string');

        for(var i in this.objects){
            if(this.objects[i].id==id){

                this.objects.splice(i,1);
                return(true);

            }
        }

        return false;
    }




    /**
     * @param {string} type
     * @returns {T.Objects.Array}
     */
    filterTypes(){

        var filtered_objects=new T.Objects.Array();
        var types=Array.prototype.slice.call(arguments);

        this.forEach(function(object){

            if(types.indexOf(object.type)==-1)return;

            filtered_objects.getAll().push(object);

        });

        return(filtered_objects);
    }


    /**
     *
     * @param {T.Position} center
     * @param {number} radius
     * @returns {T.Objects.Array}
     */
    filterRadius(center,radius){

        var filtered_objects=new T.Objects.Array();

        this.forEach(function(object){

            if(object.getPosition().getDistance(center)<=radius){

                filtered_objects.getAll().push(object);

            }

        });

        return(filtered_objects);
    }




    /**
     *
     * @param {T.Position} center
     * @param {number} radius
     * @returns {Array}
     */
    getMapOfTerrainCodes(center,radius){//todo maybe refactor to getTerrainCodes2DArray or getTerrainCodesMap

        /*var radius = size/2;
         var center ={
         x: topleft.x+radius,
         y: topleft.y+radius
         };*/
        var x,y;

        //--------------------------Create empty array
        var map_array=[];
        for (y = 0; y < radius*2; y++) {
            map_array[y]=[];
            for (x = 0; x < radius*2; x++) {
                map_array[y][x]=false;
            }
        }

        //--------------------------

        //--------------------------Fill array

        var terrain_objects_raw = this.filterTypes('terrain').getAll();//.slice().reverse();



        var object;
        for(var i=0,l=terrain_objects_raw.length;i<l;i++){
            object=terrain_objects_raw[i];


            if(object.design.data.size==1) {//todo is this optimalization effective?
                //--------------------------

                x = Math.floor(object.x - center.x + radius);
                y = Math.floor(object.y - center.y + radius);

                if(
                    y>=0 &&
                    x>=0 &&
                    y<radius*2 &&
                    x<radius*2
                ){

                    map_array[y][x] = object.getCode();

                }

                //--------------------------
            }else {
                //--------------------------

                var x_from = Math.floor(object.x - center.x + radius - object.design.data.size);
                var x_to = Math.ceil(object.x - center.x + radius + object.design.data.size);

                var y_from = Math.floor(object.y - center.y + radius - object.design.data.size);
                var y_to = Math.ceil(object.y - center.y + radius + object.design.data.size);


                var xc = object.x - center.x + radius;
                var yc = object.y - center.y + radius;


                for (y = y_from; y <= y_to; y++) {

                    if (typeof map_array[y] === 'undefined')continue;

                    for (x = x_from; x <= x_to; x++) {


                        if (typeof map_array[y][x] === 'undefined')continue;


                        if (T.Math.xy2dist(x - xc, y - yc) <= object.design.data.size) {

                            map_array[y][x] = object.getCode();


                        }
                    }
                }

                //--------------------------
            }

        }
        //--------------------------

        return map_array;


    }


    /**
     *
     * @returns {T.Objects.Array}
     */
    get1x1TerrainObjects(){


        var terrain_objects_1x1=new T.Objects.Array();


        var terrain_objects_raw = this.filterTypes('terrain').getAll().slice().reverse();//normal Array

        //--------------------------Fill array

        var blocked_positions={};
        var object_1x1, key;



        var object;
        for(var i=0,l=terrain_objects_raw.length;i<l;i++){
            object=terrain_objects_raw[i];


            if (object.design.data.size == 1) {
                //--------------------------

                object_1x1 = object;

                key = 'x' + Math.round(object_1x1.x) + 'y' + Math.round(object_1x1.y);

                if (typeof blocked_positions[key] === 'undefined') {
                    blocked_positions[key] = true;

                    terrain_objects_1x1.push(object_1x1);

                }

                //--------------------------
            } else {
                //--------------------------

                var x_from = Math.floor(-object.design.data.size);
                var x_to = Math.ceil(object.design.data.size);

                var y_from = Math.floor(-object.design.data.size);
                var y_to = Math.ceil(object.design.data.size);


                for (var y = y_from; y <= y_to; y++) {
                    for (var x = x_from; x <= x_to; x++) {

                        if (T.Math.xy2dist(x, y) <= object.design.data.size) {

                            object_1x1 = object.clone();

                            object_1x1.design.data.size = 1;
                            object_1x1.x = Math.round(object_1x1.x+x);
                            object_1x1.y = Math.round(object_1x1.y+y);

                            key = 'x' + object_1x1.x + 'y' + object_1x1.y;

                            if (typeof blocked_positions[key] == 'undefined') {
                                blocked_positions[key] = true;

                                terrain_objects_1x1.push(object_1x1);

                            }


                        }
                    }
                }

                //--------------------------
            }

        }
        //--------------------------

        return terrain_objects_1x1;


    }




    //todo jsdoc
    getTerrainOnPosition(position){


        for(var i=this.objects.length-1;i>=0;i--){
            if (this.objects[i].type != 'terrain')continue;


            if(this.objects[i].design.data.size<=position.getDistance(new T.Position(this.objects[i].x,this.objects[i].y))){
                return(this.objects[i]);
            }
        }

        return(null);

    }




    //todo jsdoc
    getNearestTerrainPositionWithCode(position,terrain_code){

        var terrain_objects_1x1 = this.get1x1TerrainObjects();

        var min_distance=-1;
        var nearest_terrain_1x1=false;

        terrain_objects_1x1.forEach(function(terrain_1x1){

            var distance = terrain_1x1.getPosition().getDistance(position);

            if(min_distance===-1 || min_distance>distance){
                min_distance=distance;
                nearest_terrain_1x1=terrain_1x1;
            }

        });

        if(nearest_terrain_1x1===false){

            return null;

        }else{

            return nearest_terrain_1x1.getPosition();

        }





    }



    /*

     getMapOfCollisionCodes(real_objects,position){
     return Terrain;
     };

     */

    

};


