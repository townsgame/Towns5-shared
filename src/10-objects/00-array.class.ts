
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Objects.Array
 */
//======================================================================================================================

namespace TOWNS.Objects {

//todo TOWNS.Objects.Array = class extends Array{


    export class Array {


        public objects:TOWNS.Objects.Object[];
        //public objects:Array<string>;


        constructor(objects:TOWNS.Objects.Object[] = []) {

            //r(objects);
            //r(objects.length);

            for(let i in objects){

                objects[i] = TOWNS.Objects.Object.init(objects[i]);
            }


            this.objects = objects;

        }


        getAll():TOWNS.Objects.Object[] {
            return this.objects;
        }


        forEach(callback: Function): void {
            return this.objects.forEach(callback);
        }


        filter(callback: Function):TOWNS.Objects.Array {

            var filtered_objects = new TOWNS.Objects.Array();

            //r(filtered_objects.objects);

            filtered_objects.objects = this.objects.filter(callback);

            return (filtered_objects);

        }



        /**
         * Push new object into Objects Array
         * @param object
         * @returns {Number}
         */
        push(object: Object): void {
            this.objects.push(TOWNS.Objects.Object.init(object));
        }


        /**
         * Update or push object into Objects Array
         * @param object
         */
        update(object: TOWNS.Objects.Object): void {
            if (!this.setById(object.id, object)) {
                this.push(object);
            }
        }


        /**
         *
         * @param {string} id
         * @returns {object}
         */
        getById(id: string): TOWNS.Objects.Object {

            if (typeof id !== 'string')throw new Error('getById: id should be string');

            for (var i in this.objects) {
                if (this.objects[i].id == id)return this.objects[i];
            }

            return null;
        }


        /**
         *
         * @param {string} id
         * @param {object} object
         * @returns {boolean}
         */
        setById(id: string, object: TOWNS.Objects.Object):boolean {

            if (typeof id !== 'string')throw new Error('setById: id should be string');

            for (var i in this.objects) {
                if (this.objects[i].id == id) {

                    this.objects[i] = TOWNS.Objects.Object.init(object);
                    return (true);

                }
            }

            return false;
        }


        /**
         *
         * @param {string} id
         * @returns {boolean}
         */
        removeId(id: string, object: TOWNS.Objects.Object): boolean {

            if (typeof id !== 'string')throw new Error('removeId: id should be string');

            for (var i in this.objects) {
                if (this.objects[i].id == id) {

                    (this.objects as [any]).splice(i, 1);//todo better
                    return (true);

                }
            }

            return false;
        }


        /**
         * @param {string} type
         * @returns {TOWNS.Objects.Array}
         */
        filterTypes(...types: string[]): TOWNS.Objects.Array {


            var filtered_objects = new TOWNS.Objects.Array();

            this.forEach(function (object) {

                if ((types as [any]).indexOf(object.type) == -1)return;//todo better

                filtered_objects.getAll().push(object);

            });

            return (filtered_objects);
        }


        /**
         *
         * @param {TOWNS.Position} center
         * @param {number} radius
         * @returns {TOWNS.Objects.Array}
         */
        filterRadius(center: TOWNS.Position, radius: number): TOWNS.Objects.Array {

            var filtered_objects = new TOWNS.Objects.Array();

            this.forEach(function (object) {

                if (object.getPosition().getDistance(center) <= radius) {

                    filtered_objects.getAll().push(object);

                }

            });

            return (filtered_objects);
        }


        filterArea(area:TOWNS.Area): TOWNS.Objects.Array {

            var filtered_objects = new TOWNS.Objects.Array();

            this.forEach(function (object) {

                if (area.isContaining(object.getPosition())) {

                    filtered_objects.getAll().push(object);

                }

            });

            return (filtered_objects);
        }


