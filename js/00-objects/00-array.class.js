
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace T (=global.Towns).MapGenerator
var T = global.Towns;
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;
module.exports = Towns;
//-----------------------
//======================================================================================================================



//todo ES6 style:     A.Array = class extends Array{


/**
 *
 * @param {Array} objects
 * @constructor
 */
A.Array = function(objects){

    this.objects = [];

    if(objects instanceof Array)
        objects.forEach(this.push,this);

};


A.Array.prototype.forEach = function(){
    return this.objects.forEach.apply(this.objects,arguments);
};



A.Array.prototype.push = function(object){

    //----------------------------------
    if(object.type=='building'){
        //todo
    }else
    if(object.type=='terrain'){

        object=new T.Objects.Terrain(object);

    }else
    if(object.type=='story'){
        //todo
    }else
    if(object.type=='natural'){
        //todo
    }else
    {
        throw new Error('Cant put item into Towns Objects Array because of unrecognized object type '+object.type);
    }
    //----------------------------------

    return this.objects.push(object);
};


/**
 *
 * @param {string} id
 * @returns {object}
 */
A.Array.prototype.getById = function(id){

    for(var i in this.objects){
        if(this.objects[i].id==id || this.objects[i]._id==id)return this.objects[i];
    }

    return null;
};


/**
 *
 * @param {string} id
 * @param {object} object
 * @returns {boolean}
 */
A.Array.prototype.setById = function(id,object){

    for(var i in this.objects){
        if(this.objects[i].id==id || this.objects[i]._id==id){

            this.objects[i]=object;
            return(true);

        }
    }

    return false;
};


/**
 * @param {string} type
 * @returns {T.Objects.Array}
 */
A.Array.prototype.filterTypes = function(){

    var filtered_objects=new T.Objects.Array();
    var types=Array.prototype.slice.call(arguments);

    this.forEach(function(object){

        if(types.indexOf(object.type)==-1)return;

        filtered_objects.push(object);

    });

    return(filtered_objects);
};


/**
 *
 * @param {T.Position} center
 * @param {number} radius
 * @returns {Array}
 */
A.Array.prototype.getMapOfTerrainCodes = function(center,radius){//todo maybe refactor to getTerrainCodes2DArray or getTerrainCodesMap

    /*var radius = size/2;
    var center ={
        x: topleft.x+radius,
        y: topleft.y+radius
    };*/

    //--------------------------Create empty array
    var map_array=[];
    for (var y = 0; y < radius*2; y++) {
        map_array[y]=[];
        for (var x = 0; x < radius*2; x++) {
            map_array[y][x]=false;
        }
    }

    //--------------------------

    //--------------------------Fill array


    this.objects.forEach(function(object){

        if(object.type!='terrain')return;

        if(object.design.data.size==1) {//todo is this optimalization effective?
            //--------------------------

            var x = Math.floor(object.x - center.x + radius);
            var y = Math.floor(object.y - center.y + radius);

            map_array[y][x] = object.getCode();

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

                        map_array[y][x] = object.getCode();


                    }
                }
            }

            //--------------------------
        }

    });
    //--------------------------

    return map_array;


};






 A.Array.prototype.getTerrainCodeOnPosition = function(position){
    return 5;//todo
 };


 A.Array.prototype.getPositionOfNearestTerrain = function(position,terrain_code){
    return new T.Position(8,8);//todo
 };



/*

 A.Array.prototype.getMapOfCollisionCodes = function(real_objects,position){
 return Terrain;
 };

 */


