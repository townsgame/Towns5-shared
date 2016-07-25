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
T.World.mapGenerator = new T.MapGenerator(T.TMath.blurXY(function (x, y) {
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
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjA1LXRvd25zLm5hbWVzcGFjZS50cyIsIjEwLV9wb3NpdGlvbi8xMC1jb2xvci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLTNkLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLXBvbGFyLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzE1LXBvc2l0aW9uLWRhdGUuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMjAtYXJlYS5jbGFzcy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcmVzb3VyY2VzLmNsYXNzLnRzIiwiMTAtdG1hdGguc3RhdGljLnRzIiwiMTAtdXNlci5jbGFzcy50cyIsIjIwLXdvcmxkLzAwLXRlcnJhaW5zLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMTAtbWFwLWdlbmVyYXRvci5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzIwLWdhbWUuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvYXR0YWNrLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL2RlZmVuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbGlmZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9taW5lLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21vdmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvcmVnZW5lcmF0ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZXBhaXIudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvdGhyb3VnaHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHOUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUdyQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUdsQzs7OztHQUlHO0FBQ0gsQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFTLFNBQVM7SUFFL0IsU0FBUyxHQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFL0IsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDO0lBRWhCLElBQUksR0FBRyxDQUFDO0lBQ1IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztRQUVyQyxHQUFHLEdBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsS0FBRyxHQUFHLENBQUM7WUFBQSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFOUQsRUFBRSxDQUFBLENBQUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUcsV0FBVyxDQUFDLENBQUEsQ0FBQztZQUVqQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDO1lBQ2YsTUFBTSxHQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFFRixNQUFNLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLENBQUM7SUFHTCxDQUFDO0lBRUQsTUFBTSxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFakIsQ0FBQyxDQUFDO0FDdERGOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0EySFA7QUEzSEQsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQUNOOztPQUVHO0lBQ0g7UUFFSTs7Ozs7O1dBTUc7UUFDSCxlQUFtQixDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQVMsRUFBUSxDQUFPO1lBQWQsaUJBQWMsR0FBZCxPQUFjO1lBQTFELE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQU07WUFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBRUQ7OztXQUdHO1FBQ0gscUJBQUssR0FBTDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFHRDs7O1dBR0c7UUFDSCxzQkFBTSxHQUFOO1lBRUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFD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TUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO0lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7SUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztJQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7SUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO0lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztJQUMxSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVB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LENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUd2dkssSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUV2QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENB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QUksQ0FBQyxFQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdMLGVBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUF3QjFCLENBQ0osQ0FBQyIsImZpbGUiOiJ0b3ducy1zaGFyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBJbml0aWFsaXplIG5hbWVzcGFjZSBUb3duc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBUb3ducyBuYW1lc3BhY2UgLSB1bmRlciB0aGlzIG9iamVjdCBhcmUgYWxsIFRvd25zIGNsYXNzZXMgYW5kIGluc3RhbmNlcy5cbiAqIEB0eXBlIHtvYmplY3R9XG4gKi9cbmdsb2JhbC5Ub3ducyA9IHt9O1xubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuVG93bnM7XG5cblxudmFyIFQgPSBnbG9iYWwuVG93bnM7XG5cblxudmFyIHIgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuXG5cbi8qKlxuICogQ2hlY2tzIGV4aXN0ZW5jZSBvZiBuYW1lc3BhY2UuIElmIG5vdCBleGlzdHMsIHRoaXMgZnVuY3Rpb24gY3JlYXRlcyBpdC5cbiAqIEBwYXJhbSBuYW1lc3BhY2UgZWcuICdPYmplY3RzLkFycmF5J1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblQuc2V0TmFtZXNwYWNlID0gZnVuY3Rpb24obmFtZXNwYWNlKXtcblxuICAgIG5hbWVzcGFjZT1uYW1lc3BhY2Uuc3BsaXQoJy4nKTtcblxuICAgIHZhciBBY3R1YWw9dGhpcztcblxuICAgIHZhciBrZXk7XG4gICAgZm9yKHZhciBpPSAwLGw9bmFtZXNwYWNlLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICBrZXk9bmFtZXNwYWNlW2ldO1xuXG4gICAgICAgIGlmKGtleT09PSdUJyl0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgc2V0IG5hbWVzcGFjZSBUIHVuZGVyIFQhJyk7XG5cbiAgICAgICAgaWYodHlwZW9mIEFjdHVhbFtrZXldPT09J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICBBY3R1YWxba2V5XT17fTtcbiAgICAgICAgICAgIEFjdHVhbD1BY3R1YWxba2V5XTtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgQWN0dWFsPUFjdHVhbFtrZXldO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmV0dXJuKHRydWUpO1xuXG59OyIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Db2xvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVCB7XG4gICAgLyoqXG4gICAgICogT2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgUkdCQSBjb2xvci5cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQ29sb3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gciByZWQgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gZyBncmVlbiBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqIEBwYXJhbSBiIGJsdWUgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gYSBhbHBoYSBmcm9tIDAgdG8gMjU1XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcjogbnVtYmVyLHB1YmxpYyBnOiBudW1iZXIscHVibGljIGI6IG51bWJlcixwdWJsaWMgYSA9IDI1NSkge1xuICAgICAgICAgICAgdGhpcy5yID0gcjtcbiAgICAgICAgICAgIHRoaXMuZyA9IGc7XG4gICAgICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgICAgICAgdGhpcy5hID0gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgZGVlcCBjbG9uZSBvZCBULkNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtULkNvbG9yfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKTpULkNvbG9ye1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULkNvbG9yKHRoaXMucix0aGlzLmcsdGhpcy5iLHRoaXMuYSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZHMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgICAgIHRoaXMuYSA9IE1hdGgucm91bmQodGhpcy5hKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNzcyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDc3NDb2xvcigpIHtcblxuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmEgPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3IoJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hLzI1NSoxMDApLzEwMCArICcpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3IgKGlnbm9yZXMgYWxwaGEgY2hhbmVsLilcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuICMwMGZmMDBcbiAgICAgICAgICovXG4gICAgICAgIGdldEhleCgpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gJyMnICsgKCgxIDw8IDI0KSArICh0aGlzLnIgPDwgMTYpICsgKHRoaXMuZyA8PCA4KSArIHRoaXMuYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBuZXcgVC5Db2xvciBmb3JtIGhleCBjb2RlIG9mIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXggY29kZSBvZiBjb2xvciBlZy4gIzAwZmYwMFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjcmVhdGVGcm9tSGV4KGhleDogc3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQsIHNob3J0aGFuZFJlZ2V4O1xuXG4gICAgICAgICAgICBzaG9ydGhhbmRSZWdleCA9IC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2k7XG4gICAgICAgICAgICBoZXggPSBoZXgucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgZnVuY3Rpb24gKG0sIHIsIGcsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFQuQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY3JlYXRpbmcgVC5Db2xvciBmcm9tICcgKyBoZXgpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5QYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVHtcblxuICAgIGV4cG9ydCBjbGFzcyBQYXRoIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHsuLi5ULlBvc2l0aW9uRGF0ZX0gUG9zaXRpb24gd2l0aCBkYXRlIGF0IGxlYXN0IDJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblxuXG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL2lmKGFyZ3MubGVuZ3RoPT09MSAmJiBhcmdzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy8gICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJnc1swXTtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZSwgbGFzdF9kYXRlID0gLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb25EYXRlKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0gPSBuZXcgVC5Qb3NpdGlvbkRhdGUodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBQYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoIG11c3QgYmUgVC5Qb3NpdGlvbkRhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdF9kYXRlID49IHBvc2l0aW9uX2RhdGUuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVzIHNob3VsZCBiZSBjb25zZWN1dGl2ZSB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggKCcgKyBwb3NpdGlvbl9kYXRlLmRhdGUgKyAnIHNob3VsZCBiZSBhZnRlciAnICsgbGFzdF9kYXRlICsgJykuICcgKyB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0X2RhdGUgPSBwb3NpdGlvbl9kYXRlLmRhdGU7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRvSlNPTigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXkuPFQuUG9zaXRpb24+fSBhcnJheV9wb3NpdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBhdGh9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgbmV3Q29uc3RhbnRTcGVlZChhcnJheV9wb3NpdGlvbiwgc3BlZWQsIGRhdGUgPSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmFOKHNwZWVkIC8gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgdmFsaWQgbnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwZWVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgcG9zaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhcnJheV9wb3NpdGlvbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycmF5X3Bvc2l0aW9uX2RhdGUgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFQuUG9zaXRpb25EYXRlKGFycmF5X3Bvc2l0aW9uWzBdLngsIGFycmF5X3Bvc2l0aW9uWzBdLnksIGRhdGUpXG4gICAgICAgICAgICBdO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXN0X3Bvc2l0aW9uID0gYXJyYXlfcG9zaXRpb25bMF07XG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbl9kYXRlLCBkaXN0YW5jZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxLCBsID0gYXJyYXlfcG9zaXRpb24ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbl9kYXRlID0gYXJyYXlfcG9zaXRpb25baV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggdmlhIG5ld0NvbnN0YW50U3BlZWQgbXVzdCBiZSBULlBvc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGxhc3RfcG9zaXRpb24uZ2V0RGlzdGFuY2UocG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLyAxICsgZGlzdGFuY2UgLyBzcGVlZCAqIDEwMDApO1xuXG5cbiAgICAgICAgICAgICAgICBsYXN0X3Bvc2l0aW9uID0gcG9zaXRpb25fZGF0ZTtcblxuXG4gICAgICAgICAgICAgICAgYXJyYXlfcG9zaXRpb25fZGF0ZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25baV0ueCwgYXJyYXlfcG9zaXRpb25baV0ueSwgZGF0ZSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9yZXR1cm4gbmV3IHRoaXMuYXBwbHkodGhpcyxhcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgIC8vcmV0dXJuIE9iamVjdC5jcmVhdGUoVC5QYXRoLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBhdGgoLi4uYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBnZXRQb3NpdGlvbnMoKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaCh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuKHBvc2l0aW9ucyk7XG4gICAgICAgIH1cblxuXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudCBpbiB3aGljaCBzZWdtZW50IGlzIFQuUGF0aCBwcm9ncmVzc1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTZWdtZW50KGRhdGUpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5kYXRlIDw9IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluIHByb2dyZXNzXG5cbiAgICAgICAgICAgIHZhciBBLCBCLCB4LCB5O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZGF0ZSAvIDE7XG4gICAgICAgICAgICAgICAgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpICsgMV0uZGF0ZSAvIDE7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGkrJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcblxuICAgICAgICAgICAgICAgIGlmIChBIDw9IGRhdGUgJiYgQiA+IGRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCc8LS0tdGhpcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNvdW50aW5nIHNlZ21lbnQgaW4gVC5QYXRoLCBtYXliZSBiZWNhdXNlIG9mIHBhcmFtIGRhdGUgaXMgJyArIGRhdGUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcG9zaXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGNvdW50UG9zaXRpb24oZGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5kYXRlIDw9IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSk7XG5cbiAgICAgICAgICAgIHZhciB4ID0gVC5UTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS54LCBCLngpO1xuICAgICAgICAgICAgdmFyIHkgPSBULlRNYXRoLnByb3BvcnRpb25zKEEuZGF0ZSAvIDEsIGRhdGUgLyAxLCBCLmRhdGUgLyAxLCBBLnksIEIueSk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oeCwgeSkpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvdW50cyByb3RhdGlvbiBhdCAnZGF0ZSdcbiAgICAgICAgICogQHBhcmFtIGRhdGVcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRSb3RhdGlvbihkYXRlID0gMCkge1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIEJBID0gQi5nZXRQb3NpdGlvbigpLnBsdXMoQS5nZXRQb3NpdGlvbigpLm11bHRpcGx5KC0xKSk7XG5cbiAgICAgICAgICAgIHZhciBwb2xhciA9IEJBLmdldFBvc2l0aW9uUG9sYXIoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvbGFyLmdldERlZ3JlZXMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgU3BlZWQgYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGZpZWxkcy9zXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFNwZWVkKGRhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcyhkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQgKyAxXTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gQS5nZXREaXN0YW5jZShCKTtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IEIuZGF0ZSAtIEEuZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIChkaXN0YW5jZSAvIChkdXJhdGlvbiAvIDEwMDApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcGF0aCBpbiBwcm9ncmVzcyAodHJ1ZSkgb3IgaXQgaGFzIG5vdCBzdGFydGVkKGZhbHNlKSBvciBpdCBpcyBmaW5pc2hlZChmYWxzZSk/XG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGluUHJvZ3Jlc3MoZGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBtYXliZSBjb3VudFByb2dyZXNzXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbjNEIHtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHguejtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLnogPSB6O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uM0QodGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbjNEIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAnWycgKyB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnLCcgKyB0aGlzLnogKyAnXSc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBQb3NpdGlvblBvbGFyXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb25Qb2xhciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZGlzdGFuY2UsIGRlZ3JlZXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXN0YW5jZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgZGVncmVlcyA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSB0aGlzLmdldFJhZGlhbnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbihcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4ocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlXG4gICAgICAgICAgICApKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldERpc3RhbmNlKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREZWdyZWVzKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVncmVlcyArIDM2MCkgJSAzNjA7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UmFkaWFucygpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGguZGVnMnJhZCh0aGlzLmRlZ3JlZXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJycgKyB0aGlzLmRpc3RhbmNlICsgJywnICsgdGhpcy5kZWdyZWVzICsgJ8KwJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUG9zaXRpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG4gICAgLyoqXG4gICAgICogR2xvYmFsIHBvc2l0aW9uIG9uIHRvd25zIG1hcFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL15bKy1dP1xcZCsoXFwuXFxkKyk/LFsrLV0/XFxkKyhcXC5cXGQrKT8kLy50ZXN0KHgpKSB7XG5cbiAgICAgICAgICAgICAgICB4ID0geC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHBhcnNlRmxvYXQoeFswXSk7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdCh4WzFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbyBjaGVja1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjb25zdHJ1Y3RvciBwYXJhbXMgd2hpbGUgY3JlYXRpbmcgVC5Qb3NpdGlvbiEnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBsdXMocG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54ICs9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbWludXMocG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54IC09IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgLT0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG11bHRpcGx5KGspIHtcblxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ICogaztcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMueSAqIGs7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRGbG9vcmVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKE1hdGguZmxvb3IoIHRoaXMueCksTWF0aC5mbG9vciggdGhpcy55KSk7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UG9zaXRpb25Qb2xhcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvblBvbGFyKFxuICAgICAgICAgICAgICAgIFQuVE1hdGgueHkyZGlzdCh0aGlzLngsIHRoaXMueSksXG4gICAgICAgICAgICAgICAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGlzdGFuY2UocG9zaXRpb24pIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdChwb3NpdGlvbi54IC0gdGhpcy54LCBwb3NpdGlvbi55IC0gdGhpcy55KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJyc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXAgd2l0aCB0aW1lXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uRGF0ZSBleHRlbmRzIFQuUG9zaXRpb24gey8vdG9kbyBpcyB0aGFyZSBzb2x1dGlvbiB3aXRob3V0IHVzaW5nIFQuP1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIGRhdGUgPSAwKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHkgPSB4Lnk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHguZGF0ZTtcbiAgICAgICAgICAgICAgICB4ID0geC54O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGUgLyAxKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gY29uc3RydWN0IFBvc2l0aW9uRGF0ZSBpcyBuZWVkZWQgdmFsaWQgRGF0ZSBub3QgJyArIGRhdGUgKyAnLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBvbmx5IHBvc2l0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICddIGF0ICcgK1xuICAgICAgICAgICAgICAgICh0aGlzLmRhdGUuZ2V0RGF5KCkgKyAxKSArICcuJyArICh0aGlzLmRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy4nICsgdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCkgK1xuICAgICAgICAgICAgICAgICcgJyArIHRoaXMuZGF0ZS5nZXRIb3VycygpICsgJzonICsgdGhpcy5kYXRlLmdldE1pbnV0ZXMoKSArICc6JyArIHRoaXMuZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIlxubW9kdWxlIFQge1xuICAgIGV4cG9ydCBjbGFzcyBBcmVhIHtcblxuICAgICAgICBwdWJsaWMgcG9zaXRpb25zO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlLGlhLGliLHNpZGVjb2xsaXNpb24sY29sbGlzaW9uO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbGxpc2lvbj09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlY29sbGlzaW9uPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKnIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICApOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghc2lkZWNvbGxpc2lvbilyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIFQuQXJyYXlGdW5jdGlvbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZnVuY3Rpb25zIHRvIG1hbmlwdWxhdGUgd2l0aCBhcnJheS5cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQXJyYXlGdW5jdGlvbnMge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBLZXkgb2Ygb2JqZWN0IHdpdGggdGhpcyBJRCwgLTEgaWYgbm90IGV4aXN0XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWQyaShhcnJheTogQXJyYXksIGlkOnN0cmluZyk6YW55IHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JfbWVzc2FnZSB3aGVuIGl0ZW4gbm90IGV4aXN0c1xuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBPYmplY3Qgd2l0aCB0aGlzIElELCBudWxsIGlmIG5vdCBleGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkMml0ZW0oYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nLCBlcnJvcl9tZXNzYWdlID0gJycpOmFueSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogRGVsZXRlIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWRSZW1vdmUoYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nKTpib29sZWFuIHsvL3RvZG8gcmVmYWN0b3IgdXNlIHRoaXMgbm90IHNwbGljZVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbD1hcnJheS5sZW5ndGg7aTxsO2krKykge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggMkQgYXJyYXlcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpdGVyYXRlMkQoYXJyYXk6IEFycmF5LCBjYWxsYmFjazogRnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgICAgICAvL3IoYXJyYXkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgeUxlbiA9IGFycmF5Lmxlbmd0aDsgeSA8IHlMZW47IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4TGVuID0gYXJyYXlbeV0ubGVuZ3RoOyB4IDwgeExlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeSwgeCk7XG4gICAgICAgICAgICAgICAgICAgIC8qdG9kbyByZWZhY3RvciB0byB4LHkqL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIGZyb21cbiAgICAgICAgICogQHBhcmFtIHRvXG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBSZW1vdmVkIGl0ZW1zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcmVtb3ZlSXRlbXMoYXJyYXk6QXJyYXksIGZyb206bnVtYmVyLCB0bzpudW1iZXIpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKiogdG9kbyBzaG91bGQgaXQgYmUgdW5kZXIgVC5BcnJheUZ1bmN0aW9uc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JlY3RcbiAgICAgICAgICogQHBhcmFtIHthcnJheX0gcGF0aFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGZpbHRlclBhdGgob2JqZWN0OiBPYmplY3QsIHBhdGg6IEFycmF5PHN0cmluZz4sIHNldFZhbHVlOiBhbnkpOmFueSB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aF9pIGluIHBhdGgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBvYmplY3Rfa2V5ID0gcGF0aFtwYXRoX2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhdGhfaSA8IHBhdGgubGVuZ3RoIC0gMSB8fCB0eXBlb2Ygc2V0VmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtvYmplY3Rfa2V5XSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rocm93IG5ldyBFcnJvcignZmlsdGVyUGF0aDogS2V5IFxcJycrb2JqZWN0X2tleSsnXFwnIGluIHBhdGggaW4gb2JqZWN0IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W29iamVjdF9rZXldO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3Rbb2JqZWN0X2tleV0gPSBzZXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBBcnJheSBjb250YWluaW5nIG9ubHkgdW5pcXVlIHZhbHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHVuaXF1ZShhcnJheTogQXJyYXkpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciBuID0ge30sIHIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIG5bYXJyYXlbaV1dID0gYXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgaHRtbCB0YWJsZSBmcm9tIEpTIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsX2NsYXNzXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhcnJheTJ0YWJsZShhcnJheTpBcnJheSwgYWRkaXRpb25hbF9jbGFzcyA9ICcnKTpzdHJpbmcge1xuICAgICAgICAgICAgLy90b2RvIGNoZWNrXG5cbiAgICAgICAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgICAgICAgIHZhciByb3dzID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbHNfdGFibGUgPSBhcnJheVswXS5sZW5ndGg7Ly90b2RvIGlzIGlzIGJlc3Qgc29sdXRpb24/XG5cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRhYmxlIGNsYXNzPVwiJyArIGFkZGl0aW9uYWxfY2xhc3MgKyAnXCI+JztcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG5cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbHMgPSBhcnJheVtyb3ddLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgY29sc19zcGFuID0gY29sc190YWJsZSAtIGNvbHM7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBjb2xzOyBjb2wrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gY29scyAtIDEgJiYgY29sc19zcGFuICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjb2xzcGFuPVwiJyArIChjb2xzX3NwYW4gKyAxKSArICdcIj4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYXJyYXlbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RkPic7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgICAgIHJldHVybiAoaHRtbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGV4dHJhY3Qga2V5cyBmcm9tIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldEtleXMob2JqZWN0Ok9iamVjdCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvYmplY3QpIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEdhbWUgY29uZGl0aW9uc1xuICovXG5ULkdhbWUgPSBjbGFzc3tcbiAgICBcbiAgICBcbiAgICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXhfbGlmZV9tb2RpZmllclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByaWNlX2tleV9tb2RpZmllclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1heF9saWZlX21vZGlmaWVyLHByaWNlX2tleV9tb2RpZmllcil7XG4gICAgXG4gICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXMgPSB7fTtcbiAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzID0ge307XG4gICAgICAgIHRoaXMubWF4X2xpZmVfbW9kaWZpZXIgPSBtYXhfbGlmZV9tb2RpZmllcjtcbiAgICAgICAgdGhpcy5wcmljZV9rZXlfbW9kaWZpZXIgPSBwcmljZV9rZXlfbW9kaWZpZXI7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBudW1iZXJzXG4gICAgICovXG4gICAgZ2V0T2JqZWN0UHJpY2VCYXNlcyhvYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9W107XG4gICAgXG4gICAgXG4gICAgICAgIGlmKHR5cGVvZiBvYmplY3QuYWN0aW9ucy5sZW5ndGg9PT0wKXtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW4gb2JqZWN0ICcrb2JqZWN0KycgdGhlcmUgYXJlIG5vIGFjdGlvbnMhJyk7Ly90b2RvIGFsbCBvYmplY3RzIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gc3RyaW5nIGxpa2UgdGhpc1xuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oYWN0aW9uKXtcbiAgICBcblxuICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBNYXRoLmNlaWwoYWN0aW9uLmNvdW50UHJpY2VCYXNlKCkpOy8vXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBOYU4gIHZhbHVlXG4gICAgICAgICAgICBpZihpc05hTihwcmljZV9iYXNlKSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJhbXMgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb24udHlwZSsnIG1ha2VzIHByaWNlIGJlc2UgTmFOLicpO1xuICAgICAgICAgICAgICAgIHByaWNlX2Jhc2U9MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgbm9uIG5lZ2F0aXZlIHZhbHVlXG4gICAgICAgICAgICBpZihwcmljZV9iYXNlPDApe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1zIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uLnR5cGUrJyBzaG91bGQgbm90IG1ha2UgdGhpcyBhY3Rpb24gbmVnYXRpdmUnKTsvL3RvZG8gbWF5YmUgb25seSB3YXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICBwcmljZV9iYXNlcy5wdXNoKHByaWNlX2Jhc2UpO1xuXG4gICAgXG4gICAgXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2VfYmFzZXMpO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IG1heGltdW0gbGlmZSBvZiBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRPYmplY3RNYXhMaWZlKG9iamVjdCl7XG4gICAgXG4gICAgICAgIHZhciBwcmljZV9iYXNlcz10aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBwcmljZV9iYXNlcy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KSB7IHJldHVybiBwdiArIGN2OyB9LCAwKTtcbiAgICBcbiAgICBcbiAgICAgICAgcHJpY2VfYmFzZT10aGlzLm1heF9saWZlX21vZGlmaWVyKHByaWNlX2Jhc2UpO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2VfYmFzZSk7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE9iamVjdFxuICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBSZXNvdXJjZXNcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZXMob2JqZWN0KXtcblxuXG4gICAgICAgIHZhciBwcmljZV9iYXNlcz10aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICBcbiAgICBcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIHByaWNlcz1bXTtcblxuICAgIFxuICAgICAgICB2YXIgZGVzaWduX3Jlc291cmNlcyA9IG9iamVjdC5nZXRNb2RlbCgpLmFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKTtcblxuXG4gICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oYWN0aW9uLGkpe1xuICAgIFxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzX2xpc3QgPVxuICAgICAgICAgICAgYWN0aW9uLmdldFByaWNlUmVzb3VyY2VzKCkuc29ydChmdW5jdGlvbihhLGIpey8vdG9kbyBpcyBpdCBzYWZlP1xuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBkZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYS5jbG9uZSgpLnNpZ251bSgpKS1kZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYi5jbG9uZSgpLnNpZ251bSgpKTtcbiAgICBcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgIFxuICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlcyA9IHByaWNlX3Jlc291cmNlc19saXN0WzBdLmNsb25lKCk7XG4gICAgXG4gICAgXG4gICAgICAgICAgICBwcmljZV9yZXNvdXJjZXMubXVsdGlwbHkocHJpY2VfYmFzZXNbaV0pO1xuICAgICAgICAgICAgcHJpY2VzLnB1c2gocHJpY2VfcmVzb3VyY2VzKTtcbiAgICBcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHJldHVybihwcmljZXMpO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFJlc291cmNlcyAtIHByaWNlIG9mIG9iamVjdFxuICAgICAqL1xuICAgIGdldE9iamVjdFByaWNlKG9iamVjdCl7XG4gICAgXG4gICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG4gICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2VtcHR5IHByaWNlJyxwcmljZSk7XG4gICAgXG4gICAgICAgIHZhciBwcmljZXM9dGhpcy5nZXRPYmplY3RQcmljZXMob2JqZWN0KTtcbiAgICBcbiAgICAgICAgcHJpY2VzLmZvckVhY2goZnVuY3Rpb24ocHJpY2VfKXtcbiAgICBcbiAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcHJpY2UuYXBwbHkodGhpcy5wcmljZV9rZXlfbW9kaWZpZXIpO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2UpO1xuICAgIFxuICAgIH1cblxuXG5cbiAgICBpbnN0YWxsQWN0aW9uQ2xhc3MoYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtcyxhY3Rpb25fY2xhc3Mpe1xuXG4gICAgICAgIHZhciB0eXBlID0gYWN0aW9uX2NsYXNzLmdldFR5cGUoKTtcblxuICAgICAgICBpZih0eXBlb2YgdHlwZSE9PSdzdHJpbmcnKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgaW5zdGFsbGluZyBhY3Rpb24gY2xhc3MgaW50byBnYW1lIGluc3RhbmNlOiBhY3Rpb24gY2xhc3MgaGFzIG5vIHR5cGUhJyk7XG4gICAgICAgIH1lbHNlXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmFjdGlvbl9jbGFzc2VzW3R5cGVdICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGluc3RhbGxpbmcgYWN0aW9uIGNsYXNzIGludG8gZ2FtZSBpbnN0YW5jZTogdGhlcmUgaXMgYWxyZWFkeSBpbnN0YWxsZWQgYWN0aW9uIHdpdGggdHlwZSAnK3R5cGUpO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIHZhciBhY3Rpb25fZW1wdHlfaW5zdGFuY2UgPSBuZXcgYWN0aW9uX2NsYXNzKHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBwYXJhbXM6IGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXNcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvL0FkZGluZyBtZXRob2QgY2xvbmUgdG8gaW5zdGFsbGVkIGFjdGlvbiBjbGFzc1xuICAgICAgICBhY3Rpb25fY2xhc3MucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybihuZXcgYWN0aW9uX2NsYXNzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH07XG5cblxuICAgICAgICBcbiAgICAgICAgdGhpcy5hY3Rpb25fY2xhc3Nlc1t0eXBlXSA9IGFjdGlvbl9jbGFzcztcbiAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW3R5cGVdID0gYWN0aW9uX2VtcHR5X2luc3RhbmNlO1xuICAgIFxuICAgIFxuICAgIFxuICAgIH1cblxuXG5cbiAgICBnZXRBY3Rpb25DbGFzcyhhY3Rpb25fdHlwZSl7XG5cbiAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX3R5cGVdO1xuXG4gICAgICAgIGlmKHR5cGVvZiBhY3Rpb25fY2xhc3M9PSd1bmRlZmluZWQnKXtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJythY3Rpb25fdHlwZSsnLiBUaGVyZSBhcmUgb25seSB0aGVzZSBhY3Rpb24gdHlwZXM6ICcrIFQuQXJyYXlGdW5jdGlvbnMuZ2V0S2V5cyh0aGlzLmFjdGlvbl9jbGFzc2VzKS5qb2luKCcsICcpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKGFjdGlvbl9jbGFzcyk7XG5cbiAgICB9XG5cblxuICAgIG5ld0FjdGlvbkluc3RhbmNlKGFjdGlvbil7XG5cbiAgICAgICAgLy90b2RvIHNvbHZlIGRlZmVuc2UgdnMuIGRlZmVuY2VcbiAgICAgICAgaWYoYWN0aW9uLnR5cGU9PT0nZGVmZW5zZScpe1xuICAgICAgICAgICAgYWN0aW9uLnR5cGU9J2RlZmVuY2UnO1xuICAgICAgICAgICAgYWN0aW9uLnBhcmFtcy5kZWZlbmNlPWFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgIGRlbGV0ZSBhY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb24udHlwZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBhY3Rpb25fY2xhc3MoYWN0aW9uKTtcbiAgICB9XG5cblxuXG5cbiAgICBjcmVhdGVBY3Rpb25FeGVjdXRlKGFjdGlvbl90eXBlKXtcblxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGUpO1xuXG5cbiAgICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAoLi4uYXJncyl7XG5cbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChnYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbl9jbGFzcy5leGVjdXRlLmFwcGx5KHRoaXMsYXJncyk7XG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIHJldHVybihleGVjdXRlKTtcbiAgICB9XG5cblxuXG4gICAgZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZShhY3Rpb25fdHlwZSl7XG5cbiAgICAgICAgdmFyIGFjdGlvbl9pbnN0YW5jZSA9IHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1thY3Rpb25fdHlwZV07XG5cbiAgICAgICAgaWYodHlwZW9mIGFjdGlvbl9pbnN0YW5jZT09PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcrYWN0aW9uX3R5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKGFjdGlvbl9pbnN0YW5jZSk7XG5cblxuICAgIH1cblxuXG5cbiAgICAvKmdldEFjdGlvbkV4ZWN1dGUoYWN0aW9uX2tleSl7XG5cbiAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX2tleV07XG5cbiAgICAgICAgaWYodHlwZW9mIGFjdGlvbj09J3VuZGVmaW5lZCcpdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFjdGlvbiB0eXBlICcrYWN0aW9uX2tleSsnLicpO1xuXG4gICAgICAgIHZhciBnYW1lID0gdGhpcztcblxuXG5cbiAgICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtnYW1lXS5wdXNoLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZXhlY3V0ZV9jYWxsYmFjay5hcHBseSh0aGlzLGFyZ3MpO1xuXG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIHJldHVybihleGVjdXRlKTtcbiAgICB9Ki9cbiAgICBcbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULkdhbWUuQWN0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblQuR2FtZS5BY3Rpb24gPSBjbGFzc3tcblxuXG5cbiAgICBjb25zdHJ1Y3RvcihhY3Rpb24pe1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlID09PSAndW5kZWZpbmVkJyl0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IGV4dGVuZCBULkdhbWUuQWN0aW9uIGFuZCBhZGQgbWV0aG9kIGdldFR5cGUgYmVmb3JlIGNyZWF0aW5nIGluc3RhbmNlcyEnKTtcblxuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSgpO1xuXG4gICAgICAgIGlmKGFjdGlvbi50eXBlIT09dHlwZSl0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgJyt0eXBlKycgbm90ICcrYWN0aW9uLnR5cGUrJyBjbGFzcyEnKTtcblxuICAgICAgICBmb3IodmFyIGtleSBpbiBhY3Rpb24pe1xuICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSBhY3Rpb25ba2V5XTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBwYXJhbXNcblxuICAgICAgICAvKmZvcih2YXIgcGFyYW0gaW4gYWN0aW9uQWJpbGl0eS5wYXJhbXMpe1xuICAgICAgICAgICAgdmFyIHBhcmFtX3R5cGUgPSBhY3Rpb24uYWJpbGl0eV9wYXJhbXNbcGFyYW1dO1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgYWN0aW9uQWJpbGl0eS5wYXJhbXNbcGFyYW1dIT09cGFyYW1fdHlwZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbSAnK3BhcmFtKycgc2hvdWxkIGJlICcrcGFyYW1fdHlwZSsnIGluc3RlYWQgb2YgJyt0eXBlb2YoYWN0aW9uQWJpbGl0eS5hYmlsaXR5X3BhcmFtc1twYXJhbV0pKycgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb25BYmlsaXR5LnR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0qL1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgIH1cblxuXG4gICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgcmV0dXJuKDApO1xuICAgIH1cblxuXG4gICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcbiAgICAgICAgcmV0dXJuKFtdKTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGV4ZWN1dGUoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBleGVjdXRlIHBhc3NpdmUgYWN0aW9uLicpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gaG93IG1hbnkgc2Vjb25kcyBjYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQ/XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjYW5CZUV4ZWN1dGVkSW4oKXtcblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wYXJhbXMuY29vbGRvd249PT0nbnVtYmVyJyl7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmxhc3RfdXNlPT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHMgPSBNYXRoLmFicyh0aGlzLmxhc3RfdXNlIC0gbmV3IERhdGUoKSkvMTAwMDtcblxuICAgICAgICAgICAgaWYodGhpcy5wYXJhbXMuY29vbGRvd248PXMpe1xuICAgICAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybih0aGlzLnBhcmFtcy5jb29sZG93bi1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcmV0dXJuKDApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZCBub3c/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuQmVFeGVjdXRlZE5vdygpe1xuICAgICAgICByZXR1cm4odGhpcy5jYW5CZUV4ZWN1dGVkSW4oKT09PTApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IGFjdHVhbCBkYXRlIGFzIGRhdGUgb2YgZXhlY3V0aW9uIHRoaXMgYWN0aW9uIGluc3RhbmNlXG4gICAgICovXG4gICAgbm93RXhlY3V0ZWQoKXtcbiAgICAgICAgdGhpcy5sYXN0X3VzZT1uZXcgRGF0ZSgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGh0bWwgcHJvZmlsZSBvZiBhY3Rpb24gYWJpbGl0eVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY3JlYXRlSHRtbFByb2ZpbGUoKXtcblxuICAgICAgICB2YXIgaHRtbD0nPHRhYmxlIGNsYXNzPVwiYWN0aW9uLWFiaWxpdHktcHJvZmlsZVwiPic7XG5cbiAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiMlwiPmArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywnYWN0aW9uJyx0aGlzLnR5cGUpK2A8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG5cblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5sYXN0X3VzZSE9PSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGh0bWwrPWBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCsgVC5Mb2NhbGUuZ2V0KCdvYmplY3QnLCdhY3Rpb24nLCdsYXN0X3VzZWQnKStgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCt0aGlzLmxhc3RfdXNlK2A8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvcih2YXIgcGFyYW0gaW4gdGhpcy5wYXJhbXMpe1xuICAgICAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5gKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsJ2FjdGlvbicsdGhpcy50eXBlLHBhcmFtKStgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+YCt0aGlzLnBhcmFtc1twYXJhbV0rYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaHRtbCs9JzwvdGFibGU+JztcblxuICAgICAgICByZXR1cm4oaHRtbCk7XG4gICAgfVxuXG59O1xuXG5cblxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTWFwR2VuZXJhdG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblQuTWFwR2VuZXJhdG9yID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGdldFpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB6X25vcm1hbGl6aW5nX3RhYmxlXG4gICAgICogQHBhcmFtIHtULk1hcEdlbmVyYXRvci5CaW90b3BlfSBiaW90b3BlXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdmlydHVhbE9iamVjdEdlbmVyYXRvclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGdldFosel9ub3JtYWxpemluZ190YWJsZSxiaW90b3BlLHZpcnR1YWxPYmplY3RHZW5lcmF0b3Ipe1xuXG4gICAgICAgIHRoaXMuZ2V0WiA9IGdldFo7XG4gICAgICAgIHRoaXMuel9ub3JtYWxpemluZ190YWJsZSA9IHpfbm9ybWFsaXppbmdfdGFibGU7XG4gICAgICAgIHRoaXMuYmlvdG9wZSA9IGJpb3RvcGU7XG4gICAgICAgIHRoaXMudmlydHVhbE9iamVjdEdlbmVyYXRvciA9IHZpcnR1YWxPYmplY3RHZW5lcmF0b3I7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKXtcblxuICAgICAgICB2YXIgbWFwPVtdO1xuXG4gICAgICAgIGZvcih2YXIgeT0wO3k8PXJhZGl1cyoyO3krKyl7XG5cbiAgICAgICAgICAgIG1hcFt5XT1bXTtcblxuICAgICAgICAgICAgZm9yKHZhciB4PTA7eDw9cmFkaXVzKjI7eCsrKXtcblxuXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHgtcmFkaXVzKzEvMiwyKStcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeS1yYWRpdXMrMS8yLDIpPlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsMilcbiAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5nZXRaKHgtcmFkaXVzK2NlbnRlcl9pbnRlZ2VyLngseS1yYWRpdXMrY2VudGVyX2ludGVnZXIueSk7XG5cblxuICAgICAgICAgICAgICAgIG1hcFt5XVt4XSA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cblxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihtYXApO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hcFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRlcnJhaW5NYXAobWFwKXtcblxuICAgICAgICB2YXIgbWFwX2JnPVtdO1xuXG4gICAgICAgIGZvcih2YXIgeT0wLGw9bWFwLmxlbmd0aDt5PGw7eSsrKXtcbiAgICAgICAgICAgIG1hcF9iZ1t5XT1bXTtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8bDt4Kyspe1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKG1hcFt5XVt4XSk9PT0ndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG1hcF9iZ1t5XVt4XSA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbihtYXBbeV1beF0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4obWFwX2JnKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyl7XG5cblxuICAgICAgICB2YXIgYm91bmRzPTE7XG5cblxuICAgICAgICB2YXIgel9tYXA9dGhpcy5nZXRaTWFwQ2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG5cbiAgICAgICAgdmFyIG1hcD10aGlzLnRlcnJhaW5NYXAoel9tYXApO1xuXG4gICAgICAgIHJldHVybihtYXApO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbWFwX2FycmF5XG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjb252ZXJ0TWFwQXJyYXlUb09iamVjdHMobWFwX2FycmF5LGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyl7XG5cbiAgICAgICAgdmFyIG9iamVjdHM9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWFwX2FycmF5W3ldW3hdKSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4obWFwX2FycmF5W3ldW3hdKTtcblxuXG4gICAgICAgICAgICAgICAgb2JqZWN0Lng9Y2VudGVyX2ludGVnZXIueC1yYWRpdXMreDtcbiAgICAgICAgICAgICAgICBvYmplY3QueT1jZW50ZXJfaW50ZWdlci55LXJhZGl1cyt5O1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ob2JqZWN0cyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlclxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFB1cmVNYXAoY2VudGVyLHJhZGl1cywgbm90X2NlbnRlcj1mYWxzZSl7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjZW50ZXIsbm90X2NlbnRlcik7XG5cbiAgICAgICAgdmFyIGNlbnRlcl9pbnRlZ2VyPXtcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoY2VudGVyLngpLFxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcihjZW50ZXIueSlcbiAgICAgICAgfTtcblxuICAgICAgICBpZihub3RfY2VudGVyKVxuICAgICAgICBub3RfY2VudGVyPXtcbiAgICAgICAgICAgIHg6IG5vdF9jZW50ZXIueC1jZW50ZXJfaW50ZWdlci54LFxuICAgICAgICAgICAgeTogbm90X2NlbnRlci55LWNlbnRlcl9pbnRlZ2VyLnlcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgLyp2YXIgbWFwX2FycmF5ID0gdGhpcy5nZXRNYXBBcnJheUNpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpO1xuICAgICAgICB2YXIgb2JqZWN0cyA9IHRoaXMuY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheSxjZW50ZXJfaW50ZWdlcixyYWRpdXMpOy8qKi9cblxuXG4gICAgICAgIHZhciBvYmplY3RzPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgdmFyIHgseSx6LHQsb2JqZWN0O1xuICAgICAgICBmb3IoeT0wO3k8PXJhZGl1cyoyO3krKyl7XG4gICAgICAgICAgICBmb3IoeD0wO3g8PXJhZGl1cyoyO3grKyl7XG5cblxuICAgICAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh4LXJhZGl1cysxLzIsMikrXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHktcmFkaXVzKzEvMiwyKT5cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocmFkaXVzLDIpXG4gICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZihub3RfY2VudGVyKVxuICAgICAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh4LW5vdF9jZW50ZXIueC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LW5vdF9jZW50ZXIueS1yYWRpdXMrMS8yLDIpPD1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocmFkaXVzLDIpXG4gICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICB6ID0gdGhpcy5nZXRaKHgtcmFkaXVzK2NlbnRlcl9pbnRlZ2VyLngseS1yYWRpdXMrY2VudGVyX2ludGVnZXIueSk7XG4gICAgICAgICAgICAgICAgeiA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKHopO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0KTtcblxuICAgICAgICAgICAgICAgIG9iamVjdD0gbmV3IFQuT2JqZWN0cy5UZXJyYWluKHQpO1xuICAgICAgICAgICAgICAgIG9iamVjdC54PWNlbnRlcl9pbnRlZ2VyLngtcmFkaXVzK3g7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lnk9Y2VudGVyX2ludGVnZXIueS1yYWRpdXMreTtcblxuXG4gICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuKG9iamVjdHMpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5PYmplY3RzLkFycmF5fSBvYmplY3RzXG4gICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKG9iamVjdHMpe1xuXG5cbiAgICAgICAgdmFyIHZpcnR1YWxfb2JqZWN0cyA9IFtdO1xuICAgICAgICB2YXIgb2JqZWN0c18xeDFfcmF3ID0gb2JqZWN0cy5nZXQxeDFUZXJyYWluT2JqZWN0cygpLmdldEFsbCgpO1xuXG5cbiAgICAgICAgZm9yKHZhciBpPTAsbD1vYmplY3RzXzF4MV9yYXcubGVuZ3RoO2k8bDtpKyspe1xuXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxPYmplY3RHZW5lcmF0b3Iob2JqZWN0c18xeDFfcmF3W2ldLHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybih2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgfVxuXG5cblxuXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVBVQkxJQz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0ZXJyYWluIGFuZCB2aXJ0dWFsIG9iamVjdHMgaW50byBPYmplY3RzIEFycmF5XG4gICAgICogQHBhcmFtIHtULk9iamVjdHMuQXJyYXl9IHJlYWxfb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlydHVhbF9vYmplY3RzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyIERvbnQgZ2V0IG9iamVjdHMgbmVhciB0aGlzIGNlbnRlci5cbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fX1cbiAgICAgKi9cbiAgICBnZXRDb21wbGV0ZU9iamVjdHMocmVhbF9vYmplY3RzLGNlbnRlcixyYWRpdXMsbmF0dXJhbF9vYmplY3RzPXRydWUsbm90X2NlbnRlcj1mYWxzZSl7XG5cblxuXG4gICAgICAgIHZhciBjb21wbGV0ZV9vYmplY3RzID0gdGhpcy5nZXRQdXJlTWFwKGNlbnRlciwgcmFkaXVzLCBub3RfY2VudGVyKTtcblxuXG5cbiAgICAgICAgcmVhbF9vYmplY3RzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgIGNvbXBsZXRlX29iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgaWYobmF0dXJhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgdmFyIHZpcnR1YWxfb2JqZWN0cyA9IHRoaXMuZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMoY29tcGxldGVfb2JqZWN0cyk7XG5cbiAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgcmV0dXJuKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgfVxuICAgIFxuXG5cbn07XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULk1hcEdlbmVyYXRvci5CaW90b3BlID0gY2xhc3N7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRlcnJhaW5zXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGVycmFpbnMpe1xuXG4gICAgICAgIHZhciBzdW09MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcbiAgICAgICAgICAgIHN1bSs9dGVycmFpbi5hbW91bnQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIGZyb209MDtcbiAgICAgICAgdGVycmFpbnMuZm9yRWFjaChmdW5jdGlvbih0ZXJyYWluKXtcblxuICAgICAgICAgICAgdGVycmFpbi5mcm9tPWZyb20vc3VtO1xuICAgICAgICAgICAgZnJvbSs9dGVycmFpbi5hbW91bnQ7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXJyYWlucyk7XG4gICAgICAgIHRoaXMudGVycmFpbnMgPSB0ZXJyYWlucztcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gelxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuVGVycmFpbn1cbiAgICAgKi9cbiAgICBnZXRaVGVycmFpbih6KXtcblxuXG4gICAgICAgIGZvcih2YXIgaT10aGlzLnRlcnJhaW5zLmxlbmd0aC0xO2k+PTA7aS0tKXtcblxuICAgICAgICAgICAgaWYoeiA+PSB0aGlzLnRlcnJhaW5zW2ldLmZyb20gKSByZXR1cm4odGhpcy50ZXJyYWluc1tpXS50ZXJyYWluKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG5cbn07XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1vZGVsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Nb2RlbCA9IGNsYXNze1xuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsIGpzb25cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZSBpbiBjYXNlIG9mIGZhaWxcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihqc29uKXtcblxuICAgICAgICBpZih0eXBlb2YoanNvbik9PSd1bmRlZmluZWQnKXJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLm5hbWU9anNvbi5uYW1lO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcz1qc29uLnBhcnRpY2xlcztcbiAgICAgICAgdGhpcy5yb3RhdGlvbj1qc29uLnJvdGF0aW9uO1xuICAgICAgICB0aGlzLnNpemU9anNvbi5zaXplO1xuXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnJvdGF0aW9uKT09J3VuZGVmaW5lZCcpdGhpcy5yb3RhdGlvbj0wO1xuICAgICAgICBpZih0eXBlb2YodGhpcy5zaXplKT09J3VuZGVmaW5lZCcpdGhpcy5zaXplPTE7XG4gICAgfVxuXG5cbiAgICBjbG9uZSAoKXtcbiAgICAgICAgcmV0dXJuKG5ldyBULk1vZGVsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3RhdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICovXG4gICAgYWRkUm90YXRpb25TaXplKHJvdGF0aW9uLHNpemUpe1xuXG4gICAgICAgIGlmKHR5cGVvZiByb3RhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcm90YXRpb249MDtcbiAgICAgICAgaWYodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemU9MTtcblxuICAgICAgICB0aGlzLnJvdGF0aW9uKz1yb3RhdGlvbjtcbiAgICAgICAgdGhpcy5zaXplPXRoaXMuc2l6ZSpzaXplO1xuXG4gICAgfVxuXG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGltZW5zaW9uIHgseSx6LHh5XG4gICAgICogQHJldHVybiB7bnVtYmVyfSByYW5nZVxuICAgICAqL1xuICAgIHJhbmdlKGRpbWVuc2lvbil7XG5cbiAgICAgICAgaWYoZGltZW5zaW9uPT0neHknKXtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdCh0aGlzLnJhbmdlKCd4JyksdGhpcy5yYW5nZSgneScpKnRoaXMuc2l6ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmVhcj10aGlzLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG4gICAgICAgIHZhciBtYXg9ZmFsc2UsbWluPWZhbHNlLG1heF8sbWluXztcbiAgICAgICAgZm9yKHZhciBpIGluIHBhcnRpY2xlc0xpbmVhcil7XG5cblxuICAgICAgICAgICAgbWluXz1wYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXTtcbiAgICAgICAgICAgIG1heF89cGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl0rcGFydGljbGVzTGluZWFyW2ldLnNpemVbZGltZW5zaW9uXTtcblxuICAgICAgICAgICAgLy90b2RvIGZlYXR1cmUgcmV2ZXJzZVxuXG4gICAgICAgICAgICBpZihtYXg9PT1mYWxzZSltYXg9bWF4XztcbiAgICAgICAgICAgIGlmKG1pbj09PWZhbHNlKW1pbj1taW5fO1xuXG5cbiAgICAgICAgICAgIGlmKG1heF8+bWF4KW1heD1tYXhfO1xuICAgICAgICAgICAgaWYobWluXzxtaW4pbWluPW1pbl87XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuKE1hdGguYWJzKG1pbi1tYXgpLyp0aGlzLnNpemUqLyk7Ly90b2RvIHJvdGF0aW9uXG5cblxuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfelxuICAgICAqL1xuICAgIG1vdmVCeShtb3ZlX3gsbW92ZV95LG1vdmVfeil7XG5cbiAgICAgICAgaWYodHlwZW9mIG1vdmVfeCA9PT0gJ3VuZGVmaW5lZCcpbW92ZV94PTA7XG4gICAgICAgIGlmKHR5cGVvZiBtb3ZlX3kgPT09ICd1bmRlZmluZWQnKW1vdmVfeT0wO1xuICAgICAgICBpZih0eXBlb2YgbW92ZV96ID09PSAndW5kZWZpbmVkJyltb3ZlX3o9MDtcblxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xuXG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLngrPW1vdmVfeDtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkrPW1vdmVfeTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnorPW1vdmVfejtcblxuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJuIFogb2Ygam9pbmluZyBtb2RlbFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICovXG4gICAgam9pbk1vZGVsWihtb2RlbCxtb3ZlX3gsbW92ZV95KXsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgIC8vdmFyICBtb2RlbF89ZGVlcENvcHlNb2RlbChtb2RlbCk7XG4gICAgICAgIC8vbW9kZWxfLm1vdmVCeShtb3ZlX3gsbW92ZV95KTsvL3RvZG8gbWF5YmUgZGVsZXRlIG1vdmVCeVxuXG4gICAgICAgIC8vdmFyIG1heF96PXRoaXMucmFuZ2UoJ3onKTtcblxuXG4gICAgICAgIHZhciB0aGlzX2xpbmVhcl9wYXJ0aWNsZXM9dGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcbiAgICAgICAgdmFyIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXM9bW9kZWwuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICB2YXIgZGlzdGFuY2VzPVswXTtcbiAgICAgICAgZm9yKHZhciBpIGluIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXMpe1xuXG4gICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLngrPW1vdmVfeDtcbiAgICAgICAgICAgIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSs9bW92ZV95O1xuXG4gICAgICAgICAgICBmb3IodmFyIGlpIGluIHRoaXNfbGluZWFyX3BhcnRpY2xlcyl7Ly90b2RvIG1heWJlIG9wdGltaXplIGJ5IHByZS1zb3J0aW5nXG5cblxuICAgICAgICAgICAgICAgIGlmKFBhcnRpY2xlcy5jb2xsaXNpb24yRCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pKXtcblxuICAgICAgICAgICAgICAgICAgICByKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXMucHVzaCh0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLnBvc2l0aW9uLnordGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5zaXplLnopO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF4X3o9TWF0aC5tYXguYXBwbHkoTWF0aCxkaXN0YW5jZXMpO1xuXG4gICAgICAgIHJldHVybiBtYXhfejtcblxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBKb2luIG1vZGVscyB0b2dldGhlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBNb2RlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICovXG4gICAgam9pbk1vZGVsKG1vZGVsLG1vdmVfeCxtb3ZlX3kpey8vdG9kbyBzZWNvbmQgcGFyYW0gc2hvdWxkIGJlIHBvc2l0aW9uXG5cbiAgICAgICAgdmFyIG1heF96PXRoaXMuam9pbk1vZGVsWihtb2RlbCxtb3ZlX3gsbW92ZV95KTtcblxuXG4gICAgICAgIHRoaXMucGFydGljbGVzPVtcbiAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpLFxuICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbCkpXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbMV0ucG9zaXRpb249e1xuICAgICAgICAgICAgeDptb3ZlX3gsXG4gICAgICAgICAgICB5Om1vdmVfeSxcbiAgICAgICAgICAgIHo6bWF4X3pcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJvdGF0aW9uPTA7XG4gICAgICAgIHRoaXMuc2l6ZT0xO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogRGVlcCBjb3B5IHRoaXMgYW5kIGNvbnZlcnRzIGxpbmtzIHRvIHJhdyBkYXRhXG4gICAgICogQHJldHVybnMge29iamVjdH0gTW9kZWxcbiAgICAgKi9cbiAgICBnZXREZWVwQ29weVdpdGhvdXRMaW5rcygpIHtcblxuXG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuY2xvbmUoKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvbnZlcnQgbGlua3MgdG8gcmF3IGRhdGFcblxuXG4gICAgICAgIHZhciBmaW5kUGFydGljbGVCeU5hbWUgPSBmdW5jdGlvbihwYXJ0aWNsZXMsIG5hbWUpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJ0aWNsZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFydGljbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmluZGVkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5kZWRfcGFydGljbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZpbmRlZF9wYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgIH07XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGlua3MgPSBmdW5jdGlvbihwYXJ0aWNsZXMpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuXG4gICAgICAgICAgICAvL3IocGFydGljbGVzKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXMpIHtcblxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5MaW5rXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ubGluaykhPSd1bmRlZmluZWQnKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua2VkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKG1vZGVsLnBhcnRpY2xlcywgcGFydGljbGVzW2ldLmxpbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRfcGFydGljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluayAnICsgcGFydGljbGUubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmtlZF9wYXJ0aWNsZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnJvdGF0aW9uKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlc1tpXS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5zaXplKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5zaXplID0gcGFydGljbGVzW2ldLnNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucG9zaXRpb24pIT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnBvc2l0aW9uID0gcGFydGljbGVzW2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbyBza2V3XG5cblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNbaV0gPSBsaW5rZWRfcGFydGljbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+R3JvdXBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmtzKHBhcnRpY2xlc1tpXS5wYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBwYXJ0aWNsZXNMaW5rcyhtb2RlbC5wYXJ0aWNsZXMpO1xuXG4gICAgICAgIHJldHVybihtb2RlbCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgMUQgYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplXG4gICAgICogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgKi9cbiAgICBnZXRMaW5lYXJQYXJ0aWNsZXMoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZT1mYWxzZSl7XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyPVtdO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBwYXJ0aWNsZXMgdG8gMUQgcGFydGljbGVzXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlczJMaW5lYXIgPSBmdW5jdGlvbihwYXJ0aWNsZXMscG9zaXRpb24scm90YXRpb24sc2l6ZSl7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcG9zaXRpb249ZmFsc2U7XG4gICAgICAgICAgICBpZih0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uPTA7XG4gICAgICAgICAgICBpZih0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZT0xO1xuXG5cbiAgICAgICAgICAgIGlmKHBvc2l0aW9uPT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtcbiAgICAgICAgICAgICAgICAgICAgeDowLFxuICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgIHo6MFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlKXtcblxuICAgICAgICAgICAgICAgIC8vcGFydGljbGU9ZGVlcENvcHkocGFydGljbGUpO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+RGVmYXVsdCBwYXJhbXMgb2YgcGFydGljbGUsIGdyb3VwIG9yIGxpbmtcbiAgICAgICAgICAgICAgICBpZighcGFydGljbGUucG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbj17XG4gICAgICAgICAgICAgICAgICAgICAgICB4OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6OjBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnJvdGF0aW9uKT09J3VuZGVmaW5lZCcpcGFydGljbGUucm90YXRpb249MDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUuc2l6ZSk9PSd1bmRlZmluZWQnKXBhcnRpY2xlLnNpemU9MTtcbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Qb3NpdGlvbiwgUm90YXRpb24gYW5kIHNpemUgLy90b2RvIHNrZXdcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0RGVnID0gVC5UTWF0aC54eTJkaXN0RGVnKHBhcnRpY2xlLnBvc2l0aW9uLngsIHBhcnRpY2xlLnBvc2l0aW9uLnkpO1xuXG4gICAgICAgICAgICAgICAgZGlzdERlZy5kaXN0ID0gZGlzdERlZy5kaXN0ICogc2l6ZTtcbiAgICAgICAgICAgICAgICBkaXN0RGVnLmRlZyArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgIHZhciB4eSA9IFQuVE1hdGguZGlzdERlZzJ4eShkaXN0RGVnLmRpc3QsIGRpc3REZWcuZGVnKTtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHh5Lng7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHh5Lnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9IHBhcnRpY2xlLnBvc2l0aW9uLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCArPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ICs9IHBvc2l0aW9uLno7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGFydGljbGUuc2l6ZSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUgPSBwYXJ0aWNsZS5zaXplICogc2l6ZTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueCA9IHBhcnRpY2xlLnNpemUueCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueSA9IHBhcnRpY2xlLnNpemUueSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueiA9IHBhcnRpY2xlLnNpemUueiAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QYXJ0aWNsZVxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihwYXJ0aWNsZS5wYXJ0aWNsZXMpIT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihwYXJ0aWNsZS5wYXJ0aWNsZXMscGFydGljbGUucG9zaXRpb24scGFydGljbGUucm90YXRpb24scGFydGljbGUuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR3JvdXBcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUuc2hhcGUpIT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGluZWFyLnB1c2gocGFydGljbGUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vZGVsPXRoaXMuZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKTtcblxuICAgICAgICBpZihpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplKXtcblxuICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsZmFsc2UsMCwxKTtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsZmFsc2UsbW9kZWwucm90YXRpb24sbW9kZWwuc2l6ZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIHN0cmljdCBtb2RlLy9kZWxldGUgbW9kZWw7XG5cbiAgICAgICAgcmV0dXJuKHBhcnRpY2xlc0xpbmVhcik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgKi9cbiAgICBmaWx0ZXJQYXRoKHBhdGgpe1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzO1xuXG4gICAgICAgIGlmKHR5cGVvZihwYXRoLmZvckVhY2gpPT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLnBhcnRpY2xlc1tpXTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAqL1xuICAgIGZpbHRlclBhdGhTaWJsaW5ncyhwYXRoKXtcblxuICAgICAgICB2YXIgbW9kZWw9dGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuICAgICAgICB2YXIgY3VycmVudD1tb2RlbDtcblxuICAgICAgICBpZih0eXBlb2YocGF0aC5mb3JFYWNoKT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlX2kscGF0aF9paSl7XG5cbiAgICAgICAgICAgIC8qaWYocGF0aF9paTxwYXRoLmxlbmd0aC0xKXtcblxuICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgIH1lbHNleyovXG5cbiAgICAgICAgICAgIHZhciBtZSA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICBjdXJyZW50LnBhcnRpY2xlcyA9IFttZV07XG5cbiAgICAgICAgICAgIGN1cnJlbnQ9bWU7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybihtb2RlbCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFnZ3JlZ2F0ZSB2b2x1bWUgb2YgZWFjaCByZXNvdXJjZSB1c2VkIGluIG1vZGVsXG4gICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAqL1xuICAgIGFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKXtcblxuXG4gICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG5cblxuICAgICAgICB2YXIgbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICBsaW5lYXJfcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24obGluZWFyX3BhcnRpY2xlKXtcblxuICAgICAgICAgICAgdmFyIHZvbHVtZT0vL3RvZG8gYWxsIHNoYXBlc1xuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnggKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnkgKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciBtYXRlcmlhbD1saW5lYXJfcGFydGljbGUubWF0ZXJpYWwuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIG1hdGVyaWFsPW1hdGVyaWFsWzBdO1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfPXt9O1xuICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXT12b2x1bWU7XG5cbiAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coJ3ByaWNlIG9mJyk7XG4gICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgY29uc29sZS5sb2cocHJpY2UpOyovXG5cbiAgICAgICAgLy9wcmljZS5tdWx0aXBseSgwLjAxKTtcblxuICAgICAgICByZXR1cm4ocHJpY2UpO1xuXG5cbiAgICB9XG5cblxuXG5cbiAgICBnZXRIYXNoKCl7XG4gICAgICAgIHJldHVybiAneHh4JytKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICB9XG5cblxuICAgIFxuICAgIFxuXG59O1xuXG4iLCIvKipcbiAqIEBhdXRob3IgVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5Nb2RlbC5QYXJ0aWNsZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuLyoqXG4gKiBNb2RlbCBQYXJ0aWNsZXNcbiAqL1xuVC5Nb2RlbC5QYXJ0aWNsZXMgPSBjbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKSB7Ly90b2RvID8/IG1heWJlIHJlbmFtZVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldy56ID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS50b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS50b3AgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUucm90YXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHBhcnRpY2xlKTtcblxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICBzdGF0aWMgZ2V0VHJpYW5nbGVzKHBhcnRpY2xlLHBvaW50X2NsYXNzKXtcblxuICAgICAgICB2YXIgdHJpYW5nbGVzID1bXTtcblxuICAgICAgICBwYXJ0aWNsZT10aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeF8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpOy8vK3lfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueSksXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5UTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgIERpc3REZWdfLmRlZyArPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHh5XyA9IFQuVE1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgcG9pbnRfY2xhc3MoeF9fLHlfXyx6X18pKTtcblxuICAgICAgICAgICAgICAgICAgICAvL3Jlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvKmlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cblxuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBHZXQgM0QgbW9kZWwgZnJvbSBwYXJ0aWNsZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIEBwYXJhbSBwYXJ0aWNsZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gM0QgbW9kZWxcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0M0QocGFydGljbGUpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSB7fTtcblxuICAgICAgICBwYXJ0aWNsZT10aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cblxuICAgICAgICAgICAgLy9yKHhfLHlfKTtcbiAgICAgICAgICAgIC8vcihwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAvKiovXG4gICAgICAgICAgICByZXNvdXJjZS5wb2ludHMgPSBbXTtcbiAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zID0gW1tdLCBbXV07XG4gICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEID0gW1tdLCBbXV07XG4gICAgICAgICAgICB2YXIgYmFzZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgbGV2ZWwgPSAwOyBsZXZlbCA8IDI7IGxldmVsKyspIHtcblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UgPSBwYXJ0aWNsZS5zaGFwZS5ib3R0b207XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUudG9wO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgdmFyIHhfXywgeV9fLCB6X187XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tWFlaIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKTsvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBEaXN0RGVnXyA9IFQuVE1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULlRNYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvaW50cy5wdXNoKFt4ICsgeF9fLCB5ICsgeV9fLCB6ICsgel9fXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKi9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCAyRCBsaW5lcyBmcm9tIHBhcnRpY2xlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIDA9Ym90dG9tLCAxPXRvcFxuICAgICAqIEByZXR1cm4ge0FycmF5fSAyRCBsaW5lc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQyRGxpbmVzKHBhcnRpY2xlLCBiYXNlKSB7XG5cblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSB0aGlzLmdldDNEKHBhcnRpY2xlKTtcblxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcblxuICAgICAgICB2YXIgcG9seWdvbnMyRCA9IFtyZXNvdXJjZS5wb2x5Z29uczJEW2Jhc2VdXTtcblxuICAgICAgICBmb3IgKHZhciBwbiBpbiBwb2x5Z29uczJEKSB7XG5cbiAgICAgICAgICAgIC8qbGluZXNbcG5dPVtdO1xuXG4gICAgICAgICAgICAgZm9yKHZhciBwdCBpbiByZXNvdXJjZS5wb2x5Z29uc1twbl0pIHtcblxuICAgICAgICAgICAgIHZhciBwb2ludCA9IHJlc291cmNlLnBvaW50c1tyZXNvdXJjZS5wb2x5Z29uc1twbl1bcHRdIC0gMV07XG4gICAgICAgICAgICAgbGluZXNbcG5dW3BzXSA9IFtwb2ludFswXSwgcG9pbnRbMV1dO1xuXG4gICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIHZhciBwb2ludDEsIHBvaW50MjtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IC0xLCBsID0gcG9seWdvbnMyRFtwbl0ubGVuZ3RoOyBpIDwgbCAtIDE7IGkrKykge1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSBpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGwgLSAxO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcG9pbnQyID0gaSArIDE7XG5cblxuICAgICAgICAgICAgICAgIC8vcihyZXNvdXJjZS5wb2x5Z29uc1twbl0scG9pbnQxKTtcblxuICAgICAgICAgICAgICAgIHBvaW50MSA9IHJlc291cmNlLnBvaW50c1twb2x5Z29uczJEW3BuXVtwb2ludDFdIC0gMV07XG4gICAgICAgICAgICAgICAgcG9pbnQyID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50Ml0gLSAxXTtcblxuXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDFbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50MlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MlsxXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApO1xuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3IobGluZXMpO1xuXG4gICAgICAgIHJldHVybiAobGluZXMpO1xuXG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8vdG9kbyBtYXliZSByZWZhY3RvciBtb3ZlIHRvIE1hdGhcbiAgICAvKipcbiAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiAyRCBsaW5lc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBsaW5lczFcbiAgICAgKiBAcGFyYW0gKGFycmF5KSBsaW5lczJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBjb2xsaXNpb25MaW5lc0RldGVjdChsaW5lczEsIGxpbmVzMikge1xuXG4gICAgICAgIGZvciAodmFyIGkxIGluIGxpbmVzMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaTIgaW4gbGluZXMyKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVsxXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVsxXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVsxXS55XG4gICAgICAgICAgICAgICAgICAgICkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL3IoJ2NvbGxpc2lvbjJEIGlzIHRydWUnLCBwYXJ0aWNsZTEsIHBhcnRpY2xlMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIDIgcGFydGljbGVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZTEgYm90dG9tXG4gICAgICogQHBhcmFtIChvYmplY3QpIHBhcnRpY2xlMiB0b3BcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBjb2xsaXNpb24yRChwYXJ0aWNsZTEsIHBhcnRpY2xlMikge1xuXG5cbiAgICAgICAgdmFyIGxpbmVzMSA9IFBhcnRpY2xlcy5nZXQyRGxpbmVzKHBhcnRpY2xlMSwgMSk7XG4gICAgICAgIHZhciBsaW5lczIgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTIsIDApO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvcm5lciBjb2xsaXNpb25cblxuXG4gICAgICAgIHZhciBjb2xsaXNpb24gPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QobGluZXMxLCBsaW5lczIpO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUlubmVyIGNvbnZleCBjb2xsaXNpb25cblxuICAgICAgICAvKiovXG4gICAgICAgIGlmICghY29sbGlzaW9uKSB7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGsgPSAxMDA7XG5cbiAgICAgICAgICAgICAgICB2YXIgb3V0ZXIsIGlubmVyO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDI7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lciA9IC8qZGVlcENvcHkqLyhsaW5lczFbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMyWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcl92ZWN0b3JfeCA9IGlubmVyWzFdLnggLSBpbm5lclswXS54O1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3kgPSBpbm5lclsxXS55IC0gaW5uZXJbMF0ueTtcblxuICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueCAtPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyMVswXS55IC09IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS54ICs9IGlubmVyX3ZlY3Rvcl94ICogaztcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIyWzFdLnkgKz0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIxID0gW2lubmVyMV07XG4gICAgICAgICAgICAgICAgICAgIGlubmVyMiA9IFtpbm5lcjJdO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24xID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMSwgb3V0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMiA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjIsIG91dGVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaXNpb24xICYmIGNvbGxpc2lvbjIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9KCk7XG5cblxuICAgICAgICB9XG4gICAgICAgIC8qKi9cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERFxuICAgICAgICAvKip2YXIgc2l6ZT0xMDA7XG4gICAgICAgICB2YXIgc3JjPWNyZWF0ZUNhbnZhc1ZpYUZ1bmN0aW9uQW5kQ29udmVydFRvU3JjKFxuICAgICAgICAgc2l6ZSoyLHNpemUqMixmdW5jdGlvbihjdHgpe1xuXG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlV2lkdGggPSAyO1xuXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVzXz1bbGluZXMxLGxpbmVzMl07XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbGluZXNfKXtcblxuICAgICAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0gMCxsPWxpbmVzX1trZXldLmxlbmd0aDtpPGw7aSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGxpbmVzX1trZXldW2ldWzBdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVswXS55K3NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKGxpbmVzX1trZXldW2ldWzFdLngrc2l6ZSxsaW5lc19ba2V5XVtpXVsxXS55K3NpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICApO1xuICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7LyoqL1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICByZXR1cm4gKGNvbGxpc2lvbik7XG5cbiAgICB9XG5cbn07IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5BcnJheVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbi8vdG9kbyBULk9iamVjdHMuQXJyYXkgPSBjbGFzcyBleHRlbmRzIEFycmF5e1xuXG5cbiAgICBleHBvcnQgY2xhc3MgQXJyYXkge1xuXG5cbiAgICAgICAgcHVibGljIG9iamVjdHM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG9iamVjdHNcbiAgICAgICAgICogdG9kbyA/Pz8/Pz8/Pz8gQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmplY3RzPVtdKSB7XG5cbiAgICAgICAgICAgIHRoaXMub2JqZWN0cyA9IG9iamVjdHMubWFwKGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0QWxsKCk6QXJyYXkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZmlsdGVyKGNhbGxiYWNrKTpULk9iamVjdHMuQXJyYXkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgLy9yKGZpbHRlcmVkX29iamVjdHMub2JqZWN0cyk7XG5cbiAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMub2JqZWN0cyA9IHRoaXMub2JqZWN0cy5maWx0ZXIoY2FsbGJhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFB1c2ggbmV3IG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgcHVzaChvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMucHVzaChULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGUgb3IgcHVzaCBvYmplY3QgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZShvYmplY3QpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXRCeUlkKG9iamVjdC5pZCwgb2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRCeUlkKGlkKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignZ2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpcmV0dXJuIHRoaXMub2JqZWN0c1tpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHNldEJ5SWQoaWQsIG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ3NldEJ5SWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldID0gVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZUlkKGlkLCBvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uaWQgPT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyVHlwZXMoLi4udHlwZXMpIHtcblxuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlcy5pbmRleE9mKG9iamVjdC50eXBlKSA9PSAtMSlyZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJSYWRpdXMoY2VudGVyLCByYWRpdXMpIHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UoY2VudGVyKSA8PSByYWRpdXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZpbHRlckFyZWEoYXJlYTpBcmVhKSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFyZWEuaXNDb250YWluaW5nKG9iamVjdC5nZXRQb3NpdGlvbigpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TWFwT2ZUZXJyYWluQ29kZXMoY2VudGVyLCByYWRpdXMpIHsvL3RvZG8gbWF5YmUgcmVmYWN0b3IgdG8gZ2V0VGVycmFpbkNvZGVzMkRBcnJheSBvciBnZXRUZXJyYWluQ29kZXNNYXBcblxuICAgICAgICAgICAgLyp2YXIgcmFkaXVzID0gc2l6ZS8yO1xuICAgICAgICAgICAgIHZhciBjZW50ZXIgPXtcbiAgICAgICAgICAgICB4OiB0b3BsZWZ0LngrcmFkaXVzLFxuICAgICAgICAgICAgIHk6IHRvcGxlZnQueStyYWRpdXNcbiAgICAgICAgICAgICB9OyovXG4gICAgICAgICAgICB2YXIgeCwgeTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNyZWF0ZSBlbXB0eSBhcnJheVxuICAgICAgICAgICAgdmFyIG1hcF9hcnJheSA9IFtdO1xuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1GaWxsIGFycmF5XG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfcmF3ID0gdGhpcy5maWx0ZXJUeXBlcygndGVycmFpbicpLmdldEFsbCgpOy8vLnNsaWNlKCkucmV2ZXJzZSgpO1xuXG5cbiAgICAgICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRlcnJhaW5fb2JqZWN0c19yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gdGVycmFpbl9vYmplY3RzX3Jhd1tpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplID09IDEpIHsvL3RvZG8gaXMgdGhpcyBvcHRpbWFsaXphdGlvbiBlZmZlY3RpdmU/XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihvYmplY3QueCAtIGNlbnRlci54ICsgcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgeSA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPCByYWRpdXMgKiAyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB4IDwgcmFkaXVzICogMlxuICAgICAgICAgICAgICAgICAgICApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gb2JqZWN0LmdldENvZGUoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueCAtIGNlbnRlci54ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeF90byA9IE1hdGguY2VpbChvYmplY3QueCAtIGNlbnRlci54ICsgcmFkaXVzICsgb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB5X2Zyb20gPSBNYXRoLmZsb29yKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMgLSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5X3RvID0gTWF0aC5jZWlsKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgeGMgPSBvYmplY3QueCAtIGNlbnRlci54ICsgcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeWMgPSBvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5ID0geV9mcm9tOyB5IDw9IHlfdG87IHkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcF9hcnJheVt5XSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoeCA9IHhfZnJvbTsgeCA8PSB4X3RvOyB4KyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV1beF0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC54eTJkaXN0KHggLSB4YywgeSAtIHljKSA8PSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIG1hcF9hcnJheTtcblxuXG4gICAgICAgIH1cblxuXG5cblxuICAgICAgICBnZXRNYXBPZkNvbGxpc2lvbnMoY2VudGVyLCByYWRpdXMpe1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tVGVycmFpbnNcbiAgICAgICAgICAgIHZhciBtYXBfb2ZfdGVycmFpbl9jb2RlcyA9IHRoaXMuZ2V0TWFwT2ZUZXJyYWluQ29kZXMoY2VudGVyLCByYWRpdXMpO1xuXG4gICAgICAgICAgICB2YXIgbWFwX29mX2NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgdmFyIHgseTtcblxuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHJhZGl1cyAqIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKFsxLDUsMTFdLmluZGV4T2YobWFwX29mX3RlcnJhaW5fY29kZXNbeV1beF0pIT09LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbeV1beF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3ldW3hdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU9iamVjdHNcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuXG4gICAgICAgICAgICAgICAgaWYob2JqZWN0LnR5cGUgPT0gJ2J1aWxkaW5nJyAmJiBvYmplY3Quc3VidHlwZSA9PSAnd2FsbCcpe31lbHNle3JldHVybjt9XG5cbiAgICAgICAgICAgICAgICB2YXIgeD1NYXRoLnJvdW5kKG9iamVjdC54KS1NYXRoLnJvdW5kKGNlbnRlci54LShyYWRpdXMpKTtcbiAgICAgICAgICAgICAgICB2YXIgeT1NYXRoLnJvdW5kKG9iamVjdC55KS1NYXRoLnJvdW5kKGNlbnRlci55LShyYWRpdXMpKTtcblxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge3g6IHgseTogeX0sXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4KzEseTogeX0sXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LTEseTogeX0sXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LHk6IHkrMX0sXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LHk6IHktMX1cblxuICAgICAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbihwXyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBfLng+PTAgJiYgcF8ueT49MCAmJiBwXy54PHJhZGl1cyoyICYmIHBfLnk8cmFkaXVzKjIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwX29mX2NvbGxpc2lvbnNbcF8ueV1bcF8ueF09MTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIHJldHVybihtYXBfb2ZfY29sbGlzaW9ucyk7XG5cblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0MXgxVGVycmFpbk9iamVjdHMoKSB7XG5cblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c18xeDEgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c19yYXcgPSB0aGlzLmZpbHRlclR5cGVzKCd0ZXJyYWluJykuZ2V0QWxsKCkuc2xpY2UoKS5yZXZlcnNlKCk7Ly9ub3JtYWwgQXJyYXlcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUZpbGwgYXJyYXlcblxuICAgICAgICAgICAgdmFyIGJsb2NrZWRfcG9zaXRpb25zID0ge307XG4gICAgICAgICAgICB2YXIgb2JqZWN0XzF4MSwga2V5O1xuXG5cbiAgICAgICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRlcnJhaW5fb2JqZWN0c19yYXcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gdGVycmFpbl9vYmplY3RzX3Jhd1tpXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEgPSBvYmplY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLngpICsgJ3knICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB5X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5X3RvID0gTWF0aC5jZWlsKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0geF9mcm9tOyB4IDw9IHhfdG87IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgueHkyZGlzdCh4LCB5KSA8PSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF8xeDEgPSBvYmplY3QuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLmRlc2lnbi5kYXRhLnNpemUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnggPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCArIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnkgPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSArIHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIG9iamVjdF8xeDEueCArICd5JyArIG9iamVjdF8xeDEueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiB0ZXJyYWluX29iamVjdHNfMXgxO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy90b2RvIGpzZG9jXG4gICAgICAgIGdldFRlcnJhaW5PblBvc2l0aW9uKHBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMub2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0udHlwZSAhPSAndGVycmFpbicpY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0uZGVzaWduLmRhdGEuc2l6ZSA8PSBwb3NpdGlvbi5nZXREaXN0YW5jZShuZXcgVC5Qb3NpdGlvbih0aGlzLm9iamVjdHNbaV0ueCwgdGhpcy5vYmplY3RzW2ldLnkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMub2JqZWN0c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG51bGwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBqc2RvY1xuICAgICAgICBnZXROZWFyZXN0VGVycmFpblBvc2l0aW9uV2l0aENvZGUocG9zaXRpb24sIHRlcnJhaW5fY29kZSkge1xuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MSA9IHRoaXMuZ2V0MXgxVGVycmFpbk9iamVjdHMoKTtcblxuICAgICAgICAgICAgdmFyIG1pbl9kaXN0YW5jZSA9IC0xO1xuICAgICAgICAgICAgdmFyIG5lYXJlc3RfdGVycmFpbl8xeDEgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluXzF4MSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShwb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAobWluX2Rpc3RhbmNlID09PSAtMSB8fCBtaW5fZGlzdGFuY2UgPiBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdF90ZXJyYWluXzF4MSA9IHRlcnJhaW5fMXgxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZWFyZXN0X3RlcnJhaW5fMXgxID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmVhcmVzdF90ZXJyYWluXzF4MS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKlxuXG4gICAgICAgICBnZXRNYXBPZkNvbGxpc2lvbkNvZGVzKHJlYWxfb2JqZWN0cyxwb3NpdGlvbil7XG4gICAgICAgICByZXR1cm4gVGVycmFpbjtcbiAgICAgICAgIH07XG5cbiAgICAgICAgICovXG5cblxuICAgIH1cblxufVxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk9iamVjdFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgeDtcbiAgICAgICAgcHVibGljIHk7XG4gICAgICAgIHB1YmxpYyB0eXBlO1xuICAgICAgICBwdWJsaWMgbmFtZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzX2tleSA9PSAnX2lkJyl0aGlzX2tleSA9ICdpZCc7Ly90b2RvIG1heWJlIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgdGhpc1t0aGlzX2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgaW5pdChvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYob2JqZWN0IGluc3RhbmNlb2YgVC5PYmplY3RzLk9iamVjdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmIChvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ3RlcnJhaW4nKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4ob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAnc3RvcnknKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlN0b3J5KG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ25hdHVyYWwnKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLk5hdHVyYWwob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IHB1dCBpdGVtIGludG8gVG93bnMgT2JqZWN0cyBBcnJheSBiZWNhdXNlIG9mIHVucmVjb2duaXplZCBvYmplY3QgdHlwZSAnICsgb2JqZWN0LnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQb3NpdGlvbigpOlBvc2l0aW9uIHtcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24odGhpcy54LCB0aGlzLnkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb3ZpbmcoKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiAoJ1snICsgdGhpcy5uYW1lICsgJ10nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLkJ1aWxkaW5nXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdWlsZGluZyBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3Qge1xuXG4gICAgICAgIHB1YmxpYyBkZXNpZ247XG4gICAgICAgIHB1YmxpYyBhY3Rpb25zO1xuICAgICAgICBwdWJsaWMgcGF0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgICAgICBzdXBlcihvYmplY3QpO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uc19jbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc19jbGFzc2VzLnB1c2goVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHRoaXMuYWN0aW9uc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zX2NsYXNzZXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByKHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gbmV3IFQuUGF0aCguLi50aGlzLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHZhciBsaWZlX2FjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCdsaWZlJyk7XG4gICAgICAgICAgICB2YXIgbWF4X2xpZmUgPSBULldvcmxkLmdhbWUuZ2V0T2JqZWN0TWF4TGlmZSh0aGlzKTtcblxuXG4gICAgICAgICAgICBpZiAobGlmZV9hY3Rpb24gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uID0gVC5Xb3JsZC5nYW1lLm5ld0FjdGlvbkluc3RhbmNlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpZmUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IG1heF9saWZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4X2xpZmU6IG1heF9saWZlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChsaWZlX2FjdGlvbik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsaWZlX2FjdGlvbi5wYXJhbXMubWF4X2xpZmUgPSBtYXhfbGlmZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtULlBvc2l0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9zaXRpb24oZGF0ZSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5jb3VudFBvc2l0aW9uKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzTW92aW5nKGRhdGUpIHtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5pblByb2dyZXNzKGRhdGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5CdWlsZGluZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge1QuTW9kZWx9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb2RlbCgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuZGVzaWduLmRhdGEgaW5zdGFuY2VvZiBULk1vZGVsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaWduLmRhdGEgPSBuZXcgVC5Nb2RlbCh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlc2lnbi5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpb25fdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7VC5HYW1lLkFjdGlvbkFiaWxpdHl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRBY3Rpb24oYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zW2ldLnR5cGUgPT0gYWN0aW9uX3R5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYWN0aW9uc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9XG5cblxuICAgICAgICBjcmVhdGVIdG1sUHJvZmlsZSgpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbnNfcHJvZmlsZSA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc19wcm9maWxlICs9IHRoaXMuYWN0aW9uc1tpXS5jcmVhdGVIdG1sUHJvZmlsZSgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoYFxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib2JqZWN0LWJ1aWxkaW5nLXByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIDxoMj5gICsgdGhpcy5uYW1lICsgYDwvaDI+XG4gICAgICAgICAgICAgICAgYCArIHRoaXMuZ2V0UG9zaXRpb24oKSArIGBcblxuXG4gICAgICAgICAgICAgICAgYCArIGFjdGlvbnNfcHJvZmlsZSArIGBcblxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIGApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuTmF0dXJhbFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBOYXR1cmFsIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5OYXR1cmFsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgU3RvcnkgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgY29udGVudDtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5TdG9yeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0TWFya2Rvd24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY29udGVudC5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduO1xuXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlRlcnJhaW4oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZShwcmVmZXJlZF93aWR0aCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvbG9yKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuY29sb3IpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBnZXRJbWFnZSgpe31cblxuXG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBleHBvcnQgY2xhc3MgUmVzb3VyY2VzIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlc291cmNlczpPYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHJlc291cmNlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlJlc291cmNlcyB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY29udGFpbnMgYSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBjb250YWluc1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbnMocmVzb3VyY2VzOlJlc291cmNlcyk6Ym9vbGVhbiB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldIDwgcmVzb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICBhZGQocmVzb3VyY2VzOlJlc291cmNlcyk6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gKz0gcmVzb3VyY2VzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG11bHRpcGx5KGs6bnVtYmVyKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbCh0aGlzW2tleV0gKiBrKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzaWdudW0oazpzdHJpbmcpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgYXBwbHkobW9kaWZpZXI6RnVuY3Rpb24pOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbW9kaWZpZXIodGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBhbGwgcmVzb3VyY2VzIGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3RLZXlzKCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgZ2l2ZW4gUmVzb3VyY2VzXG4gICAgICAgICAqL1xuICAgICAgICBjb21wYXJlKHJlc291cmVzOlJlc291cmNlcyk6bnVtYmVyIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlc19BID0gdGhpcztcbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQiA9IHJlc291cmVzO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0EuZXh0cmFjdEtleXMoKSk7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0IuZXh0cmFjdEtleXMoKSk7XG5cblxuICAgICAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbF9BID0gcmVzb3VyY2VzX0Fba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsX0IgPSByZXNvdXJjZXNfQltrZXldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9BID09ICd1bmRlZmluZWQnKXZhbF9BID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9CID09ICd1bmRlZmluZWQnKXZhbF9CID0gMDtcblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlICs9IE1hdGgucG93KHZhbF9BIC0gdmFsX0IsIDIpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlKTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGRpc3RhbmNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZShyZXNvdXJjZXM6UmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0hUTUwoKTpzdHJpbmcgey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmdzX2pvaW5lZCA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICAgICAgc3RyaW5nc19qb2luZWQgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzX2pvaW5lZCArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nc19qb2luZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuVE1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb24ge1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb25Qb2xhciB7XG4gICAgICAgIGRpc3Q6IG51bWJlcjtcbiAgICAgICAgZGVnOiBudW1iZXI7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVE1hdGgge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYmFzZUxvZyhiYXNlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyOiBudW1iZXIsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgICAgIHZhciBkaWdpdHMgPSBNYXRoLmNlaWwoVC5UTWF0aC5iYXNlTG9nKDEwLCBudW1iZXIpKTtcbiAgICAgICAgICAgIHZhciBrID0gTWF0aC5wb3coMTAsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgLSBkaWdpdHMpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRpZ2l0cyxrKTtcblxuXG4gICAgICAgICAgICBudW1iZXIgPSBudW1iZXIgKiBrO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICAgICAgbnVtYmVyID0gTWF0aC5yb3VuZChudW1iZXIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8gaztcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBhbmdlbGVzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzFcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZzJcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSA8MDsxODA+IGRlZ3JlZXMgZGlmZmVyZW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGFuZ2xlRGlmZihkZWcxOiBudW1iZXIsIGRlZzI6bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgdmFyIGRlZyA9IE1hdGguYWJzKGRlZzEgLSBkZWcyKSAlIDM2MDtcbiAgICAgICAgICAgIGlmIChkZWcgPiAxODApZGVnID0gMzYwIC0gZGVnO1xuICAgICAgICAgICAgcmV0dXJuIChkZWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcmFkMmRlZyhyYWRpYW5zOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAocmFkaWFucyAqICgxODAgLyBNYXRoLlBJKSkgJSAzNjA7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBkZWcycmFkKGRlZ3JlZXM6bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIChkZWdyZWVzICUgMzYwICogKE1hdGguUEkgLyAxODApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB4XG4gICAgICAgICAqIEBwYXJhbSB5XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGlzdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB4eTJkaXN0KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5zcXJ0KE1hdGgucG93KHgsIDIpICsgTWF0aC5wb3coeSwgMikpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICBzdGF0aWMgeHkyZGlzdERlZyh4Om51bWJlciwgeTpudW1iZXIpOnBvc2l0aW9uUG9sYXIge1xuXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgIGRpc3Q6IFQuVE1hdGgueHkyZGlzdCh4LCB5KSxcbiAgICAgICAgICAgICAgICBkZWc6ICBULlRNYXRoLnJhZDJkZWcoTWF0aC5hdGFuMih5LCB4KSlcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIGRpc3REZWcyeHkoZGlzdDpudW1iZXIsIGRlZzpudW1iZXIpOnBvc2l0aW9uIHtcblxuICAgICAgICAgICAgdmFyIHJhZCA9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguY29zKHJhZCkgKiBkaXN0LFxuICAgICAgICAgICAgICAgIHk6IE1hdGguc2luKHJhZCkgKiBkaXN0XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiAob3V0cHV0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy90b2RvIG15YmUgcmVmYWN0b3IgdG8gcG9zaXRpb25cbiAgICAgICAgc3RhdGljIHh5Um90YXRlKHg6IG51bWJlciwgeTpudW1iZXIsIGRlZzpudW1iZXIpOnBvc2l0aW9uIHtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdCA9IFQuVE1hdGgueHkyZGlzdCh4LCB5KTtcbiAgICAgICAgICAgIHZhciByYWQgPSBNYXRoLmF0YW4yKHksIHgpO1xuXG4gICAgICAgICAgICByYWQgKz0gVC5UTWF0aC5kZWcycmFkKGRlZyk7XG5cblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgc3RhdGljIHJhbmRvbVNlZWRQb3NpdGlvbihzZWVkOm51bWJlciwgcG9zaXRpb246cG9zaXRpb24pIHtcblxuXG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc2luKE1hdGgucG93KChwb3NpdGlvbi54ICogcG9zaXRpb24ueSkgLSBzZWVkLCAyKSkgKyAxKSAvIDI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBmbG9hdFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0Zsb2F0KHZhbHVlOmFueSwgZGVmdmFsPTApOm51bWJlciB7XG5cbiAgICAgICAgICAgIC8vaWYgKHR5cGVvZiBkZWZ2YWwgPT09ICd1bmRlZmluZWQnKWRlZnZhbCA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJylyZXR1cm4gKGRlZnZhbCk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkZWZ2YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBpbnRlZ2VyXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZ2YWxcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHRvSW50KHZhbHVlOmFueSwgZGVmdmFsPTApOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJylyZXR1cm4gKGRlZnZhbCk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYm91bmRzKHZhbHVlOm51bWJlciwgbWluOm51bWJlciwgbWF4Om51bWJlcik6bnVtYmVyIHtcblxuICAgICAgICAgICAgaWYgKHZhbHVlIDwgbWluKXJldHVybiBtaW47XG4gICAgICAgICAgICBpZiAodmFsdWUgPiBtYXgpcmV0dXJuIG1heDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgcG9pbnRbYjF4LGIxeV0gY29sbGlkaW5nIGxpbmU/XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlzT25MaW5lKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgYTJ4IC09IGExeDtcbiAgICAgICAgICAgIGEyeSAtPSBhMXk7XG5cbiAgICAgICAgICAgIGIxeCAtPSBhMXg7XG4gICAgICAgICAgICBiMXkgLT0gYTF5O1xuXG5cbiAgICAgICAgICAgIHZhciBhU2xvcGUgPSBhMnkgLyBhMng7XG4gICAgICAgICAgICB2YXIgYlNsb3BlID0gYjF5IC8gYjF4O1xuXG5cbiAgICAgICAgICAgIGlmIChhU2xvcGUgIT0gYlNsb3BlKXJldHVybiBmYWxzZTtcblxuXG4gICAgICAgICAgICB2YXIgYURpc3QgPSBULlRNYXRoLnh5MmRpc3QoYTJ5LCBhMngpO1xuICAgICAgICAgICAgdmFyIGJEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGIxeSwgYjF4KTtcblxuICAgICAgICAgICAgcmV0dXJuIChhRGlzdCA+PSBiRGlzdCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIGxpbmUgQSBjb2xsaWRpbmcgbGluZSBCP1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjF5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIyeVxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGxpbmVDb2xsaXNpb24oYTF4Om51bWJlciwgYTF5Om51bWJlciwgYTJ4Om51bWJlciwgYTJ5Om51bWJlciwgYjF4Om51bWJlciwgYjF5Om51bWJlciwgYjJ4Om51bWJlciwgYjJ5Om51bWJlcik6IGJvb2xlYW4ge1xuXG5cbiAgICAgICAgICAgIHZhciBkZW5vbWluYXRvciA9ICgoYTJ4IC0gYTF4KSAqIChiMnkgLSBiMXkpKSAtICgoYTJ5IC0gYTF5KSAqIChiMnggLSBiMXgpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IxID0gKChhMXkgLSBiMXkpICogKGIyeCAtIGIxeCkpIC0gKChhMXggLSBiMXgpICogKGIyeSAtIGIxeSkpO1xuICAgICAgICAgICAgdmFyIG51bWVyYXRvcjIgPSAoKGExeSAtIGIxeSkgKiAoYTJ4IC0gYTF4KSkgLSAoKGExeCAtIGIxeCkgKiAoYTJ5IC0gYTF5KSk7XG4gICAgICAgICAgICB2YXIgY29sbGlzaW9uO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlbm9taW5hdG9yLG51bWVyYXRvcjEsbnVtZXJhdG9yMik7XG5cbiAgICAgICAgICAgIC8vIERldGVjdCBjb2luY2lkZW50IGxpbmVzIChoYXMgYSBwcm9ibGVtLCByZWFkIGJlbG93KVxuICAgICAgICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAvL3ZhciBjb2xsaXNpb249IChudW1lcmF0b3IxID09IDAgJiYgbnVtZXJhdG9yMiA9PSAwKTtcbiAgICAgICAgICAgICAgICAvL2NvbGxpc2lvbj1mYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBiT25BID0gVC5UTWF0aC5pc09uTGluZShhMXgsIGExeSwgYTJ4LCBhMnksIGIxeCwgYjF5KTtcbiAgICAgICAgICAgICAgICB2YXIgYU9uQiA9IFQuVE1hdGguaXNPbkxpbmUoYjF4LCBiMXksIGIyeCwgYjJ5LCBhMXgsIGExeSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGJPbkEgfHwgYU9uQik7XG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciByID0gbnVtZXJhdG9yMSAvIGRlbm9taW5hdG9yO1xuICAgICAgICAgICAgICAgIHZhciBzID0gbnVtZXJhdG9yMiAvIGRlbm9taW5hdG9yO1xuXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uID0gKChyID49IDAgJiYgciA8PSAxKSAmJiAocyA+PSAwICYmIHMgPD0gMSkpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVidWcgVEREIGRvIG5vdCBkZWxldGVcblxuICAgICAgICAgICAgLyp2YXIgc2l6ZT01MDtcbiAgICAgICAgICAgICB2YXIgc3JjPWNyZWF0ZUNhbnZhc1ZpYUZ1bmN0aW9uQW5kQ29udmVydFRvU3JjKFxuICAgICAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICBjdHgubW92ZVRvKGExeCtzaXplLGExeStzaXplKTtcbiAgICAgICAgICAgICBjdHgubGluZVRvKGEyeCtzaXplLGEyeStzaXplKTtcbiAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhiMXgrc2l6ZSxiMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhiMngrc2l6ZSxiMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsqL1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBibHVyWFkoZ2VuZXJhdG9yOkZ1bmN0aW9uLCBibHVyOm51bWJlcikge1xuXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICh4LCB5KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIHh4LCB5eTtcblxuICAgICAgICAgICAgICAgIGZvciAoeHggPSB4IC0gYmx1cjsgeHggPD0geCArIGJsdXI7IHh4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHl5ID0geSAtIGJsdXI7IHl5IDw9IHkgKyBibHVyOyB5eSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnBvdyhibHVyLCAyKSA8IE1hdGgucG93KHh4IC0geCwgMikgKyBNYXRoLnBvdyh5eSAtIHksIDIpKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZ2VuZXJhdG9yKHh4LCB5eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHN1bSAvIGNvdW50KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGJ5dGVzVG9TaXplKGJ5dGVzOm51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgICAgIHZhciBzaXplcyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQiddO1xuICAgICAgICAgICAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzBCJztcbiAgICAgICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpKSk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChieXRlcyAvIE1hdGgucG93KDEwMjQsIGkpKSArICcnICsgc2l6ZXNbaV07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9zdGFydFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9wb3NpdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9lbmRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJfZW5kXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcHJvcG9ydGlvbnMoYV9zdGFydDpudW1iZXIsIGFfcG9zaXRpb246bnVtYmVyLCBhX2VuZDpudW1iZXIsIGJfc3RhcnQ6bnVtYmVyLCBiX2VuZDpudW1iZXIpOm51bWJlciB7XG5cblxuICAgICAgICAgICAgdmFyIGFfd2hvbGUgPSBhX2VuZCAtIGFfc3RhcnQ7XG4gICAgICAgICAgICB2YXIgYl93aG9sZSA9IGJfZW5kIC0gYl9zdGFydDtcblxuICAgICAgICAgICAgdmFyIGFfcGFydCA9IGFfZW5kIC0gYV9wb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciBiX3BhcnQgPSAoYl93aG9sZSAqIGFfcGFydCkgLyBhX3dob2xlO1xuXG4gICAgICAgICAgICByZXR1cm4gKGJfZW5kIC0gYl9wYXJ0KTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG4gICAgaW50ZXJmYWNlIFVzZXJQcm9maWxlIHtcbiAgICAgICAgdXNlcm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgc3VybmFtZTogJ3N0cmluZyc7XG4gICAgICAgIGVtYWlsOiAnc3RyaW5nJztcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBVc2VyIHtcblxuXG4gICAgICAgIHByb2ZpbGU6IFVzZXJQcm9maWxlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gdXNlciByYXcgdXNlciBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcih1c2VyOiBVc2VyKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB1c2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gdXNlcltrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgb2YgdXNlcnMgc2lnbmF0dXJlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRTaWduYXR1cmVIVE1MKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUubmFtZSB8fCB0aGlzLnByb2ZpbGUuc3VybmFtZSkge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS5uYW1lICsgJyAnICsgdGhpcy5wcm9maWxlLnN1cm5hbWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBuYW1lID0gdGhpcy5wcm9maWxlLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIGVtYWlsX21kNSA9IG1kNSh0aGlzLnByb2ZpbGUuZW1haWwpO1xuXG5cbiAgICAgICAgICAgIHZhciBzaWduYXR1cmVfaHRtbCA9IGBcblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwidXNlci1pbWFnZVwiIHNyYz1cImh0dHBzOi8vMS5ncmF2YXRhci5jb20vYXZhdGFyL2AgKyBlbWFpbF9tZDUgKyBgP3M9ODAmcj1wZyZkPW1tXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXItc2lnbmF0dXJlLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInVzZXItbmFtZVwiPmAgKyBuYW1lICsgYDwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5gICsgdGhpcy5wcm9maWxlLnNpZ25hdHVyZS5odG1sMnRleHQoKSArIGA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIHJldHVybiAoc2lnbmF0dXJlX2h0bWwpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC50ZXJyYWluc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblQuc2V0TmFtZXNwYWNlKCdXb3JsZCcpO1xuXG5ULldvcmxkLnRlcnJhaW5zID0gW1xuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMCAsY29sb3I6ICcjMDAwMDAwJywgc2l6ZTogMX19LCBuYW1lOiAndGVtbm90YSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMiAsY29sb3I6ICcjNTQ1NDU0Jywgc2l6ZTogMX19LCBuYW1lOiAnZGxhxb5iYSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDMgLGNvbG9yOiAnI0VGRjdGQicsIHNpemU6IDF9fSwgbmFtZTogJ3Nuw61oL2xlZCd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDUgLGNvbG9yOiAnIzg3ODc4NycsIHNpemU6IDF9fSwgbmFtZTogJ2thbWVuw60nfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA2ICxjb2xvcjogJyM1QTJGMDAnLCBzaXplOiAxfX0sIG5hbWU6ICdobMOtbmEnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA4ICxjb2xvcjogJyMyQTczMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEobm9ybWFsKSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDkgLGNvbG9yOiAnIzUxRjMxMScsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YSh0b3hpYyknfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMSxjb2xvcjogJyM2YWEyZmYnLCBzaXplOiAxfX0sIG5hbWU6ICfFmWVrYSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEyLGNvbG9yOiAnIzhBQkMwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShqYXJvKSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbl07XG5cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBpbnN0YW5jZSBULldvcmxkLm1hcEdlbmVyYXRvclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQubWFwR2VuZXJhdG9yID0gbmV3IFQuTWFwR2VuZXJhdG9yKFxuXG4gICAgVC5UTWF0aC5ibHVyWFkoZnVuY3Rpb24oeCx5KXtcblxuICAgICAgICAvL3RvZG8vL3ZhciBrZXk9J3gnK3grJ3knK3k7XG4gICAgICAgIC8vdG9kby8vaWYodHlwZW9mIHpfbWFwX2NhY2hlW2tleV0hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAvL3RvZG8vL31cblxuXG4gICAgICAgIGNvbnN0IGRpdj0xMDA7XG5cblxuICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgdmFyIG1heF9wb3NzaWJsZV9uPTA7XG5cbiAgICAgICAgdmFyIF94LF95O1xuXG4gICAgICAgIHZhciBrPTAuNDtcbiAgICAgICAgdmFyIGtfPTEtaztcblxuICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICBuICs9IE1hdGgucm91bmQoTWF0aC5wb3coeCp5LTY2LCAyKSkgJSAoZGl2ICsgMSk7XG5cbiAgICAgICAgICAgIG1heF9wb3NzaWJsZV9uKz1kaXY7XG5cbiAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAvL3k9TWF0aC5mbG9vcih5LzMpO1xuICAgICAgICAgICAgLy92YXIgeHkgPSBULlRNYXRoLnh5Um90YXRlKHgseSw1Nyk7XG4gICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgIC8veT14eS55O1xuXG4gICAgICAgICAgICBfeD0oLXkqaykrKHgqa18pO1xuICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICB4PU1hdGguZmxvb3IoX3gvNCk7XG4gICAgICAgICAgICB5PU1hdGguZmxvb3IoX3kvNCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbj1uL21heF9wb3NzaWJsZV9uO1xuXG4gICAgICAgIGlmKG48MCluLT1NYXRoLmZsb29yKG4pO1xuICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAvL3RvZG8vL3pfbWFwX2NhY2hlW2tleV09bjtcbiAgICAgICAgcmV0dXJuKG4pO1xuXG4gICAgfSwyKVxuICAgICxcbiAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDIsMC4wMDAzLDAuMDAwMywwLjAwMDUsMC4wMDA2LDAuMDAwNywwLjAwMDksMC4wMDEsMC4wMDEsMC4wMDEsMC4wMDEyLDAuMDAxNCwwLjAwMTUsMC4wMDE2LDAuMDAyMSwwLjAwMjUsMC4wMDMsMC4wMDMzLDAuMDAzNCwwLjAwMzcsMC4wMDM4LDAuMDA0MiwwLjAwNDYsMC4wMDQ5LDAuMDA1NywwLjAwNjUsMC4wMDY4LDAuMDA3MiwwLjAwNzQsMC4wMDc5LDAuMDA4NCwwLjAwOSwwLjAwOTYsMC4wMTA1LDAuMDExNSwwLjAxMjMsMC4wMTMxLDAuMDE0MiwwLjAxNDgsMC4wMTU5LDAuMDE2NiwwLjAxODQsMC4wMTksMC4wMjA0LDAuMDIxLDAuMDIyLDAuMDIzMiwwLjAyNDUsMC4wMjYsMC4wMjY2LDAuMDI3NywwLjAyOSwwLjAyOTcsMC4wMzEsMC4wMzE4LDAuMDMzMSwwLjAzNDYsMC4wMzYxLDAuMDM3OCwwLjAzODksMC4wNDA0LDAuMDQxNCwwLjA0MzEsMC4wNDU2LDAuMDQ3NSwwLjA1MDEsMC4wNTE3LDAuMDUzMywwLjA1NDgsMC4wNTY2LDAuMDU4OSwwLjA2MDksMC4wNjIyLDAuMDYzNSwwLjA2NTgsMC4wNjc4LDAuMDY5MiwwLjA3MTIsMC4wNzMzLDAuMDc1MSwwLjA3NzQsMC4wNzksMC4wODEzLDAuMDgzNywwLjA4NTksMC4wODgsMC4wOTAyLDAuMDkyNywwLjA5NjEsMC4wOTg4LDAuMTAwMywwLjEwMzEsMC4xMDUsMC4xMDcxLDAuMTEsMC4xMTEzLDAuMTEzNywwLjExNjUsMC4xMTg3LDAuMTIxOCwwLjEyNDMsMC4xMjc3LDAuMTI5NywwLjEzMjMsMC4xMzUzLDAuMTM3MSwwLjEzOTUsMC4xNDI2LDAuMTQ0OSwwLjE0NzQsMC4xNTA5LDAuMTUzNiwwLjE1NiwwLjE1ODIsMC4xNjA1LDAuMTYzMywwLjE2NjIsMC4xNjkyLDAuMTcyNiwwLjE3NTUsMC4xNzgxLDAuMTgxMywwLjE4NDIsMC4xODY5LDAuMTg5OSwwLjE5MzksMC4xOTc1LDAuMjAwMSwwLjIwMjksMC4yMDcsMC4yMTA4LDAuMjEzNSwwLjIxNTgsMC4yMTg3LDAuMjIxLDAuMjIzOCwwLjIyNiwwLjIyODMsMC4yMzI2LDAuMjM2MiwwLjIzOTQsMC4yNDI3LDAuMjQ1NSwwLjI0ODUsMC4yNTA4LDAuMjUzMiwwLjI1NjgsMC4yNTk0LDAuMjYyOCwwLjI2NTEsMC4yNjc4LDAuMjcxMiwwLjI3MzgsMC4yNzYsMC4yNzkyLDAuMjgxOSwwLjI4NTIsMC4yODg1LDAuMjkwOCwwLjI5NDMsMC4yOTY5LDAuMjk5NCwwLjMwMTksMC4zMDQ5LDAuMzA3NywwLjMxMDgsMC4zMTM1LDAuMzE2MiwwLjMxOTQsMC4zMjE2LDAuMzI0MywwLjMyNzYsMC4zMzA3LDAuMzMzNCwwLjMzNiwwLjMzODYsMC4zNDIxLDAuMzQ0MywwLjM0NjIsMC4zNDg0LDAuMzUxLDAuMzUzNSwwLjM1NjksMC4zNTkzLDAuMzYxOCwwLjM2NDIsMC4zNjU5LDAuMzY4MSwwLjM3MDYsMC4zNzIyLDAuMzc0MiwwLjM3NzIsMC4zNzk0LDAuMzgxNiwwLjM4MzcsMC4zODY1LDAuMzg3OSwwLjM5MDcsMC4zOTI1LDAuMzk0NywwLjM5NjcsMC4zOTg1LDAuMzk5OCwwLjQwMjEsMC40MDM1LDAuNDA1NCwwLjQwNjcsMC40MDg4LDAuNDEwNywwLjQxMzMsMC40MTQxLDAuNDE2MSwwLjQxNzcsMC40MTkzLDAuNDIwOSwwLjQyMTksMC40MjM0LDAuNDI0NSwwLjQyNjQsMC40MjgzLDAuNDMwMiwwLjQzMTgsMC40MzI3LDAuNDM0NiwwLjQzNjMsMC40MzgxLDAuNDQsMC40NDA5LDAuNDQzNSwwLjQ0NSwwLjQ0NjIsMC40NDg0LDAuNDQ5MiwwLjQ1MDYsMC40NTE4LDAuNDUzMywwLjQ1NDgsMC40NTU0LDAuNDU2LDAuNDU3MywwLjQ1ODgsMC40NjA1LDAuNDYxNiwwLjQ2MywwLjQ2MzgsMC40NjU2LDAuNDY2MywwLjQ2NzIsMC40Njg0LDAuNDY5NiwwLjQ3MDgsMC40NzIxLDAuNDczLDAuNDczNywwLjQ3NDcsMC40NzU2LDAuNDc2NSwwLjQ3ODEsMC40NzkxLDAuNDgwMiwwLjQ4MDksMC40ODE5LDAuNDgyNCwwLjQ4MywwLjQ4MzgsMC40ODQ3LDAuNDg1OSwwLjQ4NjUsMC40ODcsMC40ODc1LDAuNDg4MywwLjQ4OTQsMC40OTAxLDAuNDkwNywwLjQ5MTUsMC40OTI5LDAuNDkzNCwwLjQ5NCwwLjQ5NDksMC40OTU1LDAuNDk2LDAuNDk2NywwLjQ5NzEsMC40OTc1LDAuNDk4MSwwLjQ5OSwwLjQ5OTcsMC41MDA1LDAuNTAwOCwwLjUwMTgsMC41MDI0LDAuNTAzMiwwLjUwMzgsMC41MDQyLDAuNTA0NiwwLjUwNSwwLjUwNTksMC41MDY3LDAuNTA3LDAuNTA3NCwwLjUwNzcsMC41MDg0LDAuNTA4NiwwLjUwOTUsMC41MTA0LDAuNTEwOSwwLjUxMTcsMC41MTIyLDAuNTEyOSwwLjUxMzYsMC41MTQsMC41MTQxLDAuNTE0NSwwLjUxNSwwLjUxNTMsMC41MTU3LDAuNTE2MiwwLjUxNjksMC41MTcyLDAuNTE3NiwwLjUxOCwwLjUxODYsMC41MTkzLDAuNTE5NywwLjUyMDIsMC41MjA3LDAuNTIwOSwwLjUyMTQsMC41MjE4LDAuNTIyMywwLjUyMzEsMC41MjM3LDAuNTI0NCwwLjUyNDYsMC41MjQ5LDAuNTI1OSwwLjUyNjEsMC41MjY5LDAuNTI3MiwwLjUyNzUsMC41MjgxLDAuNTI4MywwLjUyODUsMC41MjkxLDAuNTMwMiwwLjUzMSwwLjUzMTcsMC41MzIsMC41MzI2LDAuNTMzNCwwLjUzMzYsMC41MzQxLDAuNTM0MywwLjUzNDUsMC41MzQ5LDAuNTM1MywwLjUzNTcsMC41MzY0LDAuNTM3NywwLjUzODIsMC41Mzg4LDAuNTM5MywwLjUzOTksMC41NDAzLDAuNTQxMiwwLjU0MTksMC41NDMsMC41NDM3LDAuNTQ0NiwwLjU0NTcsMC41NDY2LDAuNTQ3NiwwLjU0ODIsMC41NDg2LDAuNTQ5MSwwLjU0OTUsMC41NTAzLDAuNTUwNiwwLjU1MTUsMC41NTIyLDAuNTUyNywwLjU1NCwwLjU1NSwwLjU1NTMsMC41NTU3LDAuNTU2MiwwLjU1NjksMC41NTc4LDAuNTU4NiwwLjU1OTUsMC41NjA4LDAuNTYxNiwwLjU2MjYsMC41NjM0LDAuNTY0NSwwLjU2NTIsMC41NjY3LDAuNTY3MywwLjU2ODMsMC41Njk3LDAuNTcwNywwLjU3MjMsMC41NzM5LDAuNTc1LDAuNTc1OCwwLjU3NzEsMC41Nzc5LDAuNTc5MSwwLjU4MDMsMC41ODE3LDAuNTgzMywwLjU4NDksMC41ODY1LDAuNTg3NiwwLjU4ODQsMC41ODk5LDAuNTkxOSwwLjU5MjksMC41OTQyLDAuNTk1NCwwLjU5NjksMC41OTg3LDAuNTk5OCwwLjYwMTgsMC42MDM2LDAuNjA1MiwwLjYwNjMsMC42MDc3LDAuNjA5OSwwLjYxMTYsMC42MTM2LDAuNjE1NCwwLjYxNjYsMC42MTg1LDAuNjIwMSwwLjYyMjMsMC42MjM4LDAuNjI1OCwwLjYyNzgsMC42Mjk1LDAuNjMxLDAuNjMyNCwwLjYzNDQsMC42MzU4LDAuNjM3MiwwLjYzOTUsMC42NDE0LDAuNjQzNCwwLjY0NTEsMC42NDcyLDAuNjQ5MywwLjY1MTMsMC42NTM2LDAuNjU1OSwwLjY1NzgsMC42NTk4LDAuNjYyMiwwLjY2MzgsMC42NjcsMC42Njk2LDAuNjcxLDAuNjc0LDAuNjc2NSwwLjY3OSwwLjY4MTEsMC42ODM2LDAuNjg2MSwwLjY4ODQsMC42OTAzLDAuNjkzMywwLjY5NDYsMC42OTc2LDAuNjk5NywwLjcwMjcsMC43MDQ5LDAuNzA4NCwwLjcxMDksMC43MTI4LDAuNzE2NCwwLjcxODksMC43MjIyLDAuNzI0NSwwLjcyNzEsMC43MzA1LDAuNzMyNiwwLjczNjcsMC43Mzk4LDAuNzQyMSwwLjc0NDMsMC43NDYxLDAuNzQ4MywwLjc1MDcsMC43NTQsMC43NTY2LDAuNzU4NywwLjc2MTUsMC43NjM5LDAuNzY2MiwwLjc2OTMsMC43NzIzLDAuNzc1MywwLjc3NjksMC43Nzk3LDAuNzgyMiwwLjc4NDMsMC43ODY5LDAuNzg5MSwwLjc5MTgsMC43OTQ0LDAuNzk4MiwwLjgwMSwwLjgwNDEsMC44MDY4LDAuODA5NCwwLjgxMiwwLjgxNDgsMC44MTc0LDAuODIsMC44MjE5LDAuODI0LDAuODI1OSwwLjgyODcsMC44MzExLDAuODMzMywwLjgzNDksMC44Mzc0LDAuODQxLDAuODQzMywwLjg0NTYsMC44NDgxLDAuODUxOCwwLjg1NCwwLjg1NjIsMC44NTg4LDAuODYyLDAuODY0LDAuODY2NiwwLjg2OTMsMC44NzE5LDAuODczNywwLjg3NDksMC44NzczLDAuODc5MywwLjg4MTYsMC44ODM5LDAuODg3LDAuODg4OCwwLjg5MDUsMC44OTI0LDAuODk0OCwwLjg5NjYsMC44OTg2LDAuOTAwOSwwLjkwMjksMC45MDM5LDAuOTA2MywwLjkwOCwwLjkwOTUsMC45MTEsMC45MTI1LDAuOTE1LDAuOTE3MywwLjkxODYsMC45MjA5LDAuOTIyOCwwLjkyNDksMC45MjU5LDAuOTI3LDAuOTI5LDAuOTMwMywwLjkzMjIsMC45MzMyLDAuOTM0MywwLjkzNTYsMC45MzcyLDAuOTM4NywwLjk0MDcsMC45NDI3LDAuOTQ0LDAuOTQ1OSwwLjk0NzMsMC45NDksMC45NTA4LDAuOTUyMSwwLjk1MzMsMC45NTU1LDAuOTU2OSwwLjk1OCwwLjk1OTIsMC45NjA2LDAuOTYxMiwwLjk2MTcsMC45NjIsMC45NjI3LDAuOTY0MiwwLjk2NDYsMC45NjU4LDAuOTY3LDAuOTY4LDAuOTY4NCwwLjk2ODgsMC45Njk4LDAuOTcwNiwwLjk3MTksMC45NzI3LDAuOTc0LDAuOTc0NywwLjk3NjEsMC45Nzc0LDAuOTc4NSwwLjk3OTMsMC45ODAyLDAuOTgxMSwwLjk4MTcsMC45ODIzLDAuOTgyOCwwLjk4NCwwLjk4NDYsMC45ODUxLDAuOTg1OCwwLjk4NjMsMC45ODY5LDAuOTg3LDAuOTg3NCwwLjk4NzksMC45ODg2LDAuOTg4OCwwLjk4OTUsMC45OTAzLDAuOTkwNCwwLjk5MDcsMC45OTEyLDAuOTkxMywwLjk5MTcsMC45OTIsMC45OTI4LDAuOTkyOSwwLjk5MzYsMC45OTM5LDAuOTk0MiwwLjk5NDYsMC45OTQ5LDAuOTk1NSwwLjk5NTUsMC45OTU5LDAuOTk2MywwLjk5NjQsMC45OTY2LDAuOTk2NiwwLjk5NjgsMC45OTY5LDAuOTk3MSwwLjk5NzMsMC45OTc4LDAuOTk4MSwwLjk5ODUsMC45OTg2LDAuOTk4OCwwLjk5ODgsMC45OTg5LDAuOTk4OSwwLjk5OSwwLjk5OSwwLjk5OSwwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTYsMC45OTk2LDAuOTk5NywwLjk5OTcsMC45OTk3LDAuOTk5OCwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV1cbiAgICAsXG5cbiAgICBuZXcgVC5NYXBHZW5lcmF0b3IuQmlvdG9wZShbXG5cbiAgICAgICAgeyBhbW91bnQ6IDEyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDFdfSwvL21vxZllXG4gICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTFdfSwvL8WZZWthXG4gICAgICAgIHsgYW1vdW50OiAzMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEyXX0sLy90csOhdmEgamFyb1xuICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA5XX0sLy90csOhdmEgdG94aWNcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDhdfSwvL3Ryw6F2YSBub3JtYWxcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgIHsgYW1vdW50OiA1MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEzXX0sLy90csOhdmEgcG96aW1cbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyAzXX0sLy9zbsOtaC9sZWRcbiAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgN119LC8vc27DrWgvbGVkXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICBdKSxcblxuXG4gICAgZnVuY3Rpb24ob2JqZWN0LHZpcnR1YWxfb2JqZWN0cyl7XG5cbiAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgLyppZihvYmplY3QuZ2V0Q29kZSgpPT01KXtcbiAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigxLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo2KSU2KydkYXJrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMC41K1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuXG4gICAgICAgIH1lbHNlKi9cbiAgICAgICAgaWYob2JqZWN0LmdldENvZGUoKT09MTApe1xuXG4gICAgICAgICAgICBpZihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigzLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KT4wLjk1KXtcblxuICAgICAgICAgICAgICAgIHZpcnR1YWxfb2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9iamVjdC54LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmF0dXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOid0cmVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMytULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSoyMC0xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgejogVC5UTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMzYwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbik7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUgPSBuZXcgVC5HYW1lKFxuICAgIFQuVE1hdGgucHJldHR5TnVtYmVyLFxuICAgIFQuVE1hdGgucHJldHR5TnVtYmVyXG4pOyIsIlxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBkaXN0YW5jZTogICAwLFxuICAgICAgICBzdHJlbmd0aDogICAwLFxuICAgICAgICByb3VuZHM6ICAgICAxLFxuICAgICAgICBjb29sZG93bjogICAxXG4gICAgfSxcbiAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb257XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCdhdHRhY2snKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoTWF0aC5wb3codGhpcy5wYXJhbXMuZGlzdGFuY2UsMikqdGhpcy5wYXJhbXMuc3RyZW5ndGgqdGhpcy5wYXJhbXMucm91bmRzKigxL3RoaXMucGFyYW1zLmNvb2xkb3duKSkqMTAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDB9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMn0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSxhdHRhY2tlcixhdHRhY2tlZCxyZXNvdXJjZXNfYXR0YWNrZXIpe1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXJfYXR0YWNrID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKTtcbiAgICAgICAgICAgIHZhciBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdhdHRhY2snKTtcbiAgICAgICAgICAgIHZhciBhdHRhY2tlZF9kZWZlbmNlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2tlcl9saWZlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VkX2xpZmUgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2xpZmUnKS5wYXJhbXM7XG5cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLU1pc3NpbmcgYWN0aW9uXG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZXJfYXR0YWNrIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrPWF0dGFja2VyX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0YWNrZXIgaGFzIG5vdCBhYmlsaXR5IHRvIGF0dGFjaycpO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZXJfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2U9YXR0YWNrZXJfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2UgPSBnYW1lLmdldEFjdGlvbkVtcHR5SW5zdGFuY2UoJ2RlZmVuY2UnKS5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZWRfYXR0YWNrIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbil7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrPWF0dGFja2VkX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjayA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnYXR0YWNrJykucGFyYW1zO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZWRfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2U9YXR0YWNrZWRfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UgPSBnYW1lLmdldEFjdGlvbkVtcHR5SW5zdGFuY2UoJ2RlZmVuY2UnKS5wYXJhbXM7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1EaXN0YW5jZVxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gYXR0YWNrZXIuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShhdHRhY2tlZC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGlmKGRpc3RhbmNlPmF0dGFja2VyX2F0dGFjay5kaXN0YW5jZSl7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdHMgYXJlIHRvbyBmYXIgLSAnK2Rpc3RhbmNlKycgZmllbGRzLiBBdHRhY2sgZGlzdGFuY2UgaXMgb25seSAnK2F0dGFja2VyX2F0dGFjay5kaXN0YW5jZSsnIGZpZWxkcy4nKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29vbGRvd25cbiAgICAgICAgICAgIGlmKCFhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLmNhbkJlRXhlY3V0ZWROb3coKSl7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgYWN0aW9uIGNhbiBiZSBleGVjdXRlZCBpbiAnK2F0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZEluKCkrJyBzZWNvbmRzLicpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1TZXQgdXNhZ2VcbiAgICAgICAgICAgIGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykubm93RXhlY3V0ZWQoKTtcblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURlZmVuY2VcblxuICAgICAgICAgICAgLy9yKCdhdHRhY2snLGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aCxhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgLy9yKCdkZWZlbmNlJyxhdHRhY2tlcl9kZWZlbmNlLmRlZmVuY2UsYXR0YWNrZWRfZGVmZW5jZS5kZWZlbmNlKTtcblxuICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLT1cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2U7XG4gICAgICAgICAgICBpZihhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg8MClhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg9MDtcblxuXG5cbiAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aC09XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgaWYoYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoPDApYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoPTA7XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy9hdHRhY2tlcl9saWZlLmxpZmU9MTAwMDtcbiAgICAgICAgICAgIC8vYXR0YWNrZWRfbGlmZS5saWZlPTEwMDA7XG5cblxuICAgICAgICAgICAgd2hpbGUoXG4gICAgICAgICAgICAgICAgICAgIChhdHRhY2tlcl9hdHRhY2sucm91bmRzIHx8IGF0dGFja2VkX2F0dGFjay5yb3VuZHMpICYmXG4gICAgICAgICAgICAgICAgICAgIChhdHRhY2tlcl9saWZlLmxpZmU+MSAmJiBhdHRhY2tlZF9saWZlLmxpZmU+MSlcbiAgICAgICAgICAgICAgICApe1xuXG4gICAgICAgICAgICAgICAgcigncm91bmQnLGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aCxhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgIHIoJ2xpZmUnLGF0dGFja2VkX2xpZmUubGlmZSxhdHRhY2tlcl9saWZlLmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfbGlmZS5saWZlLT1hdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfbGlmZS5saWZlLT1hdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICBpZihhdHRhY2tlcl9saWZlLmxpZmU8MSlhdHRhY2tlcl9saWZlLmxpZmU9MTtcbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2xpZmUubGlmZTwxKWF0dGFja2VkX2xpZmUubGlmZT0xO1xuXG5cbiAgICAgICAgfVxuXG5cblxuXG4gICAgfVxuKTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIGRlZmVuY2U6ICAgMFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignZGVmZW5jZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCh0aGlzLnBhcmFtcy5kZWZlbmNlKSo4MDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAxfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAwfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4pO1xuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIGxpZmU6ICAgMSxcbiAgICAgICAgbWF4X2xpZmU6ICAgMVxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignbGlmZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW25ldyBULlJlc291cmNlcygpXSk7XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG4pO1xuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgd29vZDogICAwLFxuICAgICAgICBpcm9uOiAgIDAsXG4gICAgICAgIGNsYXk6ICAgMCxcbiAgICAgICAgc3RvbmU6ICAgMFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignbWluZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCh0aGlzLnBhcmFtcy5hbW91bnQpKjM2MDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgNH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBvciBtYXliZSBleGVjdXRlXG4gICAgICAgIH0qL1xuXG5cblxuXG4gICAgfVxuKTtcblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgc3BlZWQ6ICAgMFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignbW92ZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKChNYXRoLnBvdyh0aGlzLnBhcmFtcy5zcGVlZCwyKSkqMTAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMH0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDF9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBleGVjdXRlKGdhbWUsb2JqZWN0LGRlc3RpbmF0aW9ucy8qLG9iamVjdHNfbmVhcmJ5LHJlc291cmNlcyovKXtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBhY3Rpb24vL3RvZG8gbWF5YmUgYXV0b1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKTtcbiAgICAgICAgICAgIGlmKGFjdGlvbiBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0IGhhcyBub3QgYWJpbGl0eSB0byBtb3ZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIHZhciBzdGFydF9wb3NpdGlvbj1vYmplY3QuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9ucy51bnNoaWZ0KHN0YXJ0X3Bvc2l0aW9uKTtcblxuICAgICAgICAgICAgLy9yKGRlc3RpbmF0aW9ucyk7XG5cbiAgICAgICAgICAgIG9iamVjdC5wYXRoID0gVC5QYXRoLm5ld0NvbnN0YW50U3BlZWQoZGVzdGluYXRpb25zLGFjdGlvbi5wYXJhbXMuc3BlZWQpO1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlLy90b2RvIG1heWJlIGF1dG9cbiAgICAgICAgICAgIG9iamVjdC5nZXRBY3Rpb24oJ21vdmUnKS5ub3dFeGVjdXRlZCgpOy8vdG9kbyBpcyBpdCBuZWVkZWRcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypzdGF0aWMgdGljaygpey8vdG9kbyBtYXliZSA/Pz8gdG9kb1xuICAgICAgICB9Ki9cblxuXG4gICAgfVxuKTtcblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHJlZ2VuZXJhdGU6ICAgMTAwLFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybigncmVnZW5lcmF0ZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCgxL3RoaXMucGFyYW1zLnJlZ2VuZXJhdGUpKjM2MDAqMC4wNSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgNH0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMn0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypzdGF0aWMgZXhlY3V0ZSgpey8vdG9kbyBtYXliZSB0aWNrPz8/P1xuICAgICAgICB9Ki9cblxuXG5cblxuICAgIH1cbik7XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICByZXBhaXI6ICAgMFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybigncmVwYWlyJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKDEvKHRoaXMucGFyYW1zLnJlcGFpci8xMDApKSoxMDAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDR9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDR9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIGV4ZWN1dGUoKXtcbiAgICAgICAgICAgIC8vdG9kb1xuICAgICAgICB9Ki9cblxuXG5cblxuICAgIH1cbik7XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHRocm91Z2hwdXQ6ICAgMFxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybigndGhyb3VnaHB1dCcpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKChNYXRoLnBvdyh0aGlzLnBhcmFtcy50aHJvdWdocHV0LzEwMCwyKSkqMTAqMC4wNSk7Ly90b2RvXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCl7XG5cbiAgICAgICAgICAgIHJldHVybihbXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6ICAxfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
