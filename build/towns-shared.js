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
            var center_integer = {
                x: Math.floor(center.x),
                y: Math.floor(center.y)
            };
            if (not_center)
                not_center = new T.Position(not_center.x - center_integer.x, not_center.y - center_integer.y);
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
            var max, min, max_, min_;
            for (var i in particlesLinear) {
                min_ = particlesLinear[i].position[dimension];
                max_ = particlesLinear[i].position[dimension] + particlesLinear[i].size[dimension];
                //todo feature reverse
                if (typeof max === 'undefined')
                    max = max_;
                if (typeof min === 'undefined')
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
                    if (T.Model.Particles.collision2D(this_linear_particles[ii], model_linear_particles[i])) {
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
                            throw new Error('Invalid link ' + particles[i].link);
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
                var price_ = new T.Resources({});
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
                    var x__ = void 0, y__ = void 0, z__ = void 0;
                    var base = void 0;
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
                            if (particle.shape.rotated) {
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
                return triangles;
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
                var resource;
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
                            if (particle.shape.rotated) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvY2FsZS50cyIsIjA1LWxvZy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtY29sb3IuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtcG9zaXRpb24tM2QuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wb3NpdGlvbi1wb2xhci5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTUtcG9zaXRpb24tZGF0ZS5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzIwLWFyZWEuY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC10bWF0aC5zdGF0aWMudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUVILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNYLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQyxDQUFDO0FDWnBCOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0FjUDtBQWRELFdBQU8sQ0FBQyxFQUFBLENBQUM7SUFDTDtRQUFBO1FBWUEsQ0FBQztRQVZHOzs7O1dBSUc7UUFDSSxVQUFHLEdBQVY7WUFBVyxxQkFBNEI7aUJBQTVCLFdBQTRCLENBQTVCLHNCQUE0QixDQUE1QixJQUE0QjtnQkFBNUIsb0NBQTRCOztZQUVuQyxNQUFNLENBQUEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEMsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLFFBQU0sU0FZbEIsQ0FBQTtBQUNMLENBQUMsRUFkTSxDQUFDLEtBQUQsQ0FBQyxRQWNQO0FDckJEOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQ05sQzs7O0dBR0c7QUFDSCx3SEFB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LENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDOzRCQUdyQyw2QkFBNkI7NEJBRzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNkLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFFakMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7NEJBQzlCLENBQUM7NEJBR0QsVUFBVTs0QkFHViw2QkFBNkI7NEJBRTdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FFekIsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEosR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxD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LElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFFeEMsNkJBQTZCOzRCQUU3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0NBRXpCLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hKLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDOzRCQUVyQixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUVKLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLGFBQWE7Z0NBRWpGLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLCtDQUErQztnQ0FFNUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxnQ0FBZ0M7Z0NBRzlJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUVWLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO29DQUN2RyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUVuRSxDQUFDOzRCQUVWLENBQUM7NEJBR0QsZ0NBQWdDOzRCQUVoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFD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QyxDQUFDO3dCQUU3QyxFQUFFLENBQUMsQ0FDQyxDQUFDLElBQUksQ0FBQzs0QkFDTixDQUFDLElBQUksQ0FBQzs0QkFDTixDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUM7NEJBQ2QsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUNqQixDQUFDLENBQUMsQ0FBQzs0QkFFQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUV2QyxDQUFDO29CQUdMLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osNEJBQTRCO3dCQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFN0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRzdFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQ3RDLElB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LE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRTlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFHOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FFbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBRW5ELFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7b0NBRTVCLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0NBQ2hDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29DQUM1QyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQ0FFNUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO29DQUU5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0NBQy9DLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzt3Q0FFOUIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUV6QyxDQUFDO2dDQUdMLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDO29CQUdMLENBQUM7Z0JBRUwsQ0FBQztnQkFDRCw0QkFBNEI7Z0JBRTVCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUcvQixDQUFDO1lBR0QsWUFBWTtZQUNaLG9DQUFvQixHQUFwQixVQUFxQixRQUFRO2dCQUd6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7d0JBQUEsUUFBUSxDQUFDO29CQUcvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pILE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztnQkFDTCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWxCLENBQUM7WUFHRCxZQUFZO1lBQ1osaURBQWlDLEdBQWpDLFVBQWtDLFFBQVEsRUFBRSxZQUFZO2dCQUVwRCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7Z0JBRWhDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7b0JBRTdDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRS9ELEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDakQsWUFBWSxHQUFHLFFBQVEsQ0FBQzt3QkFDeEIsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO29CQUN0QyxDQUFDO2dCQUVMLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRWhCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRUosTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUU3QyxDQUFDO1lBR0wsQ0FBQztZQVlMLFlBQUM7UUFBRCxDQTdlQSxBQTZlQyxJQUFBO1FBN2VZLGFBQUssUUE2ZWpCLENBQUE7SUFFTCxDQUFDLEVBcGZRLE9BQU8sR0FBUCxTQUFPLEtBQVAsU0FBTyxRQW9mZjtBQUFELENBQUMsRUFwZk0sQ0FBQyxLQUFELENBQUMsUUFvZlA7QUMxZkQ7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhILElBQU8sQ0FBQyxDQXFGUDtBQXJGRCxXQUFPLENBQUM7SUFBQyxJQUFBLE9BQU8sQ0FxRmY7SUFyRlEsV0FBQSxPQUFPLEVBQUMsQ0FBQztRQUVkO1lBUUk7O2VBRUc7WUFDSCxnQkFBWSxNQUFNO2dCQUVkLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBRXJCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFFbkIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQzt3QkFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUEsNEJBQTRCO29CQUVsRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO1lBRUwsQ0FBQztZQUdNLFdBQUksR0FBWCxVQUFZLE1BQU07Z0JBRWQsRUFBRSxDQUFBLENBQUMsTUFBTSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsb0NBQW9DO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBRTVCLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUU1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBRWxDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUzQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBRWhDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV6QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBRWxDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUzQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqSCxDQUFDO2dCQUNELG9DQUFvQztnQkFFcEMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEIsQ0FBQztZQUdELDRCQUFXLEdBQVg7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUdEOztlQUVHO1lBQ0gseUJBQVEsR0FBUjtnQkFDSSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBR0Q7OztlQUdHO1lBQ0gseUJBQVEsR0FBUjtnQkFDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUwsYUFBQztRQUFELENBakZBLEFBaUZDLElBQUE7UUFqRlksY0FBTSxTQWlGbEIsQ0FBQTtJQUVMLENBQUMsRUFyRlEsT0FBTyxHQUFQLFNBQU8sS0FBUCxTQUFPLFFBcUZmO0FBQUQsQ0FBQyxFQXJGTSxDQUFDLEtBQUQsQ0FBQyxRQXFGUDtBQzNGRDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFFeEgsSUFBTyxDQUFDLENBd0xQO0FBeExELFdBQU8sQ0FBQztJQUFDLElBQUEsT0FBTyxDQXdMZjtJQXhMUSxXQUFBLE9BQU8sRUFBQyxDQUFDO1FBRWQ7WUFBOEIsNEJBQWdCO1lBTTFDOztlQUVHO1lBQ0gsa0JBQVksTUFBTTtnQkFDZCxrQkFBTSxNQUFNLENBQUMsQ0FBQztnQkFFZCwrQkFBK0I7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFFdEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFHSixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7b0JBRXpCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUVsRCxJQUFJLENBQUM7NEJBQ0QsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUUsQ0FDQTt3QkFBQSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUM7b0JBRUwsQ0FBQztvQkFHRCxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztnQkFFbkMsQ0FBQztnQkFDRCwrQkFBK0I7Z0JBRy9CLCtCQUErQjtnQkFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsK0JBQStCO2dCQUcvQiwrQkFBK0I7Z0JBQy9CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUduRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFdkIsV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO3dCQUN6QyxJQUFJLEVBQUUsTUFBTTt3QkFDWixNQUFNLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFFBQVE7NEJBQ2QsUUFBUSxFQUFFLFFBQVE7eUJBQ3JCO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFbkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFSixXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzNDLENBQUM7Z0JBQ0QsK0JBQStCO1lBR25DLENBQUM7WUFFRDs7OztlQUlHO1lBQ0gsOEJBQVcsR0FBWCxVQUFZLElBQUk7Z0JBR1osRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBRW5DLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFekMsQ0FBQztZQUVMLENBQUM7WUFHRDs7OztlQUlHO1lBQ0gsMkJBQVEsR0FBUixVQUFTLElBQUk7Z0JBR1QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVuQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdEMsQ0FBQztZQUVMLENBQUM7WUFHRDs7ZUFFRztZQUNILHdCQUFLLEdBQUw7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUdEOztlQUVHO1lBQ0gsMkJBQVEsR0FBUjtnQkFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBR0Q7Ozs7ZUFJRztZQUNILDRCQUFTLEdBQVQsVUFBVSxXQUFXO2dCQUVqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFFbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFFdEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztZQUVoQixDQUFDO1lBR0Qsb0NBQWlCLEdBQWpCO2dCQUVJLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2xELGVBQWUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzNELENBQUM7Z0JBR0QsTUFBTSxDQUFDLENBQUMsaUZBSUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUNuQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyx3QkFHeEIsR0FBRyxlQUFlLEdBQUcsd0NBTTdCLENBQUMsQ0FBQztZQUVILENBQUM7WUFDTCxlQUFDO1FBQUQsQ0FwTEEsQUFvTEMsQ0FwTDZCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQW9MN0M7UUFwTFksZ0JBQVEsV0FvTHBCLENBQUE7SUFFTCxDQUFDLEVBeExRLE9BQU8sR0FBUCxTQUFPLEtBQVAsU0FBTyxRQXdMZjtBQUFELENBQUMsRUF4TE0sQ0FBQyxLQUFELENBQUMsUUF3TFA7QUM5TEQ7OztHQUdHO0FBQ0gsd0hBQXdIO0FBR3hILElBQU8sQ0FBQyxDQWtCUDtBQWxCRCxXQUFPLENBQUM7SUFBQyxJQUFBLE9BQU8sQ0FrQmY7SUFsQlEsV0FBQSxPQUFPLEVBQUMsQ0FBQztRQUVkO1lBQTZCLDJCQUFnQjtZQUE3QztnQkFBNkIsOEJBQWdCO1lBYzdDLENBQUM7WUFWRyx1QkFBSyxHQUFMO2dCQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFHRCx5QkFBTyxHQUFQO2dCQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFHTCxjQUFDO1FBQUQsQ0FkQSxBQWNDLENBZDRCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQWM1QztRQWRZLGVBQU8sVUFjbkIsQ0FBQTtJQUVMLENBQUMsRUFsQlEsT0FBTyxHQUFQLFNBQU8sS0FBUCxTQUFPLFFBa0JmO0FBQUQsQ0FBQyxFQWxCTSxDQUFDLEtBQUQsQ0FBQyxRQWtCUDtBQ3pCRDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFFeEgsSUFBTyxDQUFDLENBaUJQO0FBakJELFdBQU8sQ0FBQztJQUFDLElBQUEsT0FBTyxDQWlCZjtJQWpCUSxXQUFBLE9BQU8sRUFBQyxDQUFDO1FBRWQ7WUFBMkIseUJBQWdCO1lBQTNDO2dCQUEyQiw4QkFBZ0I7WUFhM0MsQ0FBQztZQVRHLHFCQUFLLEdBQUw7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUVELDJCQUFXLEdBQVg7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBR0wsWUFBQztRQUFELENBYkEsQUFhQyxDQWIwQixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FhMUM7UUFiWSxhQUFLLFFBYWpCLENBQUE7SUFFTCxDQUFDLEVBakJRLE9BQU8sR0FBUCxTQUFPLEtBQVAsU0FBTyxRQWlCZjtBQUFELENBQUMsRUFqQk0sQ0FBQyxLQUFELENBQUMsUUFpQlA7QUN2QkQ7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhILElBQU8sQ0FBQyxDQThCUDtBQTlCRCxXQUFPLENBQUM7SUFBQyxJQUFBLE9BQU8sQ0E4QmY7SUE5QlEsV0FBQSxPQUFPLEVBQUMsQ0FBQztRQUVkO1lBQTZCLDJCQUFnQjtZQUE3QztnQkFBNkIsOEJBQWdCO1lBMEI3QyxDQUFDO1lBdEJHLHVCQUFLLEdBQUw7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUdELHlCQUFPLEdBQVAsVUFBUSxjQUFjO2dCQUVsQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxDQUFDO1lBR0QsMEJBQVEsR0FBUjtnQkFFSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxDQUFDO1lBTUwsY0FBQztRQUFELENBMUJBLEFBMEJDLENBMUI0QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0EwQjVDO1FBMUJZLGVBQU8sVUEwQm5CLENBQUE7SUFFTCxDQUFDLEVBOUJRLE9BQU8sR0FBUCxTQUFPLEtBQVAsU0FBTyxRQThCZjtBQUFELENBQUMsRUE5Qk0sQ0FBQyxLQUFELENBQUMsUUE4QlA7QUNyQ0Q7OztHQUdHO0FBQ0gsd0hBQXdIO0FBR3hILElBQU8sQ0FBQyxDQTJIUDtBQTNIRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBQ047O09BRUc7SUFDSDtRQUVJOzs7Ozs7V0FNRztRQUNILGVBQW1CLENBQVMsRUFBUSxDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQU87WUFBZCxpQkFBYyxHQUFkLE9BQWM7WUFBMUQsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUN6RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxxQkFBSyxHQUFMO1lBQ0ksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gsc0JBQU0sR0FBTjtZQUVJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQUdEOzs7V0FHRztRQUNILDJCQUFXLEdBQVg7WUFFSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLG9HQUFvRztnQkFDcEcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDaEgsQ0FBQztRQUVMLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxzQkFBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSSxtQkFBYSxHQUFwQixVQUFxQixHQUFXO1lBRTVCLElBQUksTUFBWSxFQUFHLGNBQXNCLEVBQUUsV0FBNEIsQ0FBQztZQUV4RSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7WUFDcEQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLDJDQUEyQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FDWixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUMvQixDQUFDO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVKLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFFaEUsQ0FBQztRQUNMLENBQUM7UUFFTCxZQUFDO0lBQUQsQ0FySEEsQUFxSEMsSUFBQTtJQXJIWSxPQUFLLFFBcUhqQixDQUFBO0FBRUwsQ0FBQyxFQTNITSxDQUFDLEtBQUQsQ0FBQyxRQTJIUDtBQ2xJRDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFFeEgsSUFBTyxDQUFDLENBdVRQO0FBdlRELFdBQU8sQ0FBQyxFQUFBLENBQUM7SUFFTDtRQUlJOztXQUVHO1FBQ0g7WUFBWSxjQUFPO2lCQUFQLFdBQU8sQ0FBUCxzQkFBTyxDQUFQLElBQU87Z0JBQVAsNkJBQU87O1lBR2YsMkRBQTJEO1lBQzNELHFEQUFxRDtZQUNyRCxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxlQUFlO1lBR2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDakYsQ0FBQztZQUdELElBQUksYUFBMkIsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFFOUQsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUMsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVKLEVBQUUsQ0FBQyxDQUFDLGFBQWEsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUVsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsRixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVKLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztvQkFDbEYsQ0FBQztnQkFHTCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsR0FBRyxhQUFhLENBQUMsSUFBSSxHQUFHLG1CQUFtQixHQUFHLFNBQVMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3BKLENBQUM7Z0JBRUQsU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDO1lBR3JDLENBQUM7UUFFTCxDQUFDO1FBR0QscUJBQU0sR0FBTjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSSxxQkFBZ0IsR0FBdkIsVUFBd0IsY0FBcUIsRUFBRSxLQUFhLEVBQUUsSUFBdUI7WUFBdkIsb0JBQXVCLEdBQXZCLFFBQXVCO1lBRWpGLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztZQUNqRixDQUFDO1lBRUQsSUFBSSxtQkFBbUIsR0FBRztnQkFDdEIsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7YUFDckUsQ0FBQztZQUdGLElBQUksYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QyxJQUFJLGFBQTJCLEVBQUUsUUFBZ0IsQ0FBQztZQUNsRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUVwRCxhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUdsQyxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDO2dCQUdELFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUdwRCxhQUFhLEdBQUcsYUFBYSxDQUFDO2dCQUc5QixtQkFBbUIsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ3JFLENBQUM7WUFFTixDQUFDO1lBR0Qsa0RBQWtEO1lBQ2xELG1EQUFtRDtZQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUU5QyxDQUFDO1FBSUQsMkJBQVksR0FBWjtZQUVJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUU5RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBRTlELENBQUM7WUFFRCxNQUFNLENBQUEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBTUQ7Ozs7V0FJRztRQUNILDJCQUFZLEdBQVosVUFBYSxJQUFtQjtZQUU1QixpREFBaUQ7WUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUdELHFDQUFxQztZQUVyQyxJQUFJLENBQWUsRUFBRSxDQUFjLEVBQUUsQ0FBUyxFQUFFLENBQVMsQ0FBQztZQUMxRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbEUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QyxpREFBaUQ7Z0JBQ2pELCtDQUErQztnQkFFL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFeEIsMEJBQTBCO29CQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFZixDQUFDO1lBR0wsQ0FBQztZQUdELE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdEcsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSCw0QkFBYSxHQUFiLFVBQWMsSUFBdUI7WUFBdkIsb0JBQXVCLEdBQXZCLFFBQXVCO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBRUQsaURBQWlEO1lBRWpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN6RixDQUFDO1lBR0QscUNBQXFDO1lBRXJDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFOUMsdUNBQXVDO1lBRXZDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4RSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHbEMsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSCw0QkFBYSxHQUFiLFVBQWMsSUFBdUI7WUFBdkIsb0JBQXVCLEdBQXZCLFFBQXVCO1lBR2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBR0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU5QyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2xDLHdCQUF3QjtZQUV4QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVoQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHlCQUFVLEdBQVYsVUFBVyxJQUFtQjtZQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFL0IsTUFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUMsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSCx5QkFBVSxHQUFWLFVBQVcsSUFBbUI7WUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQztRQUNMLENBQUM7UUFHRCwwQkFBMEI7UUFHMUI7OztXQUdHO1FBQ0gsdUJBQVEsR0FBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFHTCxXQUFDO0lBQUQsQ0FuVEEsQUFtVEMsSUFBQTtJQW5UWSxNQUFJLE9BbVRoQixDQUFBO0FBRUwsQ0FBQyxFQXZUTSxDQUFDLEtBQUQsQ0FBQyxRQXVUUDtBQzdURDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFFeEgsSUFBTyxDQUFDLENBMkRQO0FBM0RELFdBQU8sQ0FBQyxFQUFDLENBQUM7SUFTTjtRQU1JLG9CQUFZLFdBQXNDLEVBQUUsQ0FBVSxFQUFFLENBQVU7WUFFdEUsSUFBSSxDQUFRLENBQUM7WUFFYixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRTNCLENBQUM7WUFBQyxJQUFJLENBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFFakMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWYsQ0FBQztRQUVMLENBQUM7UUFHRDs7O1dBR0c7UUFDSCwwQkFBSyxHQUFMO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gsNkJBQVEsR0FBUjtZQUVJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFNUQsQ0FBQztRQUdMLGlCQUFDO0lBQUQsQ0FoREEsQUFnREMsSUFBQTtJQWhEWSxZQUFVLGFBZ0R0QixDQUFBO0FBRUwsQ0FBQyxFQTNETSxDQUFDLEtBQUQsQ0FBQyxRQTJEUDtBQ2pFRDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFFeEgsSUFBTyxDQUFDLENBZ0VQO0FBaEVELFdBQU8sQ0FBQyxFQUFDLENBQUM7SUFFTjtRQUVJLHVCQUFtQixRQUFnQixFQUFRLE9BQWU7WUFBdkMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFRLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDMUQsQ0FBQztRQUdEOzs7V0FHRztRQUNILDZCQUFLLEdBQUw7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFHRCxtQ0FBVyxHQUFYO1lBRUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWhDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQ3BDLENBQUMsQ0FBQztRQUdQLENBQUM7UUFHRCxtQ0FBVyxHQUFYO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFekIsQ0FBQztRQUdELGtDQUFVLEdBQVY7WUFFSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUV0QyxDQUFDO1FBR0Qsa0NBQVUsR0FBVjtZQUVJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekMsQ0FBQztRQUdEOzs7V0FHRztRQUNILGdDQUFRLEdBQVI7WUFFSSxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBRXpELENBQUM7UUFHTCxvQkFBQztJQUFELENBNURBLEFBNERDLElBQUE7SUE1RFksZUFBYSxnQkE0RHpCLENBQUE7QUFFTCxDQUFDLEVBaEVNLENBQUMsS0FBRCxDQUFDLFFBZ0VQO0FDdEVEOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0ErSFA7QUEvSEQsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQVFOOztPQUVHO0lBQ0g7UUFLSSxrQkFBWSxxQkFBaUQsRUFBRSxDQUFVO1lBRXJFLElBQUksQ0FBUSxDQUFDO1lBRWIsRUFBRSxDQUFDLENBQUMsT0FBTyxxQkFBcUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQztZQUVYLENBQUM7WUFBQSxJQUFJLENBQ0wsRUFBRSxDQUFBLENBQUMsT0FBTyxxQkFBcUIsS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUUxQyxFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXBFLElBQUksR0FBRyxTQUFNLENBQUM7b0JBQ2QsR0FBRyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUM7Z0JBRVgsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxHQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3ZHLENBQUM7WUFFTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8scUJBQXFCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDO1lBRVgsQ0FBQztZQUNELFlBQVk7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFFM0UsQ0FBQztRQUdEOzs7V0FHRztRQUNILHdCQUFLLEdBQUw7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFHRCx1QkFBSSxHQUFKLFVBQUssUUFBa0I7WUFFbkIsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhCLENBQUM7UUFJRCx3QkFBSyxHQUFMLFVBQU0sUUFBa0I7WUFFcEIsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhCLENBQUM7UUFHRCwyQkFBUSxHQUFSLFVBQVMsQ0FBUztZQUVkLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhCLENBQUM7UUFHRCw2QkFBVSxHQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR25FLENBQUM7UUFFRCxtQ0FBZ0IsR0FBaEI7WUFFSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQ3ZCLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUMvQixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzlDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFHRCw4QkFBVyxHQUFYLFVBQVksUUFBa0I7WUFFMUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gsMkJBQVEsR0FBUjtZQUVJLE1BQU0sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFM0MsQ0FBQztRQUdMLGVBQUM7SUFBRCxDQWxIQSxBQWtIQyxJQUFBO0lBbEhZLFVBQVEsV0FrSHBCLENBQUE7QUFFTCxDQUFDLEVBL0hNLENBQUMsS0FBRCxDQUFDLFFBK0hQO0FDdElEOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SCxJQUFPLENBQUMsQ0FvR1A7QUFwR0QsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQVNOOztPQUVHO0lBQ0g7UUFBa0MsZ0NBQVU7UUFReEMsc0JBQVksV0FBd0MsRUFBRSxDQUFVLEVBQUUsSUFBd0I7WUFBeEIsb0JBQXdCLEdBQXhCLFFBQXdCO1lBRXRGLElBQUksQ0FBUSxDQUFDO1lBRWIsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFbEMsNENBQTRDO2dCQUM1Qyx5QkFBeUI7Z0JBRXpCLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFHNUIsQ0FBQztZQUFBLElBQUksQ0FDTCxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBRXBCLENBQUM7WUFHRCxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFHWixJQUFJLFVBQWdCLENBQUM7WUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7WUFHRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDeEYsQ0FBQztZQUdELElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBRTNCLENBQUM7UUFHRDs7O1dBR0c7UUFDSCw0QkFBSyxHQUFMO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gsa0NBQVcsR0FBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUdEOzs7V0FHRztRQUNILCtCQUFRLEdBQVI7WUFFSSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTztnQkFDeEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMzRixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVqRyxDQUFDO1FBR0wsbUJBQUM7SUFBRCxDQXZGQSxBQXVGQyxDQXZGaUMsQ0FBQyxDQUFDLFFBQVEsR0F1RjNDO0lBdkZZLGNBQVksZUF1RnhCLENBQUE7QUFDTCxDQUFDLEVBcEdNLENBQUMsS0FBRCxDQUFDLFFBb0dQO0FDekdELElBQU8sQ0FBQyxDQStGUDtBQS9GRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBQ047UUFJSTtZQUFZLG1CQUF5QjtpQkFBekIsV0FBeUIsQ0FBekIsc0JBQXlCLENBQXpCLElBQXlCO2dCQUF6QixrQ0FBeUI7O1lBRWpDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBRXBCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUV4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QyxDQUFDO1lBRUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQyxXQUFXO1lBRVgsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDdkQsQ0FBQztRQUdMLENBQUM7UUFHRCwyQkFBWSxHQUFaLFVBQWEsUUFBa0I7WUFFM0Isb0NBQW9DO1lBRXBDLElBQUksUUFBZ0IsRUFDaEIsRUFBVSxFQUNWLEVBQVUsRUFDVixhQUFzQixFQUN0QixTQUFrQixDQUFDO1lBQ3ZCLEdBQUcsQ0FBQSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUduQyxhQUFhLEdBQUMsS0FBSyxDQUFDO2dCQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBRTdDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ1AsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ1gsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3dCQUFBLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBRXZDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBRXBCLFFBQVEsQ0FBQyxDQUFDLEVBQ1YsUUFBUSxDQUFDLENBQUMsRUFDVixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUMsVUFBVSxDQUFBLGFBQWE7cUJBQ3RELENBQUM7b0JBRUYsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7d0JBQ2hCLGFBQWEsR0FBQyxJQUFJLENBQUM7d0JBQ25CLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQWVMLENBQUM7Z0JBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUVwQyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVoQixDQUFDO1FBR0wsV0FBQztJQUFELENBN0ZBLEFBNkZDLElBQUE7SUE3RlksTUFBSSxPQTZGaEIsQ0FBQTtBQUNMLENBQUMsRUEvRk0sQ0FBQyxLQUFELENBQUMsUUErRlA7QUNoR0Q7OztHQUdHO0FBQ0gsd0hBQXdIO0FBSXhILElBQU8sQ0FBQyxDQWtTUDtBQWxTRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBR047UUFFSTs7O1dBR0c7UUFDSCxtQkFBWSxTQUFnQjtZQUV4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gseUJBQUssR0FBTDtZQUNJLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBR0Q7Ozs7V0FJRztRQUNILDRCQUFRLEdBQVIsVUFBUyxTQUFtQjtZQUV4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUV4QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSCx1QkFBRyxHQUFILFVBQUksU0FBbUI7WUFFbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBRUwsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7V0FHRztRQUNILDRCQUFRLEdBQVIsVUFBUyxDQUFRO1lBRWIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO1lBR0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7V0FHRztRQUNILDBCQUFNLEdBQU4sVUFBTyxDQUFRO1lBRVgsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRWhCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWxCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFbEIsQ0FBQztnQkFFTCxDQUFDO1lBR0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7V0FHRztRQUNILHlCQUFLLEdBQUwsVUFBTSxRQUFpQjtZQUVuQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVuQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBRUwsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7V0FHRztRQUNILCtCQUFXLEdBQVg7WUFFSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVuQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO1lBR0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLENBQUM7UUFHRDs7OztXQUlHO1FBQ0gsMkJBQU8sR0FBUCxVQUFRLFFBQWtCO1lBRXRCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFFM0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFHOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUk7Z0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUdILElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztZQUVqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWxCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUc3QixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxXQUFXLENBQUM7b0JBQUEsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksV0FBVyxDQUFDO29CQUFBLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRTFDLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFM0MsQ0FBQztZQUVELFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRy9CLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLENBQUM7UUFHRDs7OztXQUlHO1FBQ0gsMEJBQU0sR0FBTixVQUFPLFNBQW1CO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFBQSxNQUFNLENBQUMsS0FBSyxDQUFDO1lBRTNDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEMsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFaEIsQ0FBQztRQUdEOzs7V0FHRztRQUNILDRCQUFRLEdBQVI7WUFFSSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFFakIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztnQkFFTCxDQUFDO1lBRUwsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlCLENBQUM7UUFHRCwwQkFBTSxHQUFOO1lBRUksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWpCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRW5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBRS9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQW9CLENBQUMsQ0FBQSwyQkFBMkI7d0JBRTVFLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLEdBQUcsR0FBRyxHQUFHLGVBQWUsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDO29CQUN4SSxDQUFDO2dCQUVMLENBQUM7WUFFTCxDQUFDO1lBQ0QsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxjQUFjLEdBQUcseUJBQXlCLEdBQUcsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUV2RSxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRTFCLENBQUM7UUFHTCxnQkFBQztJQUFELENBNVJBLEFBNFJDLElBQUE7SUE1UlksV0FBUyxZQTRSckIsQ0FBQTtBQUdMLENBQUMsRUFsU00sQ0FBQyxLQUFELENBQUMsUUFrU1A7QUMxU0Q7OztHQUdHO0FBQ0gsd0hBQXdIO0FBR3hILElBQU8sQ0FBQyxDQXFiUDtBQXJiRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBZU47O09BRUc7SUFDSDtRQUFBO1FBZ2FBLENBQUM7UUE3Wkc7Ozs7O1dBS0c7UUFDSSxVQUFJLEdBQVgsVUFBWSxDQUFTO1lBQ2pCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQ0QsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFFRCwyQkFBMkI7UUFFM0I7Ozs7OztXQU1HO1FBQ0ksYUFBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLE1BQWM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsMkJBQTJCO1FBRTNCOzs7Ozs7V0FNRztRQUNJLGtCQUFZLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSx5QkFBaUM7WUFFakUseUJBQXlCLEdBQUcseUJBQXlCLElBQUksQ0FBQyxDQUFDLENBQUEseUJBQXlCO1lBR3BGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUV6RCx3QkFBd0I7WUFHeEIsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDcEIsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLHNCQUFzQjtZQUN0QixNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVwQixzQkFBc0I7WUFFdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVsQixDQUFDO1FBRUQsMkJBQTJCO1FBRTNCOzs7Ozs7V0FNRztRQUNJLGVBQVMsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLElBQVc7WUFDdEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDOUIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQztRQUVELDJCQUEyQjtRQUUzQjs7OztXQUlHO1FBQ0ksYUFBTyxHQUFkLFVBQWUsT0FBYztZQUN6QixNQUFNLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzdDLENBQUM7UUFFRCwyQkFBMkI7UUFFM0I7Ozs7V0FJRztRQUNJLGFBQU8sR0FBZCxVQUFlLE9BQWM7WUFDekIsTUFBTSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsMkJBQTJCO1FBRTNCOzs7OztXQUtHO1FBQ0ksYUFBTyxHQUFkLFVBQWUsQ0FBUSxFQUFFLENBQVE7WUFDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUdELDJCQUEyQjtRQUdwQixnQkFBVSxHQUFqQixVQUFrQixDQUFRLEVBQUUsQ0FBUTtZQUVoQyxJQUFJLE1BQU0sR0FBRztnQkFDVCxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBRTFDLENBQUM7WUFHRixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQixDQUFDO1FBRUQsMkJBQTJCO1FBR3BCLGdCQUFVLEdBQWpCLFVBQWtCLElBQVcsRUFBRSxHQUFVO1lBRXJDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9CLElBQUksTUFBTSxHQUFHO2dCQUNULENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7Z0JBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7YUFFMUIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBCLENBQUM7UUFFRCwyQkFBMkI7UUFFM0IsZ0NBQWdDO1FBQ3pCLGNBQVEsR0FBZixVQUFnQixDQUFTLEVBQUUsQ0FBUSxFQUFFLEdBQVU7WUFHM0MsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUc1QixJQUFJLE1BQU0sR0FBRztnQkFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJO2dCQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJO2FBRTFCLENBQUM7WUFFRixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQixDQUFDO1FBRUQsd0hBQXdIO1FBR2pILHdCQUFrQixHQUF6QixVQUEwQixJQUFXLEVBQUUsUUFBaUI7WUFHcEQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdFLENBQUM7UUFFRCx3SEFBd0g7UUFHeEg7Ozs7OztXQU1HO1FBQ0ksYUFBTyxHQUFkLFVBQWUsS0FBUyxFQUFFLE1BQVE7WUFBUixzQkFBUSxHQUFSLFVBQVE7WUFFOUIsK0NBQStDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQztnQkFBQSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUM7UUFFTCxDQUFDO1FBRUQsNERBQTREO1FBRTVEOzs7Ozs7V0FNRztRQUNJLFdBQUssR0FBWixVQUFhLEtBQVMsRUFBRSxNQUFRO1lBQVIsc0JBQVEsR0FBUixVQUFRO1lBRTVCLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLENBQUM7Z0JBQUEsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbEQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBRUwsQ0FBQztRQUVELDREQUE0RDtRQUU1RDs7Ozs7O1dBTUc7UUFDSSxZQUFNLEdBQWIsVUFBYyxLQUFZLEVBQUUsR0FBVSxFQUFFLEdBQVU7WUFFOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFBQSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWpCLENBQUM7UUFHRDs7Ozs7Ozs7O1dBU0c7UUFDSSxjQUFRLEdBQWYsVUFBZ0IsR0FBVSxFQUFFLEdBQVUsRUFBRSxHQUFVLEVBQUUsR0FBVSxFQUFFLEdBQVUsRUFBRSxHQUFVO1lBRWxGLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDWCxHQUFHLElBQUksR0FBRyxDQUFDO1lBRVgsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNYLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFHWCxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFHdkIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztnQkFBQSxNQUFNLENBQUMsS0FBSyxDQUFDO1lBR2xDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFdEMsTUFBTSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBRTVCLENBQUM7UUFHRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSSxtQkFBYSxHQUFwQixVQUFxQixHQUFVLEVBQUUsR0FBVSxFQUFFLEdBQVUsRUFBRSxHQUFVLEVBQUUsR0FBVSxFQUFFLEdBQVUsRUFBRSxHQUFVLEVBQUUsR0FBVTtZQUcvRyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLFNBQVMsQ0FBQztZQUVkLGlEQUFpRDtZQUVqRCxzREFBc0Q7WUFDdEQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBCLHNEQUFzRDtnQkFDdEQsa0JBQWtCO2dCQUVsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUUxRCxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7WUFHMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVKLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUM7Z0JBRWpDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNELENBQUM7WUFHRCx3REFBd0Q7WUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRkF3QnNFO1lBRXRFLGlDQUFpQztZQUdqQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXJCLENBQUM7UUFHTSxZQUFNLEdBQWIsVUFBYyxTQUFrQixFQUFFLElBQVc7WUFFekMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFFZCxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBRVgsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFFdkMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFBQSxRQUFRLENBQUM7d0JBRTNFLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QixLQUFLLEVBQUUsQ0FBQztvQkFFWixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBRXpCLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUdNLGlCQUFXLEdBQWxCLFVBQW1CLEtBQVk7WUFDM0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ0ksaUJBQVcsR0FBbEIsVUFBbUIsT0FBYyxFQUFFLFVBQWlCLEVBQUUsS0FBWSxFQUFFLE9BQWMsRUFBRSxLQUFZO1lBRzVGLElBQUksT0FBTyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUU5QixJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUUxQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFHNUIsQ0FBQztRQUdMLFlBQUM7SUFBRCxDQWhhQSxBQWdhQyxJQUFBO0lBaGFZLE9BQUssUUFnYWpCLENBQUE7QUFHTCxDQUFDLEVBcmJNLENBQUMsS0FBRCxDQUFDLFFBcWJQO0FDNWJEOzs7R0FHRztBQUNILHdIQUF3SDtBQUl4SCxJQUFPLENBQUMsQ0F3RVA7QUF4RUQsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQVVOO1FBS0k7O1dBRUc7UUFDSCxjQUFZLElBQVU7WUFFbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFFTCxDQUFDO1FBR0Q7OztXQUdHO1FBQ0gsK0JBQWdCLEdBQWhCO1lBRUksSUFBSSxJQUFJLENBQUM7WUFFVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFFMUQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVKLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUVqQyxDQUFDO1lBR0QsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFHeEMsSUFBSSxjQUFjLEdBQUcsd0lBRytDLEdBQUcsU0FBUyxHQUFHLGlJQUdoRCxHQUFHLElBQUksR0FBRyxvQ0FDN0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyw0RUFLdkQsQ0FBQztZQUVGLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVCLENBQUM7UUFHTCxXQUFDO0lBQUQsQ0EzREEsQUEyREMsSUFBQTtJQTNEWSxNQUFJLE9BMkRoQixDQUFBO0FBR0wsQ0FBQyxFQXhFTSxDQUFDLEtBQUQsQ0FBQyxRQXdFUDtBQy9FRDs7O0dBR0c7QUFDSCx3SEFBd0g7QUFDeEgsSUFBTyxDQUFDLENBcUJQO0FBckJELFdBQU8sQ0FBQztJQUFDLElBQUEsS0FBSyxDQXFCYjtJQXJCUSxXQUFBLEtBQUssRUFBQSxDQUFDO1FBR0EsY0FBUSxHQUFHO1lBQ2xCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztZQUM5SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDM0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQzdILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztZQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7WUFDNUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQzdILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztZQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7WUFDL0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBQyxDQUFDO1lBQ3BJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztZQUNuSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7WUFDMUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUks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QUFDO2dCQUFBLENBQUMsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQUEsQ0FBQyxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsMkJBQTJCO1lBQzNCLE1BQU0sQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWQsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUVKLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBR3Z2SyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBRXZCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFHLE9BQU8sRUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7U0FJakQsQ0FBQyxFQUdGLFVBQVMsTUFBTSxFQUFDLGVBQWU7WUFFM0IsRUFBRSxDQUFB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LENBQUM7b0JBQzdCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUdMLGNBQUM7UUFBRCxDQXhCQSxBQXdCQyxDQXhCYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUF3QjFCLENBQ0osQ0FBQztJQUVOLENBQUMsRUFqQ1EsS0FBSyxHQUFMLE9BQUssS0FBTCxPQUFLLFFBaUNiO0FBQUQsQ0FBQyxFQWpDTSxDQUFDLEtBQUQsQ0FBQyxRQWlDUCIsImZpbGUiOiJ0b3ducy1zaGFyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBJbml0aWFsaXplIG5hbWVzcGFjZSBUb3duc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBUb3ducyBuYW1lc3BhY2UgLSB1bmRlciB0aGlzIG9iamVjdCBhcmUgYWxsIFRvd25zIGNsYXNzZXMgYW5kIGluc3RhbmNlcy5cbiAqIEB0eXBlIHtvYmplY3R9XG4gKi9cblxudmFyIFQgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0gIFQ7XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBJbml0aWFsaXplIG5hbWVzcGFjZSBUb3duc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVHtcbiAgICBleHBvcnQgY2xhc3MgTG9jYWxle1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCbGFuayBlbXVsYXRvciBvZiBsb2NhbGUgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBsb2NhbGVfa2V5cyB7QXJyYXk8c3RyaW5nPn1cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQoLi4ubG9jYWxlX2tleXM6QXJyYXk8c3RyaW5nPik6c3RyaW5ne1xuXG4gICAgICAgICAgICByZXR1cm4obG9jYWxlX2tleXMuam9pbignICcpKTtcblxuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IFdyYXBwZXIgZm9yIGNvbnNvbGUubG9nXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBULkFycmF5RnVuY3Rpb25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGZ1bmN0aW9ucyB0byBtYW5pcHVsYXRlIHdpdGggYXJyYXkuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIEFycmF5RnVuY3Rpb25zIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gS2V5IG9mIG9iamVjdCB3aXRoIHRoaXMgSUQsIC0xIGlmIG5vdCBleGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkMmkoYXJyYXk6IEFycmF5LCBpZDpzdHJpbmcpOmFueSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG5cbiAgICAgICAgfVxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yX21lc3NhZ2Ugd2hlbiBpdGVuIG5vdCBleGlzdHNcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gT2JqZWN0IHdpdGggdGhpcyBJRCwgbnVsbCBpZiBub3QgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZDJpdGVtKGFycmF5OiBBcnJheSwgaWQ6IHN0cmluZywgZXJyb3JfbWVzc2FnZSA9ICcnKTphbnkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKXJldHVybiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIERlbGV0ZSBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkUmVtb3ZlKGFycmF5OiBBcnJheSwgaWQ6IHN0cmluZyk6Ym9vbGVhbiB7Ly90b2RvIHJlZmFjdG9yIHVzZSB0aGlzIG5vdCBzcGxpY2VcblxuICAgICAgICAgICAgZm9yICh2YXIgaT0wLGw9YXJyYXkubGVuZ3RoO2k8bDtpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIDJEIGFycmF5XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaXRlcmF0ZTJEKGFycmF5OiBBcnJheSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICAgICAgLy9yKGFycmF5KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIHlMZW4gPSBhcnJheS5sZW5ndGg7IHkgPCB5TGVuOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeExlbiA9IGFycmF5W3ldLmxlbmd0aDsgeCA8IHhMZW47IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHksIHgpO1xuICAgICAgICAgICAgICAgICAgICAvKnRvZG8gcmVmYWN0b3IgdG8geCx5Ki9cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSBmcm9tXG4gICAgICAgICAqIEBwYXJhbSB0b1xuICAgICAgICAgKiBAcmV0dXJuIHthcnJheX0gUmVtb3ZlZCBpdGVtc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJlbW92ZUl0ZW1zKGFycmF5OkFycmF5LCBmcm9tOm51bWJlciwgdG86bnVtYmVyKTpBcnJheSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgICAgICAgICByZXR1cm4gYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqIHRvZG8gc2hvdWxkIGl0IGJlIHVuZGVyIFQuQXJyYXlGdW5jdGlvbnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iZWN0XG4gICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHBhdGhcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBmaWx0ZXJQYXRoKG9iamVjdDogT2JqZWN0LCBwYXRoOiBBcnJheTxzdHJpbmc+LCBzZXRWYWx1ZTogYW55KTphbnkge1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGZvciAodmFyIHBhdGhfaSBpbiBwYXRoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0X2tleSA9IHBhdGhbcGF0aF9pXTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXRoX2kgPCBwYXRoLmxlbmd0aCAtIDEgfHwgdHlwZW9mIHNldFZhbHVlID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3Rbb2JqZWN0X2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlclBhdGg6IEtleSBcXCcnK29iamVjdF9rZXkrJ1xcJyBpbiBwYXRoIGluIG9iamVjdCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG9iamVjdFtvYmplY3Rfa2V5XTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W29iamVjdF9rZXldID0gc2V0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgY29udGFpbmluZyBvbmx5IHVuaXF1ZSB2YWx1ZXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB1bmlxdWUoYXJyYXk6IEFycmF5KTpBcnJheSB7XG4gICAgICAgICAgICB2YXIgbiA9IHt9LCByID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBuW2FycmF5W2ldXSA9IGFycmF5O1xuICAgICAgICAgICAgICAgICAgICByLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGh0bWwgdGFibGUgZnJvbSBKUyBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbF9jbGFzc1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBodG1sXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYXJyYXkydGFibGUoYXJyYXk6QXJyYXksIGFkZGl0aW9uYWxfY2xhc3MgPSAnJyk6c3RyaW5nIHtcbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgcm93cyA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb2xzX3RhYmxlID0gYXJyYXlbMF0ubGVuZ3RoOy8vdG9kbyBpcyBpcyBiZXN0IHNvbHV0aW9uP1xuXG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cIicgKyBhZGRpdGlvbmFsX2NsYXNzICsgJ1wiPic7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCByb3dzOyByb3crKykge1xuXG5cbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+JztcblxuICAgICAgICAgICAgICAgIHZhciBjb2xzID0gYXJyYXlbcm93XS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGNvbHNfc3BhbiA9IGNvbHNfdGFibGUgLSBjb2xzO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sID09IGNvbHMgLSAxICYmIGNvbHNfc3BhbiAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY29sc3Bhbj1cIicgKyAoY29sc19zcGFuICsgMSkgKyAnXCI+JztcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JztcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPC90ZD4nO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90YWJsZT4nO1xuXG4gICAgICAgICAgICByZXR1cm4gKGh0bWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBleHRyYWN0IGtleXMgZnJvbSBBcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXRLZXlzKG9iamVjdDpPYmplY3QpOkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSBrZXlzLnB1c2goayk7XG4gICAgICAgICAgICByZXR1cm4gKGtleXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIC8qKlxuICAgICAqIEdhbWUgY29uZGl0aW9uc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBHYW1lIHtcblxuICAgICAgICBwdWJsaWMgYWN0aW9uX2NsYXNzZXM6T2JqZWN0O1xuICAgICAgICBwdWJsaWMgYWN0aW9uX2VtcHR5X2luc3RhbmNlczpPYmplY3Q7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWF4X2xpZmVfbW9kaWZpZXJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJpY2Vfa2V5X21vZGlmaWVyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG1heF9saWZlX21vZGlmaWVyOkZ1bmN0aW9uLCBwdWJsaWMgcHJpY2Vfa2V5X21vZGlmaWVyOkZ1bmN0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlcyA9IHt9O1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBudW1iZXJzXG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdDpULk9iamVjdHMuT2JqZWN0KSB7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlcyA9IFtdO1xuXG5cbiAgICAgICAgICAgIC8qaWYgKG9iamVjdC5hY3Rpb25zLmxlbmdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSW4gb2JqZWN0ICcgKyBvYmplY3QgKyAnIHRoZXJlIGFyZSBubyBhY3Rpb25zIScpOy8vdG9kbyBhbGwgb2JqZWN0cyBzaG91bGQgYmUgY29udmVydGVkIHRvIHN0cmluZyBsaWtlIHRoaXNcbiAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbjphbnkpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBNYXRoLmNlaWwoYWN0aW9uLmNvdW50UHJpY2VCYXNlKCkpOy8vXG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgTmFOICB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihwcmljZV9iYXNlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnICsgYWN0aW9uLnR5cGUgKyAnIG1ha2VzIHByaWNlIGJlc2UgTmFOLicpO1xuICAgICAgICAgICAgICAgICAgICBwcmljZV9iYXNlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgbm9uIG5lZ2F0aXZlIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHByaWNlX2Jhc2UgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1zIGluIGFjdGlvbiBhYmlsaXR5ICcgKyBhY3Rpb24udHlwZSArICcgc2hvdWxkIG5vdCBtYWtlIHRoaXMgYWN0aW9uIG5lZ2F0aXZlJyk7Ly90b2RvIG1heWJlIG9ubHkgd2FyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgcHJpY2VfYmFzZXMucHVzaChwcmljZV9iYXNlKTtcblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZV9iYXNlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBtYXhpbXVtIGxpZmUgb2Ygb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RNYXhMaWZlKG9iamVjdDpULk9iamVjdHMuT2JqZWN0KSB7XG5cbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlcyA9IHRoaXMuZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3QpO1xuICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBwcmljZV9iYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKHB2LCBjdikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwdiArIGN2O1xuICAgICAgICAgICAgfSwgMCk7XG5cblxuICAgICAgICAgICAgcHJpY2VfYmFzZSA9IHRoaXMubWF4X2xpZmVfbW9kaWZpZXIocHJpY2VfYmFzZSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2VfYmFzZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7YXJyYXl9IG9mIFJlc291cmNlc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCkge1xuXG5cbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlcyA9IHRoaXMuZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3QpO1xuXG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwcmljZXMgPSBbXTtcblxuXG4gICAgICAgICAgICB2YXIgZGVzaWduX3Jlc291cmNlcyA9IG9iamVjdC5nZXRNb2RlbCgpLmFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKTtcblxuXG4gICAgICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb246YW55LCBpOm51bWJlcikge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzX2xpc3QgPVxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZ2V0UHJpY2VSZXNvdXJjZXMoKS5zb3J0KGZ1bmN0aW9uIChhOmFueSwgYjphbnkpIHsvL3RvZG8gaXMgaXQgc2FmZT9cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShhLmNsb25lKCkuc2lnbnVtKCkpIC0gZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGIuY2xvbmUoKS5zaWdudW0oKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV9yZXNvdXJjZXMgPSBwcmljZV9yZXNvdXJjZXNfbGlzdFswXS5jbG9uZSgpO1xuXG5cbiAgICAgICAgICAgICAgICBwcmljZV9yZXNvdXJjZXMubXVsdGlwbHkocHJpY2VfYmFzZXNbaV0pO1xuICAgICAgICAgICAgICAgIHByaWNlcy5wdXNoKHByaWNlX3Jlc291cmNlcyk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2VzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFJlc291cmNlcyAtIHByaWNlIG9mIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0UHJpY2Uob2JqZWN0OlQuT2JqZWN0cy5BcnJheSkge1xuXG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBwcmljZScscHJpY2UpO1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VzID0gdGhpcy5nZXRPYmplY3RQcmljZXMob2JqZWN0KTtcblxuICAgICAgICAgICAgcHJpY2VzLmZvckVhY2goZnVuY3Rpb24gKHByaWNlXykge1xuXG4gICAgICAgICAgICAgICAgcHJpY2UuYWRkKHByaWNlXyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmljZS5hcHBseSh0aGlzLnByaWNlX2tleV9tb2RpZmllcik7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGluc3RhbGxBY3Rpb25DbGFzcyhhY3Rpb25fZW1wdHlfaW5zdGFuY2VfcGFyYW1zOk9iamVjdCwgYWN0aW9uX2NsYXNzOmFueSkge1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGFjdGlvbl9jbGFzcy5wcm90b3R5cGUuZ2V0VHlwZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IGFjdGlvbiBjbGFzcyBoYXMgbm8gdHlwZSEnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IHRoZXJlIGlzIGFscmVhZHkgaW5zdGFsbGVkIGFjdGlvbiB3aXRoIHR5cGUgJyArIHR5cGUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fZW1wdHlfaW5zdGFuY2UgPSBuZXcgYWN0aW9uX2NsYXNzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtc1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgLy9BZGRpbmcgbWV0aG9kIGNsb25lIHRvIGluc3RhbGxlZCBhY3Rpb24gY2xhc3NcbiAgICAgICAgICAgIGFjdGlvbl9jbGFzcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgYWN0aW9uX2NsYXNzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gPSBhY3Rpb25fY2xhc3M7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbdHlwZV0gPSBhY3Rpb25fZW1wdHlfaW5zdGFuY2U7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBY3Rpb25DbGFzcyhhY3Rpb25fdHlwZTpzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX3R5cGVdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbl9jbGFzcyA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJyArIGFjdGlvbl90eXBlICsgJy4gVGhlcmUgYXJlIG9ubHkgdGhlc2UgYWN0aW9uIHR5cGVzOiAnICsgVC5BcnJheUZ1bmN0aW9ucy5nZXRLZXlzKHRoaXMuYWN0aW9uX2NsYXNzZXMpLmpvaW4oJywgJykpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoYWN0aW9uX2NsYXNzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBuZXdBY3Rpb25JbnN0YW5jZShhY3Rpb246YW55KSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyBzb2x2ZSBkZWZlbnNlIHZzLiBkZWZlbmNlXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdkZWZlbnNlJykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi50eXBlID0gJ2RlZmVuY2UnO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5wYXJhbXMuZGVmZW5jZSA9IGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgICAgICBkZWxldGUgYWN0aW9uLnBhcmFtcy5kZWZlbnNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb24udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgYWN0aW9uX2NsYXNzKGFjdGlvbik7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNyZWF0ZUFjdGlvbkV4ZWN1dGUoYWN0aW9uX3R5cGU6c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciBnYW1lID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGUpO1xuXG5cbiAgICAgICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChnYW1lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25fY2xhc3MuZXhlY3V0ZS5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGV4ZWN1dGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBY3Rpb25FbXB0eUluc3RhbmNlKGFjdGlvbl90eXBlOnN0cmluZykge1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2luc3RhbmNlID0gdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25faW5zdGFuY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJyArIGFjdGlvbl90eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChhY3Rpb25faW5zdGFuY2UpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypnZXRBY3Rpb25FeGVjdXRlKGFjdGlvbl9rZXkpe1xuXG4gICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25fY2xhc3Nlc1thY3Rpb25fa2V5XTtcblxuICAgICAgICAgaWYodHlwZW9mIGFjdGlvbj09J3VuZGVmaW5lZCcpdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFjdGlvbiB0eXBlICcrYWN0aW9uX2tleSsnLicpO1xuXG4gICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cblxuXG4gICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgIHZhciBhcmdzID0gW2dhbWVdLnB1c2guY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlX2NhbGxiYWNrLmFwcGx5KHRoaXMsYXJncyk7XG5cbiAgICAgICAgIH07XG5cblxuXG4gICAgICAgICByZXR1cm4oZXhlY3V0ZSk7XG4gICAgICAgICB9Ki9cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lLkFjdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuR2FtZSB7XG5cblxuICAgIGludGVyZmFjZSBBY3Rpb25QYXJhbXNPYmplY3R7XG4gICAgICAgIGNvb2xkb3duOiBudW1iZXI7XG4gICAgfVxuICAgIGludGVyZmFjZSBBY3Rpb25PYmplY3R7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgcGFyYW1zOiBBY3Rpb25QYXJhbXNPYmplY3Q7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbiB7XG5cblxuICAgICAgICBwdWJsaWMgbGFzdF91c2U6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwYXJhbXM6QWN0aW9uUGFyYW1zT2JqZWN0O1xuXG5cbiAgICAgICAgY29uc3RydWN0b3IoYWN0aW9uOkFjdGlvbk9iamVjdCkge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0VHlwZSgpID09PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBleHRlbmQgVC5HYW1lLkFjdGlvbiBhbmQgYWRkIG1ldGhvZCBnZXRUeXBlIGJlZm9yZSBjcmVhdGluZyBpbnN0YW5jZXMhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXRUeXBlKCk7XG5cblxuICAgICAgICAgICAgaWYgKGFjdGlvbi50eXBlICE9PSB0eXBlKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgJyArIHR5cGUgKyAnIG5vdCAnICsgYWN0aW9uLnR5cGUgKyAnIGNsYXNzIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gYWN0aW9uW2tleV07XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBwYXJhbXNcblxuICAgICAgICAgICAgLypmb3IodmFyIHBhcmFtIGluIGFjdGlvbkFiaWxpdHkucGFyYW1zKXtcbiAgICAgICAgICAgICB2YXIgcGFyYW1fdHlwZSA9IGFjdGlvbi5hYmlsaXR5X3BhcmFtc1twYXJhbV07XG5cbiAgICAgICAgICAgICBpZih0eXBlb2YgYWN0aW9uQWJpbGl0eS5wYXJhbXNbcGFyYW1dIT09cGFyYW1fdHlwZSl7XG4gICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbSAnK3BhcmFtKycgc2hvdWxkIGJlICcrcGFyYW1fdHlwZSsnIGluc3RlYWQgb2YgJyt0eXBlb2YoYWN0aW9uQWJpbGl0eS5hYmlsaXR5X3BhcmFtc1twYXJhbV0pKycgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb25BYmlsaXR5LnR5cGUpO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFR5cGUoKTpzdHJpbmd7XG4gICAgICAgICAgICByZXR1cm4gKCd1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCk6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIChbXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBleGVjdXRlKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBleGVjdXRlIHBhc3NpdmUgYWN0aW9uLicpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW4gaG93IG1hbnkgc2Vjb25kcyBjYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQ/XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjYW5CZUV4ZWN1dGVkSW4oKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJhbXMuY29vbGRvd24gPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGFzdF91c2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBNYXRoLmFicyh0aGlzLmxhc3RfdXNlIC0gbmV3IERhdGUoKSkgLyAxMDAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmNvb2xkb3duIDw9IHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMucGFyYW1zLmNvb2xkb3duIC0gcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkIG5vdz9cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBjYW5CZUV4ZWN1dGVkTm93KCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNhbkJlRXhlY3V0ZWRJbigpID09PSAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBhY3R1YWwgZGF0ZSBhcyBkYXRlIG9mIGV4ZWN1dGlvbiB0aGlzIGFjdGlvbiBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgbm93RXhlY3V0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RfdXNlID0gbmV3IERhdGUoKS8xO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBodG1sIHByb2ZpbGUgb2YgYWN0aW9uIGFiaWxpdHlcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUh0bWxQcm9maWxlKCkge1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJhY3Rpb24tYWJpbGl0eS1wcm9maWxlXCI+JztcblxuICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIyXCI+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSkgKyBgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0X3VzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsICdsYXN0X3VzZWQnKSArIGA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gICsgdGhpcy5sYXN0X3VzZSArIGA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgcGFyYW0gaW4gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSwgcGFyYW0pICsgYDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyB0aGlzLnBhcmFtc1twYXJhbV0gKyBgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgcmV0dXJuIChodG1sKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTWFwR2VuZXJhdG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBNYXBHZW5lcmF0b3Ige1xuXG4gICAgICAgIHB1YmxpYyBiaW90b3BlOlQuTWFwR2VuZXJhdG9yLkJpb3RvcGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGdldFpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gel9ub3JtYWxpemluZ190YWJsZVxuICAgICAgICAgKiBAcGFyYW0ge1QuTWFwR2VuZXJhdG9yLkJpb3RvcGV9IGJpb3RvcGVcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdmlydHVhbE9iamVjdEdlbmVyYXRvclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZXRaOkZ1bmN0aW9uLCBwdWJsaWMgel9ub3JtYWxpemluZ190YWJsZTpBcnJheSwgcHVibGljIGJpb3RvcGU6QXJyYXksIHB1YmxpYyB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yOkZ1bmN0aW9uKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlcjpULlBvc2l0aW9uLCByYWRpdXM6bnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciBtYXAgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPD0gcmFkaXVzICogMjsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICBtYXBbeV0gPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDw9IHJhZGl1cyAqIDI7IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5IC0gcmFkaXVzICsgMSAvIDIsIDIpID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLmdldFooeCAtIHJhZGl1cyArIGNlbnRlcl9pbnRlZ2VyLngsIHkgLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci55KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG1hcFt5XVt4XSA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChtYXApO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGVycmFpbk1hcChtYXA6QXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIG1hcF9iZyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgbCA9IG1hcC5sZW5ndGg7IHkgPCBsOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYmdbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGw7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWFwW3ldW3hdKSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFwX2JnW3ldW3hdID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKG1hcFt5XVt4XSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwX2JnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICB2YXIgYm91bmRzID0gMTtcblxuXG4gICAgICAgICAgICB2YXIgel9tYXAgPSB0aGlzLmdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLnRlcnJhaW5NYXAoel9tYXApO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1hcCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcF9hcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheTpBcnJheSwgY2VudGVyX2ludGVnZXI6VC5Qb3NpdGlvbiwgcmFkaXVzOm51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWFwX2FycmF5W3ldW3hdKSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG1hcF9hcnJheVt5XVt4XSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QueCA9IGNlbnRlcl9pbnRlZ2VyLnggLSByYWRpdXMgKyB4O1xuICAgICAgICAgICAgICAgICAgICBvYmplY3QueSA9IGNlbnRlcl9pbnRlZ2VyLnkgLSByYWRpdXMgKyB5O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldFB1cmVNYXAoY2VudGVyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5vdF9jZW50ZXI/OlQuUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjZW50ZXIsbm90X2NlbnRlcik7XG5cbiAgICAgICAgICAgIHZhciBjZW50ZXJfaW50ZWdlciA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKGNlbnRlci54KSxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKGNlbnRlci55KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG5vdF9jZW50ZXIpXG4gICAgICAgICAgICAgICAgbm90X2NlbnRlciA9IG5ldyBULlBvc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBub3RfY2VudGVyLnggLSBjZW50ZXJfaW50ZWdlci54LFxuICAgICAgICAgICAgICAgICAgICBub3RfY2VudGVyLnkgLSBjZW50ZXJfaW50ZWdlci55XG4gICAgICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAvKnZhciBtYXBfYXJyYXkgPSB0aGlzLmdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG4gICAgICAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLmNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKTsvKiovXG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHZhciB4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCB0Om51bWJlciwgb2JqZWN0OlQuT2JqZWN0cy5PYmplY3Q7XG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDw9IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPD0gcmFkaXVzICogMjsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh4IC0gcmFkaXVzICsgMSAvIDIsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHkgLSByYWRpdXMgKyAxIC8gMiwgMikgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocmFkaXVzLCAyKVxuICAgICAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAobm90X2NlbnRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh4IC0gbm90X2NlbnRlci54IC0gcmFkaXVzICsgMSAvIDIsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5IC0gbm90X2NlbnRlci55IC0gcmFkaXVzICsgMSAvIDIsIDIpIDw9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocmFkaXVzLCAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgeiA9IHRoaXMuZ2V0Wih4IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueCwgeSAtIHJhZGl1cyArIGNlbnRlcl9pbnRlZ2VyLnkpO1xuICAgICAgICAgICAgICAgICAgICB6ID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKHopO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codCk7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKHQpO1xuICAgICAgICAgICAgICAgICAgICBvYmplY3QueCA9IGNlbnRlcl9pbnRlZ2VyLnggLSByYWRpdXMgKyB4O1xuICAgICAgICAgICAgICAgICAgICBvYmplY3QueSA9IGNlbnRlcl9pbnRlZ2VyLnkgLSByYWRpdXMgKyB5O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULk9iamVjdHMuQXJyYXl9IG9iamVjdHNcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKG9iamVjdHM6VC5PYmplY3RzLkFycmF5KSB7XG5cblxuICAgICAgICAgICAgdmFyIHZpcnR1YWxfb2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgdmFyIG9iamVjdHNfMXgxX3JhdzogQXJyYXkgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzXzF4MV9yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3Iob2JqZWN0c18xeDFfcmF3W2ldLCB2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcGxldGUgdGVycmFpbiBhbmQgdmlydHVhbCBvYmplY3RzIGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyIERvbnQgZ2V0IG9iamVjdHMgbmVhciB0aGlzIGNlbnRlci5cbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX19XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDb21wbGV0ZU9iamVjdHMocmVhbF9vYmplY3RzOlQuT2JqZWN0cy5BcnJheSwgY2VudGVyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIsIG5hdHVyYWxfb2JqZWN0cyA9IHRydWUsIG5vdF9jZW50ZXI/OiBULlBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRlX29iamVjdHMgPSB0aGlzLmdldFB1cmVNYXAoY2VudGVyLCByYWRpdXMsIG5vdF9jZW50ZXIpO1xuXG5cbiAgICAgICAgICAgIHJlYWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIGlmIChuYXR1cmFsX29iamVjdHMpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSB0aGlzLmdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoY29tcGxldGVfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvci5CaW90b3BlXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk1hcEdlbmVyYXRvciB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBCaW90b3BlIHtcblxuXG4gICAgICAgIHB1YmxpYyB0ZXJyYWluczpBcnJheTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gdGVycmFpbnNcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcih0ZXJyYWlucykge1xuXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgIHRlcnJhaW5zLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW4pIHtcbiAgICAgICAgICAgICAgICBzdW0gKz0gdGVycmFpbi5hbW91bnQ7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZnJvbSA9IDA7XG4gICAgICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluKSB7XG5cbiAgICAgICAgICAgICAgICB0ZXJyYWluLmZyb20gPSBmcm9tIC8gc3VtO1xuICAgICAgICAgICAgICAgIGZyb20gKz0gdGVycmFpbi5hbW91bnQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlcnJhaW5zKTtcbiAgICAgICAgICAgIHRoaXMudGVycmFpbnMgPSB0ZXJyYWlucztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5UZXJyYWlufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0WlRlcnJhaW4oejpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50ZXJyYWlucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHogPj0gdGhpcy50ZXJyYWluc1tpXS5mcm9tKSByZXR1cm4gKHRoaXMudGVycmFpbnNbaV0udGVycmFpbik7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1vZGVsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBNb2RlbE9iamVjdHtcbiAgICAgICAgbmFtZTpzdHJpbmc7XG4gICAgICAgIHBhcnRpY2xlczpBcnJheTtcbiAgICAgICAgcm90YXRpb246bnVtYmVyO1xuICAgICAgICBzaXplOm51bWJlcjtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cblxuICAgICAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwYXJ0aWNsZXM6QXJyYXk7XG4gICAgICAgIHB1YmxpYyByb3RhdGlvbjpudW1iZXI7XG4gICAgICAgIHB1YmxpYyBzaXplOm51bWJlcjtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWwganNvblxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZSBpbiBjYXNlIG9mIGZhaWxcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihqc29uOk1vZGVsT2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoanNvbikgPT0gJ3VuZGVmaW5lZCcpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWU7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IGpzb24ucGFydGljbGVzO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IGpzb24ucm90YXRpb247XG4gICAgICAgICAgICB0aGlzLnNpemUgPSBqc29uLnNpemU7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5yb3RhdGlvbikgPT0gJ3VuZGVmaW5lZCcpdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuc2l6ZSkgPT0gJ3VuZGVmaW5lZCcpdGhpcy5zaXplID0gMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk1vZGVsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcm90YXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcbiAgICAgICAgICovXG4gICAgICAgIGFkZFJvdGF0aW9uU2l6ZShyb3RhdGlvbjpudW1iZXIsIHNpemU6bnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZSA9IDE7XG5cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gKz0gcm90YXRpb247XG4gICAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLnNpemUgKiBzaXplO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGltZW5zaW9uIHgseSx6LHh5XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gcmFuZ2VcbiAgICAgICAgICovXG4gICAgICAgIHJhbmdlKGRpbWVuc2lvbjpzdHJpbmcpIHtcblxuICAgICAgICAgICAgaWYgKGRpbWVuc2lvbiA9PSAneHknKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gVC5UTWF0aC54eTJkaXN0KHRoaXMucmFuZ2UoJ3gnKSwgdGhpcy5yYW5nZSgneScpICogdGhpcy5zaXplKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXNMaW5lYXIgPSB0aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG4gICAgICAgICAgICB2YXIgbWF4Om51bWJlciwgbWluOm51bWJlciwgbWF4XzpudW1iZXIsIG1pbl86bnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXNMaW5lYXIpIHtcblxuXG4gICAgICAgICAgICAgICAgbWluXyA9IHBhcnRpY2xlc0xpbmVhcltpXS5wb3NpdGlvbltkaW1lbnNpb25dO1xuICAgICAgICAgICAgICAgIG1heF8gPSBwYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXSArIHBhcnRpY2xlc0xpbmVhcltpXS5zaXplW2RpbWVuc2lvbl07XG5cbiAgICAgICAgICAgICAgICAvL3RvZG8gZmVhdHVyZSByZXZlcnNlXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcpbWF4ID0gbWF4XztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcpbWluID0gbWluXztcblxuXG4gICAgICAgICAgICAgICAgaWYgKG1heF8gPiBtYXgpbWF4ID0gbWF4XztcbiAgICAgICAgICAgICAgICBpZiAobWluXyA8IG1pbiltaW4gPSBtaW5fO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLmFicyhtaW4gLSBtYXgpLyp0aGlzLnNpemUqLyk7Ly90b2RvIHJvdGF0aW9uXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3pcbiAgICAgICAgICovXG4gICAgICAgIG1vdmVCeShtb3ZlX3ggPSAwLCBtb3ZlX3kgPSAwLCBtb3ZlX3ogPSAwKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wYXJ0aWNsZXMpIHtcblxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCArPSBtb3ZlX3g7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSArPSBtb3ZlX3k7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueiArPSBtb3ZlX3o7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gWiBvZiBqb2luaW5nIG1vZGVsXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICovXG4gICAgICAgIGpvaW5Nb2RlbFoobW9kZWw6VC5Nb2RlbCwgbW92ZV94Om51bWJlciwgbW92ZV95Om51bWJlcikgey8vdG9kbyBzZWNvbmQgcGFyYW0gc2hvdWxkIGJlIHBvc2l0aW9uXG5cbiAgICAgICAgICAgIC8vdmFyICBtb2RlbF89ZGVlcENvcHlNb2RlbChtb2RlbCk7XG4gICAgICAgICAgICAvL21vZGVsXy5tb3ZlQnkobW92ZV94LG1vdmVfeSk7Ly90b2RvIG1heWJlIGRlbGV0ZSBtb3ZlQnlcblxuICAgICAgICAgICAgLy92YXIgbWF4X3o9dGhpcy5yYW5nZSgneicpO1xuXG5cbiAgICAgICAgICAgIHZhciB0aGlzX2xpbmVhcl9wYXJ0aWNsZXMgPSB0aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuICAgICAgICAgICAgdmFyIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXMgPSBtb2RlbC5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VzID0gWzBdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBtb2RlbF9saW5lYXJfcGFydGljbGVzKSB7XG5cbiAgICAgICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLnggKz0gbW92ZV94O1xuICAgICAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSArPSBtb3ZlX3k7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpaSBpbiB0aGlzX2xpbmVhcl9wYXJ0aWNsZXMpIHsvL3RvZG8gbWF5YmUgb3B0aW1pemUgYnkgcHJlLXNvcnRpbmdcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChULk1vZGVsLlBhcnRpY2xlcy5jb2xsaXNpb24yRCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLCBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlcy5wdXNoKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0ucG9zaXRpb24ueiArIHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0uc2l6ZS56KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSBNYXRoLm1heC5hcHBseShNYXRoLCBkaXN0YW5jZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWF4X3o7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEpvaW4gbW9kZWxzIHRvZ2V0aGVyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgICAgICovXG4gICAgICAgIGpvaW5Nb2RlbChtb2RlbCwgbW92ZV94LCBtb3ZlX3kpIHsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgICAgICB2YXIgbWF4X3ogPSB0aGlzLmpvaW5Nb2RlbFoobW9kZWwsIG1vdmVfeCwgbW92ZV95KTtcblxuXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSxcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsKSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzWzFdLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IG1vdmVfeCxcbiAgICAgICAgICAgICAgICB5OiBtb3ZlX3ksXG4gICAgICAgICAgICAgICAgejogbWF4X3pcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy5zaXplID0gMTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVlcCBjb3B5IHRoaXMgYW5kIGNvbnZlcnRzIGxpbmtzIHRvIHJhdyBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWVwQ29weVdpdGhvdXRMaW5rcygpIHtcblxuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNsb25lKCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBsaW5rcyB0byByYXcgZGF0YVxuXG5cbiAgICAgICAgICAgIHZhciBmaW5kUGFydGljbGVCeU5hbWUgPSBmdW5jdGlvbiAocGFydGljbGVzLCBuYW1lKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluZGVkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkX3BhcnRpY2xlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZmluZGVkX3BhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXNMaW5rcyA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuXG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5MaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLmxpbmspICE9ICd1bmRlZmluZWQnKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShtb2RlbC5wYXJ0aWNsZXMsIHBhcnRpY2xlc1tpXS5saW5rKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZF9wYXJ0aWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluayAnICsgcGFydGljbGVzW2ldLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmtlZF9wYXJ0aWNsZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5yb3RhdGlvbikgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZXNbaV0ucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5zaXplKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5zaXplID0gcGFydGljbGVzW2ldLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wb3NpdGlvbikgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUucG9zaXRpb24gPSBwYXJ0aWNsZXNbaV0ucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG8gc2tld1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc1tpXSA9IGxpbmtlZF9wYXJ0aWNsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Hcm91cFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmtzKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHBhcnRpY2xlc0xpbmtzKG1vZGVsLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgIHJldHVybiAobW9kZWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgMUQgYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TGluZWFyUGFydGljbGVzKGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemUgPSBmYWxzZSkge1xuXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXNMaW5lYXIgPSBbXTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db252ZXJ0IHBhcnRpY2xlcyB0byAxRCBwYXJ0aWNsZXNcblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlczJMaW5lYXIgPSBmdW5jdGlvbiAocGFydGljbGVzLCBwb3NpdGlvbiwgcm90YXRpb24sIHNpemUpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zaXRpb24gPT09ICd1bmRlZmluZWQnKXBvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZSA9IDE7XG5cblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHo6IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMuZm9yRWFjaChmdW5jdGlvbiAocGFydGljbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL3BhcnRpY2xlPWRlZXBDb3B5KHBhcnRpY2xlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+RGVmYXVsdCBwYXJhbXMgb2YgcGFydGljbGUsIGdyb3VwIG9yIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNsZS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5yb3RhdGlvbikgPT0gJ3VuZGVmaW5lZCcpcGFydGljbGUucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnNpemUpID09ICd1bmRlZmluZWQnKXBhcnRpY2xlLnNpemUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+UG9zaXRpb24sIFJvdGF0aW9uIGFuZCBzaXplIC8vdG9kbyBza2V3XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3REZWcgPSBULlRNYXRoLnh5MmRpc3REZWcocGFydGljbGUucG9zaXRpb24ueCwgcGFydGljbGUucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZGlzdERlZy5kaXN0ID0gZGlzdERlZy5kaXN0ICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzdERlZy5kZWcgKz0gcm90YXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gVC5UTWF0aC5kaXN0RGVnMnh5KGRpc3REZWcuZGlzdCwgZGlzdERlZy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSB4eS54O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0geHkueTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9IHBhcnRpY2xlLnBvc2l0aW9uLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSArPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ICs9IHBvc2l0aW9uLno7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaXplID09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZS5zaXplICogc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnggPSBwYXJ0aWNsZS5zaXplLnggKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS55ID0gcGFydGljbGUuc2l6ZS55ICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueiA9IHBhcnRpY2xlLnNpemUueiAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVBhcnRpY2xlXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUucGFydGljbGVzKSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXMyTGluZWFyKHBhcnRpY2xlLnBhcnRpY2xlcywgcGFydGljbGUucG9zaXRpb24sIHBhcnRpY2xlLnJvdGF0aW9uLCBwYXJ0aWNsZS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Hcm91cFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnNoYXBlKSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNMaW5lYXIucHVzaChwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG5cbiAgICAgICAgICAgIGlmIChpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplKSB7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMyTGluZWFyKG1vZGVsLnBhcnRpY2xlcywgZmFsc2UsIDAsIDEpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsIGZhbHNlLCBtb2RlbC5yb3RhdGlvbiwgbW9kZWwuc2l6ZSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3RvZG8gc3RyaWN0IG1vZGUvL2RlbGV0ZSBtb2RlbDtcblxuICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZXNMaW5lYXIpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclBhdGgocGF0aCkge1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBhdGguZm9yRWFjaCkgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IG1vZGVsLnBhcnRpY2xlc1tpXTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHJldHVybiAobW9kZWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclBhdGhTaWJsaW5ncyhwYXRoKSB7XG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbW9kZWw7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YocGF0aC5mb3JFYWNoKSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHIocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbiAocGFydGljbGVfaSwgcGF0aF9paSkge1xuXG4gICAgICAgICAgICAgICAgLyppZihwYXRoX2lpPHBhdGgubGVuZ3RoLTEpe1xuXG4gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgICAgICB9ZWxzZXsqL1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lID0gY3VycmVudC5wYXJ0aWNsZXNbcGFydGljbGVfaV07XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50LnBhcnRpY2xlcyA9IFttZV07XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbWU7XG4gICAgICAgICAgICAgICAgLy99XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAobW9kZWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2dyZWdhdGUgdm9sdW1lIG9mIGVhY2ggcmVzb3VyY2UgdXNlZCBpbiBtb2RlbFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBhZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCkge1xuXG5cbiAgICAgICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG5cblxuICAgICAgICAgICAgdmFyIGxpbmVhcl9wYXJ0aWNsZXMgPSB0aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZWFyX3BhcnRpY2xlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdm9sdW1lID0vL3RvZG8gYWxsIHNoYXBlc1xuICAgICAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS54ICpcbiAgICAgICAgICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlLnNpemUueSAqXG4gICAgICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWF0ZXJpYWwgPSBsaW5lYXJfcGFydGljbGUubWF0ZXJpYWwuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCA9IG1hdGVyaWFsWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlXzpULlJlc291cmNlcyA9IG5ldyBULlJlc291cmNlcyh7fSk7XG4gICAgICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXSA9IHZvbHVtZTtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLypjb25zb2xlLmxvZygncHJpY2Ugb2YnKTtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByaWNlKTsqL1xuXG4gICAgICAgICAgICAvL3ByaWNlLm11bHRpcGx5KDAuMDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEhhc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3h4eCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIFRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTW9kZWwuUGFydGljbGVzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk1vZGVsIHtcblxuXG4gICAgLyoqXG4gICAgICogTW9kZWwgUGFydGljbGVzXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGVcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpIHsvL3RvZG8gPz8gbWF5YmUgcmVuYW1lXG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcueiA9IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLnRvcCA9IDE7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2hhcGUuYm90dG9tID0gMTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnJvdGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgc3RhdGljIGdldFRyaWFuZ2xlcyhwYXJ0aWNsZSwgcG9pbnRfY2xhc3MpIHtcblxuICAgICAgICAgICAgdmFyIHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMuYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgICAgICB2YXIgeCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgICAgIHZhciB4XyA9IHBhcnRpY2xlLnNpemUueDtcbiAgICAgICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICAgICAgbGV0IHhfXywgeV9fLCB6X187XG4gICAgICAgICAgICAgICAgbGV0IGJhc2U6bnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeV8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSAoMiAtIChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULlRNYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIERpc3REZWdfLmRlZyArPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULlRNYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geHlfLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5ldyBwb2ludF9jbGFzcyh4X18sIHlfXywgel9fKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKmlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFsxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRyaWFuZ2xlcztcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAzRCBtb2RlbCBmcm9tIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGRlcHJlY2F0ZWRcbiAgICAgICAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gM0QgbW9kZWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQzRChwYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICBpbnRlcmZhY2UgUG9pbnRzT2JqZWN0e1xuICAgICAgICAgICAgICAgIHBvaW50czogQXJyYXk7XG4gICAgICAgICAgICAgICAgcG9seWdvbnM6IEFycmF5PEFycmF5PjtcbiAgICAgICAgICAgICAgICBwb2x5Z29uczJEOiBBcnJheTxBcnJheT47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZTpQb2ludHNPYmplY3Q7XG5cbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnR5cGUgPT0gJ3ByaXNtJykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgICAgIHZhciB5XyA9IHBhcnRpY2xlLnNpemUueTtcbiAgICAgICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cblxuICAgICAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAgICAgLy9yKHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cblxuICAgICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2ludHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucyA9IFtbXSwgW11dO1xuICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkQgPSBbW10sIFtdXTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUudG9wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfXywgeV9fLCB6X187XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeF8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSB6XyAqIGxldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpOy8vK3lfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueSksXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIHRtcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuVE1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5XyA9IFQuVE1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IHh5Xy55O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiovXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAyRCBsaW5lcyBmcm9tIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIDA9Ym90dG9tLCAxPXRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gMkQgbGluZXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQyRGxpbmVzKHBhcnRpY2xlLCBiYXNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5nZXQzRChwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIHZhciBsaW5lcyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgcG9seWdvbnMyRCA9IFtyZXNvdXJjZS5wb2x5Z29uczJEW2Jhc2VdXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcG4gaW4gcG9seWdvbnMyRCkge1xuXG4gICAgICAgICAgICAgICAgLypsaW5lc1twbl09W107XG5cbiAgICAgICAgICAgICAgICAgZm9yKHZhciBwdCBpbiByZXNvdXJjZS5wb2x5Z29uc1twbl0pIHtcblxuICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSByZXNvdXJjZS5wb2ludHNbcmVzb3VyY2UucG9seWdvbnNbcG5dW3B0XSAtIDFdO1xuICAgICAgICAgICAgICAgICBsaW5lc1twbl1bcHNdID0gW3BvaW50WzBdLCBwb2ludFsxXV07XG5cbiAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQxLCBwb2ludDI7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gLTEsIGwgPSBwb2x5Z29uczJEW3BuXS5sZW5ndGg7IGkgPCBsIC0gMTsgaSsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGwgLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSBpICsgMTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vcihyZXNvdXJjZS5wb2x5Z29uc1twbl0scG9pbnQxKTtcblxuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBwb2ludDIgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQyXSAtIDFdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQxWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDJbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9yKGxpbmVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIChsaW5lcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy90b2RvIG1heWJlIHJlZmFjdG9yIG1vdmUgdG8gTWF0aFxuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgMkQgbGluZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBsaW5lczFcbiAgICAgICAgICogQHBhcmFtIChhcnJheSkgbGluZXMyXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaTEgaW4gbGluZXMxKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaTIgaW4gbGluZXMyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS55XG4gICAgICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcignY29sbGlzaW9uMkQgaXMgdHJ1ZScsIHBhcnRpY2xlMSwgcGFydGljbGUyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiBwYXJ0aWNsZXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAgICAgKiBAcGFyYW0gKG9iamVjdCkgcGFydGljbGUyIHRvcFxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNvbGxpc2lvbjJEKHBhcnRpY2xlMSwgcGFydGljbGUyKSB7XG5cblxuICAgICAgICAgICAgdmFyIGxpbmVzMSA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMSwgMSk7XG4gICAgICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29ybmVyIGNvbGxpc2lvblxuXG5cbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgIGlmICghY29sbGlzaW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgayA9IDEwMDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ZXIsIGlubmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl94ID0gaW5uZXJbMV0ueCAtIGlubmVyWzBdLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3kgPSBpbm5lclsxXS55IC0gaW5uZXJbMF0ueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnkgLT0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS54ICs9IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjEgPSBbaW5uZXIxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMiA9IFtpbm5lcjJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24yID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMiwgb3V0ZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaXNpb24xICYmIGNvbGxpc2lvbjIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0oKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiovXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERFxuICAgICAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgICAgIHZhciBzcmM9Y3JlYXRlQ2FudmFzVmlhRnVuY3Rpb25BbmRDb252ZXJ0VG9TcmMoXG4gICAgICAgICAgICAgc2l6ZSoyLHNpemUqMixmdW5jdGlvbihjdHgpe1xuXG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlV2lkdGggPSAyO1xuXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVzXz1bbGluZXMxLGxpbmVzMl07XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbGluZXNfKXtcblxuICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0gMCxsPWxpbmVzX1trZXldLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGxpbmVzX1trZXldW2ldWzBdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVswXS55K3NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKGxpbmVzX1trZXldW2ldWzFdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVsxXS55K3NpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsvKiovXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5BcnJheVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbi8vdG9kbyBULk9iamVjdHMuQXJyYXkgPSBjbGFzcyBleHRlbmRzIEFycmF5e1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQXJyYXkge1xuXG5cbiAgICAgICAgcHVibGljIG9iamVjdHM6QXJyYXkvKjxULk9iamVjdHMuT2JqZWN0PiovO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmplY3RzXG4gICAgICAgICAqIHRvZG8gPz8/Pz8/Pz8/IEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0czpBcnJheSA9W10pIHtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBbGwoKTpBcnJheSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXIoY2FsbGJhY2spOlQuT2JqZWN0cy5BcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICAvL3IoZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzKTtcblxuICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzID0gdGhpcy5vYmplY3RzLmZpbHRlcihjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHVzaCBuZXcgb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBwdXNoKG9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5wdXNoKFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBvciBwdXNoIG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldEJ5SWQob2JqZWN0LmlkLCBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdnZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZClyZXR1cm4gdGhpcy5vYmplY3RzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0QnlJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignc2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0gPSBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSWQoaWQsIG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJUeXBlcyguLi50eXBlcykge1xuXG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2Yob2JqZWN0LnR5cGUpID09IC0xKXJldHVybjtcblxuICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclJhZGl1cyhjZW50ZXIsIHJhZGl1cykge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShjZW50ZXIpIDw9IHJhZGl1cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZmlsdGVyQXJlYShhcmVhOkFyZWEpIHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJlYS5pc0NvbnRhaW5pbmcob2JqZWN0LmdldFBvc2l0aW9uKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cykgey8vdG9kbyBtYXliZSByZWZhY3RvciB0byBnZXRUZXJyYWluQ29kZXMyREFycmF5IG9yIGdldFRlcnJhaW5Db2Rlc01hcFxuXG4gICAgICAgICAgICAvKnZhciByYWRpdXMgPSBzaXplLzI7XG4gICAgICAgICAgICAgdmFyIGNlbnRlciA9e1xuICAgICAgICAgICAgIHg6IHRvcGxlZnQueCtyYWRpdXMsXG4gICAgICAgICAgICAgeTogdG9wbGVmdC55K3JhZGl1c1xuICAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3JlYXRlIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB2YXIgbWFwX2FycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCk7Ly8uc2xpY2UoKS5yZXZlcnNlKCk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkgey8vdG9kbyBpcyB0aGlzIG9wdGltYWxpemF0aW9uIGVmZmVjdGl2ZT9cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA8IHJhZGl1cyAqIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPCByYWRpdXMgKiAyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgLSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4YyA9IG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5YyA9IG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXM7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcF9hcnJheVt5XVt4XSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLnh5MmRpc3QoeCAtIHhjLCB5IC0geWMpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gb2JqZWN0LmdldENvZGUoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gbWFwX2FycmF5O1xuXG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIGdldE1hcE9mQ29sbGlzaW9ucyhjZW50ZXIsIHJhZGl1cyl7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1UZXJyYWluc1xuICAgICAgICAgICAgdmFyIG1hcF9vZl90ZXJyYWluX2NvZGVzID0gdGhpcy5nZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHZhciBtYXBfb2ZfY29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgeCx5O1xuXG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoWzEsNSwxMV0uaW5kZXhPZihtYXBfb2ZfdGVycmFpbl9jb2Rlc1t5XVt4XSkhPT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV1beF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tT2JqZWN0c1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG5cbiAgICAgICAgICAgICAgICBpZihvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnICYmIG9iamVjdC5zdWJ0eXBlID09ICd3YWxsJyl7fWVsc2V7cmV0dXJuO31cblxuICAgICAgICAgICAgICAgIHZhciB4PU1hdGgucm91bmQob2JqZWN0LngpLU1hdGgucm91bmQoY2VudGVyLngtKHJhZGl1cykpO1xuICAgICAgICAgICAgICAgIHZhciB5PU1hdGgucm91bmQob2JqZWN0LnkpLU1hdGgucm91bmQoY2VudGVyLnktKHJhZGl1cykpO1xuXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgrMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgtMSx5OiB5fSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeSsxfSxcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeS0xfVxuXG4gICAgICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHBfKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocF8ueD49MCAmJiBwXy55Pj0wICYmIHBfLng8cmFkaXVzKjIgJiYgcF8ueTxyYWRpdXMqMil7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1twXy55XVtwXy54XT0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuKG1hcF9vZl9jb2xsaXNpb25zKTtcblxuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQxeDFUZXJyYWluT2JqZWN0cygpIHtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKS5zbGljZSgpLnJldmVyc2UoKTsvL25vcm1hbCBBcnJheVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgYmxvY2tlZF9wb3NpdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3RfMXgxLCBrZXk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCkgKyAneScgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeF90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC54eTJkaXN0KHgsIHkpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEuZGVzaWduLmRhdGEuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueCA9IE1hdGgucm91bmQob2JqZWN0XzF4MS54ICsgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueSA9IE1hdGgucm91bmQob2JqZWN0XzF4MS55ICsgeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgb2JqZWN0XzF4MS54ICsgJ3knICsgb2JqZWN0XzF4MS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIHRlcnJhaW5fb2JqZWN0c18xeDE7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0VGVycmFpbk9uUG9zaXRpb24ocG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5vYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS50eXBlICE9ICd0ZXJyYWluJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5kZXNpZ24uZGF0YS5zaXplIDw9IHBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LCB0aGlzLm9iamVjdHNbaV0ueSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobnVsbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldE5lYXJlc3RUZXJyYWluUG9zaXRpb25XaXRoQ29kZShwb3NpdGlvbiwgdGVycmFpbl9jb2RlKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gdGhpcy5nZXQxeDFUZXJyYWluT2JqZWN0cygpO1xuXG4gICAgICAgICAgICB2YXIgbWluX2Rpc3RhbmNlID0gLTE7XG4gICAgICAgICAgICB2YXIgbmVhcmVzdF90ZXJyYWluXzF4MSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW5fMXgxKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmIChtaW5fZGlzdGFuY2UgPT09IC0xIHx8IG1pbl9kaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0X3RlcnJhaW5fMXgxID0gdGVycmFpbl8xeDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfdGVycmFpbl8xeDEgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qXG5cbiAgICAgICAgIGdldE1hcE9mQ29sbGlzaW9uQ29kZXMocmVhbF9vYmplY3RzLHBvc2l0aW9uKXtcbiAgICAgICAgIHJldHVybiBUZXJyYWluO1xuICAgICAgICAgfTtcblxuICAgICAgICAgKi9cblxuXG4gICAgfVxuXG59XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuT2JqZWN0XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBuYW1lOnN0cmluZztcbiAgICAgICAgcHVibGljIGFjdGlvbnM6QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc19rZXkgPT0gJ19pZCcpdGhpc19rZXkgPSAnaWQnOy8vdG9kbyBtYXliZSBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGluaXQob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmKG9iamVjdCBpbnN0YW5jZW9mIFQuT2JqZWN0cy5PYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT0gJ2J1aWxkaW5nJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5CdWlsZGluZyhvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICd0ZXJyYWluJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3N0b3J5Jykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5TdG9yeShvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICduYXR1cmFsJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5OYXR1cmFsKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBwdXQgaXRlbSBpbnRvIFRvd25zIE9iamVjdHMgQXJyYXkgYmVjYXVzZSBvZiB1bnJlY29nbml6ZWQgb2JqZWN0IHR5cGUgJyArIG9iamVjdC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKTpQb3NpdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gKCdbJyArIHRoaXMubmFtZSArICddJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5CdWlsZGluZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgQnVpbGRpbmcgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduOiBPYmplY3Q7XG4gICAgICAgIHB1YmxpYyBhY3Rpb25zOiBBcnJheTtcbiAgICAgICAgcHVibGljIHBhdGg6IFBhdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICAgICAgc3VwZXIob2JqZWN0KTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3NlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNfY2xhc3Nlcy5wdXNoKFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh0aGlzLmFjdGlvbnNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9uc19jbGFzc2VzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcih0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aCA9IG5ldyBULlBhdGgoLi4udGhpcy5wYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB2YXIgbGlmZV9hY3Rpb24gPSB0aGlzLmdldEFjdGlvbignbGlmZScpO1xuICAgICAgICAgICAgdmFyIG1heF9saWZlID0gVC5Xb3JsZC5nYW1lLmdldE9iamVjdE1heExpZmUodGhpcyk7XG5cblxuICAgICAgICAgICAgaWYgKGxpZmVfYWN0aW9uID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbiA9IFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaWZlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWZlOiBtYXhfbGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heF9saWZlOiBtYXhfbGlmZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2gobGlmZV9hY3Rpb24pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGlmZV9hY3Rpb24ucGFyYW1zLm1heF9saWZlID0gbWF4X2xpZmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBvc2l0aW9uKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguY291bnRQb3NpdGlvbihkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZyhkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguaW5Qcm9ncmVzcyhkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuQnVpbGRpbmcoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk1vZGVsfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9kZWwoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmRlc2lnbi5kYXRhIGluc3RhbmNlb2YgVC5Nb2RlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lnbi5kYXRhID0gbmV3IFQuTW9kZWwodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYWN0aW9uX3R5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuR2FtZS5BY3Rpb25BYmlsaXR5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QWN0aW9uKGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uc1tpXS50eXBlID09IGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFjdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY3JlYXRlSHRtbFByb2ZpbGUoKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25zX3Byb2ZpbGUgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNfcHJvZmlsZSArPSB0aGlzLmFjdGlvbnNbaV0uY3JlYXRlSHRtbFByb2ZpbGUoKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGBcblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdC1idWlsZGluZy1wcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICA8aDI+YCArIHRoaXMubmFtZSArIGA8L2gyPlxuICAgICAgICAgICAgICAgIGAgKyB0aGlzLmdldFBvc2l0aW9uKCkgKyBgXG5cblxuICAgICAgICAgICAgICAgIGAgKyBhY3Rpb25zX3Byb2ZpbGUgKyBgXG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICBgKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk5hdHVyYWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTmF0dXJhbCBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ246T2JqZWN0O1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLk5hdHVyYWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeSBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBjb250ZW50O1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlN0b3J5KEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRNYXJrZG93bigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jb250ZW50LmRhdGEpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVycmFpbiBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG5cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuVGVycmFpbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKHByZWZlcmVkX3dpZHRoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29sb3IoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5jb2xvcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGdldEltYWdlKCl7fVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkNvbG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hpY2ggcmVwcmVzZW50cyBSR0JBIGNvbG9yLlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSByIHJlZCBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBnIGdyZWVuIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGIgYmx1ZSBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBhIGFscGhhIGZyb20gMCB0byAyNTVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByOiBudW1iZXIscHVibGljIGc6IG51bWJlcixwdWJsaWMgYjogbnVtYmVyLHB1YmxpYyBhID0gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBkZWVwIGNsb25lIG9kIFQuQ29sb3JcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOkNvbG9ye1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih0aGlzLnIsdGhpcy5nLHRoaXMuYix0aGlzLmEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVwYWlycyBvdmVyZmxvd2VkIGNvbG9yc1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgYm91bmRzKCkge1xuXG4gICAgICAgICAgICB0aGlzLnIgPSBNYXRoLnJvdW5kKHRoaXMucik7XG4gICAgICAgICAgICB0aGlzLmcgPSBNYXRoLnJvdW5kKHRoaXMuZyk7XG4gICAgICAgICAgICB0aGlzLmIgPSBNYXRoLnJvdW5kKHRoaXMuYik7XG4gICAgICAgICAgICB0aGlzLmEgPSBNYXRoLnJvdW5kKHRoaXMuYSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnIgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5yIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZyA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYiA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYSA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmEgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBjc3MgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBlZy4gcmdiKDEwMCwyMDAsMjAwKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q3NzQ29sb3IoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hID09IDI1NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcpJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9yKCdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYS8yNTUqMTAwKS8xMDAgKyAnKScpO1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnLCAnICsgTWF0aC5yb3VuZCh0aGlzLmEgLyAyNTUgKiAxMDApIC8gMTAwICsgJyknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGhleCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yIChpZ25vcmVzIGFscGhhIGNoYW5lbC4pXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiAjMDBmZjAwXG4gICAgICAgICAqL1xuICAgICAgICBnZXRIZXgoKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kcygpO1xuICAgICAgICAgICAgcmV0dXJuICcjJyArICgoMSA8PCAyNCkgKyAodGhpcy5yIDw8IDE2KSArICh0aGlzLmcgPDwgOCkgKyB0aGlzLmIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgbmV3IFQuQ29sb3IgZm9ybSBoZXggY29kZSBvZiBjb2xvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4IGNvZGUgb2YgY29sb3IgZWcuICMwMGZmMDBcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9IENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY3JlYXRlRnJvbUhleChoZXg6IHN0cmluZyk6IENvbG9yIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdDpDb2xvciAsIHNob3J0aGFuZFJlZ2V4OiBSZWdFeHAsIHJlc3VsdFJlZ2V4OiBSZWdFeHBFeGVjQXJyYXk7XG5cbiAgICAgICAgICAgIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKHNob3J0aGFuZFJlZ2V4LCBmdW5jdGlvbiAobSwgciwgZywgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdFJlZ2V4ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0UmVnZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFsxXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRSZWdleFszXSwgMTYpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNyZWF0aW5nIFQuQ29sb3IgZnJvbSAnICsgaGV4KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUGF0aFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFR7XG5cbiAgICBleHBvcnQgY2xhc3MgUGF0aCB7XG5cbiAgICAgICAgcHVibGljIGFycmF5X3Bvc2l0aW9uX2RhdGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7Li4uVC5Qb3NpdGlvbkRhdGV9IFBvc2l0aW9uIHdpdGggZGF0ZSBhdCBsZWFzdCAyXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cblxuICAgICAgICAgICAgLy90b2RvIG1heWJlLy9pZihhcmdzLmxlbmd0aD09PTEgJiYgYXJncyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3NbMF07XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL31lbHNle1xuICAgICAgICAgICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJncztcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfVxuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhcmUgbXVzdCBiZSBhdCBsZWFzdCAyIHBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGguJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGU6IFBvc2l0aW9uRGF0ZSwgbGFzdF9kYXRlID0gLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb25EYXRlKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0gPSBuZXcgVC5Qb3NpdGlvbkRhdGUodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBQYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoIG11c3QgYmUgVC5Qb3NpdGlvbkRhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdF9kYXRlID49IHBvc2l0aW9uX2RhdGUuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVzIHNob3VsZCBiZSBjb25zZWN1dGl2ZSB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggKCcgKyBwb3NpdGlvbl9kYXRlLmRhdGUgKyAnIHNob3VsZCBiZSBhZnRlciAnICsgbGFzdF9kYXRlICsgJykuICcgKyB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0X2RhdGUgPSBwb3NpdGlvbl9kYXRlLmRhdGUvMTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheS48VC5Qb3NpdGlvbj59IGFycmF5X3Bvc2l0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUGF0aH1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uOiBBcnJheSwgc3BlZWQ6IG51bWJlciwgZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApOiBQYXRoIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05hTihzcGVlZCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHZhbGlkIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVlZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHBvc2l0aXZlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXJyYXlfcG9zaXRpb24ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhcmUgbXVzdCBiZSBhdCBsZWFzdCAyIHBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGguJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcnJheV9wb3NpdGlvbl9kYXRlID0gW1xuICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvblswXS54LCBhcnJheV9wb3NpdGlvblswXS55LCBkYXRlKVxuICAgICAgICAgICAgXTtcblxuXG4gICAgICAgICAgICB2YXIgbGFzdF9wb3NpdGlvbiA9IGFycmF5X3Bvc2l0aW9uWzBdO1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBkaXN0YW5jZTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcnJheV9wb3NpdGlvbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbGFzdF9wb3NpdGlvbi5nZXREaXN0YW5jZShwb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSAvIDEgKyBkaXN0YW5jZSAvIHNwZWVkICogMTAwMCk7XG5cblxuICAgICAgICAgICAgICAgIGxhc3RfcG9zaXRpb24gPSBwb3NpdGlvbl9kYXRlO1xuXG5cbiAgICAgICAgICAgICAgICBhcnJheV9wb3NpdGlvbl9kYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LCBhcnJheV9wb3NpdGlvbltpXS55LCBkYXRlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3JldHVybiBuZXcgdGhpcy5hcHBseSh0aGlzLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUGF0aCguLi5hcnJheV9wb3NpdGlvbl9kYXRlKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldFBvc2l0aW9ucygpIHtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ocG9zaXRpb25zKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50IGluIHdoaWNoIHNlZ21lbnQgaXMgVC5QYXRoIHByb2dyZXNzXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNlZ21lbnQoZGF0ZTogbnVtYmVyIHwgRGF0ZSkge1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIEE6IFBvc2l0aW9uRGF0ZSwgQjpQb3NpdGlvbkRhdGUsIHg6IG51bWJlciwgeTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZGF0ZSAvIDE7XG4gICAgICAgICAgICAgICAgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpICsgMV0uZGF0ZSAvIDE7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGkrJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcblxuICAgICAgICAgICAgICAgIGlmIChBIDw9IGRhdGUgJiYgQiA+IGRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCc8LS0tdGhpcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNvdW50aW5nIHNlZ21lbnQgaW4gVC5QYXRoLCBtYXliZSBiZWNhdXNlIG9mIHBhcmFtIGRhdGUgaXMgJyArIGRhdGUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcG9zaXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50UG9zaXRpb24oZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluIHByb2dyZXNzXG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gdGhpcy5jb3VudFNlZ21lbnQoZGF0ZSk7XG5cbiAgICAgICAgICAgIHZhciBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnRdO1xuICAgICAgICAgICAgdmFyIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudCArIDFdO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKChBLWRhdGUpKycgLSAnKyhCLWRhdGUpKTtcblxuICAgICAgICAgICAgdmFyIHggPSBULlRNYXRoLnByb3BvcnRpb25zKEEuZGF0ZSAvIDEsIGRhdGUgLyAxLCBCLmRhdGUgLyAxLCBBLngsIEIueCk7XG4gICAgICAgICAgICB2YXIgeSA9IFQuVE1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueSwgQi55KTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih4LCB5KSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHJvdGF0aW9uIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFJvdGF0aW9uKGRhdGU6IG51bWJlciB8IERhdGUgPSAwKSB7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUvMSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBCQSA9IEIuZ2V0UG9zaXRpb24oKS5wbHVzKEEuZ2V0UG9zaXRpb24oKS5tdWx0aXBseSgtMSkpO1xuXG4gICAgICAgICAgICB2YXIgcG9sYXIgPSBCQS5nZXRQb3NpdGlvblBvbGFyKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEJBLHBvbGFyKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwb2xhci5nZXREZWdyZWVzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIFNwZWVkIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBmaWVsZHMvc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTcGVlZChkYXRlOiBudW1iZXIgfCBEYXRlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluUHJvZ3Jlc3MoZGF0ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IEEuZ2V0RGlzdGFuY2UoQik7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBCLmRhdGUgLSBBLmRhdGU7XG5cbiAgICAgICAgICAgIHJldHVybiAoZGlzdGFuY2UgLyAoZHVyYXRpb24gLyAxMDAwKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBhdGggaW4gcHJvZ3Jlc3MgKHRydWUpIG9yIGl0IGhhcyBub3Qgc3RhcnRlZChmYWxzZSkgb3IgaXQgaXMgZmluaXNoZWQoZmFsc2UpP1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpblByb2dyZXNzKGRhdGU6IG51bWJlciB8IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gbWF5YmUgY291bnRQcm9ncmVzc1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFQuUGF0aCB0byBzdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5qb2luKCcsICcpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbjNEXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGludGVyZmFjZSBQb3NpdGlvbjNET2JqZWN0IHtcbiAgICAgICAgeDpudW1iZXI7XG4gICAgICAgIHk6bnVtYmVyO1xuICAgICAgICB6Om51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24zRCB7XG5cbiAgICAgICAgcHVibGljIHg6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHk6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHo6IG51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb24zRE9iamVjdCwgeT86IG51bWJlciwgej86IG51bWJlcikge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0Lnk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0geF9vcl9vYmplY3QuejtcblxuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnbnVtYmVyJyl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHo7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24zRCh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uM0QgdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICcsJyArIHRoaXMueiArICddJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFBvc2l0aW9uUG9sYXJcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvblBvbGFyIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlzdGFuY2U6IG51bWJlcixwdWJsaWMgZGVncmVlczogbnVtYmVyKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMuZGlzdGFuY2UsdGhpcy5kZWdyZWVzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpICogdGhpcy5kaXN0YW5jZVxuICAgICAgICAgICAgKSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZSgpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGVncmVlcygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlZ3JlZXMgKyAzNjApICUgMzYwO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJhZGlhbnMoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLmRlZzJyYWQodGhpcy5kZWdyZWVzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy5kaXN0YW5jZSArICcsJyArIHRoaXMuZGVncmVlcyArICfCsCc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbiB7XG4gICAgICAgIHg6bnVtYmVyO1xuICAgICAgICB5Om51bWJlcjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXBcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24ge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0X29yX3N0cmluZzogbnVtYmVyIHwgUG9zaXRpb24gfCBzdHJpbmcsIHk/OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0X29yX3N0cmluZyA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy55O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIGlmKHR5cGVvZiB4X29yX29iamVjdF9vcl9zdHJpbmcgPT09ICdzdHJpbmcnKXtcblxuICAgICAgICAgICAgICAgIGlmICgvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeF9vcl9vYmplY3Rfb3Jfc3RyaW5nKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4X3k6QXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHhfeSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHhfeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHBhcnNlRmxvYXQoeF95WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBjcmVhdGluZyBQb3NpdGlvbiwgc3RyaW5nIG11c3QgYmUgaW4gZm9ybWF0IHgseSBub3QgJyt4X29yX29iamVjdF9vcl9zdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeF9vcl9vYmplY3Rfb3Jfc3RyaW5nID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY29uc3RydWN0b3IgcGFyYW1zIHdoaWxlIGNyZWF0aW5nIFQuUG9zaXRpb24hJyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwbHVzKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSArPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBtaW51cyhwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54IC09IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgLT0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG11bHRpcGx5KGs6IG51bWJlcikge1xuXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggKiBrO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ICogaztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEZsb29yZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24oTWF0aC5mbG9vciggdGhpcy54KSxNYXRoLmZsb29yKCB0aGlzLnkpKTtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQb3NpdGlvblBvbGFyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uUG9sYXIoXG4gICAgICAgICAgICAgICAgVC5UTWF0aC54eTJkaXN0KHRoaXMueCwgdGhpcy55KSxcbiAgICAgICAgICAgICAgICBULlRNYXRoLnJhZDJkZWcoTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCkpXG4gICAgICAgICAgICApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZShwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdChwb3NpdGlvbi54IC0gdGhpcy54LCBwb3NpdGlvbi55IC0gdGhpcy55KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJyc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbkRhdGVPYmplY3Qge1xuICAgICAgICB4Om51bWJlcjtcbiAgICAgICAgeTpudW1iZXI7XG4gICAgICAgIGRhdGU6RGF0ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXAgd2l0aCB0aW1lXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uRGF0ZSBleHRlbmRzIFQuUG9zaXRpb24gey8vdG9kbyBpcyB0aGFyZSBzb2x1dGlvbiB3aXRob3V0IHVzaW5nIFQuP1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgZGF0ZTpEYXRlO1xuXG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb25EYXRlT2JqZWN0LCB5PzogbnVtYmVyLCBkYXRlPzogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgcG9zaXRpb25EYXRlT2JqZWN0OlBvc2l0aW9uRGF0ZU9iamVjdDtcbiAgICAgICAgICAgICAgICAvL3Bvc2l0aW9uRGF0ZU9iamVjdCA9IHg7XG5cbiAgICAgICAgICAgICAgICB4ID0geF9vcl9vYmplY3QueDtcbiAgICAgICAgICAgICAgICB5ID0geF9vcl9vYmplY3QueTtcbiAgICAgICAgICAgICAgICBkYXRlID0geF9vcl9vYmplY3QuZGF0ZTtcblxuXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4X29yX29iamVjdCA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHggPSB4X29yX29iamVjdDtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xuXG5cbiAgICAgICAgICAgIHZhciBkYXRlT2JqZWN0OiBEYXRlO1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKGRhdGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gZGF0ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZU9iamVjdCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBjb25zdHJ1Y3QgUG9zaXRpb25EYXRlIGlzIG5lZWRlZCB2YWxpZCBEYXRlIG5vdCAnICsgZGF0ZSArICcuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJ10gYXQgJyArXG4gICAgICAgICAgICAgICAgKHRoaXMuZGF0ZS5nZXREYXkoKSArIDEpICsgJy4nICsgKHRoaXMuZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLicgKyB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArXG4gICAgICAgICAgICAgICAgJyAnICsgdGhpcy5kYXRlLmdldEhvdXJzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0TWludXRlcygpICsgJzonICsgdGhpcy5kYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM6IEFycmF5O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgaWE6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb246IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiBib29sZWFuO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbGxpc2lvbj09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlY29sbGlzaW9uPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKnIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICApOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghc2lkZWNvbGxpc2lvbilyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBleHBvcnQgY2xhc3MgUmVzb3VyY2VzIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlc291cmNlczpPYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHJlc291cmNlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlJlc291cmNlcyB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY29udGFpbnMgYSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBjb250YWluc1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbnMocmVzb3VyY2VzOlJlc291cmNlcyk6Ym9vbGVhbiB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldIDwgcmVzb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICBhZGQocmVzb3VyY2VzOlJlc291cmNlcyk6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gKz0gcmVzb3VyY2VzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG11bHRpcGx5KGs6bnVtYmVyKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbCh0aGlzW2tleV0gKiBrKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzaWdudW0oazpzdHJpbmcpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgYXBwbHkobW9kaWZpZXI6RnVuY3Rpb24pOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbW9kaWZpZXIodGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBhbGwgcmVzb3VyY2VzIGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3RLZXlzKCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgZ2l2ZW4gUmVzb3VyY2VzXG4gICAgICAgICAqL1xuICAgICAgICBjb21wYXJlKHJlc291cmVzOlJlc291cmNlcyk6bnVtYmVyIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlc19BID0gdGhpcztcbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQiA9IHJlc291cmVzO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0EuZXh0cmFjdEtleXMoKSk7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0IuZXh0cmFjdEtleXMoKSk7XG5cblxuICAgICAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbF9BID0gcmVzb3VyY2VzX0Fba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsX0IgPSByZXNvdXJjZXNfQltrZXldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9BID09ICd1bmRlZmluZWQnKXZhbF9BID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9CID09ICd1bmRlZmluZWQnKXZhbF9CID0gMDtcblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlICs9IE1hdGgucG93KHZhbF9BIC0gdmFsX0IsIDIpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlKTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGRpc3RhbmNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZShyZXNvdXJjZXM6UmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0hUTUwoKTpzdHJpbmcgey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmdzX2pvaW5lZCA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICAgICAgc3RyaW5nc19qb2luZWQgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzX2pvaW5lZCArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nc19qb2luZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuVE1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb24ge1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb25Qb2xhciB7XG4gICAgICAgIGRpc3Q6IG51bWJlcjtcbiAgICAgICAgZGVnOiBudW1iZXI7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVE1hdGgge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYmFzZUxvZyhiYXNlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyOiBudW1iZXIsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgICAgIHZhciBkaWdpdHMgPSBNYXRoLmNlaWwoVE1hdGguYmFzZUxvZygxMCwgbnVtYmVyKSk7XG4gICAgICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIC0gZGlnaXRzKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyICogaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciAvIGs7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMTogbnVtYmVyLCBkZWcyOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMikgJSAzNjA7XG4gICAgICAgICAgICBpZiAoZGVnID4gMTgwKWRlZyA9IDM2MCAtIGRlZztcbiAgICAgICAgICAgIHJldHVybiAoZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJhZDJkZWcocmFkaWFuczpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSkpICUgMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVncmVlcyAlIDM2MCAqIChNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geFxuICAgICAgICAgKiBAcGFyYW0geVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgeHkyZGlzdCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIHh5MmRpc3REZWcoeDpudW1iZXIsIHk6bnVtYmVyKTpwb3NpdGlvblBvbGFyIHtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICBkaXN0OiBULlRNYXRoLnh5MmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgICAgZGVnOiAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIoeSwgeCkpXG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3Q6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cbiAgICAgICAgICAgIHZhciByYWQgPSBULlRNYXRoLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgICAgIHN0YXRpYyB4eVJvdGF0ZSh4OiBudW1iZXIsIHk6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3QgPSBULlRNYXRoLnh5MmRpc3QoeCwgeSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LCB4KTtcblxuICAgICAgICAgICAgcmFkICs9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG5cbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5jb3MocmFkKSAqIGRpc3QsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5zaW4ocmFkKSAqIGRpc3RcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZDpudW1iZXIsIHBvc2l0aW9uOnBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCAqIHBvc2l0aW9uLnkpIC0gc2VlZCwgMikpICsgMSkgLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0ludCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRlZnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJvdW5kcyh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbilyZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KXJldHVybiBtYXg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpc09uTGluZShhMXg6bnVtYmVyLCBhMXk6bnVtYmVyLCBhMng6bnVtYmVyLCBhMnk6bnVtYmVyLCBiMXg6bnVtYmVyLCBiMXk6bnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgIGEyeCAtPSBhMXg7XG4gICAgICAgICAgICBhMnkgLT0gYTF5O1xuXG4gICAgICAgICAgICBiMXggLT0gYTF4O1xuICAgICAgICAgICAgYjF5IC09IGExeTtcblxuXG4gICAgICAgICAgICB2YXIgYVNsb3BlID0gYTJ5IC8gYTJ4O1xuICAgICAgICAgICAgdmFyIGJTbG9wZSA9IGIxeSAvIGIxeDtcblxuXG4gICAgICAgICAgICBpZiAoYVNsb3BlICE9IGJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICAgICAgdmFyIGFEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGEyeSwgYTJ4KTtcbiAgICAgICAgICAgIHZhciBiRGlzdCA9IFQuVE1hdGgueHkyZGlzdChiMXksIGIxeCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoYURpc3QgPj0gYkRpc3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIsIGIyeDpudW1iZXIsIGIyeTpudW1iZXIpOiBib29sZWFuIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYk9uQSA9IFQuVE1hdGguaXNPbkxpbmUoYTF4LCBhMXksIGEyeCwgYTJ5LCBiMXgsIGIxeSk7XG4gICAgICAgICAgICAgICAgdmFyIGFPbkIgPSBULlRNYXRoLmlzT25MaW5lKGIxeCwgYjF5LCBiMngsIGIyeSwgYTF4LCBhMXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9ICgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcjpGdW5jdGlvbiwgYmx1cjpudW1iZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHZhciB4eCwgeXk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSkgKyAnJyArIHNpemVzW2ldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQ6bnVtYmVyLCBhX3Bvc2l0aW9uOm51bWJlciwgYV9lbmQ6bnVtYmVyLCBiX3N0YXJ0Om51bWJlciwgYl9lbmQ6bnVtYmVyKTpudW1iZXIge1xuXG5cbiAgICAgICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQgLSBhX3N0YXJ0O1xuICAgICAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZCAtIGJfc3RhcnQ7XG5cbiAgICAgICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZCAtIGFfcG9zaXRpb247XG4gICAgICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUgKiBhX3BhcnQpIC8gYV93aG9sZTtcblxuICAgICAgICAgICAgcmV0dXJuIChiX2VuZCAtIGJfcGFydCk7XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XG4gICAgICAgIHVzZXJuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgbmFtZTogJ3N0cmluZyc7XG4gICAgICAgIHN1cm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBlbWFpbDogJ3N0cmluZyc7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XG5cblxuICAgICAgICBwcm9maWxlOiBVc2VyUHJvZmlsZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodXNlcjogVXNlcikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXNlcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmF0dXJlSFRNTCgpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSArICcgJyArIHRoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gICsgbmFtZSArIGA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArIHRoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkgKyBgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNpZ25hdHVyZV9odG1sKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUgVC5Xb3JsZHtcblxuXG4gICAgZXhwb3J0IHZhciB0ZXJyYWlucyA9IFtcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbiAgICBdO1xuXG5cbn1cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuV29ybGR7XG5cbiAgICBleHBvcnQgdmFyIG1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgICAgICBULlRNYXRoLmJsdXJYWShmdW5jdGlvbih4OiBudW1iZXIseTogbnVtYmVyKXtcblxuICAgICAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAgICAgLy90b2RvLy9pZih0eXBlb2Ygel9tYXBfY2FjaGVba2V5XSE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICAgICAgY29uc3QgZGl2PTEwMDtcblxuXG4gICAgICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgICAgICB2YXIgX3g6IG51bWJlcixfeTogbnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgICAgICB2YXIga189MS1rO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICAgICAgbWF4X3Bvc3NpYmxlX24rPWRpdjtcblxuICAgICAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgICAgICAvL3ZhciB4eSA9IFQuVE1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgICAgICAvL3k9eHkueTtcblxuICAgICAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICAgICAgeD1NYXRoLmZsb29yKF94LzQpO1xuICAgICAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIG49bi9tYXhfcG9zc2libGVfbjtcblxuICAgICAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAgICAgLy90b2RvLy96X21hcF9jYWNoZVtrZXldPW47XG4gICAgICAgICAgICByZXR1cm4obik7XG5cbiAgICAgICAgfSwyKVxuICAgICAgICAsXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICAsXG5cbiAgICAgICAgbmV3IFQuTWFwR2VuZXJhdG9yLkJpb3RvcGUoW1xuXG4gICAgICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzExXX0sLy/FmWVrYVxuICAgICAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOV19LC8vdHLDoXZhIHRveGljXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxM119LC8vdHLDoXZhIHBvemltXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiAgIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDddfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICAgICAgXSksXG5cblxuICAgICAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgICAgIC8qaWYob2JqZWN0LmdldENvZGUoKT09NSl7XG4gICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigxLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo2KSU2KydkYXJrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgc2l6ZTogMC41K1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgIH1lbHNlKi9cbiAgICAgICAgICAgIGlmKG9iamVjdC5nZXRDb2RlKCk9PTEwKXtcblxuICAgICAgICAgICAgICAgIGlmKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDMse3g6b2JqZWN0LngseTpvYmplY3QueX0pPjAuOTUpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J3RyZWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMytULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjM2MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICApO1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBleHBvcnQgdmFyIGdhbWUgPSBuZXcgVC5HYW1lKFxuICAgICAgICBULlRNYXRoLnByZXR0eU51bWJlcixcbiAgICAgICAgVC5UTWF0aC5wcmV0dHlOdW1iZXJcbiAgICApO1xuXG59IiwiXG5tb2R1bGUgVC5Xb3JsZCB7XG5cblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBkaXN0YW5jZTogMCxcbiAgICAgICAgICAgIHN0cmVuZ3RoOiAwLFxuICAgICAgICAgICAgcm91bmRzOiAxLFxuICAgICAgICAgICAgY29vbGRvd246IDFcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ2F0dGFjaycpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLCAyKSAqIHRoaXMucGFyYW1zLnN0cmVuZ3RoICogdGhpcy5wYXJhbXMucm91bmRzICogKDEgLyB0aGlzLnBhcmFtcy5jb29sZG93bikpICogMTAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgYXR0YWNrZXIsIGF0dGFja2VkLCByZXNvdXJjZXNfYXR0YWNrZXIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9saWZlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLU1pc3NpbmcgYWN0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXJfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjayA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnYXR0YWNrJykucGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IGF0dGFja2VyX2F0dGFjay5kaXN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcgKyBkaXN0YW5jZSArICcgZmllbGRzLiBBdHRhY2sgZGlzdGFuY2UgaXMgb25seSAnICsgYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlICsgJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29vbGRvd25cbiAgICAgICAgICAgICAgICBpZiAoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJyArIGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZEluKCkgKyAnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURlZmVuY2VcblxuICAgICAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIC09XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIDwgMClhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggPSAwO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggLT1cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggPCAwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgICAgIC8vYXR0YWNrZWRfbGlmZS5saWZlPTEwMDA7XG5cblxuICAgICAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgIChhdHRhY2tlcl9saWZlLmxpZmUgPiAxICYmIGF0dGFja2VkX2xpZmUubGlmZSA+IDEpXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHIoJ3JvdW5kJywgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLCBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByKCdsaWZlJywgYXR0YWNrZWRfbGlmZS5saWZlLCBhdHRhY2tlcl9saWZlLmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZSAtPSBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZSAtPSBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9saWZlLmxpZmUgPCAxKWF0dGFja2VyX2xpZmUubGlmZSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2xpZmUubGlmZSA8IDEpYXR0YWNrZWRfbGlmZS5saWZlID0gMTtcblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZlbmNlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuZGVmZW5jZSkgKiA4MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDF9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZmU6IDEsXG4gICAgICAgICAgICBtYXhfbGlmZTogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnbGlmZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtuZXcgVC5SZXNvdXJjZXMoKV0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICk7XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHdvb2Q6IDAsXG4gICAgICAgICAgICBpcm9uOiAwLFxuICAgICAgICAgICAgY2xheTogMCxcbiAgICAgICAgICAgIHN0b25lOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtaW5lJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuYW1vdW50KSAqIDM2MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDR9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gb3IgbWF5YmUgZXhlY3V0ZVxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwZWVkOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtb3ZlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsIDIpKSAqIDEwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMX0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgb2JqZWN0LCBkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBhY3Rpb24vL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb24gPSBvYmplY3QuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoID0gVC5QYXRoLm5ld0NvbnN0YW50U3BlZWQoZGVzdGluYXRpb25zLCBhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKS5ub3dFeGVjdXRlZCgpOy8vdG9kbyBpcyBpdCBuZWVkZWRcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBtYXliZSA/Pz8gdG9kb1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdlbmVyYXRlOiAxMDAsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdyZWdlbmVyYXRlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoMSAvIHRoaXMucGFyYW1zLnJlZ2VuZXJhdGUpICogMzYwMCAqIDAuMDUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiA0fSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgZXhlY3V0ZSgpey8vdG9kbyBtYXliZSB0aWNrPz8/P1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICByZXBhaXI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3JlcGFpcicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyAodGhpcy5wYXJhbXMucmVwYWlyIC8gMTAwKSkgKiAxMDAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDR9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiA0fSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAgLy90b2RvXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3VnaHB1dDogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgndGhyb3VnaHB1dCcpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLnRocm91Z2hwdXQgLyAxMDAsIDIpKSAqIDEwICogMC4wNSk7Ly90b2RvXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDN9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAxfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAwfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
