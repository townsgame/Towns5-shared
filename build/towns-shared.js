var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author ©Towns.cz
 * @fileOverview Initialize namespace Towns
 */
//======================================================================================================================
/**
 * Towns namespace - under this object are all Towns classes and instances.
 * @type {object}
 */
var T = {};
module.exports = T;
/**
 * Created by hejny on 14.8.16.
 */
var r = console.log.bind(console);
/**
 * @author ©Towns.cz
 * @fileOverview Creates static T.ArrayFunctions
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Additional functions to manipulate with array.
     */
    var ArrayFunctions = (function () {
        function ArrayFunctions() {
        }
        /**
         * @static
         * Searches an item with ID in array
         * @param {object} array Array of objects with ID
         * @param {*} id Searched ID
         * @returns {number} Key of object with this ID, -1 if not exist
         */
        ArrayFunctions.id2i = function (array, id) {
            for (var i in array) {
                if (array[i].id == id)
                    return i;
            }
            return -1;
        };
        //======================================================================================================================
        /**
         * @static
         * Searches an item with ID in array
         * @param {object} array Array of objects with ID
         * @param {*} id Searched ID
         * @param {string} error_message when iten not exists
         * @returns {object} Object with this ID, null if not exist
         */
        ArrayFunctions.id2item = function (array, id, error_message) {
            if (error_message === void 0) { error_message = ''; }
            for (var i in array) {
                if (array[i].id == id)
                    return array[i];
            }
            if (error_message) {
                throw new Error(error_message);
            }
            else {
                return null;
            }
        };
        //======================================================================================================================
        /**
         * @static
         * Delete an item with ID in array
         * @param {object} array Array of objects with ID
         * @param {*} id Searched ID
         * @returns {boolean}
         */
        ArrayFunctions.idRemove = function (array, id) {
            for (var i = 0, l = array.length; i < l; i++) {
                if (array[i].id == id) {
                    array.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        //======================================================================================================================
        /**
         * Iterate through 2D array
         * @static
         * @param array
         * @param {function} callback
         */
        ArrayFunctions.iterate2D = function (array, callback) {
            //r(array);
            for (var y = 0, yLen = array.length; y < yLen; y++) {
                for (var x = 0, xLen = array[y].length; x < xLen; x++) {
                    callback(y, x);
                }
            }
        };
        //======================================================================================================================
        /**
         * @static
         * @param array
         * @param from
         * @param to
         * @return {array} Removed items
         */
        ArrayFunctions.removeItems = function (array, from, to) {
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, rest);
        };
        //======================================================================================================================
        /** todo should it be under T.ArrayFunctions
         *
         * @param {object} obect
         * @param {array} path
         */
        ArrayFunctions.filterPath = function (object, path, setValue) {
            for (var path_i in path) {
                var object_key = path[path_i];
                if (path_i < path.length - 1 || typeof setValue == 'undefined') {
                    if (typeof object[object_key] == 'undefined') {
                        return (undefined);
                    }
                    object = object[object_key];
                }
                else {
                    object[object_key] = setValue;
                    return (true);
                }
            }
            return (object);
        };
        //======================================================================================================================
        /**
         *
         * @param {Array} array
         * @returns {Array} Array containing only unique values
         */
        ArrayFunctions.unique = function (array) {
            var n = {}, r = [];
            for (var i = 0; i < array.length; i++) {
                if (!n[array[i]]) {
                    n[array[i]] = array;
                    r.push(array[i]);
                }
            }
            return r;
        };
        //======================================================================================================================
        /**
         * Creates html table from JS array
         * @param {Array} array array
         * @param {string} additional_class
         * @returns {string} html
         */
        ArrayFunctions.array2table = function (array, additional_class) {
            //todo check
            if (additional_class === void 0) { additional_class = ''; }
            var html = '';
            var rows = array.length;
            var cols_table = array[0].length; //todo is is best solution?
            html += '<table class="' + additional_class + '">';
            for (var row = 0; row < rows; row++) {
                html += '<tr>';
                var cols = array[row].length;
                var cols_span = cols_table - cols;
                for (var col = 0; col < cols; col++) {
                    if (col == cols - 1 && cols_span !== 0) {
                        html += '<td colspan="' + (cols_span + 1) + '">';
                    }
                    else {
                        html += '<td>';
                    }
                    html += array[row][col];
                    html += '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            return (html);
        };
        /**
         * extract keys from Array
         * @param {object} object
         * @returns {Array}
         */
        ArrayFunctions.getKeys = function (object) {
            var keys = [];
            for (var k in object)
                keys.push(k);
            return (keys);
        };
        return ArrayFunctions;
    }());
    T.ArrayFunctions = ArrayFunctions;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Game conditions
     */
    var Game = (function () {
        /**
         *
         * @param {function} max_life_modifier
         * @param {function} price_key_modifier
         * @constructor
         */
        function Game(max_life_modifier, price_key_modifier) {
            this.max_life_modifier = max_life_modifier;
            this.price_key_modifier = price_key_modifier;
            this.action_classes = {};
            this.action_empty_instances = {};
        }
        /**
         *
         * @param {object} Object
         * @return {array} of numbers
         */
        Game.prototype.getObjectPriceBases = function (object) {
            var self = this;
            var price_bases = [];
            if (typeof object.actions.length === 0) {
                console.warn('In object ' + object + ' there are no actions!'); //todo all objects should be converted to string like this
            }
            object.actions.forEach(function (action) {
                var price_base = Math.ceil(action.countPriceBase()); //
                //---------------Checking NaN  value
                if (isNaN(price_base)) {
                    console.warn('Params in action ability ' + action.type + ' makes price bese NaN.');
                    price_base = 0;
                }
                //---------------
                //---------------Checking non negative value
                if (price_base < 0) {
                    throw new Error('Params in action ability ' + action.type + ' should not make this action negative'); //todo maybe only warn
                }
                //---------------
                price_bases.push(price_base);
            });
            return (price_bases);
        };
        /**
         *
         * @param {object} Object
         * @return {number} maximum life of object
         */
        Game.prototype.getObjectMaxLife = function (object) {
            var price_bases = this.getObjectPriceBases(object);
            var price_base = price_bases.reduce(function (pv, cv) {
                return pv + cv;
            }, 0);
            price_base = this.max_life_modifier(price_base);
            return (price_base);
        };
        /**
         *
         * @param {object} Object
         * @return {array} of Resources
         */
        Game.prototype.getObjectPrices = function (object) {
            var price_bases = this.getObjectPriceBases(object);
            var self = this;
            var prices = [];
            var design_resources = object.getModel().aggregateResourcesVolumes();
            object.actions.forEach(function (action, i) {
                var price_resources_list = action.getPriceResources().sort(function (a, b) {
                    return design_resources.compare(a.clone().signum()) - design_resources.compare(b.clone().signum());
                });
                var price_resources = price_resources_list[0].clone();
                price_resources.multiply(price_bases[i]);
                prices.push(price_resources);
            });
            return (prices);
        };
        /**
         *
         * @param {object} Object
         * @return {object} Resources - price of object
         */
        Game.prototype.getObjectPrice = function (object) {
            var price = new T.Resources({});
            //console.log('empty price',price);
            var prices = this.getObjectPrices(object);
            prices.forEach(function (price_) {
                price.add(price_);
            });
            price.apply(this.price_key_modifier);
            return (price);
        };
        Game.prototype.installActionClass = function (action_empty_instance_params, action_class) {
            var type = action_class.getType();
            if (typeof type !== 'string') {
                throw new Error('Error while installing action class into game instance: action class has no type!');
            }
            else if (typeof this.action_classes[type] !== 'undefined') {
                throw new Error('Error while installing action class into game instance: there is already installed action with type ' + type);
            }
            var action_empty_instance = new action_class({
                type: type,
                params: action_empty_instance_params
            });
            //Adding method clone to installed action class
            action_class.prototype.clone = function () {
                return (new action_class(JSON.parse(JSON.stringify(this))));
            };
            this.action_classes[type] = action_class;
            this.action_empty_instances[type] = action_empty_instance;
        };
        Game.prototype.getActionClass = function (action_type) {
            var action_class = this.action_classes[action_type];
            if (typeof action_class == 'undefined') {
                throw new Error('In this game instance thare is no action class type ' + action_type + '. There are only these action types: ' + T.ArrayFunctions.getKeys(this.action_classes).join(', '));
            }
            return (action_class);
        };
        Game.prototype.newActionInstance = function (action) {
            //todo solve defense vs. defence
            if (action.type === 'defense') {
                action.type = 'defence';
                action.params.defence = action.params.defense;
                delete action.params.defense;
            }
            var action_class = this.getActionClass(action.type);
            return new action_class(action);
        };
        Game.prototype.createActionExecute = function (action_type) {
            var game = this;
            var action_class = this.getActionClass(action_type);
            var execute = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                args.unshift(game);
                return action_class.execute.apply(this, args);
            };
            return (execute);
        };
        Game.prototype.getActionEmptyInstance = function (action_type) {
            var action_instance = this.action_empty_instances[action_type];
            if (typeof action_instance === 'undefined') {
                throw new Error('In this game instance thare is no action class type ' + action_type);
            }
            return (action_instance);
        };
        return Game;
    }());
    T.Game = Game;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
var T;
(function (T) {
    var Game;
    (function (Game) {
        var Action = (function () {
            function Action(action) {
                //console.log(this.constructor.getType);
                //console.log(this);
                if (typeof this.constructor.getType === 'undefined')
                    throw new Error('You must extend T.Game.Action and add method getType before creating instances!');
                var type = this.constructor.getType();
                if (action.type !== type)
                    throw new Error('This is ' + type + ' not ' + action.type + ' class!');
                for (var key in action) {
                    var this_key = key;
                    this[this_key] = action[key];
                }
                //---------------Checking params
                /*for(var param in actionAbility.params){
                 var param_type = action.ability_params[param];
    
                 if(typeof actionAbility.params[param]!==param_type){
                 throw new Error('Param '+param+' should be '+param_type+' instead of '+typeof(actionAbility.ability_params[param])+' in action ability '+actionAbility.type);
                 }
    
                 }*/
                //---------------
            }
            Action.prototype.countPriceBase = function () {
                return (0);
            };
            Action.prototype.getPriceResources = function () {
                return ([]);
            };
            Action.execute = function () {
                throw new Error('You can not execute passive action.');
            };
            /**
             * In how many seconds can be this action instance executed?
             * @returns {number}
             */
            Action.prototype.canBeExecutedIn = function () {
                if (typeof this.params.cooldown === 'number') {
                    if (typeof this.last_use === 'undefined') {
                        return (0);
                    }
                    var s = Math.abs(this.last_use - new Date()) / 1000;
                    if (this.params.cooldown <= s) {
                        return (0);
                    }
                    else {
                        return (this.params.cooldown - s);
                    }
                }
                else {
                    return (0);
                }
            };
            /**
             * Can be this action instance executed now?
             * @returns {boolean}
             */
            Action.prototype.canBeExecutedNow = function () {
                return (this.canBeExecutedIn() === 0);
            };
            /**
             * Set actual date as date of execution this action instance
             */
            Action.prototype.nowExecuted = function () {
                this.last_use = new Date();
            };
            /**
             * Creates html profile of action ability
             * @returns {string}
             */
            Action.prototype.createHtmlProfile = function () {
                var html = '<table class="action-ability-profile">';
                html += "\n            <tr>\n                <th colspan=\"2\">" + T.Locale.get('object', 'action', this.type) + "</th>\n            </tr>\n            ";
                if (typeof this.last_use !== 'undefined') {
                    html += "\n            <tr>\n                <td>" + T.Locale.get('object', 'action', 'last_used') + "</td>\n                <td>" + this.last_use + "</td>\n            </tr>\n            ";
                }
                for (var param in this.params) {
                    html += "\n            <tr>\n                <td>" + T.Locale.get('object', 'action', this.type, param) + "</td>\n                <td>" + this.params[param] + "</td>\n            </tr>\n            ";
                }
                html += '</table>';
                return (html);
            };
            return Action;
        }());
        Game.Action = Action;
    })(Game = T.Game || (T.Game = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator
 */
//======================================================================================================================
var T;
(function (T) {
    var MapGenerator = (function () {
        /**
         *
         * @param {function} getZ
         * @param {Array} z_normalizing_table
         * @param {T.MapGenerator.Biotope} biotope
         * @param {function} virtualObjectGenerator
         * @constructor
         */
        function MapGenerator(getZ, z_normalizing_table, biotope, virtualObjectGenerator) {
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
        MapGenerator.prototype.getZMapCircle = function (center_integer, radius) {
            var map = [];
            for (var y = 0; y <= radius * 2; y++) {
                map[y] = [];
                for (var x = 0; x <= radius * 2; x++) {
                    if (Math.pow(x - radius + 1 / 2, 2) +
                        Math.pow(y - radius + 1 / 2, 2) >
                        Math.pow(radius, 2))
                        continue;
                    var z = this.getZ(x - radius + center_integer.x, y - radius + center_integer.y);
                    map[y][x] = this.z_normalizing_table[Math.floor(z * this.z_normalizing_table.length)];
                }
            }
            return (map);
        };
        /**
         *
         * @param {Array} map
         * @returns {Array}
         * @private
         */
        MapGenerator.prototype.terrainMap = function (map) {
            var map_bg = [];
            for (var y = 0, l = map.length; y < l; y++) {
                map_bg[y] = [];
                for (var x = 0; x < l; x++) {
                    if (typeof (map[y][x]) === 'undefined')
                        continue;
                    map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);
                }
            }
            return (map_bg);
        };
        /**
         *
         * @param {T.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        MapGenerator.prototype.getMapArrayCircle = function (center_integer, radius) {
            var bounds = 1;
            var z_map = this.getZMapCircle(center_integer, radius);
            var map = this.terrainMap(z_map);
            return (map);
        };
        /**
         *
         * @param {Array} map_array
         * @param {T.Position} center_integer
         * @param {number} radius
         * @returns {Array}
         * @private
         */
        MapGenerator.prototype.convertMapArrayToObjects = function (map_array, center_integer, radius) {
            var objects = new T.Objects.Array();
            for (var y = 0; y < radius * 2; y++) {
                for (var x = 0; x < radius * 2; x++) {
                    if (typeof (map_array[y][x]) === 'undefined')
                        continue;
                    var object = new T.Objects.Terrain(map_array[y][x]);
                    object.x = center_integer.x - radius + x;
                    object.y = center_integer.y - radius + y;
                    objects.push(object);
                }
            }
            return (objects);
        };
        /**
         *
         * @param {T.Position} center
         * @param {number} radius
         * @param {T.Position} not_center
         * @returns {Array}
         * @private
         */
        MapGenerator.prototype.getPureMap = function (center, radius, not_center) {
            //console.log(center,not_center);
            if (not_center === void 0) { not_center = false; }
            var center_integer = {
                x: Math.floor(center.x),
                y: Math.floor(center.y)
            };
            if (not_center)
                not_center = {
                    x: not_center.x - center_integer.x,
                    y: not_center.y - center_integer.y
                };
            /*var map_array = this.getMapArrayCircle(center_integer,radius);
             var objects = this.convertMapArrayToObjects(map_array,center_integer,radius);/**/
            var objects = new T.Objects.Array();
            var x, y, z, t, object;
            for (y = 0; y <= radius * 2; y++) {
                for (x = 0; x <= radius * 2; x++) {
                    if (Math.pow(x - radius + 1 / 2, 2) +
                        Math.pow(y - radius + 1 / 2, 2) >
                        Math.pow(radius, 2))
                        continue;
                    if (not_center)
                        if (Math.pow(x - not_center.x - radius + 1 / 2, 2) +
                            Math.pow(y - not_center.y - radius + 1 / 2, 2) <=
                            Math.pow(radius, 2))
                            continue;
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
        };
        /**
         *
         * @param {T.Objects.Array} objects
         * @returns {T.Objects.Array}
         * @private
         */
        MapGenerator.prototype.getVirtualObjectsFromTerrainObjects = function (objects) {
            var virtual_objects = [];
            var objects_1x1_raw = objects.get1x1TerrainObjects().getAll();
            for (var i = 0, l = objects_1x1_raw.length; i < l; i++) {
                this.virtualObjectGenerator(objects_1x1_raw[i], virtual_objects);
            }
            return (virtual_objects);
        };
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
        MapGenerator.prototype.getCompleteObjects = function (real_objects, center, radius, natural_objects, not_center) {
            if (natural_objects === void 0) { natural_objects = true; }
            if (not_center === void 0) { not_center = false; }
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
        };
        return MapGenerator;
    }());
    T.MapGenerator = MapGenerator;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator.Biotope
 */
//======================================================================================================================
var T;
(function (T) {
    var MapGenerator;
    (function (MapGenerator) {
        var Biotope = (function () {
            /**
             *
             * @param {Array} terrains
             * @constructor
             */
            function Biotope(terrains) {
                var sum = 0;
                terrains.forEach(function (terrain) {
                    sum += terrain.amount;
                });
                var from = 0;
                terrains.forEach(function (terrain) {
                    terrain.from = from / sum;
                    from += terrain.amount;
                });
                //console.log(terrains);
                this.terrains = terrains;
            }
            /**
             *
             * @param {number} z
             * @returns {T.Objects.Terrain}
             */
            Biotope.prototype.getZTerrain = function (z) {
                for (var i = this.terrains.length - 1; i >= 0; i--) {
                    if (z >= this.terrains[i].from)
                        return (this.terrains[i].terrain);
                }
            };
            return Biotope;
        }());
        MapGenerator.Biotope = Biotope;
    })(MapGenerator = T.MapGenerator || (T.MapGenerator = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Model
 */
//======================================================================================================================
var T;
(function (T) {
    var Model = (function () {
        /**
         * @param {object} Model json
         * @return {boolean} false in case of fail
         * @constructor
         */
        function Model(json) {
            if (typeof (json) == 'undefined')
                return false;
            this.name = json.name;
            this.particles = json.particles;
            this.rotation = json.rotation;
            this.size = json.size;
            if (typeof (this.rotation) == 'undefined')
                this.rotation = 0;
            if (typeof (this.size) == 'undefined')
                this.size = 1;
        }
        Model.prototype.clone = function () {
            return (new T.Model(JSON.parse(JSON.stringify(this))));
        };
        /**
         * @param {number} rotation
         * @param {number} size
         */
        Model.prototype.addRotationSize = function (rotation, size) {
            if (typeof rotation === 'undefined')
                rotation = 0;
            if (typeof size === 'undefined')
                size = 1;
            this.rotation += rotation;
            this.size = this.size * size;
        };
        /**
         * @param {string} dimension x,y,z,xy
         * @return {number} range
         */
        Model.prototype.range = function (dimension) {
            if (dimension == 'xy') {
                return T.TMath.xy2dist(this.range('x'), this.range('y') * this.size);
            }
            var particlesLinear = this.getLinearParticles();
            var max = false, min = false, max_, min_;
            for (var i in particlesLinear) {
                min_ = particlesLinear[i].position[dimension];
                max_ = particlesLinear[i].position[dimension] + particlesLinear[i].size[dimension];
                //todo feature reverse
                if (max === false)
                    max = max_;
                if (min === false)
                    min = min_;
                if (max_ > max)
                    max = max_;
                if (min_ < min)
                    min = min_;
            }
            return (Math.abs(min - max) /*this.size*/); //todo rotation
        };
        /**
         * @param {number} move_x
         * @param {number} move_y
         * @param {number} move_z
         */
        Model.prototype.moveBy = function (move_x, move_y, move_z) {
            if (move_x === void 0) { move_x = 0; }
            if (move_y === void 0) { move_y = 0; }
            if (move_z === void 0) { move_z = 0; }
            for (var i in this.particles) {
                this.particles[i].position.x += move_x;
                this.particles[i].position.y += move_y;
                this.particles[i].position.z += move_z;
            }
        };
        /**
         * Return Z of joining model
         * @param {object} Model
         * @param {number} move_x
         * @param {number} move_y
         */
        Model.prototype.joinModelZ = function (model, move_x, move_y) {
            //var  model_=deepCopyModel(model);
            //model_.moveBy(move_x,move_y);//todo maybe delete moveBy
            //var max_z=this.range('z');
            var this_linear_particles = this.getLinearParticles();
            var model_linear_particles = model.getLinearParticles();
            var distances = [0];
            for (var i in model_linear_particles) {
                model_linear_particles[i].position.x += move_x;
                model_linear_particles[i].position.y += move_y;
                for (var ii in this_linear_particles) {
                    if (Particles.collision2D(this_linear_particles[ii], model_linear_particles[i])) {
                        r(this_linear_particles[ii], model_linear_particles[i]);
                        distances.push(this_linear_particles[ii].position.z + this_linear_particles[ii].size.z);
                    }
                }
            }
            var max_z = Math.max.apply(Math, distances);
            return max_z;
        };
        /**
         * Join models together
         * @param {object} Model
         * @param {number} move_x
         * @param {number} move_y
         */
        Model.prototype.joinModel = function (model, move_x, move_y) {
            var max_z = this.joinModelZ(model, move_x, move_y);
            this.particles = [
                JSON.parse(JSON.stringify(this)),
                JSON.parse(JSON.stringify(model))
            ];
            this.particles[1].position = {
                x: move_x,
                y: move_y,
                z: max_z
            };
            this.rotation = 0;
            this.size = 1;
        };
        /**
         * Deep copy this and converts links to raw data
         * @returns {object} Model
         */
        Model.prototype.getDeepCopyWithoutLinks = function () {
            var model = this.clone();
            //---------------------------------------------Convert links to raw data
            var findParticleByName = function (particles, name) {
                for (var i in particles) {
                    if (particles[i].name == name) {
                        return (particles[i]);
                    }
                    if (typeof (particles[i].particles) != 'undefined') {
                        var finded_particle = findParticleByName(particles[i].particles, name);
                        if (finded_particle !== false) {
                            return (finded_particle);
                        }
                    }
                }
                return (false);
            };
            var particlesLinks = function (particles) {
                //r(particles);
                for (var i in particles) {
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Link
                    if (typeof (particles[i].link) != 'undefined') {
                        var linked_particle = findParticleByName(model.particles, particles[i].link);
                        if (linked_particle === false) {
                            throw new Error('Invalid link ' + particle.link);
                        }
                        linked_particle = JSON.parse(JSON.stringify(linked_particle));
                        if (typeof (particles[i].rotation) != 'undefined') {
                            linked_particle.rotation = particles[i].rotation;
                        }
                        if (typeof (particles[i].size) != 'undefined') {
                            linked_particle.size = particles[i].size;
                        }
                        if (typeof (particles[i].position) != 'undefined') {
                            linked_particle.position = particles[i].position;
                        }
                        //todo skew
                        particles[i] = linked_particle;
                    }
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Group
                    if (typeof (particles[i].particles) != 'undefined') {
                        particlesLinks(particles[i].particles);
                    }
                }
            };
            particlesLinks(model.particles);
            return (model);
        };
        /**
         * Get 1D array of particles
         * @param {boolean} ignore_root_rotation_size
         * @returns {Array} array of particles
         */
        Model.prototype.getLinearParticles = function (ignore_root_rotation_size) {
            if (ignore_root_rotation_size === void 0) { ignore_root_rotation_size = false; }
            var particlesLinear = [];
            //---------------------------------------------Convert particles to 1D particles
            var particles2Linear = function (particles, position, rotation, size) {
                if (typeof position === 'undefined')
                    position = false;
                if (typeof rotation === 'undefined')
                    rotation = 0;
                if (typeof size === 'undefined')
                    size = 1;
                if (position === false) {
                    position = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                }
                particles.forEach(function (particle) {
                    //particle=deepCopy(particle);
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Default params of particle, group or link
                    if (!particle.position) {
                        particle.position = {
                            x: 0,
                            y: 0,
                            z: 0
                        };
                    }
                    if (typeof (particle.rotation) == 'undefined')
                        particle.rotation = 0;
                    if (typeof (particle.size) == 'undefined')
                        particle.size = 1;
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Position, Rotation and size //todo skew
                    var distDeg = T.TMath.xy2distDeg(particle.position.x, particle.position.y);
                    distDeg.dist = distDeg.dist * size;
                    distDeg.deg += rotation;
                    var xy = T.TMath.distDeg2xy(distDeg.dist, distDeg.deg);
                    particle.rotation += rotation;
                    particle.position.x = xy.x;
                    particle.position.y = xy.y;
                    particle.position.z = particle.position.z * size;
                    particle.position.x += position.x;
                    particle.position.y += position.y;
                    particle.position.z += position.z;
                    if (typeof particle.size == 'number') {
                        particle.size = particle.size * size;
                    }
                    else {
                        particle.size.x = particle.size.x * size;
                        particle.size.y = particle.size.y * size;
                        particle.size.z = particle.size.z * size;
                    }
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    //------------------------------------------Particle
                    if (typeof (particle.particles) != 'undefined') {
                        particles2Linear(particle.particles, particle.position, particle.rotation, particle.size);
                    }
                    else 
                    //------------------------------------------Group
                    if (typeof (particle.shape) != 'undefined') {
                        particlesLinear.push(particle);
                    }
                    //------------------------------------------
                });
            };
            var model = this.getDeepCopyWithoutLinks();
            if (ignore_root_rotation_size) {
                particles2Linear(model.particles, false, 0, 1);
            }
            else {
                particles2Linear(model.particles, false, model.rotation, model.size);
            }
            //todo strict mode//delete model;
            return (particlesLinear);
        };
        /**
         *
         * @param path
         * @returns {object} part of this
         */
        Model.prototype.filterPath = function (path) {
            var model = this;
            if (typeof (path.forEach) == 'undefined') {
                r(path);
                throw new Error('Path is not correct array.');
            }
            path.forEach(function (i) {
                model = model.particles[i];
            });
            return (model);
        };
        /**
         *
         * @param path
         * @returns {object} part of this
         */
        Model.prototype.filterPathSiblings = function (path) {
            var model = this.getDeepCopyWithoutLinks();
            var current = model;
            if (typeof (path.forEach) == 'undefined') {
                r(path);
                throw new Error('Path is not correct array.');
            }
            path.forEach(function (particle_i, path_ii) {
                /*if(path_ii<path.length-1){

                 current = current.particles[particle_i];

                 }else{*/
                var me = current.particles[particle_i];
                current.particles = [me];
                current = me;
                //}
            });
            return (model);
        };
        /**
         * Aggregate volume of each resource used in model
         * @returns {T.Resources}
         */
        Model.prototype.aggregateResourcesVolumes = function () {
            var price = new T.Resources({});
            var linear_particles = this.getLinearParticles();
            linear_particles.forEach(function (linear_particle) {
                var volume = linear_particle.size.x *
                    linear_particle.size.y *
                    linear_particle.size.z;
                var material = linear_particle.material.split('_');
                material = material[0];
                var price_ = {};
                price_[material] = volume;
                price.add(price_);
            });
            /*console.log('price of');
             console.log(object.design.data);
             console.log(price);*/
            //price.multiply(0.01);
            return (price);
        };
        Model.prototype.getHash = function () {
            return 'xxx' + JSON.stringify(this.particles).length; //todo better
        };
        return Model;
    }());
    T.Model = Model;
})(T || (T = {}));
/**
 * @author Towns.cz
 * @fileOverview Creates static class T.Model.Particles
 */
//======================================================================================================================
var T;
(function (T) {
    var Model;
    (function (Model) {
        /**
         * Model Particles
         */
        var Particles = (function () {
            function Particles() {
            }
            /**
             * Add missing params into particle
             * @static
             * @param {object} particle
             * @return {object} particle
             */
            Particles.addMissingParams = function (particle) {
                if (typeof particle.skew === 'undefined') {
                    particle.skew = {};
                }
                if (typeof particle.skew.z === 'undefined') {
                    particle.skew.z = { x: 0, y: 0 };
                }
                //-------------
                if (typeof particle.shape.top === 'undefined') {
                    particle.shape.top = 1;
                }
                if (typeof particle.shape.bottom === 'undefined') {
                    particle.shape.bottom = 1;
                }
                if (typeof particle.rotation === 'undefined') {
                    particle.rotation = 0;
                }
                return (particle);
            };
            //======================================================================================================================
            Particles.getTriangles = function (particle, point_class) {
                var triangles = [];
                particle = this.addMissingParams(particle);
                if (particle.shape.type == 'prism') {
                    //-------------------------------------------------------------------prism
                    var x = particle.position.x;
                    var y = particle.position.y;
                    var z = particle.position.z; // * 2;
                    var x_ = particle.size.x;
                    var y_ = particle.size.y;
                    var z_ = particle.size.z;
                    var x__, y__, z__;
                    for (var n = 0; n < particle.shape.n; n++) {
                        for (var level = 0; level < 2; level++) {
                            //---------------------------
                            if (level === 0) {
                                base = particle.shape.bottom;
                            }
                            else {
                                base = particle.shape.top;
                            }
                            //--------
                            //------------------XYZ ratio
                            if (!is(particle.shape.rotated)) {
                                x__ = 0.5 * x_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * base + x_ * (level * particle.skew.z.x);
                                y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * base + y_ * (level * particle.skew.z.y);
                                z__ = z_ * level;
                            }
                            else {
                                var tmp = (2 - (Math.cos(T.TMath.deg2rad(180 / particle.shape.n)))); //todo better
                                x__ = x_ * ((level * 2) - 1); //*(level-0.5);//+x_*(level*particle.skew.z.x),
                                y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)); //+y_*(level*particle.skew.z.y),
                                z__ = (1) * 0.5 * (z_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                                    z_ * ((Math.cos(T.TMath.deg2rad(180 / particle.shape.n)))) * tmp);
                            }
                            //------------------ XY Rotation
                            var DistDeg_ = T.TMath.xy2distDeg(x__, y__); //todo refactor all like DistDeg, etc...
                            DistDeg_.deg += particle.rotation;
                            var xy_ = T.TMath.distDeg2xy(DistDeg_.dist, DistDeg_.deg);
                            x__ = xy_.x;
                            y__ = xy_.y;
                            //------------------
                            triangles.push(new point_class(x__, y__, z__));
                        }
                    }
                }
                else {
                    throw 'Unknown particle shape ' + particle.shape.type;
                }
                return resource;
            };
            //======================================================================================================================
            /**
             * Get 3D model from particle
             * @static
             * @deprecated
             * @param particle
             * @return {object} 3D model
             */
            Particles.get3D = function (particle) {
                var resource = {};
                particle = this.addMissingParams(particle);
                if (particle.shape.type == 'prism') {
                    //-------------------------------------------------------------------prism
                    var x = particle.position.x;
                    var y = particle.position.y;
                    var z = particle.position.z; // * 2;
                    var x_ = particle.size.x;
                    var y_ = particle.size.y;
                    var z_ = particle.size.z;
                    //r(x_,y_);
                    //r(particle.shape.n);
                    /**/
                    resource.points = [];
                    resource.polygons = [[], []];
                    resource.polygons2D = [[], []];
                    var base;
                    for (var level = 0; level < 2; level++) {
                        //---------------------------
                        if (level === 0) {
                            base = particle.shape.bottom;
                        }
                        else {
                            base = particle.shape.top;
                        }
                        //--------
                        var x__, y__, z__;
                        for (var n = 0; n < particle.shape.n; n++) {
                            //------------------XYZ ratio
                            if (!is(particle.shape.rotated)) {
                                x__ = 0.5 * x_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * base + x_ * (level * particle.skew.z.x);
                                y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * base + y_ * (level * particle.skew.z.y);
                                z__ = z_ * level;
                            }
                            else {
                                var tmp = (2 - (Math.cos(T.TMath.deg2rad(180 / particle.shape.n)))); //todo better
                                x__ = x_ * ((level * 2) - 1); //*(level-0.5);//+x_*(level*particle.skew.z.x),
                                y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)); //+y_*(level*particle.skew.z.y),
                                z__ = (1) * 0.5 * (z_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.TMath.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                                    z_ * ((Math.cos(T.TMath.deg2rad(180 / particle.shape.n)))) * tmp);
                            }
                            //------------------ XY Rotation
                            var DistDeg_ = T.TMath.xy2distDeg(x__, y__); //todo refactor all like DistDeg, etc...
                            DistDeg_.deg += particle.rotation;
                            var xy_ = T.TMath.distDeg2xy(DistDeg_.dist, DistDeg_.deg);
                            x__ = xy_.x;
                            y__ = xy_.y;
                            //------------------
                            resource.points.push([x + x__, y + y__, z + z__]);
                            if (level === 0) {
                                //r(n,1,particle.shape.n,(n+1+particle.shape.n));
                                resource.polygons[0].push(n + 1);
                                resource.polygons[1].push(n + 1 + particle.shape.n);
                                resource.polygons2D[0].push(n + 1);
                                resource.polygons2D[1].push(n + 1 + particle.shape.n);
                                resource.polygons.push([
                                    (n !== 0 ? n : particle.shape.n),
                                    n + 1,
                                    n + 1 + particle.shape.n,
                                    (n !== 0 ? n : particle.shape.n) + particle.shape.n
                                ]);
                            }
                        }
                    }
                }
                else {
                    throw 'Unknown particle shape ' + particle.shape.type;
                }
                return resource;
            };
            /**
             * Get 2D lines from particle
             * @static
             * @param {object} particle
             * @param {number} base 0=bottom, 1=top
             * @return {Array} 2D lines
             */
            Particles.get2Dlines = function (particle, base) {
                var resource = this.get3D(particle);
                var lines = [];
                var polygons2D = [resource.polygons2D[base]];
                for (var pn in polygons2D) {
                    /*lines[pn]=[];
    
                     for(var pt in resource.polygons[pn]) {
    
                     var point = resource.points[resource.polygons[pn][pt] - 1];
                     lines[pn][ps] = [point[0], point[1]];
    
                     }*/
                    var point1, point2;
                    for (var i = -1, l = polygons2D[pn].length; i < l - 1; i++) {
                        if (i != -1) {
                            point1 = i;
                        }
                        else {
                            point1 = l - 1;
                        }
                        point2 = i + 1;
                        //r(resource.polygons[pn],point1);
                        point1 = resource.points[polygons2D[pn][point1] - 1];
                        point2 = resource.points[polygons2D[pn][point2] - 1];
                        lines.push([
                            {
                                x: point1[0],
                                y: point1[1]
                            }, {
                                x: point2[0],
                                y: point2[1]
                            }
                        ]);
                    }
                }
                //r(lines);
                return (lines);
            };
            //======================================================================================================================
            //todo maybe refactor move to Math
            /**
             * Detect collision between 2 2D lines
             * @static
             * @param {array} lines1
             * @param (array) lines2
             * @return {boolean}
             */
            Particles.collisionLinesDetect = function (lines1, lines2) {
                for (var i1 in lines1) {
                    for (var i2 in lines2) {
                        if (T.TMath.lineCollision(lines1[i1][0].x, lines1[i1][0].y, lines1[i1][1].x, lines1[i1][1].y, lines2[i2][0].x, lines2[i2][0].y, lines2[i2][1].x, lines2[i2][1].y)) {
                            //r('collision2D is true', particle1, particle2);
                            return (true);
                        }
                    }
                }
                return false;
            };
            //----------------------------------------------------------------------------------------------------------------------
            /**
             * Detect collision between 2 particles
             * @static
             * @param {object} particle1 bottom
             * @param (object) particle2 top
             * @return {boolean}
             */
            Particles.collision2D = function (particle1, particle2) {
                var lines1 = Particles.get2Dlines(particle1, 1);
                var lines2 = Particles.get2Dlines(particle2, 0);
                //-------------------------------Corner collision
                var collision = Particles.collisionLinesDetect(lines1, lines2);
                //-------------------------------Inner convex collision
                /**/
                if (!collision) {
                    collision = function () {
                        var k = 100;
                        var outer, inner;
                        for (i = 0; i < 2; i++) {
                            if (i === 0) {
                                outer = JSON.parse(JSON.stringify(lines2));
                                inner = (lines1[0]);
                            }
                            else {
                                outer = JSON.parse(JSON.stringify(lines1));
                                inner = (lines2[0]);
                            }
                            var inner1 = JSON.parse(JSON.stringify(inner));
                            var inner2 = JSON.parse(JSON.stringify(inner));
                            var inner_vector_x = inner[1].x - inner[0].x;
                            var inner_vector_y = inner[1].y - inner[0].y;
                            inner1[0].x -= inner_vector_x * k;
                            inner1[0].y -= inner_vector_y * k;
                            inner2[1].x += inner_vector_x * k;
                            inner2[1].y += inner_vector_y * k;
                            inner1 = [inner1];
                            inner2 = [inner2];
                            var collision1 = Particles.collisionLinesDetect(inner1, outer);
                            var collision2 = Particles.collisionLinesDetect(inner2, outer);
                            if (collision1 && collision2) {
                                return (true);
                            }
                        }
                        return (false);
                    }();
                }
                /**/
                //-------------------------------
                //-------------------------------Debug TDD
                /**var size=100;
                 var src=createCanvasViaFunctionAndConvertToSrc(
                 size*2,size*2,function(ctx){
    
                    //ctx.strokeStyle = '#000000';
                    //ctx.strokeWidth = 2;
    
                    ctx.beginPath();
    
                    var lines_=[lines1,lines2];
                    for(var key in lines_){
    
                        ctx.beginPath();
                        for(var i= 0,l=lines_[key].length;i<l;i++){
    
                           ctx.moveTo(lines_[key][i][0].x+size,lines_[key][i][0].y+size);
                           ctx.lineTo(lines_[key][i][1].x+size,lines_[key][i][1].y+size);
    
                        }
                        ctx.stroke();
                        ctx.closePath();
    
                    }
    
                }
    
    
                 );
                 $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');/**/
                //-------------------------------
                return (collision);
            };
            return Particles;
        }());
        Model.Particles = Particles;
    })(Model = T.Model || (T.Model = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Array
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        //todo T.Objects.Array = class extends Array{
        var Array = (function () {
            /**
             *
             * @param {Array} objects
             * todo ????????? @constructor
             */
            function Array(objects) {
                if (objects === void 0) { objects = []; }
                this.objects = objects.map(function (object) {
                    return T.Objects.Object.init(object);
                });
            }
            Array.prototype.getAll = function () {
                return this.objects;
            };
            Array.prototype.forEach = function (callback) {
                return this.objects.forEach(callback);
            };
            Array.prototype.filter = function (callback) {
                var filtered_objects = new T.Objects.Array();
                //r(filtered_objects.objects);
                filtered_objects.objects = this.objects.filter(callback);
                return (filtered_objects);
            };
            /**
             * Push new object into Objects Array
             * @param object
             * @returns {Number}
             */
            Array.prototype.push = function (object) {
                return this.objects.push(T.Objects.Object.init(object));
            };
            /**
             * Update or push object into Objects Array
             * @param object
             */
            Array.prototype.update = function (object) {
                if (!this.setById(object.id, object)) {
                    this.push(object);
                }
            };
            /**
             *
             * @param {string} id
             * @returns {object}
             */
            Array.prototype.getById = function (id) {
                if (typeof id !== 'string')
                    throw new Error('getById: id should be string');
                for (var i in this.objects) {
                    if (this.objects[i].id == id)
                        return this.objects[i];
                }
                return null;
            };
            /**
             *
             * @param {string} id
             * @param {object} object
             * @returns {boolean}
             */
            Array.prototype.setById = function (id, object) {
                if (typeof id !== 'string')
                    throw new Error('setById: id should be string');
                for (var i in this.objects) {
                    if (this.objects[i].id == id) {
                        this.objects[i] = T.Objects.Object.init(object);
                        return (true);
                    }
                }
                return false;
            };
            /**
             *
             * @param {string} id
             * @returns {boolean}
             */
            Array.prototype.removeId = function (id, object) {
                if (typeof id !== 'string')
                    throw new Error('removeId: id should be string');
                for (var i in this.objects) {
                    if (this.objects[i].id == id) {
                        this.objects.splice(i, 1);
                        return (true);
                    }
                }
                return false;
            };
            /**
             * @param {string} type
             * @returns {T.Objects.Array}
             */
            Array.prototype.filterTypes = function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i - 0] = arguments[_i];
                }
                var filtered_objects = new T.Objects.Array();
                this.forEach(function (object) {
                    if (types.indexOf(object.type) == -1)
                        return;
                    filtered_objects.getAll().push(object);
                });
                return (filtered_objects);
            };
            /**
             *
             * @param {T.Position} center
             * @param {number} radius
             * @returns {T.Objects.Array}
             */
            Array.prototype.filterRadius = function (center, radius) {
                var filtered_objects = new T.Objects.Array();
                this.forEach(function (object) {
                    if (object.getPosition().getDistance(center) <= radius) {
                        filtered_objects.getAll().push(object);
                    }
                });
                return (filtered_objects);
            };
            Array.prototype.filterArea = function (area) {
                var filtered_objects = new T.Objects.Array();
                this.forEach(function (object) {
                    if (area.isContaining(object.getPosition())) {
                        filtered_objects.getAll().push(object);
                    }
                });
                return (filtered_objects);
            };
            /**
             *
             * @param {T.Position} center
             * @param {number} radius
             * @returns {Array}
             */
            Array.prototype.getMapOfTerrainCodes = function (center, radius) {
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
                var terrain_objects_raw = this.filterTypes('terrain').getAll(); //.slice().reverse();
                var object;
                for (var i = 0, l = terrain_objects_raw.length; i < l; i++) {
                    object = terrain_objects_raw[i];
                    if (object.design.data.size == 1) {
                        //--------------------------
                        x = Math.floor(object.x - center.x + radius);
                        y = Math.floor(object.y - center.y + radius);
                        if (y >= 0 &&
                            x >= 0 &&
                            y < radius * 2 &&
                            x < radius * 2) {
                            map_array[y][x] = object.getCode();
                        }
                    }
                    else {
                        //--------------------------
                        var x_from = Math.floor(object.x - center.x + radius - object.design.data.size);
                        var x_to = Math.ceil(object.x - center.x + radius + object.design.data.size);
                        var y_from = Math.floor(object.y - center.y + radius - object.design.data.size);
                        var y_to = Math.ceil(object.y - center.y + radius + object.design.data.size);
                        var xc = object.x - center.x + radius;
                        var yc = object.y - center.y + radius;
                        for (y = y_from; y <= y_to; y++) {
                            if (typeof map_array[y] === 'undefined')
                                continue;
                            for (x = x_from; x <= x_to; x++) {
                                if (typeof map_array[y][x] === 'undefined')
                                    continue;
                                if (T.TMath.xy2dist(x - xc, y - yc) <= object.design.data.size) {
                                    map_array[y][x] = object.getCode();
                                }
                            }
                        }
                    }
                }
                //--------------------------
                return map_array;
            };
            Array.prototype.getMapOfCollisions = function (center, radius) {
                //--------------------------Terrains
                var map_of_terrain_codes = this.getMapOfTerrainCodes(center, radius);
                var map_of_collisions = [];
                var x, y;
                for (y = 0; y < radius * 2; y++) {
                    map_of_collisions[y] = [];
                    for (x = 0; x < radius * 2; x++) {
                        if ([1, 5, 11].indexOf(map_of_terrain_codes[y][x]) !== -1) {
                            map_of_collisions[y][x] = 1;
                        }
                        else {
                            map_of_collisions[y][x] = 0;
                        }
                    }
                }
                //--------------------------
                //--------------------------Objects
                this.forEach(function (object) {
                    if (object.type == 'building' && object.subtype == 'wall') { }
                    else {
                        return;
                    }
                    var x = Math.round(object.x) - Math.round(center.x - (radius));
                    var y = Math.round(object.y) - Math.round(center.y - (radius));
                    [
                        { x: x, y: y },
                        { x: x + 1, y: y },
                        { x: x - 1, y: y },
                        { x: x, y: y + 1 },
                        { x: x, y: y - 1 }
                    ].forEach(function (p_) {
                        if (p_.x >= 0 && p_.y >= 0 && p_.x < radius * 2 && p_.y < radius * 2) {
                            map_of_collisions[p_.y][p_.x] = 1;
                        }
                    });
                });
                //--------------------------
                return (map_of_collisions);
            };
            /**
             *
             * @returns {T.Objects.Array}
             */
            Array.prototype.get1x1TerrainObjects = function () {
                var terrain_objects_1x1 = new T.Objects.Array();
                var terrain_objects_raw = this.filterTypes('terrain').getAll().slice().reverse(); //normal Array
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
                    }
                    else {
                        //--------------------------
                        var x_from = Math.floor(-object.design.data.size);
                        var x_to = Math.ceil(object.design.data.size);
                        var y_from = Math.floor(-object.design.data.size);
                        var y_to = Math.ceil(object.design.data.size);
                        for (var y = y_from; y <= y_to; y++) {
                            for (var x = x_from; x <= x_to; x++) {
                                if (T.TMath.xy2dist(x, y) <= object.design.data.size) {
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
                    }
                }
                //--------------------------
                return terrain_objects_1x1;
            };
            //todo jsdoc
            Array.prototype.getTerrainOnPosition = function (position) {
                for (var i = this.objects.length - 1; i >= 0; i--) {
                    if (this.objects[i].type != 'terrain')
                        continue;
                    if (this.objects[i].design.data.size <= position.getDistance(new T.Position(this.objects[i].x, this.objects[i].y))) {
                        return (this.objects[i]);
                    }
                }
                return (null);
            };
            //todo jsdoc
            Array.prototype.getNearestTerrainPositionWithCode = function (position, terrain_code) {
                var terrain_objects_1x1 = this.get1x1TerrainObjects();
                var min_distance = -1;
                var nearest_terrain_1x1 = false;
                terrain_objects_1x1.forEach(function (terrain_1x1) {
                    var distance = terrain_1x1.getPosition().getDistance(position);
                    if (min_distance === -1 || min_distance > distance) {
                        min_distance = distance;
                        nearest_terrain_1x1 = terrain_1x1;
                    }
                });
                if (nearest_terrain_1x1 === false) {
                    return null;
                }
                else {
                    return nearest_terrain_1x1.getPosition();
                }
            };
            return Array;
        }());
        Objects.Array = Array;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Object
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        var Object = (function () {
            /**
             * @param {object} object
             */
            function Object(object) {
                for (var key in object) {
                    var this_key = key;
                    if (this_key == '_id')
                        this_key = 'id'; //todo maybe better solution
                    this[this_key] = object[key];
                }
            }
            Object.init = function (object) {
                if (object instanceof T.Objects.Object) {
                    return (object);
                }
                //----------------------------------
                if (object.type == 'building') {
                    object = new T.Objects.Building(object);
                }
                else if (object.type == 'terrain') {
                    object = new T.Objects.Terrain(object);
                }
                else if (object.type == 'story') {
                    object = new T.Objects.Story(object);
                }
                else if (object.type == 'natural') {
                    object = new T.Objects.Natural(object);
                }
                else {
                    console.log(object);
                    throw new Error('Cant put item into Towns Objects Array because of unrecognized object type ' + object.type);
                }
                //----------------------------------
                return (object);
            };
            Object.prototype.getPosition = function () {
                return (new T.Position(this.x, this.y));
            };
            /**
             * @returns {boolean}
             */
            Object.prototype.isMoving = function () {
                return (false);
            };
            /**
             *
             * @returns {string}
             */
            Object.prototype.toString = function () {
                return ('[' + this.name + ']');
            };
            return Object;
        }());
        Objects.Object = Object;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        var Building = (function (_super) {
            __extends(Building, _super);
            /**
             * @param {object} object
             */
            function Building(object) {
                _super.call(this, object);
                //-----------------------------
                if (typeof this.actions === 'undefined') {
                    this.actions = [];
                }
                else {
                    var actions_classes = [];
                    for (var i = 0, l = this.actions.length; i < l; i++) {
                        try {
                            actions_classes.push(T.World.game.newActionInstance(this.actions[i]));
                        }
                        catch (error) {
                            console.warn(error);
                        }
                    }
                    this.actions = actions_classes;
                }
                //-----------------------------
                //-----------------------------
                if (typeof this.path === 'object') {
                    r(this.path);
                    this.path = new T.Path(...this.path);
                }
                //-----------------------------
                //-----------------------------
                var life_action = this.getAction('life');
                var max_life = T.World.game.getObjectMaxLife(this);
                if (life_action === null) {
                    life_action = T.World.game.newActionInstance({
                        type: 'life',
                        params: {
                            life: max_life,
                            max_life: max_life
                        }
                    });
                    this.actions.push(life_action);
                }
                else {
                    life_action.params.max_life = max_life;
                }
                //-----------------------------
            }
            /**
             *
             * @param {Date} date
             * @returns {T.Position}
             */
            Building.prototype.getPosition = function (date) {
                if (typeof this.path === 'undefined') {
                    return (new T.Position(this.x, this.y));
                }
                else {
                    return this.path.countPosition(date);
                }
            };
            /**
             *
             * @param {Date} date
             * @returns {boolean}
             */
            Building.prototype.isMoving = function (date) {
                if (typeof this.path === 'undefined') {
                    return (false);
                }
                else {
                    return this.path.inProgress(date);
                }
            };
            /**
             * @returns {T.Objects}
             */
            Building.prototype.clone = function () {
                return (new T.Objects.Building(JSON.parse(JSON.stringify(this))));
            };
            /**
             * @returns {T.Model}
             */
            Building.prototype.getModel = function () {
                if (!(this.design.data instanceof T.Model)) {
                    this.design.data = new T.Model(this.design.data);
                }
                return (this.design.data);
            };
            /**
             *
             * @param action_type
             * @returns {T.Game.ActionAbility}
             */
            Building.prototype.getAction = function (action_type) {
                for (var i = 0, l = this.actions.length; i < l; i++) {
                    if (this.actions[i].type == action_type) {
                        return (this.actions[i]);
                    }
                }
                return null;
            };
            Building.prototype.createHtmlProfile = function () {
                var actions_profile = '';
                for (var i = 0, l = this.actions.length; i < l; i++) {
                    actions_profile += this.actions[i].createHtmlProfile();
                }
                return ("\n\n            <div class=\"object-building-profile\">\n\n                <h2>" + this.name + "</h2>\n                " + this.getPosition() + "\n\n\n                " + actions_profile + "\n\n\n\n            </div>\n\n        ");
            };
            return Building;
        }(T.Objects.Object));
        Objects.Building = Building;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Natural
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        var Natural = (function (_super) {
            __extends(Natural, _super);
            function Natural() {
                _super.apply(this, arguments);
            }
            Natural.prototype.clone = function () {
                return (new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
            };
            Natural.prototype.getCode = function () {
                return (this.design.data.image);
            };
            return Natural;
        }(T.Objects.Object));
        Objects.Natural = Natural;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        var Story = (function (_super) {
            __extends(Story, _super);
            function Story() {
                _super.apply(this, arguments);
            }
            Story.prototype.clone = function () {
                return (new T.Objects.Story(JSON.parse(JSON.stringify(this))));
            };
            Story.prototype.getMarkdown = function () {
                return (this.content.data);
            };
            return Story;
        }(T.Objects.Object));
        Objects.Story = Story;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================
var T;
(function (T) {
    var Objects;
    (function (Objects) {
        var Terrain = (function (_super) {
            __extends(Terrain, _super);
            function Terrain() {
                _super.apply(this, arguments);
            }
            Terrain.prototype.clone = function () {
                return (new T.Objects.Terrain(JSON.parse(JSON.stringify(this))));
            };
            Terrain.prototype.getCode = function (prefered_width) {
                return (this.design.data.image);
            };
            Terrain.prototype.getColor = function () {
                return (this.design.data.color);
            };
            return Terrain;
        }(T.Objects.Object));
        Objects.Terrain = Terrain;
    })(Objects = T.Objects || (T.Objects = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Color
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Object which represents RGBA color.
     */
    var Color = (function () {
        /**
         *
         * @param r red from 0 to 255
         * @param g green from 0 to 255
         * @param b blue from 0 to 255
         * @param a alpha from 0 to 255
         */
        function Color(r, g, b, a) {
            if (a === void 0) { a = 255; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        /**
         * Get deep clone od T.Color
         * @returns {T.Color}
         */
        Color.prototype.clone = function () {
            return new Color(this.r, this.g, this.b, this.a);
        };
        /**
         * Repairs overflowed colors
         * @private
         */
        Color.prototype.bounds = function () {
            this.r = Math.round(this.r);
            this.g = Math.round(this.g);
            this.b = Math.round(this.b);
            this.a = Math.round(this.a);
            if (this.r > 255) {
                this.r = 255;
            }
            if (this.r < 0) {
                this.r = 0;
            }
            if (this.g > 255) {
                this.g = 255;
            }
            if (this.g < 0) {
                this.g = 0;
            }
            if (this.b > 255) {
                this.b = 255;
            }
            if (this.b < 0) {
                this.b = 0;
            }
            if (this.a > 255) {
                this.a = 255;
            }
            if (this.a < 0) {
                this.a = 0;
            }
        };
        /**
         * Get css representation of this color
         * @returns {string} eg. rgb(100,200,200)
         */
        Color.prototype.getCssColor = function () {
            this.bounds();
            if (this.a == 255) {
                return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
            }
            else {
                //r('rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a/255*100)/100 + ')');
                return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a / 255 * 100) / 100 + ')';
            }
        };
        /**
         * Get hex representation of this color (ignores alpha chanel.)
         * @returns {string} eg. #00ff00
         */
        Color.prototype.getHex = function () {
            this.bounds();
            return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
        };
        /**
         * Creates new T.Color form hex code of color
         * @param {string} hex code of color eg. #00ff00
         * @returns {T.Color} Color
         */
        Color.createFromHex = function (hex) {
            var result, shorthandRegex, resultRegex;
            shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            resultRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (resultRegex) {
                return new Color(parseInt(resultRegex[1], 16), parseInt(resultRegex[2], 16), parseInt(resultRegex[3], 16));
            }
            else {
                throw new Error('Error while creating T.Color from ' + hex);
            }
        };
        return Color;
    }());
    T.Color = Color;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Path
 */
//======================================================================================================================
var T;
(function (T) {
    var Path = (function () {
        /**
         * @param {...T.PositionDate} Position with date at least 2
         */
        function Path() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            //todo maybe//if(args.length===1 && args instanceof Array){
            //todo maybe//    this.array_position_date = args[0];
            //todo maybe//}else{
            this.array_position_date = args;
            //todo maybe//}
            if (this.array_position_date.length < 2) {
                throw new Error('Thare must be at least 2 params when constructing T.Path.');
            }
            var position_date, last_date = -1;
            for (var i = 0, l = this.array_position_date.length; i < l; i++) {
                position_date = this.array_position_date[i];
                if (position_date instanceof T.PositionDate) {
                }
                else {
                    if (position_date instanceof Object) {
                        this.array_position_date[i] = new T.PositionDate(this.array_position_date[i]);
                    }
                    else {
                        throw new Error('All Params when constructing T.Path must be T.PositionDate');
                    }
                }
                if (last_date >= position_date.date) {
                    throw new Error('Dates should be consecutive when constructing T.Path (' + position_date.date + ' should be after ' + last_date + '). ' + this);
                }
                last_date = position_date.date / 1;
            }
        }
        Path.prototype.toJSON = function () {
            return (this.array_position_date);
        };
        /**
         *
         * @param {Array.<T.Position>} array_position
         * @param {number} speed
         * @param {Date} date
         * @returns {T.Path}
         */
        Path.newConstantSpeed = function (array_position, speed, date) {
            if (date === void 0) { date = 0; }
            if (date === 0) {
                date = new Date();
            }
            else if (typeof date === 'number') {
                date = new Date(date / 1);
            }
            if (isNaN(speed / 1)) {
                throw new Error('Speed must be valid number.');
            }
            if (speed <= 0) {
                throw new Error('Speed must be positive.');
            }
            if (array_position.length < 2) {
                throw new Error('Thare must be at least 2 params when constructing T.Path.');
            }
            var array_position_date = [
                new T.PositionDate(array_position[0].x, array_position[0].y, date)
            ];
            var last_position = array_position[0];
            var position_date, distance;
            for (var i = 1, l = array_position.length; i < l; i++) {
                position_date = array_position[i];
                if (position_date instanceof T.Position) {
                }
                else {
                    throw new Error('All Params when constructing T.Path via newConstantSpeed must be T.Position');
                }
                distance = last_position.getDistance(position_date);
                date = new Date(date / 1 + distance / speed * 1000);
                last_position = position_date;
                array_position_date.push(new T.PositionDate(array_position[i].x, array_position[i].y, date));
            }
            //return new this.apply(this,array_position_date);
            //return Object.create(T.Path,array_position_date);
            return new T.Path(...array_position_date);
        };
        Path.prototype.getPositions = function () {
            var positions = [];
            for (var i = 0, l = this.array_position_date.length; i < l; i++) {
                positions.push(this.array_position_date[i].getPosition());
            }
            return (positions);
        };
        /**
         * Count in which segment is T.Path progress
         * @param date
         * @returns {number}
         */
        Path.prototype.countSegment = function (date) {
            //------------------------Not started or finished
            if (this.array_position_date[0].date > date) {
                return (0);
            }
            else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
                return (this.array_position_date.length - 2);
            }
            //------------------------In progress
            var A, B, x, y;
            for (var i = 0, l = this.array_position_date.length - 1; i < l; i++) {
                A = this.array_position_date[i].date / 1;
                B = this.array_position_date[i + 1].date / 1;
                //console.log(i+'('+(A-date)+' - '+(B-date)+')');
                //console.log('('+(A-date)+' - '+(B-date)+')');
                if (A <= date && B > date) {
                    //console.log('<---this');
                    return (i);
                }
            }
            throw new Error('Error while counting segment in T.Path, maybe because of param date is ' + date);
        };
        /**
         * Counts position at 'date'
         * @param {Date} date
         * @returns {T.Position}
         */
        Path.prototype.countPosition = function (date) {
            if (date === void 0) { date = 0; }
            if (date === 0) {
                date = new Date();
            }
            else if (typeof date === 'number') {
                date = new Date(date / 1);
            }
            //------------------------Not started or finished
            if (this.array_position_date[0].date > date) {
                return (this.array_position_date[0].getPosition());
            }
            else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
                return (this.array_position_date[this.array_position_date.length - 1].getPosition());
            }
            //------------------------In progress
            var segment = this.countSegment(date);
            var A = this.array_position_date[segment];
            var B = this.array_position_date[segment + 1];
            //console.log((A-date)+' - '+(B-date));
            var x = T.TMath.proportions(A.date / 1, date / 1, B.date / 1, A.x, B.x);
            var y = T.TMath.proportions(A.date / 1, date / 1, B.date / 1, A.y, B.y);
            return (new T.Position(x, y));
        };
        /**
         * Counts rotation at 'date'
         * @param date
         * @returns {number} degrees
         */
        Path.prototype.countRotation = function (date) {
            if (date === void 0) { date = 0; }
            if (date === 0) {
                date = new Date();
            }
            else if (typeof date === 'number') {
                date = new Date(date / 1);
            }
            var segment = this.countSegment(date);
            var A = this.array_position_date[segment];
            var B = this.array_position_date[segment + 1];
            var BA = B.getPosition().plus(A.getPosition().multiply(-1));
            var polar = BA.getPositionPolar();
            //console.log(BA,polar);
            return (polar.getDegrees());
        };
        /**
         * Counts Speed at 'date'
         * @param date
         * @returns {number} fields/s
         */
        Path.prototype.countSpeed = function (date) {
            if (this.inProgress(date) === false) {
                return (0);
            }
            var segment = this.countSegment(date);
            var A = this.array_position_date[segment];
            var B = this.array_position_date[segment + 1];
            var distance = A.getDistance(B);
            var duration = B.date - A.date;
            return (distance / (duration / 1000));
        };
        /**
         * Is path in progress (true) or it has not started(false) or it is finished(false)?
         * @param {Date} date
         * @returns {boolean}
         */
        Path.prototype.inProgress = function (date) {
            if (this.array_position_date[0].date > date) {
                return (false);
            }
            else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
                return (false);
            }
            else {
                return (true);
            }
        };
        //todo maybe countProgress
        /**
         * Converts T.Path to string
         * @returns {string}
         */
        Path.prototype.toString = function () {
            return this.array_position_date.join(', ');
        };
        return Path;
    }());
    T.Path = Path;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================
var T;
(function (T) {
    var Position3D = (function () {
        function Position3D(x_or_object, y, z) {
            var x;
            if (typeof x_or_object === 'object') {
                this.x = x_or_object.x;
                this.y = x_or_object.y;
                this.z = x_or_object.z;
            }
            else if (typeof x_or_object === 'number') {
                this.x = x_or_object;
                this.y = y;
                this.z = z;
            }
        }
        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        Position3D.prototype.clone = function () {
            return new T.Position3D(this);
        };
        /**
         * Converts Position3D to simple string
         * @return {string}
         */
        Position3D.prototype.toString = function () {
            return '[' + this.x + ',' + this.y + ',' + this.z + ']';
        };
        return Position3D;
    }());
    T.Position3D = Position3D;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================
var T;
(function (T) {
    var PositionPolar = (function () {
        function PositionPolar(distance, degrees) {
            this.distance = distance;
            this.degrees = degrees;
        }
        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        PositionPolar.prototype.clone = function () {
            return new T.PositionPolar(this.distance, this.degrees);
        };
        PositionPolar.prototype.getPosition = function () {
            var radians = this.getRadians();
            return (new T.Position(Math.cos(radians) * this.distance, Math.sin(radians) * this.distance));
        };
        PositionPolar.prototype.getDistance = function () {
            return this.distance;
        };
        PositionPolar.prototype.getDegrees = function () {
            return (this.degrees + 360) % 360;
        };
        PositionPolar.prototype.getRadians = function () {
            return T.TMath.deg2rad(this.degrees);
        };
        /**
         * Converts Position to simple string
         * @return {string}
         */
        PositionPolar.prototype.toString = function () {
            return '' + this.distance + ',' + this.degrees + '°';
        };
        return PositionPolar;
    }());
    T.PositionPolar = PositionPolar;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Global position on towns map
     */
    var Position = (function () {
        function Position(x_or_object_or_string, y) {
            var x;
            if (typeof x_or_object_or_string === 'object') {
                this.x = x_or_object_or_string.x;
                this.y = x_or_object_or_string.y;
                return;
            }
            else if (typeof x_or_object_or_string === 'string') {
                if (/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x_or_object_or_string)) {
                    var x_y = void 0;
                    x_y = x_or_object_or_string.split(',');
                    this.x = parseFloat(x_y[0]);
                    this.y = parseFloat(x_y[1]);
                    return;
                }
                else {
                    throw new Error('When creating Position, string must be in format x,y not ' + x_or_object_or_string);
                }
            }
            else if (typeof x_or_object_or_string === 'number') {
                this.x = x_or_object_or_string;
                this.y = y;
                return;
            }
            //todo check
            throw new Error('Wrong constructor params while creating T.Position!');
        }
        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        Position.prototype.clone = function () {
            return new T.Position(this);
        };
        Position.prototype.plus = function (position) {
            this.x += position.x;
            this.y += position.y;
            return this;
        };
        Position.prototype.minus = function (position) {
            this.x -= position.x;
            this.y -= position.y;
            return this;
        };
        Position.prototype.multiply = function (k) {
            this.x = this.x * k;
            this.y = this.y * k;
            return this;
        };
        Position.prototype.getFloored = function () {
            return new T.Position(Math.floor(this.x), Math.floor(this.y));
        };
        Position.prototype.getPositionPolar = function () {
            return (new T.PositionPolar(T.TMath.xy2dist(this.x, this.y), T.TMath.rad2deg(Math.atan2(this.y, this.x))));
        };
        Position.prototype.getDistance = function (position) {
            return T.TMath.xy2dist(position.x - this.x, position.y - this.y);
        };
        /**
         * Converts Position to simple string
         * @return {string}
         */
        Position.prototype.toString = function () {
            return '' + this.x + ',' + this.y + '';
        };
        return Position;
    }());
    T.Position = Position;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Global position on towns map with time
     */
    var PositionDate = (function (_super) {
        __extends(PositionDate, _super);
        function PositionDate(x_or_object, y, date) {
            if (date === void 0) { date = 0; }
            var x;
            if (typeof x_or_object === 'object') {
                //var positionDateObject:PositionDateObject;
                //positionDateObject = x;
                x = x_or_object.x;
                y = x_or_object.y;
                date = x_or_object.date;
            }
            else if (typeof x_or_object === 'number') {
                x = x_or_object;
            }
            _super.call(this, x, y);
            var dateObject;
            if (date === 0) {
                dateObject = new Date();
            }
            else if (typeof date === 'number') {
                dateObject = new Date(date / 1);
            }
            else if (typeof date === 'string') {
                dateObject = new Date(date.toString());
            }
            else {
                dateObject = date;
            }
            if (isNaN(dateObject / 1)) {
                throw new Error('To construct PositionDate is needed valid Date not ' + date + '.');
            }
            this.date = dateObject;
        }
        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        PositionDate.prototype.clone = function () {
            return new T.PositionDate(this);
        };
        /**
         * Return only position
         * @returns {T.Position}
         */
        PositionDate.prototype.getPosition = function () {
            return new T.Position(this.x, this.y);
        };
        /**
         * Converts Position to simple string
         * @return {string}
         */
        PositionDate.prototype.toString = function () {
            return '[' + this.x + ',' + this.y + '] at ' +
                (this.date.getDay() + 1) + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear() +
                ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        };
        return PositionDate;
    }(T.Position));
    T.PositionDate = PositionDate;
})(T || (T = {}));
var T;
(function (T) {
    var Area = (function () {
        function Area() {
            var positions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                positions[_i - 0] = arguments[_i];
            }
            this.positions = [];
            for (var i = 0; i < positions.length; i++) {
                this.positions.push(positions[i]);
            }
            if (this.positions.length < 3) {
                throw new Error('There should be at least 3 points.');
            }
            var c = positions[0].getDistance(positions[1]);
            var a = positions[1].getDistance(positions[2]);
            var b = positions[0].getDistance(positions[2]);
            //r(a,b,c);
            if (a + b > c && b + c > a && a + c > b) { }
            else {
                throw new Error('First three points are in line.');
            }
        }
        Area.prototype.isContaining = function (position) {
            //todo working only for convex areas
            var testside, ia, ib, sidecollision, collision;
            for (testside = 0; testside < 2; testside++) {
                sidecollision = false;
                for (var i = 0; i < this.positions.length; i++) {
                    ia = i;
                    ib = i + 1;
                    if (ib == this.positions.length)
                        ib = 0;
                    collision = T.TMath.lineCollision(this.positions[ia].x, this.positions[ia].y, this.positions[ib].x, this.positions[ib].y, position.x, position.y, position.x, position.y + (testside - 0.5) * 1000000000 //todo better
                    );
                    if (collision == true) {
                        sidecollision = true;
                        break;
                    }
                }
                if (!sidecollision)
                    return false;
            }
            return true;
        };
        return Area;
    }());
    T.Area = Area;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class Resources
 */
//======================================================================================================================
var T;
(function (T) {
    var Resources = (function () {
        /**
         * @param {object} Resources
         * @constructor
         */
        function Resources(resources) {
            for (var key in resources) {
                if (typeof resources[key] == 'number') {
                    this[key] = Math.ceil(resources[key]);
                }
            }
        }
        /**
         * Return deep clone of this.
         * @returns {Resources}
         */
        Resources.prototype.clone = function () {
            return new Resources(this);
        };
        /**
         * Checks whether this contains a given resources
         * @param {object} Resources
         * @return {bool} contains
         */
        Resources.prototype.contains = function (resources) {
            for (var key in resources) {
                if (typeof this[key] == 'number') {
                    return false;
                }
                if (this[key] < resources[key]) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Add given resources
         * @param {object} Resources
         * @return {bool} success
         */
        Resources.prototype.add = function (resources) {
            for (var key in resources) {
                if (typeof this[key] == 'undefined') {
                    this[key] = 0;
                }
                if (typeof this[key] == 'number') {
                    this[key] += resources[key];
                }
            }
            return this;
        };
        /**
         * @param {number} k
         * @return this
         */
        Resources.prototype.multiply = function (k) {
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    this[key] = Math.ceil(this[key] * k);
                }
            }
            return this;
        };
        /**
         * @param {number} k
         * @return this
         */
        Resources.prototype.signum = function (k) {
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    if (this[key] > 0) {
                        this[key] = 1;
                    }
                    else {
                        this[key] = 0;
                    }
                }
            }
            return this;
        };
        /**
         * @param {function} modifier
         * @return this
         */
        Resources.prototype.apply = function (modifier) {
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    this[key] = modifier(this[key]);
                }
            }
            return this;
        };
        /**
         *
         * @return {Array} all resources keys
         */
        Resources.prototype.extractKeys = function () {
            var keys = [];
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    keys.push(key);
                }
            }
            return (keys);
        };
        /**
         *
         * @param {object} Resoures
         * @return {number} Distance between this and given Resources
         */
        Resources.prototype.compare = function (resoures) {
            var resources_A = this;
            var resources_B = resoures;
            var keys = [];
            keys = keys.concat(resources_A.extractKeys());
            keys = keys.concat(resources_B.extractKeys());
            keys = keys.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            var distance = 0;
            for (var i in keys) {
                var key = keys[i];
                var val_A = resources_A[key];
                var val_B = resources_B[key];
                if (typeof val_A == 'undefined')
                    val_A = 0;
                if (typeof val_B == 'undefined')
                    val_B = 0;
                distance += Math.pow(val_A - val_B, 2);
            }
            distance = Math.sqrt(distance);
            return (distance);
        };
        /**
         * Remove given resources
         * @param {object} Resources
         * @return {bool} success
         */
        Resources.prototype.remove = function (resources) {
            if (!this.contains(resources))
                return false;
            for (var key in resources) {
                this[key] -= resources[key];
            }
            return true;
        };
        /**
         * Converts Resources to simple string
         * @return {string}
         */
        Resources.prototype.toString = function () {
            var strings = [];
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    if (this[key] !== 0) {
                        strings.push(this[key] + ' ' + key);
                    }
                }
            }
            return strings.join(', ');
        };
        Resources.prototype.toHTML = function () {
            var strings = [];
            for (var key in this) {
                if (typeof this[key] == 'number') {
                    if (this[key] !== 0) {
                        var name = T.Locale.get('resource', key);
                        var value = this[key];
                        value = value.toLocaleString(); //todo todo better solution
                        strings.push('<div><img src="/media/image/resources/' + key + '.png" title="' + name + '" alt="' + name + '" >' + value + '</div>');
                    }
                }
            }
            var strings_joined = strings.join(' ');
            strings_joined = '<div class="resources">' + strings_joined + '</div>';
            return strings_joined;
        };
        return Resources;
    }());
    T.Resources = Resources;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates static class T.TMath
 */
//======================================================================================================================
var T;
(function (T) {
    /**
     * Mathematical functions to Towns
     */
    var TMath = (function () {
        function TMath() {
        }
        /**
         *
         * @static
         * @param {number}
         * @return {number}
         */
        TMath.sign = function (x) {
            x = +x; // convert to a number
            if (x === 0 || isNaN(x)) {
                return x;
            }
            return x > 0 ? 1 : -1;
        };
        //-------------------------
        /**
         *
         * @static
         * @param base
         * @param number
         * @returns {number}
         */
        TMath.baseLog = function (base, number) {
            return Math.log(number) / Math.log(base);
        };
        //-------------------------
        /**
         *
         * @static
         * @param {number} number
         * @param {number} number_of_non_zero_digits
         * @return {number} Cuts unless digits to zero
         */
        TMath.prettyNumber = function (number, number_of_non_zero_digits) {
            number_of_non_zero_digits = number_of_non_zero_digits || 2; //todo refactor like this
            var digits = Math.ceil(TMath.baseLog(10, number));
            var k = Math.pow(10, number_of_non_zero_digits - digits);
            //console.log(digits,k);
            number = number * k;
            //console.log(number);
            number = Math.round(number);
            //console.log(number);
            number = number / k;
            //console.log(number);
            return number;
        };
        //-------------------------
        /**
         * Difference between two angeles
         * @static
         * @param {number} deg1
         * @param {number} deg2
         * @return {number} <0;180> degrees difference
         */
        TMath.angleDiff = function (deg1, deg2) {
            var deg = Math.abs(deg1 - deg2) % 360;
            if (deg > 180)
                deg = 360 - deg;
            return (deg);
        };
        //-------------------------
        /**
         * @static
         * @param {number} radians
         * @return {number} degrees
         */
        TMath.rad2deg = function (radians) {
            return (radians * (180 / Math.PI)) % 360;
        };
        //-------------------------
        /**
         * @static
         * @param {number} degrees
         * @return {number} radians
         */
        TMath.deg2rad = function (degrees) {
            return (degrees % 360 * (Math.PI / 180));
        };
        //-------------------------
        /**
         * @static
         * @param x
         * @param y
         * @return {number} distance
         */
        TMath.xy2dist = function (x, y) {
            return (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        };
        //-------------------------
        TMath.xy2distDeg = function (x, y) {
            var output = {
                dist: T.TMath.xy2dist(x, y),
                deg: T.TMath.rad2deg(Math.atan2(y, x))
            };
            return (output);
        };
        //-------------------------
        TMath.distDeg2xy = function (dist, deg) {
            var rad = T.TMath.deg2rad(deg);
            var output = {
                x: Math.cos(rad) * dist,
                y: Math.sin(rad) * dist
            };
            return (output);
        };
        //-------------------------
        //todo mybe refactor to position
        TMath.xyRotate = function (x, y, deg) {
            var dist = T.TMath.xy2dist(x, y);
            var rad = Math.atan2(y, x);
            rad += T.TMath.deg2rad(deg);
            var output = {
                x: Math.cos(rad) * dist,
                y: Math.sin(rad) * dist
            };
            return (output);
        };
        //======================================================================================================================
        TMath.randomSeedPosition = function (seed, position) {
            return (Math.sin(Math.pow((position.x * position.y) - seed, 2)) + 1) / 2;
        };
        //======================================================================================================================
        /**
         * Converts multitype to float
         * @static
         * @param value
         * @param {number} defval
         * @return {number}
         */
        TMath.toFloat = function (value, defval) {
            if (defval === void 0) { defval = 0; }
            //if (typeof defval === 'undefined')defval = 0;
            if (typeof value === 'undefined')
                return (defval);
            value = parseFloat(value);
            if (isNaN(value)) {
                return (defval);
            }
            else {
                return (value);
            }
        };
        //----------------------------------------------------------
        /**
         * Converts multitype to integer
         * @static
         * @param value
         * @param {number} defval
         * @return {number}
         */
        TMath.toInt = function (value, defval) {
            if (defval === void 0) { defval = 0; }
            if (typeof (value) === 'undefined')
                return (defval);
            value = parseInt(value);
            if (isNaN(value)) {
                return (defval);
            }
            else {
                return (value);
            }
        };
        //----------------------------------------------------------
        /**
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        TMath.bounds = function (value, min, max) {
            if (value < min)
                return min;
            if (value > max)
                return max;
            return value;
        };
        /**
         * Is point[b1x,b1y] colliding line?
         * @param {number} a1x
         * @param {number} a1y
         * @param {number} a2x
         * @param {number} a2y
         * @param {number} b1x
         * @param {number} b1y
         * @returns {boolean}
         */
        TMath.isOnLine = function (a1x, a1y, a2x, a2y, b1x, b1y) {
            a2x -= a1x;
            a2y -= a1y;
            b1x -= a1x;
            b1y -= a1y;
            var aSlope = a2y / a2x;
            var bSlope = b1y / b1x;
            if (aSlope != bSlope)
                return false;
            var aDist = T.TMath.xy2dist(a2y, a2x);
            var bDist = T.TMath.xy2dist(b1y, b1x);
            return (aDist >= bDist);
        };
        /**
         * Is line A colliding line B?
         * @static
         * @param {number} a1x
         * @param {number} a1y
         * @param {number} a2x
         * @param {number} a2y
         * @param {number} b1x
         * @param {number} b1y
         * @param {number} b2x
         * @param {number} b2y
         * @return {boolean}
         */
        TMath.lineCollision = function (a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
            var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
            var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
            var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
            var collision;
            //console.log(denominator,numerator1,numerator2);
            // Detect coincident lines (has a problem, read below)
            if (denominator === 0) {
                //var collision= (numerator1 == 0 && numerator2 == 0);
                //collision=false;
                var bOnA = T.TMath.isOnLine(a1x, a1y, a2x, a2y, b1x, b1y);
                var aOnB = T.TMath.isOnLine(b1x, b1y, b2x, b2y, a1x, a1y);
                return (bOnA || aOnB);
            }
            else {
                var r = numerator1 / denominator;
                var s = numerator2 / denominator;
                collision = ((r >= 0 && r <= 1) && (s >= 0 && s <= 1));
            }
            //-------------------------------Debug TDD do not delete
            /*var size=50;
             var src=createCanvasViaFunctionAndConvertToSrc(
             size*2,size*2,function(ctx){

             //ctx.strokeStyle = '#000000';
             //ctx.strokeWidth = 2;

             ctx.beginPath();
             ctx.moveTo(a1x+size,a1y+size);
             ctx.lineTo(a2x+size,a2y+size);
             ctx.stroke();
             ctx.closePath();


             ctx.beginPath();
             ctx.moveTo(b1x+size,b1y+size);
             ctx.lineTo(b2x+size,b2y+size);
             ctx.stroke();
             ctx.closePath();

             }


             );
             $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');*/
            //-------------------------------
            return collision;
        };
        TMath.blurXY = function (generator, blur) {
            return (function (x, y) {
                var sum = 0;
                var count = 0;
                var xx, yy;
                for (xx = x - blur; xx <= x + blur; xx++) {
                    for (yy = y - blur; yy <= y + blur; yy++) {
                        if (Math.pow(blur, 2) < Math.pow(xx - x, 2) + Math.pow(yy - y, 2))
                            continue;
                        sum += generator(xx, yy);
                        count++;
                    }
                }
                return (sum / count);
            });
        };
        TMath.bytesToSize = function (bytes) {
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0)
                return '0B';
            var i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
        };
        /**
         *
         * @param {number} a_start
         * @param {number} a_position
         * @param {number} a_end
         * @param {number} b_start
         * @param {number} b_end
         * @returns {number}
         */
        TMath.proportions = function (a_start, a_position, a_end, b_start, b_end) {
            var a_whole = a_end - a_start;
            var b_whole = b_end - b_start;
            var a_part = a_end - a_position;
            var b_part = (b_whole * a_part) / a_whole;
            return (b_end - b_part);
        };
        return TMath;
    }());
    T.TMath = TMath;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================
var T;
(function (T) {
    var User = (function () {
        /**
         * @param {object} user raw user data
         */
        function User(user) {
            for (var key in user) {
                var this_key = key;
                this[this_key] = user[key];
            }
        }
        /**
         *
         * @returns {string} HTML code of users signature
         */
        User.prototype.getSignatureHTML = function () {
            var name;
            if (this.profile.name || this.profile.surname) {
                name = this.profile.name + ' ' + this.profile.surname;
            }
            else {
                name = this.profile.username;
            }
            var email_md5 = md5(this.profile.email);
            var signature_html = "\n\n                <div class=\"user-signature\">\n                    <img class=\"user-image\" src=\"https://1.gravatar.com/avatar/" + email_md5 + "?s=80&r=pg&d=mm\">\n\n                    <div class=\"user-signature-text\">\n                        <h1 class=\"user-name\">" + name + "</h1>\n                        <p>" + this.profile.signature.html2text() + "</p>\n                    </div>\n\n                </div>\n\n            ";
            return (signature_html);
        };
        return User;
    }());
    T.User = User;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates instance T.World.terrains
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.terrains = [
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 0, color: '#000000', size: 1 } }, name: 'temnota' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 1, color: '#337EFA', size: 1 } }, name: 'moře' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 2, color: '#545454', size: 1 } }, name: 'dlažba' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 3, color: '#EFF7FB', size: 1 } }, name: 'sníh/led' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 4, color: '#F9F98D', size: 1 } }, name: 'písek' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 5, color: '#878787', size: 1 } }, name: 'kamení' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 6, color: '#5A2F00', size: 1 } }, name: 'hlína' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 7, color: '#EFF7FB', size: 1 } }, name: 'sníh/led' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 8, color: '#2A7302', size: 1 } }, name: 'tráva(normal)' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 9, color: '#51F311', size: 1 } }, name: 'tráva(toxic)' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 10, color: '#535805', size: 1 } }, name: 'les' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 11, color: '#6aa2ff', size: 1 } }, name: 'řeka' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 12, color: '#8ABC02', size: 1 } }, name: 'tráva(jaro)' }),
            new T.Objects.Terrain({ type: 'terrain', design: { type: 'terrain', data: { image: 13, color: '#8A9002', size: 1 } }, name: 'tráva(pozim)' })
        ];
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates instance T.World.mapGenerator
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.mapGenerator = new T.MapGenerator(T.TMath.blurXY(function (x, y) {
            //todo//var key='x'+x+'y'+y;
            //todo//if(typeof z_map_cache[key]!='undefined'){
            //todo//    return(z_map_cache[key]);
            //todo//}
            var div = 100;
            var n = 0;
            var max_possible_n = 0;
            var _x, _y;
            var k = 0.4;
            var k_ = 1 - k;
            for (var i = 0; i < 11; i++) {
                n += Math.round(Math.pow(x * y - 66, 2)) % (div + 1);
                max_possible_n += div;
                //x=Math.floor(x/3);
                //y=Math.floor(y/3);
                //var xy = T.TMath.xyRotate(x,y,57);
                //x=xy.x;
                //y=xy.y;
                _x = (-y * k) + (x * k_);
                _y = (x * k) + (y * k_);
                x = Math.floor(_x / 4);
                y = Math.floor(_y / 4);
            }
            n = n / max_possible_n;
            if (n < 0)
                n -= Math.floor(n);
            if (n > 1)
                n -= Math.floor(n);
            //todo//z_map_cache[key]=n;
            return (n);
        }, 2), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0001, 0.0001, 0.0001, 0.0001, 0.0001, 0.0001, 0.0002, 0.0003, 0.0003, 0.0005, 0.0006, 0.0007, 0.0009, 0.001, 0.001, 0.001, 0.0012, 0.0014, 0.0015, 0.0016, 0.0021, 0.0025, 0.003, 0.0033, 0.0034, 0.0037, 0.0038, 0.0042, 0.0046, 0.0049, 0.0057, 0.0065, 0.0068, 0.0072, 0.0074, 0.0079, 0.0084, 0.009, 0.0096, 0.0105, 0.0115, 0.0123, 0.0131, 0.0142, 0.0148, 0.0159, 0.0166, 0.0184, 0.019, 0.0204, 0.021, 0.022, 0.0232, 0.0245, 0.026, 0.0266, 0.0277, 0.029, 0.0297, 0.031, 0.0318, 0.0331, 0.0346, 0.0361, 0.0378, 0.0389, 0.0404, 0.0414, 0.0431, 0.0456, 0.0475, 0.0501, 0.0517, 0.0533, 0.0548, 0.0566, 0.0589, 0.0609, 0.0622, 0.0635, 0.0658, 0.0678, 0.0692, 0.0712, 0.0733, 0.0751, 0.0774, 0.079, 0.0813, 0.0837, 0.0859, 0.088, 0.0902, 0.0927, 0.0961, 0.0988, 0.1003, 0.1031, 0.105, 0.1071, 0.11, 0.1113, 0.1137, 0.1165, 0.1187, 0.1218, 0.1243, 0.1277, 0.1297, 0.1323, 0.1353, 0.1371, 0.1395, 0.1426, 0.1449, 0.1474, 0.1509, 0.1536, 0.156, 0.1582, 0.1605, 0.1633, 0.1662, 0.1692, 0.1726, 0.1755, 0.1781, 0.1813, 0.1842, 0.1869, 0.1899, 0.1939, 0.1975, 0.2001, 0.2029, 0.207, 0.2108, 0.2135, 0.2158, 0.2187, 0.221, 0.2238, 0.226, 0.2283, 0.2326, 0.2362, 0.2394, 0.2427, 0.2455, 0.2485, 0.2508, 0.2532, 0.2568, 0.2594, 0.2628, 0.2651, 0.2678, 0.2712, 0.2738, 0.276, 0.2792, 0.2819, 0.2852, 0.2885, 0.2908, 0.2943, 0.2969, 0.2994, 0.3019, 0.3049, 0.3077, 0.3108, 0.3135, 0.3162, 0.3194, 0.3216, 0.3243, 0.3276, 0.3307, 0.3334, 0.336, 0.3386, 0.3421, 0.3443, 0.3462, 0.3484, 0.351, 0.3535, 0.3569, 0.3593, 0.3618, 0.3642, 0.3659, 0.3681, 0.3706, 0.3722, 0.3742, 0.3772, 0.3794, 0.3816, 0.3837, 0.3865, 0.3879, 0.3907, 0.3925, 0.3947, 0.3967, 0.3985, 0.3998, 0.4021, 0.4035, 0.4054, 0.4067, 0.4088, 0.4107, 0.4133, 0.4141, 0.4161, 0.4177, 0.4193, 0.4209, 0.4219, 0.4234, 0.4245, 0.4264, 0.4283, 0.4302, 0.4318, 0.4327, 0.4346, 0.4363, 0.4381, 0.44, 0.4409, 0.4435, 0.445, 0.4462, 0.4484, 0.4492, 0.4506, 0.4518, 0.4533, 0.4548, 0.4554, 0.456, 0.4573, 0.4588, 0.4605, 0.4616, 0.463, 0.4638, 0.4656, 0.4663, 0.4672, 0.4684, 0.4696, 0.4708, 0.4721, 0.473, 0.4737, 0.4747, 0.4756, 0.4765, 0.4781, 0.4791, 0.4802, 0.4809, 0.4819, 0.4824, 0.483, 0.4838, 0.4847, 0.4859, 0.4865, 0.487, 0.4875, 0.4883, 0.4894, 0.4901, 0.4907, 0.4915, 0.4929, 0.4934, 0.494, 0.4949, 0.4955, 0.496, 0.4967, 0.4971, 0.4975, 0.4981, 0.499, 0.4997, 0.5005, 0.5008, 0.5018, 0.5024, 0.5032, 0.5038, 0.5042, 0.5046, 0.505, 0.5059, 0.5067, 0.507, 0.5074, 0.5077, 0.5084, 0.5086, 0.5095, 0.5104, 0.5109, 0.5117, 0.5122, 0.5129, 0.5136, 0.514, 0.5141, 0.5145, 0.515, 0.5153, 0.5157, 0.5162, 0.5169, 0.5172, 0.5176, 0.518, 0.5186, 0.5193, 0.5197, 0.5202, 0.5207, 0.5209, 0.5214, 0.5218, 0.5223, 0.5231, 0.5237, 0.5244, 0.5246, 0.5249, 0.5259, 0.5261, 0.5269, 0.5272, 0.5275, 0.5281, 0.5283, 0.5285, 0.5291, 0.5302, 0.531, 0.5317, 0.532, 0.5326, 0.5334, 0.5336, 0.5341, 0.5343, 0.5345, 0.5349, 0.5353, 0.5357, 0.5364, 0.5377, 0.5382, 0.5388, 0.5393, 0.5399, 0.5403, 0.5412, 0.5419, 0.543, 0.5437, 0.5446, 0.5457, 0.5466, 0.5476, 0.5482, 0.5486, 0.5491, 0.5495, 0.5503, 0.5506, 0.5515, 0.5522, 0.5527, 0.554, 0.555, 0.5553, 0.5557, 0.5562, 0.5569, 0.5578, 0.5586, 0.5595, 0.5608, 0.5616, 0.5626, 0.5634, 0.5645, 0.5652, 0.5667, 0.5673, 0.5683, 0.5697, 0.5707, 0.5723, 0.5739, 0.575, 0.5758, 0.5771, 0.5779, 0.5791, 0.5803, 0.5817, 0.5833, 0.5849, 0.5865, 0.5876, 0.5884, 0.5899, 0.5919, 0.5929, 0.5942, 0.5954, 0.5969, 0.5987, 0.5998, 0.6018, 0.6036, 0.6052, 0.6063, 0.6077, 0.6099, 0.6116, 0.6136, 0.6154, 0.6166, 0.6185, 0.6201, 0.6223, 0.6238, 0.6258, 0.6278, 0.6295, 0.631, 0.6324, 0.6344, 0.6358, 0.6372, 0.6395, 0.6414, 0.6434, 0.6451, 0.6472, 0.6493, 0.6513, 0.6536, 0.6559, 0.6578, 0.6598, 0.6622, 0.6638, 0.667, 0.6696, 0.671, 0.674, 0.6765, 0.679, 0.6811, 0.6836, 0.6861, 0.6884, 0.6903, 0.6933, 0.6946, 0.6976, 0.6997, 0.7027, 0.7049, 0.7084, 0.7109, 0.7128, 0.7164, 0.7189, 0.7222, 0.7245, 0.7271, 0.7305, 0.7326, 0.7367, 0.7398, 0.7421, 0.7443, 0.7461, 0.7483, 0.7507, 0.754, 0.7566, 0.7587, 0.7615, 0.7639, 0.7662, 0.7693, 0.7723, 0.7753, 0.7769, 0.7797, 0.7822, 0.7843, 0.7869, 0.7891, 0.7918, 0.7944, 0.7982, 0.801, 0.8041, 0.8068, 0.8094, 0.812, 0.8148, 0.8174, 0.82, 0.8219, 0.824, 0.8259, 0.8287, 0.8311, 0.8333, 0.8349, 0.8374, 0.841, 0.8433, 0.8456, 0.8481, 0.8518, 0.854, 0.8562, 0.8588, 0.862, 0.864, 0.8666, 0.8693, 0.8719, 0.8737, 0.8749, 0.8773, 0.8793, 0.8816, 0.8839, 0.887, 0.8888, 0.8905, 0.8924, 0.8948, 0.8966, 0.8986, 0.9009, 0.9029, 0.9039, 0.9063, 0.908, 0.9095, 0.911, 0.9125, 0.915, 0.9173, 0.9186, 0.9209, 0.9228, 0.9249, 0.9259, 0.927, 0.929, 0.9303, 0.9322, 0.9332, 0.9343, 0.9356, 0.9372, 0.9387, 0.9407, 0.9427, 0.944, 0.9459, 0.9473, 0.949, 0.9508, 0.9521, 0.9533, 0.9555, 0.9569, 0.958, 0.9592, 0.9606, 0.9612, 0.9617, 0.962, 0.9627, 0.9642, 0.9646, 0.9658, 0.967, 0.968, 0.9684, 0.9688, 0.9698, 0.9706, 0.9719, 0.9727, 0.974, 0.9747, 0.9761, 0.9774, 0.9785, 0.9793, 0.9802, 0.9811, 0.9817, 0.9823, 0.9828, 0.984, 0.9846, 0.9851, 0.9858, 0.9863, 0.9869, 0.987, 0.9874, 0.9879, 0.9886, 0.9888, 0.9895, 0.9903, 0.9904, 0.9907, 0.9912, 0.9913, 0.9917, 0.992, 0.9928, 0.9929, 0.9936, 0.9939, 0.9942, 0.9946, 0.9949, 0.9955, 0.9955, 0.9959, 0.9963, 0.9964, 0.9966, 0.9966, 0.9968, 0.9969, 0.9971, 0.9973, 0.9978, 0.9981, 0.9985, 0.9986, 0.9988, 0.9988, 0.9989, 0.9989, 0.999, 0.999, 0.999, 0.9993, 0.9993, 0.9993, 0.9993, 0.9993, 0.9993, 0.9996, 0.9996, 0.9997, 0.9997, 0.9997, 0.9998, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], new T.MapGenerator.Biotope([
            { amount: 120, terrain: T.World.terrains[1] },
            { amount: 40, terrain: T.World.terrains[11] },
            { amount: 30, terrain: T.World.terrains[4] },
            { amount: 20, terrain: T.World.terrains[12] },
            { amount: 40, terrain: T.World.terrains[9] },
            { amount: 20, terrain: T.World.terrains[10] },
            { amount: 10, terrain: T.World.terrains[8] },
            { amount: 20, terrain: T.World.terrains[10] },
            { amount: 20, terrain: T.World.terrains[12] },
            { amount: 50, terrain: T.World.terrains[4] },
            { amount: 10, terrain: T.World.terrains[13] },
            { amount: 20, terrain: T.World.terrains[5] },
            { amount: 60, terrain: T.World.terrains[3] },
            { amount: 5, terrain: T.World.terrains[10] },
            { amount: 60, terrain: T.World.terrains[7] },
            { amount: 10, terrain: T.World.terrains[5] },
        ]), function (object, virtual_objects) {
            if (object.type != 'terrain')
                return;
            /*if(object.getCode()==5){
             virtual_objects.push(
             {

             x: object.x,//todo
             y: object.y,//todo
             type: 'natural',
             design: {
             type: 'natural',
             data:{
             image:'rock'+Math.floor(T.TMath.randomSeedPosition(1,{x:object.x,y:object.y})*6)%6+'dark'+Math.floor(T.TMath.randomSeedPosition(2,{x:object.x,y:object.y})*4)%4,
             size: 0.5+T.TMath.randomSeedPosition(5,{x:object.x,y:object.y})*1
             }
             }

             }
             );


             }else*/
            if (object.getCode() == 10) {
                if (TMath.randomSeedPosition(3, { x: object.x, y: object.y }) > 0.95) {
                    virtual_objects.push({
                        x: object.x,
                        y: object.y,
                        type: 'natural',
                        design: {
                            type: 'natural',
                            data: {
                                model: 'tree',
                                size: 3 + TMath.randomSeedPosition(6, { x: object.x, y: object.y }) / 2,
                                rotation: {
                                    x: TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                                    y: TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                                    z: TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 360
                                }
                            }
                        }
                    });
                }
            }
        });
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game = new T.Game(T.TMath.prettyNumber, T.TMath.prettyNumber);
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            distance: 0,
            strength: 0,
            rounds: 1,
            cooldown: 1
        }, (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                _super.apply(this, arguments);
            }
            class_1.getType = function () {
                return ('attack');
            };
            class_1.prototype.countPriceBase = function () {
                return ((Math.pow(this.params.distance, 2) * this.params.strength * this.params.rounds * (1 / this.params.cooldown)) * 100 * 0.05);
            };
            class_1.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 2 }),
                    //new T.Resources({'clay':   0}),
                    new T.Resources({ 'stone': 3 }),
                    new T.Resources({ 'iron': 2 })
                ]);
            };
            class_1.execute = function (game, attacker, attacked, resources_attacker) {
                var attacker_attack = attacker.getAction('attack');
                var attacker_defence = attacker.getAction('defence');
                var attacked_attack = attacked.getAction('attack');
                var attacked_defence = attacked.getAction('defence');
                var attacker_life = attacker.getAction('life').params;
                var attacked_life = attacked.getAction('life').params;
                //---------------------Missing action
                if (attacker_attack instanceof T.Game.Action) {
                    attacker_attack = attacker_attack.clone().params;
                }
                else {
                    throw new Error('Attacker has not ability to attack');
                }
                if (attacker_defence instanceof T.Game.Action) {
                    attacker_defence = attacker_defence.clone().params;
                }
                else {
                    attacker_defence = game.getActionEmptyInstance('defence').params;
                }
                if (attacked_attack instanceof T.Game.Action) {
                    attacked_attack = attacked_attack.clone().params;
                }
                else {
                    attacked_attack = game.getActionEmptyInstance('attack').params;
                }
                if (attacked_defence instanceof T.Game.Action) {
                    attacked_defence = attacked_defence.clone().params;
                }
                else {
                    attacked_defence = game.getActionEmptyInstance('defence').params;
                }
                //---------------------Distance
                var distance = attacker.getPosition().getDistance(attacked.getPosition());
                if (distance > attacker_attack.distance) {
                    throw new Error('Objects are too far - ' + distance + ' fields. Attack distance is only ' + attacker_attack.distance + ' fields.');
                }
                //---------------------Cooldown
                if (!attacker.getAction('attack').canBeExecutedNow()) {
                    throw new Error('This action can be executed in ' + attacker.getAction('attack').canBeExecutedIn() + ' seconds.');
                }
                //---------------------Set usage
                attacker.getAction('attack').nowExecuted();
                //---------------------Defence
                //r('attack',attacker_attack.strength,attacked_attack.strength);
                //r('defence',attacker_defence.defence,attacked_defence.defence);
                attacker_attack.strength -=
                    attacked_defence.defence;
                if (attacker_attack.strength < 0)
                    attacker_attack.strength = 0;
                attacked_attack.strength -=
                    attacker_defence.defence;
                if (attacked_attack.strength < 0)
                    attacked_attack.strength = 0;
                //---------------------
                //attacker_life.life=1000;
                //attacked_life.life=1000;
                while ((attacker_attack.rounds || attacked_attack.rounds) &&
                    (attacker_life.life > 1 && attacked_life.life > 1)) {
                    r('round', attacker_attack.strength, attacked_attack.strength);
                    r('life', attacked_life.life, attacker_life.life);
                    attacked_life.life -= attacker_attack.strength;
                    attacker_life.life -= attacked_attack.strength;
                    attacker_attack.rounds--;
                    attacked_attack.rounds--;
                }
                //---------------------
                if (attacker_life.life < 1)
                    attacker_life.life = 1;
                if (attacked_life.life < 1)
                    attacked_life.life = 1;
            };
            return class_1;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            defence: 0
        }, (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                _super.apply(this, arguments);
            }
            class_2.getType = function () {
                return ('defence');
            };
            class_2.prototype.countPriceBase = function () {
                return ((this.params.defence) * 800 * 0.05);
            };
            class_2.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 2 }),
                    new T.Resources({ 'clay': 2 }),
                    new T.Resources({ 'stone': 1 }),
                ]);
            };
            return class_2;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            life: 1,
            max_life: 1
        }, (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                _super.apply(this, arguments);
            }
            class_3.getType = function () {
                return ('life');
            };
            class_3.prototype.countPriceBase = function () {
                return (0);
            };
            class_3.prototype.getPriceResources = function () {
                return ([new T.Resources()]);
            };
            return class_3;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            wood: 0,
            iron: 0,
            clay: 0,
            stone: 0
        }, (function (_super) {
            __extends(class_4, _super);
            function class_4() {
                _super.apply(this, arguments);
            }
            class_4.getType = function () {
                return ('mine');
            };
            class_4.prototype.countPriceBase = function () {
                return ((this.params.amount) * 3600 * 0.05);
            };
            class_4.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 3 }),
                    new T.Resources({ 'clay': 2 }),
                    new T.Resources({ 'stone': 2 }),
                    new T.Resources({ 'iron': 4 })
                ]);
            };
            return class_4;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            speed: 0
        }, (function (_super) {
            __extends(class_5, _super);
            function class_5() {
                _super.apply(this, arguments);
            }
            class_5.getType = function () {
                return ('move');
            };
            class_5.prototype.countPriceBase = function () {
                return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
            };
            class_5.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 2 }),
                    //new T.Resources({'clay':   0}),
                    //new T.Resources({'stone':  0}),
                    new T.Resources({ 'iron': 1 })
                ]);
            };
            class_5.execute = function (game, object, destinations /*,objects_nearby,resources*/) {
                //---------------------Checking action//todo maybe auto
                var action = object.getAction('move');
                if (action instanceof T.Game.Action) {
                }
                else {
                    throw new Error('Object has not ability to move');
                }
                //---------------------
                var start_position = object.getPosition();
                destinations.unshift(start_position);
                //r(destinations);
                object.path = T.Path.newConstantSpeed(destinations, action.params.speed);
                //---------------------Set usage//todo maybe auto
                object.getAction('move').nowExecuted(); //todo is it needed
                //---------------------
            };
            return class_5;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            regenerate: 100
        }, (function (_super) {
            __extends(class_6, _super);
            function class_6() {
                _super.apply(this, arguments);
            }
            class_6.getType = function () {
                return ('regenerate');
            };
            class_6.prototype.countPriceBase = function () {
                return ((1 / this.params.regenerate) * 3600 * 0.05);
            };
            class_6.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 4 }),
                    new T.Resources({ 'clay': 2 }),
                    new T.Resources({ 'stone': 2 }),
                    new T.Resources({ 'iron': 2 })
                ]);
            };
            return class_6;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            repair: 0
        }, (function (_super) {
            __extends(class_7, _super);
            function class_7() {
                _super.apply(this, arguments);
            }
            class_7.getType = function () {
                return ('repair');
            };
            class_7.prototype.countPriceBase = function () {
                return ((1 / (this.params.repair / 100)) * 1000 * 0.05);
            };
            class_7.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 4 }),
                    new T.Resources({ 'clay': 2 }),
                    new T.Resources({ 'stone': 3 }),
                    new T.Resources({ 'iron': 4 })
                ]);
            };
            return class_7;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