        /**
         *
         * @param {TOWNS.Position} center
         * @param {number} radius
         * @returns {Array}
         */
        getMapOfTerrainCodes(center: TOWNS.Position, radius: number): number[][] {//todo maybe refactor to getTerrainCodes2DArray or getTerrainCodesMap

            /*var radius = size/2;
             var center ={
             x: topleft.x+radius,
             y: topleft.y+radius
             };*/
            var x, y;

            //--------------------------Create empty array
            var map_array = [];
            for (y = 0; y < radius * 2; y++) {
                map_array[y] = [];
                for (x = 0; x < radius * 2; x++) {
                    map_array[y][x] = false;
                }
            }

            //--------------------------

            //--------------------------Fill array

            var terrain_objects_raw = this.filterTypes('terrain').getAll();//.slice().reverse();


            var object;
            for (var i = 0, l = (terrain_objects_raw as [any]).length; i < l; i++) {
                object = terrain_objects_raw[i];


                if (object.design.data.size == 1) {//todo is this optimalization effective?
                    //--------------------------

                    x = Math.floor(object.x - center.x + radius);
                    y = Math.floor(object.y - center.y + radius);

                    if (
                        y >= 0 &&
                        x >= 0 &&
                        y < radius * 2 &&
                        x < radius * 2
                    ) {

                        map_array[y][x] = object.getCode();

                    }

                    //--------------------------
                } else {
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


                            if (TOWNS.TMath.xy2dist(x - xc, y - yc) <= object.design.data.size) {

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




        getMapOfCollisions(center: TOWNS.Position, radius:number): boolean[][]{

            //--------------------------Terrains
            var map_of_terrain_codes = this.getMapOfTerrainCodes(center, radius);

            var map_of_collisions = [];

            var x,y;

            for (y = 0; y < radius * 2; y++) {
                map_of_collisions[y] = [];
                for (x = 0; x < radius * 2; x++) {

                    if(([1,5,11] as [any]).indexOf(map_of_terrain_codes[y][x])!==-1){
                        map_of_collisions[y][x] = 1;
                    }else{
                        map_of_collisions[y][x] = 0;
                    }


                }
            }
            //--------------------------


            //--------------------------Objects
            this.forEach(function(object){

                if(object.type == 'building' && object.subtype == 'wall'){}else{return;}

                var x=Math.round(object.x)-Math.round(center.x-(radius));
                var y=Math.round(object.y)-Math.round(center.y-(radius));

                [
                    {x: x,y: y},
                    {x: x+1,y: y},
                    {x: x-1,y: y},
                    {x: x,y: y+1},
                    {x: x,y: y-1}

                ].forEach(function(p_){
                    if(p_.x>=0 && p_.y>=0 && p_.x<radius*2 && p_.y<radius*2){
                        map_of_collisions[p_.y][p_.x]=1;
                    }
                });


            });
            //--------------------------


            return(map_of_collisions);


        }



        /**
         *
         * @returns {TOWNS.Objects.Array}
         */
        get1x1TerrainObjects():TOWNS.Objects.Array {


            var terrain_objects_1x1 = new TOWNS.Objects.Array();


            var terrain_objects_raw = (this.filterTypes('terrain').getAll() as [any]).slice().reverse();//normal Array

            //--------------------------Fill array

            var blocked_positions = {};
            var object_1x1, key;


            var object;
            for (var i = 0, l = terrain_objects_raw.length; i < l; i++) {
                object = terrain_objects_raw[i];


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

                            if (TOWNS.TMath.xy2dist(x, y) <= object.design.data.size) {

                                object_1x1 = object.clone();

                                object_1x1.design.data.size = 1;
                                object_1x1.x = Math.round(object_1x1.x + x);
                                object_1x1.y = Math.round(object_1x1.y + y);

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
        getTerrainOnPosition(position: TOWNS.Position): TOWNS.Objects.Terrain {


            for (var i = (this.objects as [any]).length - 1; i >= 0; i--) {
                //if (this.objects[i].type != 'terrain')continue;
                if (this.objects[i] instanceof TOWNS.Objects.Terrain){

                    if ((this.objects[i] as TOWNS.Objects.Terrain).design.data.size <= position.getDistance(new TOWNS.Position(this.objects[i].x, this.objects[i].y))) {
                        return (this.objects[i] as TOWNS.Objects.Terrain);
                    }

                }



            }

            return (null);

        }


        //todo jsdoc
        getNearestTerrainPositionWithCode(position: TOWNS.Position, terrain_code: number): TOWNS.Position {

            var terrain_objects_1x1 = this.get1x1TerrainObjects();

            var min_distance = -1;
            var nearest_terrain_1x1: TOWNS.Objects.Object;

            terrain_objects_1x1.forEach(function (terrain_1x1) {

                var distance = terrain_1x1.getPosition().getDistance(position);

                if (min_distance === -1 || min_distance > distance) {
                    min_distance = distance;
                    nearest_terrain_1x1 = terrain_1x1;
                }

            });

            if (nearest_terrain_1x1) {

                return null;

            } else {

                return nearest_terrain_1x1.getPosition();

            }


        }


        /*

         getMapOfCollisionCodes(real_objects,position){
         return Terrain;
         };

         */


    }

}

