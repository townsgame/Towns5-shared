
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator
 */
//======================================================================================================================

module T {




    export class MapGenerator{

        /**
         *
         * @param {function} getZ
         * @param {Array} z_normalizing_table
         * @param {T.MapGenerator.Biotope} biotope
         * @param {function} virtualObjectGenerator
         * @constructor
         */
        constructor(public getZ: Function, public z_normalizing_table: Array<number>, public biotope: T.MapGenerator.Biotope, public virtualObjectGenerator:Function) {
        }


        /**
         *
         * @param {T.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        getZMapCircle(center_integer: T.Position, radius: number): Array<Array<number>> {

            var map = [];

            for (var y = 0; y <= radius * 2; y++) {

                map[y] = [];

                for (var x = 0; x <= radius * 2; x++) {


                    if (
                        Math.pow(x - radius + 1 / 2, 2) +
                        Math.pow(y - radius + 1 / 2, 2) >
                        Math.pow(radius, 2)
                    )continue;


                    var z = this.getZ(x - radius + center_integer.x, y - radius + center_integer.y);


                    map[y][x] = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];


                }
            }

            return (map);

        }


        /**
         *
         * @param {Array} map
         * @returns {Array}
         * @private
         */
        terrainMap(map: Array<Array<number>>): Array<Array<T.Objects.Terrain>> {

            var map_bg = [];

            for (var y = 0, l = map.length; y < l; y++) {
                map_bg[y] = [];
                for (var x = 0; x < l; x++) {

                    if (typeof(map[y][x]) === 'undefined')continue;

                    map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);

                }
            }

            return (map_bg);

        }


        /**
         *
         * @param {T.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        getMapArrayCircle(center_integer: T.Position, radius: number): Array<Array<T.Objects.Terrain>> {


            var bounds = 1;


            var z_map = this.getZMapCircle(center_integer, radius);

            var map = this.terrainMap(z_map);

            return (map);

        }


        /**
         *
         * @param {Array} map_array
         * @param {T.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        convertMapArrayToObjects(map_array, center_integer: T.Position, radius: number): T.Objects.Array {

            var objects = new T.Objects.Array();

            for (var y = 0; y < radius * 2; y++) {
                for (var x = 0; x < radius * 2; x++) {

                    if (typeof(map_array[y][x]) === 'undefined')continue;


                    var object = new T.Objects.Terrain(map_array[y][x]);


                    object.x = center_integer.x - radius + x;
                    object.y = center_integer.y - radius + y;


                    objects.push(object);


                }
            }

            return (objects);
        }


        /**
         *
         * @param {T.Position} center
         * @param {number} radius
         * @param {T.Position} not_center
         * @returns {Array}
         * @private
         */
        getPureMap(center: T.Position, radius: number, not_center: T.Position): T.Objects.Array {

            //console.log(center,not_center);

            var center_integer = {
                x: Math.floor(center.x),
                y: Math.floor(center.y)
            };

            if (not_center)
                not_center = new T.Position(
                    not_center.x - center_integer.x,
                    not_center.y - center_integer.y
                );


            /*var map_array = this.getMapArrayCircle(center_integer,radius);
             var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);/**/


            var objects = new T.Objects.Array();

            var x, y, z, t, object;
            for (y = 0; y <= radius * 2; y++) {
                for (x = 0; x <= radius * 2; x++) {


                    if (
                        Math.pow(x - radius + 1 / 2, 2) +
                        Math.pow(y - radius + 1 / 2, 2) >
                        Math.pow(radius, 2)
                    )continue;


                    if (not_center)
                        if (
                            Math.pow(x - not_center.x - radius + 1 / 2, 2) +
                            Math.pow(y - not_center.y - radius + 1 / 2, 2) <=
                            Math.pow(radius, 2)
                        )continue;


                    z = this.getZ(x - radius + center_integer.x, y - radius + center_integer.y);
                    z = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];

                    t = this.biotope.getZTerrain(z);

                    //console.log(t);

                    object = new T.Objects.Terrain(t);
                    object.x = center_integer.x - radius + x;
                    object.y = center_integer.y - radius + y;


                    objects.push(object);

                }
            }


            return (objects);

        }


        /**
         *
         * @param {T.Objects.Array} objects
         * @returns {T.Objects.Array}
         * @private
         */
        getVirtualObjectsFromTerrainObjects(objects: T.Objects.Array): T.Objects.Array {


            var virtual_objects = new T.Objects.Array();
            var objects_1x1_raw: T.Objects.Object[] = objects.get1x1TerrainObjects().getAll();


            for (var i = 0, l = objects_1x1_raw.length; i < l; i++) {

                this.virtualObjectGenerator(objects_1x1_raw[i], virtual_objects);

            }

            return (virtual_objects);

        }


//=================================================PUBLIC===============================================================


        /**
         * Complete terrain and virtual objects into Objects Array
         * @param {T.Objects.Array} real_objects
         * @param {T.Position} center
         * @param {number} radius
         * @param {boolean} natural_objects
         * @param {T.Position} not_center Dont get objects near this center.
         * @returns {T.Objects.Array}}
         */
        getCompleteObjects(real_objects: T.Objects.Array, center: T.Position, radius: number, natural_objects:boolean = true, not_center: T.Position): T.Objects.Array {


            var complete_objects = this.getPureMap(center, radius, not_center);


            real_objects.forEach(function (object) {
                complete_objects.push(object);
            });


            if (natural_objects) {

                var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);

                virtual_objects.forEach(function (object) {
                    complete_objects.push(object);
                });

            }


            return (complete_objects);

        }


    }


}