var T;
(function (T) {
    var World;
    (function (World) {
        World.game.installActionClass({
            throughput: 0
        }, (function (_super) {
            __extends(class_8, _super);
            function class_8() {
                _super.apply(this, arguments);
            }
            class_8.getType = function () {
                return ('throughput');
            };
            class_8.prototype.countPriceBase = function () {
                return ((Math.pow(this.params.throughput / 100, 2)) * 10 * 0.05); //todo
            };
            class_8.prototype.getPriceResources = function () {
                return ([
                    new T.Resources({ 'wood': 2 }),
                    new T.Resources({ 'clay': 3 }),
                    new T.Resources({ 'stone': 1 }),
                    new T.Resources({ 'iron': 0 })
                ]);
            };
            return class_8;
        }(T.Game.Action)));
    })(World = T.World || (T.World = {}));
})(T || (T = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvZy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtY29sb3IuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtcG9zaXRpb24tM2QuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wb3NpdGlvbi1wb2xhci5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTUtcG9zaXRpb24tZGF0ZS5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzIwLWFyZWEuY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC10bWF0aC5zdGF0aWMudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUVILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNYLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQyxDQUFDO0FDWnBCOztHQUVHO0FBR0gsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUNMbEM7OztHQUdHO0FBQ0gsd0hBQXdIO0FBSXhILElBQU8sQ0FBQyxDQXlQUDtBQXpQRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBR047O09BRUc7SUFDSDtRQUFBO1FBZ1BBLENBQUM7UUE3T0c7Ozs7OztXQU1HO1FBQ0ksbUJBQUksR0FBWCxVQUFZLEtBQVksRUFBRSxFQUFTO1lBRS9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVkLENBQUM7UUFHVCx3SEFBd0g7UUFFaEg7Ozs7Ozs7V0FPRztRQUNJLHNC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O2dDQUU5QixHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4SixHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4SixHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQzs0QkFFckIsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FFSixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxhQUFhO2dDQUVqRixHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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LEdBQUw7WUFDSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFHRDs7O1dBR0c7UUFDSCxzQkFBTSxHQUFOO1lBRUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMs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QUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQzlILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztZQUMzSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO1lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztZQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztZQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7WUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO1lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUMxSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDM0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFD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LENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxF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O1NBQ2hCLEVBQ0Q7WUFBYywyQkFBYTtZQUEzQjtnQkFBYyw4QkFBYTtZQXdCM0IsQ0FBQztZQXJCVSxlQUFPLEdBQWQ7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUdELGdDQUFjLEdBQWQ7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU07WUFDM0UsQ0FBQztZQUdELG1DQUFpQixHQUFqQjtnQkFFSSxNQUFNLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7aUJBQy9CLENBQUMsQ0FBQztZQUNQLENBQUM7WUFHTCxjQUFDO1FBQUQsQ0F4QkEsQUF3QkMsQ0F4QmEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBd0IxQixDQUNKLENBQUM7SUFFTixDQUFDLEVBakNRLEtBQUssR0FBTCxPQUFLLEtBQUwsT0FBSyxRQWlDYjtBQUFELENBQUMsRUFqQ00sQ0FBQyxLQUFELENBQUMsUUFpQ1AiLCJmaWxlIjoidG93bnMtc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5cbnZhciBUID0ge307XG5tb2R1bGUuZXhwb3J0cyA9ICBUO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhlam55IG9uIDE0LjguMTYuXG4gKi9cblxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBULkFycmF5RnVuY3Rpb25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGZ1bmN0aW9ucyB0byBtYW5pcHVsYXRlIHdpdGggYXJyYXkuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIEFycmF5RnVuY3Rpb25zIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gS2V5IG9mIG9iamVjdCB3aXRoIHRoaXMgSUQsIC0xIGlmIG5vdCBleGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkMmkoYXJyYXk6IEFycmF5LCBpZDpzdHJpbmcpOmFueSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG5cbiAgICAgICAgfVxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yX21lc3NhZ2Ugd2hlbiBpdGVuIG5vdCBleGlzdHNcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gT2JqZWN0IHdpdGggdGhpcyBJRCwgbnVsbCBpZiBub3QgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZDJpdGVtKGFycmF5OiBBcnJheSwgaWQ6IHN0cmluZywgZXJyb3JfbWVzc2FnZSA9ICcnKTphbnkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKXJldHVybiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIERlbGV0ZSBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkUmVtb3ZlKGFycmF5OiBBcnJheSwgaWQ6IHN0cmluZyk6Ym9vbGVhbiB7Ly90b2RvIHJlZmFjdG9yIHVzZSB0aGlzIG5vdCBzcGxpY2VcblxuICAgICAgICAgICAgZm9yICh2YXIgaT0wLGw9YXJyYXkubGVuZ3RoO2k8bDtpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIDJEIGFycmF5XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaXRlcmF0ZTJEKGFycmF5OiBBcnJheSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICAgICAgLy9yKGFycmF5KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIHlMZW4gPSBhcnJheS5sZW5ndGg7IHkgPCB5TGVuOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeExlbiA9IGFycmF5W3ldLmxlbmd0aDsgeCA8IHhMZW47IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHksIHgpO1xuICAgICAgICAgICAgICAgICAgICAvKnRvZG8gcmVmYWN0b3IgdG8geCx5Ki9cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSBmcm9tXG4gICAgICAgICAqIEBwYXJhbSB0b1xuICAgICAgICAgKiBAcmV0dXJuIHthcnJheX0gUmVtb3ZlZCBpdGVtc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJlbW92ZUl0ZW1zKGFycmF5OkFycmF5LCBmcm9tOm51bWJlciwgdG86bnVtYmVyKTpBcnJheSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgICAgICAgICByZXR1cm4gYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqIHRvZG8gc2hvdWxkIGl0IGJlIHVuZGVyIFQuQXJyYXlGdW5jdGlvbnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iZWN0XG4gICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHBhdGhcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBmaWx0ZXJQYXRoKG9iamVjdDogT2JqZWN0LCBwYXRoOiBBcnJheTxzdHJpbmc+LCBzZXRWYWx1ZTogYW55KTphbnkge1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGZvciAodmFyIHBhdGhfaSBpbiBwYXRoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0X2tleSA9IHBhdGhbcGF0aF9pXTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXRoX2kgPCBwYXRoLmxlbmd0aCAtIDEgfHwgdHlwZW9mIHNldFZhbHVlID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3Rbb2JqZWN0X2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlclBhdGg6IEtleSBcXCcnK29iamVjdF9rZXkrJ1xcJyBpbiBwYXRoIGluIG9iamVjdCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG9iamVjdFtvYmplY3Rfa2V5XTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W29iamVjdF9rZXldID0gc2V0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgY29udGFpbmluZyBvbmx5IHVuaXF1ZSB2YWx1ZXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB1bmlxdWUoYXJyYXk6IEFycmF5KTpBcnJheSB7XG4gICAgICAgICAgICB2YXIgbiA9IHt9LCByID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBuW2FycmF5W2ldXSA9IGFycmF5O1xuICAgICAgICAgICAgICAgICAgICByLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGh0bWwgdGFibGUgZnJvbSBKUyBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbF9jbGFzc1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBodG1sXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYXJyYXkydGFibGUoYXJyYXk6QXJyYXksIGFkZGl0aW9uYWxfY2xhc3MgPSAnJyk6c3RyaW5nIHtcbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgcm93cyA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb2xzX3RhYmxlID0gYXJyYXlbMF0ubGVuZ3RoOy8vdG9kbyBpcyBpcyBiZXN0IHNvbHV0aW9uP1xuXG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cIicgKyBhZGRpdGlvbmFsX2NsYXNzICsgJ1wiPic7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCByb3dzOyByb3crKykge1xuXG5cbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+JztcblxuICAgICAgICAgICAgICAgIHZhciBjb2xzID0gYXJyYXlbcm93XS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGNvbHNfc3BhbiA9IGNvbHNfdGFibGUgLSBjb2xzO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sID09IGNvbHMgLSAxICYmIGNvbHNfc3BhbiAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY29sc3Bhbj1cIicgKyAoY29sc19zcGFuICsgMSkgKyAnXCI+JztcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JztcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPC90ZD4nO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90YWJsZT4nO1xuXG4gICAgICAgICAgICByZXR1cm4gKGh0bWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBleHRyYWN0IGtleXMgZnJvbSBBcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXRLZXlzKG9iamVjdDpPYmplY3QpOkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSBrZXlzLnB1c2goayk7XG4gICAgICAgICAgICByZXR1cm4gKGtleXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIC8qKlxuICAgICAqIEdhbWUgY29uZGl0aW9uc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcblxuICAgICAgICBwdWJsaWMgYWN0aW9uX2NsYXNzZXM6T2JqZWN0O1xuICAgICAgICBwdWJsaWMgYWN0aW9uX2VtcHR5X2luc3RhbmNlczpPYmplY3Q7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWF4X2xpZmVfbW9kaWZpZXJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJpY2Vfa2V5X21vZGlmaWVyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG1heF9saWZlX21vZGlmaWVyOkZ1bmN0aW9uLCBwdWJsaWMgcHJpY2Vfa2V5X21vZGlmaWVyOkZ1bmN0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlcyA9IHt9O1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBudW1iZXJzXG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdDpULk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSBbXTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5hY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSW4gb2JqZWN0ICcgKyBvYmplY3QgKyAnIHRoZXJlIGFyZSBubyBhY3Rpb25zIScpOy8vdG9kbyBhbGwgb2JqZWN0cyBzaG91bGQgYmUgY29udmVydGVkIHRvIHN0cmluZyBsaWtlIHRoaXNcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb246YW55KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gTWF0aC5jZWlsKGFjdGlvbi5jb3VudFByaWNlQmFzZSgpKTsvL1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIE5hTiAgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4ocHJpY2VfYmFzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJyArIGFjdGlvbi50eXBlICsgJyBtYWtlcyBwcmljZSBiZXNlIE5hTi4nKTtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VfYmFzZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIG5vbiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChwcmljZV9iYXNlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnICsgYWN0aW9uLnR5cGUgKyAnIHNob3VsZCBub3QgbWFrZSB0aGlzIGFjdGlvbiBuZWdhdGl2ZScpOy8vdG9kbyBtYXliZSBvbmx5IHdhcm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHByaWNlX2Jhc2VzLnB1c2gocHJpY2VfYmFzZSk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2VfYmFzZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gbWF4aW11bSBsaWZlIG9mIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0TWF4TGlmZShvYmplY3Q6VC5PYmplY3QpIHtcblxuICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2VzID0gdGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZSA9IHByaWNlX2Jhc2VzLnJlZHVjZShmdW5jdGlvbiAocHYsIGN2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHB2ICsgY3Y7XG4gICAgICAgICAgICB9LCAwKTtcblxuXG4gICAgICAgICAgICBwcmljZV9iYXNlID0gdGhpcy5tYXhfbGlmZV9tb2RpZmllcihwcmljZV9iYXNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZV9iYXNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgUmVzb3VyY2VzXG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RQcmljZXMob2JqZWN0KSB7XG5cblxuICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2VzID0gdGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG5cblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHByaWNlcyA9IFtdO1xuXG5cbiAgICAgICAgICAgIHZhciBkZXNpZ25fcmVzb3VyY2VzID0gb2JqZWN0LmdldE1vZGVsKCkuYWdncmVnYXRlUmVzb3VyY2VzVm9sdW1lcygpO1xuXG5cbiAgICAgICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbjphbnksIGk6bnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV9yZXNvdXJjZXNfbGlzdCA9XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5nZXRQcmljZVJlc291cmNlcygpLnNvcnQoZnVuY3Rpb24gKGE6YW55LCBiOmFueSkgey8vdG9kbyBpcyBpdCBzYWZlP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGEuY2xvbmUoKS5zaWdudW0oKSkgLSBkZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYi5jbG9uZSgpLnNpZ251bSgpKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlcyA9IHByaWNlX3Jlc291cmNlc19saXN0WzBdLmNsb25lKCk7XG5cblxuICAgICAgICAgICAgICAgIHByaWNlX3Jlc291cmNlcy5tdWx0aXBseShwcmljZV9iYXNlc1tpXSk7XG4gICAgICAgICAgICAgICAgcHJpY2VzLnB1c2gocHJpY2VfcmVzb3VyY2VzKTtcblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gUmVzb3VyY2VzIC0gcHJpY2Ugb2Ygb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RQcmljZShvYmplY3Q6VC5PYmplY3RzKSB7XG5cbiAgICAgICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VtcHR5IHByaWNlJyxwcmljZSk7XG5cbiAgICAgICAgICAgIHZhciBwcmljZXMgPSB0aGlzLmdldE9iamVjdFByaWNlcyhvYmplY3QpO1xuXG4gICAgICAgICAgICBwcmljZXMuZm9yRWFjaChmdW5jdGlvbiAocHJpY2VfKSB7XG5cbiAgICAgICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByaWNlLmFwcGx5KHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaW5zdGFsbEFjdGlvbkNsYXNzKGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXM6T2JqZWN0LCBhY3Rpb25fY2xhc3M6YW55KSB7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gYWN0aW9uX2NsYXNzLmdldFR5cGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiBhY3Rpb24gY2xhc3MgaGFzIG5vIHR5cGUhJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiB0aGVyZSBpcyBhbHJlYWR5IGluc3RhbGxlZCBhY3Rpb24gd2l0aCB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2VtcHR5X2luc3RhbmNlID0gbmV3IGFjdGlvbl9jbGFzcyh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vQWRkaW5nIG1ldGhvZCBjbG9uZSB0byBpbnN0YWxsZWQgYWN0aW9uIGNsYXNzXG4gICAgICAgICAgICBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IGFjdGlvbl9jbGFzcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdID0gYWN0aW9uX2NsYXNzO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW3R5cGVdID0gYWN0aW9uX2VtcHR5X2luc3RhbmNlO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGU6c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25fY2xhc3MgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSArICcuIFRoZXJlIGFyZSBvbmx5IHRoZXNlIGFjdGlvbiB0eXBlczogJyArIFQuQXJyYXlGdW5jdGlvbnMuZ2V0S2V5cyh0aGlzLmFjdGlvbl9jbGFzc2VzKS5qb2luKCcsICcpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGFjdGlvbl9jbGFzcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbmV3QWN0aW9uSW5zdGFuY2UoYWN0aW9uOmFueSkge1xuXG4gICAgICAgICAgICAvL3RvZG8gc29sdmUgZGVmZW5zZSB2cy4gZGVmZW5jZVxuICAgICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnZGVmZW5zZScpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udHlwZSA9ICdkZWZlbmNlJztcbiAgICAgICAgICAgICAgICBhY3Rpb24ucGFyYW1zLmRlZmVuY2UgPSBhY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IGFjdGlvbl9jbGFzcyhhY3Rpb24pO1xuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVBY3Rpb25FeGVjdXRlKGFjdGlvbl90eXBlOnN0cmluZykge1xuXG4gICAgICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKTtcblxuXG4gICAgICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoZ2FtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChleGVjdXRlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZShhY3Rpb25fdHlwZTpzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9pbnN0YW5jZSA9IHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1thY3Rpb25fdHlwZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uX2luc3RhbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoYWN0aW9uX2luc3RhbmNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qZ2V0QWN0aW9uRXhlY3V0ZShhY3Rpb25fa2V5KXtcblxuICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX2tleV07XG5cbiAgICAgICAgIGlmKHR5cGVvZiBhY3Rpb249PSd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gdHlwZSAnK2FjdGlvbl9rZXkrJy4nKTtcblxuICAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG5cblxuICAgICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICB2YXIgYXJncyA9IFtnYW1lXS5wdXNoLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgIHJldHVybiBhY3Rpb24uZXhlY3V0ZV9jYWxsYmFjay5hcHBseSh0aGlzLGFyZ3MpO1xuXG4gICAgICAgICB9O1xuXG5cblxuICAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgICAgICAgfSovXG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZS5BY3Rpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULkdhbWUge1xuXG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbiB7XG5cblxuICAgICAgICBwdWJsaWMgbGFzdF91c2U6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGFjdGlvbjpPYmplY3QpIHtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUgPT09ICd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignWW91IG11c3QgZXh0ZW5kIFQuR2FtZS5BY3Rpb24gYW5kIGFkZCBtZXRob2QgZ2V0VHlwZSBiZWZvcmUgY3JlYXRpbmcgaW5zdGFuY2VzIScpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSgpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgIT09IHR5cGUpdGhyb3cgbmV3IEVycm9yKCdUaGlzIGlzICcgKyB0eXBlICsgJyBub3QgJyArIGFjdGlvbi50eXBlICsgJyBjbGFzcyEnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IGFjdGlvbltrZXldO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgcGFyYW1zXG5cbiAgICAgICAgICAgIC8qZm9yKHZhciBwYXJhbSBpbiBhY3Rpb25BYmlsaXR5LnBhcmFtcyl7XG4gICAgICAgICAgICAgdmFyIHBhcmFtX3R5cGUgPSBhY3Rpb24uYWJpbGl0eV9wYXJhbXNbcGFyYW1dO1xuXG4gICAgICAgICAgICAgaWYodHlwZW9mIGFjdGlvbkFiaWxpdHkucGFyYW1zW3BhcmFtXSE9PXBhcmFtX3R5cGUpe1xuICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW0gJytwYXJhbSsnIHNob3VsZCBiZSAnK3BhcmFtX3R5cGUrJyBpbnN0ZWFkIG9mICcrdHlwZW9mKGFjdGlvbkFiaWxpdHkuYWJpbGl0eV9wYXJhbXNbcGFyYW1dKSsnIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uQWJpbGl0eS50eXBlKTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIChbXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBleGVjdXRlKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBleGVjdXRlIHBhc3NpdmUgYWN0aW9uLicpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW4gaG93IG1hbnkgc2Vjb25kcyBjYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQ/XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjYW5CZUV4ZWN1dGVkSW4oKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJhbXMuY29vbGRvd24gPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGFzdF91c2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBNYXRoLmFicyh0aGlzLmxhc3RfdXNlIC0gbmV3IERhdGUoKSkgLyAxMDAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmNvb2xkb3duIDw9IHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMucGFyYW1zLmNvb2xkb3duIC0gcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkIG5vdz9cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBjYW5CZUV4ZWN1dGVkTm93KCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNhbkJlRXhlY3V0ZWRJbigpID09PSAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBhY3R1YWwgZGF0ZSBhcyBkYXRlIG9mIGV4ZWN1dGlvbiB0aGlzIGFjdGlvbiBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgbm93RXhlY3V0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RfdXNlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgaHRtbCBwcm9maWxlIG9mIGFjdGlvbiBhYmlsaXR5XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVIdG1sUHJvZmlsZSgpIHtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwiYWN0aW9uLWFiaWxpdHktcHJvZmlsZVwiPic7XG5cbiAgICAgICAgICAgIGh0bWwgKz0gYFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiMlwiPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCB0aGlzLnR5cGUpICsgYDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGFzdF91c2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCAnbGFzdF91c2VkJykgKyBgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIHRoaXMubGFzdF91c2UgKyBgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvciAodmFyIHBhcmFtIGluIHRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCB0aGlzLnR5cGUsIHBhcmFtKSArIGA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gICsgdGhpcy5wYXJhbXNbcGFyYW1dICsgYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgICAgIHJldHVybiAoaHRtbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwR2VuZXJhdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0WlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB6X25vcm1hbGl6aW5nX3RhYmxlXG4gICAgICAgICAqIEBwYXJhbSB7VC5NYXBHZW5lcmF0b3IuQmlvdG9wZX0gYmlvdG9wZVxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGdldFo6RnVuY3Rpb24sIHB1YmxpYyB6X25vcm1hbGl6aW5nX3RhYmxlOkFycmF5LCBwdWJsaWMgYmlvdG9wZTpBcnJheSwgcHVibGljIHZpcnR1YWxPYmplY3RHZW5lcmF0b3I6RnVuY3Rpb24pIHtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyOm51bWJlciwgcmFkaXVzOm51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDw9IHJhZGl1cyAqIDI7IHkrKykge1xuXG4gICAgICAgICAgICAgICAgbWFwW3ldID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSByYWRpdXMgKiAyOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIHJhZGl1cyArIDEgLyAyLCAyKSA+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5nZXRaKHggLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci54LCB5IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBtYXBbeV1beF0gPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRlcnJhaW5NYXAobWFwOkFycmF5KSB7XG5cbiAgICAgICAgICAgIHZhciBtYXBfYmcgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIGwgPSBtYXAubGVuZ3RoOyB5IDwgbDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2JnW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBsOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcFt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcF9iZ1t5XVt4XSA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbihtYXBbeV1beF0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG1hcF9iZyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcjpudW1iZXIsIHJhZGl1czpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICB2YXIgYm91bmRzID0gMTtcblxuXG4gICAgICAgICAgICB2YXIgel9tYXAgPSB0aGlzLmdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLnRlcnJhaW5NYXAoel9tYXApO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1hcCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcF9hcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheTpBcnJheSwgY2VudGVyX2ludGVnZXI6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihtYXBfYXJyYXlbeV1beF0pID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4obWFwX2FycmF5W3ldW3hdKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC54ID0gY2VudGVyX2ludGVnZXIueCAtIHJhZGl1cyArIHg7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC55ID0gY2VudGVyX2ludGVnZXIueSAtIHJhZGl1cyArIHk7XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UHVyZU1hcChjZW50ZXI6UG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5vdF9jZW50ZXIgPSBmYWxzZSkge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNlbnRlcixub3RfY2VudGVyKTtcblxuICAgICAgICAgICAgdmFyIGNlbnRlcl9pbnRlZ2VyID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoY2VudGVyLngpLFxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoY2VudGVyLnkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAobm90X2NlbnRlcilcbiAgICAgICAgICAgICAgICBub3RfY2VudGVyID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBub3RfY2VudGVyLnggLSBjZW50ZXJfaW50ZWdlci54LFxuICAgICAgICAgICAgICAgICAgICB5OiBub3RfY2VudGVyLnkgLSBjZW50ZXJfaW50ZWdlci55XG4gICAgICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvKnZhciBtYXBfYXJyYXkgPSB0aGlzLmdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG4gICAgICAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLmNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKTsvKiovXG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHZhciB4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCB0Om51bWJlciwgb2JqZWN0Ok9iamVjdDtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPD0gcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8PSByYWRpdXMgKiAyOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIHJhZGl1cyArIDEgLyAyLCAyKSA+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RfY2VudGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSBub3RfY2VudGVyLnggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHkgLSBub3RfY2VudGVyLnkgLSByYWRpdXMgKyAxIC8gMiwgMikgPD1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICB6ID0gdGhpcy5nZXRaKHggLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci54LCB5IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueSk7XG4gICAgICAgICAgICAgICAgICAgIHogPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmJpb3RvcGUuZ2V0WlRlcnJhaW4oeik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0KTtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4odCk7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC54ID0gY2VudGVyX2ludGVnZXIueCAtIHJhZGl1cyArIHg7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC55ID0gY2VudGVyX2ludGVnZXIueSAtIHJhZGl1cyArIHk7XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gb2JqZWN0c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMob2JqZWN0czpBcnJheSkge1xuXG5cbiAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXcgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzXzF4MV9yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3Iob2JqZWN0c18xeDFfcmF3W2ldLCB2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcGxldGUgdGVycmFpbiBhbmQgdmlydHVhbCBvYmplY3RzIGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyIERvbnQgZ2V0IG9iamVjdHMgbmVhciB0aGlzIGNlbnRlci5cbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX19XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDb21wbGV0ZU9iamVjdHMocmVhbF9vYmplY3RzOlQuT2JqZWN0cy5BcnJheSwgY2VudGVyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5hdHVyYWxfb2JqZWN0cyA9IHRydWUsIG5vdF9jZW50ZXIgPSBmYWxzZSkge1xuXG5cbiAgICAgICAgICAgIHZhciBjb21wbGV0ZV9vYmplY3RzID0gdGhpcy5nZXRQdXJlTWFwKGNlbnRlciwgcmFkaXVzLCBub3RfY2VudGVyKTtcblxuXG4gICAgICAgICAgICByZWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAobmF0dXJhbF9vYmplY3RzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gdGhpcy5nZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhjb21wbGV0ZV9vYmplY3RzKTtcblxuICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5NYXBHZW5lcmF0b3Ige1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQmlvdG9wZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodGVycmFpbnMpIHtcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHRlcnJhaW4uYW1vdW50O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdmFyIGZyb20gPSAwO1xuICAgICAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbiAodGVycmFpbikge1xuXG4gICAgICAgICAgICAgICAgdGVycmFpbi5mcm9tID0gZnJvbSAvIHN1bTtcbiAgICAgICAgICAgICAgICBmcm9tICs9IHRlcnJhaW4uYW1vdW50O1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgICAgICB0aGlzLnRlcnJhaW5zID0gdGVycmFpbnM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6XG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFpUZXJyYWluKHo6bnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudGVycmFpbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAgICAgICAgIGlmICh6ID49IHRoaXMudGVycmFpbnNbaV0uZnJvbSkgcmV0dXJuICh0aGlzLnRlcnJhaW5zW2ldLnRlcnJhaW4pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Nb2RlbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgTW9kZWwge1xuXG5cbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgcGFydGljbGVzOkFycmF5O1xuICAgICAgICBwdWJsaWMgcm90YXRpb246bnVtYmVyO1xuICAgICAgICBwdWJsaWMgc2l6ZTpudW1iZXI7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsIGpzb25cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2UgaW4gY2FzZSBvZiBmYWlsXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoanNvbjpPYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqc29uKSA9PSAndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzID0ganNvbi5wYXJ0aWNsZXM7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0ganNvbi5yb3RhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGpzb24uc2l6ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLnJvdGF0aW9uKSA9PSAndW5kZWZpbmVkJyl0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5zaXplKSA9PSAndW5kZWZpbmVkJyl0aGlzLnNpemUgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuTW9kZWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3RhdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkUm90YXRpb25TaXplKHJvdGF0aW9uOm51bWJlciwgc2l6ZTpudW1iZXIpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb24gPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplID0gMTtcblxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiArPSByb3RhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaW1lbnNpb24geCx5LHoseHlcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgcmFuZ2UoZGltZW5zaW9uOnN0cmluZykge1xuXG4gICAgICAgICAgICBpZiAoZGltZW5zaW9uID09ICd4eScpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBULlRNYXRoLnh5MmRpc3QodGhpcy5yYW5nZSgneCcpLCB0aGlzLnJhbmdlKCd5JykgKiB0aGlzLnNpemUpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhciA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cbiAgICAgICAgICAgIHZhciBtYXggPSBmYWxzZSwgbWluID0gZmFsc2UsIG1heF86bnVtYmVyLCBtaW5fOm51bWJlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzTGluZWFyKSB7XG5cblxuICAgICAgICAgICAgICAgIG1pbl8gPSBwYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXTtcbiAgICAgICAgICAgICAgICBtYXhfID0gcGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl0gKyBwYXJ0aWNsZXNMaW5lYXJbaV0uc2l6ZVtkaW1lbnNpb25dO1xuXG4gICAgICAgICAgICAgICAgLy90b2RvIGZlYXR1cmUgcmV2ZXJzZVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heCA9PT0gZmFsc2UpbWF4ID0gbWF4XztcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBmYWxzZSltaW4gPSBtaW5fO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAobWF4XyA+IG1heCltYXggPSBtYXhfO1xuICAgICAgICAgICAgICAgIGlmIChtaW5fIDwgbWluKW1pbiA9IG1pbl87XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKE1hdGguYWJzKG1pbiAtIG1heCkvKnRoaXMuc2l6ZSovKTsvL3RvZG8gcm90YXRpb25cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfelxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZUJ5KG1vdmVfeCA9IDAsIG1vdmVfeSA9IDAsIG1vdmVfeiA9IDApIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICs9IG1vdmVfeDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICs9IG1vdmVfeTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi56ICs9IG1vdmVfejtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBaIG9mIGpvaW5pbmcgbW9kZWxcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAgICAgKi9cbiAgICAgICAgam9pbk1vZGVsWihtb2RlbDpULk1vZGVsLCBtb3ZlX3g6bnVtYmVyLCBtb3ZlX3k6bnVtYmVyKSB7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICAgICAgLy92YXIgIG1vZGVsXz1kZWVwQ29weU1vZGVsKG1vZGVsKTtcbiAgICAgICAgICAgIC8vbW9kZWxfLm1vdmVCeShtb3ZlX3gsbW92ZV95KTsvL3RvZG8gbWF5YmUgZGVsZXRlIG1vdmVCeVxuXG4gICAgICAgICAgICAvL3ZhciBtYXhfej10aGlzLnJhbmdlKCd6Jyk7XG5cblxuICAgICAgICAgICAgdmFyIHRoaXNfbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG4gICAgICAgICAgICB2YXIgbW9kZWxfbGluZWFyX3BhcnRpY2xlcyA9IG1vZGVsLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZXMgPSBbMF07XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXMpIHtcblxuICAgICAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCArPSBtb3ZlX3g7XG4gICAgICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICs9IG1vdmVfeTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlpIGluIHRoaXNfbGluZWFyX3BhcnRpY2xlcykgey8vdG9kbyBtYXliZSBvcHRpbWl6ZSBieSBwcmUtc29ydGluZ1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFBhcnRpY2xlcy5jb2xsaXNpb24yRCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLCBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlcy5wdXNoKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0ucG9zaXRpb24ueiArIHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0uc2l6ZS56KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSBNYXRoLm1heC5hcHBseShNYXRoLCBkaXN0YW5jZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWF4X3o7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEpvaW4gbW9kZWxzIHRvZ2V0aGVyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICovXG4gICAgICAgIGpvaW5Nb2RlbChtb2RlbCwgbW92ZV94LCBtb3ZlX3kpIHsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSB0aGlzLmpvaW5Nb2RlbFoobW9kZWwsIG1vdmVfeCwgbW92ZV95KTtcblxuXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSxcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsKSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzWzFdLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IG1vdmVfeCxcbiAgICAgICAgICAgICAgICB5OiBtb3ZlX3ksXG4gICAgICAgICAgICAgICAgejogbWF4X3pcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy5zaXplID0gMTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVlcCBjb3B5IHRoaXMgYW5kIGNvbnZlcnRzIGxpbmtzIHRvIHJhdyBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWVwQ29weVdpdGhvdXRMaW5rcygpIHtcblxuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNsb25lKCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBsaW5rcyB0byByYXcgZGF0YVxuXG5cbiAgICAgICAgICAgIHZhciBmaW5kUGFydGljbGVCeU5hbWUgPSBmdW5jdGlvbiAocGFydGljbGVzLCBuYW1lKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluZGVkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkX3BhcnRpY2xlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZmluZGVkX3BhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXNMaW5rcyA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuXG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5MaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLmxpbmspICE9ICd1bmRlZmluZWQnKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShtb2RlbC5wYXJ0aWNsZXMsIHBhcnRpY2xlc1tpXS5saW5rKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZF9wYXJ0aWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluayAnICsgcGFydGljbGUubGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGlua2VkX3BhcnRpY2xlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnJvdGF0aW9uKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlc1tpXS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnNpemUpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZXNbaV0uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBvc2l0aW9uKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5wb3NpdGlvbiA9IHBhcnRpY2xlc1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbyBza2V3XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzW2ldID0gbGlua2VkX3BhcnRpY2xlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBhcnRpY2xlcykgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGlua3MocGFydGljbGVzW2ldLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcGFydGljbGVzTGlua3MobW9kZWwucGFydGljbGVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAxRCBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICAgICAqL1xuICAgICAgICBnZXRMaW5lYXJQYXJ0aWNsZXMoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSA9IGZhbHNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhciA9IFtdO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgcGFydGljbGVzIHRvIDFEIHBhcnRpY2xlc1xuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzMkxpbmVhciA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMsIHBvc2l0aW9uLCByb3RhdGlvbiwgc2l6ZSkgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcG9zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplID0gMTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgejogMFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcGFydGljbGU9ZGVlcENvcHkocGFydGljbGUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5EZWZhdWx0IHBhcmFtcyBvZiBwYXJ0aWNsZSwgZ3JvdXAgb3IgbGlua1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnRpY2xlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgejogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnJvdGF0aW9uKSA9PSAndW5kZWZpbmVkJylwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUuc2l6ZSkgPT0gJ3VuZGVmaW5lZCcpcGFydGljbGUuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Qb3NpdGlvbiwgUm90YXRpb24gYW5kIHNpemUgLy90b2RvIHNrZXdcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdERlZyA9IFQuVE1hdGgueHkyZGlzdERlZyhwYXJ0aWNsZS5wb3NpdGlvbi54LCBwYXJ0aWNsZS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgICAgICAgICBkaXN0RGVnLmRpc3QgPSBkaXN0RGVnLmRpc3QgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBkaXN0RGVnLmRlZyArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeHkgPSBULlRNYXRoLmRpc3REZWcyeHkoZGlzdERlZy5kaXN0LCBkaXN0RGVnLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucm90YXRpb24gKz0gcm90YXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHh5Lng7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB4eS55O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gcGFydGljbGUucG9zaXRpb24ueiAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogKz0gcG9zaXRpb24uejtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNpemUgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlLnNpemUgKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueCA9IHBhcnRpY2xlLnNpemUueCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnkgPSBwYXJ0aWNsZS5zaXplLnkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS56ID0gcGFydGljbGUuc2l6ZS56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGFydGljbGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIocGFydGljbGUucGFydGljbGVzLCBwYXJ0aWNsZS5wb3NpdGlvbiwgcGFydGljbGUucm90YXRpb24sIHBhcnRpY2xlLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUuc2hhcGUpICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmVhci5wdXNoKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcblxuICAgICAgICAgICAgaWYgKGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemUpIHtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLCBmYWxzZSwgMCwgMSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMyTGluZWFyKG1vZGVsLnBhcnRpY2xlcywgZmFsc2UsIG1vZGVsLnJvdGF0aW9uLCBtb2RlbC5zaXplKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vdG9kbyBzdHJpY3QgbW9kZS8vZGVsZXRlIG1vZGVsO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc0xpbmVhcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUGF0aChwYXRoKSB7XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGF0aC5mb3JFYWNoKSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHIocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gbW9kZWwucGFydGljbGVzW2ldO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUGF0aFNpYmxpbmdzKHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBtb2RlbDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwYXRoLmZvckVhY2gpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZV9pLCBwYXRoX2lpKSB7XG5cbiAgICAgICAgICAgICAgICAvKmlmKHBhdGhfaWk8cGF0aC5sZW5ndGgtMSl7XG5cbiAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICAgICAgIH1lbHNleyovXG5cbiAgICAgICAgICAgICAgICB2YXIgbWUgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQucGFydGljbGVzID0gW21lXTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtZTtcbiAgICAgICAgICAgICAgICAvL31cblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZ3JlZ2F0ZSB2b2x1bWUgb2YgZWFjaCByZXNvdXJjZSB1c2VkIGluIG1vZGVsXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKSB7XG5cblxuICAgICAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcblxuXG4gICAgICAgICAgICB2YXIgbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lYXJfcGFydGljbGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2b2x1bWUgPS8vdG9kbyBhbGwgc2hhcGVzXG4gICAgICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnggKlxuICAgICAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS55ICpcbiAgICAgICAgICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlLnNpemUuejtcblxuICAgICAgICAgICAgICAgIHZhciBtYXRlcmlhbCA9IGxpbmVhcl9wYXJ0aWNsZS5tYXRlcmlhbC5zcGxpdCgnXycpO1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbWF0ZXJpYWxbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfID0ge307XG4gICAgICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXSA9IHZvbHVtZTtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLypjb25zb2xlLmxvZygncHJpY2Ugb2YnKTtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByaWNlKTsqL1xuXG4gICAgICAgICAgICAvL3ByaWNlLm11bHRpcGx5KDAuMDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEhhc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3h4eCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIFRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTW9kZWwuUGFydGljbGVzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk1vZGVsIHtcblxuXG4gICAgLyoqXG4gICAgICogTW9kZWwgUGFydGljbGVzXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGVcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpIHsvL3RvZG8gPz8gbWF5YmUgcmVuYW1lXG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcueiA9IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLnRvcCA9IDE7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2hhcGUuYm90dG9tID0gMTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnJvdGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgc3RhdGljIGdldFRyaWFuZ2xlcyhwYXJ0aWNsZSwgcG9pbnRfY2xhc3MpIHtcblxuICAgICAgICAgICAgdmFyIHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMuYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgICAgICB2YXIgeCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgICAgIHZhciB4XyA9IHBhcnRpY2xlLnNpemUueDtcbiAgICAgICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICAgICAgdmFyIHhfXywgeV9fLCB6X187XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGV2ZWwgPSAwOyBsZXZlbCA8IDI7IGxldmVsKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS5ib3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5UTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5UTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgcG9pbnRfY2xhc3MoeF9fLCB5X18sIHpfXykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgM0QgbW9kZWwgZnJvbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBkZXByZWNhdGVkXG4gICAgICAgICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0M0QocGFydGljbGUpIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0ge307XG5cbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnR5cGUgPT0gJ3ByaXNtJykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgICAgIHZhciB5XyA9IHBhcnRpY2xlLnNpemUueTtcbiAgICAgICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cblxuICAgICAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMgPSBbW10sIFtdXTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEID0gW1tdLCBbXV07XG4gICAgICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXMocGFydGljbGUuc2hhcGUucm90YXRlZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeF8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSB6XyAqIGxldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpOy8vK3lfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueSksXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIHRtcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuVE1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5XyA9IFQuVE1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IHh5Xy55O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiovXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAyRCBsaW5lcyBmcm9tIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIDA9Ym90dG9tLCAxPXRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gMkQgbGluZXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQyRGxpbmVzKHBhcnRpY2xlLCBiYXNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5nZXQzRChwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIHZhciBsaW5lcyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgcG9seWdvbnMyRCA9IFtyZXNvdXJjZS5wb2x5Z29uczJEW2Jhc2VdXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcG4gaW4gcG9seWdvbnMyRCkge1xuXG4gICAgICAgICAgICAgICAgLypsaW5lc1twbl09W107XG5cbiAgICAgICAgICAgICAgICAgZm9yKHZhciBwdCBpbiByZXNvdXJjZS5wb2x5Z29uc1twbl0pIHtcblxuICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSByZXNvdXJjZS5wb2ludHNbcmVzb3VyY2UucG9seWdvbnNbcG5dW3B0XSAtIDFdO1xuICAgICAgICAgICAgICAgICBsaW5lc1twbl1bcHNdID0gW3BvaW50WzBdLCBwb2ludFsxXV07XG5cbiAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQxLCBwb2ludDI7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gLTEsIGwgPSBwb2x5Z29uczJEW3BuXS5sZW5ndGg7IGkgPCBsIC0gMTsgaSsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGwgLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSBpICsgMTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vcihyZXNvdXJjZS5wb2x5Z29uc1twbl0scG9pbnQxKTtcblxuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQyXSAtIDFdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQxWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDJbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9yKGxpbmVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIChsaW5lcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy90b2RvIG1heWJlIHJlZmFjdG9yIG1vdmUgdG8gTWF0aFxuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgMkQgbGluZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBsaW5lczFcbiAgICAgICAgICogQHBhcmFtIChhcnJheSkgbGluZXMyXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaTEgaW4gbGluZXMxKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaTIgaW4gbGluZXMyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS55XG4gICAgICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcignY29sbGlzaW9uMkQgaXMgdHJ1ZScsIHBhcnRpY2xlMSwgcGFydGljbGUyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiBwYXJ0aWNsZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAgICAgKiBAcGFyYW0gKG9iamVjdCkgcGFydGljbGUyIHRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNvbGxpc2lvbjJEKHBhcnRpY2xlMSwgcGFydGljbGUyKSB7XG5cblxuICAgICAgICAgICAgdmFyIGxpbmVzMSA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMSwgMSk7XG4gICAgICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29ybmVyIGNvbGxpc2lvblxuXG5cbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgIGlmICghY29sbGlzaW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgayA9IDEwMDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ZXIsIGlubmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl94ID0gaW5uZXJbMV0ueCAtIGlubmVyWzBdLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3kgPSBpbm5lclsxXS55IC0gaW5uZXJbMF0ueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnkgLT0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS54ICs9IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjEgPSBbaW5uZXIxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMiA9IFtpbm5lcjJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24yID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMiwgb3V0ZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaXNpb24xICYmIGNvbGxpc2lvbjIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0oKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiovXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERFxuICAgICAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgICAgIHZhciBzcmM9Y3JlYXRlQ2FudmFzVmlhRnVuY3Rpb25BbmRDb252ZXJ0VG9TcmMoXG4gICAgICAgICAgICAgc2l6ZSoyLHNpemUqMixmdW5jdGlvbihjdHgpe1xuXG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlV2lkdGggPSAyO1xuXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVzXz1bbGluZXMxLGxpbmVzMl07XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbGluZXNfKXtcblxuICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0gMCxsPWxpbmVzX1trZXldLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGxpbmVzX1trZXldW2ldWzBdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVswXS55K3NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKGxpbmVzX1trZXldW2ldWzFdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVsxXS55K3NpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsvKiovXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5BcnJheVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbi8vdG9kbyBULk9iamVjdHMuQXJyYXkgPSBjbGFzcyBleHRlbmRzIEFycmF5e1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQXJyYXkge1xuXG5cbiAgICAgICAgcHVibGljIG9iamVjdHM6T2JqZWN0cztcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gb2JqZWN0c1xuICAgICAgICAgKiB0b2RvID8/Pz8/Pz8/PyBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdHM9W10pIHtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBbGwoKTpBcnJheSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXIoY2FsbGJhY2spOlQuT2JqZWN0cy5BcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICAvL3IoZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzKTtcblxuICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzID0gdGhpcy5vYmplY3RzLmZpbHRlcihjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHVzaCBuZXcgb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBwdXNoKG9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5wdXNoKFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBvciBwdXNoIG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldEJ5SWQob2JqZWN0LmlkLCBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdnZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZClyZXR1cm4gdGhpcy5vYmplY3RzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0QnlJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignc2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0gPSBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSWQoaWQsIG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJUeXBlcyguLi50eXBlcykge1xuXG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2Yob2JqZWN0LnR5cGUpID09IC0xKXJldHVybjtcblxuICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclJhZGl1cyhjZW50ZXIsIHJhZGl1cykge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShjZW50ZXIpIDw9IHJhZGl1cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZmlsdGVyQXJlYShhcmVhOkFyZWEpIHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJlYS5pc0NvbnRhaW5pbmcob2JqZWN0LmdldFBvc2l0aW9uKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cykgey8vdG9kbyBtYXliZSByZWZhY3RvciB0byBnZXRUZXJyYWluQ29kZXMyREFycmF5IG9yIGdldFRlcnJhaW5Db2Rlc01hcFxuXG4gICAgICAgICAgICAvKnZhciByYWRpdXMgPSBzaXplLzI7XG4gICAgICAgICAgICAgdmFyIGNlbnRlciA9e1xuICAgICAgICAgICAgIHg6IHRvcGxlZnQueCtyYWRpdXMsXG4gICAgICAgICAgICAgeTogdG9wbGVmdC55K3JhZGl1c1xuICAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3JlYXRlIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB2YXIgbWFwX2FycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCk7Ly8uc2xpY2UoKS5yZXZlcnNlKCk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkgey8vdG9kbyBpcyB0aGlzIG9wdGltYWxpemF0aW9uIGVmZmVjdGl2ZT9cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA8IHJhZGl1cyAqIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPCByYWRpdXMgKiAyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgLSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4YyA9IG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5YyA9IG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXM7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcF9hcnJheVt5XVt4XSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLnh5MmRpc3QoeCAtIHhjLCB5IC0geWMpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gb2JqZWN0LmdldENvZGUoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gbWFwX2FycmF5O1xuXG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIGdldE1hcE9mQ29sbGlzaW9ucyhjZW50ZXIsIHJhZGl1cyl7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1UZXJyYWluc1xuICAgICAgICAgICAgdmFyIG1hcF9vZl90ZXJyYWluX2NvZGVzID0gdGhpcy5nZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXBfb2ZfY29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgeCx5O1xuXG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoWzEsNSwxMV0uaW5kZXhPZihtYXBfb2ZfdGVycmFpbl9jb2Rlc1t5XVt4XSkhPT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV1beF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tT2JqZWN0c1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG5cbiAgICAgICAgICAgICAgICBpZihvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnICYmIG9iamVjdC5zdWJ0eXBlID09ICd3YWxsJyl7fWVsc2V7cmV0dXJuO31cblxuICAgICAgICAgICAgICAgIHZhciB4PU1hdGgucm91bmQob2JqZWN0LngpLU1hdGgucm91bmQoY2VudGVyLngtKHJhZGl1cykpO1xuICAgICAgICAgICAgICAgIHZhciB5PU1hdGgucm91bmQob2JqZWN0LnkpLU1hdGgucm91bmQoY2VudGVyLnktKHJhZGl1cykpO1xuXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgrMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgtMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeSsxfSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeS0xfVxuXG4gICAgICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHBfKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocF8ueD49MCAmJiBwXy55Pj0wICYmIHBfLng8cmFkaXVzKjIgJiYgcF8ueTxyYWRpdXMqMil7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1twXy55XVtwXy54XT0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuKG1hcF9vZl9jb2xsaXNpb25zKTtcblxuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQxeDFUZXJyYWluT2JqZWN0cygpIHtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKS5zbGljZSgpLnJldmVyc2UoKTsvL25vcm1hbCBBcnJheVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgYmxvY2tlZF9wb3NpdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3RfMXgxLCBrZXk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCkgKyAneScgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeF90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC54eTJkaXN0KHgsIHkpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEuZGVzaWduLmRhdGEuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueCA9IE1hdGgucm91bmQob2JqZWN0XzF4MS54ICsgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueSA9IE1hdGgucm91bmQob2JqZWN0XzF4MS55ICsgeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgb2JqZWN0XzF4MS54ICsgJ3knICsgb2JqZWN0XzF4MS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIHRlcnJhaW5fb2JqZWN0c18xeDE7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0VGVycmFpbk9uUG9zaXRpb24ocG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5vYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS50eXBlICE9ICd0ZXJyYWluJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5kZXNpZ24uZGF0YS5zaXplIDw9IHBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LCB0aGlzLm9iamVjdHNbaV0ueSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobnVsbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldE5lYXJlc3RUZXJyYWluUG9zaXRpb25XaXRoQ29kZShwb3NpdGlvbiwgdGVycmFpbl9jb2RlKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gdGhpcy5nZXQxeDFUZXJyYWluT2JqZWN0cygpO1xuXG4gICAgICAgICAgICB2YXIgbWluX2Rpc3RhbmNlID0gLTE7XG4gICAgICAgICAgICB2YXIgbmVhcmVzdF90ZXJyYWluXzF4MSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW5fMXgxKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmIChtaW5fZGlzdGFuY2UgPT09IC0xIHx8IG1pbl9kaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0X3RlcnJhaW5fMXgxID0gdGVycmFpbl8xeDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfdGVycmFpbl8xeDEgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qXG5cbiAgICAgICAgIGdldE1hcE9mQ29sbGlzaW9uQ29kZXMocmVhbF9vYmplY3RzLHBvc2l0aW9uKXtcbiAgICAgICAgIHJldHVybiBUZXJyYWluO1xuICAgICAgICAgfTtcblxuICAgICAgICAgKi9cblxuXG4gICAgfVxuXG59XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuT2JqZWN0XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBuYW1lOnN0cmluZztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzX2tleSA9PSAnX2lkJyl0aGlzX2tleSA9ICdpZCc7Ly90b2RvIG1heWJlIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgaW5pdChvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYob2JqZWN0IGluc3RhbmNlb2YgVC5PYmplY3RzLk9iamVjdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmIChvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3RlcnJhaW4nKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4ob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAnc3RvcnknKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlN0b3J5KG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ25hdHVyYWwnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLk5hdHVyYWwob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IHB1dCBpdGVtIGludG8gVG93bnMgT2JqZWN0cyBBcnJheSBiZWNhdXNlIG9mIHVucmVjb2duaXplZCBvYmplY3QgdHlwZSAnICsgb2JqZWN0LnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpOlBvc2l0aW9uIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb3ZpbmcoKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiAoJ1snICsgdGhpcy5uYW1lICsgJ10nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLkJ1aWxkaW5nXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdWlsZGluZyBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ246IE9iamVjdDtcbiAgICAgICAgcHVibGljIGFjdGlvbnM6IEFycmF5O1xuICAgICAgICBwdWJsaWMgcGF0aDogUGF0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgICAgICBzdXBlcihvYmplY3QpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uc19jbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc19jbGFzc2VzLnB1c2goVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHRoaXMuYWN0aW9uc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zX2NsYXNzZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByKHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gbmV3IFQuUGF0aCguLi50aGlzLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHZhciBsaWZlX2FjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCdsaWZlJyk7XG4gICAgICAgICAgICB2YXIgbWF4X2xpZmUgPSBULldvcmxkLmdhbWUuZ2V0T2JqZWN0TWF4TGlmZSh0aGlzKTtcblxuXG4gICAgICAgICAgICBpZiAobGlmZV9hY3Rpb24gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uID0gVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpZmUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IG1heF9saWZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4X2xpZmU6IG1heF9saWZlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChsaWZlX2FjdGlvbik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbi5wYXJhbXMubWF4X2xpZmUgPSBtYXhfbGlmZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oZGF0ZSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5jb3VudFBvc2l0aW9uKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5pblByb2dyZXNzKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5CdWlsZGluZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge1QuTW9kZWx9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb2RlbCgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuZGVzaWduLmRhdGEgaW5zdGFuY2VvZiBULk1vZGVsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaWduLmRhdGEgPSBuZXcgVC5Nb2RlbCh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpb25fdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5HYW1lLkFjdGlvbkFiaWxpdHl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRBY3Rpb24oYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zW2ldLnR5cGUgPT0gYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYWN0aW9uc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVIdG1sUHJvZmlsZSgpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbnNfcHJvZmlsZSA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc19wcm9maWxlICs9IHRoaXMuYWN0aW9uc1tpXS5jcmVhdGVIdG1sUHJvZmlsZSgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoYFxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib2JqZWN0LWJ1aWxkaW5nLXByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIDxoMj5gICsgdGhpcy5uYW1lICsgYDwvaDI+XG4gICAgICAgICAgICAgICAgYCArIHRoaXMuZ2V0UG9zaXRpb24oKSArIGBcblxuXG4gICAgICAgICAgICAgICAgYCArIGFjdGlvbnNfcHJvZmlsZSArIGBcblxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIGApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuTmF0dXJhbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBOYXR1cmFsIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjpPYmplY3Q7XG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuTmF0dXJhbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5IGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGNvbnRlbnQ7XG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuU3RvcnkoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE1hcmtkb3duKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNvbnRlbnQuZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBUZXJyYWluIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcblxuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5UZXJyYWluKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUocHJlZmVyZWRfd2lkdGgpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2xvcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmNvbG9yKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gZ2V0SW1hZ2UoKXt9XG5cblxuICAgIH1cblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuQ29sb3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuICAgIC8qKlxuICAgICAqIE9iamVjdCB3aGljaCByZXByZXNlbnRzIFJHQkEgY29sb3IuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIENvbG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHIgcmVkIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGcgZ3JlZW4gZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gYiBibHVlIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGEgYWxwaGEgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlcixwdWJsaWMgZzogbnVtYmVyLHB1YmxpYyBiOiBudW1iZXIscHVibGljIGEgPSAyNTUpIHtcbiAgICAgICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgICAgICB0aGlzLmcgPSBnO1xuICAgICAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGRlZXAgY2xvbmUgb2QgVC5Db2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn1cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCk6Q29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucix0aGlzLmcsdGhpcy5iLHRoaXMuYSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZHMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgICAgIHRoaXMuYSA9IE1hdGgucm91bmQodGhpcy5hKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNzcyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDc3NDb2xvcigpIHtcblxuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmEgPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3IoJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hLzI1NSoxMDApLzEwMCArICcpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3IgKGlnbm9yZXMgYWxwaGEgY2hhbmVsLilcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuICMwMGZmMDBcbiAgICAgICAgICovXG4gICAgICAgIGdldEhleCgpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gJyMnICsgKCgxIDw8IDI0KSArICh0aGlzLnIgPDwgMTYpICsgKHRoaXMuZyA8PCA4KSArIHRoaXMuYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBuZXcgVC5Db2xvciBmb3JtIGhleCBjb2RlIG9mIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXggY29kZSBvZiBjb2xvciBlZy4gIzAwZmYwMFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjcmVhdGVGcm9tSGV4KGhleDogc3RyaW5nKTogQ29sb3Ige1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0OkNvbG9yICwgc2hvcnRoYW5kUmVnZXg6IFJlZ0V4cCwgcmVzdWx0UmVnZXg6IFJlZ0V4cEV4ZWNBcnJheTtcblxuICAgICAgICAgICAgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0UmVnZXggPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRSZWdleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzJdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzNdLCAxNilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY3JlYXRpbmcgVC5Db2xvciBmcm9tICcgKyBoZXgpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5QYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVHtcblxuICAgIGV4cG9ydCBjbGFzcyBQYXRoIHtcblxuICAgICAgICBwdWJsaWMgYXJyYXlfcG9zaXRpb25fZGF0ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHsuLi5ULlBvc2l0aW9uRGF0ZX0gUG9zaXRpb24gd2l0aCBkYXRlIGF0IGxlYXN0IDJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblxuXG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL2lmKGFyZ3MubGVuZ3RoPT09MSAmJiBhcmdzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy8gICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJnc1swXTtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBsYXN0X2RhdGUgPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggbXVzdCBiZSBULlBvc2l0aW9uRGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsYXN0X2RhdGUgPj0gcG9zaXRpb25fZGF0ZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZXMgc2hvdWxkIGJlIGNvbnNlY3V0aXZlIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCAoJyArIHBvc2l0aW9uX2RhdGUuZGF0ZSArICcgc2hvdWxkIGJlIGFmdGVyICcgKyBsYXN0X2RhdGUgKyAnKS4gJyArIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSA9IHBvc2l0aW9uX2RhdGUuZGF0ZS8xO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5LjxULlBvc2l0aW9uPn0gYXJyYXlfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5QYXRofVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIG5ld0NvbnN0YW50U3BlZWQoYXJyYXlfcG9zaXRpb246IEFycmF5LCBzcGVlZDogbnVtYmVyLCBkYXRlOiBudW1iZXIgfCBEYXRlID0gMCk6IFBhdGgge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmFOKHNwZWVkIC8gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgdmFsaWQgbnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwZWVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgcG9zaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhcnJheV9wb3NpdGlvbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycmF5X3Bvc2l0aW9uX2RhdGUgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFQuUG9zaXRpb25EYXRlKGFycmF5X3Bvc2l0aW9uWzBdLngsIGFycmF5X3Bvc2l0aW9uWzBdLnksIGRhdGUpXG4gICAgICAgICAgICBdO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXN0X3Bvc2l0aW9uID0gYXJyYXlfcG9zaXRpb25bMF07XG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlOiBQb3NpdGlvbkRhdGUsIGRpc3RhbmNlOiBudW1iZXI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMSwgbCA9IGFycmF5X3Bvc2l0aW9uLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IGFycmF5X3Bvc2l0aW9uW2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBQYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoIHZpYSBuZXdDb25zdGFudFNwZWVkIG11c3QgYmUgVC5Qb3NpdGlvbicpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBsYXN0X3Bvc2l0aW9uLmdldERpc3RhbmNlKHBvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIC8gMSArIGRpc3RhbmNlIC8gc3BlZWQgKiAxMDAwKTtcblxuXG4gICAgICAgICAgICAgICAgbGFzdF9wb3NpdGlvbiA9IHBvc2l0aW9uX2RhdGU7XG5cblxuICAgICAgICAgICAgICAgIGFycmF5X3Bvc2l0aW9uX2RhdGUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUG9zaXRpb25EYXRlKGFycmF5X3Bvc2l0aW9uW2ldLngsIGFycmF5X3Bvc2l0aW9uW2ldLnksIGRhdGUpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vcmV0dXJuIG5ldyB0aGlzLmFwcGx5KHRoaXMsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICAvL3JldHVybiBPYmplY3QuY3JlYXRlKFQuUGF0aCxhcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5QYXRoKC4uLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb25zKCkge1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2godGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybihwb3NpdGlvbnMpO1xuICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnQgaW4gd2hpY2ggc2VnbWVudCBpcyBULlBhdGggcHJvZ3Jlc3NcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50U2VnbWVudChkYXRlOiBudW1iZXIgfCBEYXRlKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgICAgICB2YXIgQTogUG9zaXRpb25EYXRlLCBCOlBvc2l0aW9uRGF0ZSwgeDogbnVtYmVyLCB5OiBudW1iZXI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5kYXRlIC8gMTtcbiAgICAgICAgICAgICAgICBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2kgKyAxXS5kYXRlIC8gMTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSsnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEEgPD0gZGF0ZSAmJiBCID4gZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzwtLS10aGlzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoaSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY291bnRpbmcgc2VnbWVudCBpbiBULlBhdGgsIG1heWJlIGJlY2F1c2Ugb2YgcGFyYW0gZGF0ZSBpcyAnICsgZGF0ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyBwb3NpdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgY291bnRQb3NpdGlvbihkYXRlOiBudW1iZXIgfCBEYXRlID0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkpO1xuXG4gICAgICAgICAgICB2YXIgeCA9IFQuVE1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueCwgQi54KTtcbiAgICAgICAgICAgIHZhciB5ID0gVC5UTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS55LCBCLnkpO1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHgsIHkpKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcm90YXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICovXG4gICAgICAgIGNvdW50Um90YXRpb24oZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIEJBID0gQi5nZXRQb3NpdGlvbigpLnBsdXMoQS5nZXRQb3NpdGlvbigpLm11bHRpcGx5KC0xKSk7XG5cbiAgICAgICAgICAgIHZhciBwb2xhciA9IEJBLmdldFBvc2l0aW9uUG9sYXIoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvbGFyLmdldERlZ3JlZXMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgU3BlZWQgYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGZpZWxkcy9zXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNwZWVkKGRhdGU6IG51bWJlciB8IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcyhkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gQS5nZXREaXN0YW5jZShCKTtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IEIuZGF0ZSAtIEEuZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSAvIChkdXJhdGlvbiAvIDEwMDApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcGF0aCBpbiBwcm9ncmVzcyAodHJ1ZSkgb3IgaXQgaGFzIG5vdCBzdGFydGVkKGZhbHNlKSBvciBpdCBpcyBmaW5pc2hlZChmYWxzZSk/XG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGluUHJvZ3Jlc3MoZGF0ZTogbnVtYmVyIHwgRGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBtYXliZSBjb3VudFByb2dyZXNzXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uM0RPYmplY3Qge1xuICAgICAgICB4Om51bWJlcjtcbiAgICAgICAgeTpudW1iZXI7XG4gICAgICAgIHo6bnVtYmVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbjNEIHtcblxuICAgICAgICBwdWJsaWMgeDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgejogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0OiBudW1iZXIgfCBQb3NpdGlvbjNET2JqZWN0LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGxldCB4Om51bWJlcjtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4X29yX29iamVjdCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geF9vcl9vYmplY3QueTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB4X29yX29iamVjdC56O1xuXG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdudW1iZXInKXtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0gejtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbjNEKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24zRCB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJywnICsgdGhpcy56ICsgJ10nO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUG9zaXRpb25Qb2xhclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uUG9sYXIge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyLHB1YmxpYyBkZWdyZWVzOiBudW1iZXIpIHtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uUG9sYXIodGhpcy5kaXN0YW5jZSx0aGlzLmRlZ3JlZXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSB0aGlzLmdldFJhZGlhbnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbihcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4ocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlXG4gICAgICAgICAgICApKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREZWdyZWVzKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVncmVlcyArIDM2MCkgJSAzNjA7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UmFkaWFucygpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGguZGVnMnJhZCh0aGlzLmRlZ3JlZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLmRpc3RhbmNlICsgJywnICsgdGhpcy5kZWdyZWVzICsgJ8KwJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUG9zaXRpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uIHtcbiAgICAgICAgeDpudW1iZXI7XG4gICAgICAgIHk6bnVtYmVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XG5cbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeF9vcl9vYmplY3Rfb3Jfc3RyaW5nOiBudW1iZXIgfCBQb3NpdGlvbiB8IHN0cmluZywgeT86IG51bWJlcikge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3Rfb3Jfc3RyaW5nID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLnk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgaWYodHlwZW9mIHhfb3Jfb2JqZWN0X29yX3N0cmluZyA9PT0gJ3N0cmluZycpe1xuXG4gICAgICAgICAgICAgICAgaWYgKC9eWystXT9cXGQrKFxcLlxcZCspPyxbKy1dP1xcZCsoXFwuXFxkKyk/JC8udGVzdCh4X29yX29iamVjdF9vcl9zdHJpbmcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHhfeTpBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgeF95ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHBhcnNlRmxvYXQoeF95WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdCh4X3lbMV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNyZWF0aW5nIFBvc2l0aW9uLCBzdHJpbmcgbXVzdCBiZSBpbiBmb3JtYXQgeCx5IG5vdCAnK3hfb3Jfb2JqZWN0X29yX3N0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB4X29yX29iamVjdF9vcl9zdHJpbmcgPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdF9vcl9zdHJpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjb25zdHJ1Y3RvciBwYXJhbXMgd2hpbGUgY3JlYXRpbmcgVC5Qb3NpdGlvbiEnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBsdXMocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgdGhpcy55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIG1pbnVzKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggLT0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSAtPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbXVsdGlwbHkoazogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCAqIGs7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgKiBrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Rmxvb3JlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbihNYXRoLmZsb29yKCB0aGlzLngpLE1hdGguZmxvb3IoIHRoaXMueSkpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFBvc2l0aW9uUG9sYXIoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb25Qb2xhcihcbiAgICAgICAgICAgICAgICBULlRNYXRoLnh5MmRpc3QodGhpcy54LCB0aGlzLnkpLFxuICAgICAgICAgICAgICAgIFQuVE1hdGgucmFkMmRlZyhNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KSlcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICByZXR1cm4gVC5UTWF0aC54eTJkaXN0KHBvc2l0aW9uLnggLSB0aGlzLngsIHBvc2l0aW9uLnkgLSB0aGlzLnkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uRGF0ZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uRGF0ZU9iamVjdCB7XG4gICAgICAgIHg6bnVtYmVyO1xuICAgICAgICB5Om51bWJlcjtcbiAgICAgICAgZGF0ZTpEYXRlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25EYXRlIGV4dGVuZHMgVC5Qb3NpdGlvbiB7Ly90b2RvIGlzIHRoYXJlIHNvbHV0aW9uIHdpdGhvdXQgdXNpbmcgVC4/XG5cbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG4gICAgICAgIHB1YmxpYyBkYXRlOkRhdGU7XG5cblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0OiBudW1iZXIgfCBQb3NpdGlvbkRhdGVPYmplY3QsIHk/OiBudW1iZXIsIGRhdGU/OiBudW1iZXIgfCBEYXRlID0gMCkge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAvL3ZhciBwb3NpdGlvbkRhdGVPYmplY3Q6UG9zaXRpb25EYXRlT2JqZWN0O1xuICAgICAgICAgICAgICAgIC8vcG9zaXRpb25EYXRlT2JqZWN0ID0geDtcblxuICAgICAgICAgICAgICAgIHggPSB4X29yX29iamVjdC54O1xuICAgICAgICAgICAgICAgIHkgPSB4X29yX29iamVjdC55O1xuICAgICAgICAgICAgICAgIGRhdGUgPSB4X29yX29iamVjdC5kYXRlO1xuXG5cbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgeCA9IHhfb3Jfb2JqZWN0O1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3VwZXIoeCwgeSk7XG5cblxuICAgICAgICAgICAgdmFyIGRhdGVPYmplY3Q6IERhdGU7XG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBuZXcgRGF0ZShkYXRlLzEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gbmV3IERhdGUoZGF0ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBkYXRlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChpc05hTihkYXRlT2JqZWN0IC8gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvIGNvbnN0cnVjdCBQb3NpdGlvbkRhdGUgaXMgbmVlZGVkIHZhbGlkIERhdGUgbm90ICcgKyBkYXRlICsgJy4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBkYXRlT2JqZWN0O1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbkRhdGUodGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gb25seSBwb3NpdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnWycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnXSBhdCAnICtcbiAgICAgICAgICAgICAgICAodGhpcy5kYXRlLmdldERheSgpICsgMSkgKyAnLicgKyAodGhpcy5kYXRlLmdldE1vbnRoKCkgKyAxKSArICcuJyArIHRoaXMuZGF0ZS5nZXRGdWxsWWVhcigpICtcbiAgICAgICAgICAgICAgICAnICcgKyB0aGlzLmRhdGUuZ2V0SG91cnMoKSArICc6JyArIHRoaXMuZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuXG5cblxuXG4iLCJcbm1vZHVsZSBUIHtcbiAgICBleHBvcnQgY2xhc3MgQXJlYSB7XG5cbiAgICAgICAgcHVibGljIHBvc2l0aW9uczogQXJyYXk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4ucG9zaXRpb25zOlQuUG9zaXRpb25bXSkge1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb25zLmxlbmd0aDwzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBhdCBsZWFzdCAzIHBvaW50cy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGMgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzFdKTtcbiAgICAgICAgICAgIHZhciBhID0gcG9zaXRpb25zWzFdLmdldERpc3RhbmNlKHBvc2l0aW9uc1syXSk7XG4gICAgICAgICAgICB2YXIgYiA9IHBvc2l0aW9uc1swXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuXG4gICAgICAgICAgICAvL3IoYSxiLGMpO1xuXG4gICAgICAgICAgICBpZihhK2I+YyAmJiBiK2M+YSAmJiBhK2M+Yil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCB0aHJlZSBwb2ludHMgYXJlIGluIGxpbmUuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBpc0NvbnRhaW5pbmcocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyB3b3JraW5nIG9ubHkgZm9yIGNvbnZleCBhcmVhc1xuXG4gICAgICAgICAgICB2YXIgdGVzdHNpZGU6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGliOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbjogYm9vbGVhbixcbiAgICAgICAgICAgICAgICBjb2xsaXNpb246IGJvb2xlYW47XG4gICAgICAgICAgICBmb3IodGVzdHNpZGU9MDt0ZXN0c2lkZTwyO3Rlc3RzaWRlKyspIHtcblxuXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj1mYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWEgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpYiA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWIgPT0gdGhpcy5wb3NpdGlvbnMubGVuZ3RoKWliID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBULlRNYXRoLmxpbmVDb2xsaXNpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29sbGlzaW9uPT10cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8qcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICsgKHRlc3RzaWRlLTAuNSkqMTAwMDAwMDAwMC8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgICk7Ki9cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKCFzaWRlY29sbGlzaW9uKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBSZXNvdXJjZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBSZXNvdXJjZXMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocmVzb3VyY2VzOk9iamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNvdXJjZXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBNYXRoLmNlaWwocmVzb3VyY2VzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1Jlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCk6UmVzb3VyY2VzIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzb3VyY2VzKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjb250YWlucyBhIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IGNvbnRhaW5zXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWlucyhyZXNvdXJjZXM6UmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPCByZXNvdXJjZXNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgICAgICovXG4gICAgICAgIGFkZChyZXNvdXJjZXM6UmVzb3VyY2VzKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSArPSByZXNvdXJjZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbXVsdGlwbHkoazpudW1iZXIpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHRoaXNba2V5XSAqIGspO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHNpZ251bShrOnN0cmluZyk6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbW9kaWZpZXJcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBhcHBseShtb2RpZmllcjpGdW5jdGlvbik6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBtb2RpZmllcih0aGlzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGFsbCByZXNvdXJjZXMga2V5c1xuICAgICAgICAgKi9cbiAgICAgICAgZXh0cmFjdEtleXMoKTpBcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChrZXlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmVzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gRGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCBnaXZlbiBSZXNvdXJjZXNcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBhcmUocmVzb3VyZXM6UmVzb3VyY2VzKTpudW1iZXIge1xuXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VzX0EgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHJlc291cmNlc19CID0gcmVzb3VyZXM7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChyZXNvdXJjZXNfQS5leHRyYWN0S2V5cygpKTtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChyZXNvdXJjZXNfQi5leHRyYWN0S2V5cygpKTtcblxuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4ga2V5cykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsX0EgPSByZXNvdXJjZXNfQVtrZXldO1xuICAgICAgICAgICAgICAgIHZhciB2YWxfQiA9IHJlc291cmNlc19CW2tleV07XG5cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsX0EgPT0gJ3VuZGVmaW5lZCcpdmFsX0EgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsX0IgPT0gJ3VuZGVmaW5lZCcpdmFsX0IgPSAwO1xuXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5wb3codmFsX0EgLSB2YWxfQiwgMik7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2UpO1xuXG5cbiAgICAgICAgICAgIHJldHVybiAoZGlzdGFuY2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgICAgICogQHJldHVybiB7Ym9vbH0gc3VjY2Vzc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlKHJlc291cmNlczpSZXNvdXJjZXMpOmJvb2xlYW4ge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMocmVzb3VyY2VzKSlyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSAtPSByZXNvdXJjZXNba2V5XTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUmVzb3VyY2VzIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKTpzdHJpbmcge1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKHRoaXNba2V5XSArICcgJyArIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5ncy5qb2luKCcsICcpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRvSFRNTCgpOnN0cmluZyB7Ly90b2RvIHB1dCB1cmwgcHJlZml4IGludG8gcGFyYW1zXG5cbiAgICAgICAgICAgIHZhciBzdHJpbmdzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gVC5Mb2NhbGUuZ2V0KCdyZXNvdXJjZScsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcoLyonZW4tVVMnJ2RlLURFJyovKTsvL3RvZG8gdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKCc8ZGl2PjxpbWcgc3JjPVwiL21lZGlhL2ltYWdlL3Jlc291cmNlcy8nICsga2V5ICsgJy5wbmdcIiB0aXRsZT1cIicgKyBuYW1lICsgJ1wiIGFsdD1cIicgKyBuYW1lICsgJ1wiID4nICsgdmFsdWUgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0cmluZ3Nfam9pbmVkID0gc3RyaW5ncy5qb2luKCcgJyk7XG4gICAgICAgICAgICBzdHJpbmdzX2pvaW5lZCA9ICc8ZGl2IGNsYXNzPVwicmVzb3VyY2VzXCI+JyArIHN0cmluZ3Nfam9pbmVkICsgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdzX2pvaW5lZDtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5UTWF0aFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGludGVyZmFjZSBwb3NpdGlvbiB7XG4gICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgeTogbnVtYmVyO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBwb3NpdGlvblBvbGFyIHtcbiAgICAgICAgZGlzdDogbnVtYmVyO1xuICAgICAgICBkZWc6IG51bWJlcjtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogTWF0aGVtYXRpY2FsIGZ1bmN0aW9ucyB0byBUb3duc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBUTWF0aCB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn1cbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHNpZ24oeDogbnVtYmVyKTogbnVtYmVyIHsvL3RvZG8gTWF0aC5zaWduIHx8IHRoaXNcbiAgICAgICAgICAgIHggPSAreDsgLy8gY29udmVydCB0byBhIG51bWJlclxuICAgICAgICAgICAgaWYgKHggPT09IDAgfHwgaXNOYU4oeCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4ID4gMCA/IDEgOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSBiYXNlXG4gICAgICAgICAqIEBwYXJhbSBudW1iZXJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBiYXNlTG9nKGJhc2U6IG51bWJlciwgbnVtYmVyOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubG9nKG51bWJlcikgLyBNYXRoLmxvZyhiYXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlcl9vZl9ub25femVyb19kaWdpdHNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBDdXRzIHVubGVzcyBkaWdpdHMgdG8gemVyb1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByZXR0eU51bWJlcihudW1iZXI6IG51bWJlciwgbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0czogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICAgICAgbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cyA9IG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgfHwgMjsvL3RvZG8gcmVmYWN0b3IgbGlrZSB0aGlzXG5cblxuICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IE1hdGguY2VpbChUTWF0aC5iYXNlTG9nKDEwLCBudW1iZXIpKTtcbiAgICAgICAgICAgIHZhciBrID0gTWF0aC5wb3coMTAsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgLSBkaWdpdHMpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRpZ2l0cyxrKTtcblxuXG4gICAgICAgICAgICBudW1iZXIgPSBudW1iZXIgKiBrO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICAgICAgbnVtYmVyID0gTWF0aC5yb3VuZChudW1iZXIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8gaztcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBhbmdlbGVzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzFcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzJcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSA8MDsxODA+IGRlZ3JlZXMgZGlmZmVyZW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFuZ2xlRGlmZihkZWcxOiBudW1iZXIsIGRlZzI6bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgdmFyIGRlZyA9IE1hdGguYWJzKGRlZzEgLSBkZWcyKSAlIDM2MDtcbiAgICAgICAgICAgIGlmIChkZWcgPiAxODApZGVnID0gMzYwIC0gZGVnO1xuICAgICAgICAgICAgcmV0dXJuIChkZWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcmFkMmRlZyhyYWRpYW5zOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAocmFkaWFucyAqICgxODAgLyBNYXRoLlBJKSkgJSAzNjA7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBkZWcycmFkKGRlZ3JlZXM6bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIChkZWdyZWVzICUgMzYwICogKE1hdGguUEkgLyAxODApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB4XG4gICAgICAgICAqIEBwYXJhbSB5XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGlzdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB4eTJkaXN0KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5zcXJ0KE1hdGgucG93KHgsIDIpICsgTWF0aC5wb3coeSwgMikpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICBzdGF0aWMgeHkyZGlzdERlZyh4Om51bWJlciwgeTpudW1iZXIpOnBvc2l0aW9uUG9sYXIge1xuXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgIGRpc3Q6IFQuVE1hdGgueHkyZGlzdCh4LCB5KSxcbiAgICAgICAgICAgICAgICBkZWc6ICBULlRNYXRoLnJhZDJkZWcoTWF0aC5hdGFuMih5LCB4KSlcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIGRpc3REZWcyeHkoZGlzdDpudW1iZXIsIGRlZzpudW1iZXIpOnBvc2l0aW9uIHtcblxuICAgICAgICAgICAgdmFyIHJhZCA9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguY29zKHJhZCkgKiBkaXN0LFxuICAgICAgICAgICAgICAgIHk6IE1hdGguc2luKHJhZCkgKiBkaXN0XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiAob3V0cHV0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy90b2RvIG15YmUgcmVmYWN0b3IgdG8gcG9zaXRpb25cbiAgICAgICAgc3RhdGljIHh5Um90YXRlKHg6IG51bWJlciwgeTpudW1iZXIsIGRlZzpudW1iZXIpOnBvc2l0aW9uIHtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdCA9IFQuVE1hdGgueHkyZGlzdCh4LCB5KTtcbiAgICAgICAgICAgIHZhciByYWQgPSBNYXRoLmF0YW4yKHksIHgpO1xuXG4gICAgICAgICAgICByYWQgKz0gVC5UTWF0aC5kZWcycmFkKGRlZyk7XG5cblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgc3RhdGljIHJhbmRvbVNlZWRQb3NpdGlvbihzZWVkOm51bWJlciwgcG9zaXRpb246cG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc2luKE1hdGgucG93KChwb3NpdGlvbi54ICogcG9zaXRpb24ueSkgLSBzZWVkLCAyKSkgKyAxKSAvIDI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBmbG9hdFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0Zsb2F0KHZhbHVlOmFueSwgZGVmdmFsPTApOm51bWJlciB7XG5cbiAgICAgICAgICAgIC8vaWYgKHR5cGVvZiBkZWZ2YWwgPT09ICd1bmRlZmluZWQnKWRlZnZhbCA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJylyZXR1cm4gKGRlZnZhbCk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkZWZ2YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBpbnRlZ2VyXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZ2YWxcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHRvSW50KHZhbHVlOmFueSwgZGVmdmFsPTApOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJylyZXR1cm4gKGRlZnZhbCk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYm91bmRzKHZhbHVlOm51bWJlciwgbWluOm51bWJlciwgbWF4Om51bWJlcik6bnVtYmVyIHtcblxuICAgICAgICAgICAgaWYgKHZhbHVlIDwgbWluKXJldHVybiBtaW47XG4gICAgICAgICAgICBpZiAodmFsdWUgPiBtYXgpcmV0dXJuIG1heDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcG9pbnRbYjF4LGIxeV0gY29sbGlkaW5nIGxpbmU/XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlzT25MaW5lKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgYTJ4IC09IGExeDtcbiAgICAgICAgICAgIGEyeSAtPSBhMXk7XG5cbiAgICAgICAgICAgIGIxeCAtPSBhMXg7XG4gICAgICAgICAgICBiMXkgLT0gYTF5O1xuXG5cbiAgICAgICAgICAgIHZhciBhU2xvcGUgPSBhMnkgLyBhMng7XG4gICAgICAgICAgICB2YXIgYlNsb3BlID0gYjF5IC8gYjF4O1xuXG5cbiAgICAgICAgICAgIGlmIChhU2xvcGUgIT0gYlNsb3BlKXJldHVybiBmYWxzZTtcblxuXG4gICAgICAgICAgICB2YXIgYURpc3QgPSBULlRNYXRoLnh5MmRpc3QoYTJ5LCBhMngpO1xuICAgICAgICAgICAgdmFyIGJEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGIxeSwgYjF4KTtcblxuICAgICAgICAgICAgcmV0dXJuIChhRGlzdCA+PSBiRGlzdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIGxpbmUgQSBjb2xsaWRpbmcgbGluZSBCP1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIyeVxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGxpbmVDb2xsaXNpb24oYTF4Om51bWJlciwgYTF5Om51bWJlciwgYTJ4Om51bWJlciwgYTJ5Om51bWJlciwgYjF4Om51bWJlciwgYjF5Om51bWJlciwgYjJ4Om51bWJlciwgYjJ5Om51bWJlcik6IGJvb2xlYW4ge1xuXG5cbiAgICAgICAgICAgIHZhciBkZW5vbWluYXRvciA9ICgoYTJ4IC0gYTF4KSAqIChiMnkgLSBiMXkpKSAtICgoYTJ5IC0gYTF5KSAqIChiMnggLSBiMXgpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IxID0gKChhMXkgLSBiMXkpICogKGIyeCAtIGIxeCkpIC0gKChhMXggLSBiMXgpICogKGIyeSAtIGIxeSkpO1xuICAgICAgICAgICAgdmFyIG51bWVyYXRvcjIgPSAoKGExeSAtIGIxeSkgKiAoYTJ4IC0gYTF4KSkgLSAoKGExeCAtIGIxeCkgKiAoYTJ5IC0gYTF5KSk7XG4gICAgICAgICAgICB2YXIgY29sbGlzaW9uO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlbm9taW5hdG9yLG51bWVyYXRvcjEsbnVtZXJhdG9yMik7XG5cbiAgICAgICAgICAgIC8vIERldGVjdCBjb2luY2lkZW50IGxpbmVzIChoYXMgYSBwcm9ibGVtLCByZWFkIGJlbG93KVxuICAgICAgICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAvL3ZhciBjb2xsaXNpb249IChudW1lcmF0b3IxID09IDAgJiYgbnVtZXJhdG9yMiA9PSAwKTtcbiAgICAgICAgICAgICAgICAvL2NvbGxpc2lvbj1mYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBiT25BID0gVC5UTWF0aC5pc09uTGluZShhMXgsIGExeSwgYTJ4LCBhMnksIGIxeCwgYjF5KTtcbiAgICAgICAgICAgICAgICB2YXIgYU9uQiA9IFQuVE1hdGguaXNPbkxpbmUoYjF4LCBiMXksIGIyeCwgYjJ5LCBhMXgsIGExeSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGJPbkEgfHwgYU9uQik7XG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciByID0gbnVtZXJhdG9yMSAvIGRlbm9taW5hdG9yO1xuICAgICAgICAgICAgICAgIHZhciBzID0gbnVtZXJhdG9yMiAvIGRlbm9taW5hdG9yO1xuXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uID0gKChyID49IDAgJiYgciA8PSAxKSAmJiAocyA+PSAwICYmIHMgPD0gMSkpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVidWcgVEREIGRvIG5vdCBkZWxldGVcblxuICAgICAgICAgICAgLyp2YXIgc2l6ZT01MDtcbiAgICAgICAgICAgICB2YXIgc3JjPWNyZWF0ZUNhbnZhc1ZpYUZ1bmN0aW9uQW5kQ29udmVydFRvU3JjKFxuICAgICAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICBjdHgubW92ZVRvKGExeCtzaXplLGExeStzaXplKTtcbiAgICAgICAgICAgICBjdHgubGluZVRvKGEyeCtzaXplLGEyeStzaXplKTtcbiAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhiMXgrc2l6ZSxiMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhiMngrc2l6ZSxiMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsqL1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBibHVyWFkoZ2VuZXJhdG9yOkZ1bmN0aW9uLCBibHVyOm51bWJlcikge1xuXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICh4LCB5KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIHh4LCB5eTtcblxuICAgICAgICAgICAgICAgIGZvciAoeHggPSB4IC0gYmx1cjsgeHggPD0geCArIGJsdXI7IHh4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHl5ID0geSAtIGJsdXI7IHl5IDw9IHkgKyBibHVyOyB5eSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnBvdyhibHVyLCAyKSA8IE1hdGgucG93KHh4IC0geCwgMikgKyBNYXRoLnBvdyh5eSAtIHksIDIpKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZ2VuZXJhdG9yKHh4LCB5eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHN1bSAvIGNvdW50KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGJ5dGVzVG9TaXplKGJ5dGVzOm51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgICAgIHZhciBzaXplcyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQiddO1xuICAgICAgICAgICAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzBCJztcbiAgICAgICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpKSk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChieXRlcyAvIE1hdGgucG93KDEwMjQsIGkpKSArICcnICsgc2l6ZXNbaV07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9zdGFydFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9wb3NpdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9lbmRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJfZW5kXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcHJvcG9ydGlvbnMoYV9zdGFydDpudW1iZXIsIGFfcG9zaXRpb246bnVtYmVyLCBhX2VuZDpudW1iZXIsIGJfc3RhcnQ6bnVtYmVyLCBiX2VuZDpudW1iZXIpOm51bWJlciB7XG5cblxuICAgICAgICAgICAgdmFyIGFfd2hvbGUgPSBhX2VuZCAtIGFfc3RhcnQ7XG4gICAgICAgICAgICB2YXIgYl93aG9sZSA9IGJfZW5kIC0gYl9zdGFydDtcblxuICAgICAgICAgICAgdmFyIGFfcGFydCA9IGFfZW5kIC0gYV9wb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciBiX3BhcnQgPSAoYl93aG9sZSAqIGFfcGFydCkgLyBhX3dob2xlO1xuXG4gICAgICAgICAgICByZXR1cm4gKGJfZW5kIC0gYl9wYXJ0KTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFVzZXJQcm9maWxlIHtcbiAgICAgICAgdXNlcm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgc3VybmFtZTogJ3N0cmluZyc7XG4gICAgICAgIGVtYWlsOiAnc3RyaW5nJztcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBVc2VyIHtcblxuXG4gICAgICAgIHByb2ZpbGU6IFVzZXJQcm9maWxlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gdXNlciByYXcgdXNlciBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcih1c2VyOiBVc2VyKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB1c2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gdXNlcltrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgb2YgdXNlcnMgc2lnbmF0dXJlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRTaWduYXR1cmVIVE1MKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUubmFtZSB8fCB0aGlzLnByb2ZpbGUuc3VybmFtZSkge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS5uYW1lICsgJyAnICsgdGhpcy5wcm9maWxlLnN1cm5hbWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBuYW1lID0gdGhpcy5wcm9maWxlLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIGVtYWlsX21kNSA9IG1kNSh0aGlzLnByb2ZpbGUuZW1haWwpO1xuXG5cbiAgICAgICAgICAgIHZhciBzaWduYXR1cmVfaHRtbCA9IGBcblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwidXNlci1pbWFnZVwiIHNyYz1cImh0dHBzOi8vMS5ncmF2YXRhci5jb20vYXZhdGFyL2AgKyBlbWFpbF9tZDUgKyBgP3M9ODAmcj1wZyZkPW1tXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXItc2lnbmF0dXJlLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInVzZXItbmFtZVwiPmAgKyBuYW1lICsgYDwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5gICsgdGhpcy5wcm9maWxlLnNpZ25hdHVyZS5odG1sMnRleHQoKSArIGA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIHJldHVybiAoc2lnbmF0dXJlX2h0bWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC50ZXJyYWluc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbm1vZHVsZSBULldvcmxke1xuXG5cbiAgICBleHBvcnQgdmFyIHRlcnJhaW5zID0gW1xuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDAgLGNvbG9yOiAnIzAwMDAwMCcsIHNpemU6IDF9fSwgbmFtZTogJ3RlbW5vdGEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMSAsY29sb3I6ICcjMzM3RUZBJywgc2l6ZTogMX19LCBuYW1lOiAnbW/FmWUnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMiAsY29sb3I6ICcjNTQ1NDU0Jywgc2l6ZTogMX19LCBuYW1lOiAnZGxhxb5iYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAzICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNCAsY29sb3I6ICcjRjlGOThEJywgc2l6ZTogMX19LCBuYW1lOiAncMOtc2VrJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDUgLGNvbG9yOiAnIzg3ODc4NycsIHNpemU6IDF9fSwgbmFtZTogJ2thbWVuw60nfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNiAsY29sb3I6ICcjNUEyRjAwJywgc2l6ZTogMX19LCBuYW1lOiAnaGzDrW5hJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDcgLGNvbG9yOiAnI0VGRjdGQicsIHNpemU6IDF9fSwgbmFtZTogJ3Nuw61oL2xlZCd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA4ICxjb2xvcjogJyMyQTczMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEobm9ybWFsKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA5ICxjb2xvcjogJyM1MUYzMTEnLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEodG94aWMpJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEwLGNvbG9yOiAnIzUzNTgwNScsIHNpemU6IDF9fSwgbmFtZTogJ2xlcyd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMSxjb2xvcjogJyM2YWEyZmYnLCBzaXplOiAxfX0sIG5hbWU6ICfFmWVrYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMixjb2xvcjogJyM4QUJDMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEoamFybyknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTMsY29sb3I6ICcjOEE5MDAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHBvemltKSd9KVxuICAgIF07XG5cblxufVxuXG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBpbnN0YW5jZSBULldvcmxkLm1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5Xb3JsZHtcblxuICAgIGV4cG9ydCB2YXIgbWFwR2VuZXJhdG9yID0gbmV3IFQuTWFwR2VuZXJhdG9yKFxuXG4gICAgICAgIFQuVE1hdGguYmx1clhZKGZ1bmN0aW9uKHg6IG51bWJlcix5OiBudW1iZXIpe1xuXG4gICAgICAgICAgICAvL3RvZG8vL3ZhciBrZXk9J3gnK3grJ3knK3k7XG4gICAgICAgICAgICAvL3RvZG8vL2lmKHR5cGVvZiB6X21hcF9jYWNoZVtrZXldIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAvL3RvZG8vLyAgICByZXR1cm4oel9tYXBfY2FjaGVba2V5XSk7XG4gICAgICAgICAgICAvL3RvZG8vL31cblxuXG4gICAgICAgICAgICBjb25zdCBkaXY9MTAwO1xuXG5cbiAgICAgICAgICAgIHZhciBuPSAwO1xuICAgICAgICAgICAgdmFyIG1heF9wb3NzaWJsZV9uPTA7XG5cbiAgICAgICAgICAgIHZhciBfeDogbnVtYmVyLF95OiBudW1iZXI7XG5cbiAgICAgICAgICAgIHZhciBrPTAuNDtcbiAgICAgICAgICAgIHZhciBrXz0xLWs7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaT0gMDtpPDExO2krKyl7XG5cbiAgICAgICAgICAgICAgICBuICs9IE1hdGgucm91bmQoTWF0aC5wb3coeCp5LTY2LCAyKSkgJSAoZGl2ICsgMSk7XG5cbiAgICAgICAgICAgICAgICBtYXhfcG9zc2libGVfbis9ZGl2O1xuXG4gICAgICAgICAgICAgICAgLy94PU1hdGguZmxvb3IoeC8zKTtcbiAgICAgICAgICAgICAgICAvL3k9TWF0aC5mbG9vcih5LzMpO1xuICAgICAgICAgICAgICAgIC8vdmFyIHh5ID0gVC5UTWF0aC54eVJvdGF0ZSh4LHksNTcpO1xuICAgICAgICAgICAgICAgIC8veD14eS54O1xuICAgICAgICAgICAgICAgIC8veT14eS55O1xuXG4gICAgICAgICAgICAgICAgX3g9KC15KmspKyh4KmtfKTtcbiAgICAgICAgICAgICAgICBfeT0oeCprKSsoeSprXyk7XG5cbiAgICAgICAgICAgICAgICB4PU1hdGguZmxvb3IoX3gvNCk7XG4gICAgICAgICAgICAgICAgeT1NYXRoLmZsb29yKF95LzQpO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgbj1uL21heF9wb3NzaWJsZV9uO1xuXG4gICAgICAgICAgICBpZihuPDApbi09TWF0aC5mbG9vcihuKTtcbiAgICAgICAgICAgIGlmKG4+MSluLT1NYXRoLmZsb29yKG4pO1xuXG4gICAgICAgICAgICAvL3RvZG8vL3pfbWFwX2NhY2hlW2tleV09bjtcbiAgICAgICAgICAgIHJldHVybihuKTtcblxuICAgICAgICB9LDIpXG4gICAgICAgICxcbiAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAyLDAuMDAwMywwLjAwMDMsMC4wMDA1LDAuMDAwNiwwLjAwMDcsMC4wMDA5LDAuMDAxLDAuMDAxLDAuMDAxLDAuMDAxMiwwLjAwMTQsMC4wMDE1LDAuMDAxNiwwLjAwMjEsMC4wMDI1LDAuMDAzLDAuMDAzMywwLjAwMzQsMC4wMDM3LDAuMDAzOCwwLjAwNDIsMC4wMDQ2LDAuMDA0OSwwLjAwNTcsMC4wMDY1LDAuMDA2OCwwLjAwNzIsMC4wMDc0LDAuMDA3OSwwLjAwODQsMC4wMDksMC4wMDk2LDAuMDEwNSwwLjAxMTUsMC4wMTIzLDAuMDEzMSwwLjAxNDIsMC4wMTQ4LDAuMDE1OSwwLjAxNjYsMC4wMTg0LDAuMDE5LDAuMDIwNCwwLjAyMSwwLjAyMiwwLjAyMzIsMC4wMjQ1LDAuMDI2LDAuMDI2NiwwLjAyNzcsMC4wMjksMC4wMjk3LDAuMDMxLDAuMDMxOCwwLjAzMzEsMC4wMzQ2LDAuMDM2MSwwLjAzNzgsMC4wMzg5LDAuMDQwNCwwLjA0MTQsMC4wNDMxLDAuMDQ1NiwwLjA0NzUsMC4wNTAxLDAuMDUxNywwLjA1MzMsMC4wNTQ4LDAuMDU2NiwwLjA1ODksMC4wNjA5LDAuMDYyMiwwLjA2MzUsMC4wNjU4LDAuMDY3OCwwLjA2OTIsMC4wNzEyLDAuMDczMywwLjA3NTEsMC4wNzc0LDAuMDc5LDAuMDgxMywwLjA4MzcsMC4wODU5LDAuMDg4LDAuMDkwMiwwLjA5MjcsMC4wOTYxLDAuMDk4OCwwLjEwMDMsMC4xMDMxLDAuMTA1LDAuMTA3MSwwLjExLDAuMTExMywwLjExMzcsMC4xMTY1LDAuMTE4NywwLjEyMTgsMC4xMjQzLDAuMTI3NywwLjEyOTcsMC4xMzIzLDAuMTM1MywwLjEzNzEsMC4xMzk1LDAuMTQyNiwwLjE0NDksMC4xNDc0LDAuMTUwOSwwLjE1MzYsMC4xNTYsMC4xNTgyLDAuMTYwNSwwLjE2MzMsMC4xNjYyLDAuMTY5MiwwLjE3MjYsMC4xNzU1LDAuMTc4MSwwLjE4MTMsMC4xODQyLDAuMTg2OSwwLjE4OTksMC4xOTM5LDAuMTk3NSwwLjIwMDEsMC4yMDI5LDAuMjA3LDAuMjEwOCwwLjIxMzUsMC4yMTU4LDAuMjE4NywwLjIyMSwwLjIyMzgsMC4yMjYsMC4yMjgzLDAuMjMyNiwwLjIzNjIsMC4yMzk0LDAuMjQyNywwLjI0NTUsMC4yNDg1LDAuMjUwOCwwLjI1MzIsMC4yNTY4LDAuMjU5NCwwLjI2MjgsMC4yNjUxLDAuMjY3OCwwLjI3MTIsMC4yNzM4LDAuMjc2LDAuMjc5MiwwLjI4MTksMC4yODUyLDAuMjg4NSwwLjI5MDgsMC4yOTQzLDAuMjk2OSwwLjI5OTQsMC4zMDE5LDAuMzA0OSwwLjMwNzcsMC4zMTA4LDAuMzEzNSwwLjMxNjIsMC4zMTk0LDAuMzIxNiwwLjMyNDMsMC4zMjc2LDAuMzMwNywwLjMzMzQsMC4zMzYsMC4zMzg2LDAuMzQyMSwwLjM0NDMsMC4zNDYyLDAuMzQ4NCwwLjM1MSwwLjM1MzUsMC4zNTY5LDAuMzU5MywwLjM2MTgsMC4zNjQyLDAuMzY1OSwwLjM2ODEsMC4zNzA2LDAuMzcyMiwwLjM3NDIsMC4zNzcyLDAuMzc5NCwwLjM4MTYsMC4zODM3LDAuMzg2NSwwLjM4NzksMC4zOTA3LDAuMzkyNSwwLjM5NDcsMC4zOTY3LDAuMzk4NSwwLjM5OTgsMC40MDIxLDAuNDAzNSwwLjQwNTQsMC40MDY3LDAuNDA4OCwwLjQxMDcsMC40MTMzLDAuNDE0MSwwLjQxNjEsMC40MTc3LDAuNDE5MywwLjQyMDksMC40MjE5LDAuNDIzNCwwLjQyNDUsMC40MjY0LDAuNDI4MywwLjQzMDIsMC40MzE4LDAuNDMyNywwLjQzNDYsMC40MzYzLDAuNDM4MSwwLjQ0LDAuNDQwOSwwLjQ0MzUsMC40NDUsMC40NDYyLDAuNDQ4NCwwLjQ0OTIsMC40NTA2LDAuNDUxOCwwLjQ1MzMsMC40NTQ4LDAuNDU1NCwwLjQ1NiwwLjQ1NzMsMC40NTg4LDAuNDYwNSwwLjQ2MTYsMC40NjMsMC40NjM4LDAuNDY1NiwwLjQ2NjMsMC40NjcyLDAuNDY4NCwwLjQ2OTYsMC40NzA4LDAuNDcyMSwwLjQ3MywwLjQ3MzcsMC40NzQ3LDAuNDc1NiwwLjQ3NjUsMC40NzgxLDAuNDc5MSwwLjQ4MDIsMC40ODA5LDAuNDgxOSwwLjQ4MjQsMC40ODMsMC40ODM4LDAuNDg0NywwLjQ4NTksMC40ODY1LDAuNDg3LDAuNDg3NSwwLjQ4ODMsMC40ODk0LDAuNDkwMSwwLjQ5MDcsMC40OTE1LDAuNDkyOSwwLjQ5MzQsMC40OTQsMC40OTQ5LDAuNDk1NSwwLjQ5NiwwLjQ5NjcsMC40OTcxLDAuNDk3NSwwLjQ5ODEsMC40OTksMC40OTk3LDAuNTAwNSwwLjUwMDgsMC41MDE4LDAuNTAyNCwwLjUwMzIsMC41MDM4LDAuNTA0MiwwLjUwNDYsMC41MDUsMC41MDU5LDAuNTA2NywwLjUwNywwLjUwNzQsMC41MDc3LDAuNTA4NCwwLjUwODYsMC41MDk1LDAuNTEwNCwwLjUxMDksMC41MTE3LDAuNTEyMiwwLjUxMjksMC41MTM2LDAuNTE0LDAuNTE0MSwwLjUxNDUsMC41MTUsMC41MTUzLDAuNTE1NywwLjUxNjIsMC41MTY5LDAuNTE3MiwwLjUxNzYsMC41MTgsMC41MTg2LDAuNTE5MywwLjUxOTcsMC41MjAyLDAuNTIwNywwLjUyMDksMC41MjE0LDAuNTIxOCwwLjUyMjMsMC41MjMxLDAuNTIzNywwLjUyNDQsMC41MjQ2LDAuNTI0OSwwLjUyNTksMC41MjYxLDAuNTI2OSwwLjUyNzIsMC41Mjc1LDAuNTI4MSwwLjUyODMsMC41Mjg1LDAuNTI5MSwwLjUzMDIsMC41MzEsMC41MzE3LDAuNTMyLDAuNTMyNiwwLjUzMzQsMC41MzM2LDAuNTM0MSwwLjUzNDMsMC41MzQ1LDAuNTM0OSwwLjUzNTMsMC41MzU3LDAuNTM2NCwwLjUzNzcsMC41MzgyLDAuNTM4OCwwLjUzOTMsMC41Mzk5LDAuNTQwMywwLjU0MTIsMC41NDE5LDAuNTQzLDAuNTQzNywwLjU0NDYsMC41NDU3LDAuNTQ2NiwwLjU0NzYsMC41NDgyLDAuNTQ4NiwwLjU0OTEsMC41NDk1LDAuNTUwMywwLjU1MDYsMC41NTE1LDAuNTUyMiwwLjU1MjcsMC41NTQsMC41NTUsMC41NTUzLDAuNTU1NywwLjU1NjIsMC41NTY5LDAuNTU3OCwwLjU1ODYsMC41NTk1LDAuNTYwOCwwLjU2MTYsMC41NjI2LDAuNTYzNCwwLjU2NDUsMC41NjUyLDAuNTY2NywwLjU2NzMsMC41NjgzLDAuNTY5NywwLjU3MDcsMC41NzIzLDAuNTczOSwwLjU3NSwwLjU3NTgsMC41NzcxLDAuNTc3OSwwLjU3OTEsMC41ODAzLDAuNTgxNywwLjU4MzMsMC41ODQ5LDAuNTg2NSwwLjU4NzYsMC41ODg0LDAuNTg5OSwwLjU5MTksMC41OTI5LDAuNTk0MiwwLjU5NTQsMC41OTY5LDAuNTk4NywwLjU5OTgsMC42MDE4LDAuNjAzNiwwLjYwNTIsMC42MDYzLDAuNjA3NywwLjYwOTksMC42MTE2LDAuNjEzNiwwLjYxNTQsMC42MTY2LDAuNjE4NSwwLjYyMDEsMC42MjIzLDAuNjIzOCwwLjYyNTgsMC42Mjc4LDAuNjI5NSwwLjYzMSwwLjYzMjQsMC42MzQ0LDAuNjM1OCwwLjYzNzIsMC42Mzk1LDAuNjQxNCwwLjY0MzQsMC42NDUxLDAuNjQ3MiwwLjY0OTMsMC42NTEzLDAuNjUzNiwwLjY1NTksMC42NTc4LDAuNjU5OCwwLjY2MjIsMC42NjM4LDAuNjY3LDAuNjY5NiwwLjY3MSwwLjY3NCwwLjY3NjUsMC42NzksMC42ODExLDAuNjgzNiwwLjY4NjEsMC42ODg0LDAuNjkwMywwLjY5MzMsMC42OTQ2LDAuNjk3NiwwLjY5OTcsMC43MDI3LDAuNzA0OSwwLjcwODQsMC43MTA5LDAuNzEyOCwwLjcxNjQsMC43MTg5LDAuNzIyMiwwLjcyNDUsMC43MjcxLDAuNzMwNSwwLjczMjYsMC43MzY3LDAuNzM5OCwwLjc0MjEsMC43NDQzLDAuNzQ2MSwwLjc0ODMsMC43NTA3LDAuNzU0LDAuNzU2NiwwLjc1ODcsMC43NjE1LDAuNzYzOSwwLjc2NjIsMC43NjkzLDAuNzcyMywwLjc3NTMsMC43NzY5LDAuNzc5NywwLjc4MjIsMC43ODQzLDAuNzg2OSwwLjc4OTEsMC43OTE4LDAuNzk0NCwwLjc5ODIsMC44MDEsMC44MDQxLDAuODA2OCwwLjgwOTQsMC44MTIsMC44MTQ4LDAuODE3NCwwLjgyLDAuODIxOSwwLjgyNCwwLjgyNTksMC44Mjg3LDAuODMxMSwwLjgzMzMsMC44MzQ5LDAuODM3NCwwLjg0MSwwLjg0MzMsMC44NDU2LDAuODQ4MSwwLjg1MTgsMC44NTQsMC44NTYyLDAuODU4OCwwLjg2MiwwLjg2NCwwLjg2NjYsMC44NjkzLDAuODcxOSwwLjg3MzcsMC44NzQ5LDAuODc3MywwLjg3OTMsMC44ODE2LDAuODgzOSwwLjg4NywwLjg4ODgsMC44OTA1LDAuODkyNCwwLjg5NDgsMC44OTY2LDAuODk4NiwwLjkwMDksMC45MDI5LDAuOTAzOSwwLjkwNjMsMC45MDgsMC45MDk1LDAuOTExLDAuOTEyNSwwLjkxNSwwLjkxNzMsMC45MTg2LDAuOTIwOSwwLjkyMjgsMC45MjQ5LDAuOTI1OSwwLjkyNywwLjkyOSwwLjkzMDMsMC45MzIyLDAuOTMzMiwwLjkzNDMsMC45MzU2LDAuOTM3MiwwLjkzODcsMC45NDA3LDAuOTQyNywwLjk0NCwwLjk0NTksMC45NDczLDAuOTQ5LDAuOTUwOCwwLjk1MjEsMC45NTMzLDAuOTU1NSwwLjk1NjksMC45NTgsMC45NTkyLDAuOTYwNiwwLjk2MTIsMC45NjE3LDAuOTYyLDAuOTYyNywwLjk2NDIsMC45NjQ2LDAuOTY1OCwwLjk2NywwLjk2OCwwLjk2ODQsMC45Njg4LDAuOTY5OCwwLjk3MDYsMC45NzE5LDAuOTcyNywwLjk3NCwwLjk3NDcsMC45NzYxLDAuOTc3NCwwLjk3ODUsMC45NzkzLDAuOTgwMiwwLjk4MTEsMC45ODE3LDAuOTgyMywwLjk4MjgsMC45ODQsMC45ODQ2LDAuOTg1MSwwLjk4NTgsMC45ODYzLDAuOTg2OSwwLjk4NywwLjk4NzQsMC45ODc5LDAuOTg4NiwwLjk4ODgsMC45ODk1LDAuOTkwMywwLjk5MDQsMC45OTA3LDAuOTkxMiwwLjk5MTMsMC45OTE3LDAuOTkyLDAuOTkyOCwwLjk5MjksMC45OTM2LDAuOTkzOSwwLjk5NDIsMC45OTQ2LDAuOTk0OSwwLjk5NTUsMC45OTU1LDAuOTk1OSwwLjk5NjMsMC45OTY0LDAuOTk2NiwwLjk5NjYsMC45OTY4LDAuOTk2OSwwLjk5NzEsMC45OTczLDAuOTk3OCwwLjk5ODEsMC45OTg1LDAuOTk4NiwwLjk5ODgsMC45OTg4LDAuOTk4OSwwLjk5ODksMC45OTksMC45OTksMC45OTksMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTk2LDAuOTk5NiwwLjk5OTcsMC45OTk3LDAuOTk5NywwLjk5OTgsMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdXG4gICAgICAgICxcblxuICAgICAgICBuZXcgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZShbXG5cbiAgICAgICAgICAgIHsgYW1vdW50OiAxMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyAxXX0sLy9tb8WZZVxuICAgICAgICAgICAgeyBhbW91bnQ6IDQwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTFdfSwvL8WZZWthXG4gICAgICAgICAgICB7IGFtb3VudDogMzAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMl19LC8vdHLDoXZhIGphcm9cbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWyA5XX0sLy90csOhdmEgdG94aWNcbiAgICAgICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWyA4XX0sLy90csOhdmEgbm9ybWFsXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMl19LC8vdHLDoXZhIGphcm9cbiAgICAgICAgICAgIHsgYW1vdW50OiA1MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWyA0XX0sLy9ww61zZWtcbiAgICAgICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzEzXX0sLy90csOhdmEgcG96aW1cbiAgICAgICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWyA1XX0sLy9rYW1lbsOtXG4gICAgICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgM119LC8vc27DrWgvbGVkXG4gICAgICAgICAgICB7IGFtb3VudDogNSAsIHRlcnJhaW46ICAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgN119LC8vc27DrWgvbGVkXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuXG5cblxuICAgICAgICBdKSxcblxuXG4gICAgICAgIGZ1bmN0aW9uKG9iamVjdCx2aXJ0dWFsX29iamVjdHMpe1xuXG4gICAgICAgICAgICBpZihvYmplY3QudHlwZSE9J3RlcnJhaW4nKXJldHVybjtcblxuICAgICAgICAgICAgLyppZihvYmplY3QuZ2V0Q29kZSgpPT01KXtcbiAgICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMucHVzaChcbiAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgIGltYWdlOidyb2NrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDEse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjYpJTYrJ2RhcmsnK01hdGguZmxvb3IoVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMix7eDpvYmplY3QueCx5Om9iamVjdC55fSkqNCklNCxcbiAgICAgICAgICAgICBzaXplOiAwLjUrVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAgfWVsc2UqL1xuICAgICAgICAgICAgaWYob2JqZWN0LmdldENvZGUoKT09MTApe1xuXG4gICAgICAgICAgICAgICAgaWYoVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDMse3g6b2JqZWN0LngseTpvYmplY3QueX0pPjAuOTUpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J3RyZWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMytUTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNix7eDpvYmplY3QueCx5Om9iamVjdC55fSkvMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBUTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMjAtMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSozNjBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgKTtcbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgZXhwb3J0IHZhciBnYW1lID0gbmV3IFQuR2FtZShcbiAgICAgICAgVC5UTWF0aC5wcmV0dHlOdW1iZXIsXG4gICAgICAgIFQuVE1hdGgucHJldHR5TnVtYmVyXG4gICAgKTtcblxufSIsIlxubW9kdWxlIFQuV29ybGQge1xuXG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICAgICAgICBzdHJlbmd0aDogMCxcbiAgICAgICAgICAgIHJvdW5kczogMSxcbiAgICAgICAgICAgIGNvb2xkb3duOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnYXR0YWNrJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3codGhpcy5wYXJhbXMuZGlzdGFuY2UsIDIpICogdGhpcy5wYXJhbXMuc3RyZW5ndGggKiB0aGlzLnBhcmFtcy5yb3VuZHMgKiAoMSAvIHRoaXMucGFyYW1zLmNvb2xkb3duKSkgKiAxMDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDB9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAyfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBzdGF0aWMgZXhlY3V0ZShnYW1lLCBhdHRhY2tlciwgYXR0YWNrZWQsIHJlc291cmNlc19hdHRhY2tlcikge1xuXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyX2RlZmVuY2UgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdhdHRhY2snKTtcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkLmdldEFjdGlvbignZGVmZW5jZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyX2xpZmUgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2xpZmUnKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2xpZmUgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2xpZmUnKS5wYXJhbXM7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWlzc2luZyBhY3Rpb25cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrID0gYXR0YWNrZXJfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0YWNrZXIgaGFzIG5vdCBhYmlsaXR5IHRvIGF0dGFjaycpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyX2RlZmVuY2UgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2UgPSBhdHRhY2tlcl9kZWZlbmNlLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2UgPSBnYW1lLmdldEFjdGlvbkVtcHR5SW5zdGFuY2UoJ2RlZmVuY2UnKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfYXR0YWNrIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2sgPSBhdHRhY2tlZF9hdHRhY2suY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdhdHRhY2snKS5wYXJhbXM7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZF9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlID0gYXR0YWNrZWRfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1EaXN0YW5jZVxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGF0dGFja2VyLmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UoYXR0YWNrZWQuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3RzIGFyZSB0b28gZmFyIC0gJyArIGRpc3RhbmNlICsgJyBmaWVsZHMuIEF0dGFjayBkaXN0YW5jZSBpcyBvbmx5ICcgKyBhdHRhY2tlcl9hdHRhY2suZGlzdGFuY2UgKyAnIGZpZWxkcy4nKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db29sZG93blxuICAgICAgICAgICAgICAgIGlmICghYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkTm93KCkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgYWN0aW9uIGNhbiBiZSBleGVjdXRlZCBpbiAnICsgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkSW4oKSArICcgc2Vjb25kcy4nKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2VcbiAgICAgICAgICAgICAgICBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLm5vd0V4ZWN1dGVkKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVmZW5jZVxuXG4gICAgICAgICAgICAgICAgLy9yKCdhdHRhY2snLGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aCxhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vcignZGVmZW5jZScsYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlLGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZSk7XG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggLT1cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggPCAwKWF0dGFja2VyX2F0dGFjay5zdHJlbmd0aCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCAtPVxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlLmRlZmVuY2U7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCA8IDApYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoID0gMDtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIC8vYXR0YWNrZXJfbGlmZS5saWZlPTEwMDA7XG4gICAgICAgICAgICAgICAgLy9hdHRhY2tlZF9saWZlLmxpZmU9MTAwMDtcblxuXG4gICAgICAgICAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgICAgIChhdHRhY2tlcl9hdHRhY2sucm91bmRzIHx8IGF0dGFja2VkX2F0dGFjay5yb3VuZHMpICYmXG4gICAgICAgICAgICAgICAgKGF0dGFja2VyX2xpZmUubGlmZSA+IDEgJiYgYXR0YWNrZWRfbGlmZS5saWZlID4gMSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcigncm91bmQnLCBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsIGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHIoJ2xpZmUnLCBhdHRhY2tlZF9saWZlLmxpZmUsIGF0dGFja2VyX2xpZmUubGlmZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfbGlmZS5saWZlIC09IGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfbGlmZS5saWZlIC09IGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrLnJvdW5kcy0tO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyX2xpZmUubGlmZSA8IDEpYXR0YWNrZXJfbGlmZS5saWZlID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfbGlmZS5saWZlIDwgMSlhdHRhY2tlZF9saWZlLmxpZmUgPSAxO1xuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmVuY2U6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuZGVmZW5jZSkgKiA4MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDF9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZmU6IDEsXG4gICAgICAgICAgICBtYXhfbGlmZTogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ2xpZmUnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbbmV3IFQuUmVzb3VyY2VzKCldKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICB3b29kOiAwLFxuICAgICAgICAgICAgaXJvbjogMCxcbiAgICAgICAgICAgIGNsYXk6IDAsXG4gICAgICAgICAgICBzdG9uZTogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ21pbmUnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnBhcmFtcy5hbW91bnQpICogMzYwMCAqIDAuMDUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogNH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBvciBtYXliZSBleGVjdXRlXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgc3BlZWQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtb3ZlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsIDIpKSAqIDEwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMX0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgb2JqZWN0LCBkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBhY3Rpb24vL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb24gPSBvYmplY3QuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoID0gVC5QYXRoLm5ld0NvbnN0YW50U3BlZWQoZGVzdGluYXRpb25zLCBhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKS5ub3dFeGVjdXRlZCgpOy8vdG9kbyBpcyBpdCBuZWVkZWRcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBtYXliZSA/Pz8gdG9kb1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdlbmVyYXRlOiAxMDAsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgncmVnZW5lcmF0ZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyB0aGlzLnBhcmFtcy5yZWdlbmVyYXRlKSAqIDM2MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogNH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDJ9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIGV4ZWN1dGUoKXsvL3RvZG8gbWF5YmUgdGljaz8/Pz9cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgcmVwYWlyOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgncmVwYWlyJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoMSAvICh0aGlzLnBhcmFtcy5yZXBhaXIgLyAxMDApKSAqIDEwMDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogNH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDN9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDR9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIGV4ZWN1dGUoKXtcbiAgICAgICAgICAgICAvL3RvZG9cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdWdocHV0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgndGhyb3VnaHB1dCcpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLnRocm91Z2hwdXQgLyAxMDAsIDIpKSAqIDEwICogMC4wNSk7Ly90b2RvXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDN9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAxfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
