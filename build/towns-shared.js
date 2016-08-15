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
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
var T;
(function (T) {
    var Game;
    (function (Game) {
        var ActionActive = (function (_super) {
            __extends(ActionActive, _super);
            function ActionActive() {
                _super.apply(this, arguments);
            }
            /**
             * In how many seconds can be this action instance executed?
             * @returns {number}
             */
            ActionActive.prototype.canBeExecutedIn = function () {
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
            ActionActive.prototype.canBeExecutedNow = function () {
                return (this.canBeExecutedIn() === 0);
            };
            /**
             * Set actual date as date of execution this action instance
             */
            ActionActive.prototype.nowExecuted = function () {
                this.last_use = new Date() / 1;
            };
            return ActionActive;
        }(T.Game.Action));
        Game.ActionActive = ActionActive;
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
            function Array(objects) {
                //r(objects);
                //r(objects.length);
                if (objects === void 0) { objects = []; }
                for (var i = 0, l = objects.length; i < l; i++) {
                    //r(i);
                    objects[i] = T.Objects.Object.init(objects[i]);
                }
                this.objects = objects;
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
                var nearest_terrain_1x1;
                terrain_objects_1x1.forEach(function (terrain_1x1) {
                    var distance = terrain_1x1.getPosition().getDistance(position);
                    if (min_distance === -1 || min_distance > distance) {
                        min_distance = distance;
                        nearest_terrain_1x1 = terrain_1x1;
                    }
                });
                if (nearest_terrain_1x1) {
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
            if (resources === void 0) { resources = {}; }
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
        }(T.Game.ActionActive)));
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
                var amount = this.params.wood + this.params.iron + this.params.clay + this.params.stone;
                return amount * 3600 * 0.05;
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
            speed: 0,
            cooldown: 0
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
        }(T.Game.ActionActive)));
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
        }(T.Game.ActionActive)));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvY2FsZS50cyIsIjA1LWxvZy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLWdhbWUvMTAtYWN0aW9uLWFjdGl2ZS5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtY29sb3IuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTAtcG9zaXRpb24tM2QuY2xhc3MudHMiLCIxMC1wb3NpdGlvbi8xMC1wb3NpdGlvbi1wb2xhci5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtcG9zaXRpb24vMTUtcG9zaXRpb24tZGF0ZS5jbGFzcy50cyIsIjEwLXBvc2l0aW9uLzIwLWFyZWEuY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC10bWF0aC5zdGF0aWMudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUVILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNYLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQyxDQUFDO0FDWnBCOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0FjUDtBQWRELFdBQU8sQ0FBQyxFQUFBLENBQUM7SUFDTDtRQUFBO1FBWUEsQ0FBQztRQVZHOzs7O1dBSUc7UUFDSSxVQUFHLEdBQVY7WUFBVyxxQkFBNEI7aUJBQTVCLFdBQTRCLENBQTVCLHNCQUE0QixDQUE1QixJQUE0QjtnQkFBNUIsb0NBQTRCOztZQUVuQyxNQUFNLENBQUEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEMsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLFFBQU0sU0FZbEIsQ0FBQTtBQUNMLENBQUMsRUFkTSxDQUFDLEtBQUQsQ0FBQyxRQWNQO0FDckJEOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxP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QUdEOzs7V0FHRztRQUNILHNCQUFNLEdBQU47WUFFSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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LEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQzlILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztZQUMzSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO1lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztZQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztZQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7WUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO1lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUMxSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDM0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBQyxDQUFDO1lBQ2xJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztTQUN0SSxDQUFDO0lBR04sQ0FBQyxFQXJCUSxLQUFLLEdBQUwsT0FBSyxLQUFMLE9BQUssUUFxQmI7QUFBRCxDQUFDLEVBckJNLENBQUMsS0FBRCxDQUFDLFFBcUJQO0FDMUJEOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0E2SVA7QUE3SUQsV0FBTyxDQUFDO0lBQUMsSUFBQSxLQUFLLENBNkliO0lBN0lRLFdBQUEsS0FBSyxFQUFBLENBQUM7UUFFQSxrQkFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FFeEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFTLEVBQUMsQ0FBUztZQUV2Qyw0QkFBNEI7WUFDNUIsaURBQWlEO1lBQ2pELHFDQUFxQztZQUNyQyxTQUFTO1lBR1QsSUFBTSxHQUFHLEdBQUMsR0FBRyxDQUFDO1lBR2QsSUFBSSxDQUFDLEdBQUUsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxjQUFjLEdBQUMsQ0FBQyxDQUFDO1lBRXJCLElBQUksRUFBVSxFQUFDLEVBQVUsQ0FBQztZQUUxQixJQUFJLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBRVgsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFFbkIsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVqRCxjQUFjLElBQUUsR0FBRyxDQUFDO2dCQUVwQixvQkFBb0I7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsb0NBQW9DO2dCQUNwQyxTQUFTO2dCQUNULFNBQVM7Z0JBRVQsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFaEIsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUlELENBQUMsR0FBQyxDQUFDLEdBQUMsY0FBYyxDQUFDO1lBRW5CLEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQUEsQ0FBQyxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFBQSxDQUFDLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QiwyQkFBMkI7WUFDM0IsTUFBTSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZCxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBRUosQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFB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bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5cbnZhciBUID0ge307XG5tb2R1bGUuZXhwb3J0cyA9ICBUO1xuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFR7XG4gICAgZXhwb3J0IGNsYXNzIExvY2FsZXtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmxhbmsgZW11bGF0b3Igb2YgbG9jYWxlIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gbG9jYWxlX2tleXMge0FycmF5PHN0cmluZz59XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0KC4uLmxvY2FsZV9rZXlzOkFycmF5PHN0cmluZz4pOnN0cmluZ3tcblxuICAgICAgICAgICAgcmV0dXJuKGxvY2FsZV9rZXlzLmpvaW4oJyAnKSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBXcmFwcGVyIGZvciBjb25zb2xlLmxvZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIHIgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgVC5BcnJheUZ1bmN0aW9uc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBmdW5jdGlvbnMgdG8gbWFuaXB1bGF0ZSB3aXRoIGFycmF5LlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBBcnJheUZ1bmN0aW9ucyB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBTZWFyY2hlcyBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEtleSBvZiBvYmplY3Qgd2l0aCB0aGlzIElELCAtMSBpZiBub3QgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZDJpKGFycmF5OiBBcnJheSwgaWQ6c3RyaW5nKTphbnkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKXJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuXG4gICAgICAgIH1cblxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBTZWFyY2hlcyBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvcl9tZXNzYWdlIHdoZW4gaXRlbiBub3QgZXhpc3RzXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE9iamVjdCB3aXRoIHRoaXMgSUQsIG51bGwgaWYgbm90IGV4aXN0XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWQyaXRlbShhcnJheTogQXJyYXksIGlkOiBzdHJpbmcsIGVycm9yX21lc3NhZ2UgPSAnJyk6YW55IHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gYXJyYXlbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBEZWxldGUgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpZFJlbW92ZShhcnJheTogQXJyYXksIGlkOiBzdHJpbmcpOmJvb2xlYW4gey8vdG9kbyByZWZhY3RvciB1c2UgdGhpcyBub3Qgc3BsaWNlXG5cbiAgICAgICAgICAgIGZvciAodmFyIGk9MCxsPWFycmF5Lmxlbmd0aDtpPGw7aSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCAyRCBhcnJheVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGl0ZXJhdGUyRChhcnJheTogQXJyYXksIGNhbGxiYWNrOiBGdW5jdGlvbik6dm9pZCB7XG5cbiAgICAgICAgICAgIC8vcihhcnJheSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwLCB5TGVuID0gYXJyYXkubGVuZ3RoOyB5IDwgeUxlbjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIHhMZW4gPSBhcnJheVt5XS5sZW5ndGg7IHggPCB4TGVuOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgICAgICAgICAgICAgLyp0b2RvIHJlZmFjdG9yIHRvIHgseSovXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAgICAgKiBAcGFyYW0gZnJvbVxuICAgICAgICAgKiBAcGFyYW0gdG9cbiAgICAgICAgICogQHJldHVybiB7YXJyYXl9IFJlbW92ZWQgaXRlbXNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyByZW1vdmVJdGVtcyhhcnJheTpBcnJheSwgZnJvbTpudW1iZXIsIHRvOm51bWJlcik6QXJyYXkge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBmcm9tIDwgMCA/IGFycmF5Lmxlbmd0aCArIGZyb20gOiBmcm9tO1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKiB0b2RvIHNob3VsZCBpdCBiZSB1bmRlciBULkFycmF5RnVuY3Rpb25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmVjdFxuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBwYXRoXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZmlsdGVyUGF0aChvYmplY3Q6IE9iamVjdCwgcGF0aDogQXJyYXk8c3RyaW5nPiwgc2V0VmFsdWU6IGFueSk6YW55IHtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBmb3IgKHZhciBwYXRoX2kgaW4gcGF0aCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdF9rZXkgPSBwYXRoW3BhdGhfaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocGF0aF9pIDwgcGF0aC5sZW5ndGggLSAxIHx8IHR5cGVvZiBzZXRWYWx1ZSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W29iamVjdF9rZXldID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBLZXkgXFwnJytvYmplY3Rfa2V5KydcXCcgaW4gcGF0aCBpbiBvYmplY3QgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBvYmplY3Rbb2JqZWN0X2tleV07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtvYmplY3Rfa2V5XSA9IHNldFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IGNvbnRhaW5pbmcgb25seSB1bmlxdWUgdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdW5pcXVlKGFycmF5OiBBcnJheSk6QXJyYXkge1xuICAgICAgICAgICAgdmFyIG4gPSB7fSwgciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgblthcnJheVtpXV0gPSBhcnJheTtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBodG1sIHRhYmxlIGZyb20gSlMgYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGl0aW9uYWxfY2xhc3NcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFycmF5MnRhYmxlKGFycmF5OkFycmF5LCBhZGRpdGlvbmFsX2NsYXNzID0gJycpOnN0cmluZyB7XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSAnJztcblxuICAgICAgICAgICAgdmFyIHJvd3MgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY29sc190YWJsZSA9IGFycmF5WzBdLmxlbmd0aDsvL3RvZG8gaXMgaXMgYmVzdCBzb2x1dGlvbj9cblxuXG4gICAgICAgICAgICBodG1sICs9ICc8dGFibGUgY2xhc3M9XCInICsgYWRkaXRpb25hbF9jbGFzcyArICdcIj4nO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcblxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPic7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29scyA9IGFycmF5W3Jvd10ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBjb2xzX3NwYW4gPSBjb2xzX3RhYmxlIC0gY29scztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCA9PSBjb2xzIC0gMSAmJiBjb2xzX3NwYW4gIT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkIGNvbHNwYW49XCInICsgKGNvbHNfc3BhbiArIDEpICsgJ1wiPic7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPic7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBhcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdGQ+JztcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgcmV0dXJuIChodG1sKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogZXh0cmFjdCBrZXlzIGZyb20gQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0S2V5cyhvYmplY3Q6T2JqZWN0KTpBcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIG9iamVjdCkga2V5cy5wdXNoKGspO1xuICAgICAgICAgICAgcmV0dXJuIChrZXlzKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICAvKipcbiAgICAgKiBHYW1lIGNvbmRpdGlvbnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XG5cbiAgICAgICAgcHVibGljIGFjdGlvbl9jbGFzc2VzOk9iamVjdDtcbiAgICAgICAgcHVibGljIGFjdGlvbl9lbXB0eV9pbnN0YW5jZXM6T2JqZWN0O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1heF9saWZlX21vZGlmaWVyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByaWNlX2tleV9tb2RpZmllclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXhfbGlmZV9tb2RpZmllcjpGdW5jdGlvbiwgcHVibGljIHByaWNlX2tleV9tb2RpZmllcjpGdW5jdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzID0ge307XG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXMgPSB7fTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgbnVtYmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3Q6VC5PYmplY3RzLk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSBbXTtcblxuXG4gICAgICAgICAgICAvKmlmIChvYmplY3QuYWN0aW9ucy5sZW5naHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luIG9iamVjdCAnICsgb2JqZWN0ICsgJyB0aGVyZSBhcmUgbm8gYWN0aW9ucyEnKTsvL3RvZG8gYWxsIG9iamVjdHMgc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcgbGlrZSB0aGlzXG4gICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb246YW55KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gTWF0aC5jZWlsKGFjdGlvbi5jb3VudFByaWNlQmFzZSgpKTsvL1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIE5hTiAgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4ocHJpY2VfYmFzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJyArIGFjdGlvbi50eXBlICsgJyBtYWtlcyBwcmljZSBiZXNlIE5hTi4nKTtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VfYmFzZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIG5vbiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChwcmljZV9iYXNlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnICsgYWN0aW9uLnR5cGUgKyAnIHNob3VsZCBub3QgbWFrZSB0aGlzIGFjdGlvbiBuZWdhdGl2ZScpOy8vdG9kbyBtYXliZSBvbmx5IHdhcm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHByaWNlX2Jhc2VzLnB1c2gocHJpY2VfYmFzZSk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2VfYmFzZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gbWF4aW11bSBsaWZlIG9mIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T2JqZWN0TWF4TGlmZShvYmplY3Q6VC5PYmplY3RzLk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gcHJpY2VfYmFzZXMucmVkdWNlKGZ1bmN0aW9uIChwdiwgY3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHYgKyBjdjtcbiAgICAgICAgICAgIH0sIDApO1xuXG5cbiAgICAgICAgICAgIHByaWNlX2Jhc2UgPSB0aGlzLm1heF9saWZlX21vZGlmaWVyKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBSZXNvdXJjZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlcyhvYmplY3QpIHtcblxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcblxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VzID0gW107XG5cblxuICAgICAgICAgICAgdmFyIGRlc2lnbl9yZXNvdXJjZXMgPSBvYmplY3QuZ2V0TW9kZWwoKS5hZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCk7XG5cblxuICAgICAgICAgICAgb2JqZWN0LmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uOmFueSwgaTpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmdldFByaWNlUmVzb3VyY2VzKCkuc29ydChmdW5jdGlvbiAoYTphbnksIGI6YW55KSB7Ly90b2RvIGlzIGl0IHNhZmU/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYS5jbG9uZSgpLnNpZ251bSgpKSAtIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShiLmNsb25lKCkuc2lnbnVtKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzID0gcHJpY2VfcmVzb3VyY2VzX2xpc3RbMF0uY2xvbmUoKTtcblxuXG4gICAgICAgICAgICAgICAgcHJpY2VfcmVzb3VyY2VzLm11bHRpcGx5KHByaWNlX2Jhc2VzW2ldKTtcbiAgICAgICAgICAgICAgICBwcmljZXMucHVzaChwcmljZV9yZXNvdXJjZXMpO1xuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBSZXNvdXJjZXMgLSBwcmljZSBvZiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlKG9iamVjdDpULk9iamVjdHMuQXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW1wdHkgcHJpY2UnLHByaWNlKTtcblxuICAgICAgICAgICAgdmFyIHByaWNlcyA9IHRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmljZV8pIHtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJpY2UuYXBwbHkodGhpcy5wcmljZV9rZXlfbW9kaWZpZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBpbnN0YWxsQWN0aW9uQ2xhc3MoYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtczpPYmplY3QsIGFjdGlvbl9jbGFzczphbnkpIHtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmdldFR5cGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiBhY3Rpb24gY2xhc3MgaGFzIG5vIHR5cGUhJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiB0aGVyZSBpcyBhbHJlYWR5IGluc3RhbGxlZCBhY3Rpb24gd2l0aCB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2VtcHR5X2luc3RhbmNlID0gbmV3IGFjdGlvbl9jbGFzcyh7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vQWRkaW5nIG1ldGhvZCBjbG9uZSB0byBpbnN0YWxsZWQgYWN0aW9uIGNsYXNzXG4gICAgICAgICAgICBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IGFjdGlvbl9jbGFzcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdID0gYWN0aW9uX2NsYXNzO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW3R5cGVdID0gYWN0aW9uX2VtcHR5X2luc3RhbmNlO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGU6c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25fY2xhc3MgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSArICcuIFRoZXJlIGFyZSBvbmx5IHRoZXNlIGFjdGlvbiB0eXBlczogJyArIFQuQXJyYXlGdW5jdGlvbnMuZ2V0S2V5cyh0aGlzLmFjdGlvbl9jbGFzc2VzKS5qb2luKCcsICcpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGFjdGlvbl9jbGFzcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbmV3QWN0aW9uSW5zdGFuY2UoYWN0aW9uOmFueSkge1xuXG4gICAgICAgICAgICAvL3RvZG8gc29sdmUgZGVmZW5zZSB2cy4gZGVmZW5jZVxuICAgICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnZGVmZW5zZScpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udHlwZSA9ICdkZWZlbmNlJztcbiAgICAgICAgICAgICAgICBhY3Rpb24ucGFyYW1zLmRlZmVuY2UgPSBhY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IGFjdGlvbl9jbGFzcyhhY3Rpb24pO1xuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVBY3Rpb25FeGVjdXRlKGFjdGlvbl90eXBlOnN0cmluZykge1xuXG4gICAgICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKTtcblxuXG4gICAgICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoZ2FtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChleGVjdXRlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZShhY3Rpb25fdHlwZTpzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9pbnN0YW5jZSA9IHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1thY3Rpb25fdHlwZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uX2luc3RhbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcgKyBhY3Rpb25fdHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoYWN0aW9uX2luc3RhbmNlKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qZ2V0QWN0aW9uRXhlY3V0ZShhY3Rpb25fa2V5KXtcblxuICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX2tleV07XG5cbiAgICAgICAgIGlmKHR5cGVvZiBhY3Rpb249PSd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gdHlwZSAnK2FjdGlvbl9rZXkrJy4nKTtcblxuICAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG5cblxuICAgICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICB2YXIgYXJncyA9IFtnYW1lXS5wdXNoLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgIHJldHVybiBhY3Rpb24uZXhlY3V0ZV9jYWxsYmFjay5hcHBseSh0aGlzLGFyZ3MpO1xuXG4gICAgICAgICB9O1xuXG5cblxuICAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgICAgICAgfSovXG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZS5BY3Rpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULkdhbWUge1xuXG5cbiAgICBpbnRlcmZhY2UgQWN0aW9uT2JqZWN0e1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIHBhcmFtczogT2JqZWN0O1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXG5cbiAgICAgICAgcHVibGljIGxhc3RfdXNlOm51bWJlcjtcbiAgICAgICAgcHVibGljIHR5cGU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgcGFyYW1zOk9iamVjdDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGFjdGlvbjpBY3Rpb25PYmplY3QpIHtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdldFR5cGUoKSA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgZXh0ZW5kIFQuR2FtZS5BY3Rpb24gYW5kIGFkZCBtZXRob2QgZ2V0VHlwZSBiZWZvcmUgY3JlYXRpbmcgaW5zdGFuY2VzIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0VHlwZSgpO1xuXG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gdHlwZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGlzICcgKyB0eXBlICsgJyBub3QgJyArIGFjdGlvbi50eXBlICsgJyBjbGFzcyEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IGFjdGlvbltrZXldO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgcGFyYW1zXG5cbiAgICAgICAgICAgIC8qZm9yKHZhciBwYXJhbSBpbiBhY3Rpb25BYmlsaXR5LnBhcmFtcyl7XG4gICAgICAgICAgICAgdmFyIHBhcmFtX3R5cGUgPSBhY3Rpb24uYWJpbGl0eV9wYXJhbXNbcGFyYW1dO1xuXG4gICAgICAgICAgICAgaWYodHlwZW9mIGFjdGlvbkFiaWxpdHkucGFyYW1zW3BhcmFtXSE9PXBhcmFtX3R5cGUpe1xuICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW0gJytwYXJhbSsnIHNob3VsZCBiZSAnK3BhcmFtX3R5cGUrJyBpbnN0ZWFkIG9mICcrdHlwZW9mKGFjdGlvbkFiaWxpdHkuYWJpbGl0eV9wYXJhbXNbcGFyYW1dKSsnIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uQWJpbGl0eS50eXBlKTtcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRUeXBlKCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuICgndW5kZWZpbmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcbiAgICAgICAgICAgIHJldHVybiAoW10pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBodG1sIHByb2ZpbGUgb2YgYWN0aW9uIGFiaWxpdHlcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUh0bWxQcm9maWxlKCkge1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJhY3Rpb24tYWJpbGl0eS1wcm9maWxlXCI+JztcblxuICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIyXCI+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSkgKyBgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0X3VzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsICdsYXN0X3VzZWQnKSArIGA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gICsgdGhpcy5sYXN0X3VzZSArIGA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgcGFyYW0gaW4gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSwgcGFyYW0pICsgYDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyB0aGlzLnBhcmFtc1twYXJhbV0gKyBgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgcmV0dXJuIChodG1sKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkdhbWUuQWN0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5HYW1lIHtcblxuXG4gICAgaW50ZXJmYWNlIEFjdGlvbkFjdGl2ZVBhcmFtc09iamVjdHtcbiAgICAgY29vbGRvd246IG51bWJlcjtcbiAgICAgfVxuICAgIGludGVyZmFjZSBBY3Rpb25PYmplY3R7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgcGFyYW1zOiBBY3Rpb25BY3RpdmVQYXJhbXNPYmplY3Q7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbkFjdGl2ZSBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBwdWJsaWMgbGFzdF91c2U6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwYXJhbXM6QWN0aW9uQWN0aXZlUGFyYW1zT2JqZWN0O1xuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW4gaG93IG1hbnkgc2Vjb25kcyBjYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQ/XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjYW5CZUV4ZWN1dGVkSW4oKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5jb29sZG93biA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0X3VzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcyA9IE1hdGguYWJzKHRoaXMubGFzdF91c2UgLSBuZXcgRGF0ZSgpKSAvIDEwMDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuY29vbGRvd24gPD0gcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5wYXJhbXMuY29vbGRvd24gLSBzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQgbm93P1xuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGNhbkJlRXhlY3V0ZWROb3coKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY2FuQmVFeGVjdXRlZEluKCkgPT09IDApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGFjdHVhbCBkYXRlIGFzIGRhdGUgb2YgZXhlY3V0aW9uIHRoaXMgYWN0aW9uIGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBub3dFeGVjdXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdF91c2UgPSBuZXcgRGF0ZSgpLzE7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cblxufSIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwR2VuZXJhdG9yIHtcblxuICAgICAgICBwdWJsaWMgYmlvdG9wZTpULk1hcEdlbmVyYXRvci5CaW90b3BlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRaXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHpfbm9ybWFsaXppbmdfdGFibGVcbiAgICAgICAgICogQHBhcmFtIHtULk1hcEdlbmVyYXRvci5CaW90b3BlfSBiaW90b3BlXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHZpcnR1YWxPYmplY3RHZW5lcmF0b3JcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2V0WjpGdW5jdGlvbiwgcHVibGljIHpfbm9ybWFsaXppbmdfdGFibGU6QXJyYXksIHB1YmxpYyBiaW90b3BlOkFycmF5LCBwdWJsaWMgdmlydHVhbE9iamVjdEdlbmVyYXRvcjpGdW5jdGlvbikge1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXI6VC5Qb3NpdGlvbiwgcmFkaXVzOm51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDw9IHJhZGl1cyAqIDI7IHkrKykge1xuXG4gICAgICAgICAgICAgICAgbWFwW3ldID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSByYWRpdXMgKiAyOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHggLSByYWRpdXMgKyAxIC8gMiwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIHJhZGl1cyArIDEgLyAyLCAyKSA+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsIDIpXG4gICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5nZXRaKHggLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci54LCB5IC0gcmFkaXVzICsgY2VudGVyX2ludGVnZXIueSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBtYXBbeV1beF0gPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRlcnJhaW5NYXAobWFwOkFycmF5KSB7XG5cbiAgICAgICAgICAgIHZhciBtYXBfYmcgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIGwgPSBtYXAubGVuZ3RoOyB5IDwgbDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2JnW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBsOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcFt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcF9iZ1t5XVt4XSA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbihtYXBbeV1beF0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG1hcF9iZyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcjpULlBvc2l0aW9uLCByYWRpdXM6bnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IDE7XG5cblxuICAgICAgICAgICAgdmFyIHpfbWFwID0gdGhpcy5nZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyLCByYWRpdXMpO1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gdGhpcy50ZXJyYWluTWFwKHpfbWFwKTtcblxuICAgICAgICAgICAgcmV0dXJuIChtYXApO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBfYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXk6QXJyYXksIGNlbnRlcl9pbnRlZ2VyOlQuUG9zaXRpb24sIHJhZGl1czpudW1iZXIpIHtcblxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcF9hcnJheVt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihtYXBfYXJyYXlbeV1beF0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnggPSBjZW50ZXJfaW50ZWdlci54IC0gcmFkaXVzICsgeDtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnkgPSBjZW50ZXJfaW50ZWdlci55IC0gcmFkaXVzICsgeTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRQdXJlTWFwKGNlbnRlcjpULlBvc2l0aW9uLCByYWRpdXM6bnVtYmVyLCBub3RfY2VudGVyPzpULlBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2VudGVyLG5vdF9jZW50ZXIpO1xuXG4gICAgICAgICAgICB2YXIgY2VudGVyX2ludGVnZXIgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihjZW50ZXIueCksXG4gICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihjZW50ZXIueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChub3RfY2VudGVyKVxuICAgICAgICAgICAgICAgIG5vdF9jZW50ZXIgPSBuZXcgVC5Qb3NpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgbm90X2NlbnRlci54IC0gY2VudGVyX2ludGVnZXIueCxcbiAgICAgICAgICAgICAgICAgICAgbm90X2NlbnRlci55IC0gY2VudGVyX2ludGVnZXIueVxuICAgICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgLyp2YXIgbWFwX2FycmF5ID0gdGhpcy5nZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpO1xuICAgICAgICAgICAgIHZhciBvYmplY3RzID0gdGhpcy5jb252ZXJ0TWFwQXJyYXlUb09iamVjdHMobWFwX2FycmF5LGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7LyoqL1xuXG5cbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB2YXIgeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlciwgdDpudW1iZXIsIG9iamVjdDpULk9iamVjdHMuT2JqZWN0O1xuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8PSByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDw9IHJhZGl1cyAqIDI7IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5IC0gcmFkaXVzICsgMSAvIDIsIDIpID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdF9jZW50ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIG5vdF9jZW50ZXIueCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIG5vdF9jZW50ZXIueSAtIHJhZGl1cyArIDEgLyAyLCAyKSA8PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHogPSB0aGlzLmdldFooeCAtIHJhZGl1cyArIGNlbnRlcl9pbnRlZ2VyLngsIHkgLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci55KTtcbiAgICAgICAgICAgICAgICAgICAgeiA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cbiAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbih6KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbih0KTtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnggPSBjZW50ZXJfaW50ZWdlci54IC0gcmFkaXVzICsgeDtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnkgPSBjZW50ZXJfaW50ZWdlci55IC0gcmFkaXVzICsgeTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5PYmplY3RzLkFycmF5fSBvYmplY3RzXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhvYmplY3RzOlQuT2JqZWN0cy5BcnJheSkge1xuXG5cbiAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXc6IEFycmF5ID0gb2JqZWN0cy5nZXQxeDFUZXJyYWluT2JqZWN0cygpLmdldEFsbCgpO1xuXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0c18xeDFfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsT2JqZWN0R2VuZXJhdG9yKG9iamVjdHNfMXgxX3Jhd1tpXSwgdmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVBVQkxJQz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBsZXRlIHRlcnJhaW4gYW5kIHZpcnR1YWwgb2JqZWN0cyBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtULk9iamVjdHMuQXJyYXl9IHJlYWxfb2JqZWN0c1xuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlydHVhbF9vYmplY3RzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlciBEb250IGdldCBvYmplY3RzIG5lYXIgdGhpcyBjZW50ZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q29tcGxldGVPYmplY3RzKHJlYWxfb2JqZWN0czpULk9iamVjdHMuQXJyYXksIGNlbnRlcjpULlBvc2l0aW9uLCByYWRpdXM6bnVtYmVyLCBuYXR1cmFsX29iamVjdHMgPSB0cnVlLCBub3RfY2VudGVyPzogVC5Qb3NpdGlvbikge1xuXG5cbiAgICAgICAgICAgIHZhciBjb21wbGV0ZV9vYmplY3RzID0gdGhpcy5nZXRQdXJlTWFwKGNlbnRlciwgcmFkaXVzLCBub3RfY2VudGVyKTtcblxuXG4gICAgICAgICAgICByZWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAobmF0dXJhbF9vYmplY3RzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gdGhpcy5nZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhjb21wbGV0ZV9vYmplY3RzKTtcblxuICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5NYXBHZW5lcmF0b3Ige1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQmlvdG9wZSB7XG5cblxuICAgICAgICBwdWJsaWMgdGVycmFpbnM6QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodGVycmFpbnMpIHtcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHRlcnJhaW4uYW1vdW50O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdmFyIGZyb20gPSAwO1xuICAgICAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbiAodGVycmFpbikge1xuXG4gICAgICAgICAgICAgICAgdGVycmFpbi5mcm9tID0gZnJvbSAvIHN1bTtcbiAgICAgICAgICAgICAgICBmcm9tICs9IHRlcnJhaW4uYW1vdW50O1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgICAgICB0aGlzLnRlcnJhaW5zID0gdGVycmFpbnM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6XG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFpUZXJyYWluKHo6bnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudGVycmFpbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAgICAgICAgIGlmICh6ID49IHRoaXMudGVycmFpbnNbaV0uZnJvbSkgcmV0dXJuICh0aGlzLnRlcnJhaW5zW2ldLnRlcnJhaW4pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Nb2RlbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICBpbnRlcmZhY2UgTW9kZWxPYmplY3R7XG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICBwYXJ0aWNsZXM6QXJyYXk7XG4gICAgICAgIHJvdGF0aW9uOm51bWJlcjtcbiAgICAgICAgc2l6ZTpudW1iZXI7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgTW9kZWwge1xuXG5cbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgcGFydGljbGVzOkFycmF5O1xuICAgICAgICBwdWJsaWMgcm90YXRpb246bnVtYmVyO1xuICAgICAgICBwdWJsaWMgc2l6ZTpudW1iZXI7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsIGpzb25cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2UgaW4gY2FzZSBvZiBmYWlsXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoanNvbjpNb2RlbE9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGpzb24pID09ICd1bmRlZmluZWQnKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5uYW1lID0ganNvbi5uYW1lO1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBqc29uLnBhcnRpY2xlcztcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSBqc29uLnJvdGF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zaXplID0ganNvbi5zaXplO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMucm90YXRpb24pID09ICd1bmRlZmluZWQnKXRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLnNpemUpID09ICd1bmRlZmluZWQnKXRoaXMuc2l6ZSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Nb2RlbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICAgICAqL1xuICAgICAgICBhZGRSb3RhdGlvblNpemUocm90YXRpb246bnVtYmVyLCBzaXplOm51bWJlcikge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemUgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uICs9IHJvdGF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplICogc2l6ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGRpbWVuc2lvbiB4LHkseix4eVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhbmdlXG4gICAgICAgICAqL1xuICAgICAgICByYW5nZShkaW1lbnNpb246c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIGlmIChkaW1lbnNpb24gPT0gJ3h5Jykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdCh0aGlzLnJhbmdlKCd4JyksIHRoaXMucmFuZ2UoJ3knKSAqIHRoaXMuc2l6ZSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuICAgICAgICAgICAgdmFyIG1heDpudW1iZXIsIG1pbjpudW1iZXIsIG1heF86bnVtYmVyLCBtaW5fOm51bWJlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzTGluZWFyKSB7XG5cblxuICAgICAgICAgICAgICAgIG1pbl8gPSBwYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXTtcbiAgICAgICAgICAgICAgICBtYXhfID0gcGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl0gKyBwYXJ0aWNsZXNMaW5lYXJbaV0uc2l6ZVtkaW1lbnNpb25dO1xuXG4gICAgICAgICAgICAgICAgLy90b2RvIGZlYXR1cmUgcmV2ZXJzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnKW1heCA9IG1heF87XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnKW1pbiA9IG1pbl87XG5cblxuICAgICAgICAgICAgICAgIGlmIChtYXhfID4gbWF4KW1heCA9IG1heF87XG4gICAgICAgICAgICAgICAgaWYgKG1pbl8gPCBtaW4pbWluID0gbWluXztcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5hYnMobWluIC0gbWF4KS8qdGhpcy5zaXplKi8pOy8vdG9kbyByb3RhdGlvblxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV96XG4gICAgICAgICAqL1xuICAgICAgICBtb3ZlQnkobW92ZV94ID0gMCwgbW92ZV95ID0gMCwgbW92ZV96ID0gMCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMucGFydGljbGVzKSB7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnggKz0gbW92ZV94O1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKz0gbW92ZV95O1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnogKz0gbW92ZV96O1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIFogb2Ygam9pbmluZyBtb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICAgICAqL1xuICAgICAgICBqb2luTW9kZWxaKG1vZGVsOlQuTW9kZWwsIG1vdmVfeDpudW1iZXIsIG1vdmVfeTpudW1iZXIpIHsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgICAgICAvL3ZhciAgbW9kZWxfPWRlZXBDb3B5TW9kZWwobW9kZWwpO1xuICAgICAgICAgICAgLy9tb2RlbF8ubW92ZUJ5KG1vdmVfeCxtb3ZlX3kpOy8vdG9kbyBtYXliZSBkZWxldGUgbW92ZUJ5XG5cbiAgICAgICAgICAgIC8vdmFyIG1heF96PXRoaXMucmFuZ2UoJ3onKTtcblxuXG4gICAgICAgICAgICB2YXIgdGhpc19saW5lYXJfcGFydGljbGVzID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcbiAgICAgICAgICAgIHZhciBtb2RlbF9saW5lYXJfcGFydGljbGVzID0gbW9kZWwuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlcyA9IFswXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbW9kZWxfbGluZWFyX3BhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICs9IG1vdmVfeDtcbiAgICAgICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKz0gbW92ZV95O1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWkgaW4gdGhpc19saW5lYXJfcGFydGljbGVzKSB7Ly90b2RvIG1heWJlIG9wdGltaXplIGJ5IHByZS1zb3J0aW5nXG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoVC5Nb2RlbC5QYXJ0aWNsZXMuY29sbGlzaW9uMkQodGhpc19saW5lYXJfcGFydGljbGVzW2lpXSwgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcih0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLCBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXMucHVzaCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLnBvc2l0aW9uLnogKyB0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLnNpemUueik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1heF96ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgZGlzdGFuY2VzKTtcblxuICAgICAgICAgICAgcmV0dXJuIG1heF96O1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBKb2luIG1vZGVscyB0b2dldGhlclxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICAgICAqL1xuICAgICAgICBqb2luTW9kZWwobW9kZWwsIG1vdmVfeCwgbW92ZV95KSB7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICAgICAgdmFyIG1heF96ID0gdGhpcy5qb2luTW9kZWxaKG1vZGVsLCBtb3ZlX3gsIG1vdmVfeSk7XG5cblxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBbXG4gICAgICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSksXG4gICAgICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbCkpXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1sxXS5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBtb3ZlX3gsXG4gICAgICAgICAgICAgICAgeTogbW92ZV95LFxuICAgICAgICAgICAgICAgIHo6IG1heF96XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZXAgY29weSB0aGlzIGFuZCBjb252ZXJ0cyBsaW5rcyB0byByYXcgZGF0YVxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBNb2RlbFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKSB7XG5cblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5jbG9uZSgpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgbGlua3MgdG8gcmF3IGRhdGFcblxuXG4gICAgICAgICAgICB2YXIgZmluZFBhcnRpY2xlQnlOYW1lID0gZnVuY3Rpb24gKHBhcnRpY2xlcywgbmFtZSkgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydGljbGVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmRlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShwYXJ0aWNsZXNbaV0ucGFydGljbGVzLCBuYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmRlZF9wYXJ0aWNsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZpbmRlZF9wYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzTGlua3MgPSBmdW5jdGlvbiAocGFydGljbGVzKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cblxuICAgICAgICAgICAgICAgIC8vcihwYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+TGlua1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5saW5rKSAhPSAndW5kZWZpbmVkJykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rZWRfcGFydGljbGUgPSBmaW5kUGFydGljbGVCeU5hbWUobW9kZWwucGFydGljbGVzLCBwYXJ0aWNsZXNbaV0ubGluayk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRfcGFydGljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpbmsgJyArIHBhcnRpY2xlc1tpXS5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5rZWRfcGFydGljbGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucm90YXRpb24pICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGVzW2ldLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0uc2l6ZSkgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlc1tpXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucG9zaXRpb24pICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnBvc2l0aW9uID0gcGFydGljbGVzW2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvIHNrZXdcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNbaV0gPSBsaW5rZWRfcGFydGljbGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhwYXJ0aWNsZXNbaV0ucGFydGljbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhtb2RlbC5wYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IDFEIGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemVcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldExpbmVhclBhcnRpY2xlcyhpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplID0gZmFsc2UpIHtcblxuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyID0gW107XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBwYXJ0aWNsZXMgdG8gMUQgcGFydGljbGVzXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXMyTGluZWFyID0gZnVuY3Rpb24gKHBhcnRpY2xlcywgcG9zaXRpb24sIHJvdGF0aW9uLCBzaXplKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJylwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemUgPSAxO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6OiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9wYXJ0aWNsZT1kZWVwQ29weShwYXJ0aWNsZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkRlZmF1bHQgcGFyYW1zIG9mIHBhcnRpY2xlLCBncm91cCBvciBsaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFydGljbGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUucm90YXRpb24pID09ICd1bmRlZmluZWQnKXBhcnRpY2xlLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5zaXplKSA9PSAndW5kZWZpbmVkJylwYXJ0aWNsZS5zaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flBvc2l0aW9uLCBSb3RhdGlvbiBhbmQgc2l6ZSAvL3RvZG8gc2tld1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0RGVnID0gVC5UTWF0aC54eTJkaXN0RGVnKHBhcnRpY2xlLnBvc2l0aW9uLngsIHBhcnRpY2xlLnBvc2l0aW9uLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRpc3REZWcuZGlzdCA9IGRpc3REZWcuZGlzdCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIGRpc3REZWcuZGVnICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IFQuVE1hdGguZGlzdERlZzJ4eShkaXN0RGVnLmRpc3QsIGRpc3REZWcuZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0geHkueDtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHh5Lnk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBwYXJ0aWNsZS5wb3NpdGlvbi56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ICs9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiArPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2l6ZSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplID0gcGFydGljbGUuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS54ID0gcGFydGljbGUuc2l6ZS54ICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueSA9IHBhcnRpY2xlLnNpemUueSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zaXplLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QYXJ0aWNsZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnBhcnRpY2xlcykgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihwYXJ0aWNsZS5wYXJ0aWNsZXMsIHBhcnRpY2xlLnBvc2l0aW9uLCBwYXJ0aWNsZS5yb3RhdGlvbiwgcGFydGljbGUuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5zaGFwZSkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGluZWFyLnB1c2gocGFydGljbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuXG4gICAgICAgICAgICBpZiAoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsIGZhbHNlLCAwLCAxKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLCBmYWxzZSwgbW9kZWwucm90YXRpb24sIG1vZGVsLnNpemUpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy90b2RvIHN0cmljdCBtb2RlLy9kZWxldGUgbW9kZWw7XG5cbiAgICAgICAgICAgIHJldHVybiAocGFydGljbGVzTGluZWFyKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHBhdGhcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJQYXRoKHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwYXRoLmZvckVhY2gpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5wYXJ0aWNsZXNbaV07XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHBhdGhcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJQYXRoU2libGluZ3MocGF0aCkge1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IG1vZGVsO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBhdGguZm9yRWFjaCkgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlX2ksIHBhdGhfaWkpIHtcblxuICAgICAgICAgICAgICAgIC8qaWYocGF0aF9paTxwYXRoLmxlbmd0aC0xKXtcblxuICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJ0aWNsZXNbcGFydGljbGVfaV07XG5cbiAgICAgICAgICAgICAgICAgfWVsc2V7Ki9cblxuICAgICAgICAgICAgICAgIHZhciBtZSA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudC5wYXJ0aWNsZXMgPSBbbWVdO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1lO1xuICAgICAgICAgICAgICAgIC8vfVxuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdncmVnYXRlIHZvbHVtZSBvZiBlYWNoIHJlc291cmNlIHVzZWQgaW4gbW9kZWxcbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgYWdncmVnYXRlUmVzb3VyY2VzVm9sdW1lcygpIHtcblxuXG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuXG5cbiAgICAgICAgICAgIHZhciBsaW5lYXJfcGFydGljbGVzID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuXG4gICAgICAgICAgICBsaW5lYXJfcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmVhcl9wYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZvbHVtZSA9Ly90b2RvIGFsbCBzaGFwZXNcbiAgICAgICAgICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlLnNpemUueCAqXG4gICAgICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnkgKlxuICAgICAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICAgICAgdmFyIG1hdGVyaWFsID0gbGluZWFyX3BhcnRpY2xlLm1hdGVyaWFsLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBtYXRlcmlhbFswXTtcblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV86VC5SZXNvdXJjZXMgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuICAgICAgICAgICAgICAgIHByaWNlX1ttYXRlcmlhbF0gPSB2b2x1bWU7XG5cbiAgICAgICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qY29uc29sZS5sb2coJ3ByaWNlIG9mJyk7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0LmRlc2lnbi5kYXRhKTtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmljZSk7Ki9cblxuICAgICAgICAgICAgLy9wcmljZS5tdWx0aXBseSgwLjAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRIYXNoKCkge1xuICAgICAgICAgICAgcmV0dXJuICd4eHgnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJ0aWNsZXMpLmxlbmd0aDsvL3RvZG8gYmV0dGVyXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGF1dGhvciBUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBjbGFzcyBULk1vZGVsLlBhcnRpY2xlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5Nb2RlbCB7XG5cblxuICAgIC8qKlxuICAgICAqIE1vZGVsIFBhcnRpY2xlc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQYXJ0aWNsZXMge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtaXNzaW5nIHBhcmFtcyBpbnRvIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gcGFydGljbGVcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKSB7Ly90b2RvID8/IG1heWJlIHJlbmFtZVxuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5za2V3ID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNrZXcueiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5za2V3LnogPSB7eDogMCwgeTogMH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNoYXBlLnRvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS50b3AgPSAxO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUuYm90dG9tID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9IDE7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5yb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAocGFydGljbGUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyBnZXRUcmlhbmdsZXMocGFydGljbGUsIHBvaW50X2NsYXNzKSB7XG5cbiAgICAgICAgICAgIHZhciB0cmlhbmdsZXMgPSBbXTtcblxuICAgICAgICAgICAgcGFydGljbGUgPSB0aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1wcmlzbVxuXG4gICAgICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHBhcnRpY2xlLnBvc2l0aW9uLno7Ly8gKiAyO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgICAgIHZhciB6XyA9IHBhcnRpY2xlLnNpemUuejtcblxuICAgICAgICAgICAgICAgIGxldCB4X18sIHlfXywgel9fO1xuICAgICAgICAgICAgICAgIGxldCBiYXNlOm51bWJlcjtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVhZWiByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydGljbGUuc2hhcGUucm90YXRlZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5UTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5UTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgcG9pbnRfY2xhc3MoeF9fLCB5X18sIHpfXykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cmlhbmdsZXM7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgM0QgbW9kZWwgZnJvbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBkZXByZWNhdGVkXG4gICAgICAgICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0M0QocGFydGljbGUpIHtcblxuICAgICAgICAgICAgaW50ZXJmYWNlIFBvaW50c09iamVjdHtcbiAgICAgICAgICAgICAgICBwb2ludHM6IEFycmF5O1xuICAgICAgICAgICAgICAgIHBvbHlnb25zOiBBcnJheTxBcnJheT47XG4gICAgICAgICAgICAgICAgcG9seWdvbnMyRDogQXJyYXk8QXJyYXk+O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2U6UG9pbnRzT2JqZWN0O1xuXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMuYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgICAgICB2YXIgeCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgICAgIHZhciB4XyA9IHBhcnRpY2xlLnNpemUueDtcbiAgICAgICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG5cbiAgICAgICAgICAgICAgICAvL3IoeF8seV8pO1xuICAgICAgICAgICAgICAgIC8vcihwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG5cbiAgICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMgPSBbW10sIFtdXTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEID0gW1tdLCBbXV07XG4gICAgICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeV8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSAoMiAtIChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULlRNYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIERpc3REZWdfLmRlZyArPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULlRNYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geHlfLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2ludHMucHVzaChbeCArIHhfXywgeSArIHlfXywgeiArIHpfX10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFsxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqL1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgMkQgbGluZXMgZnJvbSBwYXJ0aWNsZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYmFzZSAwPWJvdHRvbSwgMT10b3BcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IDJEIGxpbmVzXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0MkRsaW5lcyhwYXJ0aWNsZSwgYmFzZSkge1xuXG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IHRoaXMuZ2V0M0QocGFydGljbGUpO1xuXG4gICAgICAgICAgICB2YXIgbGluZXMgPSBbXTtcblxuICAgICAgICAgICAgdmFyIHBvbHlnb25zMkQgPSBbcmVzb3VyY2UucG9seWdvbnMyRFtiYXNlXV07XG5cbiAgICAgICAgICAgIGZvciAodmFyIHBuIGluIHBvbHlnb25zMkQpIHtcblxuICAgICAgICAgICAgICAgIC8qbGluZXNbcG5dPVtdO1xuXG4gICAgICAgICAgICAgICAgIGZvcih2YXIgcHQgaW4gcmVzb3VyY2UucG9seWdvbnNbcG5dKSB7XG5cbiAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gcmVzb3VyY2UucG9pbnRzW3Jlc291cmNlLnBvbHlnb25zW3BuXVtwdF0gLSAxXTtcbiAgICAgICAgICAgICAgICAgbGluZXNbcG5dW3BzXSA9IFtwb2ludFswXSwgcG9pbnRbMV1dO1xuXG4gICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50MSwgcG9pbnQyO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IC0xLCBsID0gcG9seWdvbnMyRFtwbl0ubGVuZ3RoOyBpIDwgbCAtIDE7IGkrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSBsIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgcG9pbnQyID0gaSArIDE7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL3IocmVzb3VyY2UucG9seWdvbnNbcG5dLHBvaW50MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50MV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQyID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50Ml0gLSAxXTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludDFbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludDJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQyWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vcihsaW5lcyk7XG5cbiAgICAgICAgICAgIHJldHVybiAobGluZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8vdG9kbyBtYXliZSByZWZhY3RvciBtb3ZlIHRvIE1hdGhcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIDJEIGxpbmVzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHthcnJheX0gbGluZXMxXG4gICAgICAgICAqIEBwYXJhbSAoYXJyYXkpIGxpbmVzMlxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkxIGluIGxpbmVzMSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkyIGluIGxpbmVzMikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLmxpbmVDb2xsaXNpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVsxXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzBdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueVxuICAgICAgICAgICAgICAgICAgICAgICAgKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3IoJ2NvbGxpc2lvbjJEIGlzIHRydWUnLCBwYXJ0aWNsZTEsIHBhcnRpY2xlMik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgcGFydGljbGVzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlMSBib3R0b21cbiAgICAgICAgICogQHBhcmFtIChvYmplY3QpIHBhcnRpY2xlMiB0b3BcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjb2xsaXNpb24yRChwYXJ0aWNsZTEsIHBhcnRpY2xlMikge1xuXG5cbiAgICAgICAgICAgIHZhciBsaW5lczEgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTEsIDEpO1xuICAgICAgICAgICAgdmFyIGxpbmVzMiA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMiwgMCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvcm5lciBjb2xsaXNpb25cblxuXG4gICAgICAgICAgICB2YXIgY29sbGlzaW9uID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW5uZXIgY29udmV4IGNvbGxpc2lvblxuXG4gICAgICAgICAgICAvKiovXG4gICAgICAgICAgICBpZiAoIWNvbGxpc2lvbikge1xuXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSAxMDA7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dGVyLCBpbm5lcjtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMjsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMVswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lciA9IC8qZGVlcENvcHkqLyhsaW5lczJbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXIyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbm5lcikpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcl92ZWN0b3JfeCA9IGlubmVyWzFdLnggLSBpbm5lclswXS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl95ID0gaW5uZXJbMV0ueSAtIGlubmVyWzBdLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMVswXS54IC09IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMVswXS55IC09IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueCArPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueSArPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxID0gW2lubmVyMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjIgPSBbaW5uZXIyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjEgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIxLCBvdXRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMiA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjIsIG91dGVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uMSAmJiBjb2xsaXNpb24yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICB9KCk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqL1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWJ1ZyBURERcbiAgICAgICAgICAgIC8qKnZhciBzaXplPTEwMDtcbiAgICAgICAgICAgICB2YXIgc3JjPWNyZWF0ZUNhbnZhc1ZpYUZ1bmN0aW9uQW5kQ29udmVydFRvU3JjKFxuICAgICAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lc189W2xpbmVzMSxsaW5lczJdO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGxpbmVzXyl7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9IDAsbD1saW5lc19ba2V5XS5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhsaW5lc19ba2V5XVtpXVswXS54K3NpemUsbGluZXNfW2tleV1baV1bMF0ueStzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhsaW5lc19ba2V5XVtpXVsxXS54K3NpemUsbGluZXNfW2tleV1baV1bMV0ueStzaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7LyoqL1xuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiAoY29sbGlzaW9uKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cblxufSIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQXJyYXlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4vL3RvZG8gVC5PYmplY3RzLkFycmF5ID0gY2xhc3MgZXh0ZW5kcyBBcnJheXtcblxuXG4gICAgZXhwb3J0IGNsYXNzIEFycmF5IHtcblxuXG4gICAgICAgIHB1YmxpYyBvYmplY3RzOlQuT2JqZWN0cy5PYmplY3RbXTtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdHM6VC5PYmplY3RzLk9iamVjdFtdID0gW10pIHtcblxuICAgICAgICAgICAgLy9yKG9iamVjdHMpO1xuICAgICAgICAgICAgLy9yKG9iamVjdHMubGVuZ3RoKTtcblxuICAgICAgICAgICAgZm9yKHZhciBpPTAsbD1vYmplY3RzLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgICAgIC8vcihpKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2ldID0gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdHNbaV0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub2JqZWN0cyA9IG9iamVjdHM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWxsKCk6VC5PYmplY3RzLk9iamVjdFtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZpbHRlcihjYWxsYmFjayk6VC5PYmplY3RzLkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIC8vcihmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMpO1xuXG4gICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuZmlsdGVyKGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQdXNoIG5ldyBvYmplY3QgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHB1c2gob2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLnB1c2goVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlIG9yIHB1c2ggb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGUob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0QnlJZChvYmplY3QuaWQsIG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QnlJZChpZCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ2dldEJ5SWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKXJldHVybiB0aGlzLm9iamVjdHNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzZXRCeUlkKGlkLCBvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdzZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXSA9IFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcigncmVtb3ZlSWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclR5cGVzKC4uLnR5cGVzKSB7XG5cblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihvYmplY3QudHlwZSkgPT0gLTEpcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUmFkaXVzKGNlbnRlciwgcmFkaXVzKSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGNlbnRlcikgPD0gcmFkaXVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXJBcmVhKGFyZWE6QXJlYSkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChhcmVhLmlzQ29udGFpbmluZyhvYmplY3QuZ2V0UG9zaXRpb24oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKSB7Ly90b2RvIG1heWJlIHJlZmFjdG9yIHRvIGdldFRlcnJhaW5Db2RlczJEQXJyYXkgb3IgZ2V0VGVycmFpbkNvZGVzTWFwXG5cbiAgICAgICAgICAgIC8qdmFyIHJhZGl1cyA9IHNpemUvMjtcbiAgICAgICAgICAgICB2YXIgY2VudGVyID17XG4gICAgICAgICAgICAgeDogdG9wbGVmdC54K3JhZGl1cyxcbiAgICAgICAgICAgICB5OiB0b3BsZWZ0LnkrcmFkaXVzXG4gICAgICAgICAgICAgfTsqL1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DcmVhdGUgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIHZhciBtYXBfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKTsvLy5zbGljZSgpLnJldmVyc2UoKTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7Ly90b2RvIGlzIHRoaXMgb3B0aW1hbGl6YXRpb24gZWZmZWN0aXZlP1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB5IDwgcmFkaXVzICogMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA8IHJhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzICsgb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhjID0gb2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHljID0gb2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cztcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldW3hdID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgueHkyZGlzdCh4IC0geGMsIHkgLSB5YykgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiBtYXBfYXJyYXk7XG5cblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgZ2V0TWFwT2ZDb2xsaXNpb25zKGNlbnRlciwgcmFkaXVzKXtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVRlcnJhaW5zXG4gICAgICAgICAgICB2YXIgbWFwX29mX3RlcnJhaW5fY29kZXMgPSB0aGlzLmdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdmFyIG1hcF9vZl9jb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIHZhciB4LHk7XG5cbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihbMSw1LDExXS5pbmRleE9mKG1hcF9vZl90ZXJyYWluX2NvZGVzW3ldW3hdKSE9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3ldW3hdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1PYmplY3RzXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcblxuICAgICAgICAgICAgICAgIGlmKG9iamVjdC50eXBlID09ICdidWlsZGluZycgJiYgb2JqZWN0LnN1YnR5cGUgPT0gJ3dhbGwnKXt9ZWxzZXtyZXR1cm47fVxuXG4gICAgICAgICAgICAgICAgdmFyIHg9TWF0aC5yb3VuZChvYmplY3QueCktTWF0aC5yb3VuZChjZW50ZXIueC0ocmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgdmFyIHk9TWF0aC5yb3VuZChvYmplY3QueSktTWF0aC5yb3VuZChjZW50ZXIueS0ocmFkaXVzKSk7XG5cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCsxLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeC0xLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5KzF9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5LTF9XG5cbiAgICAgICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24ocF8pe1xuICAgICAgICAgICAgICAgICAgICBpZihwXy54Pj0wICYmIHBfLnk+PTAgJiYgcF8ueDxyYWRpdXMqMiAmJiBwXy55PHJhZGl1cyoyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3BfLnldW3BfLnhdPTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICByZXR1cm4obWFwX29mX2NvbGxpc2lvbnMpO1xuXG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldDF4MVRlcnJhaW5PYmplY3RzKCk6VC5PYmplY3RzLkFycmF5IHtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKS5zbGljZSgpLnJldmVyc2UoKTsvL25vcm1hbCBBcnJheVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgYmxvY2tlZF9wb3NpdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3RfMXgxLCBrZXk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCkgKyAneScgKyBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeF90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC54eTJkaXN0KHgsIHkpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEuZGVzaWduLmRhdGEuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueCA9IE1hdGgucm91bmQob2JqZWN0XzF4MS54ICsgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueSA9IE1hdGgucm91bmQob2JqZWN0XzF4MS55ICsgeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgb2JqZWN0XzF4MS54ICsgJ3knICsgb2JqZWN0XzF4MS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIHRlcnJhaW5fb2JqZWN0c18xeDE7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0VGVycmFpbk9uUG9zaXRpb24ocG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5vYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS50eXBlICE9ICd0ZXJyYWluJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5kZXNpZ24uZGF0YS5zaXplIDw9IHBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LCB0aGlzLm9iamVjdHNbaV0ueSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobnVsbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldE5lYXJlc3RUZXJyYWluUG9zaXRpb25XaXRoQ29kZShwb3NpdGlvbiwgdGVycmFpbl9jb2RlKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gdGhpcy5nZXQxeDFUZXJyYWluT2JqZWN0cygpO1xuXG4gICAgICAgICAgICB2YXIgbWluX2Rpc3RhbmNlID0gLTE7XG4gICAgICAgICAgICB2YXIgbmVhcmVzdF90ZXJyYWluXzF4MTogVC5PYmplY3RzLk9iamVjdDtcblxuICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluXzF4MSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShwb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAobWluX2Rpc3RhbmNlID09PSAtMSB8fCBtaW5fZGlzdGFuY2UgPiBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdF90ZXJyYWluXzF4MSA9IHRlcnJhaW5fMXgxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZWFyZXN0X3RlcnJhaW5fMXgxKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qXG5cbiAgICAgICAgIGdldE1hcE9mQ29sbGlzaW9uQ29kZXMocmVhbF9vYmplY3RzLHBvc2l0aW9uKXtcbiAgICAgICAgIHJldHVybiBUZXJyYWluO1xuICAgICAgICAgfTtcblxuICAgICAgICAgKi9cblxuXG4gICAgfVxuXG59XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuT2JqZWN0XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIE9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGlkOnN0cmluZztcbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG4gICAgICAgIHB1YmxpYyB0eXBlOnN0cmluZztcbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc19rZXkgPT0gJ19pZCcpdGhpc19rZXkgPSAnaWQnOy8vdG9kbyBtYXliZSBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGluaXQob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmKG9iamVjdCBpbnN0YW5jZW9mIFQuT2JqZWN0cy5PYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT0gJ2J1aWxkaW5nJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5CdWlsZGluZyhvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICd0ZXJyYWluJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3N0b3J5Jykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5TdG9yeShvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICduYXR1cmFsJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5OYXR1cmFsKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBwdXQgaXRlbSBpbnRvIFRvd25zIE9iamVjdHMgQXJyYXkgYmVjYXVzZSBvZiB1bnJlY29nbml6ZWQgb2JqZWN0IHR5cGUgJyArIG9iamVjdC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKTpQb3NpdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gKCdbJyArIHRoaXMubmFtZSArICddJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5CdWlsZGluZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBpbnRlcmZhY2UgRGVzaWduT2JqZWN0e1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIGRhdGE6IFQuTW9kZWw7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgQnVpbGRpbmcgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuXG4gICAgICAgIHB1YmxpYyBkZXNpZ246RGVzaWduT2JqZWN0O1xuICAgICAgICBwdWJsaWMgYWN0aW9uczpULkdhbWUuQWN0aW9uW107XG4gICAgICAgIHB1YmxpYyBwYXRoOiBQYXRoO1xuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgICAgICBzdXBlcihvYmplY3QpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uc19jbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc19jbGFzc2VzLnB1c2goVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHRoaXMuYWN0aW9uc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zX2NsYXNzZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByKHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gbmV3IFQuUGF0aCguLi50aGlzLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHZhciBsaWZlX2FjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCdsaWZlJyk7XG4gICAgICAgICAgICB2YXIgbWF4X2xpZmUgPSBULldvcmxkLmdhbWUuZ2V0T2JqZWN0TWF4TGlmZSh0aGlzKTtcblxuXG4gICAgICAgICAgICBpZiAobGlmZV9hY3Rpb24gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uID0gVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpZmUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IG1heF9saWZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4X2xpZmU6IG1heF9saWZlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChsaWZlX2FjdGlvbik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbi5wYXJhbXMubWF4X2xpZmUgPSBtYXhfbGlmZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oZGF0ZT8pIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguY291bnRQb3NpdGlvbihkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZyhkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguaW5Qcm9ncmVzcyhkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuQnVpbGRpbmcoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk1vZGVsfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9kZWwoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmRlc2lnbi5kYXRhIGluc3RhbmNlb2YgVC5Nb2RlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lnbi5kYXRhID0gbmV3IFQuTW9kZWwodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYWN0aW9uX3R5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuR2FtZS5BY3Rpb25BYmlsaXR5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QWN0aW9uKGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uc1tpXS50eXBlID09IGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFjdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY3JlYXRlSHRtbFByb2ZpbGUoKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25zX3Byb2ZpbGUgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNfcHJvZmlsZSArPSB0aGlzLmFjdGlvbnNbaV0uY3JlYXRlSHRtbFByb2ZpbGUoKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGBcblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdC1idWlsZGluZy1wcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICA8aDI+YCArIHRoaXMubmFtZSArIGA8L2gyPlxuICAgICAgICAgICAgICAgIGAgKyB0aGlzLmdldFBvc2l0aW9uKCkgKyBgXG5cblxuICAgICAgICAgICAgICAgIGAgKyBhY3Rpb25zX3Byb2ZpbGUgKyBgXG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICBgKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk5hdHVyYWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBpbnRlcmZhY2UgSW1hZ2VPYmplY3R7XG4gICAgICAgIGltYWdlOiBhbnk7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIERlc2lnbk9iamVjdHtcbiAgICAgICAgdHlwZTogc3RyaW5nO1xuICAgICAgICBkYXRhOiBJbWFnZU9iamVjdDtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBOYXR1cmFsIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cblxuICAgICAgICBwdWJsaWMgZGVzaWduOkRlc2lnbk9iamVjdDtcblxuXG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuTmF0dXJhbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5IGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGNvbnRlbnQ7XG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuU3RvcnkoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE1hcmtkb3duKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNvbnRlbnQuZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBUZXJyYWluIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcblxuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5UZXJyYWluKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUocHJlZmVyZWRfd2lkdGgpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2xvcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmNvbG9yKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gZ2V0SW1hZ2UoKXt9XG5cblxuICAgIH1cblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuQ29sb3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuICAgIC8qKlxuICAgICAqIE9iamVjdCB3aGljaCByZXByZXNlbnRzIFJHQkEgY29sb3IuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIENvbG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHIgcmVkIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGcgZ3JlZW4gZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gYiBibHVlIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGEgYWxwaGEgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlcixwdWJsaWMgZzogbnVtYmVyLHB1YmxpYyBiOiBudW1iZXIscHVibGljIGEgPSAyNTUpIHtcbiAgICAgICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgICAgICB0aGlzLmcgPSBnO1xuICAgICAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGRlZXAgY2xvbmUgb2QgVC5Db2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn1cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCk6Q29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucix0aGlzLmcsdGhpcy5iLHRoaXMuYSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZHMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgICAgIHRoaXMuYSA9IE1hdGgucm91bmQodGhpcy5hKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNzcyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDc3NDb2xvcigpIHtcblxuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmEgPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3IoJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hLzI1NSoxMDApLzEwMCArICcpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3IgKGlnbm9yZXMgYWxwaGEgY2hhbmVsLilcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuICMwMGZmMDBcbiAgICAgICAgICovXG4gICAgICAgIGdldEhleCgpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gJyMnICsgKCgxIDw8IDI0KSArICh0aGlzLnIgPDwgMTYpICsgKHRoaXMuZyA8PCA4KSArIHRoaXMuYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBuZXcgVC5Db2xvciBmb3JtIGhleCBjb2RlIG9mIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXggY29kZSBvZiBjb2xvciBlZy4gIzAwZmYwMFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjcmVhdGVGcm9tSGV4KGhleDogc3RyaW5nKTogQ29sb3Ige1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0OkNvbG9yICwgc2hvcnRoYW5kUmVnZXg6IFJlZ0V4cCwgcmVzdWx0UmVnZXg6IFJlZ0V4cEV4ZWNBcnJheTtcblxuICAgICAgICAgICAgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0UmVnZXggPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRSZWdleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzJdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzNdLCAxNilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY3JlYXRpbmcgVC5Db2xvciBmcm9tICcgKyBoZXgpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5QYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVHtcblxuICAgIGV4cG9ydCBjbGFzcyBQYXRoIHtcblxuICAgICAgICBwdWJsaWMgYXJyYXlfcG9zaXRpb25fZGF0ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHsuLi5ULlBvc2l0aW9uRGF0ZX0gUG9zaXRpb24gd2l0aCBkYXRlIGF0IGxlYXN0IDJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblxuXG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL2lmKGFyZ3MubGVuZ3RoPT09MSAmJiBhcmdzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy8gICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJnc1swXTtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBsYXN0X2RhdGUgPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggbXVzdCBiZSBULlBvc2l0aW9uRGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsYXN0X2RhdGUgPj0gcG9zaXRpb25fZGF0ZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZXMgc2hvdWxkIGJlIGNvbnNlY3V0aXZlIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCAoJyArIHBvc2l0aW9uX2RhdGUuZGF0ZSArICcgc2hvdWxkIGJlIGFmdGVyICcgKyBsYXN0X2RhdGUgKyAnKS4gJyArIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSA9IHBvc2l0aW9uX2RhdGUuZGF0ZS8xO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5LjxULlBvc2l0aW9uPn0gYXJyYXlfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5QYXRofVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIG5ld0NvbnN0YW50U3BlZWQoYXJyYXlfcG9zaXRpb246IEFycmF5LCBzcGVlZDogbnVtYmVyLCBkYXRlOiBudW1iZXIgfCBEYXRlID0gMCk6IFBhdGgge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmFOKHNwZWVkIC8gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgdmFsaWQgbnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwZWVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgcG9zaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhcnJheV9wb3NpdGlvbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycmF5X3Bvc2l0aW9uX2RhdGUgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFQuUG9zaXRpb25EYXRlKGFycmF5X3Bvc2l0aW9uWzBdLngsIGFycmF5X3Bvc2l0aW9uWzBdLnksIGRhdGUpXG4gICAgICAgICAgICBdO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXN0X3Bvc2l0aW9uID0gYXJyYXlfcG9zaXRpb25bMF07XG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlOiBQb3NpdGlvbkRhdGUsIGRpc3RhbmNlOiBudW1iZXI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMSwgbCA9IGFycmF5X3Bvc2l0aW9uLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IGFycmF5X3Bvc2l0aW9uW2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBQYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoIHZpYSBuZXdDb25zdGFudFNwZWVkIG11c3QgYmUgVC5Qb3NpdGlvbicpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBsYXN0X3Bvc2l0aW9uLmdldERpc3RhbmNlKHBvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIC8gMSArIGRpc3RhbmNlIC8gc3BlZWQgKiAxMDAwKTtcblxuXG4gICAgICAgICAgICAgICAgbGFzdF9wb3NpdGlvbiA9IHBvc2l0aW9uX2RhdGU7XG5cblxuICAgICAgICAgICAgICAgIGFycmF5X3Bvc2l0aW9uX2RhdGUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUG9zaXRpb25EYXRlKGFycmF5X3Bvc2l0aW9uW2ldLngsIGFycmF5X3Bvc2l0aW9uW2ldLnksIGRhdGUpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vcmV0dXJuIG5ldyB0aGlzLmFwcGx5KHRoaXMsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICAvL3JldHVybiBPYmplY3QuY3JlYXRlKFQuUGF0aCxhcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5QYXRoKC4uLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb25zKCkge1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2godGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybihwb3NpdGlvbnMpO1xuICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnQgaW4gd2hpY2ggc2VnbWVudCBpcyBULlBhdGggcHJvZ3Jlc3NcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50U2VnbWVudChkYXRlOiBudW1iZXIgfCBEYXRlKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgICAgICB2YXIgQTogUG9zaXRpb25EYXRlLCBCOlBvc2l0aW9uRGF0ZSwgeDogbnVtYmVyLCB5OiBudW1iZXI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5kYXRlIC8gMTtcbiAgICAgICAgICAgICAgICBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2kgKyAxXS5kYXRlIC8gMTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSsnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEEgPD0gZGF0ZSAmJiBCID4gZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzwtLS10aGlzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoaSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY291bnRpbmcgc2VnbWVudCBpbiBULlBhdGgsIG1heWJlIGJlY2F1c2Ugb2YgcGFyYW0gZGF0ZSBpcyAnICsgZGF0ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyBwb3NpdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgY291bnRQb3NpdGlvbihkYXRlOiBudW1iZXIgfCBEYXRlID0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkpO1xuXG4gICAgICAgICAgICB2YXIgeCA9IFQuVE1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueCwgQi54KTtcbiAgICAgICAgICAgIHZhciB5ID0gVC5UTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS55LCBCLnkpO1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHgsIHkpKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcm90YXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICovXG4gICAgICAgIGNvdW50Um90YXRpb24oZGF0ZTogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIEJBID0gQi5nZXRQb3NpdGlvbigpLnBsdXMoQS5nZXRQb3NpdGlvbigpLm11bHRpcGx5KC0xKSk7XG5cbiAgICAgICAgICAgIHZhciBwb2xhciA9IEJBLmdldFBvc2l0aW9uUG9sYXIoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvbGFyLmdldERlZ3JlZXMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgU3BlZWQgYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGZpZWxkcy9zXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNwZWVkKGRhdGU6IG51bWJlciB8IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcyhkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gQS5nZXREaXN0YW5jZShCKTtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IEIuZGF0ZSAtIEEuZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSAvIChkdXJhdGlvbiAvIDEwMDApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcGF0aCBpbiBwcm9ncmVzcyAodHJ1ZSkgb3IgaXQgaGFzIG5vdCBzdGFydGVkKGZhbHNlKSBvciBpdCBpcyBmaW5pc2hlZChmYWxzZSk/XG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGluUHJvZ3Jlc3MoZGF0ZTogbnVtYmVyIHwgRGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBtYXliZSBjb3VudFByb2dyZXNzXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uM0RPYmplY3Qge1xuICAgICAgICB4Om51bWJlcjtcbiAgICAgICAgeTpudW1iZXI7XG4gICAgICAgIHo6bnVtYmVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbjNEIHtcblxuICAgICAgICBwdWJsaWMgeDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgejogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0OiBudW1iZXIgfCBQb3NpdGlvbjNET2JqZWN0LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGxldCB4Om51bWJlcjtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4X29yX29iamVjdCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geF9vcl9vYmplY3QueTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB4X29yX29iamVjdC56O1xuXG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdudW1iZXInKXtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0gejtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbjNEKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24zRCB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJywnICsgdGhpcy56ICsgJ10nO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUG9zaXRpb25Qb2xhclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uUG9sYXIge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyLHB1YmxpYyBkZWdyZWVzOiBudW1iZXIpIHtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uUG9sYXIodGhpcy5kaXN0YW5jZSx0aGlzLmRlZ3JlZXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSB0aGlzLmdldFJhZGlhbnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbihcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4ocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlXG4gICAgICAgICAgICApKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREZWdyZWVzKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVncmVlcyArIDM2MCkgJSAzNjA7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UmFkaWFucygpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGguZGVnMnJhZCh0aGlzLmRlZ3JlZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLmRpc3RhbmNlICsgJywnICsgdGhpcy5kZWdyZWVzICsgJ8KwJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUG9zaXRpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uIHtcbiAgICAgICAgeDpudW1iZXI7XG4gICAgICAgIHk6bnVtYmVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XG5cbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeF9vcl9vYmplY3Rfb3Jfc3RyaW5nOiBudW1iZXIgfCBQb3NpdGlvbiB8IHN0cmluZywgeT86IG51bWJlcikge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3Rfb3Jfc3RyaW5nID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLnk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgaWYodHlwZW9mIHhfb3Jfb2JqZWN0X29yX3N0cmluZyA9PT0gJ3N0cmluZycpe1xuXG4gICAgICAgICAgICAgICAgaWYgKC9eWystXT9cXGQrKFxcLlxcZCspPyxbKy1dP1xcZCsoXFwuXFxkKyk/JC8udGVzdCh4X29yX29iamVjdF9vcl9zdHJpbmcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHhfeTpBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgeF95ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHBhcnNlRmxvYXQoeF95WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdCh4X3lbMV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNyZWF0aW5nIFBvc2l0aW9uLCBzdHJpbmcgbXVzdCBiZSBpbiBmb3JtYXQgeCx5IG5vdCAnK3hfb3Jfb2JqZWN0X29yX3N0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB4X29yX29iamVjdF9vcl9zdHJpbmcgPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdF9vcl9zdHJpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjb25zdHJ1Y3RvciBwYXJhbXMgd2hpbGUgY3JlYXRpbmcgVC5Qb3NpdGlvbiEnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBsdXMocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgdGhpcy55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIG1pbnVzKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggLT0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSAtPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbXVsdGlwbHkoazogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCAqIGs7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgKiBrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Rmxvb3JlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbihNYXRoLmZsb29yKCB0aGlzLngpLE1hdGguZmxvb3IoIHRoaXMueSkpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFBvc2l0aW9uUG9sYXIoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb25Qb2xhcihcbiAgICAgICAgICAgICAgICBULlRNYXRoLnh5MmRpc3QodGhpcy54LCB0aGlzLnkpLFxuICAgICAgICAgICAgICAgIFQuVE1hdGgucmFkMmRlZyhNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KSlcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICByZXR1cm4gVC5UTWF0aC54eTJkaXN0KHBvc2l0aW9uLnggLSB0aGlzLngsIHBvc2l0aW9uLnkgLSB0aGlzLnkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uRGF0ZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFBvc2l0aW9uRGF0ZU9iamVjdCB7XG4gICAgICAgIHg6bnVtYmVyO1xuICAgICAgICB5Om51bWJlcjtcbiAgICAgICAgZGF0ZTpEYXRlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25EYXRlIGV4dGVuZHMgVC5Qb3NpdGlvbiB7Ly90b2RvIGlzIHRoYXJlIHNvbHV0aW9uIHdpdGhvdXQgdXNpbmcgVC4/XG5cbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG4gICAgICAgIHB1YmxpYyBkYXRlOkRhdGU7XG5cblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0OiBudW1iZXIgfCBQb3NpdGlvbkRhdGVPYmplY3QsIHk/OiBudW1iZXIsIGRhdGU/OiBudW1iZXIgfCBEYXRlID0gMCkge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAvL3ZhciBwb3NpdGlvbkRhdGVPYmplY3Q6UG9zaXRpb25EYXRlT2JqZWN0O1xuICAgICAgICAgICAgICAgIC8vcG9zaXRpb25EYXRlT2JqZWN0ID0geDtcblxuICAgICAgICAgICAgICAgIHggPSB4X29yX29iamVjdC54O1xuICAgICAgICAgICAgICAgIHkgPSB4X29yX29iamVjdC55O1xuICAgICAgICAgICAgICAgIGRhdGUgPSB4X29yX29iamVjdC5kYXRlO1xuXG5cbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgeCA9IHhfb3Jfb2JqZWN0O1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3VwZXIoeCwgeSk7XG5cblxuICAgICAgICAgICAgdmFyIGRhdGVPYmplY3Q6IERhdGU7XG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBuZXcgRGF0ZShkYXRlLzEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gbmV3IERhdGUoZGF0ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBkYXRlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChpc05hTihkYXRlT2JqZWN0IC8gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvIGNvbnN0cnVjdCBQb3NpdGlvbkRhdGUgaXMgbmVlZGVkIHZhbGlkIERhdGUgbm90ICcgKyBkYXRlICsgJy4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBkYXRlT2JqZWN0O1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbkRhdGUodGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gb25seSBwb3NpdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnWycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnXSBhdCAnICtcbiAgICAgICAgICAgICAgICAodGhpcy5kYXRlLmdldERheSgpICsgMSkgKyAnLicgKyAodGhpcy5kYXRlLmdldE1vbnRoKCkgKyAxKSArICcuJyArIHRoaXMuZGF0ZS5nZXRGdWxsWWVhcigpICtcbiAgICAgICAgICAgICAgICAnICcgKyB0aGlzLmRhdGUuZ2V0SG91cnMoKSArICc6JyArIHRoaXMuZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuXG5cblxuXG4iLCJcbm1vZHVsZSBUIHtcbiAgICBleHBvcnQgY2xhc3MgQXJlYSB7XG5cbiAgICAgICAgcHVibGljIHBvc2l0aW9uczogQXJyYXk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4ucG9zaXRpb25zOlQuUG9zaXRpb25bXSkge1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb25zLmxlbmd0aDwzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBhdCBsZWFzdCAzIHBvaW50cy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGMgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzFdKTtcbiAgICAgICAgICAgIHZhciBhID0gcG9zaXRpb25zWzFdLmdldERpc3RhbmNlKHBvc2l0aW9uc1syXSk7XG4gICAgICAgICAgICB2YXIgYiA9IHBvc2l0aW9uc1swXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuXG4gICAgICAgICAgICAvL3IoYSxiLGMpO1xuXG4gICAgICAgICAgICBpZihhK2I+YyAmJiBiK2M+YSAmJiBhK2M+Yil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCB0aHJlZSBwb2ludHMgYXJlIGluIGxpbmUuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBpc0NvbnRhaW5pbmcocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyB3b3JraW5nIG9ubHkgZm9yIGNvbnZleCBhcmVhc1xuXG4gICAgICAgICAgICB2YXIgdGVzdHNpZGU6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGliOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbjogYm9vbGVhbixcbiAgICAgICAgICAgICAgICBjb2xsaXNpb246IGJvb2xlYW47XG4gICAgICAgICAgICBmb3IodGVzdHNpZGU9MDt0ZXN0c2lkZTwyO3Rlc3RzaWRlKyspIHtcblxuXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj1mYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWEgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpYiA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWIgPT0gdGhpcy5wb3NpdGlvbnMubGVuZ3RoKWliID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBULlRNYXRoLmxpbmVDb2xsaXNpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29sbGlzaW9uPT10cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8qcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICsgKHRlc3RzaWRlLTAuNSkqMTAwMDAwMDAwMC8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgICk7Ki9cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKCFzaWRlY29sbGlzaW9uKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBSZXNvdXJjZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBSZXNvdXJjZXMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocmVzb3VyY2VzPzpPYmplY3QgPXt9KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc291cmNlc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbChyZXNvdXJjZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlQuUmVzb3VyY2VzIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzb3VyY2VzKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjb250YWlucyBhIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IGNvbnRhaW5zXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWlucyhyZXNvdXJjZXM6VC5SZXNvdXJjZXMpOmJvb2xlYW4ge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA8IHJlc291cmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgICAgICogQHJldHVybiB7Ym9vbH0gc3VjY2Vzc1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkKHJlc291cmNlczpULlJlc291cmNlcyk6VC5SZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSArPSByZXNvdXJjZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbXVsdGlwbHkoazpudW1iZXIpOlQuUmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBNYXRoLmNlaWwodGhpc1trZXldICogayk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgc2lnbnVtKGs6c3RyaW5nKTpULlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgYXBwbHkobW9kaWZpZXI6RnVuY3Rpb24pOlQuUmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBtb2RpZmllcih0aGlzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGFsbCByZXNvdXJjZXMga2V5c1xuICAgICAgICAgKi9cbiAgICAgICAgZXh0cmFjdEtleXMoKTpzdHJpbmdbXSB7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChrZXlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmVzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gRGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCBnaXZlbiBSZXNvdXJjZXNcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBhcmUocmVzb3VyZXM6VC5SZXNvdXJjZXMpOm51bWJlciB7XG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VzX0IgPSByZXNvdXJlcztcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19BLmV4dHJhY3RLZXlzKCkpO1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19CLmV4dHJhY3RLZXlzKCkpO1xuXG5cbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gMDtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBrZXlzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWxfQSA9IHJlc291cmNlc19BW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHZhbF9CID0gcmVzb3VyY2VzX0Jba2V5XTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQSA9PSAndW5kZWZpbmVkJyl2YWxfQSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQiA9PSAndW5kZWZpbmVkJyl2YWxfQiA9IDA7XG5cbiAgICAgICAgICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnBvdyh2YWxfQSAtIHZhbF9CLCAyKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmUocmVzb3VyY2VzOlQuUmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0hUTUwoKTpzdHJpbmcgey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmdzX2pvaW5lZCA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICAgICAgc3RyaW5nc19qb2luZWQgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzX2pvaW5lZCArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nc19qb2luZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuVE1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb24ge1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb25Qb2xhciB7XG4gICAgICAgIGRpc3Q6IG51bWJlcjtcbiAgICAgICAgZGVnOiBudW1iZXI7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVE1hdGgge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYmFzZUxvZyhiYXNlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyOiBudW1iZXIsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgICAgIHZhciBkaWdpdHMgPSBNYXRoLmNlaWwoVE1hdGguYmFzZUxvZygxMCwgbnVtYmVyKSk7XG4gICAgICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIC0gZGlnaXRzKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyICogaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciAvIGs7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMTogbnVtYmVyLCBkZWcyOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMikgJSAzNjA7XG4gICAgICAgICAgICBpZiAoZGVnID4gMTgwKWRlZyA9IDM2MCAtIGRlZztcbiAgICAgICAgICAgIHJldHVybiAoZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJhZDJkZWcocmFkaWFuczpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSkpICUgMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVncmVlcyAlIDM2MCAqIChNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geFxuICAgICAgICAgKiBAcGFyYW0geVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgeHkyZGlzdCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIHh5MmRpc3REZWcoeDpudW1iZXIsIHk6bnVtYmVyKTpwb3NpdGlvblBvbGFyIHtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICBkaXN0OiBULlRNYXRoLnh5MmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgICAgZGVnOiAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIoeSwgeCkpXG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3Q6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cbiAgICAgICAgICAgIHZhciByYWQgPSBULlRNYXRoLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgICAgIHN0YXRpYyB4eVJvdGF0ZSh4OiBudW1iZXIsIHk6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3QgPSBULlRNYXRoLnh5MmRpc3QoeCwgeSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LCB4KTtcblxuICAgICAgICAgICAgcmFkICs9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG5cbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5jb3MocmFkKSAqIGRpc3QsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5zaW4ocmFkKSAqIGRpc3RcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZDpudW1iZXIsIHBvc2l0aW9uOnBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCAqIHBvc2l0aW9uLnkpIC0gc2VlZCwgMikpICsgMSkgLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0ludCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRlZnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJvdW5kcyh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbilyZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KXJldHVybiBtYXg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpc09uTGluZShhMXg6bnVtYmVyLCBhMXk6bnVtYmVyLCBhMng6bnVtYmVyLCBhMnk6bnVtYmVyLCBiMXg6bnVtYmVyLCBiMXk6bnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgIGEyeCAtPSBhMXg7XG4gICAgICAgICAgICBhMnkgLT0gYTF5O1xuXG4gICAgICAgICAgICBiMXggLT0gYTF4O1xuICAgICAgICAgICAgYjF5IC09IGExeTtcblxuXG4gICAgICAgICAgICB2YXIgYVNsb3BlID0gYTJ5IC8gYTJ4O1xuICAgICAgICAgICAgdmFyIGJTbG9wZSA9IGIxeSAvIGIxeDtcblxuXG4gICAgICAgICAgICBpZiAoYVNsb3BlICE9IGJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICAgICAgdmFyIGFEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGEyeSwgYTJ4KTtcbiAgICAgICAgICAgIHZhciBiRGlzdCA9IFQuVE1hdGgueHkyZGlzdChiMXksIGIxeCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoYURpc3QgPj0gYkRpc3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIsIGIyeDpudW1iZXIsIGIyeTpudW1iZXIpOiBib29sZWFuIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYk9uQSA9IFQuVE1hdGguaXNPbkxpbmUoYTF4LCBhMXksIGEyeCwgYTJ5LCBiMXgsIGIxeSk7XG4gICAgICAgICAgICAgICAgdmFyIGFPbkIgPSBULlRNYXRoLmlzT25MaW5lKGIxeCwgYjF5LCBiMngsIGIyeSwgYTF4LCBhMXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9ICgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcjpGdW5jdGlvbiwgYmx1cjpudW1iZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHZhciB4eCwgeXk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSkgKyAnJyArIHNpemVzW2ldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQ6bnVtYmVyLCBhX3Bvc2l0aW9uOm51bWJlciwgYV9lbmQ6bnVtYmVyLCBiX3N0YXJ0Om51bWJlciwgYl9lbmQ6bnVtYmVyKTpudW1iZXIge1xuXG5cbiAgICAgICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQgLSBhX3N0YXJ0O1xuICAgICAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZCAtIGJfc3RhcnQ7XG5cbiAgICAgICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZCAtIGFfcG9zaXRpb247XG4gICAgICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUgKiBhX3BhcnQpIC8gYV93aG9sZTtcblxuICAgICAgICAgICAgcmV0dXJuIChiX2VuZCAtIGJfcGFydCk7XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XG4gICAgICAgIHVzZXJuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgbmFtZTogJ3N0cmluZyc7XG4gICAgICAgIHN1cm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBlbWFpbDogJ3N0cmluZyc7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XG5cblxuICAgICAgICBwcm9maWxlOiBVc2VyUHJvZmlsZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodXNlcjogVXNlcikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXNlcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmF0dXJlSFRNTCgpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSArICcgJyArIHRoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gICsgbmFtZSArIGA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArIHRoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkgKyBgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNpZ25hdHVyZV9odG1sKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUgVC5Xb3JsZHtcblxuXG4gICAgZXhwb3J0IHZhciB0ZXJyYWlucyA9IFtcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbiAgICBdO1xuXG5cbn1cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuV29ybGR7XG5cbiAgICBleHBvcnQgdmFyIG1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgICAgICBULlRNYXRoLmJsdXJYWShmdW5jdGlvbih4OiBudW1iZXIseTogbnVtYmVyKXtcblxuICAgICAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAgICAgLy90b2RvLy9pZih0eXBlb2Ygel9tYXBfY2FjaGVba2V5XSE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICAgICAgY29uc3QgZGl2PTEwMDtcblxuXG4gICAgICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgICAgICB2YXIgX3g6IG51bWJlcixfeTogbnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgICAgICB2YXIga189MS1rO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICAgICAgbWF4X3Bvc3NpYmxlX24rPWRpdjtcblxuICAgICAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgICAgICAvL3ZhciB4eSA9IFQuVE1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgICAgICAvL3k9eHkueTtcblxuICAgICAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICAgICAgeD1NYXRoLmZsb29yKF94LzQpO1xuICAgICAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIG49bi9tYXhfcG9zc2libGVfbjtcblxuICAgICAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAgICAgLy90b2RvLy96X21hcF9jYWNoZVtrZXldPW47XG4gICAgICAgICAgICByZXR1cm4obik7XG5cbiAgICAgICAgfSwyKVxuICAgICAgICAsXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICAsXG5cbiAgICAgICAgbmV3IFQuTWFwR2VuZXJhdG9yLkJpb3RvcGUoW1xuXG4gICAgICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzExXX0sLy/FmWVrYVxuICAgICAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOV19LC8vdHLDoXZhIHRveGljXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxM119LC8vdHLDoXZhIHBvemltXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiAgIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDddfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICAgICAgXSksXG5cblxuICAgICAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgICAgIC8qaWYob2JqZWN0LmdldENvZGUoKT09NSl7XG4gICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigxLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo2KSU2KydkYXJrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgc2l6ZTogMC41K1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgIH1lbHNlKi9cbiAgICAgICAgICAgIGlmKG9iamVjdC5nZXRDb2RlKCk9PTEwKXtcblxuICAgICAgICAgICAgICAgIGlmKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDMse3g6b2JqZWN0LngseTpvYmplY3QueX0pPjAuOTUpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J3RyZWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMytULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjM2MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICApO1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBleHBvcnQgdmFyIGdhbWUgPSBuZXcgVC5HYW1lKFxuICAgICAgICBULlRNYXRoLnByZXR0eU51bWJlcixcbiAgICAgICAgVC5UTWF0aC5wcmV0dHlOdW1iZXJcbiAgICApO1xuXG59IiwiXG5tb2R1bGUgVC5Xb3JsZCB7XG5cblxuICAgIGludGVyZmFjZSBBY3Rpb25BdHRhY2tQYXJhbXNPYmplY3R7XG4gICAgICAgIGRpc3RhbmNlOiBudW1iZXI7XG4gICAgICAgIHN0cmVuZ3RoOiBudW1iZXI7XG4gICAgICAgIHJvdW5kczogbnVtYmVyO1xuICAgICAgICBjb29sZG93bjogbnVtYmVyO1xuICAgIH1cblxuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgICAgICAgc3RyZW5ndGg6IDAsXG4gICAgICAgICAgICByb3VuZHM6IDEsXG4gICAgICAgICAgICBjb29sZG93bjogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb25BY3RpdmUge1xuXG4gICAgICAgICAgICBwdWJsaWMgcGFyYW1zOkFjdGlvbkF0dGFja1BhcmFtc09iamVjdDtcblxuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ2F0dGFjaycpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLCAyKSAqIHRoaXMucGFyYW1zLnN0cmVuZ3RoICogdGhpcy5wYXJhbXMucm91bmRzICogKDEgLyB0aGlzLnBhcmFtcy5jb29sZG93bikpICogMTAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgYXR0YWNrZXIsIGF0dGFja2VkLCByZXNvdXJjZXNfYXR0YWNrZXIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9saWZlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLU1pc3NpbmcgYWN0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXJfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjayA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnYXR0YWNrJykucGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IGF0dGFja2VyX2F0dGFjay5kaXN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcgKyBkaXN0YW5jZSArICcgZmllbGRzLiBBdHRhY2sgZGlzdGFuY2UgaXMgb25seSAnICsgYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlICsgJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29vbGRvd25cbiAgICAgICAgICAgICAgICBpZiAoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJyArIGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZEluKCkgKyAnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURlZmVuY2VcblxuICAgICAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIC09XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIDwgMClhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggPSAwO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggLT1cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggPCAwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgICAgIC8vYXR0YWNrZWRfbGlmZS5saWZlPTEwMDA7XG5cblxuICAgICAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgIChhdHRhY2tlcl9saWZlLmxpZmUgPiAxICYmIGF0dGFja2VkX2xpZmUubGlmZSA+IDEpXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHIoJ3JvdW5kJywgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLCBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByKCdsaWZlJywgYXR0YWNrZWRfbGlmZS5saWZlLCBhdHRhY2tlcl9saWZlLmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZSAtPSBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZSAtPSBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9saWZlLmxpZmUgPCAxKWF0dGFja2VyX2xpZmUubGlmZSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2xpZmUubGlmZSA8IDEpYXR0YWNrZWRfbGlmZS5saWZlID0gMTtcblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIGludGVyZmFjZSBBY3Rpb25EZWZlbmNlUGFyYW1zT2JqZWN0e1xuICAgICAgICBkZWZlbmNlOiBudW1iZXI7XG4gICAgfVxuXG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmZW5jZTogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG4gICAgICAgICAgICBwdWJsaWMgcGFyYW1zOkFjdGlvbkRlZmVuY2VQYXJhbXNPYmplY3Q7XG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnZGVmZW5jZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMucGFyYW1zLmRlZmVuY2UpICogODAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAxfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIGludGVyZmFjZSBBY3Rpb25MaWZlUGFyYW1zT2JqZWN0e1xuICAgICAgICBsaWZlOiBudW1iZXI7XG4gICAgICAgIG1heF9saWZlOiBudW1iZXI7XG4gICAgfVxuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZmU6IDEsXG4gICAgICAgICAgICBtYXhfbGlmZTogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG4gICAgICAgICAgICBwdWJsaWMgcGFyYW1zOkFjdGlvbkxpZmVQYXJhbXNPYmplY3Q7XG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnbGlmZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtuZXcgVC5SZXNvdXJjZXMoKV0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICk7XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgaW50ZXJmYWNlIEFjdGlvbk1pbmVQYXJhbXNPYmplY3R7XG4gICAgICAgIHdvb2Q6IG51bWJlcjtcbiAgICAgICAgaXJvbjogbnVtYmVyO1xuICAgICAgICBjbGF5OiBudW1iZXI7XG4gICAgICAgIHN0b25lOiBudW1iZXI7XG4gICAgfVxuXG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgd29vZDogMCxcbiAgICAgICAgICAgIGlyb246IDAsXG4gICAgICAgICAgICBjbGF5OiAwLFxuICAgICAgICAgICAgc3RvbmU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuICAgICAgICAgICAgcHVibGljIHBhcmFtczpBY3Rpb25NaW5lUGFyYW1zT2JqZWN0O1xuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ21pbmUnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW1vdW50ID0gdGhpcy5wYXJhbXMud29vZCArIHRoaXMucGFyYW1zLmlyb24gKyB0aGlzLnBhcmFtcy5jbGF5ICsgdGhpcy5wYXJhbXMuc3RvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFtb3VudCAqIDM2MDAgKiAwLjA1O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogNH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBvciBtYXliZSBleGVjdXRlXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBpbnRlcmZhY2UgQWN0aW9uTW92ZVBhcmFtc09iamVjdHtcbiAgICAgICAgc3BlZWQ6IG51bWJlcjtcbiAgICAgICAgY29vbGRvd246IG51bWJlcjtcbiAgICB9XG5cblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgICAgIGNvb2xkb3duOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbkFjdGl2ZSB7XG5cbiAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6QWN0aW9uTW92ZVBhcmFtc09iamVjdDtcblxuICAgICAgICAgICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtb3ZlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsIDIpKSAqIDEwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMX0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgb2JqZWN0LCBkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBhY3Rpb24vL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb24gPSBvYmplY3QuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoID0gVC5QYXRoLm5ld0NvbnN0YW50U3BlZWQoZGVzdGluYXRpb25zLCBhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgICAgIG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKS5ub3dFeGVjdXRlZCgpOy8vdG9kbyBpcyBpdCBuZWVkZWRcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBtYXliZSA/Pz8gdG9kb1xuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIGludGVyZmFjZSBBY3Rpb25SZWdlbmVyYXRlUGFyYW1zT2JqZWN0e1xuICAgICAgICByZWdlbmVyYXRlOiBudW1iZXI7XG4gICAgfVxuXG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgcmVnZW5lcmF0ZTogMTAwLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG4gICAgICAgICAgICBwdWJsaWMgcGFyYW1zOkFjdGlvblJlZ2VuZXJhdGVQYXJhbXNPYmplY3Q7XG5cbiAgICAgICAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgncmVnZW5lcmF0ZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyB0aGlzLnBhcmFtcy5yZWdlbmVyYXRlKSAqIDM2MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogNH0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDJ9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICB9XG4gICAgKTtcblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgaW50ZXJmYWNlIEFjdGlvblJlcGFpclBhcmFtc09iamVjdHtcbiAgICAgICAgcmVwYWlyOiBudW1iZXI7XG4gICAgICAgIGNvb2xkb3duOiBudW1iZXI7XG4gICAgfVxuXG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgcmVwYWlyOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbkFjdGl2ZSB7XG5cbiAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6QWN0aW9uUmVwYWlyUGFyYW1zT2JqZWN0O1xuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3JlcGFpcicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyAodGhpcy5wYXJhbXMucmVwYWlyIC8gMTAwKSkgKiAxMDAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDR9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiA0fSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAgLy90b2RvXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBpbnRlcmZhY2UgQWN0aW9uVGhyb3VnaHB1dFBhcmFtc09iamVjdHtcbiAgICAgICAgdGhyb3VnaHB1dDogbnVtYmVyO1xuICAgIH1cblxuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm91Z2hwdXQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuICAgICAgICAgICAgcHVibGljIHBhcmFtczpBY3Rpb25UaHJvdWdocHV0UGFyYW1zT2JqZWN0O1xuXG4gICAgICAgICAgICBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3Rocm91Z2hwdXQnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChNYXRoLnBvdyh0aGlzLnBhcmFtcy50aHJvdWdocHV0IC8gMTAwLCAyKSkgKiAxMCAqIDAuMDUpOy8vdG9kb1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMX0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
