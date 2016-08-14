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
            var result, shorthandRegex;
            shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
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
    function class_1(max_life_modifier, price_key_modifier) {
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
    class_1.prototype.getObjectPriceBases = function (object) {
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
    class_1.prototype.getObjectMaxLife = function (object) {
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
    class_1.prototype.getObjectPrices = function (object) {
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
    class_1.prototype.getObjectPrice = function (object) {
        var price = new T.Resources({});
        //console.log('empty price',price);
        var prices = this.getObjectPrices(object);
        prices.forEach(function (price_) {
            price.add(price_);
        });
        price.apply(this.price_key_modifier);
        return (price);
    };
    class_1.prototype.installActionClass = function (action_empty_instance_params, action_class) {
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
    class_1.prototype.getActionClass = function (action_type) {
        var action_class = this.action_classes[action_type];
        if (typeof action_class == 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type + '. There are only these action types: ' + T.ArrayFunctions.getKeys(this.action_classes).join(', '));
        }
        return (action_class);
    };
    class_1.prototype.newActionInstance = function (action) {
        //todo solve defense vs. defence
        if (action.type === 'defense') {
            action.type = 'defence';
            action.params.defence = action.params.defense;
            delete action.params.defense;
        }
        var action_class = this.getActionClass(action.type);
        return new action_class(action);
    };
    class_1.prototype.createActionExecute = function (action_type) {
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
    class_1.prototype.getActionEmptyInstance = function (action_type) {
        var action_instance = this.action_empty_instances[action_type];
        if (typeof action_instance === 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type);
        }
        return (action_instance);
    };
    return class_1;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
T.Game.Action = (function () {
    function class_2(action) {
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
    class_2.prototype.countPriceBase = function () {
        return (0);
    };
    class_2.prototype.getPriceResources = function () {
        return ([]);
    };
    class_2.execute = function () {
        throw new Error('You can not execute passive action.');
    };
    /**
     * In how many seconds can be this action instance executed?
     * @returns {number}
     */
    class_2.prototype.canBeExecutedIn = function () {
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
    class_2.prototype.canBeExecutedNow = function () {
        return (this.canBeExecutedIn() === 0);
    };
    /**
     * Set actual date as date of execution this action instance
     */
    class_2.prototype.nowExecuted = function () {
        this.last_use = new Date();
    };
    /**
     * Creates html profile of action ability
     * @returns {string}
     */
    class_2.prototype.createHtmlProfile = function () {
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
    return class_2;
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
    function class_3(getZ, z_normalizing_table, biotope, virtualObjectGenerator) {
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
    class_3.prototype.getZMapCircle = function (center_integer, radius) {
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
    class_3.prototype.terrainMap = function (map) {
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
    class_3.prototype.getMapArrayCircle = function (center_integer, radius) {
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
    class_3.prototype.convertMapArrayToObjects = function (map_array, center_integer, radius) {
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
    class_3.prototype.getPureMap = function (center, radius, not_center) {
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
    class_3.prototype.getVirtualObjectsFromTerrainObjects = function (objects) {
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
    class_3.prototype.getCompleteObjects = function (real_objects, center, radius, natural_objects, not_center) {
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
    return class_3;
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
    function class_4(terrains) {
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
    class_4.prototype.getZTerrain = function (z) {
        for (var i = this.terrains.length - 1; i >= 0; i--) {
            if (z >= this.terrains[i].from)
                return (this.terrains[i].terrain);
        }
    };
    return class_4;
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
    function class_5(json) {
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
    class_5.prototype.clone = function () {
        return (new T.Model(JSON.parse(JSON.stringify(this))));
    };
    /**
     * @param {number} rotation
     * @param {number} size
     */
    class_5.prototype.addRotationSize = function (rotation, size) {
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
    class_5.prototype.range = function (dimension) {
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
    class_5.prototype.moveBy = function (move_x, move_y, move_z) {
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
    class_5.prototype.joinModelZ = function (model, move_x, move_y) {
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
    class_5.prototype.joinModel = function (model, move_x, move_y) {
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
    class_5.prototype.getDeepCopyWithoutLinks = function () {
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
    class_5.prototype.getLinearParticles = function (ignore_root_rotation_size) {
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
    class_5.prototype.filterPath = function (path) {
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
    class_5.prototype.filterPathSiblings = function (path) {
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
    class_5.prototype.aggregateResourcesVolumes = function () {
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
    class_5.prototype.getHash = function () {
        return 'xxx' + JSON.stringify(this.particles).length; //todo better
    };
    return class_5;
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
    function class_6() {
    }
    /**
     * Add missing params into particle
     * @static
     * @param {object} particle
     * @return {object} particle
     */
    class_6.addMissingParams = function (particle) {
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
    class_6.getTriangles = function (particle, point_class) {
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
    class_6.get3D = function (particle) {
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
    class_6.get2Dlines = function (particle, base) {
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
    class_6.collisionLinesDetect = function (lines1, lines2) {
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
    class_6.collision2D = function (particle1, particle2) {
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
    return class_6;
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
            var digits = Math.ceil(T.TMath.baseLog(10, number));
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
r(T);
T.World.game = new T.Game(T.TMath.prettyNumber, T.TMath.prettyNumber);
T.World.game.installActionClass({
    distance: 0,
    strength: 0,
    rounds: 1,
    cooldown: 1
}, (function (_super) {
    __extends(class_7, _super);
    function class_7() {
        _super.apply(this, arguments);
    }
    class_7.getType = function () {
        return ('attack');
    };
    class_7.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.distance, 2) * this.params.strength * this.params.rounds * (1 / this.params.cooldown)) * 100 * 0.05);
    };
    class_7.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 2 })
        ]);
    };
    class_7.execute = function (game, attacker, attacked, resources_attacker) {
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
    return class_7;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    defence: 0
}, (function (_super) {
    __extends(class_8, _super);
    function class_8() {
        _super.apply(this, arguments);
    }
    class_8.getType = function () {
        return ('defence');
    };
    class_8.prototype.countPriceBase = function () {
        return ((this.params.defence) * 800 * 0.05);
    };
    class_8.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 1 }),
        ]);
    };
    return class_8;
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
    __extends(class_9, _super);
    function class_9() {
        _super.apply(this, arguments);
    }
    class_9.getType = function () {
        return ('life');
    };
    class_9.prototype.countPriceBase = function () {
        return (0);
    };
    class_9.prototype.getPriceResources = function () {
        return ([new T.Resources()]);
    };
    return class_9;
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
    __extends(class_10, _super);
    function class_10() {
        _super.apply(this, arguments);
    }
    class_10.getType = function () {
        return ('mine');
    };
    class_10.prototype.countPriceBase = function () {
        return ((this.params.amount) * 3600 * 0.05);
    };
    class_10.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 3 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_10;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    speed: 0
}, (function (_super) {
    __extends(class_11, _super);
    function class_11() {
        _super.apply(this, arguments);
    }
    class_11.getType = function () {
        return ('move');
    };
    class_11.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
    };
    class_11.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            //new T.Resources({'stone':  0}),
            new T.Resources({ 'iron': 1 })
        ]);
    };
    class_11.execute = function (game, object, destinations /*,objects_nearby,resources*/) {
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
    return class_11;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    regenerate: 100
}, (function (_super) {
    __extends(class_12, _super);
    function class_12() {
        _super.apply(this, arguments);
    }
    class_12.getType = function () {
        return ('regenerate');
    };
    class_12.prototype.countPriceBase = function () {
        return ((1 / this.params.regenerate) * 3600 * 0.05);
    };
    class_12.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 2 })
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
    repair: 0
}, (function (_super) {
    __extends(class_13, _super);
    function class_13() {
        _super.apply(this, arguments);
    }
    class_13.getType = function () {
        return ('repair');
    };
    class_13.prototype.countPriceBase = function () {
        return ((1 / (this.params.repair / 100)) * 1000 * 0.05);
    };
    class_13.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_13;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    throughput: 0
}, (function (_super) {
    __extends(class_14, _super);
    function class_14() {
        _super.apply(this, arguments);
    }
    class_14.getType = function () {
        return ('throughput');
    };
    class_14.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.throughput / 100, 2)) * 10 * 0.05); //todo
    };
    class_14.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 3 }),
            new T.Resources({ 'stone': 1 }),
            new T.Resources({ 'iron': 0 })
        ]);
    };
    return class_14;
}(T.Game.Action)));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvZy50cyIsIjEwLV9wb3NpdGlvbi8xMC1jb2xvci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLTNkLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLXBvbGFyLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzE1LXBvc2l0aW9uLWRhdGUuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMjAtYXJlYS5jbGFzcy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcmVzb3VyY2VzLmNsYXNzLnRzIiwiMTAtdG1hdGguc3RhdGljLnRzIiwiMTAtdXNlci5jbGFzcy50cyIsIjIwLXdvcmxkLzAwLXRlcnJhaW5zLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMTAtbWFwLWdlbmVyYXRvci5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzIwLWdhbWUuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvYXR0YWNrLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL2RlZmVuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbGlmZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9taW5lLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21vdmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvcmVnZW5lcmF0ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZXBhaXIudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvdGhyb3VnaHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SDs7O0dBR0c7QUFFSCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDWCxNQUFNLENBQUMsT0FBTyxHQUFJLENBQUMsQ0FBQztBQ1pwQjs7R0FFRztBQUdILElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FDTGxDOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0EySFA7QUEzSEQsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQUNOOztPQUVHO0lBQ0g7UUFFSTs7Ozs7O1dBTUc7UUFDSCxlQUFtQixDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQVMsRUFBUSxDQUFPO1lBQWQsaUJBQWMsR0FBZCxPQUFjO1lBQTFELE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQU07WUFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFB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USxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO1lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztZQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztZQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7WUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO1lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUMxSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFF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LENBQUM7WUFDeEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFBQSxDQUFDLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QiwyQkFBMkI7WUFDM0IsTUFBTSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZCxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBRUosQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM3QyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzVDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztTQUloRCxDQUFDLEVBR0YsVUFBUyxNQUFNLEVBQUMsZUFBZTtZQUUzQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFFLFNBQVMsQ0FBQztnQkFBQSxNQUFNLENB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QyxNQUFNLENBQUMsVUFBVSxHQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU07SUFDbkUsQ0FBQztJQUdELG9DQUFpQixHQUFqQjtRQUVJLE1BQU0sQ0FBQSxDQUFDO1lBQ0gsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxFQUFJLENBQUMsRUFBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBSSxDQUFDLEVBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUcsQ0FBQyxFQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxFQUFJLENBQUMsRUFBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHTCxlQUFDO0FBQUQsQ0F4QkEsQUF3QkMsQ0F4QmEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBd0IxQixDQUNKLENBQUMiLCJmaWxlIjoidG93bnMtc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5cbnZhciBUID0ge307XG5tb2R1bGUuZXhwb3J0cyA9ICBUO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhlam55IG9uIDE0LjguMTYuXG4gKi9cblxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuQ29sb3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuICAgIC8qKlxuICAgICAqIE9iamVjdCB3aGljaCByZXByZXNlbnRzIFJHQkEgY29sb3IuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIENvbG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHIgcmVkIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGcgZ3JlZW4gZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gYiBibHVlIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGEgYWxwaGEgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlcixwdWJsaWMgZzogbnVtYmVyLHB1YmxpYyBiOiBudW1iZXIscHVibGljIGEgPSAyNTUpIHtcbiAgICAgICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgICAgICB0aGlzLmcgPSBnO1xuICAgICAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGRlZXAgY2xvbmUgb2QgVC5Db2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn1cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCk6Q29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucix0aGlzLmcsdGhpcy5iLHRoaXMuYSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZHMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgICAgIHRoaXMuYSA9IE1hdGgucm91bmQodGhpcy5hKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNzcyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDc3NDb2xvcigpIHtcblxuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmEgPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3IoJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hLzI1NSoxMDApLzEwMCArICcpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3IgKGlnbm9yZXMgYWxwaGEgY2hhbmVsLilcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuICMwMGZmMDBcbiAgICAgICAgICovXG4gICAgICAgIGdldEhleCgpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gJyMnICsgKCgxIDw8IDI0KSArICh0aGlzLnIgPDwgMTYpICsgKHRoaXMuZyA8PCA4KSArIHRoaXMuYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBuZXcgVC5Db2xvciBmb3JtIGhleCBjb2RlIG9mIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXggY29kZSBvZiBjb2xvciBlZy4gIzAwZmYwMFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjcmVhdGVGcm9tSGV4KGhleDogc3RyaW5nKTogQ29sb3Ige1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0OkNvbG9yICwgc2hvcnRoYW5kUmVnZXg6IFJlZ0V4cDtcblxuICAgICAgICAgICAgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjcmVhdGluZyBULkNvbG9yIGZyb20gJyArIGhleCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBhdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUe1xuXG4gICAgZXhwb3J0IGNsYXNzIFBhdGgge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gey4uLlQuUG9zaXRpb25EYXRlfSBQb3NpdGlvbiB3aXRoIGRhdGUgYXQgbGVhc3QgMlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuXG5cbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vaWYoYXJncy5sZW5ndGg9PT0xICYmIGFyZ3MgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvLyAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3M7XG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL31cblxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlOiBQb3NpdGlvbkRhdGUsIGxhc3RfZGF0ZSA9IC0xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbl9kYXRlID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uRGF0ZSkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldID0gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCBtdXN0IGJlIFQuUG9zaXRpb25EYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RfZGF0ZSA+PSBwb3NpdGlvbl9kYXRlLmRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRlcyBzaG91bGQgYmUgY29uc2VjdXRpdmUgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoICgnICsgcG9zaXRpb25fZGF0ZS5kYXRlICsgJyBzaG91bGQgYmUgYWZ0ZXIgJyArIGxhc3RfZGF0ZSArICcpLiAnICsgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGFzdF9kYXRlID0gcG9zaXRpb25fZGF0ZS5kYXRlO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5LjxULlBvc2l0aW9uPn0gYXJyYXlfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5QYXRofVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIG5ld0NvbnN0YW50U3BlZWQoYXJyYXlfcG9zaXRpb246IEFycmF5LCBzcGVlZDogbnVtYmVyLCBkYXRlID0gMCk6IFBhdGgge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05hTihzcGVlZCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHZhbGlkIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVlZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHBvc2l0aXZlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXJyYXlfcG9zaXRpb24ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhcmUgbXVzdCBiZSBhdCBsZWFzdCAyIHBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGguJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcnJheV9wb3NpdGlvbl9kYXRlID0gW1xuICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvblswXS54LCBhcnJheV9wb3NpdGlvblswXS55LCBkYXRlKVxuICAgICAgICAgICAgXTtcblxuXG4gICAgICAgICAgICB2YXIgbGFzdF9wb3NpdGlvbiA9IGFycmF5X3Bvc2l0aW9uWzBdO1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBkaXN0YW5jZTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcnJheV9wb3NpdGlvbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBULlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbGFzdF9wb3NpdGlvbi5nZXREaXN0YW5jZShwb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSAvIDEgKyBkaXN0YW5jZSAvIHNwZWVkICogMTAwMCk7XG5cblxuICAgICAgICAgICAgICAgIGxhc3RfcG9zaXRpb24gPSBwb3NpdGlvbl9kYXRlO1xuXG5cbiAgICAgICAgICAgICAgICBhcnJheV9wb3NpdGlvbl9kYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LCBhcnJheV9wb3NpdGlvbltpXS55LCBkYXRlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3JldHVybiBuZXcgdGhpcy5hcHBseSh0aGlzLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUGF0aCguLi5hcnJheV9wb3NpdGlvbl9kYXRlKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldFBvc2l0aW9ucygpIHtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ocG9zaXRpb25zKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50IGluIHdoaWNoIHNlZ21lbnQgaXMgVC5QYXRoIHByb2dyZXNzXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNlZ21lbnQoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIEE6IFBvc2l0aW9uRGF0ZSwgQjpQb3NpdGlvbkRhdGUsIHg6IG51bWJlciwgeTogbnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZGF0ZSAvIDE7XG4gICAgICAgICAgICAgICAgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpICsgMV0uZGF0ZSAvIDE7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGkrJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcblxuICAgICAgICAgICAgICAgIGlmIChBIDw9IGRhdGUgJiYgQiA+IGRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCc8LS0tdGhpcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNvdW50aW5nIHNlZ21lbnQgaW4gVC5QYXRoLCBtYXliZSBiZWNhdXNlIG9mIHBhcmFtIGRhdGUgaXMgJyArIGRhdGUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcG9zaXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50UG9zaXRpb24oZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5kYXRlIDw9IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSk7XG5cbiAgICAgICAgICAgIHZhciB4ID0gVC5UTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS54LCBCLngpO1xuICAgICAgICAgICAgdmFyIHkgPSBULlRNYXRoLnByb3BvcnRpb25zKEEuZGF0ZSAvIDEsIGRhdGUgLyAxLCBCLmRhdGUgLyAxLCBBLnksIEIueSk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oeCwgeSkpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyByb3RhdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRSb3RhdGlvbihkYXRlID0gMCkge1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIEJBID0gQi5nZXRQb3NpdGlvbigpLnBsdXMoQS5nZXRQb3NpdGlvbigpLm11bHRpcGx5KC0xKSk7XG5cbiAgICAgICAgICAgIHZhciBwb2xhciA9IEJBLmdldFBvc2l0aW9uUG9sYXIoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvbGFyLmdldERlZ3JlZXMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgU3BlZWQgYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGZpZWxkcy9zXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNwZWVkKGRhdGU6IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcyhkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gQS5nZXREaXN0YW5jZShCKTtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IEIuZGF0ZSAtIEEuZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSAvIChkdXJhdGlvbiAvIDEwMDApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcGF0aCBpbiBwcm9ncmVzcyAodHJ1ZSkgb3IgaXQgaGFzIG5vdCBzdGFydGVkKGZhbHNlKSBvciBpdCBpcyBmaW5pc2hlZChmYWxzZSk/XG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGluUHJvZ3Jlc3MoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBtYXliZSBjb3VudFByb2dyZXNzXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbjNEIHtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHguejtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB6O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uM0QodGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbjNEIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnWycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnLCcgKyB0aGlzLnogKyAnXSc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBQb3NpdGlvblBvbGFyXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25Qb2xhciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZGlzdGFuY2U6IG51bWJlciwgZGVncmVlczogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlzdGFuY2UgPT0gJ251bWJlcicgJiYgdHlwZW9mIGRlZ3JlZXMgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25Qb2xhcih0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpICogdGhpcy5kaXN0YW5jZVxuICAgICAgICAgICAgKSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZSgpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGVncmVlcygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlZ3JlZXMgKyAzNjApICUgMzYwO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJhZGlhbnMoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLmRlZzJyYWQodGhpcy5kZWdyZWVzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy5kaXN0YW5jZSArICcsJyArIHRoaXMuZGVncmVlcyArICfCsCc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXBcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24ge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICgvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeCkpIHtcblxuICAgICAgICAgICAgICAgIHggPSB4LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gcGFyc2VGbG9hdCh4WzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KHhbMV0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgeSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90b2RvIGNoZWNrXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGNvbnN0cnVjdG9yIHBhcmFtcyB3aGlsZSBjcmVhdGluZyBULlBvc2l0aW9uIScpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGx1cyhwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54ICs9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbWludXMocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCAtPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgdGhpcy55IC09IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICBtdWx0aXBseShrOiBudW1iZXIpIHtcblxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ICogaztcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSAqIGs7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRGbG9vcmVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKE1hdGguZmxvb3IoIHRoaXMueCksTWF0aC5mbG9vciggdGhpcy55KSk7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UG9zaXRpb25Qb2xhcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvblBvbGFyKFxuICAgICAgICAgICAgICAgIFQuVE1hdGgueHkyZGlzdCh0aGlzLngsIHRoaXMueSksXG4gICAgICAgICAgICAgICAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGlzdGFuY2UocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLnh5MmRpc3QocG9zaXRpb24ueCAtIHRoaXMueCwgcG9zaXRpb24ueSAtIHRoaXMueSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICcnO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUG9zaXRpb25EYXRlXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cbiAgICAvKipcbiAgICAgKiBHbG9iYWwgcG9zaXRpb24gb24gdG93bnMgbWFwIHdpdGggdGltZVxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbkRhdGUgZXh0ZW5kcyBULlBvc2l0aW9uIHsvL3RvZG8gaXMgdGhhcmUgc29sdXRpb24gd2l0aG91dCB1c2luZyBULj9cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICAgICAgICBkYXRlID0geC5kYXRlO1xuICAgICAgICAgICAgICAgIHggPSB4Lng7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VwZXIoeCwgeSk7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInIHx8IHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZSAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBjb25zdHJ1Y3QgUG9zaXRpb25EYXRlIGlzIG5lZWRlZCB2YWxpZCBEYXRlIG5vdCAnICsgZGF0ZSArICcuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJ10gYXQgJyArXG4gICAgICAgICAgICAgICAgKHRoaXMuZGF0ZS5nZXREYXkoKSArIDEpICsgJy4nICsgKHRoaXMuZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLicgKyB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArXG4gICAgICAgICAgICAgICAgJyAnICsgdGhpcy5kYXRlLmdldEhvdXJzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0TWludXRlcygpICsgJzonICsgdGhpcy5kYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM6IEFycmF5O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgaWE6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb246IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiBib29sZWFuO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbGxpc2lvbj09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlY29sbGlzaW9uPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKnIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICApOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghc2lkZWNvbGxpc2lvbilyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIFQuQXJyYXlGdW5jdGlvbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZnVuY3Rpb25zIHRvIG1hbmlwdWxhdGUgd2l0aCBhcnJheS5cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQXJyYXlGdW5jdGlvbnMge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBLZXkgb2Ygb2JqZWN0IHdpdGggdGhpcyBJRCwgLTEgaWYgbm90IGV4aXN0XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWQyaShhcnJheTogQXJyYXksIGlkOnN0cmluZyk6YW55IHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JfbWVzc2FnZSB3aGVuIGl0ZW4gbm90IGV4aXN0c1xuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBPYmplY3Qgd2l0aCB0aGlzIElELCBudWxsIGlmIG5vdCBleGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkMml0ZW0oYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nLCBlcnJvcl9tZXNzYWdlID0gJycpOmFueSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogRGVsZXRlIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWRSZW1vdmUoYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nKTpib29sZWFuIHsvL3RvZG8gcmVmYWN0b3IgdXNlIHRoaXMgbm90IHNwbGljZVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbD1hcnJheS5sZW5ndGg7aTxsO2krKykge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggMkQgYXJyYXlcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpdGVyYXRlMkQoYXJyYXk6IEFycmF5LCBjYWxsYmFjazogRnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgICAgICAvL3IoYXJyYXkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgeUxlbiA9IGFycmF5Lmxlbmd0aDsgeSA8IHlMZW47IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4TGVuID0gYXJyYXlbeV0ubGVuZ3RoOyB4IDwgeExlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeSwgeCk7XG4gICAgICAgICAgICAgICAgICAgIC8qdG9kbyByZWZhY3RvciB0byB4LHkqL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIGZyb21cbiAgICAgICAgICogQHBhcmFtIHRvXG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBSZW1vdmVkIGl0ZW1zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcmVtb3ZlSXRlbXMoYXJyYXk6QXJyYXksIGZyb206bnVtYmVyLCB0bzpudW1iZXIpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKiogdG9kbyBzaG91bGQgaXQgYmUgdW5kZXIgVC5BcnJheUZ1bmN0aW9uc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JlY3RcbiAgICAgICAgICogQHBhcmFtIHthcnJheX0gcGF0aFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGZpbHRlclBhdGgob2JqZWN0OiBPYmplY3QsIHBhdGg6IEFycmF5PHN0cmluZz4sIHNldFZhbHVlOiBhbnkpOmFueSB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aF9pIGluIHBhdGgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBvYmplY3Rfa2V5ID0gcGF0aFtwYXRoX2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhdGhfaSA8IHBhdGgubGVuZ3RoIC0gMSB8fCB0eXBlb2Ygc2V0VmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtvYmplY3Rfa2V5XSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rocm93IG5ldyBFcnJvcignZmlsdGVyUGF0aDogS2V5IFxcJycrb2JqZWN0X2tleSsnXFwnIGluIHBhdGggaW4gb2JqZWN0IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W29iamVjdF9rZXldO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3Rbb2JqZWN0X2tleV0gPSBzZXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBBcnJheSBjb250YWluaW5nIG9ubHkgdW5pcXVlIHZhbHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHVuaXF1ZShhcnJheTogQXJyYXkpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciBuID0ge30sIHIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIG5bYXJyYXlbaV1dID0gYXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgaHRtbCB0YWJsZSBmcm9tIEpTIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsX2NsYXNzXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhcnJheTJ0YWJsZShhcnJheTpBcnJheSwgYWRkaXRpb25hbF9jbGFzcyA9ICcnKTpzdHJpbmcge1xuICAgICAgICAgICAgLy90b2RvIGNoZWNrXG5cbiAgICAgICAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgICAgICAgIHZhciByb3dzID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbHNfdGFibGUgPSBhcnJheVswXS5sZW5ndGg7Ly90b2RvIGlzIGlzIGJlc3Qgc29sdXRpb24/XG5cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRhYmxlIGNsYXNzPVwiJyArIGFkZGl0aW9uYWxfY2xhc3MgKyAnXCI+JztcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG5cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbHMgPSBhcnJheVtyb3ddLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgY29sc19zcGFuID0gY29sc190YWJsZSAtIGNvbHM7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBjb2xzOyBjb2wrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gY29scyAtIDEgJiYgY29sc19zcGFuICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjb2xzcGFuPVwiJyArIChjb2xzX3NwYW4gKyAxKSArICdcIj4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYXJyYXlbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RkPic7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgICAgIHJldHVybiAoaHRtbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGV4dHJhY3Qga2V5cyBmcm9tIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldEtleXMob2JqZWN0Ok9iamVjdCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvYmplY3QpIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEdhbWUgY29uZGl0aW9uc1xuICovXG5ULkdhbWUgPSBjbGFzc3tcbiAgICBcbiAgICBcbiAgICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXhfbGlmZV9tb2RpZmllclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByaWNlX2tleV9tb2RpZmllclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1heF9saWZlX21vZGlmaWVyOiBGdW5jdGlvbixwcmljZV9rZXlfbW9kaWZpZXI6IEZ1bmN0aW9uKXtcbiAgICBcbiAgICAgICAgdGhpcy5hY3Rpb25fY2xhc3NlcyA9IHt9O1xuICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgdGhpcy5tYXhfbGlmZV9tb2RpZmllciA9IG1heF9saWZlX21vZGlmaWVyO1xuICAgICAgICB0aGlzLnByaWNlX2tleV9tb2RpZmllciA9IHByaWNlX2tleV9tb2RpZmllcjtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7YXJyYXl9IG9mIG51bWJlcnNcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdDogVC5PYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9W107XG4gICAgXG4gICAgXG4gICAgICAgIGlmKHR5cGVvZiBvYmplY3QuYWN0aW9ucy5sZW5ndGg9PT0wKXtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW4gb2JqZWN0ICcrb2JqZWN0KycgdGhlcmUgYXJlIG5vIGFjdGlvbnMhJyk7Ly90b2RvIGFsbCBvYmplY3RzIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gc3RyaW5nIGxpa2UgdGhpc1xuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oYWN0aW9uOiBhbnkpe1xuICAgIFxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZSA9IE1hdGguY2VpbChhY3Rpb24uY291bnRQcmljZUJhc2UoKSk7Ly9cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIE5hTiAgdmFsdWVcbiAgICAgICAgICAgIGlmKGlzTmFOKHByaWNlX2Jhc2UpKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbi50eXBlKycgbWFrZXMgcHJpY2UgYmVzZSBOYU4uJyk7XG4gICAgICAgICAgICAgICAgcHJpY2VfYmFzZT0wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBub24gbmVnYXRpdmUgdmFsdWVcbiAgICAgICAgICAgIGlmKHByaWNlX2Jhc2U8MCl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb24udHlwZSsnIHNob3VsZCBub3QgbWFrZSB0aGlzIGFjdGlvbiBuZWdhdGl2ZScpOy8vdG9kbyBtYXliZSBvbmx5IHdhcm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHByaWNlX2Jhc2VzLnB1c2gocHJpY2VfYmFzZSk7XG5cbiAgICBcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHJldHVybihwcmljZV9iYXNlcyk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge251bWJlcn0gbWF4aW11bSBsaWZlIG9mIG9iamVjdFxuICAgICAqL1xuICAgIGdldE9iamVjdE1heExpZmUob2JqZWN0OiBULk9iamVjdCl7XG4gICAgXG4gICAgICAgIHZhciBwcmljZV9iYXNlcz10aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBwcmljZV9iYXNlcy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KSB7IHJldHVybiBwdiArIGN2OyB9LCAwKTtcbiAgICBcbiAgICBcbiAgICAgICAgcHJpY2VfYmFzZT10aGlzLm1heF9saWZlX21vZGlmaWVyKHByaWNlX2Jhc2UpO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2VfYmFzZSk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBSZXNvdXJjZXNcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZXMob2JqZWN0KXtcblxuXG4gICAgICAgIHZhciBwcmljZV9iYXNlcz10aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICBcbiAgICBcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIHByaWNlcz1bXTtcblxuICAgIFxuICAgICAgICB2YXIgZGVzaWduX3Jlc291cmNlcyA9IG9iamVjdC5nZXRNb2RlbCgpLmFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKTtcblxuXG4gICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oYWN0aW9uOiBhbnksaTogbnVtYmVyKXtcbiAgICBcblxuICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgIGFjdGlvbi5nZXRQcmljZVJlc291cmNlcygpLnNvcnQoZnVuY3Rpb24oYTogYW55LGI6IGFueSl7Ly90b2RvIGlzIGl0IHNhZmU/XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShhLmNsb25lKCkuc2lnbnVtKCkpLWRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShiLmNsb25lKCkuc2lnbnVtKCkpO1xuICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgXG4gICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzID0gcHJpY2VfcmVzb3VyY2VzX2xpc3RbMF0uY2xvbmUoKTtcbiAgICBcbiAgICBcbiAgICAgICAgICAgIHByaWNlX3Jlc291cmNlcy5tdWx0aXBseShwcmljZV9iYXNlc1tpXSk7XG4gICAgICAgICAgICBwcmljZXMucHVzaChwcmljZV9yZXNvdXJjZXMpO1xuICAgIFxuICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlcyk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUmVzb3VyY2VzIC0gcHJpY2Ugb2Ygb2JqZWN0XG4gICAgICovXG4gICAgZ2V0T2JqZWN0UHJpY2Uob2JqZWN0OiBULk9iamVjdHMpe1xuICAgIFxuICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBwcmljZScscHJpY2UpO1xuICAgIFxuICAgICAgICB2YXIgcHJpY2VzPXRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG4gICAgXG4gICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHByaWNlXyl7XG4gICAgXG4gICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHByaWNlLmFwcGx5KHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyKTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlKTtcbiAgICBcbiAgICB9XG5cblxuXG4gICAgaW5zdGFsbEFjdGlvbkNsYXNzKGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXM6IE9iamVjdCxhY3Rpb25fY2xhc3M6IGFueSl7XG5cbiAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25fY2xhc3MuZ2V0VHlwZSgpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0eXBlIT09J3N0cmluZycpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IGFjdGlvbiBjbGFzcyBoYXMgbm8gdHlwZSEnKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiB0aGVyZSBpcyBhbHJlYWR5IGluc3RhbGxlZCBhY3Rpb24gd2l0aCB0eXBlICcrdHlwZSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgdmFyIGFjdGlvbl9lbXB0eV9pbnN0YW5jZSA9IG5ldyBhY3Rpb25fY2xhc3Moe1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHBhcmFtczogYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtc1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vQWRkaW5nIG1ldGhvZCBjbG9uZSB0byBpbnN0YWxsZWQgYWN0aW9uIGNsYXNzXG4gICAgICAgIGFjdGlvbl9jbGFzcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuKG5ldyBhY3Rpb25fY2xhc3MoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdID0gYWN0aW9uX2NsYXNzO1xuICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbdHlwZV0gPSBhY3Rpb25fZW1wdHlfaW5zdGFuY2U7XG4gICAgXG4gICAgXG4gICAgXG4gICAgfVxuXG5cblxuICAgIGdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlOiBzdHJpbmcpe1xuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uX2NsYXNzPT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcrYWN0aW9uX3R5cGUrJy4gVGhlcmUgYXJlIG9ubHkgdGhlc2UgYWN0aW9uIHR5cGVzOiAnKyBULkFycmF5RnVuY3Rpb25zLmdldEtleXModGhpcy5hY3Rpb25fY2xhc3Nlcykuam9pbignLCAnKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihhY3Rpb25fY2xhc3MpO1xuXG4gICAgfVxuXG5cbiAgICBuZXdBY3Rpb25JbnN0YW5jZShhY3Rpb246IGFueSl7XG5cbiAgICAgICAgLy90b2RvIHNvbHZlIGRlZmVuc2UgdnMuIGRlZmVuY2VcbiAgICAgICAgaWYoYWN0aW9uLnR5cGU9PT0nZGVmZW5zZScpe1xuICAgICAgICAgICAgYWN0aW9uLnR5cGU9J2RlZmVuY2UnO1xuICAgICAgICAgICAgYWN0aW9uLnBhcmFtcy5kZWZlbmNlPWFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgIGRlbGV0ZSBhY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb24udHlwZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBhY3Rpb25fY2xhc3MoYWN0aW9uKTtcbiAgICB9XG5cblxuXG5cbiAgICBjcmVhdGVBY3Rpb25FeGVjdXRlKGFjdGlvbl90eXBlOiBzdHJpbmcpe1xuXG4gICAgICAgIHZhciBnYW1lID0gdGhpcztcblxuICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb25fdHlwZSk7XG5cblxuICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uICguLi5hcmdzKXtcblxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KGdhbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcyxhcmdzKTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgIH1cblxuXG5cbiAgICBnZXRBY3Rpb25FbXB0eUluc3RhbmNlKGFjdGlvbl90eXBlOiBzdHJpbmcpe1xuXG4gICAgICAgIHZhciBhY3Rpb25faW5zdGFuY2UgPSB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbYWN0aW9uX3R5cGVdO1xuXG4gICAgICAgIGlmKHR5cGVvZiBhY3Rpb25faW5zdGFuY2U9PT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luIHRoaXMgZ2FtZSBpbnN0YW5jZSB0aGFyZSBpcyBubyBhY3Rpb24gY2xhc3MgdHlwZSAnK2FjdGlvbl90eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihhY3Rpb25faW5zdGFuY2UpO1xuXG5cbiAgICB9XG5cblxuXG4gICAgLypnZXRBY3Rpb25FeGVjdXRlKGFjdGlvbl9rZXkpe1xuXG4gICAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl9rZXldO1xuXG4gICAgICAgIGlmKHR5cGVvZiBhY3Rpb249PSd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gdHlwZSAnK2FjdGlvbl9rZXkrJy4nKTtcblxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cblxuXG4gICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbZ2FtZV0ucHVzaC5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmV4ZWN1dGVfY2FsbGJhY2suYXBwbHkodGhpcyxhcmdzKTtcblxuICAgICAgICB9O1xuXG5cblxuICAgICAgICByZXR1cm4oZXhlY3V0ZSk7XG4gICAgfSovXG4gICAgXG59OyIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lLkFjdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULkdhbWUuQWN0aW9uID0gY2xhc3N7XG5cblxuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uOiBPYmplY3Qpe1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlID09PSAndW5kZWZpbmVkJyl0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IGV4dGVuZCBULkdhbWUuQWN0aW9uIGFuZCBhZGQgbWV0aG9kIGdldFR5cGUgYmVmb3JlIGNyZWF0aW5nIGluc3RhbmNlcyEnKTtcblxuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSgpO1xuXG4gICAgICAgIGlmKGFjdGlvbi50eXBlIT09dHlwZSl0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgJyt0eXBlKycgbm90ICcrYWN0aW9uLnR5cGUrJyBjbGFzcyEnKTtcblxuICAgICAgICBmb3IodmFyIGtleSBpbiBhY3Rpb24pe1xuICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSBhY3Rpb25ba2V5XTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBwYXJhbXNcblxuICAgICAgICAvKmZvcih2YXIgcGFyYW0gaW4gYWN0aW9uQWJpbGl0eS5wYXJhbXMpe1xuICAgICAgICAgICAgdmFyIHBhcmFtX3R5cGUgPSBhY3Rpb24uYWJpbGl0eV9wYXJhbXNbcGFyYW1dO1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgYWN0aW9uQWJpbGl0eS5wYXJhbXNbcGFyYW1dIT09cGFyYW1fdHlwZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbSAnK3BhcmFtKycgc2hvdWxkIGJlICcrcGFyYW1fdHlwZSsnIGluc3RlYWQgb2YgJyt0eXBlb2YoYWN0aW9uQWJpbGl0eS5hYmlsaXR5X3BhcmFtc1twYXJhbV0pKycgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb25BYmlsaXR5LnR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0qL1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgIH1cblxuXG4gICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgcmV0dXJuKDApO1xuICAgIH1cblxuXG4gICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcbiAgICAgICAgcmV0dXJuKFtdKTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGV4ZWN1dGUoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBleGVjdXRlIHBhc3NpdmUgYWN0aW9uLicpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gaG93IG1hbnkgc2Vjb25kcyBjYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQ/XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjYW5CZUV4ZWN1dGVkSW4oKXtcblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wYXJhbXMuY29vbGRvd249PT0nbnVtYmVyJyl7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmxhc3RfdXNlPT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHMgPSBNYXRoLmFicyh0aGlzLmxhc3RfdXNlIC0gbmV3IERhdGUoKSkvMTAwMDtcblxuICAgICAgICAgICAgaWYodGhpcy5wYXJhbXMuY29vbGRvd248PXMpe1xuICAgICAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybih0aGlzLnBhcmFtcy5jb29sZG93bi1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcmV0dXJuKDApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZCBub3c/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuQmVFeGVjdXRlZE5vdygpe1xuICAgICAgICByZXR1cm4odGhpcy5jYW5CZUV4ZWN1dGVkSW4oKT09PTApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IGFjdHVhbCBkYXRlIGFzIGRhdGUgb2YgZXhlY3V0aW9uIHRoaXMgYWN0aW9uIGluc3RhbmNlXG4gICAgICovXG4gICAgbm93RXhlY3V0ZWQoKXtcbiAgICAgICAgdGhpcy5sYXN0X3VzZT1uZXcgRGF0ZSgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGh0bWwgcHJvZmlsZSBvZiBhY3Rpb24gYWJpbGl0eVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY3JlYXRlSHRtbFByb2ZpbGUoKXtcblxuICAgICAgICB2YXIgaHRtbD0nPHRhYmxlIGNsYXNzPVwiYWN0aW9uLWFiaWxpdHktcHJvZmlsZVwiPic7XG5cbiAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiMlwiPmArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywnYWN0aW9uJyx0aGlzLnR5cGUpK2A8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG5cblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5sYXN0X3VzZSE9PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGh0bWwrPWBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCsgVC5Mb2NhbGUuZ2V0KCdvYmplY3QnLCdhY3Rpb24nLCdsYXN0X3VzZWQnKStgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCt0aGlzLmxhc3RfdXNlK2A8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvcih2YXIgcGFyYW0gaW4gdGhpcy5wYXJhbXMpe1xuICAgICAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5gKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsJ2FjdGlvbicsdGhpcy50eXBlLHBhcmFtKStgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCt0aGlzLnBhcmFtc1twYXJhbV0rYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaHRtbCs9JzwvdGFibGU+JztcblxuICAgICAgICByZXR1cm4oaHRtbCk7XG4gICAgfVxuXG59O1xuXG5cblxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTWFwR2VuZXJhdG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblQuTWFwR2VuZXJhdG9yID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGdldFpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB6X25vcm1hbGl6aW5nX3RhYmxlXG4gICAgICogQHBhcmFtIHtULk1hcEdlbmVyYXRvci5CaW90b3BlfSBiaW90b3BlXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdmlydHVhbE9iamVjdEdlbmVyYXRvclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGdldFo6IEZ1bmN0aW9uLHpfbm9ybWFsaXppbmdfdGFibGU6IEFycmF5LGJpb3RvcGU6IEFycmF5LHZpcnR1YWxPYmplY3RHZW5lcmF0b3I6IEZ1bmN0aW9uKXtcblxuICAgICAgICB0aGlzLmdldFogPSBnZXRaO1xuICAgICAgICB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUgPSB6X25vcm1hbGl6aW5nX3RhYmxlO1xuICAgICAgICB0aGlzLmJpb3RvcGUgPSBiaW90b3BlO1xuICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3IgPSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yO1xuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyOiBudW1iZXIscmFkaXVzOiBudW1iZXIpe1xuXG4gICAgICAgIHZhciBtYXA9W107XG5cbiAgICAgICAgZm9yKHZhciB5PTA7eTw9cmFkaXVzKjI7eSsrKXtcblxuICAgICAgICAgICAgbWFwW3ldPVtdO1xuXG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PD1yYWRpdXMqMjt4Kyspe1xuXG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LXJhZGl1cysxLzIsMik+XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLmdldFooeC1yYWRpdXMrY2VudGVyX2ludGVnZXIueCx5LXJhZGl1cytjZW50ZXJfaW50ZWdlci55KTtcblxuXG4gICAgICAgICAgICAgICAgbWFwW3ldW3hdID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG1hcCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGVycmFpbk1hcChtYXA6IEFycmF5KXtcblxuICAgICAgICB2YXIgbWFwX2JnPVtdO1xuXG4gICAgICAgIGZvcih2YXIgeT0wLGw9bWFwLmxlbmd0aDt5PGw7eSsrKXtcbiAgICAgICAgICAgIG1hcF9iZ1t5XT1bXTtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8bDt4Kyspe1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKG1hcFt5XVt4XSk9PT0ndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG1hcF9iZ1t5XVt4XSA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbihtYXBbeV1beF0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4obWFwX2JnKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyOiBudW1iZXIscmFkaXVzOiBudW1iZXIpe1xuXG5cbiAgICAgICAgdmFyIGJvdW5kcz0xO1xuXG5cbiAgICAgICAgdmFyIHpfbWFwPXRoaXMuZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpO1xuXG4gICAgICAgIHZhciBtYXA9dGhpcy50ZXJyYWluTWFwKHpfbWFwKTtcblxuICAgICAgICByZXR1cm4obWFwKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcF9hcnJheVxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheTogQXJyYXksY2VudGVyX2ludGVnZXI6IG51bWJlcixyYWRpdXM6IG51bWJlcil7XG5cbiAgICAgICAgdmFyIG9iamVjdHM9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWFwX2FycmF5W3ldW3hdKSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4obWFwX2FycmF5W3ldW3hdKTtcblxuXG4gICAgICAgICAgICAgICAgb2JqZWN0Lng9Y2VudGVyX2ludGVnZXIueC1yYWRpdXMreDtcbiAgICAgICAgICAgICAgICBvYmplY3QueT1jZW50ZXJfaW50ZWdlci55LXJhZGl1cyt5O1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ob2JqZWN0cyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlclxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFB1cmVNYXAoY2VudGVyOiBQb3NpdGlvbixyYWRpdXM6IG51bWJlciwgbm90X2NlbnRlcj1mYWxzZSl7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjZW50ZXIsbm90X2NlbnRlcik7XG5cbiAgICAgICAgdmFyIGNlbnRlcl9pbnRlZ2VyPXtcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoY2VudGVyLngpLFxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcihjZW50ZXIueSlcbiAgICAgICAgfTtcblxuICAgICAgICBpZihub3RfY2VudGVyKVxuICAgICAgICBub3RfY2VudGVyPXtcbiAgICAgICAgICAgIHg6IG5vdF9jZW50ZXIueC1jZW50ZXJfaW50ZWdlci54LFxuICAgICAgICAgICAgeTogbm90X2NlbnRlci55LWNlbnRlcl9pbnRlZ2VyLnlcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgLyp2YXIgbWFwX2FycmF5ID0gdGhpcy5nZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpO1xuICAgICAgICB2YXIgb2JqZWN0cyA9IHRoaXMuY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheSxjZW50ZXJfaW50ZWdlcixyYWRpdXMpOy8qKi9cblxuXG4gICAgICAgIHZhciBvYmplY3RzPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgdmFyIHg6IG51bWJlcix5OiBudW1iZXIsejogbnVtYmVyLHQ6IG51bWJlcixvYmplY3Q6IE9iamVjdDtcbiAgICAgICAgZm9yKHk9MDt5PD1yYWRpdXMqMjt5Kyspe1xuICAgICAgICAgICAgZm9yKHg9MDt4PD1yYWRpdXMqMjt4Kyspe1xuXG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LXJhZGl1cysxLzIsMik+XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYobm90X2NlbnRlcilcbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1ub3RfY2VudGVyLngtcmFkaXVzKzEvMiwyKStcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeS1ub3RfY2VudGVyLnktcmFkaXVzKzEvMiwyKTw9XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgeiA9IHRoaXMuZ2V0Wih4LXJhZGl1cytjZW50ZXJfaW50ZWdlci54LHktcmFkaXVzK2NlbnRlcl9pbnRlZ2VyLnkpO1xuICAgICAgICAgICAgICAgIHogPSB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGVbTWF0aC5mbG9vcih6ICogdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbih6KTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codCk7XG5cbiAgICAgICAgICAgICAgICBvYmplY3Q9IG5ldyBULk9iamVjdHMuVGVycmFpbih0KTtcbiAgICAgICAgICAgICAgICBvYmplY3QueD1jZW50ZXJfaW50ZWdlci54LXJhZGl1cyt4O1xuICAgICAgICAgICAgICAgIG9iamVjdC55PWNlbnRlcl9pbnRlZ2VyLnktcmFkaXVzK3k7XG5cblxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybihvYmplY3RzKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gb2JqZWN0c1xuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhvYmplY3RzOiBBcnJheSl7XG5cblxuICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gW107XG4gICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXcgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICBmb3IodmFyIGk9MCxsPW9iamVjdHNfMXgxX3Jhdy5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgIHRoaXMudmlydHVhbE9iamVjdEdlbmVyYXRvcihvYmplY3RzXzF4MV9yYXdbaV0sdmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICB9XG5cblxuXG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRlcnJhaW4gYW5kIHZpcnR1YWwgb2JqZWN0cyBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXIgRG9udCBnZXQgb2JqZWN0cyBuZWFyIHRoaXMgY2VudGVyLlxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9fVxuICAgICAqL1xuICAgIGdldENvbXBsZXRlT2JqZWN0cyhyZWFsX29iamVjdHM6VC5PYmplY3RzLkFycmF5LGNlbnRlcjpULlBvc2l0aW9uLHJhZGl1czpudW1iZXIsbmF0dXJhbF9vYmplY3RzPXRydWUsbm90X2NlbnRlcj1mYWxzZSl7XG5cblxuXG4gICAgICAgIHZhciBjb21wbGV0ZV9vYmplY3RzID0gdGhpcy5nZXRQdXJlTWFwKGNlbnRlciwgcmFkaXVzLCBub3RfY2VudGVyKTtcblxuXG5cbiAgICAgICAgcmVhbF9vYmplY3RzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgIGNvbXBsZXRlX29iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgaWYobmF0dXJhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgdmFyIHZpcnR1YWxfb2JqZWN0cyA9IHRoaXMuZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMoY29tcGxldGVfb2JqZWN0cyk7XG5cbiAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgcmV0dXJuKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgfVxuICAgIFxuXG5cbn07XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULk1hcEdlbmVyYXRvci5CaW90b3BlID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGVycmFpbnMpe1xuXG4gICAgICAgIHZhciBzdW09MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcbiAgICAgICAgICAgIHN1bSs9dGVycmFpbi5hbW91bnQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIGZyb209MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcblxuICAgICAgICAgICAgdGVycmFpbi5mcm9tPWZyb20vc3VtO1xuICAgICAgICAgICAgZnJvbSs9dGVycmFpbi5hbW91bnQ7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgIHRoaXMudGVycmFpbnMgPSB0ZXJyYWlucztcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gelxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgKi9cbiAgICBnZXRaVGVycmFpbih6OiBudW1iZXIpe1xuXG5cbiAgICAgICAgZm9yKHZhciBpPXRoaXMudGVycmFpbnMubGVuZ3RoLTE7aT49MDtpLS0pe1xuXG4gICAgICAgICAgICBpZih6ID49IHRoaXMudGVycmFpbnNbaV0uZnJvbSApIHJldHVybih0aGlzLnRlcnJhaW5zW2ldLnRlcnJhaW4pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cblxufTtcblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTW9kZWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULk1vZGVsID0gY2xhc3N7XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWwganNvblxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlIGluIGNhc2Ugb2YgZmFpbFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGpzb246IE9iamVjdCl7XG5cbiAgICAgICAgaWYodHlwZW9mKGpzb24pPT0ndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5uYW1lPWpzb24ubmFtZTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXM9anNvbi5wYXJ0aWNsZXM7XG4gICAgICAgIHRoaXMucm90YXRpb249anNvbi5yb3RhdGlvbjtcbiAgICAgICAgdGhpcy5zaXplPWpzb24uc2l6ZTtcblxuICAgICAgICBpZih0eXBlb2YodGhpcy5yb3RhdGlvbik9PSd1bmRlZmluZWQnKXRoaXMucm90YXRpb249MDtcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuc2l6ZSk9PSd1bmRlZmluZWQnKXRoaXMuc2l6ZT0xO1xuICAgIH1cblxuXG4gICAgY2xvbmUgKCl7XG4gICAgICAgIHJldHVybihuZXcgVC5Nb2RlbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm90YXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgICAqL1xuICAgIGFkZFJvdGF0aW9uU2l6ZShyb3RhdGlvbjogbnVtYmVyLHNpemU6IG51bWJlcil7XG5cbiAgICAgICAgaWYodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbj0wO1xuICAgICAgICBpZih0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZT0xO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24rPXJvdGF0aW9uO1xuICAgICAgICB0aGlzLnNpemU9dGhpcy5zaXplKnNpemU7XG5cbiAgICB9XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaW1lbnNpb24geCx5LHoseHlcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhbmdlXG4gICAgICovXG4gICAgcmFuZ2UoZGltZW5zaW9uOiBzdHJpbmcpe1xuXG4gICAgICAgIGlmKGRpbWVuc2lvbj09J3h5Jyl7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLnh5MmRpc3QodGhpcy5yYW5nZSgneCcpLHRoaXMucmFuZ2UoJ3knKSp0aGlzLnNpemUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBwYXJ0aWNsZXNMaW5lYXI9dGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuICAgICAgICB2YXIgbWF4PWZhbHNlLG1pbj1mYWxzZSxtYXhfOiBudW1iZXIsbWluXzogbnVtYmVyO1xuICAgICAgICBmb3IodmFyIGkgaW4gcGFydGljbGVzTGluZWFyKXtcblxuXG4gICAgICAgICAgICBtaW5fPXBhcnRpY2xlc0xpbmVhcltpXS5wb3NpdGlvbltkaW1lbnNpb25dO1xuICAgICAgICAgICAgbWF4Xz1wYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXStwYXJ0aWNsZXNMaW5lYXJbaV0uc2l6ZVtkaW1lbnNpb25dO1xuXG4gICAgICAgICAgICAvL3RvZG8gZmVhdHVyZSByZXZlcnNlXG5cbiAgICAgICAgICAgIGlmKG1heD09PWZhbHNlKW1heD1tYXhfO1xuICAgICAgICAgICAgaWYobWluPT09ZmFsc2UpbWluPW1pbl87XG5cblxuICAgICAgICAgICAgaWYobWF4Xz5tYXgpbWF4PW1heF87XG4gICAgICAgICAgICBpZihtaW5fPG1pbiltaW49bWluXztcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4oTWF0aC5hYnMobWluLW1heCkvKnRoaXMuc2l6ZSovKTsvL3RvZG8gcm90YXRpb25cblxuXG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3lcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV96XG4gICAgICovXG4gICAgbW92ZUJ5KG1vdmVfeD0wLG1vdmVfeT0wLG1vdmVfej0wKXtcblxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xuXG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLngrPW1vdmVfeDtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkrPW1vdmVfeTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnorPW1vdmVfejtcblxuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJuIFogb2Ygam9pbmluZyBtb2RlbFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICovXG4gICAgam9pbk1vZGVsWihtb2RlbDogVC5Nb2RlbCxtb3ZlX3g6IG51bWJlcixtb3ZlX3k6IG51bWJlcil7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICAvL3ZhciAgbW9kZWxfPWRlZXBDb3B5TW9kZWwobW9kZWwpO1xuICAgICAgICAvL21vZGVsXy5tb3ZlQnkobW92ZV94LG1vdmVfeSk7Ly90b2RvIG1heWJlIGRlbGV0ZSBtb3ZlQnlcblxuICAgICAgICAvL3ZhciBtYXhfej10aGlzLnJhbmdlKCd6Jyk7XG5cblxuICAgICAgICB2YXIgdGhpc19saW5lYXJfcGFydGljbGVzPXRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG4gICAgICAgIHZhciBtb2RlbF9saW5lYXJfcGFydGljbGVzPW1vZGVsLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgdmFyIGRpc3RhbmNlcz1bMF07XG4gICAgICAgIGZvcih2YXIgaSBpbiBtb2RlbF9saW5lYXJfcGFydGljbGVzKXtcblxuICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi54Kz1tb3ZlX3g7XG4gICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLnkrPW1vdmVfeTtcblxuICAgICAgICAgICAgZm9yKHZhciBpaSBpbiB0aGlzX2xpbmVhcl9wYXJ0aWNsZXMpey8vdG9kbyBtYXliZSBvcHRpbWl6ZSBieSBwcmUtc29ydGluZ1xuXG5cbiAgICAgICAgICAgICAgICBpZihQYXJ0aWNsZXMuY29sbGlzaW9uMkQodGhpc19saW5lYXJfcGFydGljbGVzW2lpXSxtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgcih0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzLnB1c2godGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5wb3NpdGlvbi56K3RoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0uc2l6ZS56KTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1heF96PU1hdGgubWF4LmFwcGx5KE1hdGgsZGlzdGFuY2VzKTtcblxuICAgICAgICByZXR1cm4gbWF4X3o7XG5cbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogSm9pbiBtb2RlbHMgdG9nZXRoZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAqL1xuICAgIGpvaW5Nb2RlbChtb2RlbCxtb3ZlX3gsbW92ZV95KXsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgIHZhciBtYXhfej10aGlzLmpvaW5Nb2RlbFoobW9kZWwsbW92ZV94LG1vdmVfeSk7XG5cblxuICAgICAgICB0aGlzLnBhcnRpY2xlcz1bXG4gICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSxcbiAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZWwpKVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMucGFydGljbGVzWzFdLnBvc2l0aW9uPXtcbiAgICAgICAgICAgIHg6bW92ZV94LFxuICAgICAgICAgICAgeTptb3ZlX3ksXG4gICAgICAgICAgICB6Om1heF96XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yb3RhdGlvbj0wO1xuICAgICAgICB0aGlzLnNpemU9MTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIERlZXAgY29weSB0aGlzIGFuZCBjb252ZXJ0cyBsaW5rcyB0byByYXcgZGF0YVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE1vZGVsXG4gICAgICovXG4gICAgZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKSB7XG5cblxuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNsb25lKCk7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db252ZXJ0IGxpbmtzIHRvIHJhdyBkYXRhXG5cblxuICAgICAgICB2YXIgZmluZFBhcnRpY2xlQnlOYW1lID0gZnVuY3Rpb24ocGFydGljbGVzLCBuYW1lKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFydGljbGVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmRlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShwYXJ0aWNsZXNbaV0ucGFydGljbGVzLCBuYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkX3BhcnRpY2xlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmaW5kZWRfcGFydGljbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmtzID0gZnVuY3Rpb24ocGFydGljbGVzKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cblxuICAgICAgICAgICAgLy9yKHBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+TGlua1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLmxpbmspIT0ndW5kZWZpbmVkJykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShtb2RlbC5wYXJ0aWNsZXMsIHBhcnRpY2xlc1tpXS5saW5rKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkX3BhcnRpY2xlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpbmsgJyArIHBhcnRpY2xlLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5rZWRfcGFydGljbGUpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5yb3RhdGlvbikhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZXNbaV0ucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0uc2l6ZSkhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlc1tpXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBvc2l0aW9uKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5wb3NpdGlvbiA9IHBhcnRpY2xlc1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3RvZG8gc2tld1xuXG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzW2ldID0gbGlua2VkX3BhcnRpY2xlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkdyb3VwXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhwYXJ0aWNsZXNbaV0ucGFydGljbGVzKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcGFydGljbGVzTGlua3MobW9kZWwucGFydGljbGVzKTtcblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IDFEIGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICovXG4gICAgZ2V0TGluZWFyUGFydGljbGVzKGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemU9ZmFsc2Upe1xuXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhcj1bXTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgcGFydGljbGVzIHRvIDFEIHBhcnRpY2xlc1xuXG4gICAgICAgIHZhciBwYXJ0aWNsZXMyTGluZWFyID0gZnVuY3Rpb24ocGFydGljbGVzLHBvc2l0aW9uLHJvdGF0aW9uLHNpemUpey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG4gICAgICAgICAgICBpZih0eXBlb2YgcG9zaXRpb24gPT09ICd1bmRlZmluZWQnKXBvc2l0aW9uPWZhbHNlO1xuICAgICAgICAgICAgaWYodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbj0wO1xuICAgICAgICAgICAgaWYodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemU9MTtcblxuXG4gICAgICAgICAgICBpZihwb3NpdGlvbj09PWZhbHNlKXtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbj17XG4gICAgICAgICAgICAgICAgICAgIHg6MCxcbiAgICAgICAgICAgICAgICAgICAgeTowLFxuICAgICAgICAgICAgICAgICAgICB6OjBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJ0aWNsZXMuZm9yRWFjaChmdW5jdGlvbihwYXJ0aWNsZSl7XG5cbiAgICAgICAgICAgICAgICAvL3BhcnRpY2xlPWRlZXBDb3B5KHBhcnRpY2xlKTtcblxuXG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkRlZmF1bHQgcGFyYW1zIG9mIHBhcnRpY2xlLCBncm91cCBvciBsaW5rXG4gICAgICAgICAgICAgICAgaWYoIXBhcnRpY2xlLnBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb249e1xuICAgICAgICAgICAgICAgICAgICAgICAgeDowLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTowLFxuICAgICAgICAgICAgICAgICAgICAgICAgejowXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihwYXJ0aWNsZS5yb3RhdGlvbik9PSd1bmRlZmluZWQnKXBhcnRpY2xlLnJvdGF0aW9uPTA7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnNpemUpPT0ndW5kZWZpbmVkJylwYXJ0aWNsZS5zaXplPTE7XG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+UG9zaXRpb24sIFJvdGF0aW9uIGFuZCBzaXplIC8vdG9kbyBza2V3XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdERlZyA9IFQuVE1hdGgueHkyZGlzdERlZyhwYXJ0aWNsZS5wb3NpdGlvbi54LCBwYXJ0aWNsZS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgICAgIGRpc3REZWcuZGlzdCA9IGRpc3REZWcuZGlzdCAqIHNpemU7XG4gICAgICAgICAgICAgICAgZGlzdERlZy5kZWcgKz0gcm90YXRpb247XG5cbiAgICAgICAgICAgICAgICB2YXIgeHkgPSBULlRNYXRoLmRpc3REZWcyeHkoZGlzdERlZy5kaXN0LCBkaXN0RGVnLmRlZyk7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSB4eS54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB4eS55O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBwYXJ0aWNsZS5wb3NpdGlvbi56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiArPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBhcnRpY2xlLnNpemUgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplID0gcGFydGljbGUuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnggPSBwYXJ0aWNsZS5zaXplLnggKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnkgPSBwYXJ0aWNsZS5zaXplLnkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zaXplLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGFydGljbGVcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIocGFydGljbGUucGFydGljbGVzLHBhcnRpY2xlLnBvc2l0aW9uLHBhcnRpY2xlLnJvdGF0aW9uLHBhcnRpY2xlLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdyb3VwXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnNoYXBlKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmVhci5wdXNoKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG5cbiAgICAgICAgaWYoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSl7XG5cbiAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLGZhbHNlLDAsMSk7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLGZhbHNlLG1vZGVsLnJvdGF0aW9uLG1vZGVsLnNpemUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBzdHJpY3QgbW9kZS8vZGVsZXRlIG1vZGVsO1xuXG4gICAgICAgIHJldHVybihwYXJ0aWNsZXNMaW5lYXIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICovXG4gICAgZmlsdGVyUGF0aChwYXRoKXtcblxuICAgICAgICB2YXIgbW9kZWw9dGhpcztcblxuICAgICAgICBpZih0eXBlb2YocGF0aC5mb3JFYWNoKT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKGkpe1xuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5wYXJ0aWNsZXNbaV07XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuKG1vZGVsKTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgKi9cbiAgICBmaWx0ZXJQYXRoU2libGluZ3MocGF0aCl7XG5cbiAgICAgICAgdmFyIG1vZGVsPXRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcbiAgICAgICAgdmFyIGN1cnJlbnQ9bW9kZWw7XG5cbiAgICAgICAgaWYodHlwZW9mKHBhdGguZm9yRWFjaCk9PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHIocGF0aCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbihwYXJ0aWNsZV9pLHBhdGhfaWkpe1xuXG4gICAgICAgICAgICAvKmlmKHBhdGhfaWk8cGF0aC5sZW5ndGgtMSl7XG5cbiAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJ0aWNsZXNbcGFydGljbGVfaV07XG5cbiAgICAgICAgICAgICB9ZWxzZXsqL1xuXG4gICAgICAgICAgICB2YXIgbWUgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgY3VycmVudC5wYXJ0aWNsZXMgPSBbbWVdO1xuXG4gICAgICAgICAgICBjdXJyZW50PW1lO1xuICAgICAgICAgICAgLy99XG5cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZ2dyZWdhdGUgdm9sdW1lIG9mIGVhY2ggcmVzb3VyY2UgdXNlZCBpbiBtb2RlbFxuICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgKi9cbiAgICBhZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCl7XG5cblxuICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuXG5cbiAgICAgICAgdmFyIGxpbmVhcl9wYXJ0aWNsZXMgPSB0aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgbGluZWFyX3BhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmVhcl9wYXJ0aWNsZSl7XG5cbiAgICAgICAgICAgIHZhciB2b2x1bWU9Ly90b2RvIGFsbCBzaGFwZXNcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS54ICpcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS55ICpcbiAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWw9bGluZWFyX3BhcnRpY2xlLm1hdGVyaWFsLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICBtYXRlcmlhbD1tYXRlcmlhbFswXTtcblxuICAgICAgICAgICAgdmFyIHByaWNlXz17fTtcbiAgICAgICAgICAgIHByaWNlX1ttYXRlcmlhbF09dm9sdW1lO1xuXG4gICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvKmNvbnNvbGUubG9nKCdwcmljZSBvZicpO1xuICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0LmRlc2lnbi5kYXRhKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHByaWNlKTsqL1xuXG4gICAgICAgIC8vcHJpY2UubXVsdGlwbHkoMC4wMSk7XG5cbiAgICAgICAgcmV0dXJuKHByaWNlKTtcblxuXG4gICAgfVxuXG5cblxuXG4gICAgZ2V0SGFzaCgpe1xuICAgICAgICByZXR1cm4gJ3h4eCcrSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJ0aWNsZXMpLmxlbmd0aDsvL3RvZG8gYmV0dGVyXG4gICAgfVxuXG5cbiAgICBcbiAgICBcblxufTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIFRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuTW9kZWwuUGFydGljbGVzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbi8qKlxuICogTW9kZWwgUGFydGljbGVzXG4gKi9cblQuTW9kZWwuUGFydGljbGVzID0gY2xhc3N7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBtaXNzaW5nIHBhcmFtcyBpbnRvIHBhcnRpY2xlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gcGFydGljbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSkgey8vdG9kbyA/PyBtYXliZSByZW5hbWVcblxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNrZXcueiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNrZXcueiA9IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2hhcGUudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2hhcGUudG9wID0gMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnJvdGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUucm90YXRpb24gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChwYXJ0aWNsZSk7XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgc3RhdGljIGdldFRyaWFuZ2xlcyhwYXJ0aWNsZSxwb2ludF9jbGFzcyl7XG5cbiAgICAgICAgdmFyIHRyaWFuZ2xlcyA9W107XG5cbiAgICAgICAgcGFydGljbGU9dGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICB2YXIgeF9fLCB5X18sIHpfXztcblxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGV2ZWwgPSAwOyBsZXZlbCA8IDI7IGxldmVsKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS5ib3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS50b3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuVE1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULlRNYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gobmV3IHBvaW50X2NsYXNzKHhfXyx5X18sel9fKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZXNvdXJjZS5wb2ludHMucHVzaChbeCArIHhfXywgeSArIHlfXywgeiArIHpfX10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogR2V0IDNEIG1vZGVsIGZyb20gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICovXG4gICAgc3RhdGljIGdldDNEKHBhcnRpY2xlKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0ge307XG5cbiAgICAgICAgcGFydGljbGU9dGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG5cbiAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAvL3IocGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucyA9IFtbXSwgW11dO1xuICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRCA9IFtbXSwgW11dO1xuICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVhZWiByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXMocGFydGljbGUuc2hhcGUucm90YXRlZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeV8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSB6XyAqIGxldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSAoMiAtIChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIHRtcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULlRNYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5UTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeF9fID0geHlfLng7XG4gICAgICAgICAgICAgICAgICAgIHlfXyA9IHh5Xy55O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2ludHMucHVzaChbeCArIHhfXywgeSArIHlfXywgeiArIHpfX10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFsxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pICsgcGFydGljbGUuc2hhcGUublxuXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiovXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgMkQgbGluZXMgZnJvbSBwYXJ0aWNsZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmFzZSAwPWJvdHRvbSwgMT10b3BcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gMkQgbGluZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0MkRsaW5lcyhwYXJ0aWNsZSwgYmFzZSkge1xuXG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5nZXQzRChwYXJ0aWNsZSk7XG5cbiAgICAgICAgdmFyIGxpbmVzID0gW107XG5cbiAgICAgICAgdmFyIHBvbHlnb25zMkQgPSBbcmVzb3VyY2UucG9seWdvbnMyRFtiYXNlXV07XG5cbiAgICAgICAgZm9yICh2YXIgcG4gaW4gcG9seWdvbnMyRCkge1xuXG4gICAgICAgICAgICAvKmxpbmVzW3BuXT1bXTtcblxuICAgICAgICAgICAgIGZvcih2YXIgcHQgaW4gcmVzb3VyY2UucG9seWdvbnNbcG5dKSB7XG5cbiAgICAgICAgICAgICB2YXIgcG9pbnQgPSByZXNvdXJjZS5wb2ludHNbcmVzb3VyY2UucG9seWdvbnNbcG5dW3B0XSAtIDFdO1xuICAgICAgICAgICAgIGxpbmVzW3BuXVtwc10gPSBbcG9pbnRbMF0sIHBvaW50WzFdXTtcblxuICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICB2YXIgcG9pbnQxLCBwb2ludDI7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAtMSwgbCA9IHBvbHlnb25zMkRbcG5dLmxlbmd0aDsgaSA8IGwgLSAxOyBpKyspIHtcblxuXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gaTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSBsIC0gMTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHBvaW50MiA9IGkgKyAxO1xuXG5cbiAgICAgICAgICAgICAgICAvL3IocmVzb3VyY2UucG9seWdvbnNbcG5dLHBvaW50MSk7XG5cbiAgICAgICAgICAgICAgICBwb2ludDEgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQxXSAtIDFdO1xuICAgICAgICAgICAgICAgIHBvaW50MiA9IHJlc291cmNlLnBvaW50c1twb2x5Z29uczJEW3BuXVtwb2ludDJdIC0gMV07XG5cblxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludDFbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQxWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludDJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDJbMV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9yKGxpbmVzKTtcblxuICAgICAgICByZXR1cm4gKGxpbmVzKTtcblxuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL3RvZG8gbWF5YmUgcmVmYWN0b3IgbW92ZSB0byBNYXRoXG4gICAgLyoqXG4gICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgMkQgbGluZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthcnJheX0gbGluZXMxXG4gICAgICogQHBhcmFtIChhcnJheSkgbGluZXMyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpIHtcblxuICAgICAgICBmb3IgKHZhciBpMSBpbiBsaW5lczEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkyIGluIGxpbmVzMikge1xuXG4gICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueVxuICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yKCdjb2xsaXNpb24yRCBpcyB0cnVlJywgcGFydGljbGUxLCBwYXJ0aWNsZTIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIHBhcnRpY2xlc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAqIEBwYXJhbSAob2JqZWN0KSBwYXJ0aWNsZTIgdG9wXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY29sbGlzaW9uMkQocGFydGljbGUxLCBwYXJ0aWNsZTIpIHtcblxuXG4gICAgICAgIHZhciBsaW5lczEgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTEsIDEpO1xuICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db3JuZXIgY29sbGlzaW9uXG5cblxuICAgICAgICB2YXIgY29sbGlzaW9uID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgLyoqL1xuICAgICAgICBpZiAoIWNvbGxpc2lvbikge1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBrID0gMTAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIG91dGVyLCBpbm5lcjtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3ggPSBpbm5lclsxXS54IC0gaW5uZXJbMF0ueDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl95ID0gaW5uZXJbMV0ueSAtIGlubmVyWzBdLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueSAtPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueCArPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlubmVyMSA9IFtpbm5lcjFdO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjIgPSBbaW5uZXIyXTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjIgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIyLCBvdXRlcik7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uMSAmJiBjb2xsaXNpb24yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSgpO1xuXG5cbiAgICAgICAgfVxuICAgICAgICAvKiovXG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWJ1ZyBURERcbiAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lc189W2xpbmVzMSxsaW5lczJdO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGxpbmVzXyl7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9IDAsbD1saW5lc19ba2V5XS5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhsaW5lc19ba2V5XVtpXVswXS54K3NpemUsbGluZXNfW2tleV1baV1bMF0ueStzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhsaW5lc19ba2V5XVtpXVsxXS54K3NpemUsbGluZXNfW2tleV1baV1bMV0ueStzaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgKTtcbiAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbWcgc3JjPVwiJytzcmMrJ1wiIGJvcmRlcj0nKyhjb2xsaXNpb24/MjowKSsnPicpOy8qKi9cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgfVxuXG59OyIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQXJyYXlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4vL3RvZG8gVC5PYmplY3RzLkFycmF5ID0gY2xhc3MgZXh0ZW5kcyBBcnJheXtcblxuXG4gICAgZXhwb3J0IGNsYXNzIEFycmF5IHtcblxuXG4gICAgICAgIHB1YmxpYyBvYmplY3RzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmplY3RzXG4gICAgICAgICAqIHRvZG8gPz8/Pz8/Pz8/IEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0cz1bXSkge1xuXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMgPSBvYmplY3RzLm1hcChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEFsbCgpOkFycmF5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZpbHRlcihjYWxsYmFjayk6VC5PYmplY3RzLkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIC8vcihmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMpO1xuXG4gICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuZmlsdGVyKGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQdXNoIG5ldyBvYmplY3QgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHB1c2gob2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLnB1c2goVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlIG9yIHB1c2ggb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGUob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0QnlJZChvYmplY3QuaWQsIG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QnlJZChpZCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ2dldEJ5SWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKXJldHVybiB0aGlzLm9iamVjdHNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzZXRCeUlkKGlkLCBvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdzZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXSA9IFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcigncmVtb3ZlSWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclR5cGVzKC4uLnR5cGVzKSB7XG5cblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihvYmplY3QudHlwZSkgPT0gLTEpcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUmFkaXVzKGNlbnRlciwgcmFkaXVzKSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGNlbnRlcikgPD0gcmFkaXVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXJBcmVhKGFyZWE6QXJlYSkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChhcmVhLmlzQ29udGFpbmluZyhvYmplY3QuZ2V0UG9zaXRpb24oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKSB7Ly90b2RvIG1heWJlIHJlZmFjdG9yIHRvIGdldFRlcnJhaW5Db2RlczJEQXJyYXkgb3IgZ2V0VGVycmFpbkNvZGVzTWFwXG5cbiAgICAgICAgICAgIC8qdmFyIHJhZGl1cyA9IHNpemUvMjtcbiAgICAgICAgICAgICB2YXIgY2VudGVyID17XG4gICAgICAgICAgICAgeDogdG9wbGVmdC54K3JhZGl1cyxcbiAgICAgICAgICAgICB5OiB0b3BsZWZ0LnkrcmFkaXVzXG4gICAgICAgICAgICAgfTsqL1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DcmVhdGUgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIHZhciBtYXBfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKTsvLy5zbGljZSgpLnJldmVyc2UoKTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7Ly90b2RvIGlzIHRoaXMgb3B0aW1hbGl6YXRpb24gZWZmZWN0aXZlP1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB5IDwgcmFkaXVzICogMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA8IHJhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzICsgb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhjID0gb2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHljID0gb2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cztcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldW3hdID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgueHkyZGlzdCh4IC0geGMsIHkgLSB5YykgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiBtYXBfYXJyYXk7XG5cblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgZ2V0TWFwT2ZDb2xsaXNpb25zKGNlbnRlciwgcmFkaXVzKXtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVRlcnJhaW5zXG4gICAgICAgICAgICB2YXIgbWFwX29mX3RlcnJhaW5fY29kZXMgPSB0aGlzLmdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdmFyIG1hcF9vZl9jb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIHZhciB4LHk7XG5cbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihbMSw1LDExXS5pbmRleE9mKG1hcF9vZl90ZXJyYWluX2NvZGVzW3ldW3hdKSE9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3ldW3hdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1PYmplY3RzXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcblxuICAgICAgICAgICAgICAgIGlmKG9iamVjdC50eXBlID09ICdidWlsZGluZycgJiYgb2JqZWN0LnN1YnR5cGUgPT0gJ3dhbGwnKXt9ZWxzZXtyZXR1cm47fVxuXG4gICAgICAgICAgICAgICAgdmFyIHg9TWF0aC5yb3VuZChvYmplY3QueCktTWF0aC5yb3VuZChjZW50ZXIueC0ocmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgdmFyIHk9TWF0aC5yb3VuZChvYmplY3QueSktTWF0aC5yb3VuZChjZW50ZXIueS0ocmFkaXVzKSk7XG5cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCsxLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeC0xLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5KzF9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5LTF9XG5cbiAgICAgICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24ocF8pe1xuICAgICAgICAgICAgICAgICAgICBpZihwXy54Pj0wICYmIHBfLnk+PTAgJiYgcF8ueDxyYWRpdXMqMiAmJiBwXy55PHJhZGl1cyoyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3BfLnldW3BfLnhdPTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICByZXR1cm4obWFwX29mX2NvbGxpc2lvbnMpO1xuXG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldDF4MVRlcnJhaW5PYmplY3RzKCkge1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfcmF3ID0gdGhpcy5maWx0ZXJUeXBlcygndGVycmFpbicpLmdldEFsbCgpLnNsaWNlKCkucmV2ZXJzZSgpOy8vbm9ybWFsIEFycmF5XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1GaWxsIGFycmF5XG5cbiAgICAgICAgICAgIHZhciBibG9ja2VkX3Bvc2l0aW9ucyA9IHt9O1xuICAgICAgICAgICAgdmFyIG9iamVjdF8xeDEsIGtleTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS54KSArICd5JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS55KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5wdXNoKG9iamVjdF8xeDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0geV9mcm9tOyB5IDw9IHlfdG87IHkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHhfZnJvbTsgeCA8PSB4X3RvOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLnh5MmRpc3QoeCwgeSkgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS5kZXNpZ24uZGF0YS5zaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS54ID0gTWF0aC5yb3VuZChvYmplY3RfMXgxLnggKyB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS55ID0gTWF0aC5yb3VuZChvYmplY3RfMXgxLnkgKyB5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBvYmplY3RfMXgxLnggKyAneScgKyBvYmplY3RfMXgxLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5wdXNoKG9iamVjdF8xeDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gdGVycmFpbl9vYmplY3RzXzF4MTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBqc2RvY1xuICAgICAgICBnZXRUZXJyYWluT25Qb3NpdGlvbihwb3NpdGlvbikge1xuXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLm9iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnR5cGUgIT0gJ3RlcnJhaW4nKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmRlc2lnbi5kYXRhLnNpemUgPD0gcG9zaXRpb24uZ2V0RGlzdGFuY2UobmV3IFQuUG9zaXRpb24odGhpcy5vYmplY3RzW2ldLngsIHRoaXMub2JqZWN0c1tpXS55KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLm9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChudWxsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0TmVhcmVzdFRlcnJhaW5Qb3NpdGlvbldpdGhDb2RlKHBvc2l0aW9uLCB0ZXJyYWluX2NvZGUpIHtcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c18xeDEgPSB0aGlzLmdldDF4MVRlcnJhaW5PYmplY3RzKCk7XG5cbiAgICAgICAgICAgIHZhciBtaW5fZGlzdGFuY2UgPSAtMTtcbiAgICAgICAgICAgIHZhciBuZWFyZXN0X3RlcnJhaW5fMXgxID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEuZm9yRWFjaChmdW5jdGlvbiAodGVycmFpbl8xeDEpIHtcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UocG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1pbl9kaXN0YW5jZSA9PT0gLTEgfHwgbWluX2Rpc3RhbmNlID4gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3RfdGVycmFpbl8xeDEgPSB0ZXJyYWluXzF4MTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmVhcmVzdF90ZXJyYWluXzF4MSA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lYXJlc3RfdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypcblxuICAgICAgICAgZ2V0TWFwT2ZDb2xsaXNpb25Db2RlcyhyZWFsX29iamVjdHMscG9zaXRpb24pe1xuICAgICAgICAgcmV0dXJuIFRlcnJhaW47XG4gICAgICAgICB9O1xuXG4gICAgICAgICAqL1xuXG5cbiAgICB9XG5cbn1cblxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5PYmplY3RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIE9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIHg7XG4gICAgICAgIHB1YmxpYyB5O1xuICAgICAgICBwdWJsaWMgdHlwZTtcbiAgICAgICAgcHVibGljIG5hbWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc19rZXkgPT0gJ19pZCcpdGhpc19rZXkgPSAnaWQnOy8vdG9kbyBtYXliZSBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGluaXQob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmKG9iamVjdCBpbnN0YW5jZW9mIFQuT2JqZWN0cy5PYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT0gJ2J1aWxkaW5nJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5CdWlsZGluZyhvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICd0ZXJyYWluJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3N0b3J5Jykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5TdG9yeShvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICduYXR1cmFsJykge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5OYXR1cmFsKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBwdXQgaXRlbSBpbnRvIFRvd25zIE9iamVjdHMgQXJyYXkgYmVjYXVzZSBvZiB1bnJlY29nbml6ZWQgb2JqZWN0IHR5cGUgJyArIG9iamVjdC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKTpQb3NpdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gKCdbJyArIHRoaXMubmFtZSArICddJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5CdWlsZGluZ1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgQnVpbGRpbmcgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduO1xuICAgICAgICBwdWJsaWMgYWN0aW9ucztcbiAgICAgICAgcHVibGljIHBhdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICAgICAgc3VwZXIob2JqZWN0KTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3NlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNfY2xhc3Nlcy5wdXNoKFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh0aGlzLmFjdGlvbnNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9uc19jbGFzc2VzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcih0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aCA9IG5ldyBULlBhdGgoLi4udGhpcy5wYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB2YXIgbGlmZV9hY3Rpb24gPSB0aGlzLmdldEFjdGlvbignbGlmZScpO1xuICAgICAgICAgICAgdmFyIG1heF9saWZlID0gVC5Xb3JsZC5nYW1lLmdldE9iamVjdE1heExpZmUodGhpcyk7XG5cblxuICAgICAgICAgICAgaWYgKGxpZmVfYWN0aW9uID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbiA9IFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaWZlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWZlOiBtYXhfbGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heF9saWZlOiBtYXhfbGlmZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2gobGlmZV9hY3Rpb24pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGlmZV9hY3Rpb24ucGFyYW1zLm1heF9saWZlID0gbWF4X2xpZmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBvc2l0aW9uKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguY291bnRQb3NpdGlvbihkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZyhkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguaW5Qcm9ncmVzcyhkYXRlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuQnVpbGRpbmcoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk1vZGVsfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9kZWwoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmRlc2lnbi5kYXRhIGluc3RhbmNlb2YgVC5Nb2RlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lnbi5kYXRhID0gbmV3IFQuTW9kZWwodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kZXNpZ24uZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYWN0aW9uX3R5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuR2FtZS5BY3Rpb25BYmlsaXR5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QWN0aW9uKGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uc1tpXS50eXBlID09IGFjdGlvbl90eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFjdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY3JlYXRlSHRtbFByb2ZpbGUoKSB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25zX3Byb2ZpbGUgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNfcHJvZmlsZSArPSB0aGlzLmFjdGlvbnNbaV0uY3JlYXRlSHRtbFByb2ZpbGUoKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gKGBcblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdC1idWlsZGluZy1wcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICA8aDI+YCArIHRoaXMubmFtZSArIGA8L2gyPlxuICAgICAgICAgICAgICAgIGAgKyB0aGlzLmdldFBvc2l0aW9uKCkgKyBgXG5cblxuICAgICAgICAgICAgICAgIGAgKyBhY3Rpb25zX3Byb2ZpbGUgKyBgXG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICBgKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk5hdHVyYWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTmF0dXJhbCBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuTmF0dXJhbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2RlKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFN0b3J5IGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGNvbnRlbnQ7XG5cbiAgICAgICAgY2xvbmUoKSB7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULk9iamVjdHMuU3RvcnkoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE1hcmtkb3duKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNvbnRlbnQuZGF0YSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLlN0b3J5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBUZXJyYWluIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcblxuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5UZXJyYWluKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUocHJlZmVyZWRfd2lkdGgpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmltYWdlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRDb2xvcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhLmNvbG9yKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gZ2V0SW1hZ2UoKXt9XG5cblxuICAgIH1cblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIFJlc291cmNlcyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihyZXNvdXJjZXM6T2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc291cmNlc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbChyZXNvdXJjZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7UmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKTpSZXNvdXJjZXMge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNvdXJjZXModGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVja3Mgd2hldGhlciB0aGlzIGNvbnRhaW5zIGEgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgICAgICogQHJldHVybiB7Ym9vbH0gY29udGFpbnNcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRhaW5zKHJlc291cmNlczpSZXNvdXJjZXMpOmJvb2xlYW4ge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA8IHJlc291cmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJjZXNcbiAgICAgICAgICogQHJldHVybiB7Ym9vbH0gc3VjY2Vzc1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkKHJlc291cmNlczpSZXNvdXJjZXMpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldICs9IHJlc291cmNlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtdWx0aXBseShrOm51bWJlcik6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBNYXRoLmNlaWwodGhpc1trZXldICogayk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgc2lnbnVtKGs6c3RyaW5nKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtb2RpZmllclxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIGFwcGx5KG1vZGlmaWVyOkZ1bmN0aW9uKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG1vZGlmaWVyKHRoaXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gYWxsIHJlc291cmNlcyBrZXlzXG4gICAgICAgICAqL1xuICAgICAgICBleHRyYWN0S2V5cygpOkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGtleXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBEaXN0YW5jZSBiZXR3ZWVuIHRoaXMgYW5kIGdpdmVuIFJlc291cmNlc1xuICAgICAgICAgKi9cbiAgICAgICAgY29tcGFyZShyZXNvdXJlczpSZXNvdXJjZXMpOm51bWJlciB7XG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VzX0IgPSByZXNvdXJlcztcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19BLmV4dHJhY3RLZXlzKCkpO1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHJlc291cmNlc19CLmV4dHJhY3RLZXlzKCkpO1xuXG5cbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gMDtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBrZXlzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWxfQSA9IHJlc291cmNlc19BW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHZhbF9CID0gcmVzb3VyY2VzX0Jba2V5XTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQSA9PSAndW5kZWZpbmVkJyl2YWxfQSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQiA9PSAndW5kZWZpbmVkJyl2YWxfQiA9IDA7XG5cbiAgICAgICAgICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnBvdyh2YWxfQSAtIHZhbF9CLCAyKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmUocmVzb3VyY2VzOlJlc291cmNlcyk6Ym9vbGVhbiB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jb250YWlucyhyZXNvdXJjZXMpKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgdGhpc1trZXldIC09IHJlc291cmNlc1trZXldO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBSZXNvdXJjZXMgdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBzdHJpbmdzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2godGhpc1trZXldICsgJyAnICsga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdzLmpvaW4oJywgJyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9IVE1MKCk6c3RyaW5nIHsvL3RvZG8gcHV0IHVybCBwcmVmaXggaW50byBwYXJhbXNcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBULkxvY2FsZS5nZXQoJ3Jlc291cmNlJywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvY2FsZVN0cmluZygvKidlbi1VUycnZGUtREUnKi8pOy8vdG9kbyB0b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2goJzxkaXY+PGltZyBzcmM9XCIvbWVkaWEvaW1hZ2UvcmVzb3VyY2VzLycgKyBrZXkgKyAnLnBuZ1wiIHRpdGxlPVwiJyArIG5hbWUgKyAnXCIgYWx0PVwiJyArIG5hbWUgKyAnXCIgPicgKyB2YWx1ZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RyaW5nc19qb2luZWQgPSBzdHJpbmdzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIHN0cmluZ3Nfam9pbmVkID0gJzxkaXYgY2xhc3M9XCJyZXNvdXJjZXNcIj4nICsgc3RyaW5nc19qb2luZWQgKyAnPC9kaXY+JztcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Nfam9pbmVkO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBjbGFzcyBULlRNYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuXG4gICAgaW50ZXJmYWNlIHBvc2l0aW9uIHtcbiAgICAgICAgeDogbnVtYmVyO1xuICAgICAgICB5OiBudW1iZXI7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIHBvc2l0aW9uUG9sYXIge1xuICAgICAgICBkaXN0OiBudW1iZXI7XG4gICAgICAgIGRlZzogbnVtYmVyO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBNYXRoZW1hdGljYWwgZnVuY3Rpb25zIHRvIFRvd25zXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFRNYXRoIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgc2lnbih4OiBudW1iZXIpOiBudW1iZXIgey8vdG9kbyBNYXRoLnNpZ24gfHwgdGhpc1xuICAgICAgICAgICAgeCA9ICt4OyAvLyBjb252ZXJ0IHRvIGEgbnVtYmVyXG4gICAgICAgICAgICBpZiAoeCA9PT0gMCB8fCBpc05hTih4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHggPiAwID8gMSA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIGJhc2VcbiAgICAgICAgICogQHBhcmFtIG51bWJlclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJhc2VMb2coYmFzZTogbnVtYmVyLCBudW1iZXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5sb2cobnVtYmVyKSAvIE1hdGgubG9nKGJhc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0c1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IEN1dHMgdW5sZXNzIGRpZ2l0cyB0byB6ZXJvXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcHJldHR5TnVtYmVyKG51bWJlcjogbnVtYmVyLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgICAgICBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzID0gbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cyB8fCAyOy8vdG9kbyByZWZhY3RvciBsaWtlIHRoaXNcblxuXG4gICAgICAgICAgICB2YXIgZGlnaXRzID0gTWF0aC5jZWlsKFQuVE1hdGguYmFzZUxvZygxMCwgbnVtYmVyKSk7XG4gICAgICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIC0gZGlnaXRzKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyICogaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciAvIGs7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMTogbnVtYmVyLCBkZWcyOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMikgJSAzNjA7XG4gICAgICAgICAgICBpZiAoZGVnID4gMTgwKWRlZyA9IDM2MCAtIGRlZztcbiAgICAgICAgICAgIHJldHVybiAoZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJhZDJkZWcocmFkaWFuczpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSkpICUgMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVncmVlcyAlIDM2MCAqIChNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geFxuICAgICAgICAgKiBAcGFyYW0geVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgeHkyZGlzdCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIHh5MmRpc3REZWcoeDpudW1iZXIsIHk6bnVtYmVyKTpwb3NpdGlvblBvbGFyIHtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICBkaXN0OiBULlRNYXRoLnh5MmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgICAgZGVnOiAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIoeSwgeCkpXG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3Q6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cbiAgICAgICAgICAgIHZhciByYWQgPSBULlRNYXRoLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgICAgIHN0YXRpYyB4eVJvdGF0ZSh4OiBudW1iZXIsIHk6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3QgPSBULlRNYXRoLnh5MmRpc3QoeCwgeSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LCB4KTtcblxuICAgICAgICAgICAgcmFkICs9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG5cbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5jb3MocmFkKSAqIGRpc3QsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5zaW4ocmFkKSAqIGRpc3RcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZDpudW1iZXIsIHBvc2l0aW9uOnBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCAqIHBvc2l0aW9uLnkpIC0gc2VlZCwgMikpICsgMSkgLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0ludCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRlZnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJvdW5kcyh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbilyZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KXJldHVybiBtYXg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpc09uTGluZShhMXg6bnVtYmVyLCBhMXk6bnVtYmVyLCBhMng6bnVtYmVyLCBhMnk6bnVtYmVyLCBiMXg6bnVtYmVyLCBiMXk6bnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgIGEyeCAtPSBhMXg7XG4gICAgICAgICAgICBhMnkgLT0gYTF5O1xuXG4gICAgICAgICAgICBiMXggLT0gYTF4O1xuICAgICAgICAgICAgYjF5IC09IGExeTtcblxuXG4gICAgICAgICAgICB2YXIgYVNsb3BlID0gYTJ5IC8gYTJ4O1xuICAgICAgICAgICAgdmFyIGJTbG9wZSA9IGIxeSAvIGIxeDtcblxuXG4gICAgICAgICAgICBpZiAoYVNsb3BlICE9IGJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICAgICAgdmFyIGFEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGEyeSwgYTJ4KTtcbiAgICAgICAgICAgIHZhciBiRGlzdCA9IFQuVE1hdGgueHkyZGlzdChiMXksIGIxeCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoYURpc3QgPj0gYkRpc3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIsIGIyeDpudW1iZXIsIGIyeTpudW1iZXIpOiBib29sZWFuIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYk9uQSA9IFQuVE1hdGguaXNPbkxpbmUoYTF4LCBhMXksIGEyeCwgYTJ5LCBiMXgsIGIxeSk7XG4gICAgICAgICAgICAgICAgdmFyIGFPbkIgPSBULlRNYXRoLmlzT25MaW5lKGIxeCwgYjF5LCBiMngsIGIyeSwgYTF4LCBhMXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9ICgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcjpGdW5jdGlvbiwgYmx1cjpudW1iZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHZhciB4eCwgeXk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSkgKyAnJyArIHNpemVzW2ldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQ6bnVtYmVyLCBhX3Bvc2l0aW9uOm51bWJlciwgYV9lbmQ6bnVtYmVyLCBiX3N0YXJ0Om51bWJlciwgYl9lbmQ6bnVtYmVyKTpudW1iZXIge1xuXG5cbiAgICAgICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQgLSBhX3N0YXJ0O1xuICAgICAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZCAtIGJfc3RhcnQ7XG5cbiAgICAgICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZCAtIGFfcG9zaXRpb247XG4gICAgICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUgKiBhX3BhcnQpIC8gYV93aG9sZTtcblxuICAgICAgICAgICAgcmV0dXJuIChiX2VuZCAtIGJfcGFydCk7XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XG4gICAgICAgIHVzZXJuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgbmFtZTogJ3N0cmluZyc7XG4gICAgICAgIHN1cm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBlbWFpbDogJ3N0cmluZyc7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XG5cblxuICAgICAgICBwcm9maWxlOiBVc2VyUHJvZmlsZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodXNlcjogVXNlcikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXNlcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmF0dXJlSFRNTCgpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSArICcgJyArIHRoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gICsgbmFtZSArIGA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArIHRoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkgKyBgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNpZ25hdHVyZV9odG1sKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUgVC5Xb3JsZHtcblxuXG4gICAgZXhwb3J0IHZhciB0ZXJyYWlucyA9IFtcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbiAgICBdO1xuXG5cbn1cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuV29ybGR7XG5cbiAgICBleHBvcnQgdmFyIG1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgICAgICBULlRNYXRoLmJsdXJYWShmdW5jdGlvbih4OiBudW1iZXIseTogbnVtYmVyKXtcblxuICAgICAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAgICAgLy90b2RvLy9pZih0eXBlb2Ygel9tYXBfY2FjaGVba2V5XSE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICAgICAgY29uc3QgZGl2PTEwMDtcblxuXG4gICAgICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgICAgICB2YXIgX3g6IG51bWJlcixfeTogbnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgICAgICB2YXIga189MS1rO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICAgICAgbWF4X3Bvc3NpYmxlX24rPWRpdjtcblxuICAgICAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgICAgICAvL3ZhciB4eSA9IFQuVE1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgICAgICAvL3k9eHkueTtcblxuICAgICAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICAgICAgeD1NYXRoLmZsb29yKF94LzQpO1xuICAgICAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIG49bi9tYXhfcG9zc2libGVfbjtcblxuICAgICAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAgICAgLy90b2RvLy96X21hcF9jYWNoZVtrZXldPW47XG4gICAgICAgICAgICByZXR1cm4obik7XG5cbiAgICAgICAgfSwyKVxuICAgICAgICAsXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICAsXG5cbiAgICAgICAgbmV3IFQuTWFwR2VuZXJhdG9yLkJpb3RvcGUoW1xuXG4gICAgICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTFdfSwvL8WZZWthXG4gICAgICAgICAgICB7IGFtb3VudDogMzAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA0XX0sLy9ww61zZWtcbiAgICAgICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA5XX0sLy90csOhdmEgdG94aWNcbiAgICAgICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEyXX0sLy90csOhdmEgamFyb1xuICAgICAgICAgICAgeyBhbW91bnQ6IDUwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEzXX0sLy90csOhdmEgcG96aW1cbiAgICAgICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cbiAgICAgICAgICAgIHsgYW1vdW50OiA2MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgICAgIHsgYW1vdW50OiA2MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDddfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuXG5cblxuICAgICAgICBdKSxcblxuXG4gICAgICAgIGZ1bmN0aW9uKG9iamVjdCx2aXJ0dWFsX29iamVjdHMpe1xuXG4gICAgICAgICAgICBpZihvYmplY3QudHlwZSE9J3RlcnJhaW4nKXJldHVybjtcblxuICAgICAgICAgICAgLyppZihvYmplY3QuZ2V0Q29kZSgpPT01KXtcbiAgICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMucHVzaChcbiAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgIGltYWdlOidyb2NrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDEse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjYpJTYrJ2RhcmsnK01hdGguZmxvb3IoVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMix7eDpvYmplY3QueCx5Om9iamVjdC55fSkqNCklNCxcbiAgICAgICAgICAgICBzaXplOiAwLjUrVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKTtcblxuXG4gICAgICAgICAgICAgfWVsc2UqL1xuICAgICAgICAgICAgaWYob2JqZWN0LmdldENvZGUoKT09MTApe1xuXG4gICAgICAgICAgICAgICAgaWYoVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMyx7eDpvYmplY3QueCx5Om9iamVjdC55fSk+MC45NSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDondHJlZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAzK1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDYse3g6b2JqZWN0LngseTpvYmplY3QueX0pLzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMjAtMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMjAtMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgejogVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMzYwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICk7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnIoVCk7XG5cblQuV29ybGQuZ2FtZSA9IG5ldyBULkdhbWUoXG4gICAgVC5UTWF0aC5wcmV0dHlOdW1iZXIsXG4gICAgVC5UTWF0aC5wcmV0dHlOdW1iZXJcbik7IiwiXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIGRpc3RhbmNlOiAgIDAsXG4gICAgICAgIHN0cmVuZ3RoOiAgIDAsXG4gICAgICAgIHJvdW5kczogICAgIDEsXG4gICAgICAgIGNvb2xkb3duOiAgIDFcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2F0dGFjaycpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKChNYXRoLnBvdyh0aGlzLnBhcmFtcy5kaXN0YW5jZSwyKSp0aGlzLnBhcmFtcy5zdHJlbmd0aCp0aGlzLnBhcmFtcy5yb3VuZHMqKDEvdGhpcy5wYXJhbXMuY29vbGRvd24pKSoxMDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAyfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgZXhlY3V0ZShnYW1lLGF0dGFja2VyLGF0dGFja2VkLHJlc291cmNlc19hdHRhY2tlcil7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2RlZmVuY2UgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcbiAgICAgICAgICAgIHZhciBhdHRhY2tlZF9hdHRhY2sgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2xpZmUgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2xpZmUnKS5wYXJhbXM7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZWRfbGlmZSA9IGF0dGFja2VkLmdldEFjdGlvbignbGlmZScpLnBhcmFtcztcblxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tTWlzc2luZyBhY3Rpb25cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2s9YXR0YWNrZXJfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRhY2tlciBoYXMgbm90IGFiaWxpdHkgdG8gYXR0YWNrJyk7XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZT1hdHRhY2tlcl9kZWZlbmNlLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlZF9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2s9YXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdhdHRhY2snKS5wYXJhbXM7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlZF9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZT1hdHRhY2tlZF9kZWZlbmNlLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURpc3RhbmNlXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgaWYoZGlzdGFuY2U+YXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlKXtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcrZGlzdGFuY2UrJyBmaWVsZHMuIEF0dGFjayBkaXN0YW5jZSBpcyBvbmx5ICcrYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlKycgZmllbGRzLicpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db29sZG93blxuICAgICAgICAgICAgaWYoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKXtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBhY3Rpb24gY2FuIGJlIGV4ZWN1dGVkIGluICcrYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkSW4oKSsnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVNldCB1c2FnZVxuICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVmZW5jZVxuXG4gICAgICAgICAgICAvL3IoJ2F0dGFjaycsYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCk7XG4gICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgtPVxuICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aDwwKWF0dGFja2VyX2F0dGFjay5zdHJlbmd0aD0wO1xuXG5cblxuICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoLT1cbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlLmRlZmVuY2U7XG4gICAgICAgICAgICBpZihhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg8MClhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg9MDtcblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgLy9hdHRhY2tlZF9saWZlLmxpZmU9MTAwMDtcblxuXG4gICAgICAgICAgICB3aGlsZShcbiAgICAgICAgICAgICAgICAgICAgKGF0dGFja2VyX2F0dGFjay5yb3VuZHMgfHwgYXR0YWNrZWRfYXR0YWNrLnJvdW5kcykgJiZcbiAgICAgICAgICAgICAgICAgICAgKGF0dGFja2VyX2xpZmUubGlmZT4xICYmIGF0dGFja2VkX2xpZmUubGlmZT4xKVxuICAgICAgICAgICAgICAgICl7XG5cbiAgICAgICAgICAgICAgICByKCdyb3VuZCcsYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCk7XG4gICAgICAgICAgICAgICAgcignbGlmZScsYXR0YWNrZWRfbGlmZS5saWZlLGF0dGFja2VyX2xpZmUubGlmZSk7XG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9saWZlLmxpZmUtPWF0dGFja2VyX2F0dGFjay5zdHJlbmd0aDtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9saWZlLmxpZmUtPWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnJvdW5kcy0tO1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2xpZmUubGlmZTwxKWF0dGFja2VyX2xpZmUubGlmZT0xO1xuICAgICAgICAgICAgaWYoYXR0YWNrZWRfbGlmZS5saWZlPDEpYXR0YWNrZWRfbGlmZS5saWZlPTE7XG5cblxuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgZGVmZW5jZTogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdkZWZlbmNlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKHRoaXMucGFyYW1zLmRlZmVuY2UpKjgwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDF9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cbik7XG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgbGlmZTogICAxLFxuICAgICAgICBtYXhfbGlmZTogICAxXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdsaWZlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbbmV3IFQuUmVzb3VyY2VzKCldKTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cbik7XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICB3b29kOiAgIDAsXG4gICAgICAgIGlyb246ICAgMCxcbiAgICAgICAgY2xheTogICAwLFxuICAgICAgICBzdG9uZTogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdtaW5lJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKHRoaXMucGFyYW1zLmFtb3VudCkqMzYwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICA0fSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyB0aWNrKCl7Ly90b2RvIG9yIG1heWJlIGV4ZWN1dGVcbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBzcGVlZDogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdtb3ZlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLnNwZWVkLDIpKSoxMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAwfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMX0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSxvYmplY3QsZGVzdGluYXRpb25zLyosb2JqZWN0c19uZWFyYnkscmVzb3VyY2VzKi8pe1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIGFjdGlvbi8vdG9kbyBtYXliZSBhdXRvXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gb2JqZWN0LmdldEFjdGlvbignbW92ZScpO1xuICAgICAgICAgICAgaWYoYWN0aW9uIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgaGFzIG5vdCBhYmlsaXR5IHRvIG1vdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgdmFyIHN0YXJ0X3Bvc2l0aW9uPW9iamVjdC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZGVzdGluYXRpb25zLnVuc2hpZnQoc3RhcnRfcG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvL3IoZGVzdGluYXRpb25zKTtcblxuICAgICAgICAgICAgb2JqZWN0LnBhdGggPSBULlBhdGgubmV3Q29uc3RhbnRTcGVlZChkZXN0aW5hdGlvbnMsYWN0aW9uLnBhcmFtcy5zcGVlZCk7XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2UvL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgb2JqZWN0LmdldEFjdGlvbignbW92ZScpLm5vd0V4ZWN1dGVkKCk7Ly90b2RvIGlzIGl0IG5lZWRlZFxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyB0aWNrKCl7Ly90b2RvIG1heWJlID8/PyB0b2RvXG4gICAgICAgIH0qL1xuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgcmVnZW5lcmF0ZTogICAxMDAsXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdyZWdlbmVyYXRlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKDEvdGhpcy5wYXJhbXMucmVnZW5lcmF0ZSkqMzYwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICA0fSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAyfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7Ly90b2RvIG1heWJlIHRpY2s/Pz8/XG4gICAgICAgIH0qL1xuXG5cblxuXG4gICAgfVxuKTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHJlcGFpcjogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdyZXBhaXInKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoMS8odGhpcy5wYXJhbXMucmVwYWlyLzEwMCkpKjEwMDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgNH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgNH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypzdGF0aWMgZXhlY3V0ZSgpe1xuICAgICAgICAgICAgLy90b2RvXG4gICAgICAgIH0qL1xuXG5cblxuXG4gICAgfVxuKTtcblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgdGhyb3VnaHB1dDogICAwXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCd0aHJvdWdocHV0Jyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLnRocm91Z2hwdXQvMTAwLDIpKSoxMCowLjA1KTsvL3RvZG9cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDF9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgIH1cbik7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
