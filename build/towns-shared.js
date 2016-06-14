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
global.Towns = {};
module.exports = global.Towns;
var T = global.Towns;
var r = console.log.bind(console);
/**
 * Checks existence of namespace. If not exists, this function creates it.
 * @param namespace eg. 'Objects.Array'
 * @returns {boolean}
 */
T.setNamespace = function (namespace) {
    namespace = namespace.split('.');
    var Actual = this;
    var key;
    for (var i = 0, l = namespace.length; i < l; i++) {
        key = namespace[i];
        if (key === 'T')
            throw new Error('Cant set namespace T under T!');
        if (typeof Actual[key] === 'undefined') {
            Actual[key] = {};
            Actual = Actual[key];
        }
        else {
            Actual = Actual[key];
        }
    }
    return (true);
};
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
            return new T.Color(this.r, this.g, this.b, this.a);
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
            var result, shorthandRegex;
            shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return new T.Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
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
                last_date = position_date.date;
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
                date = new Date(date);
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
                date = new Date(date);
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
            var x = T.Math.proportions(A.date / 1, date / 1, B.date / 1, A.x, B.x);
            var y = T.Math.proportions(A.date / 1, date / 1, B.date / 1, A.y, B.y);
            return (new T.Position(x, y));
        };
        /**
         * Counts rotation at 'date'
         * @param date
         * @returns {number} degrees
         */
        Path.prototype.countRotation = function (date) {
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
        function Position3D(x, y, z) {
            if (typeof x == 'object') {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            }
            else {
                this.x = x;
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
            if (typeof distance == 'number' && typeof degrees == 'number') {
                this.distance = distance;
                this.degrees = degrees;
            }
            //todo check
        }
        /**
         * Return deep clone of this.
         * @returns {T.Resources}
         */
        PositionPolar.prototype.clone = function () {
            return new T.PositionPolar(this);
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
            return T.Math.deg2rad(this.degrees);
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
        function Position(x, y) {
            if (typeof x == 'object') {
                this.x = x.x;
                this.y = x.y;
                return;
            }
            else if (/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(x)) {
                x = x.split(',');
                this.x = parseFloat(x[0]);
                this.y = parseFloat(x[1]);
                return;
            }
            else if (typeof x == 'number' && typeof y == 'number') {
                this.x = x;
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
        Position.prototype.multiply = function (k) {
            this.x = this.x * k;
            this.y = this.y * k;
            return this;
        };
        Position.prototype.getFloored = function () {
            return new T.Position(Math.floor(this.x), Math.floor(this.y));
        };
        Position.prototype.getPositionPolar = function () {
            return (new T.PositionPolar(T.Math.xy2dist(this.x, this.y), T.Math.rad2deg(Math.atan2(this.y, this.x))));
        };
        Position.prototype.getDistance = function (position) {
            return T.Math.xy2dist(position.x - this.x, position.y - this.y);
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
        function PositionDate(x, y, date) {
            if (date === void 0) { date = 0; }
            if (typeof x === 'object') {
                y = x.y;
                date = x.date;
                x = x.x;
            }
            _super.call(this, x, y);
            if (date === 0) {
                date = new Date();
            }
            else if (typeof date === 'number' || typeof date === 'string') {
                date = new Date(date);
            }
            if (isNaN(date / 1)) {
                throw new Error('To construct PositionDate is needed valid Date not ' + date + '.');
            }
            this.date = date;
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
                    collision = T.Math.lineCollision(this.positions[ia].x, this.positions[ia].y, this.positions[ib].x, this.positions[ib].y, position.x, position.y, position.x, position.y + (testside - 0.5) * 1000000000 //todo better
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
 * @fileOverview Creates static T.ArrayFunctions
 */
//======================================================================================================================
/**
 * Additional functions to manipulate with array.
 */
T.ArrayFunctions = (function () {
    function class_1() {
    }
    /**
     * @static
     * Searches an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @returns {number} Key of object with this ID, -1 if not exist
     */
    class_1.id2i = function (array, id) {
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
    class_1.id2item = function (array, id, error_message) {
        if (error_message === void 0) { error_message = false; }
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
    class_1.idRemove = function (array, id) {
        for (var i in array) {
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
    class_1.iterate2D = function (array, callback) {
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
    class_1.removeItems = function (array, from, to) {
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
    class_1.filterPath = function (object, path, setValue) {
        if (!is(object)) {
            throw new Error('filterPath: Object is undefined.');
        }
        if (!is(path.forEach)) {
            r(path);
            throw new Error('filterPath: T.Path is not correct array.');
        }
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
    class_1.unique = function (array) {
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
    class_1.array2table = function (array, additional_class) {
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
    class_1.getKeys = function (object) {
        var keys = [];
        for (var k in object)
            keys.push(k);
        return (keys);
    };
    return class_1;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game
 */
//======================================================================================================================
/**
 * Game conditions
 */
T.Game = (function () {
    /**
    *
    * @param {function} max_life_modifier
    * @param {function} price_key_modifier
    * @constructor
    */
    function class_2(max_life_modifier, price_key_modifier) {
        this.action_classes = {};
        this.action_empty_instances = {};
        this.max_life_modifier = max_life_modifier;
        this.price_key_modifier = price_key_modifier;
    }
    /**
     *
     * @param {object} Object
     * @return {array} of numbers
     */
    class_2.prototype.getObjectPriceBases = function (object) {
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
    class_2.prototype.getObjectMaxLife = function (object) {
        var price_bases = this.getObjectPriceBases(object);
        var price_base = price_bases.reduce(function (pv, cv) { return pv + cv; }, 0);
        price_base = this.max_life_modifier(price_base);
        return (price_base);
    };
    /**
     *
     * @param {object} Object
     * @return {array} of Resources
     */
    class_2.prototype.getObjectPrices = function (object) {
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
    class_2.prototype.getObjectPrice = function (object) {
        var price = new T.Resources({});
        //console.log('empty price',price);
        var prices = this.getObjectPrices(object);
        prices.forEach(function (price_) {
            price.add(price_);
        });
        price.apply(this.price_key_modifier);
        return (price);
    };
    class_2.prototype.installActionClass = function (action_empty_instance_params, action_class) {
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
    class_2.prototype.getActionClass = function (action_type) {
        var action_class = this.action_classes[action_type];
        if (typeof action_class == 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type + '. There are only these action types: ' + T.ArrayFunctions.getKeys(this.action_classes).join(', '));
        }
        return (action_class);
    };
    class_2.prototype.newActionInstance = function (action) {
        //todo solve defense vs. defence
        if (action.type === 'defense') {
            action.type = 'defence';
            action.params.defence = action.params.defense;
            delete action.params.defense;
        }
        var action_class = this.getActionClass(action.type);
        return new action_class(action);
    };
    class_2.prototype.createActionExecute = function (action_type) {
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
    class_2.prototype.getActionEmptyInstance = function (action_type) {
        var action_instance = this.action_empty_instances[action_type];
        if (typeof action_instance === 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type);
        }
        return (action_instance);
    };
    return class_2;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
T.Game.Action = (function () {
    function class_3(action) {
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
    class_3.prototype.countPriceBase = function () {
        return (0);
    };
    class_3.prototype.getPriceResources = function () {
        return ([]);
    };
    class_3.execute = function () {
        throw new Error('You can not execute passive action.');
    };
    /**
     * In how many seconds can be this action instance executed?
     * @returns {number}
     */
    class_3.prototype.canBeExecutedIn = function () {
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
    class_3.prototype.canBeExecutedNow = function () {
        return (this.canBeExecutedIn() === 0);
    };
    /**
     * Set actual date as date of execution this action instance
     */
    class_3.prototype.nowExecuted = function () {
        this.last_use = new Date();
    };
    /**
     * Creates html profile of action ability
     * @returns {string}
     */
    class_3.prototype.createHtmlProfile = function () {
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
    return class_3;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator
 */
//======================================================================================================================
T.MapGenerator = (function () {
    /**
     *
     * @param {function} getZ
     * @param {Array} z_normalizing_table
     * @param {T.MapGenerator.Biotope} biotope
     * @param {function} virtualObjectGenerator
     * @constructor
     */
    function class_4(getZ, z_normalizing_table, biotope, virtualObjectGenerator) {
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
    class_4.prototype.getZMapCircle = function (center_integer, radius) {
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
    class_4.prototype.terrainMap = function (map) {
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
    class_4.prototype.getMapArrayCircle = function (center_integer, radius) {
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
    class_4.prototype.convertMapArrayToObjects = function (map_array, center_integer, radius) {
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
    class_4.prototype.getPureMap = function (center, radius, not_center) {
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
    class_4.prototype.getVirtualObjectsFromTerrainObjects = function (objects) {
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
    class_4.prototype.getCompleteObjects = function (real_objects, center, radius, natural_objects, not_center) {
        if (natural_objects === void 0) { natural_objects = true; }
        if (not_center === void 0) { not_center = false; }
        var complete_objects = this.getPureMap(center, radius, not_center);
        real_objects.forEach(function (object) {
            complete_objects.objects.push(object);
        });
        if (natural_objects) {
            var virtual_objects = this.getVirtualObjectsFromTerrainObjects(complete_objects);
            virtual_objects.forEach(function (object) {
                complete_objects.objects.push(object);
            });
        }
        return (complete_objects);
    };
    return class_4;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.MapGenerator.Biotope
 */
//======================================================================================================================
T.MapGenerator.Biotope = (function () {
    /**
     *
     * @param {Array} terrains
     * @constructor
     */
    function class_5(terrains) {
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
    class_5.prototype.getZTerrain = function (z) {
        for (var i = this.terrains.length - 1; i >= 0; i--) {
            if (z >= this.terrains[i].from)
                return (this.terrains[i].terrain);
        }
    };
    return class_5;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates static class T.Math
 */
//======================================================================================================================
/**
 * Mathematical functions to Towns
 */
T.Math = (function () {
    function class_6() {
    }
    /**
     *
     * @static
     * @param {number}
     * @return {number}
     */
    class_6.sign = function (x) {
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
    class_6.baseLog = function (base, number) {
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
    class_6.prettyNumber = function (number, number_of_non_zero_digits) {
        number_of_non_zero_digits = number_of_non_zero_digits || 2; //todo refactor like this
        var digits = Math.ceil(T.Math.baseLog(10, number));
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
    class_6.angleDiff = function (deg1, deg2) {
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
    class_6.rad2deg = function (radians) {
        return (radians * (180 / Math.PI)) % 360;
    };
    //-------------------------
    /**
     * @static
     * @param {number} degrees
     * @return {number} radians
     */
    class_6.deg2rad = function (degrees) {
        return (degrees % 360 * (Math.PI / 180));
    };
    //-------------------------
    /**
     * @static
     * @param x
     * @param y
     * @return {number} distance
     */
    class_6.xy2dist = function (x, y) {
        return (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    };
    //-------------------------
    //todo refactor to position
    class_6.xy2distDeg = function (x, y) {
        var output = {};
        output.dist = this.xy2dist(x, y);
        output.deg = this.rad2deg(Math.atan2(y, x));
        return (output);
    };
    //-------------------------
    //todo refactor to position
    class_6.distDeg2xy = function (dist, deg) {
        var rad = this.deg2rad(deg);
        var output = {};
        output.x = Math.cos(rad) * dist;
        output.y = Math.sin(rad) * dist;
        return (output);
    };
    //-------------------------
    //todo mybe refactor to position
    class_6.xyRotate = function (x, y, deg) {
        //nevyuzivam funkce Towns.A.xy2distDeg a A.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
        var dist = this.xy2dist(x, y);
        var rad = Math.atan2(y, x);
        rad += this.deg2rad(deg);
        var output = {};
        output.x = Math.cos(rad) * dist;
        output.y = Math.sin(rad) * dist;
        return (output);
    };
    //======================================================================================================================
    class_6.randomSeedPosition = function (seed, position) {
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
    class_6.toFloat = function (value, defval) {
        if (typeof defval === 'undefined')
            defval = 0;
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
    class_6.toInt = function (value, defval) {
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
    class_6.bounds = function (value, min, max) {
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
    class_6.isOnLine = function (a1x, a1y, a2x, a2y, b1x, b1y) {
        a2x -= a1x;
        a2y -= a1y;
        b1x -= a1x;
        b1y -= a1y;
        var aSlope = a2y / a2x;
        var bSlope = b1y / b1x;
        if (aSlope != bSlope)
            return false;
        var aDist = this.xy2dist(a2y, a2x);
        var bDist = this.xy2dist(b1y, b1x);
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
    class_6.lineCollision = function (a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
        var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
        var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
        var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
        var collision;
        //console.log(denominator,numerator1,numerator2);
        // Detect coincident lines (has a problem, read below)
        if (denominator === 0) {
            //var collision= (numerator1 == 0 && numerator2 == 0);
            //collision=false;
            var bOnA = this.isOnLine(a1x, a1y, a2x, a2y, b1x, b1y);
            var aOnB = this.isOnLine(b1x, b1y, b2x, b2y, a1x, a1y);
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
    class_6.blurXY = function (generator, blur) {
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
    class_6.bytesToSize = function (bytes) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return '0B';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
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
    class_6.proportions = function (a_start, a_position, a_end, b_start, b_end) {
        var a_whole = a_end - a_start;
        var b_whole = b_end - b_start;
        var a_part = a_end - a_position;
        var b_part = (b_whole * a_part) / a_whole;
        return (b_end - b_part);
    };
    return class_6;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Model
 */
//======================================================================================================================
T.Model = (function () {
    /**
     * @param {object} Model json
     * @return {boolean} false in case of fail
     * @constructor
     */
    function class_7(json) {
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
    class_7.prototype.clone = function () {
        return (new T.Model(JSON.parse(JSON.stringify(this))));
    };
    /**
     * @param {number} rotation
     * @param {number} size
     */
    class_7.prototype.addRotationSize = function (rotation, size) {
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
    class_7.prototype.range = function (dimension) {
        if (dimension == 'xy') {
            return T.Math.xy2dist(this.range('x'), this.range('y') * this.size);
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
    class_7.prototype.moveBy = function (move_x, move_y, move_z) {
        if (typeof move_x === 'undefined')
            move_x = 0;
        if (typeof move_y === 'undefined')
            move_y = 0;
        if (typeof move_z === 'undefined')
            move_z = 0;
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
    class_7.prototype.joinModelZ = function (model, move_x, move_y) {
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
    class_7.prototype.joinModel = function (model, move_x, move_y) {
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
    class_7.prototype.getDeepCopyWithoutLinks = function () {
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
    class_7.prototype.getLinearParticles = function (ignore_root_rotation_size) {
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
                var distDeg = T.Math.xy2distDeg(particle.position.x, particle.position.y);
                distDeg.dist = distDeg.dist * size;
                distDeg.deg += rotation;
                var xy = T.Math.distDeg2xy(distDeg.dist, distDeg.deg);
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
    class_7.prototype.filterPath = function (path) {
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
    class_7.prototype.filterPathSiblings = function (path) {
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
    class_7.prototype.aggregateResourcesVolumes = function () {
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
    class_7.prototype.getHash = function () {
        return 'xxx' + JSON.stringify(this.particles).length; //todo better
    };
    return class_7;
}());
/**
 * @author Towns.cz
 * @fileOverview Creates static class T.Model.Particles
 */
//======================================================================================================================
/**
 * Model Particles
 */
T.Model.Particles = (function () {
    function class_8() {
    }
    /**
     * Add missing params into particle
     * @static
     * @param {object} particle
     * @return {object} particle
     */
    class_8.addMissingParams = function (particle) {
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
    class_8.getTriangles = function (particle, point_class) {
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
                        x__ = 0.5 * x_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + x_ * (level * particle.skew.z.x);
                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + y_ * (level * particle.skew.z.y);
                        z__ = z_ * level;
                    }
                    else {
                        var tmp = (2 - (Math.cos(T.Math.deg2rad(180 / particle.shape.n)))); //todo better
                        x__ = x_ * ((level * 2) - 1); //*(level-0.5);//+x_*(level*particle.skew.z.x),
                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)); //+y_*(level*particle.skew.z.y),
                        z__ = (1) * 0.5 * (z_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                            z_ * ((Math.cos(T.Math.deg2rad(180 / particle.shape.n)))) * tmp);
                    }
                    //------------------ XY Rotation
                    var DistDeg_ = T.Math.xy2distDeg(x__, y__); //todo refactor all like DistDeg, etc...
                    DistDeg_.deg += particle.rotation;
                    var xy_ = T.Math.distDeg2xy(DistDeg_.dist, DistDeg_.deg);
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
    class_8.get3D = function (particle) {
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
                        x__ = 0.5 * x_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + x_ * (level * particle.skew.z.x);
                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + y_ * (level * particle.skew.z.y);
                        z__ = z_ * level;
                    }
                    else {
                        var tmp = (2 - (Math.cos(T.Math.deg2rad(180 / particle.shape.n)))); //todo better
                        x__ = x_ * ((level * 2) - 1); //*(level-0.5);//+x_*(level*particle.skew.z.x),
                        y__ = 0.5 * y_ * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)); //+y_*(level*particle.skew.z.y),
                        z__ = (1) * 0.5 * (z_ * Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                            z_ * ((Math.cos(T.Math.deg2rad(180 / particle.shape.n)))) * tmp);
                    }
                    //------------------ XY Rotation
                    var DistDeg_ = T.Math.xy2distDeg(x__, y__); //todo refactor all like DistDeg, etc...
                    DistDeg_.deg += particle.rotation;
                    var xy_ = T.Math.distDeg2xy(DistDeg_.dist, DistDeg_.deg);
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
    class_8.get2Dlines = function (particle, base) {
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
    class_8.collisionLinesDetect = function (lines1, lines2) {
        for (var i1 in lines1) {
            for (var i2 in lines2) {
                if (T.Math.lineCollision(lines1[i1][0].x, lines1[i1][0].y, lines1[i1][1].x, lines1[i1][1].y, lines2[i2][0].x, lines2[i2][0].y, lines2[i2][1].x, lines2[i2][1].y)) {
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
    class_8.collision2D = function (particle1, particle2) {
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
    return class_8;
}());
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
                                if (T.Math.xy2dist(x - xc, y - yc) <= object.design.data.size) {
                                    map_array[y][x] = object.getCode();
                                }
                            }
                        }
                    }
                }
                //--------------------------
                return map_array;
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
                                if (T.Math.xy2dist(x, y) <= object.design.data.size) {
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
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================
T.Resources = (function () {
    /**
     * @param {object} Resources
     * @constructor
     */
    function class_9(resources) {
        for (var key in resources) {
            if (typeof resources[key] == 'number') {
                this[key] = Math.ceil(resources[key]);
            }
        }
    }
    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    class_9.prototype.clone = function () {
        return new T.Resources(this);
    };
    /**
     * Checks whether this contains a given resources
     * @param {object} Resources
     * @return {bool} contains
     */
    class_9.prototype.contains = function (resources) {
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
    class_9.prototype.add = function (resources) {
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
    class_9.prototype.multiply = function (k) {
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
    class_9.prototype.signum = function (k) {
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
    class_9.prototype.apply = function (modifier) {
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
    class_9.prototype.extractKeys = function () {
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
    class_9.prototype.compare = function (resoures) {
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
    class_9.prototype.remove = function (resources) {
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
    class_9.prototype.toString = function () {
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
    class_9.prototype.toHTML = function () {
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
        strings = strings.join(' ');
        strings = '<div class="resources">' + strings + '</div>';
        return strings;
    };
    return class_9;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================
T.User = (function () {
    /**
     * @param {object} user raw user data
     */
    function class_10(user) {
        for (var key in user) {
            var this_key = key;
            this[this_key] = user[key];
        }
    }
    /**
     *
     * @returns {string} HTML code of users signature
     */
    class_10.prototype.getSignatureHTML = function () {
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
    return class_10;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates instance T.World.terrains
 */
//======================================================================================================================
T.setNamespace('World');
T.World.terrains = [
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
/**
 * @author ©Towns.cz
 * @fileOverview Creates instance T.World.mapGenerator
 */
//======================================================================================================================
T.World.mapGenerator = new T.MapGenerator(T.Math.blurXY(function (x, y) {
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
        //var xy = T.Math.xyRotate(x,y,57);
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
                        image:'rock'+Math.floor(T.Math.randomSeedPosition(1,{x:object.x,y:object.y})*6)%6+'dark'+Math.floor(T.Math.randomSeedPosition(2,{x:object.x,y:object.y})*4)%4,
                        size: 0.5+T.Math.randomSeedPosition(5,{x:object.x,y:object.y})*1
                    }
                }

            }
        );


    }else*/
    if (object.getCode() == 10) {
        if (T.Math.randomSeedPosition(3, { x: object.x, y: object.y }) > 0.95) {
            virtual_objects.push({
                x: object.x,
                y: object.y,
                type: 'natural',
                design: {
                    type: 'natural',
                    data: {
                        model: 'tree',
                        size: 3 + T.Math.randomSeedPosition(6, { x: object.x, y: object.y }) / 2,
                        rotation: {
                            x: T.Math.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                            y: T.Math.randomSeedPosition(7, { x: object.x, y: object.y }) * 20 - 10,
                            z: T.Math.randomSeedPosition(7, { x: object.x, y: object.y }) * 360
                        }
                    }
                }
            });
        }
    }
});
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game = new T.Game(T.Math.prettyNumber, T.Math.prettyNumber);
T.World.game.installActionClass({
    distance: 0,
    strength: 0,
    rounds: 1,
    cooldown: 1
}, (function (_super) {
    __extends(class_11, _super);
    function class_11() {
        _super.apply(this, arguments);
    }
    class_11.getType = function () {
        return ('attack');
    };
    class_11.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.distance, 2) * this.params.strength * this.params.rounds * (1 / this.params.cooldown)) * 100 * 0.05);
    };
    class_11.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 2 })
        ]);
    };
    class_11.execute = function (game, attacker, attacked, resources_attacker) {
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
    return class_11;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    defence: 0
}, (function (_super) {
    __extends(class_12, _super);
    function class_12() {
        _super.apply(this, arguments);
    }
    class_12.getType = function () {
        return ('defence');
    };
    class_12.prototype.countPriceBase = function () {
        return ((this.params.defence) * 800 * 0.05);
    };
    class_12.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 1 }),
        ]);
    };
    return class_12;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    life: 1,
    max_life: 1
}, (function (_super) {
    __extends(class_13, _super);
    function class_13() {
        _super.apply(this, arguments);
    }
    class_13.getType = function () {
        return ('life');
    };
    class_13.prototype.countPriceBase = function () {
        return (0);
    };
    class_13.prototype.getPriceResources = function () {
        return ([new T.Resources()]);
    };
    return class_13;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    wood: 0,
    iron: 0,
    clay: 0,
    stone: 0
}, (function (_super) {
    __extends(class_14, _super);
    function class_14() {
        _super.apply(this, arguments);
    }
    class_14.getType = function () {
        return ('mine');
    };
    class_14.prototype.countPriceBase = function () {
        return ((this.params.amount) * 3600 * 0.05);
    };
    class_14.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 3 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_14;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    speed: 0
}, (function (_super) {
    __extends(class_15, _super);
    function class_15() {
        _super.apply(this, arguments);
    }
    class_15.getType = function () {
        return ('move');
    };
    class_15.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
    };
    class_15.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            //new T.Resources({'stone':  0}),
            new T.Resources({ 'iron': 1 })
        ]);
    };
    class_15.execute = function (game, object, destinations /*,objects_nearby,resources*/) {
        //---------------------Checking action//todo maybe auto
        var action = object.getAction('move');
        if (action instanceof T.Game.Action) { }
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
    return class_15;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    regenerate: 100
}, (function (_super) {
    __extends(class_16, _super);
    function class_16() {
        _super.apply(this, arguments);
    }
    class_16.getType = function () {
        return ('regenerate');
    };
    class_16.prototype.countPriceBase = function () {
        return ((1 / this.params.regenerate) * 3600 * 0.05);
    };
    class_16.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 2 })
        ]);
    };
    return class_16;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    repair: 0
}, (function (_super) {
    __extends(class_17, _super);
    function class_17() {
        _super.apply(this, arguments);
    }
    class_17.getType = function () {
        return ('repair');
    };
    class_17.prototype.countPriceBase = function () {
        return ((1 / (this.params.repair / 100)) * 1000 * 0.05);
    };
    class_17.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_17;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    throughput: 0
}, (function (_super) {
    __extends(class_18, _super);
    function class_18() {
        _super.apply(this, arguments);
    }
    class_18.getType = function () {
        return ('throughput');
    };
    class_18.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.throughput / 100, 2)) * 10 * 0.05); //todo
    };
    class_18.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 3 }),
            new T.Resources({ 'stone': 1 }),
            new T.Resources({ 'iron': 0 })
        ]);
    };
    return class_18;
}(T.Game.Action)));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjA1LXRvd25zLm5hbWVzcGFjZS50cyIsIjEwLV9wb3NpdGlvbi8xMC1jb2xvci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLTNkLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLXBvbGFyLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzE1LXBvc2l0aW9uLWRhdGUuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMjAtYXJlYS5jbGFzcy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1hdGguc3RhdGljLnRzIiwiMTAtbW9kZWwvMDAtbW9kZWwuY2xhc3MudHMiLCIxMC1tb2RlbC8wNS1wYXJ0aWNsZXMuc3RhdGljLnRzIiwiMTAtb2JqZWN0cy8wMC1hcnJheS5jbGFzcy50cyIsIjEwLW9iamVjdHMvMDUtb2JqZWN0LnRzIiwiMTAtb2JqZWN0cy8xMC1idWlsZGluZy5jbGFzcy50cyIsIjEwLW9iamVjdHMvMTAtbmF0dXJhbC5jbGFzcy50cyIsIjEwLW9iamVjdHMvMTAtc3RvcnkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXRlcnJhaW4uY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUc5QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBR3JCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBR2xDOzs7O0dBSUc7QUFDSCxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVMsU0FBUztJQUUvQixTQUFTLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFFaEIsSUFBSSxHQUFHLENBQUM7SUFDUixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBRXJDLEdBQUcsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsRUFBRSxDQUFBLENBQUMsR0FBRyxLQUFHLEdBQUcsQ0FBQztZQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUU5RCxFQUFFLENBQUEsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBRyxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUVGLE1BQU0sR0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkIsQ0FBQztJQUdMLENBQUM7SUFFRCxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVqQixDQUFDLENBQUM7QUN0REY7OztHQUdHO0FBQ0gsd0hBQXdIO0FBR3hILElBQU8sQ0FBQyxDQTJIUDtBQTNIRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBQ047O09BRUc7SUFDSDtRQUVJOzs7Ozs7V0FNRztRQUNILGVBQW1CLENBQVMsRUFBUSxDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQU87WUFBZCxpQkFBYyxHQUFkLE9BQWM7WUFBMUQsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUN6RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxxQkFBSyxHQUFMO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUdEOzs7V0FHRztRQUNILHNCQUFNLEdBQU47WUFFSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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SSxNQUFNLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUduQixFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUUsTUFBTSxDQUFDO1lBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUcvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUUsS0FBSyxDQUFDLENBQUM7SUFFMUIsQ0FBQztJQUtEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNJLHFCQUFhLEdBQXBCLFVBQXFCLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHO1FBS2hELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUks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LElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztJQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7SUFDNUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0lBQzdILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7SUFDL0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBQyxDQUFDO0lBQ3BJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztJQUNuSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7SUFDMUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0lBQzNILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMs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QyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMs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QyxJQUFJLENBQUMsTUFBTSxFQXdCMUIsQ0FDSixDQUFDIiwiZmlsZSI6InRvd25zLXNoYXJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IEluaXRpYWxpemUgbmFtZXNwYWNlIFRvd25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFRvd25zIG5hbWVzcGFjZSAtIHVuZGVyIHRoaXMgb2JqZWN0IGFyZSBhbGwgVG93bnMgY2xhc3NlcyBhbmQgaW5zdGFuY2VzLlxuICogQHR5cGUge29iamVjdH1cbiAqL1xuZ2xvYmFsLlRvd25zID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5Ub3ducztcblxuXG52YXIgVCA9IGdsb2JhbC5Ub3ducztcblxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5cblxuLyoqXG4gKiBDaGVja3MgZXhpc3RlbmNlIG9mIG5hbWVzcGFjZS4gSWYgbm90IGV4aXN0cywgdGhpcyBmdW5jdGlvbiBjcmVhdGVzIGl0LlxuICogQHBhcmFtIG5hbWVzcGFjZSBlZy4gJ09iamVjdHMuQXJyYXknXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuVC5zZXROYW1lc3BhY2UgPSBmdW5jdGlvbihuYW1lc3BhY2Upe1xuXG4gICAgbmFtZXNwYWNlPW5hbWVzcGFjZS5zcGxpdCgnLicpO1xuXG4gICAgdmFyIEFjdHVhbD10aGlzO1xuXG4gICAgdmFyIGtleTtcbiAgICBmb3IodmFyIGk9IDAsbD1uYW1lc3BhY2UubGVuZ3RoO2k8bDtpKyspe1xuXG4gICAgICAgIGtleT1uYW1lc3BhY2VbaV07XG5cbiAgICAgICAgaWYoa2V5PT09J1QnKXRocm93IG5ldyBFcnJvcignQ2FudCBzZXQgbmFtZXNwYWNlIFQgdW5kZXIgVCEnKTtcblxuICAgICAgICBpZih0eXBlb2YgQWN0dWFsW2tleV09PT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIEFjdHVhbFtrZXldPXt9O1xuICAgICAgICAgICAgQWN0dWFsPUFjdHVhbFtrZXldO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBBY3R1YWw9QWN0dWFsW2tleV07XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZXR1cm4odHJ1ZSk7XG5cbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkNvbG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hpY2ggcmVwcmVzZW50cyBSR0JBIGNvbG9yLlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSByIHJlZCBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBnIGdyZWVuIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGIgYmx1ZSBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBhIGFscGhhIGZyb20gMCB0byAyNTVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByOiBudW1iZXIscHVibGljIGc6IG51bWJlcixwdWJsaWMgYjogbnVtYmVyLHB1YmxpYyBhID0gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBkZWVwIGNsb25lIG9kIFQuQ29sb3JcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlQuQ29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuQ29sb3IodGhpcy5yLHRoaXMuZyx0aGlzLmIsdGhpcy5hKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlcGFpcnMgb3ZlcmZsb3dlZCBjb2xvcnNcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGJvdW5kcygpIHtcblxuICAgICAgICAgICAgdGhpcy5yID0gTWF0aC5yb3VuZCh0aGlzLnIpO1xuICAgICAgICAgICAgdGhpcy5nID0gTWF0aC5yb3VuZCh0aGlzLmcpO1xuICAgICAgICAgICAgdGhpcy5iID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICAgICAgdGhpcy5hID0gTWF0aC5yb3VuZCh0aGlzLmEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuciA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZyA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmIgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmEgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgY3NzIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3JcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuIHJnYigxMDAsMjAwLDIwMClcbiAgICAgICAgICovXG4gICAgICAgIGdldENzc0NvbG9yKCkge1xuXG4gICAgICAgICAgICB0aGlzLmJvdW5kcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYSA9PSAyNTUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYignICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnKSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vcigncmdiYSgnICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnLCAnICsgTWF0aC5yb3VuZCh0aGlzLmEvMjU1KjEwMCkvMTAwICsgJyknKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hIC8gMjU1ICogMTAwKSAvIDEwMCArICcpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvciAoaWdub3JlcyBhbHBoYSBjaGFuZWwuKVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBlZy4gIzAwZmYwMFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0SGV4KCkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybiAnIycgKyAoKDEgPDwgMjQpICsgKHRoaXMuciA8PCAxNikgKyAodGhpcy5nIDw8IDgpICsgdGhpcy5iKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIG5ldyBULkNvbG9yIGZvcm0gaGV4IGNvZGUgb2YgY29sb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleCBjb2RlIG9mIGNvbG9yIGVnLiAjMDBmZjAwXG4gICAgICAgICAqIEByZXR1cm5zIHtULkNvbG9yfSBDb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNyZWF0ZUZyb21IZXgoaGV4OiBzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCwgc2hvcnRoYW5kUmVnZXg7XG5cbiAgICAgICAgICAgIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKHNob3J0aGFuZFJlZ2V4LCBmdW5jdGlvbiAobSwgciwgZywgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVC5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjcmVhdGluZyBULkNvbG9yIGZyb20gJyArIGhleCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBhdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUe1xuXG4gICAgZXhwb3J0IGNsYXNzIFBhdGgge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gey4uLlQuUG9zaXRpb25EYXRlfSBQb3NpdGlvbiB3aXRoIGRhdGUgYXQgbGVhc3QgMlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuXG5cbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vaWYoYXJncy5sZW5ndGg9PT0xICYmIGFyZ3MgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvLyAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3M7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL31cblxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlLCBsYXN0X2RhdGUgPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggbXVzdCBiZSBULlBvc2l0aW9uRGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsYXN0X2RhdGUgPj0gcG9zaXRpb25fZGF0ZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZXMgc2hvdWxkIGJlIGNvbnNlY3V0aXZlIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCAoJyArIHBvc2l0aW9uX2RhdGUuZGF0ZSArICcgc2hvdWxkIGJlIGFmdGVyICcgKyBsYXN0X2RhdGUgKyAnKS4gJyArIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSA9IHBvc2l0aW9uX2RhdGUuZGF0ZTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheS48VC5Qb3NpdGlvbj59IGFycmF5X3Bvc2l0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUGF0aH1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uLCBzcGVlZCwgZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oc3BlZWQgLyAxKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSB2YWxpZCBudW1iZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSBwb3NpdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFycmF5X3Bvc2l0aW9uLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXJyYXlfcG9zaXRpb25fZGF0ZSA9IFtcbiAgICAgICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25bMF0ueCwgYXJyYXlfcG9zaXRpb25bMF0ueSwgZGF0ZSlcbiAgICAgICAgICAgIF07XG5cblxuICAgICAgICAgICAgdmFyIGxhc3RfcG9zaXRpb24gPSBhcnJheV9wb3NpdGlvblswXTtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGUsIGRpc3RhbmNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcnJheV9wb3NpdGlvbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbGFzdF9wb3NpdGlvbi5nZXREaXN0YW5jZShwb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSAvIDEgKyBkaXN0YW5jZSAvIHNwZWVkICogMTAwMCk7XG5cblxuICAgICAgICAgICAgICAgIGxhc3RfcG9zaXRpb24gPSBwb3NpdGlvbl9kYXRlO1xuXG5cbiAgICAgICAgICAgICAgICBhcnJheV9wb3NpdGlvbl9kYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LCBhcnJheV9wb3NpdGlvbltpXS55LCBkYXRlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3JldHVybiBuZXcgdGhpcy5hcHBseSh0aGlzLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUGF0aCguLi5hcnJheV9wb3NpdGlvbl9kYXRlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnQgaW4gd2hpY2ggc2VnbWVudCBpcyBULlBhdGggcHJvZ3Jlc3NcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50U2VnbWVudChkYXRlKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgICAgICB2YXIgQSwgQiwgeCwgeTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDE7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldLmRhdGUgLyAxO1xuICAgICAgICAgICAgICAgIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaSArIDFdLmRhdGUgLyAxO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpKycoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoQSA8PSBkYXRlICYmIEIgPiBkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnPC0tLXRoaXMnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjb3VudGluZyBzZWdtZW50IGluIFQuUGF0aCwgbWF5YmUgYmVjYXVzZSBvZiBwYXJhbSBkYXRlIGlzICcgKyBkYXRlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHBvc2l0aW9uIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFBvc2l0aW9uKGRhdGUgPSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkpO1xuXG4gICAgICAgICAgICB2YXIgeCA9IFQuTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS54LCBCLngpO1xuICAgICAgICAgICAgdmFyIHkgPSBULk1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueSwgQi55KTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih4LCB5KSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHJvdGF0aW9uIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFJvdGF0aW9uKGRhdGUpIHtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBCQSA9IEIuZ2V0UG9zaXRpb24oKS5wbHVzKEEuZ2V0UG9zaXRpb24oKS5tdWx0aXBseSgtMSkpO1xuXG4gICAgICAgICAgICB2YXIgcG9sYXIgPSBCQS5nZXRQb3NpdGlvblBvbGFyKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEJBLHBvbGFyKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwb2xhci5nZXREZWdyZWVzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIFNwZWVkIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBmaWVsZHMvc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTcGVlZChkYXRlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluUHJvZ3Jlc3MoZGF0ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IEEuZ2V0RGlzdGFuY2UoQik7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBCLmRhdGUgLSBBLmRhdGU7XG5cbiAgICAgICAgICAgIHJldHVybiAoZGlzdGFuY2UgLyAoZHVyYXRpb24gLyAxMDAwKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBhdGggaW4gcHJvZ3Jlc3MgKHRydWUpIG9yIGl0IGhhcyBub3Qgc3RhcnRlZChmYWxzZSkgb3IgaXQgaXMgZmluaXNoZWQoZmFsc2UpP1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpblByb2dyZXNzKGRhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gbWF5YmUgY291bnRQcm9ncmVzc1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFQuUGF0aCB0byBzdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5qb2luKCcsICcpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbjNEXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24zRCB7XG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB4Lno7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0gejtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbjNEKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24zRCB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJywnICsgdGhpcy56ICsgJ10nO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUG9zaXRpb25Qb2xhclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uUG9sYXIge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGRpc3RhbmNlLCBkZWdyZWVzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlzdGFuY2UgPT0gJ251bWJlcicgJiYgdHlwZW9mIGRlZ3JlZXMgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25Qb2xhcih0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpICogdGhpcy5kaXN0YW5jZVxuICAgICAgICAgICAgKSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZSgpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGVncmVlcygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlZ3JlZXMgKyAzNjApICUgMzYwO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJhZGlhbnMoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULk1hdGguZGVnMnJhZCh0aGlzLmRlZ3JlZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLmRpc3RhbmNlICsgJywnICsgdGhpcy5kZWdyZWVzICsgJ8KwJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUG9zaXRpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL15bKy1dP1xcZCsoXFwuXFxkKyk/LFsrLV0/XFxkKyhcXC5cXGQrKT8kLy50ZXN0KHgpKSB7XG5cbiAgICAgICAgICAgICAgICB4ID0geC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHBhcnNlRmxvYXQoeFswXSk7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdCh4WzFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjb25zdHJ1Y3RvciBwYXJhbXMgd2hpbGUgY3JlYXRpbmcgVC5Qb3NpdGlvbiEnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBsdXMocG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54ICs9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG11bHRpcGx5KGspIHtcblxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ICogaztcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSAqIGs7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRGbG9vcmVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKE1hdGguZmxvb3IoIHRoaXMueCksTWF0aC5mbG9vciggdGhpcy55KSk7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UG9zaXRpb25Qb2xhcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvblBvbGFyKFxuICAgICAgICAgICAgICAgIFQuTWF0aC54eTJkaXN0KHRoaXMueCwgdGhpcy55KSxcbiAgICAgICAgICAgICAgICBULk1hdGgucmFkMmRlZyhNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KSlcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKHBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULk1hdGgueHkyZGlzdChwb3NpdGlvbi54IC0gdGhpcy54LCBwb3NpdGlvbi55IC0gdGhpcy55KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJyc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXAgd2l0aCB0aW1lXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uRGF0ZSBleHRlbmRzIFQuUG9zaXRpb24gey8vdG9kbyBpcyB0aGFyZSBzb2x1dGlvbiB3aXRob3V0IHVzaW5nIFQuP1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIGRhdGUgPSAwKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHkgPSB4Lnk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHguZGF0ZTtcbiAgICAgICAgICAgICAgICB4ID0geC54O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGUgLyAxKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gY29uc3RydWN0IFBvc2l0aW9uRGF0ZSBpcyBuZWVkZWQgdmFsaWQgRGF0ZSBub3QgJyArIGRhdGUgKyAnLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBvbmx5IHBvc2l0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICddIGF0ICcgK1xuICAgICAgICAgICAgICAgICh0aGlzLmRhdGUuZ2V0RGF5KCkgKyAxKSArICcuJyArICh0aGlzLmRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy4nICsgdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCkgK1xuICAgICAgICAgICAgICAgICcgJyArIHRoaXMuZGF0ZS5nZXRIb3VycygpICsgJzonICsgdGhpcy5kYXRlLmdldE1pbnV0ZXMoKSArICc6JyArIHRoaXMuZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIlxubW9kdWxlIFQge1xuICAgIGV4cG9ydCBjbGFzcyBBcmVhIHtcblxuICAgICAgICBwdWJsaWMgcG9zaXRpb25zO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlLGlhLGliLHNpZGVjb2xsaXNpb24sY29sbGlzaW9uO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5NYXRoLmxpbmVDb2xsaXNpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29sbGlzaW9uPT10cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8qcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICsgKHRlc3RzaWRlLTAuNSkqMTAwMDAwMDAwMC8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgICk7Ki9cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKCFzaWRlY29sbGlzaW9uKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgVC5BcnJheUZ1bmN0aW9uc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4vKipcbiAqIEFkZGl0aW9uYWwgZnVuY3Rpb25zIHRvIG1hbmlwdWxhdGUgd2l0aCBhcnJheS5cbiAqL1xuVC5BcnJheUZ1bmN0aW9ucz1jbGFzcyB7XG5cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBTZWFyY2hlcyBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEtleSBvZiBvYmplY3Qgd2l0aCB0aGlzIElELCAtMSBpZiBub3QgZXhpc3RcbiAgICAgKi9cbiAgICBzdGF0aWMgaWQyaShhcnJheSwgaWQpIHtcblxuICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuXG4gICAgfVxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yX21lc3NhZ2Ugd2hlbiBpdGVuIG5vdCBleGlzdHNcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBPYmplY3Qgd2l0aCB0aGlzIElELCBudWxsIGlmIG5vdCBleGlzdFxuICAgICAqL1xuICAgIHN0YXRpYyBpZDJpdGVtKGFycmF5LCBpZCwgZXJyb3JfbWVzc2FnZSA9IGZhbHNlKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgaWYgKGFycmF5W2ldLmlkID09IGlkKXJldHVybiBhcnJheVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBEZWxldGUgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaWRSZW1vdmUoYXJyYXksIGlkKSB7Ly90b2RvIHJlZmFjdG9yIHVzZSB0aGlzIG5vdCBzcGxpY2VcblxuICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSB0aHJvdWdoIDJEIGFycmF5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgc3RhdGljIGl0ZXJhdGUyRChhcnJheSwgY2FsbGJhY2spIHtcblxuICAgICAgICAvL3IoYXJyYXkpO1xuXG4gICAgICAgIGZvciAodmFyIHkgPSAwLCB5TGVuID0gYXJyYXkubGVuZ3RoOyB5IDwgeUxlbjsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeExlbiA9IGFycmF5W3ldLmxlbmd0aDsgeCA8IHhMZW47IHgrKykge1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeSwgeCk7XG4gICAgICAgICAgICAgICAgLyp0b2RvIHJlZmFjdG9yIHRvIHgseSovXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIGFycmF5XG4gICAgICogQHBhcmFtIGZyb21cbiAgICAgKiBAcGFyYW0gdG9cbiAgICAgKiBAcmV0dXJuIHthcnJheX0gUmVtb3ZlZCBpdGVtc1xuICAgICAqL1xuICAgIHN0YXRpYyByZW1vdmVJdGVtcyhhcnJheSwgZnJvbSwgdG8pIHtcbiAgICAgICAgdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgICAgIHJldHVybiBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKiogdG9kbyBzaG91bGQgaXQgYmUgdW5kZXIgVC5BcnJheUZ1bmN0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iZWN0XG4gICAgICogQHBhcmFtIHthcnJheX0gcGF0aFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWx0ZXJQYXRoKG9iamVjdCwgcGF0aCwgc2V0VmFsdWUpIHtcblxuXG4gICAgICAgIGlmICghaXMob2JqZWN0KSkgey8vdG9kbyBzaG91bGQgaXQgYmUgaGVyZT9cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZmlsdGVyUGF0aDogT2JqZWN0IGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXMocGF0aC5mb3JFYWNoKSkge1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZmlsdGVyUGF0aDogVC5QYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3IodmFyIHBhdGhfaSBpbiBwYXRoKSB7XG5cbiAgICAgICAgICAgIHZhciBvYmplY3Rfa2V5ID0gcGF0aFtwYXRoX2ldO1xuXG4gICAgICAgICAgICBpZiAocGF0aF9pIDwgcGF0aC5sZW5ndGggLSAxIHx8IHR5cGVvZiBzZXRWYWx1ZSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3Rbb2JqZWN0X2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBLZXkgXFwnJytvYmplY3Rfa2V5KydcXCcgaW4gcGF0aCBpbiBvYmplY3QgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W29iamVjdF9rZXldO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0W29iamVjdF9rZXldID0gc2V0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gICAgICogQHJldHVybnMge0FycmF5fSBBcnJheSBjb250YWluaW5nIG9ubHkgdW5pcXVlIHZhbHVlc1xuICAgICAqL1xuICAgIHN0YXRpYyB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgdmFyIG4gPSB7fSwgciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgblthcnJheVtpXV0gPSBhcnJheTtcbiAgICAgICAgICAgICAgICByLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgaHRtbCB0YWJsZSBmcm9tIEpTIGFycmF5XG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgYXJyYXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbF9jbGFzc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWxcbiAgICAgKi9cbiAgICBzdGF0aWMgYXJyYXkydGFibGUoYXJyYXksIGFkZGl0aW9uYWxfY2xhc3MgPSAnJykge1xuICAgICAgICAvL3RvZG8gY2hlY2tcblxuICAgICAgICB2YXIgaHRtbCA9ICcnO1xuXG4gICAgICAgIHZhciByb3dzID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICB2YXIgY29sc190YWJsZSA9IGFycmF5WzBdLmxlbmd0aDsvL3RvZG8gaXMgaXMgYmVzdCBzb2x1dGlvbj9cblxuXG4gICAgICAgIGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cIicgKyBhZGRpdGlvbmFsX2NsYXNzICsgJ1wiPic7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG5cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPic7XG5cbiAgICAgICAgICAgIHZhciBjb2xzID0gYXJyYXlbcm93XS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY29sc19zcGFuID0gY29sc190YWJsZSAtIGNvbHM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sID09IGNvbHMgLSAxICYmIGNvbHNfc3BhbiAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjb2xzcGFuPVwiJyArIChjb2xzX3NwYW4gKyAxKSArICdcIj4nO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JztcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBhcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPC90ZD4nO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG5cbiAgICAgICAgfVxuICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgcmV0dXJuIChodG1sKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBleHRyYWN0IGtleXMgZnJvbSBBcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgc3RhdGljIGdldEtleXMob2JqZWN0KXtcblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IodmFyIGsgaW4gb2JqZWN0KSBrZXlzLnB1c2goayk7XG4gICAgICAgIHJldHVybihrZXlzKTtcblxuICAgIH1cblxuXG5cblxuXG5cbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogR2FtZSBjb25kaXRpb25zXG4gKi9cblQuR2FtZSA9IGNsYXNze1xuICAgIFxuICAgIFxuICAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1heF9saWZlX21vZGlmaWVyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJpY2Vfa2V5X21vZGlmaWVyXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWF4X2xpZmVfbW9kaWZpZXIscHJpY2Vfa2V5X21vZGlmaWVyKXtcbiAgICBcbiAgICAgICAgdGhpcy5hY3Rpb25fY2xhc3NlcyA9IHt9O1xuICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgdGhpcy5tYXhfbGlmZV9tb2RpZmllciA9IG1heF9saWZlX21vZGlmaWVyO1xuICAgICAgICB0aGlzLnByaWNlX2tleV9tb2RpZmllciA9IHByaWNlX2tleV9tb2RpZmllcjtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7YXJyYXl9IG9mIG51bWJlcnNcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCl7XG4gICAgXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIHZhciBwcmljZV9iYXNlcz1bXTtcbiAgICBcbiAgICBcbiAgICAgICAgaWYodHlwZW9mIG9iamVjdC5hY3Rpb25zLmxlbmd0aD09PTApe1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbiBvYmplY3QgJytvYmplY3QrJyB0aGVyZSBhcmUgbm8gYWN0aW9ucyEnKTsvL3RvZG8gYWxsIG9iamVjdHMgc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcgbGlrZSB0aGlzXG4gICAgICAgIH1cbiAgICBcbiAgICBcbiAgICAgICAgb2JqZWN0LmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihhY3Rpb24pe1xuICAgIFxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZSA9IE1hdGguY2VpbChhY3Rpb24uY291bnRQcmljZUJhc2UoKSk7Ly9cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIE5hTiAgdmFsdWVcbiAgICAgICAgICAgIGlmKGlzTmFOKHByaWNlX2Jhc2UpKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbi50eXBlKycgbWFrZXMgcHJpY2UgYmVzZSBOYU4uJyk7XG4gICAgICAgICAgICAgICAgcHJpY2VfYmFzZT0wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBub24gbmVnYXRpdmUgdmFsdWVcbiAgICAgICAgICAgIGlmKHByaWNlX2Jhc2U8MCl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb24udHlwZSsnIHNob3VsZCBub3QgbWFrZSB0aGlzIGFjdGlvbiBuZWdhdGl2ZScpOy8vdG9kbyBtYXliZSBvbmx5IHdhcm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHByaWNlX2Jhc2VzLnB1c2gocHJpY2VfYmFzZSk7XG5cbiAgICBcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHJldHVybihwcmljZV9iYXNlcyk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge251bWJlcn0gbWF4aW11bSBsaWZlIG9mIG9iamVjdFxuICAgICAqL1xuICAgIGdldE9iamVjdE1heExpZmUob2JqZWN0KXtcbiAgICBcbiAgICAgICAgdmFyIHByaWNlX2Jhc2VzPXRoaXMuZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3QpO1xuICAgICAgICB2YXIgcHJpY2VfYmFzZSA9IHByaWNlX2Jhc2VzLnJlZHVjZShmdW5jdGlvbihwdiwgY3YpIHsgcmV0dXJuIHB2ICsgY3Y7IH0sIDApO1xuICAgIFxuICAgIFxuICAgICAgICBwcmljZV9iYXNlPXRoaXMubWF4X2xpZmVfbW9kaWZpZXIocHJpY2VfYmFzZSk7XG4gICAgXG4gICAgICAgIHJldHVybihwcmljZV9iYXNlKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7YXJyYXl9IG9mIFJlc291cmNlc1xuICAgICAqL1xuICAgIGdldE9iamVjdFByaWNlcyhvYmplY3Qpe1xuXG5cbiAgICAgICAgdmFyIHByaWNlX2Jhc2VzPXRoaXMuZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3QpO1xuICAgIFxuICAgIFxuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgcHJpY2VzPVtdO1xuXG4gICAgXG4gICAgICAgIHZhciBkZXNpZ25fcmVzb3VyY2VzID0gb2JqZWN0LmdldE1vZGVsKCkuYWdncmVnYXRlUmVzb3VyY2VzVm9sdW1lcygpO1xuXG5cbiAgICAgICAgb2JqZWN0LmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihhY3Rpb24saSl7XG4gICAgXG5cbiAgICAgICAgICAgIHZhciBwcmljZV9yZXNvdXJjZXNfbGlzdCA9XG4gICAgICAgICAgICBhY3Rpb24uZ2V0UHJpY2VSZXNvdXJjZXMoKS5zb3J0KGZ1bmN0aW9uKGEsYil7Ly90b2RvIGlzIGl0IHNhZmU/XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShhLmNsb25lKCkuc2lnbnVtKCkpLWRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShiLmNsb25lKCkuc2lnbnVtKCkpO1xuICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgXG4gICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzID0gcHJpY2VfcmVzb3VyY2VzX2xpc3RbMF0uY2xvbmUoKTtcbiAgICBcbiAgICBcbiAgICAgICAgICAgIHByaWNlX3Jlc291cmNlcy5tdWx0aXBseShwcmljZV9iYXNlc1tpXSk7XG4gICAgICAgICAgICBwcmljZXMucHVzaChwcmljZV9yZXNvdXJjZXMpO1xuICAgIFxuICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlcyk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUmVzb3VyY2VzIC0gcHJpY2Ugb2Ygb2JqZWN0XG4gICAgICovXG4gICAgZ2V0T2JqZWN0UHJpY2Uob2JqZWN0KXtcbiAgICBcbiAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcbiAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZW1wdHkgcHJpY2UnLHByaWNlKTtcbiAgICBcbiAgICAgICAgdmFyIHByaWNlcz10aGlzLmdldE9iamVjdFByaWNlcyhvYmplY3QpO1xuICAgIFxuICAgICAgICBwcmljZXMuZm9yRWFjaChmdW5jdGlvbihwcmljZV8pe1xuICAgIFxuICAgICAgICAgICAgcHJpY2UuYWRkKHByaWNlXyk7XG4gICAgXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBwcmljZS5hcHBseSh0aGlzLnByaWNlX2tleV9tb2RpZmllcik7XG4gICAgXG4gICAgICAgIHJldHVybihwcmljZSk7XG4gICAgXG4gICAgfVxuXG5cblxuICAgIGluc3RhbGxBY3Rpb25DbGFzcyhhY3Rpb25fZW1wdHlfaW5zdGFuY2VfcGFyYW1zLGFjdGlvbl9jbGFzcyl7XG5cbiAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25fY2xhc3MuZ2V0VHlwZSgpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0eXBlIT09J3N0cmluZycpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IGFjdGlvbiBjbGFzcyBoYXMgbm8gdHlwZSEnKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiB0aGVyZSBpcyBhbHJlYWR5IGluc3RhbGxlZCBhY3Rpb24gd2l0aCB0eXBlICcrdHlwZSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgdmFyIGFjdGlvbl9lbXB0eV9pbnN0YW5jZSA9IG5ldyBhY3Rpb25fY2xhc3Moe1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHBhcmFtczogYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtc1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vQWRkaW5nIG1ldGhvZCBjbG9uZSB0byBpbnN0YWxsZWQgYWN0aW9uIGNsYXNzXG4gICAgICAgIGFjdGlvbl9jbGFzcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuKG5ldyBhY3Rpb25fY2xhc3MoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdID0gYWN0aW9uX2NsYXNzO1xuICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbdHlwZV0gPSBhY3Rpb25fZW1wdHlfaW5zdGFuY2U7XG4gICAgXG4gICAgXG4gICAgXG4gICAgfVxuXG5cblxuICAgIGdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKXtcblxuICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5hY3Rpb25fY2xhc3Nlc1thY3Rpb25fdHlwZV07XG5cbiAgICAgICAgaWYodHlwZW9mIGFjdGlvbl9jbGFzcz09J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luIHRoaXMgZ2FtZSBpbnN0YW5jZSB0aGFyZSBpcyBubyBhY3Rpb24gY2xhc3MgdHlwZSAnK2FjdGlvbl90eXBlKycuIFRoZXJlIGFyZSBvbmx5IHRoZXNlIGFjdGlvbiB0eXBlczogJysgVC5BcnJheUZ1bmN0aW9ucy5nZXRLZXlzKHRoaXMuYWN0aW9uX2NsYXNzZXMpLmpvaW4oJywgJykpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4oYWN0aW9uX2NsYXNzKTtcblxuICAgIH1cblxuXG4gICAgbmV3QWN0aW9uSW5zdGFuY2UoYWN0aW9uKXtcblxuICAgICAgICAvL3RvZG8gc29sdmUgZGVmZW5zZSB2cy4gZGVmZW5jZVxuICAgICAgICBpZihhY3Rpb24udHlwZT09PSdkZWZlbnNlJyl7XG4gICAgICAgICAgICBhY3Rpb24udHlwZT0nZGVmZW5jZSc7XG4gICAgICAgICAgICBhY3Rpb24ucGFyYW1zLmRlZmVuY2U9YWN0aW9uLnBhcmFtcy5kZWZlbnNlO1xuICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbi50eXBlKTtcblxuICAgICAgICByZXR1cm4gbmV3IGFjdGlvbl9jbGFzcyhhY3Rpb24pO1xuICAgIH1cblxuXG5cblxuICAgIGNyZWF0ZUFjdGlvbkV4ZWN1dGUoYWN0aW9uX3R5cGUpe1xuXG4gICAgICAgIHZhciBnYW1lID0gdGhpcztcblxuICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb25fdHlwZSk7XG5cblxuICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uICguLi5hcmdzKXtcblxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KGdhbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcyxhcmdzKTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgIH1cblxuXG5cbiAgICBnZXRBY3Rpb25FbXB0eUluc3RhbmNlKGFjdGlvbl90eXBlKXtcblxuICAgICAgICB2YXIgYWN0aW9uX2luc3RhbmNlID0gdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uX2luc3RhbmNlPT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJythY3Rpb25fdHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4oYWN0aW9uX2luc3RhbmNlKTtcblxuXG4gICAgfVxuXG5cblxuICAgIC8qZ2V0QWN0aW9uRXhlY3V0ZShhY3Rpb25fa2V5KXtcblxuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25fY2xhc3Nlc1thY3Rpb25fa2V5XTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uPT0ndW5kZWZpbmVkJyl0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYWN0aW9uIHR5cGUgJythY3Rpb25fa2V5KycuJyk7XG5cbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG5cblxuICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gW2dhbWVdLnB1c2guY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlX2NhbGxiYWNrLmFwcGx5KHRoaXMsYXJncyk7XG5cbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgIH0qL1xuICAgIFxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZS5BY3Rpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5HYW1lLkFjdGlvbiA9IGNsYXNze1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbil7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUgPT09ICd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignWW91IG11c3QgZXh0ZW5kIFQuR2FtZS5BY3Rpb24gYW5kIGFkZCBtZXRob2QgZ2V0VHlwZSBiZWZvcmUgY3JlYXRpbmcgaW5zdGFuY2VzIScpO1xuXG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlKCk7XG5cbiAgICAgICAgaWYoYWN0aW9uLnR5cGUhPT10eXBlKXRocm93IG5ldyBFcnJvcignVGhpcyBpcyAnK3R5cGUrJyBub3QgJythY3Rpb24udHlwZSsnIGNsYXNzIScpO1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIGFjdGlvbil7XG4gICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IGFjdGlvbltrZXldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIHBhcmFtc1xuXG4gICAgICAgIC8qZm9yKHZhciBwYXJhbSBpbiBhY3Rpb25BYmlsaXR5LnBhcmFtcyl7XG4gICAgICAgICAgICB2YXIgcGFyYW1fdHlwZSA9IGFjdGlvbi5hYmlsaXR5X3BhcmFtc1twYXJhbV07XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBhY3Rpb25BYmlsaXR5LnBhcmFtc1twYXJhbV0hPT1wYXJhbV90eXBlKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtICcrcGFyYW0rJyBzaG91bGQgYmUgJytwYXJhbV90eXBlKycgaW5zdGVhZCBvZiAnK3R5cGVvZihhY3Rpb25BYmlsaXR5LmFiaWxpdHlfcGFyYW1zW3BhcmFtXSkrJyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbkFiaWxpdHkudHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSovXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgfVxuXG5cbiAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICByZXR1cm4oMCk7XG4gICAgfVxuXG5cbiAgICBnZXRQcmljZVJlc291cmNlcygpe1xuICAgICAgICByZXR1cm4oW10pO1xuICAgIH1cblxuXG5cbiAgICBzdGF0aWMgZXhlY3V0ZSgpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGV4ZWN1dGUgcGFzc2l2ZSBhY3Rpb24uJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbiBob3cgbWFueSBzZWNvbmRzIGNhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZD9cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNhbkJlRXhlY3V0ZWRJbigpe1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnBhcmFtcy5jb29sZG93bj09PSdudW1iZXInKXtcblxuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMubGFzdF91c2U9PT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcyA9IE1hdGguYWJzKHRoaXMubGFzdF91c2UgLSBuZXcgRGF0ZSgpKS8xMDAwO1xuXG4gICAgICAgICAgICBpZih0aGlzLnBhcmFtcy5jb29sZG93bjw9cyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuKDApO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuKHRoaXMucGFyYW1zLmNvb2xkb3duLXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICByZXR1cm4oMCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkIG5vdz9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5CZUV4ZWN1dGVkTm93KCl7XG4gICAgICAgIHJldHVybih0aGlzLmNhbkJlRXhlY3V0ZWRJbigpPT09MCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgYWN0dWFsIGRhdGUgYXMgZGF0ZSBvZiBleGVjdXRpb24gdGhpcyBhY3Rpb24gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBub3dFeGVjdXRlZCgpe1xuICAgICAgICB0aGlzLmxhc3RfdXNlPW5ldyBEYXRlKCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgaHRtbCBwcm9maWxlIG9mIGFjdGlvbiBhYmlsaXR5XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjcmVhdGVIdG1sUHJvZmlsZSgpe1xuXG4gICAgICAgIHZhciBodG1sPSc8dGFibGUgY2xhc3M9XCJhY3Rpb24tYWJpbGl0eS1wcm9maWxlXCI+JztcblxuICAgICAgICBodG1sKz1gXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIyXCI+YCsgVC5Mb2NhbGUuZ2V0KCdvYmplY3QnLCdhY3Rpb24nLHRoaXMudHlwZSkrYDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcblxuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmxhc3RfdXNlIT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5gKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsJ2FjdGlvbicsJ2xhc3RfdXNlZCcpK2A8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gK3RoaXMubGFzdF91c2UrYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZm9yKHZhciBwYXJhbSBpbiB0aGlzLnBhcmFtcyl7XG4gICAgICAgICAgICBodG1sKz1gXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywnYWN0aW9uJyx0aGlzLnR5cGUscGFyYW0pK2A8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gK3RoaXMucGFyYW1zW3BhcmFtXStgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG5cblxuICAgICAgICBodG1sKz0nPC90YWJsZT4nO1xuXG4gICAgICAgIHJldHVybihodG1sKTtcbiAgICB9XG5cbn07XG5cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5NYXBHZW5lcmF0b3IgPSBjbGFzc3tcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0WlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHpfbm9ybWFsaXppbmdfdGFibGVcbiAgICAgKiBAcGFyYW0ge1QuTWFwR2VuZXJhdG9yLkJpb3RvcGV9IGJpb3RvcGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ2V0Wix6X25vcm1hbGl6aW5nX3RhYmxlLGJpb3RvcGUsdmlydHVhbE9iamVjdEdlbmVyYXRvcil7XG5cbiAgICAgICAgdGhpcy5nZXRaID0gZ2V0WjtcbiAgICAgICAgdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlID0gel9ub3JtYWxpemluZ190YWJsZTtcbiAgICAgICAgdGhpcy5iaW90b3BlID0gYmlvdG9wZTtcbiAgICAgICAgdGhpcy52aXJ0dWFsT2JqZWN0R2VuZXJhdG9yID0gdmlydHVhbE9iamVjdEdlbmVyYXRvcjtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpe1xuXG4gICAgICAgIHZhciBtYXA9W107XG5cbiAgICAgICAgZm9yKHZhciB5PTA7eTw9cmFkaXVzKjI7eSsrKXtcblxuICAgICAgICAgICAgbWFwW3ldPVtdO1xuXG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PD1yYWRpdXMqMjt4Kyspe1xuXG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LXJhZGl1cysxLzIsMik+XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLmdldFooeC1yYWRpdXMrY2VudGVyX2ludGVnZXIueCx5LXJhZGl1cytjZW50ZXJfaW50ZWdlci55KTtcblxuXG4gICAgICAgICAgICAgICAgbWFwW3ldW3hdID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG1hcCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGVycmFpbk1hcChtYXApe1xuXG4gICAgICAgIHZhciBtYXBfYmc9W107XG5cbiAgICAgICAgZm9yKHZhciB5PTAsbD1tYXAubGVuZ3RoO3k8bDt5Kyspe1xuICAgICAgICAgICAgbWFwX2JnW3ldPVtdO1xuICAgICAgICAgICAgZm9yKHZhciB4PTA7eDxsO3grKyl7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YobWFwW3ldW3hdKT09PSd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbWFwX2JnW3ldW3hdID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKG1hcFt5XVt4XSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihtYXBfYmcpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0TWFwQXJyYXlDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKXtcblxuXG4gICAgICAgIHZhciBib3VuZHM9MTtcblxuXG4gICAgICAgIHZhciB6X21hcD10aGlzLmdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKTtcblxuICAgICAgICB2YXIgbWFwPXRoaXMudGVycmFpbk1hcCh6X21hcCk7XG5cbiAgICAgICAgcmV0dXJuKG1hcCk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBfYXJyYXlcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKXtcblxuICAgICAgICB2YXIgb2JqZWN0cz0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihtYXBfYXJyYXlbeV1beF0pID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihtYXBfYXJyYXlbeV1beF0pO1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3QueD1jZW50ZXJfaW50ZWdlci54LXJhZGl1cyt4O1xuICAgICAgICAgICAgICAgIG9iamVjdC55PWNlbnRlcl9pbnRlZ2VyLnktcmFkaXVzK3k7XG5cblxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihvYmplY3RzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UHVyZU1hcChjZW50ZXIscmFkaXVzLCBub3RfY2VudGVyPWZhbHNlKXtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNlbnRlcixub3RfY2VudGVyKTtcblxuICAgICAgICB2YXIgY2VudGVyX2ludGVnZXI9e1xuICAgICAgICAgICAgeDogTWF0aC5mbG9vcihjZW50ZXIueCksXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGNlbnRlci55KVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG5vdF9jZW50ZXIpXG4gICAgICAgIG5vdF9jZW50ZXI9e1xuICAgICAgICAgICAgeDogbm90X2NlbnRlci54LWNlbnRlcl9pbnRlZ2VyLngsXG4gICAgICAgICAgICB5OiBub3RfY2VudGVyLnktY2VudGVyX2ludGVnZXIueVxuICAgICAgICB9O1xuXG5cblxuICAgICAgICAvKnZhciBtYXBfYXJyYXkgPSB0aGlzLmdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG4gICAgICAgIHZhciBvYmplY3RzID0gdGhpcy5jb252ZXJ0TWFwQXJyYXlUb09iamVjdHMobWFwX2FycmF5LGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7LyoqL1xuXG5cbiAgICAgICAgdmFyIG9iamVjdHM9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICB2YXIgeCx5LHosdCxvYmplY3Q7XG4gICAgICAgIGZvcih5PTA7eTw9cmFkaXVzKjI7eSsrKXtcbiAgICAgICAgICAgIGZvcih4PTA7eDw9cmFkaXVzKjI7eCsrKXtcblxuXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHgtcmFkaXVzKzEvMiwyKStcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeS1yYWRpdXMrMS8yLDIpPlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsMilcbiAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmKG5vdF9jZW50ZXIpXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHgtbm90X2NlbnRlci54LXJhZGl1cysxLzIsMikrXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHktbm90X2NlbnRlci55LXJhZGl1cysxLzIsMik8PVxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsMilcbiAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIHogPSB0aGlzLmdldFooeC1yYWRpdXMrY2VudGVyX2ludGVnZXIueCx5LXJhZGl1cytjZW50ZXJfaW50ZWdlci55KTtcbiAgICAgICAgICAgICAgICB6ID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLmJpb3RvcGUuZ2V0WlRlcnJhaW4oeik7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHQpO1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0PSBuZXcgVC5PYmplY3RzLlRlcnJhaW4odCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lng9Y2VudGVyX2ludGVnZXIueC1yYWRpdXMreDtcbiAgICAgICAgICAgICAgICBvYmplY3QueT1jZW50ZXJfaW50ZWdlci55LXJhZGl1cyt5O1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4ob2JqZWN0cyk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULk9iamVjdHMuQXJyYXl9IG9iamVjdHNcbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMob2JqZWN0cyl7XG5cblxuICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gW107XG4gICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXcgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICBmb3IodmFyIGk9MCxsPW9iamVjdHNfMXgxX3Jhdy5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgIHRoaXMudmlydHVhbE9iamVjdEdlbmVyYXRvcihvYmplY3RzXzF4MV9yYXdbaV0sdmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICB9XG5cblxuXG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRlcnJhaW4gYW5kIHZpcnR1YWwgb2JqZWN0cyBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXIgRG9udCBnZXQgb2JqZWN0cyBuZWFyIHRoaXMgY2VudGVyLlxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9fVxuICAgICAqL1xuICAgIGdldENvbXBsZXRlT2JqZWN0cyhyZWFsX29iamVjdHMsY2VudGVyLHJhZGl1cyxuYXR1cmFsX29iamVjdHM9dHJ1ZSxub3RfY2VudGVyPWZhbHNlKXtcblxuXG5cbiAgICAgICAgdmFyIGNvbXBsZXRlX29iamVjdHMgPSB0aGlzLmdldFB1cmVNYXAoY2VudGVyLCByYWRpdXMsIG5vdF9jZW50ZXIpO1xuXG5cblxuICAgICAgICByZWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIGlmKG5hdHVyYWxfb2JqZWN0cyl7XG5cbiAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSB0aGlzLmdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlX29iamVjdHMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgcmV0dXJuKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgfVxuICAgIFxuXG5cbn07XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULk1hcEdlbmVyYXRvci5CaW90b3BlID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGVycmFpbnMpe1xuXG4gICAgICAgIHZhciBzdW09MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcbiAgICAgICAgICAgIHN1bSs9dGVycmFpbi5hbW91bnQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIGZyb209MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcblxuICAgICAgICAgICAgdGVycmFpbi5mcm9tPWZyb20vc3VtO1xuICAgICAgICAgICAgZnJvbSs9dGVycmFpbi5hbW91bnQ7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgIHRoaXMudGVycmFpbnMgPSB0ZXJyYWlucztcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gelxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgKi9cbiAgICBnZXRaVGVycmFpbih6KXtcblxuXG4gICAgICAgIGZvcih2YXIgaT10aGlzLnRlcnJhaW5zLmxlbmd0aC0xO2k+PTA7aS0tKXtcblxuICAgICAgICAgICAgaWYoeiA+PSB0aGlzLnRlcnJhaW5zW2ldLmZyb20gKSByZXR1cm4odGhpcy50ZXJyYWluc1tpXS50ZXJyYWluKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG5cbn07XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5NYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuLyoqXG4gKiBNYXRoZW1hdGljYWwgZnVuY3Rpb25zIHRvIFRvd25zXG4gKi9cblQuTWF0aD1jbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBzaWduKHgpIHsvL3RvZG8gTWF0aC5zaWduIHx8IHRoaXNcbiAgICAgICAgeCA9ICt4OyAvLyBjb252ZXJ0IHRvIGEgbnVtYmVyXG4gICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAqIEBwYXJhbSBudW1iZXJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBiYXNlTG9nKGJhc2UsIG51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5sb2cobnVtYmVyKSAvIE1hdGgubG9nKGJhc2UpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBDdXRzIHVubGVzcyBkaWdpdHMgdG8gemVyb1xuICAgICAqL1xuICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyLG51bWJlcl9vZl9ub25femVyb19kaWdpdHMpe1xuXG4gICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgdmFyIGRpZ2l0cz1NYXRoLmNlaWwoVC5NYXRoLmJhc2VMb2coMTAsbnVtYmVyKSk7XG4gICAgICAgIHZhciBrID0gTWF0aC5wb3coMTAsbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cy1kaWdpdHMpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZGlnaXRzLGspO1xuXG5cbiAgICAgICAgbnVtYmVyPW51bWJlciprO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG51bWJlcik7XG4gICAgICAgIG51bWJlcj1NYXRoLnJvdW5kKG51bWJlcik7XG4gICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgbnVtYmVyPW51bWJlci9rO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICByZXR1cm4gbnVtYmVyO1xuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEaWZmZXJlbmNlIGJldHdlZW4gdHdvIGFuZ2VsZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVnMlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYW5nbGVEaWZmKGRlZzEsZGVnMil7XG4gICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMiklMzYwO1xuICAgICAgICBpZihkZWc+MTgwKWRlZz0zNjAtZGVnO1xuICAgICAgICByZXR1cm4oZGVnKTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaWFuc1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAqL1xuICAgIHN0YXRpYyByYWQyZGVnKHJhZGlhbnMpe1xuICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwL01hdGguUEkpKSUzNjA7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzKXtcbiAgICAgICAgcmV0dXJuKGRlZ3JlZXMlMzYwICogKE1hdGguUEkvMTgwKSk7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gZGlzdGFuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgeHkyZGlzdCh4LHkpe1xuICAgICAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KHgsMikrTWF0aC5wb3coeSwyKSkpO1xuICAgIH1cblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvL3RvZG8gcmVmYWN0b3IgdG8gcG9zaXRpb25cbiAgICBzdGF0aWMgeHkyZGlzdERlZyh4LHkpe1xuXG4gICAgICAgIHZhciBvdXRwdXQ9e307XG5cbiAgICAgICAgb3V0cHV0LmRpc3QgPSB0aGlzLnh5MmRpc3QoeCx5KTtcbiAgICAgICAgb3V0cHV0LmRlZyA9IHRoaXMucmFkMmRlZyhNYXRoLmF0YW4yKHkseCkpO1xuXG4gICAgICAgIHJldHVybihvdXRwdXQpO1xuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvL3RvZG8gcmVmYWN0b3IgdG8gcG9zaXRpb25cbiAgICBzdGF0aWMgZGlzdERlZzJ4eShkaXN0LGRlZyl7XG5cbiAgICAgICAgdmFyIHJhZD10aGlzLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICB2YXIgb3V0cHV0PXt9O1xuXG4gICAgICAgIG91dHB1dC54ID0gTWF0aC5jb3MocmFkKSpkaXN0O1xuICAgICAgICBvdXRwdXQueSA9IE1hdGguc2luKHJhZCkqZGlzdDtcblxuICAgICAgICByZXR1cm4ob3V0cHV0KTtcblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy90b2RvIG15YmUgcmVmYWN0b3IgdG8gcG9zaXRpb25cbiAgICBzdGF0aWMgeHlSb3RhdGUoeCx5LGRlZyl7XG5cbiAgICAgICAgLy9uZXZ5dXppdmFtIGZ1bmtjZSBUb3ducy5BLnh5MmRpc3REZWcgYSBBLmRpc3REZWcyeHksIGFieWNoIG5lZGVsYWwgemJ5dGVjbnkgcHJldm9kIGRvIHN0dXBudSBhIHNwYXRreVxuICAgICAgICB2YXIgZGlzdCA9IHRoaXMueHkyZGlzdCh4LHkpO1xuICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LHgpO1xuXG4gICAgICAgIHJhZCArPSB0aGlzLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICB2YXIgb3V0cHV0PXt9O1xuICAgICAgICBvdXRwdXQueCA9IE1hdGguY29zKHJhZCkqZGlzdDtcbiAgICAgICAgb3V0cHV0LnkgPSBNYXRoLnNpbihyYWQpKmRpc3Q7XG5cbiAgICAgICAgcmV0dXJuKG91dHB1dCk7XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgc3RhdGljIHJhbmRvbVNlZWRQb3NpdGlvbihzZWVkLHBvc2l0aW9uKXtcblxuXG4gICAgICAgIHJldHVybiAoTWF0aC5zaW4oTWF0aC5wb3coKHBvc2l0aW9uLngqcG9zaXRpb24ueSktc2VlZCwyKSkrMSkvMjtcblxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZSxkZWZ2YWwpe1xuXG4gICAgICAgIGlmKHR5cGVvZiBkZWZ2YWwgPT09ICd1bmRlZmluZWQnKWRlZnZhbD0wO1xuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09J3VuZGVmaW5lZCcpcmV0dXJuKGRlZnZhbCk7XG5cbiAgICAgICAgdmFsdWU9cGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIGlmKGlzTmFOKHZhbHVlKSl7XG4gICAgICAgICAgICByZXR1cm4oZGVmdmFsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4odmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBpbnRlZ2VyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZ2YWxcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIHRvSW50KHZhbHVlLGRlZnZhbCl7XG5cbiAgICAgICAgaWYodHlwZW9mKHZhbHVlKT09PSd1bmRlZmluZWQnKXJldHVybihkZWZ2YWwpO1xuXG4gICAgICAgIHZhbHVlPXBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgaWYoaXNOYU4odmFsdWUpKXtcbiAgICAgICAgICAgIHJldHVybihkZWZ2YWwpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybih2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIGJvdW5kcyh2YWx1ZSxtaW4sbWF4KXtcblxuICAgICAgICBpZih2YWx1ZTxtaW4pcmV0dXJuIG1pbjtcbiAgICAgICAgaWYodmFsdWU+bWF4KXJldHVybiBtYXg7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSXMgcG9pbnRbYjF4LGIxeV0gY29sbGlkaW5nIGxpbmU/XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGExeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzT25MaW5lKGExeCxhMXksYTJ4LGEyeSxiMXgsYjF5KSB7XG5cbiAgICAgICAgYTJ4LT1hMXg7XG4gICAgICAgIGEyeS09YTF5O1xuXG4gICAgICAgIGIxeC09YTF4O1xuICAgICAgICBiMXktPWExeTtcblxuXG5cbiAgICAgICAgdmFyIGFTbG9wZT1hMnkvYTJ4O1xuICAgICAgICB2YXIgYlNsb3BlPWIxeS9iMXg7XG5cblxuICAgICAgICBpZihhU2xvcGUhPWJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICB2YXIgYURpc3QgPSB0aGlzLnh5MmRpc3QoYTJ5LGEyeCk7XG4gICAgICAgIHZhciBiRGlzdCA9IHRoaXMueHkyZGlzdChiMXksYjF4KTtcblxuICAgICAgICByZXR1cm4gKGFEaXN0Pj1iRGlzdCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGExeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIyeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeCxhMXksYTJ4LGEyeSxiMXgsYjF5LGIyeCxiMnkpe1xuXG5cblxuXG4gICAgICAgIHZhciBkZW5vbWluYXRvciA9ICgoYTJ4IC0gYTF4KSAqIChiMnkgLSBiMXkpKSAtICgoYTJ5IC0gYTF5KSAqIChiMnggLSBiMXgpKTtcbiAgICAgICAgdmFyIG51bWVyYXRvcjEgPSAoKGExeSAtIGIxeSkgKiAoYjJ4IC0gYjF4KSkgLSAoKGExeCAtIGIxeCkgKiAoYjJ5IC0gYjF5KSk7XG4gICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICB2YXIgY29sbGlzaW9uO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZGVub21pbmF0b3IsbnVtZXJhdG9yMSxudW1lcmF0b3IyKTtcblxuICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKXtcblxuICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAvL2NvbGxpc2lvbj1mYWxzZTtcblxuICAgICAgICAgICAgdmFyIGJPbkEgPSB0aGlzLmlzT25MaW5lKGExeCxhMXksYTJ4LGEyeSxiMXgsYjF5KTtcbiAgICAgICAgICAgIHZhciBhT25CID0gdGhpcy5pc09uTGluZShiMXgsYjF5LGIyeCxiMnksYTF4LGExeSk7XG5cbiAgICAgICAgICAgIHJldHVybihiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHZhciByID0gbnVtZXJhdG9yMSAvIGRlbm9taW5hdG9yO1xuICAgICAgICAgICAgdmFyIHMgPSBudW1lcmF0b3IyIC8gZGVub21pbmF0b3I7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbj0oKHIgPj0gMCAmJiByIDw9IDEpICYmIChzID49IDAgJiYgcyA8PSAxKSk7XG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgLyp2YXIgc2l6ZT01MDtcbiAgICAgICAgIHZhciBzcmM9Y3JlYXRlQ2FudmFzVmlhRnVuY3Rpb25BbmRDb252ZXJ0VG9TcmMoXG4gICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgLy9jdHguc3Ryb2tlV2lkdGggPSAyO1xuXG4gICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICBjdHgubW92ZVRvKGExeCtzaXplLGExeStzaXplKTtcbiAgICAgICAgIGN0eC5saW5lVG8oYTJ4K3NpemUsYTJ5K3NpemUpO1xuICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG5cbiAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgY3R4LmxpbmVUbyhiMngrc2l6ZSxiMnkrc2l6ZSk7XG4gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgIH1cblxuXG4gICAgICAgICApO1xuICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgIH1cblxuXG5cblxuXG4gICAgc3RhdGljIGJsdXJYWShnZW5lcmF0b3IsYmx1cikge1xuXG4gICAgICAgIHJldHVybihmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgICAgICAgIHZhciB4eCx5eTtcblxuICAgICAgICAgICAgZm9yICh4eCA9IHggLSBibHVyOyB4eCA8PSB4ICsgYmx1cjsgeHgrKykge1xuXG4gICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnBvdyhibHVyLCAyKSA8IE1hdGgucG93KHh4IC0geCwgMikgKyBNYXRoLnBvdyh5eSAtIHksIDIpKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBnZW5lcmF0b3IoeHgsIHl5KTtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuXG5cbiAgICBzdGF0aWMgYnl0ZXNUb1NpemUoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNpemVzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XG4gICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgIHZhciBpID0gcGFyc2VJbnQoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChieXRlcyAvIE1hdGgucG93KDEwMjQsIGkpLCAyKSArICcnICsgc2l6ZXNbaV07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhX3N0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9lbmRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYl9zdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQsYV9wb3NpdGlvbixhX2VuZCxiX3N0YXJ0LGJfZW5kKXtcblxuXG4gICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQtYV9zdGFydDtcbiAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZC1iX3N0YXJ0O1xuXG4gICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZC1hX3Bvc2l0aW9uO1xuICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUqYV9wYXJ0KS9hX3dob2xlO1xuXG4gICAgICAgIHJldHVybihiX2VuZC1iX3BhcnQpO1xuXG5cbiAgICB9XG5cbiAgICBcbiAgICBcbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1vZGVsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Nb2RlbCA9IGNsYXNze1xuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsIGpzb25cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZSBpbiBjYXNlIG9mIGZhaWxcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihqc29uKXtcblxuICAgICAgICBpZih0eXBlb2YoanNvbik9PSd1bmRlZmluZWQnKXJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLm5hbWU9anNvbi5uYW1lO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcz1qc29uLnBhcnRpY2xlcztcbiAgICAgICAgdGhpcy5yb3RhdGlvbj1qc29uLnJvdGF0aW9uO1xuICAgICAgICB0aGlzLnNpemU9anNvbi5zaXplO1xuXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnJvdGF0aW9uKT09J3VuZGVmaW5lZCcpdGhpcy5yb3RhdGlvbj0wO1xuICAgICAgICBpZih0eXBlb2YodGhpcy5zaXplKT09J3VuZGVmaW5lZCcpdGhpcy5zaXplPTE7XG4gICAgfVxuXG5cbiAgICBjbG9uZSAoKXtcbiAgICAgICAgcmV0dXJuKG5ldyBULk1vZGVsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3RhdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICovXG4gICAgYWRkUm90YXRpb25TaXplKHJvdGF0aW9uLHNpemUpe1xuXG4gICAgICAgIGlmKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb249MDtcbiAgICAgICAgaWYodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemU9MTtcblxuICAgICAgICB0aGlzLnJvdGF0aW9uKz1yb3RhdGlvbjtcbiAgICAgICAgdGhpcy5zaXplPXRoaXMuc2l6ZSpzaXplO1xuXG4gICAgfVxuXG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGltZW5zaW9uIHgseSx6LHh5XG4gICAgICogQHJldHVybiB7bnVtYmVyfSByYW5nZVxuICAgICAqL1xuICAgIHJhbmdlKGRpbWVuc2lvbil7XG5cbiAgICAgICAgaWYoZGltZW5zaW9uPT0neHknKXtcblxuICAgICAgICAgICAgcmV0dXJuIFQuTWF0aC54eTJkaXN0KHRoaXMucmFuZ2UoJ3gnKSx0aGlzLnJhbmdlKCd5JykqdGhpcy5zaXplKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyPXRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cbiAgICAgICAgdmFyIG1heD1mYWxzZSxtaW49ZmFsc2UsbWF4XyxtaW5fO1xuICAgICAgICBmb3IodmFyIGkgaW4gcGFydGljbGVzTGluZWFyKXtcblxuXG4gICAgICAgICAgICBtaW5fPXBhcnRpY2xlc0xpbmVhcltpXS5wb3NpdGlvbltkaW1lbnNpb25dO1xuICAgICAgICAgICAgbWF4Xz1wYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXStwYXJ0aWNsZXNMaW5lYXJbaV0uc2l6ZVtkaW1lbnNpb25dO1xuXG4gICAgICAgICAgICAvL3RvZG8gZmVhdHVyZSByZXZlcnNlXG5cbiAgICAgICAgICAgIGlmKG1heD09PWZhbHNlKW1heD1tYXhfO1xuICAgICAgICAgICAgaWYobWluPT09ZmFsc2UpbWluPW1pbl87XG5cblxuICAgICAgICAgICAgaWYobWF4Xz5tYXgpbWF4PW1heF87XG4gICAgICAgICAgICBpZihtaW5fPG1pbiltaW49bWluXztcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4oTWF0aC5hYnMobWluLW1heCkvKnRoaXMuc2l6ZSovKTsvL3RvZG8gcm90YXRpb25cblxuXG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV96XG4gICAgICovXG4gICAgbW92ZUJ5KG1vdmVfeCxtb3ZlX3ksbW92ZV96KXtcblxuICAgICAgICBpZih0eXBlb2YgbW92ZV94ID09PSAndW5kZWZpbmVkJyltb3ZlX3g9MDtcbiAgICAgICAgaWYodHlwZW9mIG1vdmVfeSA9PT0gJ3VuZGVmaW5lZCcpbW92ZV95PTA7XG4gICAgICAgIGlmKHR5cGVvZiBtb3ZlX3ogPT09ICd1bmRlZmluZWQnKW1vdmVfej0wO1xuXG4gICAgICAgIGZvcih2YXIgaSBpbiB0aGlzLnBhcnRpY2xlcyl7XG5cblxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCs9bW92ZV94O1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSs9bW92ZV95O1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueis9bW92ZV96O1xuXG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gWiBvZiBqb2luaW5nIG1vZGVsXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgKi9cbiAgICBqb2luTW9kZWxaKG1vZGVsLG1vdmVfeCxtb3ZlX3kpey8vdG9kbyBzZWNvbmQgcGFyYW0gc2hvdWxkIGJlIHBvc2l0aW9uXG5cbiAgICAgICAgLy92YXIgIG1vZGVsXz1kZWVwQ29weU1vZGVsKG1vZGVsKTtcbiAgICAgICAgLy9tb2RlbF8ubW92ZUJ5KG1vdmVfeCxtb3ZlX3kpOy8vdG9kbyBtYXliZSBkZWxldGUgbW92ZUJ5XG5cbiAgICAgICAgLy92YXIgbWF4X3o9dGhpcy5yYW5nZSgneicpO1xuXG5cbiAgICAgICAgdmFyIHRoaXNfbGluZWFyX3BhcnRpY2xlcz10aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuICAgICAgICB2YXIgbW9kZWxfbGluZWFyX3BhcnRpY2xlcz1tb2RlbC5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuXG4gICAgICAgIHZhciBkaXN0YW5jZXM9WzBdO1xuICAgICAgICBmb3IodmFyIGkgaW4gbW9kZWxfbGluZWFyX3BhcnRpY2xlcyl7XG5cbiAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCs9bW92ZV94O1xuICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi55Kz1tb3ZlX3k7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaWkgaW4gdGhpc19saW5lYXJfcGFydGljbGVzKXsvL3RvZG8gbWF5YmUgb3B0aW1pemUgYnkgcHJlLXNvcnRpbmdcblxuXG4gICAgICAgICAgICAgICAgaWYoUGFydGljbGVzLmNvbGxpc2lvbjJEKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXSkpe1xuXG4gICAgICAgICAgICAgICAgICAgIHIodGhpc19saW5lYXJfcGFydGljbGVzW2lpXSxtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlcy5wdXNoKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0ucG9zaXRpb24ueit0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLnNpemUueik7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXhfej1NYXRoLm1heC5hcHBseShNYXRoLGRpc3RhbmNlcyk7XG5cbiAgICAgICAgcmV0dXJuIG1heF96O1xuXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqIEpvaW4gbW9kZWxzIHRvZ2V0aGVyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgKi9cbiAgICBqb2luTW9kZWwobW9kZWwsbW92ZV94LG1vdmVfeSl7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICB2YXIgbWF4X3o9dGhpcy5qb2luTW9kZWxaKG1vZGVsLG1vdmVfeCxtb3ZlX3kpO1xuXG5cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXM9W1xuICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSksXG4gICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsKSlcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLnBhcnRpY2xlc1sxXS5wb3NpdGlvbj17XG4gICAgICAgICAgICB4Om1vdmVfeCxcbiAgICAgICAgICAgIHk6bW92ZV95LFxuICAgICAgICAgICAgejptYXhfelxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucm90YXRpb249MDtcbiAgICAgICAgdGhpcy5zaXplPTE7XG5cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBEZWVwIGNvcHkgdGhpcyBhbmQgY29udmVydHMgbGlua3MgdG8gcmF3IGRhdGFcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBNb2RlbFxuICAgICAqL1xuICAgIGdldERlZXBDb3B5V2l0aG91dExpbmtzKCkge1xuXG5cbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5jbG9uZSgpO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBsaW5rcyB0byByYXcgZGF0YVxuXG5cbiAgICAgICAgdmFyIGZpbmRQYXJ0aWNsZUJ5TmFtZSA9IGZ1bmN0aW9uKHBhcnRpY2xlcywgbmFtZSkgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnRpY2xlc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChwYXJ0aWNsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBhcnRpY2xlcykhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5kZWRfcGFydGljbGUgPSBmaW5kUGFydGljbGVCeU5hbWUocGFydGljbGVzW2ldLnBhcnRpY2xlcywgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmRlZF9wYXJ0aWNsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZmluZGVkX3BhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIHZhciBwYXJ0aWNsZXNMaW5rcyA9IGZ1bmN0aW9uKHBhcnRpY2xlcykgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG5cbiAgICAgICAgICAgIC8vcihwYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHBhcnRpY2xlcykge1xuXG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkxpbmtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5saW5rKSE9J3VuZGVmaW5lZCcpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rZWRfcGFydGljbGUgPSBmaW5kUGFydGljbGVCeU5hbWUobW9kZWwucGFydGljbGVzLCBwYXJ0aWNsZXNbaV0ubGluayk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZF9wYXJ0aWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaW5rICcgKyBwYXJ0aWNsZS5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGlua2VkX3BhcnRpY2xlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucm90YXRpb24pIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGVzW2ldLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnNpemUpIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZXNbaV0uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wb3NpdGlvbikhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUucG9zaXRpb24gPSBwYXJ0aWNsZXNbaV0ucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy90b2RvIHNrZXdcblxuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc1tpXSA9IGxpbmtlZF9wYXJ0aWNsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Hcm91cFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBhcnRpY2xlcykhPSd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGlua3MocGFydGljbGVzW2ldLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIHBhcnRpY2xlc0xpbmtzKG1vZGVsLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgcmV0dXJuKG1vZGVsKTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCAxRCBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAqL1xuICAgIGdldExpbmVhclBhcnRpY2xlcyhpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplPWZhbHNlKXtcblxuXG4gICAgICAgIHZhciBwYXJ0aWNsZXNMaW5lYXI9W107XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db252ZXJ0IHBhcnRpY2xlcyB0byAxRCBwYXJ0aWNsZXNcblxuICAgICAgICB2YXIgcGFydGljbGVzMkxpbmVhciA9IGZ1bmN0aW9uKHBhcnRpY2xlcyxwb3NpdGlvbixyb3RhdGlvbixzaXplKXsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuICAgICAgICAgICAgaWYodHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJylwb3NpdGlvbj1mYWxzZTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb249MDtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplPTE7XG5cblxuICAgICAgICAgICAgaWYocG9zaXRpb249PT1mYWxzZSl7XG4gICAgICAgICAgICAgICAgcG9zaXRpb249e1xuICAgICAgICAgICAgICAgICAgICB4OjAsXG4gICAgICAgICAgICAgICAgICAgIHk6MCxcbiAgICAgICAgICAgICAgICAgICAgejowXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24ocGFydGljbGUpe1xuXG4gICAgICAgICAgICAgICAgLy9wYXJ0aWNsZT1kZWVwQ29weShwYXJ0aWNsZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5EZWZhdWx0IHBhcmFtcyBvZiBwYXJ0aWNsZSwgZ3JvdXAgb3IgbGlua1xuICAgICAgICAgICAgICAgIGlmKCFwYXJ0aWNsZS5wb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHo6MFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUucm90YXRpb24pPT0ndW5kZWZpbmVkJylwYXJ0aWNsZS5yb3RhdGlvbj0wO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihwYXJ0aWNsZS5zaXplKT09J3VuZGVmaW5lZCcpcGFydGljbGUuc2l6ZT0xO1xuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flBvc2l0aW9uLCBSb3RhdGlvbiBhbmQgc2l6ZSAvL3RvZG8gc2tld1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3REZWcgPSBULk1hdGgueHkyZGlzdERlZyhwYXJ0aWNsZS5wb3NpdGlvbi54LCBwYXJ0aWNsZS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgICAgIGRpc3REZWcuZGlzdCA9IGRpc3REZWcuZGlzdCAqIHNpemU7XG4gICAgICAgICAgICAgICAgZGlzdERlZy5kZWcgKz0gcm90YXRpb247XG5cbiAgICAgICAgICAgICAgICB2YXIgeHkgPSBULk1hdGguZGlzdERlZzJ4eShkaXN0RGVnLmRpc3QsIGRpc3REZWcuZGVnKTtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHh5Lng7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHh5Lnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9IHBhcnRpY2xlLnBvc2l0aW9uLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ICs9IHBvc2l0aW9uLno7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGFydGljbGUuc2l6ZSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZS5zaXplICogc2l6ZTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueCA9IHBhcnRpY2xlLnNpemUueCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueSA9IHBhcnRpY2xlLnNpemUueSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueiA9IHBhcnRpY2xlLnNpemUueiAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QYXJ0aWNsZVxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihwYXJ0aWNsZS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihwYXJ0aWNsZS5wYXJ0aWNsZXMscGFydGljbGUucG9zaXRpb24scGFydGljbGUucm90YXRpb24scGFydGljbGUuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR3JvdXBcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUuc2hhcGUpIT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGluZWFyLnB1c2gocGFydGljbGUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vZGVsPXRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcblxuICAgICAgICBpZihpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplKXtcblxuICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsZmFsc2UsMCwxKTtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsZmFsc2UsbW9kZWwucm90YXRpb24sbW9kZWwuc2l6ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIHN0cmljdCBtb2RlLy9kZWxldGUgbW9kZWw7XG5cbiAgICAgICAgcmV0dXJuKHBhcnRpY2xlc0xpbmVhcik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgKi9cbiAgICBmaWx0ZXJQYXRoKHBhdGgpe1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzO1xuXG4gICAgICAgIGlmKHR5cGVvZihwYXRoLmZvckVhY2gpPT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLnBhcnRpY2xlc1tpXTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAqL1xuICAgIGZpbHRlclBhdGhTaWJsaW5ncyhwYXRoKXtcblxuICAgICAgICB2YXIgbW9kZWw9dGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuICAgICAgICB2YXIgY3VycmVudD1tb2RlbDtcblxuICAgICAgICBpZih0eXBlb2YocGF0aC5mb3JFYWNoKT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlX2kscGF0aF9paSl7XG5cbiAgICAgICAgICAgIC8qaWYocGF0aF9paTxwYXRoLmxlbmd0aC0xKXtcblxuICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgIH1lbHNleyovXG5cbiAgICAgICAgICAgIHZhciBtZSA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICBjdXJyZW50LnBhcnRpY2xlcyA9IFttZV07XG5cbiAgICAgICAgICAgIGN1cnJlbnQ9bWU7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybihtb2RlbCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFnZ3JlZ2F0ZSB2b2x1bWUgb2YgZWFjaCByZXNvdXJjZSB1c2VkIGluIG1vZGVsXG4gICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAqL1xuICAgIGFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKXtcblxuXG4gICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG5cblxuICAgICAgICB2YXIgbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICBsaW5lYXJfcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24obGluZWFyX3BhcnRpY2xlKXtcblxuICAgICAgICAgICAgdmFyIHZvbHVtZT0vL3RvZG8gYWxsIHNoYXBlc1xuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnggKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnkgKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciBtYXRlcmlhbD1saW5lYXJfcGFydGljbGUubWF0ZXJpYWwuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIG1hdGVyaWFsPW1hdGVyaWFsWzBdO1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfPXt9O1xuICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXT12b2x1bWU7XG5cbiAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coJ3ByaWNlIG9mJyk7XG4gICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgY29uc29sZS5sb2cocHJpY2UpOyovXG5cbiAgICAgICAgLy9wcmljZS5tdWx0aXBseSgwLjAxKTtcblxuICAgICAgICByZXR1cm4ocHJpY2UpO1xuXG5cbiAgICB9XG5cblxuXG5cbiAgICBnZXRIYXNoKCl7XG4gICAgICAgIHJldHVybiAneHh4JytKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICB9XG5cblxuICAgIFxuICAgIFxuXG59O1xuXG4iLCIvKipcbiAqIEBhdXRob3IgVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5Nb2RlbC5QYXJ0aWNsZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuLyoqXG4gKiBNb2RlbCBQYXJ0aWNsZXNcbiAqL1xuVC5Nb2RlbC5QYXJ0aWNsZXMgPSBjbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKSB7Ly90b2RvID8/IG1heWJlIHJlbmFtZVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldy56ID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS50b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS50b3AgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUucm90YXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHBhcnRpY2xlKTtcblxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICBzdGF0aWMgZ2V0VHJpYW5nbGVzKHBhcnRpY2xlLHBvaW50X2NsYXNzKXtcblxuICAgICAgICB2YXIgdHJpYW5nbGVzID1bXTtcblxuICAgICAgICBwYXJ0aWNsZT10aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5NYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5NYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gobmV3IHBvaW50X2NsYXNzKHhfXyx5X18sel9fKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZXNvdXJjZS5wb2ludHMucHVzaChbeCArIHhfXywgeSArIHlfXywgeiArIHpfX10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogR2V0IDNEIG1vZGVsIGZyb20gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICovXG4gICAgc3RhdGljIGdldDNEKHBhcnRpY2xlKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0ge307XG5cbiAgICAgICAgcGFydGljbGU9dGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG5cbiAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAvL3IocGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucyA9IFtbXSwgW11dO1xuICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRCA9IFtbXSwgW11dO1xuICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVhZWiByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXMocGFydGljbGUuc2hhcGUucm90YXRlZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5NYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5NYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULk1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULk1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqL1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IDJEIGxpbmVzIGZyb20gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJhc2UgMD1ib3R0b20sIDE9dG9wXG4gICAgICogQHJldHVybiB7QXJyYXl9IDJEIGxpbmVzXG4gICAgICovXG4gICAgc3RhdGljIGdldDJEbGluZXMocGFydGljbGUsIGJhc2UpIHtcblxuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IHRoaXMuZ2V0M0QocGFydGljbGUpO1xuXG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xuXG4gICAgICAgIHZhciBwb2x5Z29uczJEID0gW3Jlc291cmNlLnBvbHlnb25zMkRbYmFzZV1dO1xuXG4gICAgICAgIGZvciAodmFyIHBuIGluIHBvbHlnb25zMkQpIHtcblxuICAgICAgICAgICAgLypsaW5lc1twbl09W107XG5cbiAgICAgICAgICAgICBmb3IodmFyIHB0IGluIHJlc291cmNlLnBvbHlnb25zW3BuXSkge1xuXG4gICAgICAgICAgICAgdmFyIHBvaW50ID0gcmVzb3VyY2UucG9pbnRzW3Jlc291cmNlLnBvbHlnb25zW3BuXVtwdF0gLSAxXTtcbiAgICAgICAgICAgICBsaW5lc1twbl1bcHNdID0gW3BvaW50WzBdLCBwb2ludFsxXV07XG5cbiAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgdmFyIHBvaW50MSwgcG9pbnQyO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gLTEsIGwgPSBwb2x5Z29uczJEW3BuXS5sZW5ndGg7IGkgPCBsIC0gMTsgaSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIGlmIChpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gbCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBwb2ludDIgPSBpICsgMTtcblxuXG4gICAgICAgICAgICAgICAgLy9yKHJlc291cmNlLnBvbHlnb25zW3BuXSxwb2ludDEpO1xuXG4gICAgICAgICAgICAgICAgcG9pbnQxID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50MV0gLSAxXTtcbiAgICAgICAgICAgICAgICBwb2ludDIgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQyXSAtIDFdO1xuXG5cbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQxWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQyWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQyWzFdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vcihsaW5lcyk7XG5cbiAgICAgICAgcmV0dXJuIChsaW5lcyk7XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLy90b2RvIG1heWJlIHJlZmFjdG9yIG1vdmUgdG8gTWF0aFxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIDJEIGxpbmVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YXJyYXl9IGxpbmVzMVxuICAgICAqIEBwYXJhbSAoYXJyYXkpIGxpbmVzMlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaTEgaW4gbGluZXMxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpMiBpbiBsaW5lczIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChULk1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueVxuICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yKCdjb2xsaXNpb24yRCBpcyB0cnVlJywgcGFydGljbGUxLCBwYXJ0aWNsZTIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIHBhcnRpY2xlc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAqIEBwYXJhbSAob2JqZWN0KSBwYXJ0aWNsZTIgdG9wXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY29sbGlzaW9uMkQocGFydGljbGUxLCBwYXJ0aWNsZTIpIHtcblxuXG4gICAgICAgIHZhciBsaW5lczEgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTEsIDEpO1xuICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db3JuZXIgY29sbGlzaW9uXG5cblxuICAgICAgICB2YXIgY29sbGlzaW9uID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgLyoqL1xuICAgICAgICBpZiAoIWNvbGxpc2lvbikge1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBrID0gMTAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIG91dGVyLCBpbm5lcjtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3ggPSBpbm5lclsxXS54IC0gaW5uZXJbMF0ueDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl95ID0gaW5uZXJbMV0ueSAtIGlubmVyWzBdLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueSAtPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueCArPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlubmVyMSA9IFtpbm5lcjFdO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjIgPSBbaW5uZXIyXTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjIgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIyLCBvdXRlcik7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uMSAmJiBjb2xsaXNpb24yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSgpO1xuXG5cbiAgICAgICAgfVxuICAgICAgICAvKiovXG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWJ1ZyBURERcbiAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lc189W2xpbmVzMSxsaW5lczJdO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGxpbmVzXyl7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9IDAsbD1saW5lc19ba2V5XS5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhsaW5lc19ba2V5XVtpXVswXS54K3NpemUsbGluZXNfW2tleV1baV1bMF0ueStzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhsaW5lc19ba2V5XVtpXVsxXS54K3NpemUsbGluZXNfW2tleV1baV1bMV0ueStzaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgKTtcbiAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbWcgc3JjPVwiJytzcmMrJ1wiIGJvcmRlcj0nKyhjb2xsaXNpb24/MjowKSsnPicpOy8qKi9cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgfVxuXG59OyIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQXJyYXlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4vL3RvZG8gVC5PYmplY3RzLkFycmF5ID0gY2xhc3MgZXh0ZW5kcyBBcnJheXtcblxuXG4gICAgZXhwb3J0IGNsYXNzIEFycmF5IHtcblxuXG4gICAgICAgIHB1YmxpYyBvYmplY3RzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmplY3RzXG4gICAgICAgICAqIHRvZG8gPz8/Pz8/Pz8/IEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0cz1bXSkge1xuXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMgPSBvYmplY3RzLm1hcChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEFsbCgpOkFycmF5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZpbHRlcihjYWxsYmFjayk6VC5PYmplY3RzLkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIC8vcihmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMpO1xuXG4gICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuZmlsdGVyKGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQdXNoIG5ldyBvYmplY3QgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHB1c2gob2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLnB1c2goVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlIG9yIHB1c2ggb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGUob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0QnlJZChvYmplY3QuaWQsIG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QnlJZChpZCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ2dldEJ5SWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKXJldHVybiB0aGlzLm9iamVjdHNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzZXRCeUlkKGlkLCBvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdzZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXSA9IFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcigncmVtb3ZlSWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclR5cGVzKC4uLnR5cGVzKSB7XG5cblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihvYmplY3QudHlwZSkgPT0gLTEpcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUmFkaXVzKGNlbnRlciwgcmFkaXVzKSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGNlbnRlcikgPD0gcmFkaXVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXJBcmVhKGFyZWE6QXJlYSkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChhcmVhLmlzQ29udGFpbmluZyhvYmplY3QuZ2V0UG9zaXRpb24oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKSB7Ly90b2RvIG1heWJlIHJlZmFjdG9yIHRvIGdldFRlcnJhaW5Db2RlczJEQXJyYXkgb3IgZ2V0VGVycmFpbkNvZGVzTWFwXG5cbiAgICAgICAgICAgIC8qdmFyIHJhZGl1cyA9IHNpemUvMjtcbiAgICAgICAgICAgICB2YXIgY2VudGVyID17XG4gICAgICAgICAgICAgeDogdG9wbGVmdC54K3JhZGl1cyxcbiAgICAgICAgICAgICB5OiB0b3BsZWZ0LnkrcmFkaXVzXG4gICAgICAgICAgICAgfTsqL1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DcmVhdGUgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIHZhciBtYXBfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKTsvLy5zbGljZSgpLnJldmVyc2UoKTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7Ly90b2RvIGlzIHRoaXMgb3B0aW1hbGl6YXRpb24gZWZmZWN0aXZlP1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB5IDwgcmFkaXVzICogMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA8IHJhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzICsgb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhjID0gb2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHljID0gb2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cztcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldW3hdID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuTWF0aC54eTJkaXN0KHggLSB4YywgeSAtIHljKSA8PSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIG1hcF9hcnJheTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0MXgxVGVycmFpbk9iamVjdHMoKSB7XG5cblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c18xeDEgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCkuc2xpY2UoKS5yZXZlcnNlKCk7Ly9ub3JtYWwgQXJyYXlcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIGJsb2NrZWRfcG9zaXRpb25zID0ge307XG4gICAgICAgICAgICB2YXIgb2JqZWN0XzF4MSwga2V5O1xuXG5cbiAgICAgICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRlcnJhaW5fb2JqZWN0c19yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gdGVycmFpbl9vYmplY3RzX3Jhd1tpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEgPSBvYmplY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLngpICsgJ3knICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB5X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5X3RvID0gTWF0aC5jZWlsKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuTWF0aC54eTJkaXN0KHgsIHkpIDw9IG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEuZGVzaWduLmRhdGEuc2l6ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueCA9IE1hdGgucm91bmQob2JqZWN0XzF4MS54ICsgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEueSA9IE1hdGgucm91bmQob2JqZWN0XzF4MS55ICsgeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgb2JqZWN0XzF4MS54ICsgJ3knICsgb2JqZWN0XzF4MS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEucHVzaChvYmplY3RfMXgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIHRlcnJhaW5fb2JqZWN0c18xeDE7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0VGVycmFpbk9uUG9zaXRpb24ocG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5vYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS50eXBlICE9ICd0ZXJyYWluJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5kZXNpZ24uZGF0YS5zaXplIDw9IHBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LCB0aGlzLm9iamVjdHNbaV0ueSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobnVsbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldE5lYXJlc3RUZXJyYWluUG9zaXRpb25XaXRoQ29kZShwb3NpdGlvbiwgdGVycmFpbl9jb2RlKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gdGhpcy5nZXQxeDFUZXJyYWluT2JqZWN0cygpO1xuXG4gICAgICAgICAgICB2YXIgbWluX2Rpc3RhbmNlID0gLTE7XG4gICAgICAgICAgICB2YXIgbmVhcmVzdF90ZXJyYWluXzF4MSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW5fMXgxKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmIChtaW5fZGlzdGFuY2UgPT09IC0xIHx8IG1pbl9kaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0X3RlcnJhaW5fMXgxID0gdGVycmFpbl8xeDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfdGVycmFpbl8xeDEgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qXG5cbiAgICAgICAgIGdldE1hcE9mQ29sbGlzaW9uQ29kZXMocmVhbF9vYmplY3RzLHBvc2l0aW9uKXtcbiAgICAgICAgIHJldHVybiBUZXJyYWluO1xuICAgICAgICAgfTtcblxuICAgICAgICAgKi9cblxuXG4gICAgfVxuXG59XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuT2JqZWN0XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyB4O1xuICAgICAgICBwdWJsaWMgeTtcbiAgICAgICAgcHVibGljIHR5cGU7XG4gICAgICAgIHB1YmxpYyBuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNfa2V5ID09ICdfaWQnKXRoaXNfa2V5ID0gJ2lkJzsvL3RvZG8gbWF5YmUgYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBpbml0KG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZihvYmplY3QgaW5zdGFuY2VvZiBULk9iamVjdHMuT2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKG9iamVjdC50eXBlID09ICdidWlsZGluZycpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuQnVpbGRpbmcob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAndGVycmFpbicpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICdzdG9yeScpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuU3Rvcnkob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAnbmF0dXJhbCcpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuTmF0dXJhbChvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgcHV0IGl0ZW0gaW50byBUb3ducyBPYmplY3RzIEFycmF5IGJlY2F1c2Ugb2YgdW5yZWNvZ25pemVkIG9iamVjdCB0eXBlICcgKyBvYmplY3QudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFBvc2l0aW9uKCk6UG9zaXRpb24ge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZygpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuICgnWycgKyB0aGlzLm5hbWUgKyAnXScpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQnVpbGRpbmdcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIEJ1aWxkaW5nIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcbiAgICAgICAgcHVibGljIGFjdGlvbnM7XG4gICAgICAgIHB1YmxpYyBwYXRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iamVjdCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hY3Rpb25zID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zX2NsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zX2NsYXNzZXMucHVzaChULldvcmxkLmdhbWUubmV3QWN0aW9uSW5zdGFuY2UodGhpcy5hY3Rpb25zW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnNfY2xhc3NlcztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHIodGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGggPSBuZXcgVC5QYXRoKC4uLnRoaXMucGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgdmFyIGxpZmVfYWN0aW9uID0gdGhpcy5nZXRBY3Rpb24oJ2xpZmUnKTtcbiAgICAgICAgICAgIHZhciBtYXhfbGlmZSA9IFQuV29ybGQuZ2FtZS5nZXRPYmplY3RNYXhMaWZlKHRoaXMpO1xuXG5cbiAgICAgICAgICAgIGlmIChsaWZlX2FjdGlvbiA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgbGlmZV9hY3Rpb24gPSBULldvcmxkLmdhbWUubmV3QWN0aW9uSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGlmZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogbWF4X2xpZmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhfbGlmZTogbWF4X2xpZmVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5wdXNoKGxpZmVfYWN0aW9uKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uLnBhcmFtcy5tYXhfbGlmZSA9IG1heF9saWZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbihkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmNvdW50UG9zaXRpb24oZGF0ZSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb3ZpbmcoZGF0ZSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmluUHJvZ3Jlc3MoZGF0ZSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0c31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Nb2RlbH1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1vZGVsKCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5kZXNpZ24uZGF0YSBpbnN0YW5jZW9mIFQuTW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNpZ24uZGF0YSA9IG5ldyBULk1vZGVsKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGFjdGlvbl90eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULkdhbWUuQWN0aW9uQWJpbGl0eX1cbiAgICAgICAgICovXG4gICAgICAgIGdldEFjdGlvbihhY3Rpb25fdHlwZSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnNbaV0udHlwZSA9PSBhY3Rpb25fdHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hY3Rpb25zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNyZWF0ZUh0bWxQcm9maWxlKCkge1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uc19wcm9maWxlID0gJyc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zX3Byb2ZpbGUgKz0gdGhpcy5hY3Rpb25zW2ldLmNyZWF0ZUh0bWxQcm9maWxlKCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIChgXG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvYmplY3QtYnVpbGRpbmctcHJvZmlsZVwiPlxuXG4gICAgICAgICAgICAgICAgPGgyPmAgKyB0aGlzLm5hbWUgKyBgPC9oMj5cbiAgICAgICAgICAgICAgICBgICsgdGhpcy5nZXRQb3NpdGlvbigpICsgYFxuXG5cbiAgICAgICAgICAgICAgICBgICsgYWN0aW9uc19wcm9maWxlICsgYFxuXG5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5OYXR1cmFsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIE5hdHVyYWwgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduO1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLk5hdHVyYWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTdG9yeSBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBjb250ZW50O1xuXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlN0b3J5KEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRNYXJrZG93bigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jb250ZW50LmRhdGEpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVycmFpbiBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG5cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuVGVycmFpbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKHByZWZlcmVkX3dpZHRoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29sb3IoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YS5jb2xvcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGdldEltYWdlKCl7fVxuXG5cbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblxuVC5SZXNvdXJjZXMgPSBjbGFzc3tcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXNvdXJjZXMpXG4gICAge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBNYXRoLmNlaWwocmVzb3VyY2VzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICovXG4gICAgY2xvbmUoKXtcbiAgICAgICAgcmV0dXJuIG5ldyBULlJlc291cmNlcyh0aGlzKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjb250YWlucyBhIGdpdmVuIHJlc291cmNlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgKiBAcmV0dXJuIHtib29sfSBjb250YWluc1xuICAgICAqL1xuICAgIGNvbnRhaW5zKHJlc291cmNlcyl7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA8IHJlc291cmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQWRkIGdpdmVuIHJlc291cmNlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICovXG4gICAgYWRkKHJlc291cmNlcyl7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldICs9IHJlc291cmNlc1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIG11bHRpcGx5KGspe1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbCh0aGlzW2tleV0gKiBrKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHNpZ251bShrKXtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgYXBwbHkobW9kaWZpZXIpe1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG1vZGlmaWVyKHRoaXNba2V5XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9IGFsbCByZXNvdXJjZXMga2V5c1xuICAgICAqL1xuICAgIGV4dHJhY3RLZXlzKCl7XG5cbiAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGtleXMpO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBEaXN0YW5jZSBiZXR3ZWVuIHRoaXMgYW5kIGdpdmVuIFJlc291cmNlc1xuICAgICAqL1xuICAgIGNvbXBhcmUocmVzb3VyZXMpe1xuXG4gICAgICAgIHZhciByZXNvdXJjZXNfQSA9IHRoaXM7XG4gICAgICAgIHZhciByZXNvdXJjZXNfQiA9IHJlc291cmVzO1xuXG4gICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19BLmV4dHJhY3RLZXlzKCkpO1xuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0IuZXh0cmFjdEtleXMoKSk7XG5cblxuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBrZXlzKSB7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICB2YXIgdmFsX0EgPSByZXNvdXJjZXNfQVtrZXldO1xuICAgICAgICAgICAgdmFyIHZhbF9CID0gcmVzb3VyY2VzX0Jba2V5XTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9BID09ICd1bmRlZmluZWQnKXZhbF9BID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsX0IgPT0gJ3VuZGVmaW5lZCcpdmFsX0IgPSAwO1xuXG4gICAgICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnBvdyh2YWxfQSAtIHZhbF9CLCAyKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2UpO1xuXG5cbiAgICAgICAgcmV0dXJuIChkaXN0YW5jZSk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGdpdmVuIHJlc291cmNlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICovXG4gICAgcmVtb3ZlKHJlc291cmNlcyl7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgdGhpc1trZXldIC09IHJlc291cmNlc1trZXldO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBSZXNvdXJjZXMgdG8gc2ltcGxlIHN0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpe1xuXG4gICAgICAgIHZhciBzdHJpbmdzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyaW5ncy5qb2luKCcsICcpO1xuXG4gICAgfVxuXG5cblxuICAgIHRvSFRNTCgpey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgIHZhciBzdHJpbmdzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBULkxvY2FsZS5nZXQoJ3Jlc291cmNlJywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcoLyonZW4tVVMnJ2RlLURFJyovKTsvL3RvZG8gdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2goJzxkaXY+PGltZyBzcmM9XCIvbWVkaWEvaW1hZ2UvcmVzb3VyY2VzLycgKyBrZXkgKyAnLnBuZ1wiIHRpdGxlPVwiJyArIG5hbWUgKyAnXCIgYWx0PVwiJyArIG5hbWUgKyAnXCIgPicgKyB2YWx1ZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHN0cmluZ3MgPSBzdHJpbmdzLmpvaW4oJyAnKTtcbiAgICAgICAgc3RyaW5ncyA9ICc8ZGl2IGNsYXNzPVwicmVzb3VyY2VzXCI+JyArIHN0cmluZ3MgKyAnPC9kaXY+JztcblxuICAgICAgICByZXR1cm4gc3RyaW5ncztcblxuICAgIH1cblxuXG5cbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULlVzZXIgPSBjbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVzZXIpe1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIHVzZXIpe1xuICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSB1c2VyW2tleV07XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgb2YgdXNlcnMgc2lnbmF0dXJlXG4gICAgICovXG4gICAgZ2V0U2lnbmF0dXJlSFRNTCgpe1xuXG4gICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgIGlmKHRoaXMucHJvZmlsZS5uYW1lIHx8IHRoaXMucHJvZmlsZS5zdXJuYW1lKXtcblxuICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS5uYW1lKycgJyt0aGlzLnByb2ZpbGUuc3VybmFtZTtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgZW1haWxfbWQ1ID0gbWQ1KHRoaXMucHJvZmlsZS5lbWFpbCk7XG5cblxuICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gK25hbWUrYDwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5gK3RoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkrYDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4oc2lnbmF0dXJlX2h0bWwpO1xuXG4gICAgfVxuXG5cbn07IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5ULnNldE5hbWVzcGFjZSgnV29ybGQnKTtcblxuVC5Xb3JsZC50ZXJyYWlucyA9IFtcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDAgLGNvbG9yOiAnIzAwMDAwMCcsIHNpemU6IDF9fSwgbmFtZTogJ3RlbW5vdGEnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxICxjb2xvcjogJyMzMzdFRkEnLCBzaXplOiAxfX0sIG5hbWU6ICdtb8WZZSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAzICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA0ICxjb2xvcjogJyNGOUY5OEQnLCBzaXplOiAxfX0sIG5hbWU6ICdww61zZWsnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNiAsY29sb3I6ICcjNUEyRjAwJywgc2l6ZTogMX19LCBuYW1lOiAnaGzDrW5hJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA5ICxjb2xvcjogJyM1MUYzMTEnLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEodG94aWMpJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTAsY29sb3I6ICcjNTM1ODA1Jywgc2l6ZTogMX19LCBuYW1lOiAnbGVzJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMixjb2xvcjogJyM4QUJDMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEoamFybyknfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMyxjb2xvcjogJyM4QTkwMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEocG96aW0pJ30pXG5dO1xuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLm1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgIFQuTWF0aC5ibHVyWFkoZnVuY3Rpb24oeCx5KXtcblxuICAgICAgICAvL3RvZG8vL3ZhciBrZXk9J3gnK3grJ3knK3k7XG4gICAgICAgIC8vdG9kby8vaWYodHlwZW9mIHpfbWFwX2NhY2hlW2tleV0hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAvL3RvZG8vL31cblxuXG4gICAgICAgIGNvbnN0IGRpdj0xMDA7XG5cblxuICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgdmFyIG1heF9wb3NzaWJsZV9uPTA7XG5cbiAgICAgICAgdmFyIF94LF95O1xuXG4gICAgICAgIHZhciBrPTAuNDtcbiAgICAgICAgdmFyIGtfPTEtaztcblxuICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICBuICs9IE1hdGgucm91bmQoTWF0aC5wb3coeCp5LTY2LCAyKSkgJSAoZGl2ICsgMSk7XG5cbiAgICAgICAgICAgIG1heF9wb3NzaWJsZV9uKz1kaXY7XG5cbiAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAvL3k9TWF0aC5mbG9vcih5LzMpO1xuICAgICAgICAgICAgLy92YXIgeHkgPSBULk1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgIC8veD14eS54O1xuICAgICAgICAgICAgLy95PXh5Lnk7XG5cbiAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICBfeT0oeCprKSsoeSprXyk7XG5cbiAgICAgICAgICAgIHg9TWF0aC5mbG9vcihfeC80KTtcbiAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBuPW4vbWF4X3Bvc3NpYmxlX247XG5cbiAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgIGlmKG4+MSluLT1NYXRoLmZsb29yKG4pO1xuXG4gICAgICAgIC8vdG9kby8vel9tYXBfY2FjaGVba2V5XT1uO1xuICAgICAgICByZXR1cm4obik7XG5cbiAgICB9LDIpXG4gICAgLFxuICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICxcblxuICAgIG5ldyBULk1hcEdlbmVyYXRvci5CaW90b3BlKFtcblxuICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgeyBhbW91bnQ6IDQwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMV19LC8vxZlla2FcbiAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDldfSwvL3Ryw6F2YSB0b3hpY1xuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMl19LC8vdHLDoXZhIGphcm9cbiAgICAgICAgeyBhbW91bnQ6IDUwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTNdfSwvL3Ryw6F2YSBwb3ppbVxuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA1XX0sLy9rYW1lbsOtXG4gICAgICAgIHsgYW1vdW50OiA2MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICB7IGFtb3VudDogNSAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA3XX0sLy9zbsOtaC9sZWRcbiAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuXG5cblxuICAgIF0pLFxuXG5cbiAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICBpZihvYmplY3QudHlwZSE9J3RlcnJhaW4nKXJldHVybjtcblxuICAgICAgICAvKmlmKG9iamVjdC5nZXRDb2RlKCk9PTUpe1xuICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIHg6IG9iamVjdC54LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICBkZXNpZ246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOidyb2NrJytNYXRoLmZsb29yKFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqNiklNisnZGFyaycrTWF0aC5mbG9vcihULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMC41K1QuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG5cbiAgICAgICAgfWVsc2UqL1xuICAgICAgICBpZihvYmplY3QuZ2V0Q29kZSgpPT0xMCl7XG5cbiAgICAgICAgICAgIGlmKFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMyx7eDpvYmplY3QueCx5Om9iamVjdC55fSk+MC45NSl7XG5cbiAgICAgICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IG9iamVjdC55LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDondHJlZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDMrVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSoyMC0xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMzYwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbik7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUgPSBuZXcgVC5HYW1lKFxuICAgIFQuTWF0aC5wcmV0dHlOdW1iZXIsXG4gICAgVC5NYXRoLnByZXR0eU51bWJlclxuKTsiLCJcblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgZGlzdGFuY2U6ICAgMCxcbiAgICAgICAgc3RyZW5ndGg6ICAgMCxcbiAgICAgICAgcm91bmRzOiAgICAgMSxcbiAgICAgICAgY29vbGRvd246ICAgMVxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignYXR0YWNrJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLDIpKnRoaXMucGFyYW1zLnN0cmVuZ3RoKnRoaXMucGFyYW1zLnJvdW5kcyooMS90aGlzLnBhcmFtcy5jb29sZG93bikpKjEwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDJ9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBleGVjdXRlKGdhbWUsYXR0YWNrZXIsYXR0YWNrZWQscmVzb3VyY2VzX2F0dGFja2VyKXtcblxuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZXJfZGVmZW5jZSA9IGF0dGFja2VyLmdldEFjdGlvbignZGVmZW5jZScpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkLmdldEFjdGlvbignZGVmZW5jZScpO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXJfbGlmZSA9IGF0dGFja2VyLmdldEFjdGlvbignbGlmZScpLnBhcmFtcztcbiAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1NaXNzaW5nIGFjdGlvblxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjaz1hdHRhY2tlcl9hdHRhY2suY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2RlZmVuY2UgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlPWF0dGFja2VyX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjaz1hdHRhY2tlZF9hdHRhY2suY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2sgPSBnYW1lLmdldEFjdGlvbkVtcHR5SW5zdGFuY2UoJ2F0dGFjaycpLnBhcmFtcztcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2RlZmVuY2UgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlPWF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGF0dGFja2VyLmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UoYXR0YWNrZWQuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICBpZihkaXN0YW5jZT5hdHRhY2tlcl9hdHRhY2suZGlzdGFuY2Upe1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3RzIGFyZSB0b28gZmFyIC0gJytkaXN0YW5jZSsnIGZpZWxkcy4gQXR0YWNrIGRpc3RhbmNlIGlzIG9ubHkgJythdHRhY2tlcl9hdHRhY2suZGlzdGFuY2UrJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvb2xkb3duXG4gICAgICAgICAgICBpZighYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkTm93KCkpe1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJythdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLmNhbkJlRXhlY3V0ZWRJbigpKycgc2Vjb25kcy4nKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLm5vd0V4ZWN1dGVkKCk7XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWZlbmNlXG5cbiAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgIC8vcignZGVmZW5jZScsYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlLGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZSk7XG5cbiAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aC09XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgaWYoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoPDApYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoPTA7XG5cblxuXG4gICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgtPVxuICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aDwwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aD0wO1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vYXR0YWNrZXJfbGlmZS5saWZlPTEwMDA7XG4gICAgICAgICAgICAvL2F0dGFja2VkX2xpZmUubGlmZT0xMDAwO1xuXG5cbiAgICAgICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgICAgICAoYXR0YWNrZXJfbGlmZS5saWZlPjEgJiYgYXR0YWNrZWRfbGlmZS5saWZlPjEpXG4gICAgICAgICAgICAgICAgKXtcblxuICAgICAgICAgICAgICAgIHIoJ3JvdW5kJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICByKCdsaWZlJyxhdHRhY2tlZF9saWZlLmxpZmUsYXR0YWNrZXJfbGlmZS5saWZlKTtcblxuICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZS09YXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoO1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZS09YXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrLnJvdW5kcy0tO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZXJfbGlmZS5saWZlPDEpYXR0YWNrZXJfbGlmZS5saWZlPTE7XG4gICAgICAgICAgICBpZihhdHRhY2tlZF9saWZlLmxpZmU8MSlhdHRhY2tlZF9saWZlLmxpZmU9MTtcblxuXG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cbik7XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBkZWZlbmNlOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2RlZmVuY2UnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigodGhpcy5wYXJhbXMuZGVmZW5jZSkqODAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMX0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgfVxuKTtcblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBsaWZlOiAgIDEsXG4gICAgICAgIG1heF9saWZlOiAgIDFcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2xpZmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtuZXcgVC5SZXNvdXJjZXMoKV0pO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxuKTtcblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHdvb2Q6ICAgMCxcbiAgICAgICAgaXJvbjogICAwLFxuICAgICAgICBjbGF5OiAgIDAsXG4gICAgICAgIHN0b25lOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ21pbmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigodGhpcy5wYXJhbXMuYW1vdW50KSozNjAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDR9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gb3IgbWF5YmUgZXhlY3V0ZVxuICAgICAgICB9Ki9cblxuXG5cblxuICAgIH1cbik7XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHNwZWVkOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ21vdmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsMikpKjEwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDB9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDB9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAxfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgZXhlY3V0ZShnYW1lLG9iamVjdCxkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLyl7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgYWN0aW9uLy90b2RvIG1heWJlIGF1dG9cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICBpZihhY3Rpb24gaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXt9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb249b2JqZWN0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIC8vcihkZXN0aW5hdGlvbnMpO1xuXG4gICAgICAgICAgICBvYmplY3QucGF0aCA9IFQuUGF0aC5uZXdDb25zdGFudFNwZWVkKGRlc3RpbmF0aW9ucyxhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVNldCB1c2FnZS8vdG9kbyBtYXliZSBhdXRvXG4gICAgICAgICAgICBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJykubm93RXhlY3V0ZWQoKTsvL3RvZG8gaXMgaXQgbmVlZGVkXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gbWF5YmUgPz8/IHRvZG9cbiAgICAgICAgfSovXG5cblxuICAgIH1cbik7XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICByZWdlbmVyYXRlOiAgIDEwMCxcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3JlZ2VuZXJhdGUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoMS90aGlzLnBhcmFtcy5yZWdlbmVyYXRlKSozNjAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDR9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDJ9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIGV4ZWN1dGUoKXsvL3RvZG8gbWF5YmUgdGljaz8/Pz9cbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgcmVwYWlyOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3JlcGFpcicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCgxLyh0aGlzLnBhcmFtcy5yZXBhaXIvMTAwKSkqMTAwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICA0fSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICA0fSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAvL3RvZG9cbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICB0aHJvdWdocHV0OiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3Rocm91Z2hwdXQnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoTWF0aC5wb3codGhpcy5wYXJhbXMudGhyb3VnaHB1dC8xMDAsMikpKjEwKjAuMDUpOy8vdG9kb1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMX0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuKTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
