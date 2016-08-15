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
 * @author ©Towns.cz
 * @fileOverview Initialize namespace Towns
 */
//======================================================================================================================
var T;
(function (T) {
    var Locale = (function () {
        function Locale() {
        }
        /**
         * Blank emulator of locale object
         * @param locale_keys {Array<string>}
         * @returns {string}
         */
        Locale.get = function () {
            var locale_keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                locale_keys[_i - 0] = arguments[_i];
            }
            return (locale_keys.join(' '));
        };
        return Locale;
    }());
    T.Locale = Locale;
})(T || (T = {}));
/**
 * @author ©Towns.cz
 * @fileOverview Wrapper for console.log
 */
//======================================================================================================================
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
            /*if (object.actions.lenght === 0) {
                console.warn('In object ' + object + ' there are no actions!');//todo all objects should be converted to string like this
            }*/
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
            var type = action_class.prototype.getType();
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
                if (typeof this.getType() === 'undefined') {
                    throw new Error('You must extend T.Game.Action and add method getType before creating instances!');
                }
                var type = this.getType();
                if (action.type !== type) {
                    throw new Error('This is ' + type + ' not ' + action.type + ' class!');
                }
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
            Action.prototype.getType = function () {
                return ('undefined');
            };
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
                this.last_use = new Date() / 1;
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
                if (T.TMath.randomSeedPosition(3, { x: object.x, y: object.y }) > 0.95) {
                    virtual_objects.push({
                        x: object.x,
                        y: object.y,
                        type: 'natural',
                        design: {
                            type: 'natural',
                            data: {
                                model: 'tree',
                                size: 3 + T.TMath.randomSeedPosition(6, { x: object.x, y: object.y }) / 2,
                                rotation: {
                                    x: T.TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                                    y: T.TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                                    z: T.TMath.randomSeedPosition(7, { x: object.x, y: object.y }) * 360
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
            class_1.prototype.getType = function () {
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
            class_2.prototype.getType = function () {
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
            class_3.prototype.getType = function () {
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
            class_4.prototype.getType = function () {
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
            class_5.prototype.getType = function () {
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
            class_6.prototype.getType = function () {
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
            class_7.prototype.getType = function () {
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
            class_8.prototype.getType = function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvY2FsZS50cyIsIjA1LWxvZy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtY29sb3IuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtcG9zaXRpb24tM2QuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wb3NpdGlvbi1wb2xhci5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTUtcG9zaXRpb24tZGF0ZS5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzIwLWFyZWEuY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC10bWF0aC5zdGF0aWMudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUVILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNYLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQyxDQUFDO0FDWnBCOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0FjUDtBQWRELFdBQU8sQ0FBQyxFQUFBLENBQUM7SUFDTDtRQUFBO1FBWUEsQ0FBQztRQVZHOzs7O1dBSUc7UUFDSSxVQUFHLEdBQVY7WUFBVyxxQkFBNEI7aUJBQTVCLFdBQTRCLENBQTVCLHNCQUE0QixDQUE1QixJQUE0QjtnQkFBNUIsb0NBQTRCOztZQUVuQyxNQUFNLENBQUEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEMsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLFFBQU0sU0FZbEIsQ0FBQTtBQUNMLENBQUMsRUFkTSxDQUFDLEtBQUQsQ0FBQyxRQWNQO0FDckJEOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQ05sQzs7O0dBR0c7QUFDSCx3SEFB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QyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7NEJBR3JDLDZCQUE2Qjs0QkFHN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzRCQUVqQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs0QkFDOUIsQ0FBQzs0QkFHRCxVQUFVOzRCQUdWLDZCQUE2Qjs0QkFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBRTlCLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDOzRCQUVyQixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUVKLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLGFBQWE7Z0NBRWpGLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLCtDQUErQztnQ0FFNUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxnQ0FBZ0M7Z0NBRzlJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUVWLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO29DQUN2RyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUVuRSxDQUFDOzRCQUVWLENBQUM7NEJBR0QsZ0NBQWdDOzRCQUVoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQSx3Q0FBd0M7NEJBQ3BGLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQzs0QkFDbEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBRTFELEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUdaLG9CQUFvQjs0QkFHcEIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBeUJuRCxDQUFDO29CQUNMLENBQUM7Z0JBSUwsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFSixNQUFNLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUUxRCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFHcEIsQ0FBQztZQUdELHdIQUF3SDtZQUV4SDs7Ozs7O2VBTUc7WUFDSSxlQUFLLEdBQVosVUFBYSxRQUFRO2dCQUVqQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBRWxCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTNDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBRWpDLDBFQUEwRTtvQkFFMUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBLE9BQU87b0JBR25DLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBR3pCLFdBQVc7b0JBQ1gsc0JBQXNCO29CQUd0QixJQUFJO29CQUNKLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNyQixRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQztvQkFFVCxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO3dCQUdyQyw2QkFBNkI7d0JBRzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNkLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFFakMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQzlCLENBQUM7d0JBR0QsVUFBVTt3QkFFVixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO3dCQUVsQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBRXhDLDZCQUE2Qjs0QkFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBRTlCLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDOzRCQUVyQixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUVKLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLGFBQWE7Z0NBRWpGLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLCtDQUErQztnQ0FFNUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxnQ0FBZ0M7Z0NBRzlJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUVWLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO29DQUN2RyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUVuRSxDQUFDOzRCQUVWLENBQUM7NEJBR0QsZ0NBQWdDOzRCQUVoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFD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LEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUU5QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUVuRCxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29DQUU1QixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO29DQUNoQyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQ0FDNUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFD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LENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztRQUNMLENBQUM7UUFHRDs7O1dBR0c7UUFDSCwyQkFBVyxHQUFYO1lBRUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFD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LElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQztZQUM3SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7WUFDL0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQztZQUM3SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7WUFDNUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO1lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUMsQ0FBQztZQUNwSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7WUFDbkksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO1lBQzFILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMs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QkFBQSxDQUFDLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUFBLENBQUMsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLDJCQUEyQjtZQUMzQixNQUFNLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVkLENBQUMsRUFBQyxDQUFDLENBQUMsRUFFSixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUd2dkssSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUV2QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRyxPQUFPLEVBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1NBSWpELENBQUMsRUFHRixVQUFTLE1BQU0sRUFBQyxlQUFlO1lBRTNCLEVBQUUsQ0FBQSxDQUFD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O29CQUM3QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7aUJBQy9CLENBQUMsQ0FBQztZQUNQLENBQUM7WUFHTCxjQUFDO1FBQUQsQ0F4QkEsQUF3QkMsQ0F4QmEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBd0IxQixDQUNKLENBQUM7SUFFTixDQUFDLEVBakNRLEtBQUssR0FBTCxPQUFLLEtBQUwsT0FBSyxRQWlDYjtBQUFELENBQUMsRUFqQ00sQ0FBQyxLQUFELENBQUMsUUFpQ1AiLCJmaWxlIjoidG93bnMtc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5cbnZhciBUID0ge307XG5tb2R1bGUuZXhwb3J0cyA9ICBUO1xuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFR7XG4gICAgZXhwb3J0IGNsYXNzIExvY2FsZXtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmxhbmsgZW11bGF0b3Igb2YgbG9jYWxlIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gbG9jYWxlX2tleXMge0FycmF5PHN0cmluZz59XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0KC4uLmxvY2FsZV9rZXlzOkFycmF5PHN0cmluZz4pOnN0cmluZ3tcblxuICAgICAgICAgICAgcmV0dXJuKGxvY2FsZV9rZXlzLmpvaW4oJyAnKSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBXcmFwcGVyIGZvciBjb25zb2xlLmxvZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIHIgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgVC5BcnJheUZ1bmN0aW9uc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBmdW5jdGlvbnMgdG8gbWFuaXB1bGF0ZSB3aXRoIGFycmF5LlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBBcnJheUZ1bmN0aW9ucyB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBTZWFyY2hlcyBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEtleSBvZiBvYmplY3Qgd2l0aCB0aGlzIElELCAtMSBpZiBub3QgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZDJpKGFycmF5OiBBcnJheSwgaWQ6c3RyaW5nKTphbnkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKXJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuXG4gICAgICAgIH1cblxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBTZWFyY2hlcyBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvcl9tZXNzYWdlIHdoZW4gaXRlbiBub3QgZXhpc3RzXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE9iamVjdCB3aXRoIHRoaXMgSUQsIG51bGwgaWYgbm90IGV4aXN0XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWQyaXRlbShhcnJheTogQXJyYXksIGlkOiBzdHJpbmcsIGVycm9yX21lc3NhZ2UgPSAnJyk6YW55IHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gYXJyYXlbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBEZWxldGUgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZFJlbW92ZShhcnJheTogQXJyYXksIGlkOiBzdHJpbmcpOmJvb2xlYW4gey8vdG9kbyByZWZhY3RvciB1c2UgdGhpcyBub3Qgc3BsaWNlXG5cbiAgICAgICAgICAgIGZvciAodmFyIGk9MCxsPWFycmF5Lmxlbmd0aDtpPGw7aSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCAyRCBhcnJheVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGl0ZXJhdGUyRChhcnJheTogQXJyYXksIGNhbGxiYWNrOiBGdW5jdGlvbik6dm9pZCB7XG5cbiAgICAgICAgICAgIC8vcihhcnJheSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwLCB5TGVuID0gYXJyYXkubGVuZ3RoOyB5IDwgeUxlbjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIHhMZW4gPSBhcnJheVt5XS5sZW5ndGg7IHggPCB4TGVuOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgICAgICAgICAgICAgLyp0b2RvIHJlZmFjdG9yIHRvIHgseSovXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0gZnJvbVxuICAgICAgICAgKiBAcGFyYW0gdG9cbiAgICAgICAgICogQHJldHVybiB7YXJyYXl9IFJlbW92ZWQgaXRlbXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyByZW1vdmVJdGVtcyhhcnJheTpBcnJheSwgZnJvbTpudW1iZXIsIHRvOm51bWJlcik6QXJyYXkge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBmcm9tIDwgMCA/IGFycmF5Lmxlbmd0aCArIGZyb20gOiBmcm9tO1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKiB0b2RvIHNob3VsZCBpdCBiZSB1bmRlciBULkFycmF5RnVuY3Rpb25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmVjdFxuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBwYXRoXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZmlsdGVyUGF0aChvYmplY3Q6IE9iamVjdCwgcGF0aDogQXJyYXk8c3RyaW5nPiwgc2V0VmFsdWU6IGFueSk6YW55IHtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBmb3IgKHZhciBwYXRoX2kgaW4gcGF0aCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdF9rZXkgPSBwYXRoW3BhdGhfaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocGF0aF9pIDwgcGF0aC5sZW5ndGggLSAxIHx8IHR5cGVvZiBzZXRWYWx1ZSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W29iamVjdF9rZXldID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBLZXkgXFwnJytvYmplY3Rfa2V5KydcXCcgaW4gcGF0aCBpbiBvYmplY3QgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBvYmplY3Rbb2JqZWN0X2tleV07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtvYmplY3Rfa2V5XSA9IHNldFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IGNvbnRhaW5pbmcgb25seSB1bmlxdWUgdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdW5pcXVlKGFycmF5OiBBcnJheSk6QXJyYXkge1xuICAgICAgICAgICAgdmFyIG4gPSB7fSwgciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgblthcnJheVtpXV0gPSBhcnJheTtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBodG1sIHRhYmxlIGZyb20gSlMgYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxfY2xhc3NcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFycmF5MnRhYmxlKGFycmF5OkFycmF5LCBhZGRpdGlvbmFsX2NsYXNzID0gJycpOnN0cmluZyB7XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSAnJztcblxuICAgICAgICAgICAgdmFyIHJvd3MgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY29sc190YWJsZSA9IGFycmF5WzBdLmxlbmd0aDsvL3RvZG8gaXMgaXMgYmVzdCBzb2x1dGlvbj9cblxuXG4gICAgICAgICAgICBodG1sICs9ICc8dGFibGUgY2xhc3M9XCInICsgYWRkaXRpb25hbF9jbGFzcyArICdcIj4nO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcblxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPic7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29scyA9IGFycmF5W3Jvd10ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBjb2xzX3NwYW4gPSBjb2xzX3RhYmxlIC0gY29scztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCA9PSBjb2xzIC0gMSAmJiBjb2xzX3NwYW4gIT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkIGNvbHNwYW49XCInICsgKGNvbHNfc3BhbiArIDEpICsgJ1wiPic7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPic7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBhcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdGQ+JztcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgcmV0dXJuIChodG1sKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogZXh0cmFjdCBrZXlzIGZyb20gQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0S2V5cyhvYmplY3Q6T2JqZWN0KTpBcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIG9iamVjdCkga2V5cy5wdXNoKGspO1xuICAgICAgICAgICAgcmV0dXJuIChrZXlzKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICAvKipcbiAgICAgKiBHYW1lIGNvbmRpdGlvbnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XG5cbiAgICAgICAgcHVibGljIGFjdGlvbl9jbGFzc2VzOk9iamVjdDtcbiAgICAgICAgcHVibGljIGFjdGlvbl9lbXB0eV9pbnN0YW5jZXM6T2JqZWN0O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1heF9saWZlX21vZGlmaWVyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByaWNlX2tleV9tb2RpZmllclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXhfbGlmZV9tb2RpZmllcjpGdW5jdGlvbiwgcHVibGljIHByaWNlX2tleV9tb2RpZmllcjpGdW5jdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzID0ge307XG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXMgPSB7fTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgbnVtYmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3Q6VC5PYmplY3RzLk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSBbXTtcblxuXG4gICAgICAgICAgICAvKmlmIChvYmplY3QuYWN0aW9ucy5sZW5naHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luIG9iamVjdCAnICsgb2JqZWN0ICsgJyB0aGVyZSBhcmUgbm8gYWN0aW9ucyEnKTsvL3RvZG8gYWxsIG9iamVjdHMgc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcgbGlrZSB0aGlzXG4gICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb246YW55KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gTWF0aC5jZWlsKGFjdGlvbi5jb3VudFByaWNlQmFzZSgpKTsvL1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIE5hTiAgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4ocHJpY2VfYmFzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJyArIGFjdGlvbi50eXBlICsgJyBtYWtlcyBwcmljZSBiZXNlIE5hTi4nKTtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VfYmFzZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIG5vbiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChwcmljZV9iYXNlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnICsgYWN0aW9uLnR5cGUgKyAnIHNob3VsZCBub3QgbWFrZSB0aGlzIGFjdGlvbiBuZWdhdGl2ZScpOy8vdG9kbyBtYXliZSBvbmx5IHdhcm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHByaWNlX2Jhc2VzLnB1c2gocHJpY2VfYmFzZSk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2VfYmFzZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gbWF4aW11bSBsaWZlIG9mIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0TWF4TGlmZShvYmplY3Q6VC5PYmplY3RzLk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gcHJpY2VfYmFzZXMucmVkdWNlKGZ1bmN0aW9uIChwdiwgY3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHYgKyBjdjtcbiAgICAgICAgICAgIH0sIDApO1xuXG5cbiAgICAgICAgICAgIHByaWNlX2Jhc2UgPSB0aGlzLm1heF9saWZlX21vZGlmaWVyKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBSZXNvdXJjZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlcyhvYmplY3QpIHtcblxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcblxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VzID0gW107XG5cblxuICAgICAgICAgICAgdmFyIGRlc2lnbl9yZXNvdXJjZXMgPSBvYmplY3QuZ2V0TW9kZWwoKS5hZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCk7XG5cblxuICAgICAgICAgICAgb2JqZWN0LmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uOmFueSwgaTpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmdldFByaWNlUmVzb3VyY2VzKCkuc29ydChmdW5jdGlvbiAoYTphbnksIGI6YW55KSB7Ly90b2RvIGlzIGl0IHNhZmU/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYS5jbG9uZSgpLnNpZ251bSgpKSAtIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShiLmNsb25lKCkuc2lnbnVtKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzID0gcHJpY2VfcmVzb3VyY2VzX2xpc3RbMF0uY2xvbmUoKTtcblxuXG4gICAgICAgICAgICAgICAgcHJpY2VfcmVzb3VyY2VzLm11bHRpcGx5KHByaWNlX2Jhc2VzW2ldKTtcbiAgICAgICAgICAgICAgICBwcmljZXMucHVzaChwcmljZV9yZXNvdXJjZXMpO1xuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBSZXNvdXJjZXMgLSBwcmljZSBvZiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlKG9iamVjdDpULk9iamVjdHMuQXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW1wdHkgcHJpY2UnLHByaWNlKTtcblxuICAgICAgICAgICAgdmFyIHByaWNlcyA9IHRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmljZV8pIHtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJpY2UuYXBwbHkodGhpcy5wcmljZV9rZXlfbW9kaWZpZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBpbnN0YWxsQWN0aW9uQ2xhc3MoYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtczpPYmplY3QsIGFjdGlvbl9jbGFzczphbnkpIHtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmdldFR5cGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiBhY3Rpb24gY2xhc3MgaGFzIG5vIHR5cGUhJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiB0aGVyZSBpcyBhbHJlYWR5IGluc3RhbGxlZCBhY3Rpb24gd2l0aCB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2VtcHR5X2luc3RhbmNlID0gbmV3IGFjdGlvbl9jbGFzcyh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vQWRkaW5nIG1ldGhvZCBjbG9uZSB0byBpbnN0YWxsZWQgYWN0aW9uIGNsYXNzXG4gICAgICAgICAgICBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IGFjdGlvbl9jbGFzcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdID0gYWN0aW9uX2NsYXNzO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW3R5cGVdID0gYWN0aW9uX2VtcHR5X2luc3RhbmNlO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGU6c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25fY2xhc3MgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSArICcuIFRoZXJlIGFyZSBvbmx5IHRoZXNlIGFjdGlvbiB0eXBlczogJyArIFQuQXJyYXlGdW5jdGlvbnMuZ2V0S2V5cyh0aGlzLmFjdGlvbl9jbGFzc2VzKS5qb2luKCcsICcpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGFjdGlvbl9jbGFzcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbmV3QWN0aW9uSW5zdGFuY2UoYWN0aW9uOmFueSkge1xuXG4gICAgICAgICAgICAvL3RvZG8gc29sdmUgZGVmZW5zZSB2cy4gZGVmZW5jZVxuICAgICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnZGVmZW5zZScpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udHlwZSA9ICdkZWZlbmNlJztcbiAgICAgICAgICAgICAgICBhY3Rpb24ucGFyYW1zLmRlZmVuY2UgPSBhY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IGFjdGlvbl9jbGFzcyhhY3Rpb24pO1xuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVBY3Rpb25FeGVjdXRlKGFjdGlvbl90eXBlOnN0cmluZykge1xuXG4gICAgICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKTtcblxuXG4gICAgICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoZ2FtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChleGVjdXRlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZShhY3Rpb25fdHlwZTpzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9pbnN0YW5jZSA9IHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1thY3Rpb25fdHlwZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uX2luc3RhbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoYWN0aW9uX2luc3RhbmNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qZ2V0QWN0aW9uRXhlY3V0ZShhY3Rpb25fa2V5KXtcblxuICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX2tleV07XG5cbiAgICAgICAgIGlmKHR5cGVvZiBhY3Rpb249PSd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gdHlwZSAnK2FjdGlvbl9rZXkrJy4nKTtcblxuICAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG5cblxuICAgICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICB2YXIgYXJncyA9IFtnYW1lXS5wdXNoLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgIHJldHVybiBhY3Rpb24uZXhlY3V0ZV9jYWxsYmFjay5hcHBseSh0aGlzLGFyZ3MpO1xuXG4gICAgICAgICB9O1xuXG5cblxuICAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgICAgICAgfSovXG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZS5BY3Rpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULkdhbWUge1xuXG5cbiAgICBpbnRlcmZhY2UgQWN0aW9uUGFyYW1zT2JqZWN0e1xuICAgICAgICBjb29sZG93bjogbnVtYmVyO1xuICAgIH1cbiAgICBpbnRlcmZhY2UgQWN0aW9uT2JqZWN0e1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIHBhcmFtczogQWN0aW9uUGFyYW1zT2JqZWN0O1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXG5cbiAgICAgICAgcHVibGljIGxhc3RfdXNlOm51bWJlcjtcbiAgICAgICAgcHVibGljIHR5cGU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgcGFyYW1zOkFjdGlvblBhcmFtc09iamVjdDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGFjdGlvbjpBY3Rpb25PYmplY3QpIHtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdldFR5cGUoKSA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgZXh0ZW5kIFQuR2FtZS5BY3Rpb24gYW5kIGFkZCBtZXRob2QgZ2V0VHlwZSBiZWZvcmUgY3JlYXRpbmcgaW5zdGFuY2VzIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0VHlwZSgpO1xuXG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gdHlwZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGlzICcgKyB0eXBlICsgJyBub3QgJyArIGFjdGlvbi50eXBlICsgJyBjbGFzcyEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IGFjdGlvbltrZXldO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgcGFyYW1zXG5cbiAgICAgICAgICAgIC8qZm9yKHZhciBwYXJhbSBpbiBhY3Rpb25BYmlsaXR5LnBhcmFtcyl7XG4gICAgICAgICAgICAgdmFyIHBhcmFtX3R5cGUgPSBhY3Rpb24uYWJpbGl0eV9wYXJhbXNbcGFyYW1dO1xuXG4gICAgICAgICAgICAgaWYodHlwZW9mIGFjdGlvbkFiaWxpdHkucGFyYW1zW3BhcmFtXSE9PXBhcmFtX3R5cGUpe1xuICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW0gJytwYXJhbSsnIHNob3VsZCBiZSAnK3BhcmFtX3R5cGUrJyBpbnN0ZWFkIG9mICcrdHlwZW9mKGFjdGlvbkFiaWxpdHkuYWJpbGl0eV9wYXJhbXNbcGFyYW1dKSsnIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uQWJpbGl0eS50eXBlKTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRUeXBlKCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuICgndW5kZWZpbmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcbiAgICAgICAgICAgIHJldHVybiAoW10pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgZXhlY3V0ZSgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBub3QgZXhlY3V0ZSBwYXNzaXZlIGFjdGlvbi4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluIGhvdyBtYW55IHNlY29uZHMgY2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkP1xuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgY2FuQmVFeGVjdXRlZEluKCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGFyYW1zLmNvb2xkb3duID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RfdXNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzID0gTWF0aC5hYnModGhpcy5sYXN0X3VzZSAtIG5ldyBEYXRlKCkpIC8gMTAwMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5jb29sZG93biA8PSBzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnBhcmFtcy5jb29sZG93biAtIHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZCBub3c/XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgY2FuQmVFeGVjdXRlZE5vdygpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jYW5CZUV4ZWN1dGVkSW4oKSA9PT0gMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgYWN0dWFsIGRhdGUgYXMgZGF0ZSBvZiBleGVjdXRpb24gdGhpcyBhY3Rpb24gaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIG5vd0V4ZWN1dGVkKCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0X3VzZSA9IG5ldyBEYXRlKCkvMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgaHRtbCBwcm9maWxlIG9mIGFjdGlvbiBhYmlsaXR5XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVIdG1sUHJvZmlsZSgpIHtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwiYWN0aW9uLWFiaWxpdHktcHJvZmlsZVwiPic7XG5cbiAgICAgICAgICAgIGh0bWwgKz0gYFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiMlwiPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCB0aGlzLnR5cGUpICsgYDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGFzdF91c2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCAnbGFzdF91c2VkJykgKyBgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIHRoaXMubGFzdF91c2UgKyBgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvciAodmFyIHBhcmFtIGluIHRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsICdhY3Rpb24nLCB0aGlzLnR5cGUsIHBhcmFtKSArIGA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gICsgdGhpcy5wYXJhbXNbcGFyYW1dICsgYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgICAgIHJldHVybiAoaHRtbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwR2VuZXJhdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0WlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB6X25vcm1hbGl6aW5nX3RhYmxlXG4gICAgICAgICAqIEBwYXJhbSB7VC5NYXBHZW5lcmF0b3IuQmlvdG9wZX0gYmlvdG9wZVxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGdldFo6RnVuY3Rpb24sIHB1YmxpYyB6X25vcm1hbGl6aW5nX3RhYmxlOkFycmF5LCBwdWJsaWMgYmlvdG9wZTpBcnJheSwgcHVibGljIHZpcnR1YWxPYmplY3RHZW5lcmF0b3I6RnVuY3Rpb24pIHtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyOm51bWJlciwgcmFkaXVzOm51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDw9IHJhZGl1cyAqIDI7IHkrKykge1xuXG4gICAgICAgICAgICAgICAgbWFwW3ldID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSByYWRpdXMgKiAyOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIHJhZGl1cyArIDEgLyAyLCAyKSA+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5nZXRaKHggLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci54LCB5IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBtYXBbeV1beF0gPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRlcnJhaW5NYXAobWFwOkFycmF5KSB7XG5cbiAgICAgICAgICAgIHZhciBtYXBfYmcgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIGwgPSBtYXAubGVuZ3RoOyB5IDwgbDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2JnW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBsOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcFt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcF9iZ1t5XVt4XSA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbihtYXBbeV1beF0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG1hcF9iZyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcjpudW1iZXIsIHJhZGl1czpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICB2YXIgYm91bmRzID0gMTtcblxuXG4gICAgICAgICAgICB2YXIgel9tYXAgPSB0aGlzLmdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLnRlcnJhaW5NYXAoel9tYXApO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1hcCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcF9hcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheTpBcnJheSwgY2VudGVyX2ludGVnZXI6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihtYXBfYXJyYXlbeV1beF0pID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4obWFwX2FycmF5W3ldW3hdKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC54ID0gY2VudGVyX2ludGVnZXIueCAtIHJhZGl1cyArIHg7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC55ID0gY2VudGVyX2ludGVnZXIueSAtIHJhZGl1cyArIHk7XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UHVyZU1hcChjZW50ZXI6UG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5vdF9jZW50ZXIgPSBmYWxzZSkge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNlbnRlcixub3RfY2VudGVyKTtcblxuICAgICAgICAgICAgdmFyIGNlbnRlcl9pbnRlZ2VyID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoY2VudGVyLngpLFxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoY2VudGVyLnkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAobm90X2NlbnRlcilcbiAgICAgICAgICAgICAgICBub3RfY2VudGVyID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBub3RfY2VudGVyLnggLSBjZW50ZXJfaW50ZWdlci54LFxuICAgICAgICAgICAgICAgICAgICB5OiBub3RfY2VudGVyLnkgLSBjZW50ZXJfaW50ZWdlci55XG4gICAgICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvKnZhciBtYXBfYXJyYXkgPSB0aGlzLmdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG4gICAgICAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLmNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKTsvKiovXG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHZhciB4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCB0Om51bWJlciwgb2JqZWN0Ok9iamVjdDtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPD0gcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8PSByYWRpdXMgKiAyOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIHJhZGl1cyArIDEgLyAyLCAyKSA+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RfY2VudGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSBub3RfY2VudGVyLnggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHkgLSBub3RfY2VudGVyLnkgLSByYWRpdXMgKyAxIC8gMiwgMikgPD1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICB6ID0gdGhpcy5nZXRaKHggLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci54LCB5IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueSk7XG4gICAgICAgICAgICAgICAgICAgIHogPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmJpb3RvcGUuZ2V0WlRlcnJhaW4oeik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0KTtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4odCk7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC54ID0gY2VudGVyX2ludGVnZXIueCAtIHJhZGl1cyArIHg7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC55ID0gY2VudGVyX2ludGVnZXIueSAtIHJhZGl1cyArIHk7XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gb2JqZWN0c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMob2JqZWN0czpBcnJheSkge1xuXG5cbiAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXcgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzXzF4MV9yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3Iob2JqZWN0c18xeDFfcmF3W2ldLCB2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcGxldGUgdGVycmFpbiBhbmQgdmlydHVhbCBvYmplY3RzIGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyIERvbnQgZ2V0IG9iamVjdHMgbmVhciB0aGlzIGNlbnRlci5cbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX19XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDb21wbGV0ZU9iamVjdHMocmVhbF9vYmplY3RzOlQuT2JqZWN0cy5BcnJheSwgY2VudGVyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5hdHVyYWxfb2JqZWN0cyA9IHRydWUsIG5vdF9jZW50ZXIgPSBmYWxzZSkge1xuXG5cbiAgICAgICAgICAgIHZhciBjb21wbGV0ZV9vYmplY3RzID0gdGhpcy5nZXRQdXJlTWFwKGNlbnRlciwgcmFkaXVzLCBub3RfY2VudGVyKTtcblxuXG4gICAgICAgICAgICByZWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAobmF0dXJhbF9vYmplY3RzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gdGhpcy5nZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhjb21wbGV0ZV9vYmplY3RzKTtcblxuICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5NYXBHZW5lcmF0b3Ige1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQmlvdG9wZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodGVycmFpbnMpIHtcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHRlcnJhaW4uYW1vdW50O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdmFyIGZyb20gPSAwO1xuICAgICAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbiAodGVycmFpbikge1xuXG4gICAgICAgICAgICAgICAgdGVycmFpbi5mcm9tID0gZnJvbSAvIHN1bTtcbiAgICAgICAgICAgICAgICBmcm9tICs9IHRlcnJhaW4uYW1vdW50O1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgICAgICB0aGlzLnRlcnJhaW5zID0gdGVycmFpbnM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6XG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFpUZXJyYWluKHo6bnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudGVycmFpbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAgICAgICAgIGlmICh6ID49IHRoaXMudGVycmFpbnNbaV0uZnJvbSkgcmV0dXJuICh0aGlzLnRlcnJhaW5zW2ldLnRlcnJhaW4pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Nb2RlbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgTW9kZWwge1xuXG5cbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgcGFydGljbGVzOkFycmF5O1xuICAgICAgICBwdWJsaWMgcm90YXRpb246bnVtYmVyO1xuICAgICAgICBwdWJsaWMgc2l6ZTpudW1iZXI7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsIGpzb25cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2UgaW4gY2FzZSBvZiBmYWlsXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoanNvbjpPYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqc29uKSA9PSAndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzID0ganNvbi5wYXJ0aWNsZXM7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0ganNvbi5yb3RhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGpzb24uc2l6ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLnJvdGF0aW9uKSA9PSAndW5kZWZpbmVkJyl0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5zaXplKSA9PSAndW5kZWZpbmVkJyl0aGlzLnNpemUgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuTW9kZWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3RhdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkUm90YXRpb25TaXplKHJvdGF0aW9uOm51bWJlciwgc2l6ZTpudW1iZXIpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb24gPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplID0gMTtcblxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiArPSByb3RhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaW1lbnNpb24geCx5LHoseHlcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgcmFuZ2UoZGltZW5zaW9uOnN0cmluZykge1xuXG4gICAgICAgICAgICBpZiAoZGltZW5zaW9uID09ICd4eScpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBULlRNYXRoLnh5MmRpc3QodGhpcy5yYW5nZSgneCcpLCB0aGlzLnJhbmdlKCd5JykgKiB0aGlzLnNpemUpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhciA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cbiAgICAgICAgICAgIHZhciBtYXggPSBmYWxzZSwgbWluID0gZmFsc2UsIG1heF86bnVtYmVyLCBtaW5fOm51bWJlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzTGluZWFyKSB7XG5cblxuICAgICAgICAgICAgICAgIG1pbl8gPSBwYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXTtcbiAgICAgICAgICAgICAgICBtYXhfID0gcGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl0gKyBwYXJ0aWNsZXNMaW5lYXJbaV0uc2l6ZVtkaW1lbnNpb25dO1xuXG4gICAgICAgICAgICAgICAgLy90b2RvIGZlYXR1cmUgcmV2ZXJzZVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heCA9PT0gZmFsc2UpbWF4ID0gbWF4XztcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBmYWxzZSltaW4gPSBtaW5fO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAobWF4XyA+IG1heCltYXggPSBtYXhfO1xuICAgICAgICAgICAgICAgIGlmIChtaW5fIDwgbWluKW1pbiA9IG1pbl87XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKE1hdGguYWJzKG1pbiAtIG1heCkvKnRoaXMuc2l6ZSovKTsvL3RvZG8gcm90YXRpb25cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfelxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZUJ5KG1vdmVfeCA9IDAsIG1vdmVfeSA9IDAsIG1vdmVfeiA9IDApIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICs9IG1vdmVfeDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICs9IG1vdmVfeTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi56ICs9IG1vdmVfejtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBaIG9mIGpvaW5pbmcgbW9kZWxcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAgICAgKi9cbiAgICAgICAgam9pbk1vZGVsWihtb2RlbDpULk1vZGVsLCBtb3ZlX3g6bnVtYmVyLCBtb3ZlX3k6bnVtYmVyKSB7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICAgICAgLy92YXIgIG1vZGVsXz1kZWVwQ29weU1vZGVsKG1vZGVsKTtcbiAgICAgICAgICAgIC8vbW9kZWxfLm1vdmVCeShtb3ZlX3gsbW92ZV95KTsvL3RvZG8gbWF5YmUgZGVsZXRlIG1vdmVCeVxuXG4gICAgICAgICAgICAvL3ZhciBtYXhfej10aGlzLnJhbmdlKCd6Jyk7XG5cblxuICAgICAgICAgICAgdmFyIHRoaXNfbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG4gICAgICAgICAgICB2YXIgbW9kZWxfbGluZWFyX3BhcnRpY2xlcyA9IG1vZGVsLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZXMgPSBbMF07XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXMpIHtcblxuICAgICAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCArPSBtb3ZlX3g7XG4gICAgICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICs9IG1vdmVfeTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlpIGluIHRoaXNfbGluZWFyX3BhcnRpY2xlcykgey8vdG9kbyBtYXliZSBvcHRpbWl6ZSBieSBwcmUtc29ydGluZ1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFBhcnRpY2xlcy5jb2xsaXNpb24yRCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLCBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlcy5wdXNoKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0ucG9zaXRpb24ueiArIHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0uc2l6ZS56KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSBNYXRoLm1heC5hcHBseShNYXRoLCBkaXN0YW5jZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWF4X3o7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEpvaW4gbW9kZWxzIHRvZ2V0aGVyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICovXG4gICAgICAgIGpvaW5Nb2RlbChtb2RlbCwgbW92ZV94LCBtb3ZlX3kpIHsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSB0aGlzLmpvaW5Nb2RlbFoobW9kZWwsIG1vdmVfeCwgbW92ZV95KTtcblxuXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSxcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsKSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzWzFdLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IG1vdmVfeCxcbiAgICAgICAgICAgICAgICB5OiBtb3ZlX3ksXG4gICAgICAgICAgICAgICAgejogbWF4X3pcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy5zaXplID0gMTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVlcCBjb3B5IHRoaXMgYW5kIGNvbnZlcnRzIGxpbmtzIHRvIHJhdyBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWVwQ29weVdpdGhvdXRMaW5rcygpIHtcblxuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNsb25lKCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBsaW5rcyB0byByYXcgZGF0YVxuXG5cbiAgICAgICAgICAgIHZhciBmaW5kUGFydGljbGVCeU5hbWUgPSBmdW5jdGlvbiAocGFydGljbGVzLCBuYW1lKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluZGVkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkX3BhcnRpY2xlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZmluZGVkX3BhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXNMaW5rcyA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuXG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5MaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLmxpbmspICE9ICd1bmRlZmluZWQnKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShtb2RlbC5wYXJ0aWNsZXMsIHBhcnRpY2xlc1tpXS5saW5rKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZF9wYXJ0aWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluayAnICsgcGFydGljbGUubGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGlua2VkX3BhcnRpY2xlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnJvdGF0aW9uKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlc1tpXS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnNpemUpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZXNbaV0uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBvc2l0aW9uKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5wb3NpdGlvbiA9IHBhcnRpY2xlc1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbyBza2V3XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzW2ldID0gbGlua2VkX3BhcnRpY2xlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBhcnRpY2xlcykgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGlua3MocGFydGljbGVzW2ldLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcGFydGljbGVzTGlua3MobW9kZWwucGFydGljbGVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAxRCBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICAgICAqL1xuICAgICAgICBnZXRMaW5lYXJQYXJ0aWNsZXMoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSA9IGZhbHNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhciA9IFtdO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgcGFydGljbGVzIHRvIDFEIHBhcnRpY2xlc1xuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzMkxpbmVhciA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMsIHBvc2l0aW9uLCByb3RhdGlvbiwgc2l6ZSkgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcG9zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplID0gMTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgejogMFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcGFydGljbGU9ZGVlcENvcHkocGFydGljbGUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5EZWZhdWx0IHBhcmFtcyBvZiBwYXJ0aWNsZSwgZ3JvdXAgb3IgbGlua1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnRpY2xlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgejogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnJvdGF0aW9uKSA9PSAndW5kZWZpbmVkJylwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUuc2l6ZSkgPT0gJ3VuZGVmaW5lZCcpcGFydGljbGUuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Qb3NpdGlvbiwgUm90YXRpb24gYW5kIHNpemUgLy90b2RvIHNrZXdcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdERlZyA9IFQuVE1hdGgueHkyZGlzdERlZyhwYXJ0aWNsZS5wb3NpdGlvbi54LCBwYXJ0aWNsZS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgICAgICAgICBkaXN0RGVnLmRpc3QgPSBkaXN0RGVnLmRpc3QgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBkaXN0RGVnLmRlZyArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeHkgPSBULlRNYXRoLmRpc3REZWcyeHkoZGlzdERlZy5kaXN0LCBkaXN0RGVnLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucm90YXRpb24gKz0gcm90YXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHh5Lng7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB4eS55O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gcGFydGljbGUucG9zaXRpb24ueiAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogKz0gcG9zaXRpb24uejtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNpemUgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlLnNpemUgKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueCA9IHBhcnRpY2xlLnNpemUueCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnkgPSBwYXJ0aWNsZS5zaXplLnkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS56ID0gcGFydGljbGUuc2l6ZS56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGFydGljbGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIocGFydGljbGUucGFydGljbGVzLCBwYXJ0aWNsZS5wb3NpdGlvbiwgcGFydGljbGUucm90YXRpb24sIHBhcnRpY2xlLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUuc2hhcGUpICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmVhci5wdXNoKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcblxuICAgICAgICAgICAgaWYgKGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemUpIHtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLCBmYWxzZSwgMCwgMSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMyTGluZWFyKG1vZGVsLnBhcnRpY2xlcywgZmFsc2UsIG1vZGVsLnJvdGF0aW9uLCBtb2RlbC5zaXplKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vdG9kbyBzdHJpY3QgbW9kZS8vZGVsZXRlIG1vZGVsO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc0xpbmVhcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUGF0aChwYXRoKSB7XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGF0aC5mb3JFYWNoKSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHIocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gbW9kZWwucGFydGljbGVzW2ldO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUGF0aFNpYmxpbmdzKHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBtb2RlbDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwYXRoLmZvckVhY2gpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZV9pLCBwYXRoX2lpKSB7XG5cbiAgICAgICAgICAgICAgICAvKmlmKHBhdGhfaWk8cGF0aC5sZW5ndGgtMSl7XG5cbiAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICAgICAgIH1lbHNleyovXG5cbiAgICAgICAgICAgICAgICB2YXIgbWUgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQucGFydGljbGVzID0gW21lXTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtZTtcbiAgICAgICAgICAgICAgICAvL31cblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChtb2RlbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZ3JlZ2F0ZSB2b2x1bWUgb2YgZWFjaCByZXNvdXJjZSB1c2VkIGluIG1vZGVsXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKSB7XG5cblxuICAgICAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcblxuXG4gICAgICAgICAgICB2YXIgbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lYXJfcGFydGljbGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2b2x1bWUgPS8vdG9kbyBhbGwgc2hhcGVzXG4gICAgICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnggKlxuICAgICAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS55ICpcbiAgICAgICAgICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlLnNpemUuejtcblxuICAgICAgICAgICAgICAgIHZhciBtYXRlcmlhbCA9IGxpbmVhcl9wYXJ0aWNsZS5tYXRlcmlhbC5zcGxpdCgnXycpO1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbWF0ZXJpYWxbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfID0ge307XG4gICAgICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXSA9IHZvbHVtZTtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLypjb25zb2xlLmxvZygncHJpY2Ugb2YnKTtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByaWNlKTsqL1xuXG4gICAgICAgICAgICAvL3ByaWNlLm11bHRpcGx5KDAuMDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEhhc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3h4eCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIFRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTW9kZWwuUGFydGljbGVzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk1vZGVsIHtcblxuXG4gICAgLyoqXG4gICAgICogTW9kZWwgUGFydGljbGVzXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGVcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpIHsvL3RvZG8gPz8gbWF5YmUgcmVuYW1lXG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcueiA9IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLnRvcCA9IDE7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2hhcGUuYm90dG9tID0gMTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnJvdGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgc3RhdGljIGdldFRyaWFuZ2xlcyhwYXJ0aWNsZSwgcG9pbnRfY2xhc3MpIHtcblxuICAgICAgICAgICAgdmFyIHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMuYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgICAgICB2YXIgeCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgICAgIHZhciB4XyA9IHBhcnRpY2xlLnNpemUueDtcbiAgICAgICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICAgICAgdmFyIHhfXywgeV9fLCB6X187XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGV2ZWwgPSAwOyBsZXZlbCA8IDI7IGxldmVsKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS5ib3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5UTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5UTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgcG9pbnRfY2xhc3MoeF9fLCB5X18sIHpfXykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgM0QgbW9kZWwgZnJvbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBkZXByZWNhdGVkXG4gICAgICAgICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0M0QocGFydGljbGUpIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0ge307XG5cbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnR5cGUgPT0gJ3ByaXNtJykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgICAgIHZhciB5XyA9IHBhcnRpY2xlLnNpemUueTtcbiAgICAgICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cblxuICAgICAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMgPSBbW10sIFtdXTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEID0gW1tdLCBbXV07XG4gICAgICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXMocGFydGljbGUuc2hhcGUucm90YXRlZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeF8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSB6XyAqIGxldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpOy8vK3lfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueSksXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIHRtcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuVE1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5XyA9IFQuVE1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IHh5Xy55O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiovXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAyRCBsaW5lcyBmcm9tIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIDA9Ym90dG9tLCAxPXRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gMkQgbGluZXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQyRGxpbmVzKHBhcnRpY2xlLCBiYXNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5nZXQzRChwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIHZhciBsaW5lcyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgcG9seWdvbnMyRCA9IFtyZXNvdXJjZS5wb2x5Z29uczJEW2Jhc2VdXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcG4gaW4gcG9seWdvbnMyRCkge1xuXG4gICAgICAgICAgICAgICAgLypsaW5lc1twbl09W107XG5cbiAgICAgICAgICAgICAgICAgZm9yKHZhciBwdCBpbiByZXNvdXJjZS5wb2x5Z29uc1twbl0pIHtcblxuICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSByZXNvdXJjZS5wb2ludHNbcmVzb3VyY2UucG9seWdvbnNbcG5dW3B0XSAtIDFdO1xuICAgICAgICAgICAgICAgICBsaW5lc1twbl1bcHNdID0gW3BvaW50WzBdLCBwb2ludFsxXV07XG5cbiAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQxLCBwb2ludDI7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gLTEsIGwgPSBwb2x5Z29uczJEW3BuXS5sZW5ndGg7IGkgPCBsIC0gMTsgaSsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGwgLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSBpICsgMTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vcihyZXNvdXJjZS5wb2x5Z29uc1twbl0scG9pbnQxKTtcblxuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQyXSAtIDFdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQxWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDJbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9yKGxpbmVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIChsaW5lcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy90b2RvIG1heWJlIHJlZmFjdG9yIG1vdmUgdG8gTWF0aFxuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgMkQgbGluZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBsaW5lczFcbiAgICAgICAgICogQHBhcmFtIChhcnJheSkgbGluZXMyXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaTEgaW4gbGluZXMxKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaTIgaW4gbGluZXMyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS55XG4gICAgICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcignY29sbGlzaW9uMkQgaXMgdHJ1ZScsIHBhcnRpY2xlMSwgcGFydGljbGUyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiBwYXJ0aWNsZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAgICAgKiBAcGFyYW0gKG9iamVjdCkgcGFydGljbGUyIHRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNvbGxpc2lvbjJEKHBhcnRpY2xlMSwgcGFydGljbGUyKSB7XG5cblxuICAgICAgICAgICAgdmFyIGxpbmVzMSA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMSwgMSk7XG4gICAgICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29ybmVyIGNvbGxpc2lvblxuXG5cbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgIGlmICghY29sbGlzaW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgayA9IDEwMDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ZXIsIGlubmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl94ID0gaW5uZXJbMV0ueCAtIGlubmVyWzBdLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3kgPSBpbm5lclsxXS55IC0gaW5uZXJbMF0ueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnkgLT0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS54ICs9IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjEgPSBbaW5uZXIxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMiA9IFtpbm5lcjJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24yID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMiwgb3V0ZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaXNpb24xICYmIGNvbGxpc2lvbjIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0oKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiovXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERFxuICAgICAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgICAgIHZhciBzcmM9Y3JlYXRlQ2FudmFzVmlhRnVuY3Rpb25BbmRDb252ZXJ0VG9TcmMoXG4gICAgICAgICAgICAgc2l6ZSoyLHNpemUqMixmdW5jdGlvbihjdHgpe1xuXG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlV2lkdGggPSAyO1xuXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVzXz1bbGluZXMxLGxpbmVzMl07XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbGluZXNfKXtcblxuICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0gMCxsPWxpbmVzX1trZXldLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGxpbmVzX1trZXldW2ldWzBdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVswXS55K3NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKGxpbmVzX1trZXldW2ldWzFdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVsxXS55K3NpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsvKiovXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5BcnJheVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbi8vdG9kbyBULk9iamVjdHMuQXJyYXkgPSBjbGFzcyBleHRlbmRzIEFycmF5e1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQXJyYXkge1xuXG5cbiAgICAgICAgcHVibGljIG9iamVjdHM6T2JqZWN0cztcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gb2JqZWN0c1xuICAgICAgICAgKiB0b2RvID8/Pz8/Pz8/PyBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdHM9W10pIHtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBbGwoKTpBcnJheSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXIoY2FsbGJhY2spOlQuT2JqZWN0cy5BcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICAvL3IoZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzKTtcblxuICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzID0gdGhpcy5vYmplY3RzLmZpbHRlcihjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHVzaCBuZXcgb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBwdXNoKG9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5wdXNoKFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBvciBwdXNoIG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldEJ5SWQob2JqZWN0LmlkLCBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdnZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZClyZXR1cm4gdGhpcy5vYmplY3RzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0QnlJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignc2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0gPSBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSWQoaWQsIG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJUeXBlcyguLi50eXBlcykge1xuXG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2Yob2JqZWN0LnR5cGUpID09IC0xKXJldHVybjtcblxuICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclJhZGl1cyhjZW50ZXIsIHJhZGl1cykge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShjZW50ZXIpIDw9IHJhZGl1cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZmlsdGVyQXJlYShhcmVhOkFyZWEpIHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJlYS5pc0NvbnRhaW5pbmcob2JqZWN0LmdldFBvc2l0aW9uKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cykgey8vdG9kbyBtYXliZSByZWZhY3RvciB0byBnZXRUZXJyYWluQ29kZXMyREFycmF5IG9yIGdldFRlcnJhaW5Db2Rlc01hcFxuXG4gICAgICAgICAgICAvKnZhciByYWRpdXMgPSBzaXplLzI7XG4gICAgICAgICAgICAgdmFyIGNlbnRlciA9e1xuICAgICAgICAgICAgIHg6IHRvcGxlZnQueCtyYWRpdXMsXG4gICAgICAgICAgICAgeTogdG9wbGVmdC55K3JhZGl1c1xuICAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3JlYXRlIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB2YXIgbWFwX2FycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCk7Ly8uc2xpY2UoKS5yZXZlcnNlKCk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkgey8vdG9kbyBpcyB0aGlzIG9wdGltYWxpemF0aW9uIGVmZmVjdGl2ZT9cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA8IHJhZGl1cyAqIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPCByYWRpdXMgKiAyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgLSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4YyA9IG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5YyA9IG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXM7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcF9hcnJheVt5XVt4XSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLnh5MmRpc3QoeCAtIHhjLCB5IC0geWMpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gb2JqZWN0LmdldENvZGUoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gbWFwX2FycmF5O1xuXG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIGdldE1hcE9mQ29sbGlzaW9ucyhjZW50ZXIsIHJhZGl1cyl7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1UZXJyYWluc1xuICAgICAgICAgICAgdmFyIG1hcF9vZl90ZXJyYWluX2NvZGVzID0gdGhpcy5nZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXBfb2ZfY29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgeCx5O1xuXG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoWzEsNSwxMV0uaW5kZXhPZihtYXBfb2ZfdGVycmFpbl9jb2Rlc1t5XVt4XSkhPT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV1beF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tT2JqZWN0c1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG5cbiAgICAgICAgICAgICAgICBpZihvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnICYmIG9iamVjdC5zdWJ0eXBlID09ICd3YWxsJyl7fWVsc2V7cmV0dXJuO31cblxuICAgICAgICAgICAgICAgIHZhciB4PU1hdGgucm91bmQob2JqZWN0LngpLU1hdGgucm91bmQoY2VudGVyLngtKHJhZGl1cykpO1xuICAgICAgICAgICAgICAgIHZhciB5PU1hdGgucm91bmQob2JqZWN0LnkpLU1hdGgucm91bmQoY2VudGVyLnktKHJhZGl1cykpO1xuXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgrMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgtMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeSsxfSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeS0xfVxuXG4gICAgICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHBfKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocF8ueD49MCAmJiBwXy55Pj0wICYmIHBfLng8cmFkaXVzKjIgJiYgcF8ueTxyYWRpdXMqMil7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1twXy55XVtwXy54XT0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuKG1hcF9vZl9jb2xsaXNpb25zKTtcblxuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQxeDFUZXJyYWluT2JqZWN0cygpIHtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKS5zbGljZSgpLnJldmVyc2UoKTsvL25vcm1hbCBBcnJheVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgYmxvY2tlZF9wb3NpdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3RfMXgxLCBrZXk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCkgKyAneScgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeF90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC54eTJkaXN0KHgsIHkpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEuZGVzaWduLmRhdGEuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueCA9IE1hdGgucm91bmQob2JqZWN0XzF4MS54ICsgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueSA9IE1hdGgucm91bmQob2JqZWN0XzF4MS55ICsgeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgb2JqZWN0XzF4MS54ICsgJ3knICsgb2JqZWN0XzF4MS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIHRlcnJhaW5fb2JqZWN0c18xeDE7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0VGVycmFpbk9uUG9zaXRpb24ocG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5vYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS50eXBlICE9ICd0ZXJyYWluJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5kZXNpZ24uZGF0YS5zaXplIDw9IHBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LCB0aGlzLm9iamVjdHNbaV0ueSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobnVsbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldE5lYXJlc3RUZXJyYWluUG9zaXRpb25XaXRoQ29kZShwb3NpdGlvbiwgdGVycmFpbl9jb2RlKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gdGhpcy5nZXQxeDFUZXJyYWluT2JqZWN0cygpO1xuXG4gICAgICAgICAgICB2YXIgbWluX2Rpc3RhbmNlID0gLTE7XG4gICAgICAgICAgICB2YXIgbmVhcmVzdF90ZXJyYWluXzF4MSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW5fMXgxKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmIChtaW5fZGlzdGFuY2UgPT09IC0xIHx8IG1pbl9kaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0X3RlcnJhaW5fMXgxID0gdGVycmFpbl8xeDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfdGVycmFpbl8xeDEgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qXG5cbiAgICAgICAgIGdldE1hcE9mQ29sbGlzaW9uQ29kZXMocmVhbF9vYmplY3RzLHBvc2l0aW9uKXtcbiAgICAgICAgIHJldHVybiBUZXJyYWluO1xuICAgICAgICAgfTtcblxuICAgICAgICAgKi9cblxuXG4gICAgfVxuXG59XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuT2JqZWN0XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBuYW1lOnN0cmluZztcbiAgICAgICAgcHVibGljIGFjdGlvbnM6QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc19rZXkgPT0gJ19pZCcpdGhpc19rZXkgPSAnaWQnOy8vdG9kbyBtYXliZSBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGluaXQob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmKG9iamVjdCBpbnN0YW5jZW9mIFQuT2JqZWN0cy5PYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT0gJ2J1aWxkaW5nJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5CdWlsZGluZyhvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICd0ZXJyYWluJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3N0b3J5Jykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5TdG9yeShvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICduYXR1cmFsJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5OYXR1cmFsKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBwdXQgaXRlbSBpbnRvIFRvd25zIE9iamVjdHMgQXJyYXkgYmVjYXVzZSBvZiB1bnJlY29nbml6ZWQgb2JqZWN0IHR5cGUgJyArIG9iamVjdC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKTpQb3NpdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gKCdbJyArIHRoaXMubmFtZSArICddJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5CdWlsZGluZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgQnVpbGRpbmcgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduOiBPYmplY3Q7XG4gICAgICAgIHB1YmxpYyBhY3Rpb25zOiBBcnJheTtcbiAgICAgICAgcHVibGljIHBhdGg6IFBhdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICAgICAgc3VwZXIob2JqZWN0KTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3NlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNfY2xhc3Nlcy5wdXNoKFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh0aGlzLmFjdGlvbnNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9uc19jbGFzc2VzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcih0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aCA9IG5ldyBULlBhdGgoLi4udGhpcy5wYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB2YXIgbGlmZV9hY3Rpb24gPSB0aGlzLmdldEFjdGlvbignbGlmZScpO1xuICAgICAgICAgICAgdmFyIG1heF9saWZlID0gVC5Xb3JsZC5nYW1lLmdldE9iamVjdE1heExpZmUodGhpcyk7XG5cblxuICAgICAgICAgICAgaWYgKGxpZmVfYWN0aW9uID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbiA9IFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaWZlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWZlOiBtYXhfbGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heF9saWZlOiBtYXhfbGlmZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2gobGlmZV9hY3Rpb24pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGlmZV9hY3Rpb24ucGFyYW1zLm1heF9saWZlID0gbWF4X2xpZmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBvc2l0aW9uKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguY291bnRQb3NpdGlvbihkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZyhkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguaW5Qcm9ncmVzcyhkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuQnVpbGRpbmcoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk1vZGVsfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9kZWwoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmRlc2lnbi5kYXRhIGluc3RhbmNlb2YgVC5Nb2RlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lnbi5kYXRhID0gbmV3IFQuTW9kZWwodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYWN0aW9uX3R5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuR2FtZS5BY3Rpb25BYmlsaXR5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QWN0aW9uKGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uc1tpXS50eXBlID09IGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFjdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY3JlYXRlSHRtbFByb2ZpbGUoKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25zX3Byb2ZpbGUgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNfcHJvZmlsZSArPSB0aGlzLmFjdGlvbnNbaV0uY3JlYXRlSHRtbFByb2ZpbGUoKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGBcblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdC1idWlsZGluZy1wcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICA8aDI+YCArIHRoaXMubmFtZSArIGA8L2gyPlxuICAgICAgICAgICAgICAgIGAgKyB0aGlzLmdldFBvc2l0aW9uKCkgKyBgXG5cblxuICAgICAgICAgICAgICAgIGAgKyBhY3Rpb25zX3Byb2ZpbGUgKyBgXG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICBgKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk5hdHVyYWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTmF0dXJhbCBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ246T2JqZWN0O1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLk5hdHVyYWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeSBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBjb250ZW50O1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlN0b3J5KEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRNYXJrZG93bigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jb250ZW50LmRhdGEpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVycmFpbiBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG5cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuVGVycmFpbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKHByZWZlcmVkX3dpZHRoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29sb3IoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5jb2xvcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGdldEltYWdlKCl7fVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkNvbG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hpY2ggcmVwcmVzZW50cyBSR0JBIGNvbG9yLlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSByIHJlZCBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBnIGdyZWVuIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGIgYmx1ZSBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBhIGFscGhhIGZyb20gMCB0byAyNTVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByOiBudW1iZXIscHVibGljIGc6IG51bWJlcixwdWJsaWMgYjogbnVtYmVyLHB1YmxpYyBhID0gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBkZWVwIGNsb25lIG9kIFQuQ29sb3JcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOkNvbG9ye1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih0aGlzLnIsdGhpcy5nLHRoaXMuYix0aGlzLmEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVwYWlycyBvdmVyZmxvd2VkIGNvbG9yc1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgYm91bmRzKCkge1xuXG4gICAgICAgICAgICB0aGlzLnIgPSBNYXRoLnJvdW5kKHRoaXMucik7XG4gICAgICAgICAgICB0aGlzLmcgPSBNYXRoLnJvdW5kKHRoaXMuZyk7XG4gICAgICAgICAgICB0aGlzLmIgPSBNYXRoLnJvdW5kKHRoaXMuYik7XG4gICAgICAgICAgICB0aGlzLmEgPSBNYXRoLnJvdW5kKHRoaXMuYSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnIgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5yIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZyA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYiA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYSA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmEgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBjc3MgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBlZy4gcmdiKDEwMCwyMDAsMjAwKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q3NzQ29sb3IoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hID09IDI1NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcpJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9yKCdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYS8yNTUqMTAwKS8xMDAgKyAnKScpO1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnLCAnICsgTWF0aC5yb3VuZCh0aGlzLmEgLyAyNTUgKiAxMDApIC8gMTAwICsgJyknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGhleCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yIChpZ25vcmVzIGFscGhhIGNoYW5lbC4pXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiAjMDBmZjAwXG4gICAgICAgICAqL1xuICAgICAgICBnZXRIZXgoKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kcygpO1xuICAgICAgICAgICAgcmV0dXJuICcjJyArICgoMSA8PCAyNCkgKyAodGhpcy5yIDw8IDE2KSArICh0aGlzLmcgPDwgOCkgKyB0aGlzLmIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgbmV3IFQuQ29sb3IgZm9ybSBoZXggY29kZSBvZiBjb2xvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4IGNvZGUgb2YgY29sb3IgZWcuICMwMGZmMDBcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9IENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY3JlYXRlRnJvbUhleChoZXg6IHN0cmluZyk6IENvbG9yIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdDpDb2xvciAsIHNob3J0aGFuZFJlZ2V4OiBSZWdFeHAsIHJlc3VsdFJlZ2V4OiBSZWdFeHBFeGVjQXJyYXk7XG5cbiAgICAgICAgICAgIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKHNob3J0aGFuZFJlZ2V4LCBmdW5jdGlvbiAobSwgciwgZywgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdFJlZ2V4ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0UmVnZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFsxXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFszXSwgMTYpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNyZWF0aW5nIFQuQ29sb3IgZnJvbSAnICsgaGV4KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUGF0aFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFR7XG5cbiAgICBleHBvcnQgY2xhc3MgUGF0aCB7XG5cbiAgICAgICAgcHVibGljIGFycmF5X3Bvc2l0aW9uX2RhdGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7Li4uVC5Qb3NpdGlvbkRhdGV9IFBvc2l0aW9uIHdpdGggZGF0ZSBhdCBsZWFzdCAyXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cblxuICAgICAgICAgICAgLy90b2RvIG1heWJlLy9pZihhcmdzLmxlbmd0aD09PTEgJiYgYXJncyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3NbMF07XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL31lbHNle1xuICAgICAgICAgICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJncztcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfVxuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhcmUgbXVzdCBiZSBhdCBsZWFzdCAyIHBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGguJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGU6IFBvc2l0aW9uRGF0ZSwgbGFzdF9kYXRlID0gLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb25EYXRlKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0gPSBuZXcgVC5Qb3NpdGlvbkRhdGUodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBQYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoIG11c3QgYmUgVC5Qb3NpdGlvbkRhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdF9kYXRlID49IHBvc2l0aW9uX2RhdGUuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVzIHNob3VsZCBiZSBjb25zZWN1dGl2ZSB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggKCcgKyBwb3NpdGlvbl9kYXRlLmRhdGUgKyAnIHNob3VsZCBiZSBhZnRlciAnICsgbGFzdF9kYXRlICsgJykuICcgKyB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0X2RhdGUgPSBwb3NpdGlvbl9kYXRlLmRhdGUvMTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheS48VC5Qb3NpdGlvbj59IGFycmF5X3Bvc2l0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUGF0aH1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uOiBBcnJheSwgc3BlZWQ6IG51bWJlciwgZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApOiBQYXRoIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05hTihzcGVlZCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHZhbGlkIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVlZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHBvc2l0aXZlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXJyYXlfcG9zaXRpb24ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhcmUgbXVzdCBiZSBhdCBsZWFzdCAyIHBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGguJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcnJheV9wb3NpdGlvbl9kYXRlID0gW1xuICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvblswXS54LCBhcnJheV9wb3NpdGlvblswXS55LCBkYXRlKVxuICAgICAgICAgICAgXTtcblxuXG4gICAgICAgICAgICB2YXIgbGFzdF9wb3NpdGlvbiA9IGFycmF5X3Bvc2l0aW9uWzBdO1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBkaXN0YW5jZTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcnJheV9wb3NpdGlvbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbGFzdF9wb3NpdGlvbi5nZXREaXN0YW5jZShwb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSAvIDEgKyBkaXN0YW5jZSAvIHNwZWVkICogMTAwMCk7XG5cblxuICAgICAgICAgICAgICAgIGxhc3RfcG9zaXRpb24gPSBwb3NpdGlvbl9kYXRlO1xuXG5cbiAgICAgICAgICAgICAgICBhcnJheV9wb3NpdGlvbl9kYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LCBhcnJheV9wb3NpdGlvbltpXS55LCBkYXRlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3JldHVybiBuZXcgdGhpcy5hcHBseSh0aGlzLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUGF0aCguLi5hcnJheV9wb3NpdGlvbl9kYXRlKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldFBvc2l0aW9ucygpIHtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ocG9zaXRpb25zKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50IGluIHdoaWNoIHNlZ21lbnQgaXMgVC5QYXRoIHByb2dyZXNzXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNlZ21lbnQoZGF0ZTogbnVtYmVyIHwgRGF0ZSkge1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIEE6IFBvc2l0aW9uRGF0ZSwgQjpQb3NpdGlvbkRhdGUsIHg6IG51bWJlciwgeTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZGF0ZSAvIDE7XG4gICAgICAgICAgICAgICAgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpICsgMV0uZGF0ZSAvIDE7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGkrJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcblxuICAgICAgICAgICAgICAgIGlmIChBIDw9IGRhdGUgJiYgQiA+IGRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCc8LS0tdGhpcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNvdW50aW5nIHNlZ21lbnQgaW4gVC5QYXRoLCBtYXliZSBiZWNhdXNlIG9mIHBhcmFtIGRhdGUgaXMgJyArIGRhdGUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcG9zaXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50UG9zaXRpb24oZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluIHByb2dyZXNzXG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gdGhpcy5jb3VudFNlZ21lbnQoZGF0ZSk7XG5cbiAgICAgICAgICAgIHZhciBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnRdO1xuICAgICAgICAgICAgdmFyIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudCArIDFdO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKChBLWRhdGUpKycgLSAnKyhCLWRhdGUpKTtcblxuICAgICAgICAgICAgdmFyIHggPSBULlRNYXRoLnByb3BvcnRpb25zKEEuZGF0ZSAvIDEsIGRhdGUgLyAxLCBCLmRhdGUgLyAxLCBBLngsIEIueCk7XG4gICAgICAgICAgICB2YXIgeSA9IFQuVE1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueSwgQi55KTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih4LCB5KSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHJvdGF0aW9uIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFJvdGF0aW9uKGRhdGU6IG51bWJlciB8IERhdGUgPSAwKSB7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBCQSA9IEIuZ2V0UG9zaXRpb24oKS5wbHVzKEEuZ2V0UG9zaXRpb24oKS5tdWx0aXBseSgtMSkpO1xuXG4gICAgICAgICAgICB2YXIgcG9sYXIgPSBCQS5nZXRQb3NpdGlvblBvbGFyKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEJBLHBvbGFyKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwb2xhci5nZXREZWdyZWVzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIFNwZWVkIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBmaWVsZHMvc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTcGVlZChkYXRlOiBudW1iZXIgfCBEYXRlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluUHJvZ3Jlc3MoZGF0ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IEEuZ2V0RGlzdGFuY2UoQik7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBCLmRhdGUgLSBBLmRhdGU7XG5cbiAgICAgICAgICAgIHJldHVybiAoZGlzdGFuY2UgLyAoZHVyYXRpb24gLyAxMDAwKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBhdGggaW4gcHJvZ3Jlc3MgKHRydWUpIG9yIGl0IGhhcyBub3Qgc3RhcnRlZChmYWxzZSkgb3IgaXQgaXMgZmluaXNoZWQoZmFsc2UpP1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpblByb2dyZXNzKGRhdGU6IG51bWJlciB8IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gbWF5YmUgY291bnRQcm9ncmVzc1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFQuUGF0aCB0byBzdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5qb2luKCcsICcpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbjNEXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGludGVyZmFjZSBQb3NpdGlvbjNET2JqZWN0IHtcbiAgICAgICAgeDpudW1iZXI7XG4gICAgICAgIHk6bnVtYmVyO1xuICAgICAgICB6Om51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24zRCB7XG5cbiAgICAgICAgcHVibGljIHg6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHk6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHo6IG51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb24zRE9iamVjdCwgeT86IG51bWJlciwgej86IG51bWJlcikge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0Lnk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0geF9vcl9vYmplY3QuejtcblxuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnbnVtYmVyJyl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHo7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24zRCh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uM0QgdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICcsJyArIHRoaXMueiArICddJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFBvc2l0aW9uUG9sYXJcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvblBvbGFyIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlzdGFuY2U6IG51bWJlcixwdWJsaWMgZGVncmVlczogbnVtYmVyKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMuZGlzdGFuY2UsdGhpcy5kZWdyZWVzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpICogdGhpcy5kaXN0YW5jZVxuICAgICAgICAgICAgKSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZSgpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGVncmVlcygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlZ3JlZXMgKyAzNjApICUgMzYwO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJhZGlhbnMoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLmRlZzJyYWQodGhpcy5kZWdyZWVzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy5kaXN0YW5jZSArICcsJyArIHRoaXMuZGVncmVlcyArICfCsCc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbiB7XG4gICAgICAgIHg6bnVtYmVyO1xuICAgICAgICB5Om51bWJlcjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXBcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24ge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0X29yX3N0cmluZzogbnVtYmVyIHwgUG9zaXRpb24gfCBzdHJpbmcsIHk/OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0X29yX3N0cmluZyA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy55O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIGlmKHR5cGVvZiB4X29yX29iamVjdF9vcl9zdHJpbmcgPT09ICdzdHJpbmcnKXtcblxuICAgICAgICAgICAgICAgIGlmICgvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeF9vcl9vYmplY3Rfb3Jfc3RyaW5nKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4X3k6QXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHhfeSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHhfeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHBhcnNlRmxvYXQoeF95WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBjcmVhdGluZyBQb3NpdGlvbiwgc3RyaW5nIG11c3QgYmUgaW4gZm9ybWF0IHgseSBub3QgJyt4X29yX29iamVjdF9vcl9zdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeF9vcl9vYmplY3Rfb3Jfc3RyaW5nID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY29uc3RydWN0b3IgcGFyYW1zIHdoaWxlIGNyZWF0aW5nIFQuUG9zaXRpb24hJyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwbHVzKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSArPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBtaW51cyhwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54IC09IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgLT0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG11bHRpcGx5KGs6IG51bWJlcikge1xuXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggKiBrO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ICogaztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEZsb29yZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24oTWF0aC5mbG9vciggdGhpcy54KSxNYXRoLmZsb29yKCB0aGlzLnkpKTtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQb3NpdGlvblBvbGFyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uUG9sYXIoXG4gICAgICAgICAgICAgICAgVC5UTWF0aC54eTJkaXN0KHRoaXMueCwgdGhpcy55KSxcbiAgICAgICAgICAgICAgICBULlRNYXRoLnJhZDJkZWcoTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCkpXG4gICAgICAgICAgICApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZShwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdChwb3NpdGlvbi54IC0gdGhpcy54LCBwb3NpdGlvbi55IC0gdGhpcy55KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJyc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbkRhdGVPYmplY3Qge1xuICAgICAgICB4Om51bWJlcjtcbiAgICAgICAgeTpudW1iZXI7XG4gICAgICAgIGRhdGU6RGF0ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXAgd2l0aCB0aW1lXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uRGF0ZSBleHRlbmRzIFQuUG9zaXRpb24gey8vdG9kbyBpcyB0aGFyZSBzb2x1dGlvbiB3aXRob3V0IHVzaW5nIFQuP1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgZGF0ZTpEYXRlO1xuXG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb25EYXRlT2JqZWN0LCB5PzogbnVtYmVyLCBkYXRlPzogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgcG9zaXRpb25EYXRlT2JqZWN0OlBvc2l0aW9uRGF0ZU9iamVjdDtcbiAgICAgICAgICAgICAgICAvL3Bvc2l0aW9uRGF0ZU9iamVjdCA9IHg7XG5cbiAgICAgICAgICAgICAgICB4ID0geF9vcl9vYmplY3QueDtcbiAgICAgICAgICAgICAgICB5ID0geF9vcl9vYmplY3QueTtcbiAgICAgICAgICAgICAgICBkYXRlID0geF9vcl9vYmplY3QuZGF0ZTtcblxuXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4X29yX29iamVjdCA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHggPSB4X29yX29iamVjdDtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xuXG5cbiAgICAgICAgICAgIHZhciBkYXRlT2JqZWN0OiBEYXRlO1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKGRhdGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gZGF0ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZU9iamVjdCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBjb25zdHJ1Y3QgUG9zaXRpb25EYXRlIGlzIG5lZWRlZCB2YWxpZCBEYXRlIG5vdCAnICsgZGF0ZSArICcuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJ10gYXQgJyArXG4gICAgICAgICAgICAgICAgKHRoaXMuZGF0ZS5nZXREYXkoKSArIDEpICsgJy4nICsgKHRoaXMuZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLicgKyB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArXG4gICAgICAgICAgICAgICAgJyAnICsgdGhpcy5kYXRlLmdldEhvdXJzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0TWludXRlcygpICsgJzonICsgdGhpcy5kYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM6IEFycmF5O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgaWE6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb246IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiBib29sZWFuO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbGxpc2lvbj09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlY29sbGlzaW9uPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKnIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICApOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghc2lkZWNvbGxpc2lvbilyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBleHBvcnQgY2xhc3MgUmVzb3VyY2VzIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlc291cmNlczpPYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHJlc291cmNlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlJlc291cmNlcyB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY29udGFpbnMgYSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBjb250YWluc1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbnMocmVzb3VyY2VzOlJlc291cmNlcyk6Ym9vbGVhbiB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldIDwgcmVzb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICBhZGQocmVzb3VyY2VzOlJlc291cmNlcyk6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gKz0gcmVzb3VyY2VzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG11bHRpcGx5KGs6bnVtYmVyKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbCh0aGlzW2tleV0gKiBrKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzaWdudW0oazpzdHJpbmcpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgYXBwbHkobW9kaWZpZXI6RnVuY3Rpb24pOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbW9kaWZpZXIodGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBhbGwgcmVzb3VyY2VzIGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3RLZXlzKCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgZ2l2ZW4gUmVzb3VyY2VzXG4gICAgICAgICAqL1xuICAgICAgICBjb21wYXJlKHJlc291cmVzOlJlc291cmNlcyk6bnVtYmVyIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlc19BID0gdGhpcztcbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQiA9IHJlc291cmVzO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0EuZXh0cmFjdEtleXMoKSk7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0IuZXh0cmFjdEtleXMoKSk7XG5cblxuICAgICAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbF9BID0gcmVzb3VyY2VzX0Fba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsX0IgPSByZXNvdXJjZXNfQltrZXldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9BID09ICd1bmRlZmluZWQnKXZhbF9BID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9CID09ICd1bmRlZmluZWQnKXZhbF9CID0gMDtcblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlICs9IE1hdGgucG93KHZhbF9BIC0gdmFsX0IsIDIpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlKTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGRpc3RhbmNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZShyZXNvdXJjZXM6UmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0hUTUwoKTpzdHJpbmcgey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmdzX2pvaW5lZCA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICAgICAgc3RyaW5nc19qb2luZWQgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzX2pvaW5lZCArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nc19qb2luZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuVE1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb24ge1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb25Qb2xhciB7XG4gICAgICAgIGRpc3Q6IG51bWJlcjtcbiAgICAgICAgZGVnOiBudW1iZXI7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVE1hdGgge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYmFzZUxvZyhiYXNlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyOiBudW1iZXIsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgICAgIHZhciBkaWdpdHMgPSBNYXRoLmNlaWwoVE1hdGguYmFzZUxvZygxMCwgbnVtYmVyKSk7XG4gICAgICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIC0gZGlnaXRzKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyICogaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciAvIGs7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMTogbnVtYmVyLCBkZWcyOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMikgJSAzNjA7XG4gICAgICAgICAgICBpZiAoZGVnID4gMTgwKWRlZyA9IDM2MCAtIGRlZztcbiAgICAgICAgICAgIHJldHVybiAoZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJhZDJkZWcocmFkaWFuczpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSkpICUgMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVncmVlcyAlIDM2MCAqIChNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geFxuICAgICAgICAgKiBAcGFyYW0geVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgeHkyZGlzdCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIHh5MmRpc3REZWcoeDpudW1iZXIsIHk6bnVtYmVyKTpwb3NpdGlvblBvbGFyIHtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICBkaXN0OiBULlRNYXRoLnh5MmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgICAgZGVnOiAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIoeSwgeCkpXG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3Q6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cbiAgICAgICAgICAgIHZhciByYWQgPSBULlRNYXRoLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgICAgIHN0YXRpYyB4eVJvdGF0ZSh4OiBudW1iZXIsIHk6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3QgPSBULlRNYXRoLnh5MmRpc3QoeCwgeSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LCB4KTtcblxuICAgICAgICAgICAgcmFkICs9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG5cbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5jb3MocmFkKSAqIGRpc3QsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5zaW4ocmFkKSAqIGRpc3RcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZDpudW1iZXIsIHBvc2l0aW9uOnBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCAqIHBvc2l0aW9uLnkpIC0gc2VlZCwgMikpICsgMSkgLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0ludCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRlZnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJvdW5kcyh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbilyZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KXJldHVybiBtYXg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpc09uTGluZShhMXg6bnVtYmVyLCBhMXk6bnVtYmVyLCBhMng6bnVtYmVyLCBhMnk6bnVtYmVyLCBiMXg6bnVtYmVyLCBiMXk6bnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgIGEyeCAtPSBhMXg7XG4gICAgICAgICAgICBhMnkgLT0gYTF5O1xuXG4gICAgICAgICAgICBiMXggLT0gYTF4O1xuICAgICAgICAgICAgYjF5IC09IGExeTtcblxuXG4gICAgICAgICAgICB2YXIgYVNsb3BlID0gYTJ5IC8gYTJ4O1xuICAgICAgICAgICAgdmFyIGJTbG9wZSA9IGIxeSAvIGIxeDtcblxuXG4gICAgICAgICAgICBpZiAoYVNsb3BlICE9IGJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICAgICAgdmFyIGFEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGEyeSwgYTJ4KTtcbiAgICAgICAgICAgIHZhciBiRGlzdCA9IFQuVE1hdGgueHkyZGlzdChiMXksIGIxeCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoYURpc3QgPj0gYkRpc3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIsIGIyeDpudW1iZXIsIGIyeTpudW1iZXIpOiBib29sZWFuIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYk9uQSA9IFQuVE1hdGguaXNPbkxpbmUoYTF4LCBhMXksIGEyeCwgYTJ5LCBiMXgsIGIxeSk7XG4gICAgICAgICAgICAgICAgdmFyIGFPbkIgPSBULlRNYXRoLmlzT25MaW5lKGIxeCwgYjF5LCBiMngsIGIyeSwgYTF4LCBhMXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9ICgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcjpGdW5jdGlvbiwgYmx1cjpudW1iZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHZhciB4eCwgeXk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSkgKyAnJyArIHNpemVzW2ldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQ6bnVtYmVyLCBhX3Bvc2l0aW9uOm51bWJlciwgYV9lbmQ6bnVtYmVyLCBiX3N0YXJ0Om51bWJlciwgYl9lbmQ6bnVtYmVyKTpudW1iZXIge1xuXG5cbiAgICAgICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQgLSBhX3N0YXJ0O1xuICAgICAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZCAtIGJfc3RhcnQ7XG5cbiAgICAgICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZCAtIGFfcG9zaXRpb247XG4gICAgICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUgKiBhX3BhcnQpIC8gYV93aG9sZTtcblxuICAgICAgICAgICAgcmV0dXJuIChiX2VuZCAtIGJfcGFydCk7XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XG4gICAgICAgIHVzZXJuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgbmFtZTogJ3N0cmluZyc7XG4gICAgICAgIHN1cm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBlbWFpbDogJ3N0cmluZyc7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XG5cblxuICAgICAgICBwcm9maWxlOiBVc2VyUHJvZmlsZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodXNlcjogVXNlcikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXNlcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmF0dXJlSFRNTCgpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSArICcgJyArIHRoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gICsgbmFtZSArIGA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArIHRoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkgKyBgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNpZ25hdHVyZV9odG1sKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUgVC5Xb3JsZHtcblxuXG4gICAgZXhwb3J0IHZhciB0ZXJyYWlucyA9IFtcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbiAgICBdO1xuXG5cbn1cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuV29ybGR7XG5cbiAgICBleHBvcnQgdmFyIG1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgICAgICBULlRNYXRoLmJsdXJYWShmdW5jdGlvbih4OiBudW1iZXIseTogbnVtYmVyKXtcblxuICAgICAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAgICAgLy90b2RvLy9pZih0eXBlb2Ygel9tYXBfY2FjaGVba2V5XSE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICAgICAgY29uc3QgZGl2PTEwMDtcblxuXG4gICAgICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgICAgICB2YXIgX3g6IG51bWJlcixfeTogbnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgICAgICB2YXIga189MS1rO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICAgICAgbWF4X3Bvc3NpYmxlX24rPWRpdjtcblxuICAgICAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgICAgICAvL3ZhciB4eSA9IFQuVE1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgICAgICAvL3k9eHkueTtcblxuICAgICAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICAgICAgeD1NYXRoLmZsb29yKF94LzQpO1xuICAgICAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIG49bi9tYXhfcG9zc2libGVfbjtcblxuICAgICAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAgICAgLy90b2RvLy96X21hcF9jYWNoZVtrZXldPW47XG4gICAgICAgICAgICByZXR1cm4obik7XG5cbiAgICAgICAgfSwyKVxuICAgICAgICAsXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICAsXG5cbiAgICAgICAgbmV3IFQuTWFwR2VuZXJhdG9yLkJpb3RvcGUoW1xuXG4gICAgICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzExXX0sLy/FmWVrYVxuICAgICAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOV19LC8vdHLDoXZhIHRveGljXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxM119LC8vdHLDoXZhIHBvemltXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiAgIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDddfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICAgICAgXSksXG5cblxuICAgICAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgICAgIC8qaWYob2JqZWN0LmdldENvZGUoKT09NSl7XG4gICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigxLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo2KSU2KydkYXJrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgc2l6ZTogMC41K1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgIH1lbHNlKi9cbiAgICAgICAgICAgIGlmKG9iamVjdC5nZXRDb2RlKCk9PTEwKXtcblxuICAgICAgICAgICAgICAgIGlmKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDMse3g6b2JqZWN0LngseTpvYmplY3QueX0pPjAuOTUpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J3RyZWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMytULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjM2MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICApO1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBleHBvcnQgdmFyIGdhbWUgPSBuZXcgVC5HYW1lKFxuICAgICAgICBULlRNYXRoLnByZXR0eU51bWJlcixcbiAgICAgICAgVC5UTWF0aC5wcmV0dHlOdW1iZXJcbiAgICApO1xuXG59IiwiXG5tb2R1bGUgVC5Xb3JsZCB7XG5cblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBkaXN0YW5jZTogMCxcbiAgICAgICAgICAgIHN0cmVuZ3RoOiAwLFxuICAgICAgICAgICAgcm91bmRzOiAxLFxuICAgICAgICAgICAgY29vbGRvd246IDFcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ2F0dGFjaycpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLCAyKSAqIHRoaXMucGFyYW1zLnN0cmVuZ3RoICogdGhpcy5wYXJhbXMucm91bmRzICogKDEgLyB0aGlzLnBhcmFtcy5jb29sZG93bikpICogMTAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgYXR0YWNrZXIsIGF0dGFja2VkLCByZXNvdXJjZXNfYXR0YWNrZXIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9saWZlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLU1pc3NpbmcgYWN0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXJfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjayA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnYXR0YWNrJykucGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IGF0dGFja2VyX2F0dGFjay5kaXN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcgKyBkaXN0YW5jZSArICcgZmllbGRzLiBBdHRhY2sgZGlzdGFuY2UgaXMgb25seSAnICsgYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlICsgJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29vbGRvd25cbiAgICAgICAgICAgICAgICBpZiAoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJyArIGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZEluKCkgKyAnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURlZmVuY2VcblxuICAgICAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIC09XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIDwgMClhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggPSAwO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggLT1cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggPCAwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgICAgIC8vYXR0YWNrZWRfbGlmZS5saWZlPTEwMDA7XG5cblxuICAgICAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgIChhdHRhY2tlcl9saWZlLmxpZmUgPiAxICYmIGF0dGFja2VkX2xpZmUubGlmZSA+IDEpXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHIoJ3JvdW5kJywgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLCBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByKCdsaWZlJywgYXR0YWNrZWRfbGlmZS5saWZlLCBhdHRhY2tlcl9saWZlLmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZSAtPSBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZSAtPSBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9saWZlLmxpZmUgPCAxKWF0dGFja2VyX2xpZmUubGlmZSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2xpZmUubGlmZSA8IDEpYXR0YWNrZWRfbGlmZS5saWZlID0gMTtcblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZlbmNlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuZGVmZW5jZSkgKiA4MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDF9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZmU6IDEsXG4gICAgICAgICAgICBtYXhfbGlmZTogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnbGlmZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtuZXcgVC5SZXNvdXJjZXMoKV0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICk7XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHdvb2Q6IDAsXG4gICAgICAgICAgICBpcm9uOiAwLFxuICAgICAgICAgICAgY2xheTogMCxcbiAgICAgICAgICAgIHN0b25lOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtaW5lJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuYW1vdW50KSAqIDM2MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDR9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gb3IgbWF5YmUgZXhlY3V0ZVxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwZWVkOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtb3ZlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsIDIpKSAqIDEwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMX0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgb2JqZWN0LCBkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBhY3Rpb24vL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb24gPSBvYmplY3QuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoID0gVC5QYXRoLm5ld0NvbnN0YW50U3BlZWQoZGVzdGluYXRpb25zLCBhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKS5ub3dFeGVjdXRlZCgpOy8vdG9kbyBpcyBpdCBuZWVkZWRcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBtYXliZSA/Pz8gdG9kb1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdlbmVyYXRlOiAxMDAsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdyZWdlbmVyYXRlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoMSAvIHRoaXMucGFyYW1zLnJlZ2VuZXJhdGUpICogMzYwMCAqIDAuMDUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiA0fSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgZXhlY3V0ZSgpey8vdG9kbyBtYXliZSB0aWNrPz8/P1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICByZXBhaXI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3JlcGFpcicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyAodGhpcy5wYXJhbXMucmVwYWlyIC8gMTAwKSkgKiAxMDAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDR9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiA0fSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAgLy90b2RvXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3VnaHB1dDogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgndGhyb3VnaHB1dCcpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLnRocm91Z2hwdXQgLyAxMDAsIDIpKSAqIDEwICogMC4wNSk7Ly90b2RvXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDN9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAxfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
