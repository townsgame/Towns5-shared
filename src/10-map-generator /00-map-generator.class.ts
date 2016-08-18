
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.MapGenerator
 */
//======================================================================================================================

namespace TOWNS {




    export class MapGenerator{

        /**
         *
         * @param {function} getZ
         * @param {Array} z_normalizing_table
         * @param {TOWNS.MapGenerator.Biotope} biotope
         * @param {function} virtualObjectGenerator
         * @constructor
         */
        constructor(public getZ: Function, public z_normalizing_table: Array<number>, public biotope: TOWNS.MapGenerator.Biotope, public virtualObjectGenerator:Function) {
        }


        /**
         *
         * @param {TOWNS.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        getZMapCircle(center_integer: TOWNS.Position, radius: number): Array<Array<number>> {

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
        terrainMap(map: Array<Array<number>>): Array<Array<TOWNS.Objects.Terrain>> {

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
         * @param {TOWNS.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        getMapArrayCircle(center_integer: TOWNS.Position, radius: number): Array<Array<TOWNS.Objects.Terrain>> {


            var bounds = 1;


            var z_map = this.getZMapCircle(center_integer, radius);

            var map = this.terrainMap(z_map);

            return (map);

        }


        /**
         *
         * @param {Array} map_array
         * @param {TOWNS.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        convertMapArrayToObjects(map_array, center_integer: TOWNS.Position, radius: number): TOWNS.Objects.Array {

            var objects = new TOWNS.Objects.Array();

            for (var y = 0; y < radius * 2; y++) {
                for (var x = 0; x < radius * 2; x++) {

                    if (typeof(map_array[y][x]) === 'undefined')continue;


                    var object = new TOWNS.Objects.Terrain(map_array[y][x]);


                    object.x = center_integer.x - radius + x;
                    object.y = center_integer.y - radius + y;


                    objects.push(object);


                }
            }

            return (objects);
        }


        /**
         *
         * @param {TOWNS.Position} center
         * @param {number} radius
         * @param {TOWNS.Position} not_center
         * @returns {Array}
         * @private
         */
        getPureMap(center: TOWNS.Position, radius: number, not_center: TOWNS.Position): TOWNS.Objects.Array {

            //console.log(center,not_center);

            var center_integer = {
                x: Math.floor(center.x),
                y: Math.floor(center.y)
            };

            if (not_center)
                not_center = new TOWNS.Position(
                    not_center.x - center_integer.x,
                    not_center.y - center_integer.y
                );


            /*var map_array = this.getMapArrayCircle(center_integer,radius);
             var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);/**/


            var objects = new TOWNS.Objects.Array();

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

                    object = new TOWNS.Objects.Terrain(t);
                    object.x = center_integer.x - radius + x;
                    object.y = center_integer.y - radius + y;


                    objects.push(object);

                }
            }


            return (objects);

        }


        /**
         *
         * @param {TOWNS.Objects.Array} objects
         * @returns {TOWNS.Objects.Array}
         * @private
         */
        getVirtualObjectsFromTerrainObjects(objects: TOWNS.Objects.Array): TOWNS.Objects.Array {


            var virtual_objects = new TOWNS.Objects.Array();
            var objects_1x1_raw: TOWNS.Objects.Object[] = objects.get1x1TerrainObjects().getAll();


            for (var i = 0, l = objects_1x1_raw.length; i < l; i++) {

                this.virtualObjectGenerator(objects_1x1_raw[i], virtual_objects);

            }

            return (virtual_objects);

        }


//=================================================PUBLIC===============================================================


        /**
         * Complete terrain and virtual objects into Objects Array
         * @param {TOWNS.Objects.Array} real_objects
         * @param {TOWNS.Position} center
         * @param {number} radius
         * @param {boolean} natural_objects
         * @param {TOWNS.Position} not_center Dont get objects near this center.
         * @returns {TOWNS.Objects.Array}}
         */
        getCompleteObjects(real_objects: TOWNS.Objects.Array, center: TOWNS.Position, radius: number, natural_objects:boolean = true, not_center: TOWNS.Position): TOWNS.Objects.Array {


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