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
            if (date === void 0) { date = 0; }
            if (date === 0) {
                date = new Date();
            }
            else if (typeof date === 'number') {
                date = new Date(date);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjA1LXRvd25zLm5hbWVzcGFjZS50cyIsIjEwLV9wb3NpdGlvbi8xMC1jb2xvci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLTNkLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLXBvbGFyLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzE1LXBvc2l0aW9uLWRhdGUuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMjAtYXJlYS5jbGFzcy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1hdGguc3RhdGljLnRzIiwiMTAtbW9kZWwvMDAtbW9kZWwuY2xhc3MudHMiLCIxMC1tb2RlbC8wNS1wYXJ0aWNsZXMuc3RhdGljLnRzIiwiMTAtb2JqZWN0cy8wMC1hcnJheS5jbGFzcy50cyIsIjEwLW9iamVjdHMvMDUtb2JqZWN0LnRzIiwiMTAtb2JqZWN0cy8xMC1idWlsZGluZy5jbGFzcy50cyIsIjEwLW9iamVjdHMvMTAtbmF0dXJhbC5jbGFzcy50cyIsIjEwLW9iamVjdHMvMTAtc3RvcnkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXRlcnJhaW4uY2xhc3MudHMiLCIxMC1yZXNvdXJjZXMuY2xhc3MudHMiLCIxMC11c2VyLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUc5QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBR3JCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBR2xDOzs7O0dBSUc7QUFDSCxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVMsU0FBUztJQUUvQixTQUFTLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFFaEIsSUFBSSxHQUFHLENBQUM7SUFDUixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBRXJDLEdBQUcsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsRUFBRSxDQUFBLENBQUMsR0FBRyxLQUFHLEdBQUcsQ0FBQztZQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUU5RCxFQUFFLENBQUEsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBRyxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUVGLE1BQU0sR0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkIsQ0FBQztJQUdMLENBQUM7SUFFRCxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVqQixDQUFDLENBQUM7QUN0REY7OztHQUdHO0FBQ0gsd0hBQXdIO0FBR3hILElBQU8sQ0FBQyxDQTJIUDtBQTNIRCxXQUFPLENBQUMsRUFBQyxDQUFDO0lBQ047O09BRUc7SUFDSDtRQUVJOzs7Ozs7V0FNRztRQUNILGVBQW1CLENBQVMsRUFBUSxDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQU87WUFBZCxpQkFBYyxHQUFkLE9BQWM7WUFBMUQsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUN6RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxxQkFBSyxHQUFMO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUdEOzs7V0FHRztRQUNILHNCQUFNLEdBQU47WUFFSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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QUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHO1FBS2hELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksU0FBUyxDQUFDO1FBRWQsaURBQWlEO1FBRWpELHNEQUFzRDtRQUN0RCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUVuQixzREFBc0Q7WUFDdEQsa0JBQWtCO1lBRWxCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEQsTUFBTSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FB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QyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFOUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkosR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkosR0FBRyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7b0JBRXJCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBRUosSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsYUFBYTt3QkFFaEYsR0FBRyxHQUFHLEVBQUUsR0FBRyxD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LENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkosR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkosR0FBRyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7b0JBRXJCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBRUosSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsYUFBYTt3QkFFaEYsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsK0NBQStDO3dCQUU1RSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMs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LEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDM0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0lBQzdILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztJQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7SUFDNUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0lBQzdILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7SUFDL0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBQyxDQUFDO0lBQ3BJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztJQUNuSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7SUFDMUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0lBQzNILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUMsQ0FBQztJQUNsSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7Q0FDdEksQ0FBQztBQ3RCRjs7O0dBR0c7QUFDSCx3SEFBd0g7QUFJeEgsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUVyQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDO0lBRXRCLDRCQUE0QjtJQUM1QixpREFBaUQ7SUFDakQscUNBQXFDO0lBQ3JDLFNBQVM7SUFHVCxJQUFNLEdBQUcsR0FBQyxHQUFHLENBQUM7SUFHZCxJQUFJLENBQUMsR0FBRSxDQUFDLENBQUM7SUFDVCxJQUFJLGNBQWMsR0FBQyxDQUFDLENBQUM7SUFFckIsSUFBSSxFQUFFLEVBQUMsRUFBRSxDQUFDO0lBRVYsSUFBSSxDQUFDLEdBQUMsR0FBRyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztJQUVYLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7UUFFbkIsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpELGNBQWMsSUFBRSxHQUFHLENBQUM7UUFFcEIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixtQ0FBbUM7UUFDbkMsU0FBUztRQUNULFNBQVM7UUFFVCxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixFQUFFLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEIsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBSUQsQ0FBQyxHQUFDLENBQUMsR0FBQyxjQUFjLENBQUM7SUFFbkIsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUFBLENBQUMsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QiwyQkFBMkI7SUFDM0IsTUFBTSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFZCxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBRUosQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzVDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFR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LENBQUMsQ0FBQztJQUN6QixDQUFDO0lBR0QsaUNBQWMsR0FBZDtRQUNJLE1BQU0sQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxNQUFNO0lBQ25FLENBQUM7SUFHRCxvQ0FBaUIsR0FBakI7UUFFSSxNQUFNLENBQUEsQ0FBQztZQUNILElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBSSxDQUFDLEVBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUksQ0FBQyxFQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFHLENBQUMsRUFBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBSSxDQUFDLEVBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0wsZUFBQztBQUFELENBeEJBLEFBd0JDLENBeEJhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQXdCMUIsQ0FDSixDQUFDIiwiZmlsZSI6InRvd25zLXNoYXJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IEluaXRpYWxpemUgbmFtZXNwYWNlIFRvd25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFRvd25zIG5hbWVzcGFjZSAtIHVuZGVyIHRoaXMgb2JqZWN0IGFyZSBhbGwgVG93bnMgY2xhc3NlcyBhbmQgaW5zdGFuY2VzLlxuICogQHR5cGUge29iamVjdH1cbiAqL1xuZ2xvYmFsLlRvd25zID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5Ub3ducztcblxuXG52YXIgVCA9IGdsb2JhbC5Ub3ducztcblxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5cblxuLyoqXG4gKiBDaGVja3MgZXhpc3RlbmNlIG9mIG5hbWVzcGFjZS4gSWYgbm90IGV4aXN0cywgdGhpcyBmdW5jdGlvbiBjcmVhdGVzIGl0LlxuICogQHBhcmFtIG5hbWVzcGFjZSBlZy4gJ09iamVjdHMuQXJyYXknXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuVC5zZXROYW1lc3BhY2UgPSBmdW5jdGlvbihuYW1lc3BhY2Upe1xuXG4gICAgbmFtZXNwYWNlPW5hbWVzcGFjZS5zcGxpdCgnLicpO1xuXG4gICAgdmFyIEFjdHVhbD10aGlzO1xuXG4gICAgdmFyIGtleTtcbiAgICBmb3IodmFyIGk9IDAsbD1uYW1lc3BhY2UubGVuZ3RoO2k8bDtpKyspe1xuXG4gICAgICAgIGtleT1uYW1lc3BhY2VbaV07XG5cbiAgICAgICAgaWYoa2V5PT09J1QnKXRocm93IG5ldyBFcnJvcignQ2FudCBzZXQgbmFtZXNwYWNlIFQgdW5kZXIgVCEnKTtcblxuICAgICAgICBpZih0eXBlb2YgQWN0dWFsW2tleV09PT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIEFjdHVhbFtrZXldPXt9O1xuICAgICAgICAgICAgQWN0dWFsPUFjdHVhbFtrZXldO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBBY3R1YWw9QWN0dWFsW2tleV07XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZXR1cm4odHJ1ZSk7XG5cbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkNvbG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hpY2ggcmVwcmVzZW50cyBSR0JBIGNvbG9yLlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSByIHJlZCBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBnIGdyZWVuIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGIgYmx1ZSBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBhIGFscGhhIGZyb20gMCB0byAyNTVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByOiBudW1iZXIscHVibGljIGc6IG51bWJlcixwdWJsaWMgYjogbnVtYmVyLHB1YmxpYyBhID0gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBkZWVwIGNsb25lIG9kIFQuQ29sb3JcbiAgICAgICAgICogQHJldHVybnMge1QuQ29sb3J9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlQuQ29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuQ29sb3IodGhpcy5yLHRoaXMuZyx0aGlzLmIsdGhpcy5hKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlcGFpcnMgb3ZlcmZsb3dlZCBjb2xvcnNcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGJvdW5kcygpIHtcblxuICAgICAgICAgICAgdGhpcy5yID0gTWF0aC5yb3VuZCh0aGlzLnIpO1xuICAgICAgICAgICAgdGhpcy5nID0gTWF0aC5yb3VuZCh0aGlzLmcpO1xuICAgICAgICAgICAgdGhpcy5iID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICAgICAgdGhpcy5hID0gTWF0aC5yb3VuZCh0aGlzLmEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuciA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZyA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmIgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmEgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgY3NzIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3JcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuIHJnYigxMDAsMjAwLDIwMClcbiAgICAgICAgICovXG4gICAgICAgIGdldENzc0NvbG9yKCkge1xuXG4gICAgICAgICAgICB0aGlzLmJvdW5kcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYSA9PSAyNTUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYignICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnKSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vcigncmdiYSgnICsgdGhpcy5yICsgJywgJyArIHRoaXMuZyArICcsICcgKyB0aGlzLmIgKyAnLCAnICsgTWF0aC5yb3VuZCh0aGlzLmEvMjU1KjEwMCkvMTAwICsgJyknKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hIC8gMjU1ICogMTAwKSAvIDEwMCArICcpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvciAoaWdub3JlcyBhbHBoYSBjaGFuZWwuKVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBlZy4gIzAwZmYwMFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0SGV4KCkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybiAnIycgKyAoKDEgPDwgMjQpICsgKHRoaXMuciA8PCAxNikgKyAodGhpcy5nIDw8IDgpICsgdGhpcy5iKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIG5ldyBULkNvbG9yIGZvcm0gaGV4IGNvZGUgb2YgY29sb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleCBjb2RlIG9mIGNvbG9yIGVnLiAjMDBmZjAwXG4gICAgICAgICAqIEByZXR1cm5zIHtULkNvbG9yfSBDb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGNyZWF0ZUZyb21IZXgoaGV4OiBzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCwgc2hvcnRoYW5kUmVnZXg7XG5cbiAgICAgICAgICAgIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKHNob3J0aGFuZFJlZ2V4LCBmdW5jdGlvbiAobSwgciwgZywgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVC5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjcmVhdGluZyBULkNvbG9yIGZyb20gJyArIGhleCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBhdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUe1xuXG4gICAgZXhwb3J0IGNsYXNzIFBhdGgge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gey4uLlQuUG9zaXRpb25EYXRlfSBQb3NpdGlvbiB3aXRoIGRhdGUgYXQgbGVhc3QgMlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuXG5cbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vaWYoYXJncy5sZW5ndGg9PT0xICYmIGFyZ3MgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvLyAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3M7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL31cblxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlLCBsYXN0X2RhdGUgPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggbXVzdCBiZSBULlBvc2l0aW9uRGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsYXN0X2RhdGUgPj0gcG9zaXRpb25fZGF0ZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZXMgc2hvdWxkIGJlIGNvbnNlY3V0aXZlIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCAoJyArIHBvc2l0aW9uX2RhdGUuZGF0ZSArICcgc2hvdWxkIGJlIGFmdGVyICcgKyBsYXN0X2RhdGUgKyAnKS4gJyArIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSA9IHBvc2l0aW9uX2RhdGUuZGF0ZTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheS48VC5Qb3NpdGlvbj59IGFycmF5X3Bvc2l0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUGF0aH1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uLCBzcGVlZCwgZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oc3BlZWQgLyAxKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSB2YWxpZCBudW1iZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSBwb3NpdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFycmF5X3Bvc2l0aW9uLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXJyYXlfcG9zaXRpb25fZGF0ZSA9IFtcbiAgICAgICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25bMF0ueCwgYXJyYXlfcG9zaXRpb25bMF0ueSwgZGF0ZSlcbiAgICAgICAgICAgIF07XG5cblxuICAgICAgICAgICAgdmFyIGxhc3RfcG9zaXRpb24gPSBhcnJheV9wb3NpdGlvblswXTtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGUsIGRpc3RhbmNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcnJheV9wb3NpdGlvbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbGFzdF9wb3NpdGlvbi5nZXREaXN0YW5jZShwb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSAvIDEgKyBkaXN0YW5jZSAvIHNwZWVkICogMTAwMCk7XG5cblxuICAgICAgICAgICAgICAgIGxhc3RfcG9zaXRpb24gPSBwb3NpdGlvbl9kYXRlO1xuXG5cbiAgICAgICAgICAgICAgICBhcnJheV9wb3NpdGlvbl9kYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LCBhcnJheV9wb3NpdGlvbltpXS55LCBkYXRlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3JldHVybiBuZXcgdGhpcy5hcHBseSh0aGlzLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUGF0aCguLi5hcnJheV9wb3NpdGlvbl9kYXRlKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldFBvc2l0aW9ucygpIHtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ocG9zaXRpb25zKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50IGluIHdoaWNoIHNlZ21lbnQgaXMgVC5QYXRoIHByb2dyZXNzXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNlZ21lbnQoZGF0ZSkge1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIEEsIEIsIHgsIHk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5kYXRlIC8gMTtcbiAgICAgICAgICAgICAgICBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2kgKyAxXS5kYXRlIC8gMTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSsnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEEgPD0gZGF0ZSAmJiBCID4gZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzwtLS10aGlzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoaSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY291bnRpbmcgc2VnbWVudCBpbiBULlBhdGgsIG1heWJlIGJlY2F1c2Ugb2YgcGFyYW0gZGF0ZSBpcyAnICsgZGF0ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyBwb3NpdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgY291bnRQb3NpdGlvbihkYXRlID0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluIHByb2dyZXNzXG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gdGhpcy5jb3VudFNlZ21lbnQoZGF0ZSk7XG5cbiAgICAgICAgICAgIHZhciBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnRdO1xuICAgICAgICAgICAgdmFyIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudCArIDFdO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKChBLWRhdGUpKycgLSAnKyhCLWRhdGUpKTtcblxuICAgICAgICAgICAgdmFyIHggPSBULk1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueCwgQi54KTtcbiAgICAgICAgICAgIHZhciB5ID0gVC5NYXRoLnByb3BvcnRpb25zKEEuZGF0ZSAvIDEsIGRhdGUgLyAxLCBCLmRhdGUgLyAxLCBBLnksIEIueSk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oeCwgeSkpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyByb3RhdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRSb3RhdGlvbihkYXRlID0gMCkge1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIEJBID0gQi5nZXRQb3NpdGlvbigpLnBsdXMoQS5nZXRQb3NpdGlvbigpLm11bHRpcGx5KC0xKSk7XG5cbiAgICAgICAgICAgIHZhciBwb2xhciA9IEJBLmdldFBvc2l0aW9uUG9sYXIoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvbGFyLmdldERlZ3JlZXMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgU3BlZWQgYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGZpZWxkcy9zXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNwZWVkKGRhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcyhkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gQS5nZXREaXN0YW5jZShCKTtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IEIuZGF0ZSAtIEEuZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSAvIChkdXJhdGlvbiAvIDEwMDApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcGF0aCBpbiBwcm9ncmVzcyAodHJ1ZSkgb3IgaXQgaGFzIG5vdCBzdGFydGVkKGZhbHNlKSBvciBpdCBpcyBmaW5pc2hlZChmYWxzZSk/XG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGluUHJvZ3Jlc3MoZGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBtYXliZSBjb3VudFByb2dyZXNzXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbjNEIHtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHguejtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB6O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uM0QodGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbjNEIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnWycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnLCcgKyB0aGlzLnogKyAnXSc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBQb3NpdGlvblBvbGFyXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25Qb2xhciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZGlzdGFuY2UsIGRlZ3JlZXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXN0YW5jZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgZGVncmVlcyA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSB0aGlzLmdldFJhZGlhbnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbihcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4ocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlXG4gICAgICAgICAgICApKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREZWdyZWVzKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVncmVlcyArIDM2MCkgJSAzNjA7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UmFkaWFucygpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuTWF0aC5kZWcycmFkKHRoaXMuZGVncmVlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnJyArIHRoaXMuZGlzdGFuY2UgKyAnLCcgKyB0aGlzLmRlZ3JlZXMgKyAnwrAnO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG5cbiAgICAvKipcbiAgICAgKiBHbG9iYWwgcG9zaXRpb24gb24gdG93bnMgbWFwXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uIHtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICgvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeCkpIHtcblxuICAgICAgICAgICAgICAgIHggPSB4LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gcGFyc2VGbG9hdCh4WzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KHhbMV0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgeSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90b2RvIGNoZWNrXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGNvbnN0cnVjdG9yIHBhcmFtcyB3aGlsZSBjcmVhdGluZyBULlBvc2l0aW9uIScpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGx1cyhwb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSArPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbXVsdGlwbHkoaykge1xuXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggKiBrO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ICogaztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEZsb29yZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24oTWF0aC5mbG9vciggdGhpcy54KSxNYXRoLmZsb29yKCB0aGlzLnkpKTtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQb3NpdGlvblBvbGFyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uUG9sYXIoXG4gICAgICAgICAgICAgICAgVC5NYXRoLnh5MmRpc3QodGhpcy54LCB0aGlzLnkpLFxuICAgICAgICAgICAgICAgIFQuTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGlzdGFuY2UocG9zaXRpb24pIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuTWF0aC54eTJkaXN0KHBvc2l0aW9uLnggLSB0aGlzLngsIHBvc2l0aW9uLnkgLSB0aGlzLnkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uRGF0ZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQge1xuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25EYXRlIGV4dGVuZHMgVC5Qb3NpdGlvbiB7Ly90b2RvIGlzIHRoYXJlIHNvbHV0aW9uIHdpdGhvdXQgdXNpbmcgVC4/XG5cbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSwgZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICAgICAgICBkYXRlID0geC5kYXRlO1xuICAgICAgICAgICAgICAgIHggPSB4Lng7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VwZXIoeCwgeSk7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInIHx8IHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZSAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBjb25zdHJ1Y3QgUG9zaXRpb25EYXRlIGlzIG5lZWRlZCB2YWxpZCBEYXRlIG5vdCAnICsgZGF0ZSArICcuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJ10gYXQgJyArXG4gICAgICAgICAgICAgICAgKHRoaXMuZGF0ZS5nZXREYXkoKSArIDEpICsgJy4nICsgKHRoaXMuZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLicgKyB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArXG4gICAgICAgICAgICAgICAgJyAnICsgdGhpcy5kYXRlLmdldEhvdXJzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0TWludXRlcygpICsgJzonICsgdGhpcy5kYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4ucG9zaXRpb25zOlQuUG9zaXRpb25bXSkge1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb25zLmxlbmd0aDwzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBhdCBsZWFzdCAzIHBvaW50cy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGMgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzFdKTtcbiAgICAgICAgICAgIHZhciBhID0gcG9zaXRpb25zWzFdLmdldERpc3RhbmNlKHBvc2l0aW9uc1syXSk7XG4gICAgICAgICAgICB2YXIgYiA9IHBvc2l0aW9uc1swXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuXG4gICAgICAgICAgICAvL3IoYSxiLGMpO1xuXG4gICAgICAgICAgICBpZihhK2I+YyAmJiBiK2M+YSAmJiBhK2M+Yil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCB0aHJlZSBwb2ludHMgYXJlIGluIGxpbmUuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBpc0NvbnRhaW5pbmcocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyB3b3JraW5nIG9ubHkgZm9yIGNvbnZleCBhcmVhc1xuXG4gICAgICAgICAgICB2YXIgdGVzdHNpZGUsaWEsaWIsc2lkZWNvbGxpc2lvbixjb2xsaXNpb247XG4gICAgICAgICAgICBmb3IodGVzdHNpZGU9MDt0ZXN0c2lkZTwyO3Rlc3RzaWRlKyspIHtcblxuXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj1mYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWEgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpYiA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWIgPT0gdGhpcy5wb3NpdGlvbnMubGVuZ3RoKWliID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBULk1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICsgKHRlc3RzaWRlLTAuNSkqMTAwMDAwMDAwMC8vdG9kbyBiZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihjb2xsaXNpb249PXRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLypyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXNpZGVjb2xsaXNpb24pcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBULkFycmF5RnVuY3Rpb25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbi8qKlxuICogQWRkaXRpb25hbCBmdW5jdGlvbnMgdG8gbWFuaXB1bGF0ZSB3aXRoIGFycmF5LlxuICovXG5ULkFycmF5RnVuY3Rpb25zPWNsYXNzIHtcblxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICogQHJldHVybnMge251bWJlcn0gS2V5IG9mIG9iamVjdCB3aXRoIHRoaXMgSUQsIC0xIGlmIG5vdCBleGlzdFxuICAgICAqL1xuICAgIHN0YXRpYyBpZDJpKGFycmF5LCBpZCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG5cbiAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JfbWVzc2FnZSB3aGVuIGl0ZW4gbm90IGV4aXN0c1xuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE9iamVjdCB3aXRoIHRoaXMgSUQsIG51bGwgaWYgbm90IGV4aXN0XG4gICAgICovXG4gICAgc3RhdGljIGlkMml0ZW0oYXJyYXksIGlkLCBlcnJvcl9tZXNzYWdlID0gZmFsc2UpIHtcblxuICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yX21lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIERlbGV0ZSBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpZFJlbW92ZShhcnJheSwgaWQpIHsvL3RvZG8gcmVmYWN0b3IgdXNlIHRoaXMgbm90IHNwbGljZVxuXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlIHRocm91Z2ggMkQgYXJyYXlcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIGFycmF5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdGF0aWMgaXRlcmF0ZTJEKGFycmF5LCBjYWxsYmFjaykge1xuXG4gICAgICAgIC8vcihhcnJheSk7XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDAsIHlMZW4gPSBhcnJheS5sZW5ndGg7IHkgPCB5TGVuOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4TGVuID0gYXJyYXlbeV0ubGVuZ3RoOyB4IDwgeExlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgICAgICAgICAvKnRvZG8gcmVmYWN0b3IgdG8geCx5Ki9cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgKiBAcGFyYW0gZnJvbVxuICAgICAqIEBwYXJhbSB0b1xuICAgICAqIEByZXR1cm4ge2FycmF5fSBSZW1vdmVkIGl0ZW1zXG4gICAgICovXG4gICAgc3RhdGljIHJlbW92ZUl0ZW1zKGFycmF5LCBmcm9tLCB0bykge1xuICAgICAgICB2YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICAgICAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKiB0b2RvIHNob3VsZCBpdCBiZSB1bmRlciBULkFycmF5RnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JlY3RcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBwYXRoXG4gICAgICovXG4gICAgc3RhdGljIGZpbHRlclBhdGgob2JqZWN0LCBwYXRoLCBzZXRWYWx1ZSkge1xuXG5cbiAgICAgICAgaWYgKCFpcyhvYmplY3QpKSB7Ly90b2RvIHNob3VsZCBpdCBiZSBoZXJlP1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBPYmplY3QgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpcyhwYXRoLmZvckVhY2gpKSB7XG4gICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBULlBhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvcih2YXIgcGF0aF9pIGluIHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG9iamVjdF9rZXkgPSBwYXRoW3BhdGhfaV07XG5cbiAgICAgICAgICAgIGlmIChwYXRoX2kgPCBwYXRoLmxlbmd0aCAtIDEgfHwgdHlwZW9mIHNldFZhbHVlID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtvYmplY3Rfa2V5XSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlclBhdGg6IEtleSBcXCcnK29iamVjdF9rZXkrJ1xcJyBpbiBwYXRoIGluIG9iamVjdCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBvYmplY3Rbb2JqZWN0X2tleV07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3Rbb2JqZWN0X2tleV0gPSBzZXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cblxuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IGNvbnRhaW5pbmcgb25seSB1bmlxdWUgdmFsdWVzXG4gICAgICovXG4gICAgc3RhdGljIHVuaXF1ZShhcnJheSkge1xuICAgICAgICB2YXIgbiA9IHt9LCByID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICBuW2FycmF5W2ldXSA9IGFycmF5O1xuICAgICAgICAgICAgICAgIHIucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBodG1sIHRhYmxlIGZyb20gSlMgYXJyYXlcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBhcnJheVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsX2NsYXNzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbFxuICAgICAqL1xuICAgIHN0YXRpYyBhcnJheTJ0YWJsZShhcnJheSwgYWRkaXRpb25hbF9jbGFzcyA9ICcnKSB7XG4gICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgICAgdmFyIHJvd3MgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIHZhciBjb2xzX3RhYmxlID0gYXJyYXlbMF0ubGVuZ3RoOy8vdG9kbyBpcyBpcyBiZXN0IHNvbHV0aW9uP1xuXG5cbiAgICAgICAgaHRtbCArPSAnPHRhYmxlIGNsYXNzPVwiJyArIGFkZGl0aW9uYWxfY2xhc3MgKyAnXCI+JztcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcblxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+JztcblxuICAgICAgICAgICAgdmFyIGNvbHMgPSBhcnJheVtyb3ddLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb2xzX3NwYW4gPSBjb2xzX3RhYmxlIC0gY29scztcblxuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gY29scyAtIDEgJiYgY29sc19zcGFuICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkIGNvbHNwYW49XCInICsgKGNvbHNfc3BhbiArIDEpICsgJ1wiPic7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RkPic7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cblxuICAgICAgICB9XG4gICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICByZXR1cm4gKGh0bWwpO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIGV4dHJhY3Qga2V5cyBmcm9tIEFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0S2V5cyhvYmplY3Qpe1xuXG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvcih2YXIgayBpbiBvYmplY3QpIGtleXMucHVzaChrKTtcbiAgICAgICAgcmV0dXJuKGtleXMpO1xuXG4gICAgfVxuXG5cblxuXG5cblxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHYW1lIGNvbmRpdGlvbnNcbiAqL1xuVC5HYW1lID0gY2xhc3N7XG4gICAgXG4gICAgXG4gICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWF4X2xpZmVfbW9kaWZpZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmljZV9rZXlfbW9kaWZpZXJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXhfbGlmZV9tb2RpZmllcixwcmljZV9rZXlfbW9kaWZpZXIpe1xuICAgIFxuICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzID0ge307XG4gICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlcyA9IHt9O1xuICAgICAgICB0aGlzLm1heF9saWZlX21vZGlmaWVyID0gbWF4X2xpZmVfbW9kaWZpZXI7XG4gICAgICAgIHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyID0gcHJpY2Vfa2V5X21vZGlmaWVyO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgbnVtYmVyc1xuICAgICAqL1xuICAgIGdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KXtcbiAgICBcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIHByaWNlX2Jhc2VzPVtdO1xuICAgIFxuICAgIFxuICAgICAgICBpZih0eXBlb2Ygb2JqZWN0LmFjdGlvbnMubGVuZ3RoPT09MCl7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luIG9iamVjdCAnK29iamVjdCsnIHRoZXJlIGFyZSBubyBhY3Rpb25zIScpOy8vdG9kbyBhbGwgb2JqZWN0cyBzaG91bGQgYmUgY29udmVydGVkIHRvIHN0cmluZyBsaWtlIHRoaXNcbiAgICAgICAgfVxuICAgIFxuICAgIFxuICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbil7XG4gICAgXG5cbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gTWF0aC5jZWlsKGFjdGlvbi5jb3VudFByaWNlQmFzZSgpKTsvL1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgTmFOICB2YWx1ZVxuICAgICAgICAgICAgaWYoaXNOYU4ocHJpY2VfYmFzZSkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyYW1zIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uLnR5cGUrJyBtYWtlcyBwcmljZSBiZXNlIE5hTi4nKTtcbiAgICAgICAgICAgICAgICBwcmljZV9iYXNlPTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIG5vbiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgICAgaWYocHJpY2VfYmFzZTwwKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbi50eXBlKycgc2hvdWxkIG5vdCBtYWtlIHRoaXMgYWN0aW9uIG5lZ2F0aXZlJyk7Ly90b2RvIG1heWJlIG9ubHkgd2FyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcHJpY2VfYmFzZXMucHVzaChwcmljZV9iYXNlKTtcblxuICAgIFxuICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlX2Jhc2VzKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7bnVtYmVyfSBtYXhpbXVtIGxpZmUgb2Ygb2JqZWN0XG4gICAgICovXG4gICAgZ2V0T2JqZWN0TWF4TGlmZShvYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9dGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG4gICAgICAgIHZhciBwcmljZV9iYXNlID0gcHJpY2VfYmFzZXMucmVkdWNlKGZ1bmN0aW9uKHB2LCBjdikgeyByZXR1cm4gcHYgKyBjdjsgfSwgMCk7XG4gICAgXG4gICAgXG4gICAgICAgIHByaWNlX2Jhc2U9dGhpcy5tYXhfbGlmZV9tb2RpZmllcihwcmljZV9iYXNlKTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlX2Jhc2UpO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgUmVzb3VyY2VzXG4gICAgICovXG4gICAgZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCl7XG5cblxuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9dGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG4gICAgXG4gICAgXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIHZhciBwcmljZXM9W107XG5cbiAgICBcbiAgICAgICAgdmFyIGRlc2lnbl9yZXNvdXJjZXMgPSBvYmplY3QuZ2V0TW9kZWwoKS5hZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCk7XG5cblxuICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbixpKXtcbiAgICBcblxuICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgIGFjdGlvbi5nZXRQcmljZVJlc291cmNlcygpLnNvcnQoZnVuY3Rpb24oYSxiKXsvL3RvZG8gaXMgaXQgc2FmZT9cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGEuY2xvbmUoKS5zaWdudW0oKSktZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGIuY2xvbmUoKS5zaWdudW0oKSk7XG4gICAgXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICBcbiAgICAgICAgICAgIHZhciBwcmljZV9yZXNvdXJjZXMgPSBwcmljZV9yZXNvdXJjZXNfbGlzdFswXS5jbG9uZSgpO1xuICAgIFxuICAgIFxuICAgICAgICAgICAgcHJpY2VfcmVzb3VyY2VzLm11bHRpcGx5KHByaWNlX2Jhc2VzW2ldKTtcbiAgICAgICAgICAgIHByaWNlcy5wdXNoKHByaWNlX3Jlc291cmNlcyk7XG4gICAgXG4gICAgXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2VzKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7b2JqZWN0fSBSZXNvdXJjZXMgLSBwcmljZSBvZiBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZShvYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBwcmljZScscHJpY2UpO1xuICAgIFxuICAgICAgICB2YXIgcHJpY2VzPXRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG4gICAgXG4gICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHByaWNlXyl7XG4gICAgXG4gICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHByaWNlLmFwcGx5KHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyKTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlKTtcbiAgICBcbiAgICB9XG5cblxuXG4gICAgaW5zdGFsbEFjdGlvbkNsYXNzKGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXMsYWN0aW9uX2NsYXNzKXtcblxuICAgICAgICB2YXIgdHlwZSA9IGFjdGlvbl9jbGFzcy5nZXRUeXBlKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHR5cGUhPT0nc3RyaW5nJyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGluc3RhbGxpbmcgYWN0aW9uIGNsYXNzIGludG8gZ2FtZSBpbnN0YW5jZTogYWN0aW9uIGNsYXNzIGhhcyBubyB0eXBlIScpO1xuICAgICAgICB9ZWxzZVxuICAgICAgICBpZih0eXBlb2YgdGhpcy5hY3Rpb25fY2xhc3Nlc1t0eXBlXSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IHRoZXJlIGlzIGFscmVhZHkgaW5zdGFsbGVkIGFjdGlvbiB3aXRoIHR5cGUgJyt0eXBlKTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICB2YXIgYWN0aW9uX2VtcHR5X2luc3RhbmNlID0gbmV3IGFjdGlvbl9jbGFzcyh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgcGFyYW1zOiBhY3Rpb25fZW1wdHlfaW5zdGFuY2VfcGFyYW1zXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy9BZGRpbmcgbWV0aG9kIGNsb25lIHRvIGluc3RhbGxlZCBhY3Rpb24gY2xhc3NcbiAgICAgICAgYWN0aW9uX2NsYXNzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4obmV3IGFjdGlvbl9jbGFzcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gPSBhY3Rpb25fY2xhc3M7XG4gICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1t0eXBlXSA9IGFjdGlvbl9lbXB0eV9pbnN0YW5jZTtcbiAgICBcbiAgICBcbiAgICBcbiAgICB9XG5cblxuXG4gICAgZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGUpe1xuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uX2NsYXNzPT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcrYWN0aW9uX3R5cGUrJy4gVGhlcmUgYXJlIG9ubHkgdGhlc2UgYWN0aW9uIHR5cGVzOiAnKyBULkFycmF5RnVuY3Rpb25zLmdldEtleXModGhpcy5hY3Rpb25fY2xhc3Nlcykuam9pbignLCAnKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihhY3Rpb25fY2xhc3MpO1xuXG4gICAgfVxuXG5cbiAgICBuZXdBY3Rpb25JbnN0YW5jZShhY3Rpb24pe1xuXG4gICAgICAgIC8vdG9kbyBzb2x2ZSBkZWZlbnNlIHZzLiBkZWZlbmNlXG4gICAgICAgIGlmKGFjdGlvbi50eXBlPT09J2RlZmVuc2UnKXtcbiAgICAgICAgICAgIGFjdGlvbi50eXBlPSdkZWZlbmNlJztcbiAgICAgICAgICAgIGFjdGlvbi5wYXJhbXMuZGVmZW5jZT1hY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgICAgICBkZWxldGUgYWN0aW9uLnBhcmFtcy5kZWZlbnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uLnR5cGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgYWN0aW9uX2NsYXNzKGFjdGlvbik7XG4gICAgfVxuXG5cblxuXG4gICAgY3JlYXRlQWN0aW9uRXhlY3V0ZShhY3Rpb25fdHlwZSl7XG5cbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKTtcblxuXG4gICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24gKC4uLmFyZ3Mpe1xuXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoZ2FtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25fY2xhc3MuZXhlY3V0ZS5hcHBseSh0aGlzLGFyZ3MpO1xuXG4gICAgICAgIH07XG5cblxuICAgICAgICByZXR1cm4oZXhlY3V0ZSk7XG4gICAgfVxuXG5cblxuICAgIGdldEFjdGlvbkVtcHR5SW5zdGFuY2UoYWN0aW9uX3R5cGUpe1xuXG4gICAgICAgIHZhciBhY3Rpb25faW5zdGFuY2UgPSB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbYWN0aW9uX3R5cGVdO1xuXG4gICAgICAgIGlmKHR5cGVvZiBhY3Rpb25faW5zdGFuY2U9PT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luIHRoaXMgZ2FtZSBpbnN0YW5jZSB0aGFyZSBpcyBubyBhY3Rpb24gY2xhc3MgdHlwZSAnK2FjdGlvbl90eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihhY3Rpb25faW5zdGFuY2UpO1xuXG5cbiAgICB9XG5cblxuXG4gICAgLypnZXRBY3Rpb25FeGVjdXRlKGFjdGlvbl9rZXkpe1xuXG4gICAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl9rZXldO1xuXG4gICAgICAgIGlmKHR5cGVvZiBhY3Rpb249PSd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gdHlwZSAnK2FjdGlvbl9rZXkrJy4nKTtcblxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cblxuXG4gICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbZ2FtZV0ucHVzaC5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmV4ZWN1dGVfY2FsbGJhY2suYXBwbHkodGhpcyxhcmdzKTtcblxuICAgICAgICB9O1xuXG5cblxuICAgICAgICByZXR1cm4oZXhlY3V0ZSk7XG4gICAgfSovXG4gICAgXG59OyIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lLkFjdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULkdhbWUuQWN0aW9uID0gY2xhc3N7XG5cblxuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uKXtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcyk7XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSA9PT0gJ3VuZGVmaW5lZCcpdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBleHRlbmQgVC5HYW1lLkFjdGlvbiBhbmQgYWRkIG1ldGhvZCBnZXRUeXBlIGJlZm9yZSBjcmVhdGluZyBpbnN0YW5jZXMhJyk7XG5cbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUoKTtcblxuICAgICAgICBpZihhY3Rpb24udHlwZSE9PXR5cGUpdGhyb3cgbmV3IEVycm9yKCdUaGlzIGlzICcrdHlwZSsnIG5vdCAnK2FjdGlvbi50eXBlKycgY2xhc3MhJyk7XG5cbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYWN0aW9uKXtcbiAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gYWN0aW9uW2tleV07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgcGFyYW1zXG5cbiAgICAgICAgLypmb3IodmFyIHBhcmFtIGluIGFjdGlvbkFiaWxpdHkucGFyYW1zKXtcbiAgICAgICAgICAgIHZhciBwYXJhbV90eXBlID0gYWN0aW9uLmFiaWxpdHlfcGFyYW1zW3BhcmFtXTtcblxuICAgICAgICAgICAgaWYodHlwZW9mIGFjdGlvbkFiaWxpdHkucGFyYW1zW3BhcmFtXSE9PXBhcmFtX3R5cGUpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW0gJytwYXJhbSsnIHNob3VsZCBiZSAnK3BhcmFtX3R5cGUrJyBpbnN0ZWFkIG9mICcrdHlwZW9mKGFjdGlvbkFiaWxpdHkuYWJpbGl0eV9wYXJhbXNbcGFyYW1dKSsnIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uQWJpbGl0eS50eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Ki9cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiAgICB9XG5cblxuICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgIHJldHVybigwKTtcbiAgICB9XG5cblxuICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG4gICAgICAgIHJldHVybihbXSk7XG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBub3QgZXhlY3V0ZSBwYXNzaXZlIGFjdGlvbi4nKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluIGhvdyBtYW55IHNlY29uZHMgY2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkP1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2FuQmVFeGVjdXRlZEluKCl7XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMucGFyYW1zLmNvb2xkb3duPT09J251bWJlcicpe1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5sYXN0X3VzZT09PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICByZXR1cm4oMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzID0gTWF0aC5hYnModGhpcy5sYXN0X3VzZSAtIG5ldyBEYXRlKCkpLzEwMDA7XG5cbiAgICAgICAgICAgIGlmKHRoaXMucGFyYW1zLmNvb2xkb3duPD1zKXtcbiAgICAgICAgICAgICAgICByZXR1cm4oMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4odGhpcy5wYXJhbXMuY29vbGRvd24tcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHJldHVybigwKTtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQgbm93P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkJlRXhlY3V0ZWROb3coKXtcbiAgICAgICAgcmV0dXJuKHRoaXMuY2FuQmVFeGVjdXRlZEluKCk9PT0wKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldCBhY3R1YWwgZGF0ZSBhcyBkYXRlIG9mIGV4ZWN1dGlvbiB0aGlzIGFjdGlvbiBpbnN0YW5jZVxuICAgICAqL1xuICAgIG5vd0V4ZWN1dGVkKCl7XG4gICAgICAgIHRoaXMubGFzdF91c2U9bmV3IERhdGUoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBodG1sIHByb2ZpbGUgb2YgYWN0aW9uIGFiaWxpdHlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNyZWF0ZUh0bWxQcm9maWxlKCl7XG5cbiAgICAgICAgdmFyIGh0bWw9Jzx0YWJsZSBjbGFzcz1cImFjdGlvbi1hYmlsaXR5LXByb2ZpbGVcIj4nO1xuXG4gICAgICAgIGh0bWwrPWBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGggY29sc3Bhbj1cIjJcIj5gKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsJ2FjdGlvbicsdGhpcy50eXBlKStgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuXG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMubGFzdF91c2UhPT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICBodG1sKz1gXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywnYWN0aW9uJywnbGFzdF91c2VkJykrYDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPmArdGhpcy5sYXN0X3VzZStgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3IodmFyIHBhcmFtIGluIHRoaXMucGFyYW1zKXtcbiAgICAgICAgICAgIGh0bWwrPWBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCsgVC5Mb2NhbGUuZ2V0KCdvYmplY3QnLCdhY3Rpb24nLHRoaXMudHlwZSxwYXJhbSkrYDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPmArdGhpcy5wYXJhbXNbcGFyYW1dK2A8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGh0bWwrPSc8L3RhYmxlPic7XG5cbiAgICAgICAgcmV0dXJuKGh0bWwpO1xuICAgIH1cblxufTtcblxuXG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULk1hcEdlbmVyYXRvciA9IGNsYXNze1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRaXG4gICAgICogQHBhcmFtIHtBcnJheX0gel9ub3JtYWxpemluZ190YWJsZVxuICAgICAqIEBwYXJhbSB7VC5NYXBHZW5lcmF0b3IuQmlvdG9wZX0gYmlvdG9wZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHZpcnR1YWxPYmplY3RHZW5lcmF0b3JcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihnZXRaLHpfbm9ybWFsaXppbmdfdGFibGUsYmlvdG9wZSx2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yKXtcblxuICAgICAgICB0aGlzLmdldFogPSBnZXRaO1xuICAgICAgICB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUgPSB6X25vcm1hbGl6aW5nX3RhYmxlO1xuICAgICAgICB0aGlzLmJpb3RvcGUgPSBiaW90b3BlO1xuICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3IgPSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yO1xuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyl7XG5cbiAgICAgICAgdmFyIG1hcD1bXTtcblxuICAgICAgICBmb3IodmFyIHk9MDt5PD1yYWRpdXMqMjt5Kyspe1xuXG4gICAgICAgICAgICBtYXBbeV09W107XG5cbiAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8PXJhZGl1cyoyO3grKyl7XG5cblxuICAgICAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh4LXJhZGl1cysxLzIsMikrXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHktcmFkaXVzKzEvMiwyKT5cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocmFkaXVzLDIpXG4gICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgeiA9IHRoaXMuZ2V0Wih4LXJhZGl1cytjZW50ZXJfaW50ZWdlci54LHktcmFkaXVzK2NlbnRlcl9pbnRlZ2VyLnkpO1xuXG5cbiAgICAgICAgICAgICAgICBtYXBbeV1beF0gPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG5cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4obWFwKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0ZXJyYWluTWFwKG1hcCl7XG5cbiAgICAgICAgdmFyIG1hcF9iZz1bXTtcblxuICAgICAgICBmb3IodmFyIHk9MCxsPW1hcC5sZW5ndGg7eTxsO3krKyl7XG4gICAgICAgICAgICBtYXBfYmdbeV09W107XG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PGw7eCsrKXtcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihtYXBbeV1beF0pPT09J3VuZGVmaW5lZCcpY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBtYXBfYmdbeV1beF0gPSB0aGlzLmJpb3RvcGUuZ2V0WlRlcnJhaW4obWFwW3ldW3hdKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG1hcF9iZyk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpe1xuXG5cbiAgICAgICAgdmFyIGJvdW5kcz0xO1xuXG5cbiAgICAgICAgdmFyIHpfbWFwPXRoaXMuZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpO1xuXG4gICAgICAgIHZhciBtYXA9dGhpcy50ZXJyYWluTWFwKHpfbWFwKTtcblxuICAgICAgICByZXR1cm4obWFwKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcF9hcnJheVxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheSxjZW50ZXJfaW50ZWdlcixyYWRpdXMpe1xuXG4gICAgICAgIHZhciBvYmplY3RzPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcF9hcnJheVt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG1hcF9hcnJheVt5XVt4XSk7XG5cblxuICAgICAgICAgICAgICAgIG9iamVjdC54PWNlbnRlcl9pbnRlZ2VyLngtcmFkaXVzK3g7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lnk9Y2VudGVyX2ludGVnZXIueS1yYWRpdXMreTtcblxuXG4gICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG9iamVjdHMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQdXJlTWFwKGNlbnRlcixyYWRpdXMsIG5vdF9jZW50ZXI9ZmFsc2Upe1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2VudGVyLG5vdF9jZW50ZXIpO1xuXG4gICAgICAgIHZhciBjZW50ZXJfaW50ZWdlcj17XG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKGNlbnRlci54KSxcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoY2VudGVyLnkpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYobm90X2NlbnRlcilcbiAgICAgICAgbm90X2NlbnRlcj17XG4gICAgICAgICAgICB4OiBub3RfY2VudGVyLngtY2VudGVyX2ludGVnZXIueCxcbiAgICAgICAgICAgIHk6IG5vdF9jZW50ZXIueS1jZW50ZXJfaW50ZWdlci55XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIC8qdmFyIG1hcF9hcnJheSA9IHRoaXMuZ2V0TWFwQXJyYXlDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKTtcbiAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLmNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKTsvKiovXG5cblxuICAgICAgICB2YXIgb2JqZWN0cz0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgIHZhciB4LHkseix0LG9iamVjdDtcbiAgICAgICAgZm9yKHk9MDt5PD1yYWRpdXMqMjt5Kyspe1xuICAgICAgICAgICAgZm9yKHg9MDt4PD1yYWRpdXMqMjt4Kyspe1xuXG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LXJhZGl1cysxLzIsMik+XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYobm90X2NlbnRlcilcbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1ub3RfY2VudGVyLngtcmFkaXVzKzEvMiwyKStcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeS1ub3RfY2VudGVyLnktcmFkaXVzKzEvMiwyKTw9XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgeiA9IHRoaXMuZ2V0Wih4LXJhZGl1cytjZW50ZXJfaW50ZWdlci54LHktcmFkaXVzK2NlbnRlcl9pbnRlZ2VyLnkpO1xuICAgICAgICAgICAgICAgIHogPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbih6KTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codCk7XG5cbiAgICAgICAgICAgICAgICBvYmplY3Q9IG5ldyBULk9iamVjdHMuVGVycmFpbih0KTtcbiAgICAgICAgICAgICAgICBvYmplY3QueD1jZW50ZXJfaW50ZWdlci54LXJhZGl1cyt4O1xuICAgICAgICAgICAgICAgIG9iamVjdC55PWNlbnRlcl9pbnRlZ2VyLnktcmFkaXVzK3k7XG5cblxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybihvYmplY3RzKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gb2JqZWN0c1xuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhvYmplY3RzKXtcblxuXG4gICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSBbXTtcbiAgICAgICAgdmFyIG9iamVjdHNfMXgxX3JhdyA9IG9iamVjdHMuZ2V0MXgxVGVycmFpbk9iamVjdHMoKS5nZXRBbGwoKTtcblxuXG4gICAgICAgIGZvcih2YXIgaT0wLGw9b2JqZWN0c18xeDFfcmF3Lmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsT2JqZWN0R2VuZXJhdG9yKG9iamVjdHNfMXgxX3Jhd1tpXSx2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4odmlydHVhbF9vYmplY3RzKTtcblxuICAgIH1cblxuXG5cblxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1QVUJMSUM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGVycmFpbiBhbmQgdmlydHVhbCBvYmplY3RzIGludG8gT2JqZWN0cyBBcnJheVxuICAgICAqIEBwYXJhbSB7VC5PYmplY3RzLkFycmF5fSByZWFsX29iamVjdHNcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpcnR1YWxfb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlciBEb250IGdldCBvYmplY3RzIG5lYXIgdGhpcyBjZW50ZXIuXG4gICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX19XG4gICAgICovXG4gICAgZ2V0Q29tcGxldGVPYmplY3RzKHJlYWxfb2JqZWN0cyxjZW50ZXIscmFkaXVzLG5hdHVyYWxfb2JqZWN0cz10cnVlLG5vdF9jZW50ZXI9ZmFsc2Upe1xuXG5cblxuICAgICAgICB2YXIgY29tcGxldGVfb2JqZWN0cyA9IHRoaXMuZ2V0UHVyZU1hcChjZW50ZXIsIHJhZGl1cywgbm90X2NlbnRlcik7XG5cblxuXG4gICAgICAgIHJlYWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIGlmKG5hdHVyYWxfb2JqZWN0cyl7XG5cbiAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSB0aGlzLmdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlX29iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIHJldHVybihjb21wbGV0ZV9vYmplY3RzKTtcblxuICAgIH1cbiAgICBcblxuXG59O1xuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTWFwR2VuZXJhdG9yLkJpb3RvcGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5NYXBHZW5lcmF0b3IuQmlvdG9wZSA9IGNsYXNze1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0ZXJyYWluc1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRlcnJhaW5zKXtcblxuICAgICAgICB2YXIgc3VtPTA7XG4gICAgICAgIHRlcnJhaW5zLmZvckVhY2goZnVuY3Rpb24odGVycmFpbil7XG4gICAgICAgICAgICBzdW0rPXRlcnJhaW4uYW1vdW50O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciBmcm9tPTA7XG4gICAgICAgIHRlcnJhaW5zLmZvckVhY2goZnVuY3Rpb24odGVycmFpbil7XG5cbiAgICAgICAgICAgIHRlcnJhaW4uZnJvbT1mcm9tL3N1bTtcbiAgICAgICAgICAgIGZyb20rPXRlcnJhaW4uYW1vdW50O1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGVycmFpbnMpO1xuICAgICAgICB0aGlzLnRlcnJhaW5zID0gdGVycmFpbnM7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpcbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLlRlcnJhaW59XG4gICAgICovXG4gICAgZ2V0WlRlcnJhaW4oeil7XG5cblxuICAgICAgICBmb3IodmFyIGk9dGhpcy50ZXJyYWlucy5sZW5ndGgtMTtpPj0wO2ktLSl7XG5cbiAgICAgICAgICAgIGlmKHogPj0gdGhpcy50ZXJyYWluc1tpXS5mcm9tICkgcmV0dXJuKHRoaXMudGVycmFpbnNbaV0udGVycmFpbik7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxuXG59O1xuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTWF0aFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbi8qKlxuICogTWF0aGVtYXRpY2FsIGZ1bmN0aW9ucyB0byBUb3duc1xuICovXG5ULk1hdGg9Y2xhc3N7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgc2lnbih4KSB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgIHggPSAreDsgLy8gY29udmVydCB0byBhIG51bWJlclxuICAgICAgICBpZiAoeCA9PT0gMCB8fCBpc05hTih4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggPiAwID8gMSA6IC0xO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIGJhc2VcbiAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgYmFzZUxvZyhiYXNlLCBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubG9nKG51bWJlcikgLyBNYXRoLmxvZyhiYXNlKTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0c1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJldHR5TnVtYmVyKG51bWJlcixudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzKXtcblxuICAgICAgICBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzID0gbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cyB8fCAyOy8vdG9kbyByZWZhY3RvciBsaWtlIHRoaXNcblxuXG4gICAgICAgIHZhciBkaWdpdHM9TWF0aC5jZWlsKFQuTWF0aC5iYXNlTG9nKDEwLG51bWJlcikpO1xuICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLG51bWJlcl9vZl9ub25femVyb19kaWdpdHMtZGlnaXRzKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGRpZ2l0cyxrKTtcblxuXG4gICAgICAgIG51bWJlcj1udW1iZXIqaztcbiAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICBudW1iZXI9TWF0aC5yb3VuZChudW1iZXIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG51bWJlcik7XG4gICAgICAgIG51bWJlcj1udW1iZXIvaztcblxuICAgICAgICAvL2NvbnNvbGUubG9nKG51bWJlcik7XG5cbiAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBhbmdlbGVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IDwwOzE4MD4gZGVncmVlcyBkaWZmZXJlbmNlXG4gICAgICovXG4gICAgc3RhdGljIGFuZ2xlRGlmZihkZWcxLGRlZzIpe1xuICAgICAgICB2YXIgZGVnID0gTWF0aC5hYnMoZGVnMSAtIGRlZzIpJTM2MDtcbiAgICAgICAgaWYoZGVnPjE4MClkZWc9MzYwLWRlZztcbiAgICAgICAgcmV0dXJuKGRlZyk7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmFkMmRlZyhyYWRpYW5zKXtcbiAgICAgICAgcmV0dXJuIChyYWRpYW5zICogKDE4MC9NYXRoLlBJKSklMzYwO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICovXG4gICAgc3RhdGljIGRlZzJyYWQoZGVncmVlcyl7XG4gICAgICAgIHJldHVybihkZWdyZWVzJTM2MCAqIChNYXRoLlBJLzE4MCkpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIHh5MmRpc3QoeCx5KXtcbiAgICAgICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyh4LDIpK01hdGgucG93KHksMikpKTtcbiAgICB9XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy90b2RvIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgc3RhdGljIHh5MmRpc3REZWcoeCx5KXtcblxuICAgICAgICB2YXIgb3V0cHV0PXt9O1xuXG4gICAgICAgIG91dHB1dC5kaXN0ID0gdGhpcy54eTJkaXN0KHgseSk7XG4gICAgICAgIG91dHB1dC5kZWcgPSB0aGlzLnJhZDJkZWcoTWF0aC5hdGFuMih5LHgpKTtcblxuICAgICAgICByZXR1cm4ob3V0cHV0KTtcblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy90b2RvIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgc3RhdGljIGRpc3REZWcyeHkoZGlzdCxkZWcpe1xuXG4gICAgICAgIHZhciByYWQ9dGhpcy5kZWcycmFkKGRlZyk7XG5cbiAgICAgICAgdmFyIG91dHB1dD17fTtcblxuICAgICAgICBvdXRwdXQueCA9IE1hdGguY29zKHJhZCkqZGlzdDtcbiAgICAgICAgb3V0cHV0LnkgPSBNYXRoLnNpbihyYWQpKmRpc3Q7XG5cbiAgICAgICAgcmV0dXJuKG91dHB1dCk7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgc3RhdGljIHh5Um90YXRlKHgseSxkZWcpe1xuXG4gICAgICAgIC8vbmV2eXV6aXZhbSBmdW5rY2UgVG93bnMuQS54eTJkaXN0RGVnIGEgQS5kaXN0RGVnMnh5LCBhYnljaCBuZWRlbGFsIHpieXRlY255IHByZXZvZCBkbyBzdHVwbnUgYSBzcGF0a3lcbiAgICAgICAgdmFyIGRpc3QgPSB0aGlzLnh5MmRpc3QoeCx5KTtcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguYXRhbjIoeSx4KTtcblxuICAgICAgICByYWQgKz0gdGhpcy5kZWcycmFkKGRlZyk7XG5cbiAgICAgICAgdmFyIG91dHB1dD17fTtcbiAgICAgICAgb3V0cHV0LnggPSBNYXRoLmNvcyhyYWQpKmRpc3Q7XG4gICAgICAgIG91dHB1dC55ID0gTWF0aC5zaW4ocmFkKSpkaXN0O1xuXG4gICAgICAgIHJldHVybihvdXRwdXQpO1xuXG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZCxwb3NpdGlvbil7XG5cblxuICAgICAgICByZXR1cm4gKE1hdGguc2luKE1hdGgucG93KChwb3NpdGlvbi54KnBvc2l0aW9uLnkpLXNlZWQsMikpKzEpLzI7XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgbXVsdGl0eXBlIHRvIGZsb2F0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZ2YWxcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIHRvRmxvYXQodmFsdWUsZGVmdmFsKXtcblxuICAgICAgICBpZih0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWw9MDtcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSd1bmRlZmluZWQnKXJldHVybihkZWZ2YWwpO1xuXG4gICAgICAgIHZhbHVlPXBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZihpc05hTih2YWx1ZSkpe1xuICAgICAgICAgICAgcmV0dXJuKGRlZnZhbCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0ludCh2YWx1ZSxkZWZ2YWwpe1xuXG4gICAgICAgIGlmKHR5cGVvZih2YWx1ZSk9PT0ndW5kZWZpbmVkJylyZXR1cm4oZGVmdmFsKTtcblxuICAgICAgICB2YWx1ZT1wYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGlmKGlzTmFOKHZhbHVlKSl7XG4gICAgICAgICAgICByZXR1cm4oZGVmdmFsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4odmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBib3VuZHModmFsdWUsbWluLG1heCl7XG5cbiAgICAgICAgaWYodmFsdWU8bWluKXJldHVybiBtaW47XG4gICAgICAgIGlmKHZhbHVlPm1heClyZXR1cm4gbWF4O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc09uTGluZShhMXgsYTF5LGEyeCxhMnksYjF4LGIxeSkge1xuXG4gICAgICAgIGEyeC09YTF4O1xuICAgICAgICBhMnktPWExeTtcblxuICAgICAgICBiMXgtPWExeDtcbiAgICAgICAgYjF5LT1hMXk7XG5cblxuXG4gICAgICAgIHZhciBhU2xvcGU9YTJ5L2EyeDtcbiAgICAgICAgdmFyIGJTbG9wZT1iMXkvYjF4O1xuXG5cbiAgICAgICAgaWYoYVNsb3BlIT1iU2xvcGUpcmV0dXJuIGZhbHNlO1xuXG5cbiAgICAgICAgdmFyIGFEaXN0ID0gdGhpcy54eTJkaXN0KGEyeSxhMngpO1xuICAgICAgICB2YXIgYkRpc3QgPSB0aGlzLnh5MmRpc3QoYjF5LGIxeCk7XG5cbiAgICAgICAgcmV0dXJuIChhRGlzdD49YkRpc3QpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogSXMgbGluZSBBIGNvbGxpZGluZyBsaW5lIEI/XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ5XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbGluZUNvbGxpc2lvbihhMXgsYTF5LGEyeCxhMnksYjF4LGIxeSxiMngsYjJ5KXtcblxuXG5cblxuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgIHZhciBudW1lcmF0b3IxID0gKChhMXkgLSBiMXkpICogKGIyeCAtIGIxeCkpIC0gKChhMXggLSBiMXgpICogKGIyeSAtIGIxeSkpO1xuICAgICAgICB2YXIgbnVtZXJhdG9yMiA9ICgoYTF5IC0gYjF5KSAqIChhMnggLSBhMXgpKSAtICgoYTF4IC0gYjF4KSAqIChhMnkgLSBhMXkpKTtcbiAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGRlbm9taW5hdG9yLG51bWVyYXRvcjEsbnVtZXJhdG9yMik7XG5cbiAgICAgICAgLy8gRGV0ZWN0IGNvaW5jaWRlbnQgbGluZXMgKGhhcyBhIHByb2JsZW0sIHJlYWQgYmVsb3cpXG4gICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCl7XG5cbiAgICAgICAgICAgIC8vdmFyIGNvbGxpc2lvbj0gKG51bWVyYXRvcjEgPT0gMCAmJiBudW1lcmF0b3IyID09IDApO1xuICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBiT25BID0gdGhpcy5pc09uTGluZShhMXgsYTF5LGEyeCxhMnksYjF4LGIxeSk7XG4gICAgICAgICAgICB2YXIgYU9uQiA9IHRoaXMuaXNPbkxpbmUoYjF4LGIxeSxiMngsYjJ5LGExeCxhMXkpO1xuXG4gICAgICAgICAgICByZXR1cm4oYk9uQSB8fCBhT25CKTtcblxuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgIHZhciBzID0gbnVtZXJhdG9yMiAvIGRlbm9taW5hdG9yO1xuXG4gICAgICAgICAgICBjb2xsaXNpb249KChyID49IDAgJiYgciA8PSAxKSAmJiAocyA+PSAwICYmIHMgPD0gMSkpO1xuXG4gICAgICAgIH1cblxuXG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWJ1ZyBUREQgZG8gbm90IGRlbGV0ZVxuXG4gICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICB2YXIgc3JjPWNyZWF0ZUNhbnZhc1ZpYUZ1bmN0aW9uQW5kQ29udmVydFRvU3JjKFxuICAgICAgICAgc2l6ZSoyLHNpemUqMixmdW5jdGlvbihjdHgpe1xuXG4gICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICBjdHgubGluZVRvKGEyeCtzaXplLGEyeStzaXplKTtcbiAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICBjdHgubW92ZVRvKGIxeCtzaXplLGIxeStzaXplKTtcbiAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICB9XG5cblxuICAgICAgICAgKTtcbiAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbWcgc3JjPVwiJytzcmMrJ1wiIGJvcmRlcj0nKyhjb2xsaXNpb24/MjowKSsnPicpOyovXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG5cbiAgICB9XG5cblxuXG5cblxuICAgIHN0YXRpYyBibHVyWFkoZ2VuZXJhdG9yLGJsdXIpIHtcblxuICAgICAgICByZXR1cm4oZnVuY3Rpb24gKHgsIHkpIHtcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICAgICAgICB2YXIgeHgseXk7XG5cbiAgICAgICAgICAgIGZvciAoeHggPSB4IC0gYmx1cjsgeHggPD0geCArIGJsdXI7IHh4KyspIHtcblxuICAgICAgICAgICAgICAgIGZvciAoeXkgPSB5IC0gYmx1cjsgeXkgPD0geSArIGJsdXI7IHl5KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZ2VuZXJhdG9yKHh4LCB5eSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoc3VtIC8gY291bnQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cblxuXG4gICAgc3RhdGljIGJ5dGVzVG9TaXplKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzaXplcyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQiddO1xuICAgICAgICBpZiAoYnl0ZXMgPT09IDApIHJldHVybiAnMEInO1xuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpKTtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSwgMikgKyAnJyArIHNpemVzW2ldO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9zdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhX3Bvc2l0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJfc3RhcnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYl9lbmRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9wb3J0aW9ucyhhX3N0YXJ0LGFfcG9zaXRpb24sYV9lbmQsYl9zdGFydCxiX2VuZCl7XG5cblxuICAgICAgICB2YXIgYV93aG9sZSA9IGFfZW5kLWFfc3RhcnQ7XG4gICAgICAgIHZhciBiX3dob2xlID0gYl9lbmQtYl9zdGFydDtcblxuICAgICAgICB2YXIgYV9wYXJ0ID0gYV9lbmQtYV9wb3NpdGlvbjtcbiAgICAgICAgdmFyIGJfcGFydCA9IChiX3dob2xlKmFfcGFydCkvYV93aG9sZTtcblxuICAgICAgICByZXR1cm4oYl9lbmQtYl9wYXJ0KTtcblxuXG4gICAgfVxuXG4gICAgXG4gICAgXG59OyIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Nb2RlbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuTW9kZWwgPSBjbGFzc3tcblxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbCBqc29uXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2UgaW4gY2FzZSBvZiBmYWlsXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoanNvbil7XG5cbiAgICAgICAgaWYodHlwZW9mKGpzb24pPT0ndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5uYW1lPWpzb24ubmFtZTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXM9anNvbi5wYXJ0aWNsZXM7XG4gICAgICAgIHRoaXMucm90YXRpb249anNvbi5yb3RhdGlvbjtcbiAgICAgICAgdGhpcy5zaXplPWpzb24uc2l6ZTtcblxuICAgICAgICBpZih0eXBlb2YodGhpcy5yb3RhdGlvbik9PSd1bmRlZmluZWQnKXRoaXMucm90YXRpb249MDtcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuc2l6ZSk9PSd1bmRlZmluZWQnKXRoaXMuc2l6ZT0xO1xuICAgIH1cblxuXG4gICAgY2xvbmUgKCl7XG4gICAgICAgIHJldHVybihuZXcgVC5Nb2RlbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm90YXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgICAqL1xuICAgIGFkZFJvdGF0aW9uU2l6ZShyb3RhdGlvbixzaXplKXtcblxuICAgICAgICBpZih0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uPTA7XG4gICAgICAgIGlmKHR5cGVvZiBzaXplID09PSAndW5kZWZpbmVkJylzaXplPTE7XG5cbiAgICAgICAgdGhpcy5yb3RhdGlvbis9cm90YXRpb247XG4gICAgICAgIHRoaXMuc2l6ZT10aGlzLnNpemUqc2l6ZTtcblxuICAgIH1cblxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpbWVuc2lvbiB4LHkseix4eVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gcmFuZ2VcbiAgICAgKi9cbiAgICByYW5nZShkaW1lbnNpb24pe1xuXG4gICAgICAgIGlmKGRpbWVuc2lvbj09J3h5Jyl7XG5cbiAgICAgICAgICAgIHJldHVybiBULk1hdGgueHkyZGlzdCh0aGlzLnJhbmdlKCd4JyksdGhpcy5yYW5nZSgneScpKnRoaXMuc2l6ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhcj10aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG4gICAgICAgIHZhciBtYXg9ZmFsc2UsbWluPWZhbHNlLG1heF8sbWluXztcbiAgICAgICAgZm9yKHZhciBpIGluIHBhcnRpY2xlc0xpbmVhcil7XG5cblxuICAgICAgICAgICAgbWluXz1wYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXTtcbiAgICAgICAgICAgIG1heF89cGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl0rcGFydGljbGVzTGluZWFyW2ldLnNpemVbZGltZW5zaW9uXTtcblxuICAgICAgICAgICAgLy90b2RvIGZlYXR1cmUgcmV2ZXJzZVxuXG4gICAgICAgICAgICBpZihtYXg9PT1mYWxzZSltYXg9bWF4XztcbiAgICAgICAgICAgIGlmKG1pbj09PWZhbHNlKW1pbj1taW5fO1xuXG5cbiAgICAgICAgICAgIGlmKG1heF8+bWF4KW1heD1tYXhfO1xuICAgICAgICAgICAgaWYobWluXzxtaW4pbWluPW1pbl87XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuKE1hdGguYWJzKG1pbi1tYXgpLyp0aGlzLnNpemUqLyk7Ly90b2RvIHJvdGF0aW9uXG5cblxuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfelxuICAgICAqL1xuICAgIG1vdmVCeShtb3ZlX3gsbW92ZV95LG1vdmVfeil7XG5cbiAgICAgICAgaWYodHlwZW9mIG1vdmVfeCA9PT0gJ3VuZGVmaW5lZCcpbW92ZV94PTA7XG4gICAgICAgIGlmKHR5cGVvZiBtb3ZlX3kgPT09ICd1bmRlZmluZWQnKW1vdmVfeT0wO1xuICAgICAgICBpZih0eXBlb2YgbW92ZV96ID09PSAndW5kZWZpbmVkJyltb3ZlX3o9MDtcblxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xuXG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLngrPW1vdmVfeDtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkrPW1vdmVfeTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnorPW1vdmVfejtcblxuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJuIFogb2Ygam9pbmluZyBtb2RlbFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICovXG4gICAgam9pbk1vZGVsWihtb2RlbCxtb3ZlX3gsbW92ZV95KXsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgIC8vdmFyICBtb2RlbF89ZGVlcENvcHlNb2RlbChtb2RlbCk7XG4gICAgICAgIC8vbW9kZWxfLm1vdmVCeShtb3ZlX3gsbW92ZV95KTsvL3RvZG8gbWF5YmUgZGVsZXRlIG1vdmVCeVxuXG4gICAgICAgIC8vdmFyIG1heF96PXRoaXMucmFuZ2UoJ3onKTtcblxuXG4gICAgICAgIHZhciB0aGlzX2xpbmVhcl9wYXJ0aWNsZXM9dGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcbiAgICAgICAgdmFyIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXM9bW9kZWwuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICB2YXIgZGlzdGFuY2VzPVswXTtcbiAgICAgICAgZm9yKHZhciBpIGluIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXMpe1xuXG4gICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLngrPW1vdmVfeDtcbiAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSs9bW92ZV95O1xuXG4gICAgICAgICAgICBmb3IodmFyIGlpIGluIHRoaXNfbGluZWFyX3BhcnRpY2xlcyl7Ly90b2RvIG1heWJlIG9wdGltaXplIGJ5IHByZS1zb3J0aW5nXG5cblxuICAgICAgICAgICAgICAgIGlmKFBhcnRpY2xlcy5jb2xsaXNpb24yRCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pKXtcblxuICAgICAgICAgICAgICAgICAgICByKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXMucHVzaCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLnBvc2l0aW9uLnordGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5zaXplLnopO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF4X3o9TWF0aC5tYXguYXBwbHkoTWF0aCxkaXN0YW5jZXMpO1xuXG4gICAgICAgIHJldHVybiBtYXhfejtcblxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBKb2luIG1vZGVscyB0b2dldGhlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICovXG4gICAgam9pbk1vZGVsKG1vZGVsLG1vdmVfeCxtb3ZlX3kpey8vdG9kbyBzZWNvbmQgcGFyYW0gc2hvdWxkIGJlIHBvc2l0aW9uXG5cbiAgICAgICAgdmFyIG1heF96PXRoaXMuam9pbk1vZGVsWihtb2RlbCxtb3ZlX3gsbW92ZV95KTtcblxuXG4gICAgICAgIHRoaXMucGFydGljbGVzPVtcbiAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpLFxuICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbCkpXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbMV0ucG9zaXRpb249e1xuICAgICAgICAgICAgeDptb3ZlX3gsXG4gICAgICAgICAgICB5Om1vdmVfeSxcbiAgICAgICAgICAgIHo6bWF4X3pcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJvdGF0aW9uPTA7XG4gICAgICAgIHRoaXMuc2l6ZT0xO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogRGVlcCBjb3B5IHRoaXMgYW5kIGNvbnZlcnRzIGxpbmtzIHRvIHJhdyBkYXRhXG4gICAgICogQHJldHVybnMge29iamVjdH0gTW9kZWxcbiAgICAgKi9cbiAgICBnZXREZWVwQ29weVdpdGhvdXRMaW5rcygpIHtcblxuXG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuY2xvbmUoKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgbGlua3MgdG8gcmF3IGRhdGFcblxuXG4gICAgICAgIHZhciBmaW5kUGFydGljbGVCeU5hbWUgPSBmdW5jdGlvbihwYXJ0aWNsZXMsIG5hbWUpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFydGljbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmluZGVkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5kZWRfcGFydGljbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZpbmRlZF9wYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgIH07XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGlua3MgPSBmdW5jdGlvbihwYXJ0aWNsZXMpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuXG4gICAgICAgICAgICAvL3IocGFydGljbGVzKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5MaW5rXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ubGluaykhPSd1bmRlZmluZWQnKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua2VkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKG1vZGVsLnBhcnRpY2xlcywgcGFydGljbGVzW2ldLmxpbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRfcGFydGljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluayAnICsgcGFydGljbGUubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmtlZF9wYXJ0aWNsZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnJvdGF0aW9uKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlc1tpXS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5zaXplKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5zaXplID0gcGFydGljbGVzW2ldLnNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucG9zaXRpb24pIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnBvc2l0aW9uID0gcGFydGljbGVzW2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbyBza2V3XG5cblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNbaV0gPSBsaW5rZWRfcGFydGljbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+R3JvdXBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmtzKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBwYXJ0aWNsZXNMaW5rcyhtb2RlbC5wYXJ0aWNsZXMpO1xuXG4gICAgICAgIHJldHVybihtb2RlbCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgMUQgYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplXG4gICAgICogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgKi9cbiAgICBnZXRMaW5lYXJQYXJ0aWNsZXMoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZT1mYWxzZSl7XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyPVtdO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBwYXJ0aWNsZXMgdG8gMUQgcGFydGljbGVzXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlczJMaW5lYXIgPSBmdW5jdGlvbihwYXJ0aWNsZXMscG9zaXRpb24scm90YXRpb24sc2l6ZSl7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcG9zaXRpb249ZmFsc2U7XG4gICAgICAgICAgICBpZih0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uPTA7XG4gICAgICAgICAgICBpZih0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZT0xO1xuXG5cbiAgICAgICAgICAgIGlmKHBvc2l0aW9uPT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtcbiAgICAgICAgICAgICAgICAgICAgeDowLFxuICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgIHo6MFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlKXtcblxuICAgICAgICAgICAgICAgIC8vcGFydGljbGU9ZGVlcENvcHkocGFydGljbGUpO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+RGVmYXVsdCBwYXJhbXMgb2YgcGFydGljbGUsIGdyb3VwIG9yIGxpbmtcbiAgICAgICAgICAgICAgICBpZighcGFydGljbGUucG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbj17XG4gICAgICAgICAgICAgICAgICAgICAgICB4OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6OjBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnJvdGF0aW9uKT09J3VuZGVmaW5lZCcpcGFydGljbGUucm90YXRpb249MDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUuc2l6ZSk9PSd1bmRlZmluZWQnKXBhcnRpY2xlLnNpemU9MTtcbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Qb3NpdGlvbiwgUm90YXRpb24gYW5kIHNpemUgLy90b2RvIHNrZXdcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0RGVnID0gVC5NYXRoLnh5MmRpc3REZWcocGFydGljbGUucG9zaXRpb24ueCwgcGFydGljbGUucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgICAgICBkaXN0RGVnLmRpc3QgPSBkaXN0RGVnLmRpc3QgKiBzaXplO1xuICAgICAgICAgICAgICAgIGRpc3REZWcuZGVnICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgdmFyIHh5ID0gVC5NYXRoLmRpc3REZWcyeHkoZGlzdERlZy5kaXN0LCBkaXN0RGVnLmRlZyk7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSB4eS54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB4eS55O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBwYXJ0aWNsZS5wb3NpdGlvbi56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiArPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBhcnRpY2xlLnNpemUgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplID0gcGFydGljbGUuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnggPSBwYXJ0aWNsZS5zaXplLnggKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnkgPSBwYXJ0aWNsZS5zaXplLnkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zaXplLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGFydGljbGVcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIocGFydGljbGUucGFydGljbGVzLHBhcnRpY2xlLnBvc2l0aW9uLHBhcnRpY2xlLnJvdGF0aW9uLHBhcnRpY2xlLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdyb3VwXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnNoYXBlKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmVhci5wdXNoKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG5cbiAgICAgICAgaWYoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSl7XG5cbiAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLGZhbHNlLDAsMSk7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLGZhbHNlLG1vZGVsLnJvdGF0aW9uLG1vZGVsLnNpemUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBzdHJpY3QgbW9kZS8vZGVsZXRlIG1vZGVsO1xuXG4gICAgICAgIHJldHVybihwYXJ0aWNsZXNMaW5lYXIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICovXG4gICAgZmlsdGVyUGF0aChwYXRoKXtcblxuICAgICAgICB2YXIgbW9kZWw9dGhpcztcblxuICAgICAgICBpZih0eXBlb2YocGF0aC5mb3JFYWNoKT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKGkpe1xuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5wYXJ0aWNsZXNbaV07XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuKG1vZGVsKTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgKi9cbiAgICBmaWx0ZXJQYXRoU2libGluZ3MocGF0aCl7XG5cbiAgICAgICAgdmFyIG1vZGVsPXRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcbiAgICAgICAgdmFyIGN1cnJlbnQ9bW9kZWw7XG5cbiAgICAgICAgaWYodHlwZW9mKHBhdGguZm9yRWFjaCk9PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHIocGF0aCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbihwYXJ0aWNsZV9pLHBhdGhfaWkpe1xuXG4gICAgICAgICAgICAvKmlmKHBhdGhfaWk8cGF0aC5sZW5ndGgtMSl7XG5cbiAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJ0aWNsZXNbcGFydGljbGVfaV07XG5cbiAgICAgICAgICAgICB9ZWxzZXsqL1xuXG4gICAgICAgICAgICB2YXIgbWUgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgY3VycmVudC5wYXJ0aWNsZXMgPSBbbWVdO1xuXG4gICAgICAgICAgICBjdXJyZW50PW1lO1xuICAgICAgICAgICAgLy99XG5cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZ2dyZWdhdGUgdm9sdW1lIG9mIGVhY2ggcmVzb3VyY2UgdXNlZCBpbiBtb2RlbFxuICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgKi9cbiAgICBhZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCl7XG5cblxuICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuXG5cbiAgICAgICAgdmFyIGxpbmVhcl9wYXJ0aWNsZXMgPSB0aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgbGluZWFyX3BhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmVhcl9wYXJ0aWNsZSl7XG5cbiAgICAgICAgICAgIHZhciB2b2x1bWU9Ly90b2RvIGFsbCBzaGFwZXNcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS54ICpcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS55ICpcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWw9bGluZWFyX3BhcnRpY2xlLm1hdGVyaWFsLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICBtYXRlcmlhbD1tYXRlcmlhbFswXTtcblxuICAgICAgICAgICAgdmFyIHByaWNlXz17fTtcbiAgICAgICAgICAgIHByaWNlX1ttYXRlcmlhbF09dm9sdW1lO1xuXG4gICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvKmNvbnNvbGUubG9nKCdwcmljZSBvZicpO1xuICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0LmRlc2lnbi5kYXRhKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHByaWNlKTsqL1xuXG4gICAgICAgIC8vcHJpY2UubXVsdGlwbHkoMC4wMSk7XG5cbiAgICAgICAgcmV0dXJuKHByaWNlKTtcblxuXG4gICAgfVxuXG5cblxuXG4gICAgZ2V0SGFzaCgpe1xuICAgICAgICByZXR1cm4gJ3h4eCcrSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJ0aWNsZXMpLmxlbmd0aDsvL3RvZG8gYmV0dGVyXG4gICAgfVxuXG5cbiAgICBcbiAgICBcblxufTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIFRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTW9kZWwuUGFydGljbGVzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbi8qKlxuICogTW9kZWwgUGFydGljbGVzXG4gKi9cblQuTW9kZWwuUGFydGljbGVzID0gY2xhc3N7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBtaXNzaW5nIHBhcmFtcyBpbnRvIHBhcnRpY2xlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gcGFydGljbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSkgey8vdG9kbyA/PyBtYXliZSByZW5hbWVcblxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNrZXcueiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcueiA9IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2hhcGUudG9wID0gMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnJvdGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUucm90YXRpb24gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChwYXJ0aWNsZSk7XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgc3RhdGljIGdldFRyaWFuZ2xlcyhwYXJ0aWNsZSxwb2ludF9jbGFzcyl7XG5cbiAgICAgICAgdmFyIHRyaWFuZ2xlcyA9W107XG5cbiAgICAgICAgcGFydGljbGU9dGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICB2YXIgeF9fLCB5X18sIHpfXztcblxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGV2ZWwgPSAwOyBsZXZlbCA8IDI7IGxldmVsKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS5ib3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS50b3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeF8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeV8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSB6XyAqIGxldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSAoMiAtIChNYXRoLmNvcyhULk1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpOy8vK3lfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueSksXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIHRtcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULk1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgIERpc3REZWdfLmRlZyArPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHh5XyA9IFQuTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeF9fID0geHlfLng7XG4gICAgICAgICAgICAgICAgICAgIHlfXyA9IHh5Xy55O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5ldyBwb2ludF9jbGFzcyh4X18seV9fLHpfXykpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKGxldmVsID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFsxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pICsgcGFydGljbGUuc2hhcGUublxuXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuXG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIEdldCAzRCBtb2RlbCBmcm9tIHBhcnRpY2xlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAzRCBtb2RlbFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQzRChwYXJ0aWNsZSkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IHt9O1xuXG4gICAgICAgIHBhcnRpY2xlPXRoaXMuYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSk7XG5cbiAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnR5cGUgPT0gJ3ByaXNtJykge1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1wcmlzbVxuXG4gICAgICAgICAgICB2YXIgeCA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICB2YXIgeSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICB2YXIgeiA9IHBhcnRpY2xlLnBvc2l0aW9uLno7Ly8gKiAyO1xuXG5cbiAgICAgICAgICAgIHZhciB4XyA9IHBhcnRpY2xlLnNpemUueDtcbiAgICAgICAgICAgIHZhciB5XyA9IHBhcnRpY2xlLnNpemUueTtcbiAgICAgICAgICAgIHZhciB6XyA9IHBhcnRpY2xlLnNpemUuejtcblxuXG4gICAgICAgICAgICAvL3IoeF8seV8pO1xuICAgICAgICAgICAgLy9yKHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgIHJlc291cmNlLnBvaW50cyA9IFtdO1xuICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMgPSBbW10sIFtdXTtcbiAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkQgPSBbW10sIFtdXTtcbiAgICAgICAgICAgIHZhciBiYXNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS50b3A7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICB2YXIgeF9fLCB5X18sIHpfXztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5NYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5NYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKi9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCAyRCBsaW5lcyBmcm9tIHBhcnRpY2xlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIDA9Ym90dG9tLCAxPXRvcFxuICAgICAqIEByZXR1cm4ge0FycmF5fSAyRCBsaW5lc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQyRGxpbmVzKHBhcnRpY2xlLCBiYXNlKSB7XG5cblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSB0aGlzLmdldDNEKHBhcnRpY2xlKTtcblxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcblxuICAgICAgICB2YXIgcG9seWdvbnMyRCA9IFtyZXNvdXJjZS5wb2x5Z29uczJEW2Jhc2VdXTtcblxuICAgICAgICBmb3IgKHZhciBwbiBpbiBwb2x5Z29uczJEKSB7XG5cbiAgICAgICAgICAgIC8qbGluZXNbcG5dPVtdO1xuXG4gICAgICAgICAgICAgZm9yKHZhciBwdCBpbiByZXNvdXJjZS5wb2x5Z29uc1twbl0pIHtcblxuICAgICAgICAgICAgIHZhciBwb2ludCA9IHJlc291cmNlLnBvaW50c1tyZXNvdXJjZS5wb2x5Z29uc1twbl1bcHRdIC0gMV07XG4gICAgICAgICAgICAgbGluZXNbcG5dW3BzXSA9IFtwb2ludFswXSwgcG9pbnRbMV1dO1xuXG4gICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIHZhciBwb2ludDEsIHBvaW50MjtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IC0xLCBsID0gcG9seWdvbnMyRFtwbl0ubGVuZ3RoOyBpIDwgbCAtIDE7IGkrKykge1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSBpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGwgLSAxO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcG9pbnQyID0gaSArIDE7XG5cblxuICAgICAgICAgICAgICAgIC8vcihyZXNvdXJjZS5wb2x5Z29uc1twbl0scG9pbnQxKTtcblxuICAgICAgICAgICAgICAgIHBvaW50MSA9IHJlc291cmNlLnBvaW50c1twb2x5Z29uczJEW3BuXVtwb2ludDFdIC0gMV07XG4gICAgICAgICAgICAgICAgcG9pbnQyID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50Ml0gLSAxXTtcblxuXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDFbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MlsxXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3IobGluZXMpO1xuXG4gICAgICAgIHJldHVybiAobGluZXMpO1xuXG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8vdG9kbyBtYXliZSByZWZhY3RvciBtb3ZlIHRvIE1hdGhcbiAgICAvKipcbiAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiAyRCBsaW5lc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBsaW5lczFcbiAgICAgKiBAcGFyYW0gKGFycmF5KSBsaW5lczJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBjb2xsaXNpb25MaW5lc0RldGVjdChsaW5lczEsIGxpbmVzMikge1xuXG4gICAgICAgIGZvciAodmFyIGkxIGluIGxpbmVzMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaTIgaW4gbGluZXMyKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoVC5NYXRoLmxpbmVDb2xsaXNpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzBdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLnlcbiAgICAgICAgICAgICAgICAgICAgKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcignY29sbGlzaW9uMkQgaXMgdHJ1ZScsIHBhcnRpY2xlMSwgcGFydGljbGUyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiBwYXJ0aWNsZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlMSBib3R0b21cbiAgICAgKiBAcGFyYW0gKG9iamVjdCkgcGFydGljbGUyIHRvcFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGNvbGxpc2lvbjJEKHBhcnRpY2xlMSwgcGFydGljbGUyKSB7XG5cblxuICAgICAgICB2YXIgbGluZXMxID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUxLCAxKTtcbiAgICAgICAgdmFyIGxpbmVzMiA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMiwgMCk7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29ybmVyIGNvbGxpc2lvblxuXG5cbiAgICAgICAgdmFyIGNvbGxpc2lvbiA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChsaW5lczEsIGxpbmVzMik7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW5uZXIgY29udmV4IGNvbGxpc2lvblxuXG4gICAgICAgIC8qKi9cbiAgICAgICAgaWYgKCFjb2xsaXNpb24pIHtcblxuICAgICAgICAgICAgY29sbGlzaW9uID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgayA9IDEwMDtcblxuICAgICAgICAgICAgICAgIHZhciBvdXRlciwgaW5uZXI7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMjsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lciA9IC8qZGVlcENvcHkqLyhsaW5lczJbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXIxID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbm5lcikpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXIyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbm5lcikpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl94ID0gaW5uZXJbMV0ueCAtIGlubmVyWzBdLng7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcl92ZWN0b3JfeSA9IGlubmVyWzFdLnkgLSBpbm5lclswXS55O1xuXG4gICAgICAgICAgICAgICAgICAgIGlubmVyMVswXS54IC09IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnkgLT0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIyWzFdLnggKz0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueSArPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICBpbm5lcjEgPSBbaW5uZXIxXTtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIyID0gW2lubmVyMl07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjEgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIxLCBvdXRlcik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24yID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMiwgb3V0ZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbjEgJiYgY29sbGlzaW9uMikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgICAgIH0oKTtcblxuXG4gICAgICAgIH1cbiAgICAgICAgLyoqL1xuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVidWcgVEREXG4gICAgICAgIC8qKnZhciBzaXplPTEwMDtcbiAgICAgICAgIHZhciBzcmM9Y3JlYXRlQ2FudmFzVmlhRnVuY3Rpb25BbmRDb252ZXJ0VG9TcmMoXG4gICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGluZXNfPVtsaW5lczEsbGluZXMyXTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBsaW5lc18pe1xuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPSAwLGw9bGluZXNfW2tleV0ubGVuZ3RoO2k8bDtpKyspe1xuXG4gICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8obGluZXNfW2tleV1baV1bMF0ueCtzaXplLGxpbmVzX1trZXldW2ldWzBdLnkrc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8obGluZXNfW2tleV1baV1bMV0ueCtzaXplLGxpbmVzX1trZXldW2ldWzFdLnkrc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICk7XG4gICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsvKiovXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIHJldHVybiAoY29sbGlzaW9uKTtcblxuICAgIH1cblxufTsiLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLkFycmF5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuLy90b2RvIFQuT2JqZWN0cy5BcnJheSA9IGNsYXNzIGV4dGVuZHMgQXJyYXl7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBBcnJheSB7XG5cblxuICAgICAgICBwdWJsaWMgb2JqZWN0cztcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gb2JqZWN0c1xuICAgICAgICAgKiB0b2RvID8/Pz8/Pz8/PyBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdHM9W10pIHtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBbGwoKTpBcnJheSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXIoY2FsbGJhY2spOlQuT2JqZWN0cy5BcnJheSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICAvL3IoZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzKTtcblxuICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzID0gdGhpcy5vYmplY3RzLmZpbHRlcihjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHVzaCBuZXcgb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBwdXNoKG9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5wdXNoKFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBvciBwdXNoIG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldEJ5SWQob2JqZWN0LmlkLCBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdnZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZClyZXR1cm4gdGhpcy5vYmplY3RzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0QnlJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignc2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0gPSBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSWQoaWQsIG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJUeXBlcyguLi50eXBlcykge1xuXG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2Yob2JqZWN0LnR5cGUpID09IC0xKXJldHVybjtcblxuICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclJhZGl1cyhjZW50ZXIsIHJhZGl1cykge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShjZW50ZXIpIDw9IHJhZGl1cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZmlsdGVyQXJlYShhcmVhOkFyZWEpIHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJlYS5pc0NvbnRhaW5pbmcob2JqZWN0LmdldFBvc2l0aW9uKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNYXBPZlRlcnJhaW5Db2RlcyhjZW50ZXIsIHJhZGl1cykgey8vdG9kbyBtYXliZSByZWZhY3RvciB0byBnZXRUZXJyYWluQ29kZXMyREFycmF5IG9yIGdldFRlcnJhaW5Db2Rlc01hcFxuXG4gICAgICAgICAgICAvKnZhciByYWRpdXMgPSBzaXplLzI7XG4gICAgICAgICAgICAgdmFyIGNlbnRlciA9e1xuICAgICAgICAgICAgIHg6IHRvcGxlZnQueCtyYWRpdXMsXG4gICAgICAgICAgICAgeTogdG9wbGVmdC55K3JhZGl1c1xuICAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3JlYXRlIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB2YXIgbWFwX2FycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCk7Ly8uc2xpY2UoKS5yZXZlcnNlKCk7XG5cblxuICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGVycmFpbl9vYmplY3RzX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSB0ZXJyYWluX29iamVjdHNfcmF3W2ldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUgPT0gMSkgey8vdG9kbyBpcyB0aGlzIG9wdGltYWxpemF0aW9uIGVmZmVjdGl2ZT9cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA8IHJhZGl1cyAqIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPCByYWRpdXMgKiAyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgLSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4YyA9IG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5YyA9IG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXM7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcF9hcnJheVt5XVt4XSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULk1hdGgueHkyZGlzdCh4IC0geGMsIHkgLSB5YykgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiBtYXBfYXJyYXk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldDF4MVRlcnJhaW5PYmplY3RzKCkge1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfcmF3ID0gdGhpcy5maWx0ZXJUeXBlcygndGVycmFpbicpLmdldEFsbCgpLnNsaWNlKCkucmV2ZXJzZSgpOy8vbm9ybWFsIEFycmF5XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1GaWxsIGFycmF5XG5cbiAgICAgICAgICAgIHZhciBibG9ja2VkX3Bvc2l0aW9ucyA9IHt9O1xuICAgICAgICAgICAgdmFyIG9iamVjdF8xeDEsIGtleTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS54KSArICd5JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS55KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5wdXNoKG9iamVjdF8xeDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0geV9mcm9tOyB5IDw9IHlfdG87IHkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHhfZnJvbTsgeCA8PSB4X3RvOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULk1hdGgueHkyZGlzdCh4LCB5KSA8PSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEgPSBvYmplY3QuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLmRlc2lnbi5kYXRhLnNpemUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnggPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCArIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnkgPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSArIHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIG9iamVjdF8xeDEueCArICd5JyArIG9iamVjdF8xeDEueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiB0ZXJyYWluX29iamVjdHNfMXgxO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldFRlcnJhaW5PblBvc2l0aW9uKHBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMub2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0udHlwZSAhPSAndGVycmFpbicpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uZGVzaWduLmRhdGEuc2l6ZSA8PSBwb3NpdGlvbi5nZXREaXN0YW5jZShuZXcgVC5Qb3NpdGlvbih0aGlzLm9iamVjdHNbaV0ueCwgdGhpcy5vYmplY3RzW2ldLnkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMub2JqZWN0c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG51bGwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBqc2RvY1xuICAgICAgICBnZXROZWFyZXN0VGVycmFpblBvc2l0aW9uV2l0aENvZGUocG9zaXRpb24sIHRlcnJhaW5fY29kZSkge1xuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IHRoaXMuZ2V0MXgxVGVycmFpbk9iamVjdHMoKTtcblxuICAgICAgICAgICAgdmFyIG1pbl9kaXN0YW5jZSA9IC0xO1xuICAgICAgICAgICAgdmFyIG5lYXJlc3RfdGVycmFpbl8xeDEgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluXzF4MSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShwb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAobWluX2Rpc3RhbmNlID09PSAtMSB8fCBtaW5fZGlzdGFuY2UgPiBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdF90ZXJyYWluXzF4MSA9IHRlcnJhaW5fMXgxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZWFyZXN0X3RlcnJhaW5fMXgxID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmVhcmVzdF90ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKlxuXG4gICAgICAgICBnZXRNYXBPZkNvbGxpc2lvbkNvZGVzKHJlYWxfb2JqZWN0cyxwb3NpdGlvbil7XG4gICAgICAgICByZXR1cm4gVGVycmFpbjtcbiAgICAgICAgIH07XG5cbiAgICAgICAgICovXG5cblxuICAgIH1cblxufVxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk9iamVjdFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgeDtcbiAgICAgICAgcHVibGljIHk7XG4gICAgICAgIHB1YmxpYyB0eXBlO1xuICAgICAgICBwdWJsaWMgbmFtZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzX2tleSA9PSAnX2lkJyl0aGlzX2tleSA9ICdpZCc7Ly90b2RvIG1heWJlIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgaW5pdChvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYob2JqZWN0IGluc3RhbmNlb2YgVC5PYmplY3RzLk9iamVjdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmIChvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3RlcnJhaW4nKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4ob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAnc3RvcnknKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlN0b3J5KG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ25hdHVyYWwnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLk5hdHVyYWwob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IHB1dCBpdGVtIGludG8gVG93bnMgT2JqZWN0cyBBcnJheSBiZWNhdXNlIG9mIHVucmVjb2duaXplZCBvYmplY3QgdHlwZSAnICsgb2JqZWN0LnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpOlBvc2l0aW9uIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb3ZpbmcoKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiAoJ1snICsgdGhpcy5uYW1lICsgJ10nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLkJ1aWxkaW5nXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdWlsZGluZyBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG4gICAgICAgIHB1YmxpYyBhY3Rpb25zO1xuICAgICAgICBwdWJsaWMgcGF0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgICAgICBzdXBlcihvYmplY3QpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uc19jbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc19jbGFzc2VzLnB1c2goVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHRoaXMuYWN0aW9uc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zX2NsYXNzZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByKHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gbmV3IFQuUGF0aCguLi50aGlzLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHZhciBsaWZlX2FjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCdsaWZlJyk7XG4gICAgICAgICAgICB2YXIgbWF4X2xpZmUgPSBULldvcmxkLmdhbWUuZ2V0T2JqZWN0TWF4TGlmZSh0aGlzKTtcblxuXG4gICAgICAgICAgICBpZiAobGlmZV9hY3Rpb24gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uID0gVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpZmUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IG1heF9saWZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4X2xpZmU6IG1heF9saWZlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChsaWZlX2FjdGlvbik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbi5wYXJhbXMubWF4X2xpZmUgPSBtYXhfbGlmZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oZGF0ZSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5jb3VudFBvc2l0aW9uKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5pblByb2dyZXNzKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5CdWlsZGluZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge1QuTW9kZWx9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb2RlbCgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuZGVzaWduLmRhdGEgaW5zdGFuY2VvZiBULk1vZGVsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaWduLmRhdGEgPSBuZXcgVC5Nb2RlbCh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpb25fdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5HYW1lLkFjdGlvbkFiaWxpdHl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRBY3Rpb24oYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zW2ldLnR5cGUgPT0gYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYWN0aW9uc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVIdG1sUHJvZmlsZSgpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbnNfcHJvZmlsZSA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc19wcm9maWxlICs9IHRoaXMuYWN0aW9uc1tpXS5jcmVhdGVIdG1sUHJvZmlsZSgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoYFxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib2JqZWN0LWJ1aWxkaW5nLXByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIDxoMj5gICsgdGhpcy5uYW1lICsgYDwvaDI+XG4gICAgICAgICAgICAgICAgYCArIHRoaXMuZ2V0UG9zaXRpb24oKSArIGBcblxuXG4gICAgICAgICAgICAgICAgYCArIGFjdGlvbnNfcHJvZmlsZSArIGBcblxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIGApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuTmF0dXJhbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBOYXR1cmFsIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5OYXR1cmFsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgU3RvcnkgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgY29udGVudDtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5TdG9yeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0TWFya2Rvd24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY29udGVudC5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduO1xuXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlRlcnJhaW4oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZShwcmVmZXJlZF93aWR0aCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvbG9yKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuY29sb3IpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBnZXRJbWFnZSgpe31cblxuXG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5SZXNvdXJjZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5cblQuUmVzb3VyY2VzID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVzb3VyY2VzKVxuICAgIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc291cmNlc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHJlc291cmNlc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAqL1xuICAgIGNsb25lKCl7XG4gICAgICAgIHJldHVybiBuZXcgVC5SZXNvdXJjZXModGhpcyk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY29udGFpbnMgYSBnaXZlbiByZXNvdXJjZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICogQHJldHVybiB7Ym9vbH0gY29udGFpbnNcbiAgICAgKi9cbiAgICBjb250YWlucyhyZXNvdXJjZXMpe1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPCByZXNvdXJjZXNba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBnaXZlbiByZXNvdXJjZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICogQHJldHVybiB7Ym9vbH0gc3VjY2Vzc1xuICAgICAqL1xuICAgIGFkZChyZXNvdXJjZXMpe1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSArPSByZXNvdXJjZXNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBtdWx0aXBseShrKXtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBNYXRoLmNlaWwodGhpc1trZXldICogayk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBzaWdudW0oayl7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDE7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtb2RpZmllclxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIGFwcGx5KG1vZGlmaWVyKXtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBtb2RpZmllcih0aGlzW2tleV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhbGwgcmVzb3VyY2VzIGtleXNcbiAgICAgKi9cbiAgICBleHRyYWN0S2V5cygpe1xuXG4gICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChrZXlzKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJlc1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gRGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCBnaXZlbiBSZXNvdXJjZXNcbiAgICAgKi9cbiAgICBjb21wYXJlKHJlc291cmVzKXtcblxuICAgICAgICB2YXIgcmVzb3VyY2VzX0EgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzb3VyY2VzX0IgPSByZXNvdXJlcztcblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChyZXNvdXJjZXNfQS5leHRyYWN0S2V5cygpKTtcbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19CLmV4dHJhY3RLZXlzKCkpO1xuXG5cbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4ga2V5cykge1xuXG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgdmFyIHZhbF9BID0gcmVzb3VyY2VzX0Fba2V5XTtcbiAgICAgICAgICAgIHZhciB2YWxfQiA9IHJlc291cmNlc19CW2tleV07XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQSA9PSAndW5kZWZpbmVkJyl2YWxfQSA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9CID09ICd1bmRlZmluZWQnKXZhbF9CID0gMDtcblxuICAgICAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5wb3codmFsX0EgLSB2YWxfQiwgMik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlKTtcblxuXG4gICAgICAgIHJldHVybiAoZGlzdGFuY2UpO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBnaXZlbiByZXNvdXJjZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICogQHJldHVybiB7Ym9vbH0gc3VjY2Vzc1xuICAgICAqL1xuICAgIHJlbW92ZShyZXNvdXJjZXMpe1xuXG4gICAgICAgIGlmICghdGhpcy5jb250YWlucyhyZXNvdXJjZXMpKXJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgIHRoaXNba2V5XSAtPSByZXNvdXJjZXNba2V5XTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgUmVzb3VyY2VzIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgdG9TdHJpbmcoKXtcblxuICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2godGhpc1trZXldICsgJyAnICsga2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgIH1cblxuXG5cbiAgICB0b0hUTUwoKXsvL3RvZG8gcHV0IHVybCBwcmVmaXggaW50byBwYXJhbXNcblxuICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gVC5Mb2NhbGUuZ2V0KCdyZXNvdXJjZScsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKCc8ZGl2PjxpbWcgc3JjPVwiL21lZGlhL2ltYWdlL3Jlc291cmNlcy8nICsga2V5ICsgJy5wbmdcIiB0aXRsZT1cIicgKyBuYW1lICsgJ1wiIGFsdD1cIicgKyBuYW1lICsgJ1wiID4nICsgdmFsdWUgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBzdHJpbmdzID0gc3RyaW5ncy5qb2luKCcgJyk7XG4gICAgICAgIHN0cmluZ3MgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzICsgJzwvZGl2Pic7XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZ3M7XG5cbiAgICB9XG5cblxuXG59OyIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5SZXNvdXJjZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5Vc2VyID0gY2xhc3N7XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIHJhdyB1c2VyIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1c2VyKXtcblxuICAgICAgICBmb3IodmFyIGtleSBpbiB1c2VyKXtcbiAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gdXNlcltrZXldO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAqL1xuICAgIGdldFNpZ25hdHVyZUhUTUwoKXtcblxuICAgICAgICB2YXIgbmFtZTtcblxuICAgICAgICBpZih0aGlzLnByb2ZpbGUubmFtZSB8fCB0aGlzLnByb2ZpbGUuc3VybmFtZSl7XG5cbiAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSsnICcrdGhpcy5wcm9maWxlLnN1cm5hbWU7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUudXNlcm5hbWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIGVtYWlsX21kNSA9IG1kNSh0aGlzLnByb2ZpbGUuZW1haWwpO1xuXG5cbiAgICAgICAgdmFyIHNpZ25hdHVyZV9odG1sID0gYFxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXItc2lnbmF0dXJlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ1c2VyLWltYWdlXCIgc3JjPVwiaHR0cHM6Ly8xLmdyYXZhdGFyLmNvbS9hdmF0YXIvYCArIGVtYWlsX21kNSArIGA/cz04MCZyPXBnJmQ9bW1cIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmUtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwidXNlci1uYW1lXCI+YCtuYW1lK2A8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCt0aGlzLnByb2ZpbGUuc2lnbmF0dXJlLmh0bWwydGV4dCgpK2A8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuKHNpZ25hdHVyZV9odG1sKTtcblxuICAgIH1cblxuXG59OyIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBpbnN0YW5jZSBULldvcmxkLnRlcnJhaW5zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVC5zZXROYW1lc3BhY2UoJ1dvcmxkJyk7XG5cblQuV29ybGQudGVycmFpbnMgPSBbXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMSAsY29sb3I6ICcjMzM3RUZBJywgc2l6ZTogMX19LCBuYW1lOiAnbW/FmWUnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAyICxjb2xvcjogJyM1NDU0NTQnLCBzaXplOiAxfX0sIG5hbWU6ICdkbGHFvmJhJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNCAsY29sb3I6ICcjRjlGOThEJywgc2l6ZTogMX19LCBuYW1lOiAncMOtc2VrJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNSAsY29sb3I6ICcjODc4Nzg3Jywgc2l6ZTogMX19LCBuYW1lOiAna2FtZW7DrSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDcgLGNvbG9yOiAnI0VGRjdGQicsIHNpemU6IDF9fSwgbmFtZTogJ3Nuw61oL2xlZCd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDggLGNvbG9yOiAnIzJBNzMwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShub3JtYWwpJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEwLGNvbG9yOiAnIzUzNTgwNScsIHNpemU6IDF9fSwgbmFtZTogJ2xlcyd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDExLGNvbG9yOiAnIzZhYTJmZicsIHNpemU6IDF9fSwgbmFtZTogJ8WZZWthJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTMsY29sb3I6ICcjOEE5MDAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHBvemltKSd9KVxuXTtcblxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQubWFwR2VuZXJhdG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5tYXBHZW5lcmF0b3IgPSBuZXcgVC5NYXBHZW5lcmF0b3IoXG5cbiAgICBULk1hdGguYmx1clhZKGZ1bmN0aW9uKHgseSl7XG5cbiAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAvL3RvZG8vL2lmKHR5cGVvZiB6X21hcF9jYWNoZVtrZXldIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgIC8vdG9kby8vICAgIHJldHVybih6X21hcF9jYWNoZVtrZXldKTtcbiAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICBjb25zdCBkaXY9MTAwO1xuXG5cbiAgICAgICAgdmFyIG49IDA7XG4gICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgIHZhciBfeCxfeTtcblxuICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgIHZhciBrXz0xLWs7XG5cbiAgICAgICAgZm9yKHZhciBpPSAwO2k8MTE7aSsrKXtcblxuICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICBtYXhfcG9zc2libGVfbis9ZGl2O1xuXG4gICAgICAgICAgICAvL3g9TWF0aC5mbG9vcih4LzMpO1xuICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgIC8vdmFyIHh5ID0gVC5NYXRoLnh5Um90YXRlKHgseSw1Nyk7XG4gICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgIC8veT14eS55O1xuXG4gICAgICAgICAgICBfeD0oLXkqaykrKHgqa18pO1xuICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICB4PU1hdGguZmxvb3IoX3gvNCk7XG4gICAgICAgICAgICB5PU1hdGguZmxvb3IoX3kvNCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbj1uL21heF9wb3NzaWJsZV9uO1xuXG4gICAgICAgIGlmKG48MCluLT1NYXRoLmZsb29yKG4pO1xuICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAvL3RvZG8vL3pfbWFwX2NhY2hlW2tleV09bjtcbiAgICAgICAgcmV0dXJuKG4pO1xuXG4gICAgfSwyKVxuICAgICxcbiAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDIsMC4wMDAzLDAuMDAwMywwLjAwMDUsMC4wMDA2LDAuMDAwNywwLjAwMDksMC4wMDEsMC4wMDEsMC4wMDEsMC4wMDEyLDAuMDAxNCwwLjAwMTUsMC4wMDE2LDAuMDAyMSwwLjAwMjUsMC4wMDMsMC4wMDMzLDAuMDAzNCwwLjAwMzcsMC4wMDM4LDAuMDA0MiwwLjAwNDYsMC4wMDQ5LDAuMDA1NywwLjAwNjUsMC4wMDY4LDAuMDA3MiwwLjAwNzQsMC4wMDc5LDAuMDA4NCwwLjAwOSwwLjAwOTYsMC4wMTA1LDAuMDExNSwwLjAxMjMsMC4wMTMxLDAuMDE0MiwwLjAxNDgsMC4wMTU5LDAuMDE2NiwwLjAxODQsMC4wMTksMC4wMjA0LDAuMDIxLDAuMDIyLDAuMDIzMiwwLjAyNDUsMC4wMjYsMC4wMjY2LDAuMDI3NywwLjAyOSwwLjAyOTcsMC4wMzEsMC4wMzE4LDAuMDMzMSwwLjAzNDYsMC4wMzYxLDAuMDM3OCwwLjAzODksMC4wNDA0LDAuMDQxNCwwLjA0MzEsMC4wNDU2LDAuMDQ3NSwwLjA1MDEsMC4wNTE3LDAuMDUzMywwLjA1NDgsMC4wNTY2LDAuMDU4OSwwLjA2MDksMC4wNjIyLDAuMDYzNSwwLjA2NTgsMC4wNjc4LDAuMDY5MiwwLjA3MTIsMC4wNzMzLDAuMDc1MSwwLjA3NzQsMC4wNzksMC4wODEzLDAuMDgzNywwLjA4NTksMC4wODgsMC4wOTAyLDAuMDkyNywwLjA5NjEsMC4wOTg4LDAuMTAwMywwLjEwMzEsMC4xMDUsMC4xMDcxLDAuMTEsMC4xMTEzLDAuMTEzNywwLjExNjUsMC4xMTg3LDAuMTIxOCwwLjEyNDMsMC4xMjc3LDAuMTI5NywwLjEzMjMsMC4xMzUzLDAuMTM3MSwwLjEzOTUsMC4xNDI2LDAuMTQ0OSwwLjE0NzQsMC4xNTA5LDAuMTUzNiwwLjE1NiwwLjE1ODIsMC4xNjA1LDAuMTYzMywwLjE2NjIsMC4xNjkyLDAuMTcyNiwwLjE3NTUsMC4xNzgxLDAuMTgxMywwLjE4NDIsMC4xODY5LDAuMTg5OSwwLjE5MzksMC4xOTc1LDAuMjAwMSwwLjIwMjksMC4yMDcsMC4yMTA4LDAuMjEzNSwwLjIxNTgsMC4yMTg3LDAuMjIxLDAuMjIzOCwwLjIyNiwwLjIyODMsMC4yMzI2LDAuMjM2MiwwLjIzOTQsMC4yNDI3LDAuMjQ1NSwwLjI0ODUsMC4yNTA4LDAuMjUzMiwwLjI1NjgsMC4yNTk0LDAuMjYyOCwwLjI2NTEsMC4yNjc4LDAuMjcxMiwwLjI3MzgsMC4yNzYsMC4yNzkyLDAuMjgxOSwwLjI4NTIsMC4yODg1LDAuMjkwOCwwLjI5NDMsMC4yOTY5LDAuMjk5NCwwLjMwMTksMC4zMDQ5LDAuMzA3NywwLjMxMDgsMC4zMTM1LDAuMzE2MiwwLjMxOTQsMC4zMjE2LDAuMzI0MywwLjMyNzYsMC4zMzA3LDAuMzMzNCwwLjMzNiwwLjMzODYsMC4zNDIxLDAuMzQ0MywwLjM0NjIsMC4zNDg0LDAuMzUxLDAuMzUzNSwwLjM1NjksMC4zNTkzLDAuMzYxOCwwLjM2NDIsMC4zNjU5LDAuMzY4MSwwLjM3MDYsMC4zNzIyLDAuMzc0MiwwLjM3NzIsMC4zNzk0LDAuMzgxNiwwLjM4MzcsMC4zODY1LDAuMzg3OSwwLjM5MDcsMC4zOTI1LDAuMzk0NywwLjM5NjcsMC4zOTg1LDAuMzk5OCwwLjQwMjEsMC40MDM1LDAuNDA1NCwwLjQwNjcsMC40MDg4LDAuNDEwNywwLjQxMzMsMC40MTQxLDAuNDE2MSwwLjQxNzcsMC40MTkzLDAuNDIwOSwwLjQyMTksMC40MjM0LDAuNDI0NSwwLjQyNjQsMC40MjgzLDAuNDMwMiwwLjQzMTgsMC40MzI3LDAuNDM0NiwwLjQzNjMsMC40MzgxLDAuNDQsMC40NDA5LDAuNDQzNSwwLjQ0NSwwLjQ0NjIsMC40NDg0LDAuNDQ5MiwwLjQ1MDYsMC40NTE4LDAuNDUzMywwLjQ1NDgsMC40NTU0LDAuNDU2LDAuNDU3MywwLjQ1ODgsMC40NjA1LDAuNDYxNiwwLjQ2MywwLjQ2MzgsMC40NjU2LDAuNDY2MywwLjQ2NzIsMC40Njg0LDAuNDY5NiwwLjQ3MDgsMC40NzIxLDAuNDczLDAuNDczNywwLjQ3NDcsMC40NzU2LDAuNDc2NSwwLjQ3ODEsMC40NzkxLDAuNDgwMiwwLjQ4MDksMC40ODE5LDAuNDgyNCwwLjQ4MywwLjQ4MzgsMC40ODQ3LDAuNDg1OSwwLjQ4NjUsMC40ODcsMC40ODc1LDAuNDg4MywwLjQ4OTQsMC40OTAxLDAuNDkwNywwLjQ5MTUsMC40OTI5LDAuNDkzNCwwLjQ5NCwwLjQ5NDksMC40OTU1LDAuNDk2LDAuNDk2NywwLjQ5NzEsMC40OTc1LDAuNDk4MSwwLjQ5OSwwLjQ5OTcsMC41MDA1LDAuNTAwOCwwLjUwMTgsMC41MDI0LDAuNTAzMiwwLjUwMzgsMC41MDQyLDAuNTA0NiwwLjUwNSwwLjUwNTksMC41MDY3LDAuNTA3LDAuNTA3NCwwLjUwNzcsMC41MDg0LDAuNTA4NiwwLjUwOTUsMC41MTA0LDAuNTEwOSwwLjUxMTcsMC41MTIyLDAuNTEyOSwwLjUxMzYsMC41MTQsMC41MTQxLDAuNTE0NSwwLjUxNSwwLjUxNTMsMC41MTU3LDAuNTE2MiwwLjUxNjksMC41MTcyLDAuNTE3NiwwLjUxOCwwLjUxODYsMC41MTkzLDAuNTE5NywwLjUyMDIsMC41MjA3LDAuNTIwOSwwLjUyMTQsMC41MjE4LDAuNTIyMywwLjUyMzEsMC41MjM3LDAuNTI0NCwwLjUyNDYsMC41MjQ5LDAuNTI1OSwwLjUyNjEsMC41MjY5LDAuNTI3MiwwLjUyNzUsMC41MjgxLDAuNTI4MywwLjUyODUsMC41MjkxLDAuNTMwMiwwLjUzMSwwLjUzMTcsMC41MzIsMC41MzI2LDAuNTMzNCwwLjUzMzYsMC41MzQxLDAuNTM0MywwLjUzNDUsMC41MzQ5LDAuNTM1MywwLjUzNTcsMC41MzY0LDAuNTM3NywwLjUzODIsMC41Mzg4LDAuNTM5MywwLjUzOTksMC41NDAzLDAuNTQxMiwwLjU0MTksMC41NDMsMC41NDM3LDAuNTQ0NiwwLjU0NTcsMC41NDY2LDAuNTQ3NiwwLjU0ODIsMC41NDg2LDAuNTQ5MSwwLjU0OTUsMC41NTAzLDAuNTUwNiwwLjU1MTUsMC41NTIyLDAuNTUyNywwLjU1NCwwLjU1NSwwLjU1NTMsMC41NTU3LDAuNTU2MiwwLjU1NjksMC41NTc4LDAuNTU4NiwwLjU1OTUsMC41NjA4LDAuNTYxNiwwLjU2MjYsMC41NjM0LDAuNTY0NSwwLjU2NTIsMC41NjY3LDAuNTY3MywwLjU2ODMsMC41Njk3LDAuNTcwNywwLjU3MjMsMC41NzM5LDAuNTc1LDAuNTc1OCwwLjU3NzEsMC41Nzc5LDAuNTc5MSwwLjU4MDMsMC41ODE3LDAuNTgzMywwLjU4NDksMC41ODY1LDAuNTg3NiwwLjU4ODQsMC41ODk5LDAuNTkxOSwwLjU5MjksMC41OTQyLDAuNTk1NCwwLjU5NjksMC41OTg3LDAuNTk5OCwwLjYwMTgsMC42MDM2LDAuNjA1MiwwLjYwNjMsMC42MDc3LDAuNjA5OSwwLjYxMTYsMC42MTM2LDAuNjE1NCwwLjYxNjYsMC42MTg1LDAuNjIwMSwwLjYyMjMsMC42MjM4LDAuNjI1OCwwLjYyNzgsMC42Mjk1LDAuNjMxLDAuNjMyNCwwLjYzNDQsMC42MzU4LDAuNjM3MiwwLjYzOTUsMC42NDE0LDAuNjQzNCwwLjY0NTEsMC42NDcyLDAuNjQ5MywwLjY1MTMsMC42NTM2LDAuNjU1OSwwLjY1NzgsMC42NTk4LDAuNjYyMiwwLjY2MzgsMC42NjcsMC42Njk2LDAuNjcxLDAuNjc0LDAuNjc2NSwwLjY3OSwwLjY4MTEsMC42ODM2LDAuNjg2MSwwLjY4ODQsMC42OTAzLDAuNjkzMywwLjY5NDYsMC42OTc2LDAuNjk5NywwLjcwMjcsMC43MDQ5LDAuNzA4NCwwLjcxMDksMC43MTI4LDAuNzE2NCwwLjcxODksMC43MjIyLDAuNzI0NSwwLjcyNzEsMC43MzA1LDAuNzMyNiwwLjczNjcsMC43Mzk4LDAuNzQyMSwwLjc0NDMsMC43NDYxLDAuNzQ4MywwLjc1MDcsMC43NTQsMC43NTY2LDAuNzU4NywwLjc2MTUsMC43NjM5LDAuNzY2MiwwLjc2OTMsMC43NzIzLDAuNzc1MywwLjc3NjksMC43Nzk3LDAuNzgyMiwwLjc4NDMsMC43ODY5LDAuNzg5MSwwLjc5MTgsMC43OTQ0LDAuNzk4MiwwLjgwMSwwLjgwNDEsMC44MDY4LDAuODA5NCwwLjgxMiwwLjgxNDgsMC44MTc0LDAuODIsMC44MjE5LDAuODI0LDAuODI1OSwwLjgyODcsMC44MzExLDAuODMzMywwLjgzNDksMC44Mzc0LDAuODQxLDAuODQzMywwLjg0NTYsMC44NDgxLDAuODUxOCwwLjg1NCwwLjg1NjIsMC44NTg4LDAuODYyLDAuODY0LDAuODY2NiwwLjg2OTMsMC44NzE5LDAuODczNywwLjg3NDksMC44NzczLDAuODc5MywwLjg4MTYsMC44ODM5LDAuODg3LDAuODg4OCwwLjg5MDUsMC44OTI0LDAuODk0OCwwLjg5NjYsMC44OTg2LDAuOTAwOSwwLjkwMjksMC45MDM5LDAuOTA2MywwLjkwOCwwLjkwOTUsMC45MTEsMC45MTI1LDAuOTE1LDAuOTE3MywwLjkxODYsMC45MjA5LDAuOTIyOCwwLjkyNDksMC45MjU5LDAuOTI3LDAuOTI5LDAuOTMwMywwLjkzMjIsMC45MzMyLDAuOTM0MywwLjkzNTYsMC45MzcyLDAuOTM4NywwLjk0MDcsMC45NDI3LDAuOTQ0LDAuOTQ1OSwwLjk0NzMsMC45NDksMC45NTA4LDAuOTUyMSwwLjk1MzMsMC45NTU1LDAuOTU2OSwwLjk1OCwwLjk1OTIsMC45NjA2LDAuOTYxMiwwLjk2MTcsMC45NjIsMC45NjI3LDAuOTY0MiwwLjk2NDYsMC45NjU4LDAuOTY3LDAuOTY4LDAuOTY4NCwwLjk2ODgsMC45Njk4LDAuOTcwNiwwLjk3MTksMC45NzI3LDAuOTc0LDAuOTc0NywwLjk3NjEsMC45Nzc0LDAuOTc4NSwwLjk3OTMsMC45ODAyLDAuOTgxMSwwLjk4MTcsMC45ODIzLDAuOTgyOCwwLjk4NCwwLjk4NDYsMC45ODUxLDAuOTg1OCwwLjk4NjMsMC45ODY5LDAuOTg3LDAuOTg3NCwwLjk4NzksMC45ODg2LDAuOTg4OCwwLjk4OTUsMC45OTAzLDAuOTkwNCwwLjk5MDcsMC45OTEyLDAuOTkxMywwLjk5MTcsMC45OTIsMC45OTI4LDAuOTkyOSwwLjk5MzYsMC45OTM5LDAuOTk0MiwwLjk5NDYsMC45OTQ5LDAuOTk1NSwwLjk5NTUsMC45OTU5LDAuOTk2MywwLjk5NjQsMC45OTY2LDAuOTk2NiwwLjk5NjgsMC45OTY5LDAuOTk3MSwwLjk5NzMsMC45OTc4LDAuOTk4MSwwLjk5ODUsMC45OTg2LDAuOTk4OCwwLjk5ODgsMC45OTg5LDAuOTk4OSwwLjk5OSwwLjk5OSwwLjk5OSwwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTYsMC45OTk2LDAuOTk5NywwLjk5OTcsMC45OTk3LDAuOTk5OCwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV1cbiAgICAsXG5cbiAgICBuZXcgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZShbXG5cbiAgICAgICAgeyBhbW91bnQ6IDEyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDFdfSwvL21vxZllXG4gICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTFdfSwvL8WZZWthXG4gICAgICAgIHsgYW1vdW50OiAzMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEyXX0sLy90csOhdmEgamFyb1xuICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA5XX0sLy90csOhdmEgdG94aWNcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDhdfSwvL3Ryw6F2YSBub3JtYWxcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgIHsgYW1vdW50OiA1MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEzXX0sLy90csOhdmEgcG96aW1cbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyAzXX0sLy9zbsOtaC9sZWRcbiAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgN119LC8vc27DrWgvbGVkXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICBdKSxcblxuXG4gICAgZnVuY3Rpb24ob2JqZWN0LHZpcnR1YWxfb2JqZWN0cyl7XG5cbiAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgLyppZihvYmplY3QuZ2V0Q29kZSgpPT01KXtcbiAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDEse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjYpJTYrJ2RhcmsnK01hdGguZmxvb3IoVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigyLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo0KSU0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDAuNStULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuXG4gICAgICAgIH1lbHNlKi9cbiAgICAgICAgaWYob2JqZWN0LmdldENvZGUoKT09MTApe1xuXG4gICAgICAgICAgICBpZihULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDMse3g6b2JqZWN0LngseTpvYmplY3QueX0pPjAuOTUpe1xuXG4gICAgICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J3RyZWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAzK1QuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNix7eDpvYmplY3QueCx5Om9iamVjdC55fSkvMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSoyMC0xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMjAtMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiBULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjM2MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG4pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lID0gbmV3IFQuR2FtZShcbiAgICBULk1hdGgucHJldHR5TnVtYmVyLFxuICAgIFQuTWF0aC5wcmV0dHlOdW1iZXJcbik7IiwiXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIGRpc3RhbmNlOiAgIDAsXG4gICAgICAgIHN0cmVuZ3RoOiAgIDAsXG4gICAgICAgIHJvdW5kczogICAgIDEsXG4gICAgICAgIGNvb2xkb3duOiAgIDFcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2F0dGFjaycpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKChNYXRoLnBvdyh0aGlzLnBhcmFtcy5kaXN0YW5jZSwyKSp0aGlzLnBhcmFtcy5zdHJlbmd0aCp0aGlzLnBhcmFtcy5yb3VuZHMqKDEvdGhpcy5wYXJhbXMuY29vbGRvd24pKSoxMDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAyfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgZXhlY3V0ZShnYW1lLGF0dGFja2VyLGF0dGFja2VkLHJlc291cmNlc19hdHRhY2tlcil7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2RlZmVuY2UgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcbiAgICAgICAgICAgIHZhciBhdHRhY2tlZF9hdHRhY2sgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2xpZmUgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2xpZmUnKS5wYXJhbXM7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZWRfbGlmZSA9IGF0dGFja2VkLmdldEFjdGlvbignbGlmZScpLnBhcmFtcztcblxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWlzc2luZyBhY3Rpb25cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2s9YXR0YWNrZXJfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRhY2tlciBoYXMgbm90IGFiaWxpdHkgdG8gYXR0YWNrJyk7XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZT1hdHRhY2tlcl9kZWZlbmNlLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlZF9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2s9YXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdhdHRhY2snKS5wYXJhbXM7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlZF9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZT1hdHRhY2tlZF9kZWZlbmNlLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURpc3RhbmNlXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgaWYoZGlzdGFuY2U+YXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlKXtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcrZGlzdGFuY2UrJyBmaWVsZHMuIEF0dGFjayBkaXN0YW5jZSBpcyBvbmx5ICcrYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlKycgZmllbGRzLicpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db29sZG93blxuICAgICAgICAgICAgaWYoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKXtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBhY3Rpb24gY2FuIGJlIGV4ZWN1dGVkIGluICcrYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkSW4oKSsnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVNldCB1c2FnZVxuICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVmZW5jZVxuXG4gICAgICAgICAgICAvL3IoJ2F0dGFjaycsYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCk7XG4gICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgtPVxuICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aDwwKWF0dGFja2VyX2F0dGFjay5zdHJlbmd0aD0wO1xuXG5cblxuICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoLT1cbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlLmRlZmVuY2U7XG4gICAgICAgICAgICBpZihhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg8MClhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg9MDtcblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgLy9hdHRhY2tlZF9saWZlLmxpZmU9MTAwMDtcblxuXG4gICAgICAgICAgICB3aGlsZShcbiAgICAgICAgICAgICAgICAgICAgKGF0dGFja2VyX2F0dGFjay5yb3VuZHMgfHwgYXR0YWNrZWRfYXR0YWNrLnJvdW5kcykgJiZcbiAgICAgICAgICAgICAgICAgICAgKGF0dGFja2VyX2xpZmUubGlmZT4xICYmIGF0dGFja2VkX2xpZmUubGlmZT4xKVxuICAgICAgICAgICAgICAgICl7XG5cbiAgICAgICAgICAgICAgICByKCdyb3VuZCcsYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCk7XG4gICAgICAgICAgICAgICAgcignbGlmZScsYXR0YWNrZWRfbGlmZS5saWZlLGF0dGFja2VyX2xpZmUubGlmZSk7XG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9saWZlLmxpZmUtPWF0dGFja2VyX2F0dGFjay5zdHJlbmd0aDtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9saWZlLmxpZmUtPWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnJvdW5kcy0tO1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2xpZmUubGlmZTwxKWF0dGFja2VyX2xpZmUubGlmZT0xO1xuICAgICAgICAgICAgaWYoYXR0YWNrZWRfbGlmZS5saWZlPDEpYXR0YWNrZWRfbGlmZS5saWZlPTE7XG5cblxuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgZGVmZW5jZTogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdkZWZlbmNlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKHRoaXMucGFyYW1zLmRlZmVuY2UpKjgwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDF9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cbik7XG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgbGlmZTogICAxLFxuICAgICAgICBtYXhfbGlmZTogICAxXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdsaWZlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbbmV3IFQuUmVzb3VyY2VzKCldKTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cbik7XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICB3b29kOiAgIDAsXG4gICAgICAgIGlyb246ICAgMCxcbiAgICAgICAgY2xheTogICAwLFxuICAgICAgICBzdG9uZTogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdtaW5lJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKHRoaXMucGFyYW1zLmFtb3VudCkqMzYwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICA0fSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyB0aWNrKCl7Ly90b2RvIG9yIG1heWJlIGV4ZWN1dGVcbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBzcGVlZDogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdtb3ZlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLnNwZWVkLDIpKSoxMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAwfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMX0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSxvYmplY3QsZGVzdGluYXRpb25zLyosb2JqZWN0c19uZWFyYnkscmVzb3VyY2VzKi8pe1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIGFjdGlvbi8vdG9kbyBtYXliZSBhdXRvXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gb2JqZWN0LmdldEFjdGlvbignbW92ZScpO1xuICAgICAgICAgICAgaWYoYWN0aW9uIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgaGFzIG5vdCBhYmlsaXR5IHRvIG1vdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgdmFyIHN0YXJ0X3Bvc2l0aW9uPW9iamVjdC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZGVzdGluYXRpb25zLnVuc2hpZnQoc3RhcnRfcG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgb2JqZWN0LnBhdGggPSBULlBhdGgubmV3Q29uc3RhbnRTcGVlZChkZXN0aW5hdGlvbnMsYWN0aW9uLnBhcmFtcy5zcGVlZCk7XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgb2JqZWN0LmdldEFjdGlvbignbW92ZScpLm5vd0V4ZWN1dGVkKCk7Ly90b2RvIGlzIGl0IG5lZWRlZFxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyB0aWNrKCl7Ly90b2RvIG1heWJlID8/PyB0b2RvXG4gICAgICAgIH0qL1xuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgcmVnZW5lcmF0ZTogICAxMDAsXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdyZWdlbmVyYXRlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKDEvdGhpcy5wYXJhbXMucmVnZW5lcmF0ZSkqMzYwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICA0fSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAyfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7Ly90b2RvIG1heWJlIHRpY2s/Pz8/XG4gICAgICAgIH0qL1xuXG5cblxuXG4gICAgfVxuKTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHJlcGFpcjogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdyZXBhaXInKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoMS8odGhpcy5wYXJhbXMucmVwYWlyLzEwMCkpKjEwMDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgNH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgNH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypzdGF0aWMgZXhlY3V0ZSgpe1xuICAgICAgICAgICAgLy90b2RvXG4gICAgICAgIH0qL1xuXG5cblxuXG4gICAgfVxuKTtcblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgdGhyb3VnaHB1dDogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCd0aHJvdWdocHV0Jyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLnRocm91Z2hwdXQvMTAwLDIpKSoxMCowLjA1KTsvL3RvZG9cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDF9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgIH1cbik7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
