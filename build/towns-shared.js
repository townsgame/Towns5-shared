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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwLXRvd25zLW5hbWVzcGFjZS50cyIsIjA1LWxvZy50cyIsIjEwLV9wb3NpdGlvbi8xMC1jb2xvci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wYXRoLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLTNkLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLXBvbGFyLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzEwLXBvc2l0aW9uLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzE1LXBvc2l0aW9uLWRhdGUuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMjAtYXJlYS5jbGFzcy50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMTAtcmVzb3VyY2VzLmNsYXNzLnRzIiwiMTAtdG1hdGguc3RhdGljLnRzIiwiMTAtdXNlci5jbGFzcy50cyIsIjIwLXdvcmxkLzAwLXRlcnJhaW5zLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMTAtbWFwLWdlbmVyYXRvci5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzIwLWdhbWUuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvYXR0YWNrLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL2RlZmVuY2UudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbGlmZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9taW5lLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21vdmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvcmVnZW5lcmF0ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZXBhaXIudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvdGhyb3VnaHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7R0FHRztBQUNILHdIQUF3SDtBQUV4SDs7O0dBR0c7QUFFSCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDWCxNQUFNLENBQUMsT0FBTyxHQUFJLENBQUMsQ0FBQztBQ1pwQjs7R0FFRztBQUdILElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FDTGxDOzs7R0FHRztBQUNILHdIQUF3SDtBQUd4SCxJQUFPLENBQUMsQ0EySFA7QUEzSEQsV0FBTyxDQUFDLEVBQUMsQ0FBQztJQUNOOztPQUVHO0lBQ0g7UUFFSTs7Ozs7O1dBTUc7UUFDSCxlQUFtQixDQUFTLEVBQVEsQ0FBUyxFQUFRLENBQVMsRUFBUSxDQUFPO1lBQWQsaUJBQWMsR0FBZCxPQUFjO1lBQTFELE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUSxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVEsTUFBQyxHQUFELENBQUMsQ0FBUTtZQUFRLE1BQUMsR0FBRCxDQUFDLENBQU07WUFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFB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QUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7NEJBQzlCLENBQUM7NEJBR0QsVUFBVTs0QkFHViw2QkFBNkI7NEJBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUU5QixHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4SixHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4SixHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQzs0QkFFckIsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FFSixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FB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LEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUc5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dDQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FFbkQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQ0FFNUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztvQ0FDaEMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0NBQzVDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29DQUU1QyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0NBRTlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8saUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQzt3Q0FDL0MsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFB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QUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQzlILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztZQUMzSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO1lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztZQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztZQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7WUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO1lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUMxSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDM0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBQyxDQUFDO1lBQ2xJLElBQUksQ0FBQyxDQUFD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Q0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFHdnZLLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFFdkIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDOUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztZQUM5QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFHLENBQUMsQ0FBQyxLQUFLLENB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QztZQXJCVSxlQUFPLEdBQWQ7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUdELGdDQUFjLEdBQWQ7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU07WUFDM0UsQ0FBQztZQUdELG1DQUFpQixHQUFqQjtnQkFFSSxNQUFNLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7aUJBQy9CLENBQUMsQ0FBQztZQUNQLENBQUM7WUFHTCxjQUFDO1FBQUQsQ0F4QkEsQUF3QkMsQ0F4QmEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBd0IxQixDQUNKLENBQUM7SUFFTixDQUFDLEVBakNRLEtBQUssR0FBTCxPQUFLLEtBQUwsT0FBSyxRQWlDYjtBQUFELENBQUMsRUFqQ00sQ0FBQyxLQUFELENBQUMsUUFpQ1AiLCJmaWxlIjoidG93bnMtc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5cbnZhciBUID0ge307XG5tb2R1bGUuZXhwb3J0cyA9ICBUO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhlam55IG9uIDE0LjguMTYuXG4gKi9cblxuXG52YXIgciA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuQ29sb3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuICAgIC8qKlxuICAgICAqIE9iamVjdCB3aGljaCByZXByZXNlbnRzIFJHQkEgY29sb3IuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIENvbG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHIgcmVkIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGcgZ3JlZW4gZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKiBAcGFyYW0gYiBibHVlIGZyb20gMCB0byAyNTVcbiAgICAgICAgICogQHBhcmFtIGEgYWxwaGEgZnJvbSAwIHRvIDI1NVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlcixwdWJsaWMgZzogbnVtYmVyLHB1YmxpYyBiOiBudW1iZXIscHVibGljIGEgPSAyNTUpIHtcbiAgICAgICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgICAgICB0aGlzLmcgPSBnO1xuICAgICAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGRlZXAgY2xvbmUgb2QgVC5Db2xvclxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn1cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCk6Q29sb3J7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucix0aGlzLmcsdGhpcy5iLHRoaXMuYSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZHMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgICAgIHRoaXMuYSA9IE1hdGgucm91bmQodGhpcy5hKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuciA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmcgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNzcyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDc3NDb2xvcigpIHtcblxuICAgICAgICAgICAgdGhpcy5ib3VuZHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmEgPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3IoJ3JnYmEoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJywgJyArIE1hdGgucm91bmQodGhpcy5hLzI1NSoxMDApLzEwMCArICcpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29sb3IgKGlnbm9yZXMgYWxwaGEgY2hhbmVsLilcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gZWcuICMwMGZmMDBcbiAgICAgICAgICovXG4gICAgICAgIGdldEhleCgpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gJyMnICsgKCgxIDw8IDI0KSArICh0aGlzLnIgPDwgMTYpICsgKHRoaXMuZyA8PCA4KSArIHRoaXMuYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBuZXcgVC5Db2xvciBmb3JtIGhleCBjb2RlIG9mIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXggY29kZSBvZiBjb2xvciBlZy4gIzAwZmYwMFxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjcmVhdGVGcm9tSGV4KGhleDogc3RyaW5nKTogQ29sb3Ige1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0OkNvbG9yICwgc2hvcnRoYW5kUmVnZXg6IFJlZ0V4cCwgcmVzdWx0UmVnZXg6IFJlZ0V4cEV4ZWNBcnJheTtcblxuICAgICAgICAgICAgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0UmVnZXggPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRSZWdleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzJdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHJlc3VsdFJlZ2V4WzNdLCAxNilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY3JlYXRpbmcgVC5Db2xvciBmcm9tICcgKyBoZXgpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5QYXRoXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVHtcblxuICAgIGV4cG9ydCBjbGFzcyBQYXRoIHtcblxuICAgICAgICBwdWJsaWMgYXJyYXlfcG9zaXRpb25fZGF0ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHsuLi5ULlBvc2l0aW9uRGF0ZX0gUG9zaXRpb24gd2l0aCBkYXRlIGF0IGxlYXN0IDJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblxuXG4gICAgICAgICAgICAvL3RvZG8gbWF5YmUvL2lmKGFyZ3MubGVuZ3RoPT09MSAmJiBhcmdzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy8gICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJnc1swXTtcbiAgICAgICAgICAgIC8vdG9kbyBtYXliZS8vfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUgPSBhcmdzO1xuICAgICAgICAgICAgLy90b2RvIG1heWJlLy99XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25fZGF0ZTogUG9zaXRpb25EYXRlLCBsYXN0X2RhdGUgPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggbXVzdCBiZSBULlBvc2l0aW9uRGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsYXN0X2RhdGUgPj0gcG9zaXRpb25fZGF0ZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZXMgc2hvdWxkIGJlIGNvbnNlY3V0aXZlIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCAoJyArIHBvc2l0aW9uX2RhdGUuZGF0ZSArICcgc2hvdWxkIGJlIGFmdGVyICcgKyBsYXN0X2RhdGUgKyAnKS4gJyArIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSA9IHBvc2l0aW9uX2RhdGUuZGF0ZTtcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheS48VC5Qb3NpdGlvbj59IGFycmF5X3Bvc2l0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUGF0aH1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uOiBBcnJheSwgc3BlZWQ6IG51bWJlciwgZGF0ZSA9IDApOiBQYXRoIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oc3BlZWQgLyAxKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSB2YWxpZCBudW1iZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlZWQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlZWQgbXVzdCBiZSBwb3NpdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFycmF5X3Bvc2l0aW9uLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXJyYXlfcG9zaXRpb25fZGF0ZSA9IFtcbiAgICAgICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25bMF0ueCwgYXJyYXlfcG9zaXRpb25bMF0ueSwgZGF0ZSlcbiAgICAgICAgICAgIF07XG5cblxuICAgICAgICAgICAgdmFyIGxhc3RfcG9zaXRpb24gPSBhcnJheV9wb3NpdGlvblswXTtcblxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGU6IFBvc2l0aW9uRGF0ZSwgZGlzdGFuY2U6IG51bWJlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxLCBsID0gYXJyYXlfcG9zaXRpb24ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbl9kYXRlID0gYXJyYXlfcG9zaXRpb25baV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIFBhcmFtcyB3aGVuIGNvbnN0cnVjdGluZyBULlBhdGggdmlhIG5ld0NvbnN0YW50U3BlZWQgbXVzdCBiZSBULlBvc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGxhc3RfcG9zaXRpb24uZ2V0RGlzdGFuY2UocG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLyAxICsgZGlzdGFuY2UgLyBzcGVlZCAqIDEwMDApO1xuXG5cbiAgICAgICAgICAgICAgICBsYXN0X3Bvc2l0aW9uID0gcG9zaXRpb25fZGF0ZTtcblxuXG4gICAgICAgICAgICAgICAgYXJyYXlfcG9zaXRpb25fZGF0ZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25baV0ueCwgYXJyYXlfcG9zaXRpb25baV0ueSwgZGF0ZSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9yZXR1cm4gbmV3IHRoaXMuYXBwbHkodGhpcyxhcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgICAgIC8vcmV0dXJuIE9iamVjdC5jcmVhdGUoVC5QYXRoLGFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBhdGgoLi4uYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBnZXRQb3NpdGlvbnMoKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaCh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuKHBvc2l0aW9ucyk7XG4gICAgICAgIH1cblxuXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudCBpbiB3aGljaCBzZWdtZW50IGlzIFQuUGF0aCBwcm9ncmVzc1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTZWdtZW50KGRhdGU6IERhdGUpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAxXS5kYXRlIDw9IGRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluIHByb2dyZXNzXG5cbiAgICAgICAgICAgIHZhciBBOiBQb3NpdGlvbkRhdGUsIEI6UG9zaXRpb25EYXRlLCB4OiBudW1iZXIsIHk6IG51bWJlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDE7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW2ldLmRhdGUgLyAxO1xuICAgICAgICAgICAgICAgIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaSArIDFdLmRhdGUgLyAxO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpKycoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJygnKyhBLWRhdGUpKycgLSAnKyhCLWRhdGUpKycpJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoQSA8PSBkYXRlICYmIEIgPiBkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnPC0tLXRoaXMnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjb3VudGluZyBzZWdtZW50IGluIFQuUGF0aCwgbWF5YmUgYmVjYXVzZSBvZiBwYXJhbSBkYXRlIGlzICcgKyBkYXRlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHBvc2l0aW9uIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudFBvc2l0aW9uKGRhdGUgPSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Ob3Qgc3RhcnRlZCBvciBmaW5pc2hlZFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVt0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoIC0gMV0uZGF0ZSA8PSBkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW4gcHJvZ3Jlc3NcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkpO1xuXG4gICAgICAgICAgICB2YXIgeCA9IFQuVE1hdGgucHJvcG9ydGlvbnMoQS5kYXRlIC8gMSwgZGF0ZSAvIDEsIEIuZGF0ZSAvIDEsIEEueCwgQi54KTtcbiAgICAgICAgICAgIHZhciB5ID0gVC5UTWF0aC5wcm9wb3J0aW9ucyhBLmRhdGUgLyAxLCBkYXRlIC8gMSwgQi5kYXRlIC8gMSwgQS55LCBCLnkpO1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHgsIHkpKTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3VudHMgcm90YXRpb24gYXQgJ2RhdGUnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICovXG4gICAgICAgIGNvdW50Um90YXRpb24oZGF0ZSA9IDApIHtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBCQSA9IEIuZ2V0UG9zaXRpb24oKS5wbHVzKEEuZ2V0UG9zaXRpb24oKS5tdWx0aXBseSgtMSkpO1xuXG4gICAgICAgICAgICB2YXIgcG9sYXIgPSBCQS5nZXRQb3NpdGlvblBvbGFyKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEJBLHBvbGFyKTtcblxuICAgICAgICAgICAgcmV0dXJuIChwb2xhci5nZXREZWdyZWVzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIFNwZWVkIGF0ICdkYXRlJ1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBmaWVsZHMvc1xuICAgICAgICAgKi9cbiAgICAgICAgY291bnRTcGVlZChkYXRlOiBEYXRlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluUHJvZ3Jlc3MoZGF0ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50ICsgMV07XG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IEEuZ2V0RGlzdGFuY2UoQik7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBCLmRhdGUgLSBBLmRhdGU7XG5cbiAgICAgICAgICAgIHJldHVybiAoZGlzdGFuY2UgLyAoZHVyYXRpb24gLyAxMDAwKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBhdGggaW4gcHJvZ3Jlc3MgKHRydWUpIG9yIGl0IGhhcyBub3Qgc3RhcnRlZChmYWxzZSkgb3IgaXQgaXMgZmluaXNoZWQoZmFsc2UpP1xuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpblByb2dyZXNzKGRhdGU6IERhdGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aCAtIDFdLmRhdGUgPD0gZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8gbWF5YmUgY291bnRQcm9ncmVzc1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFQuUGF0aCB0byBzdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5qb2luKCcsICcpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbjNEXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVCB7XG5cblxuICAgIGludGVyZmFjZSBQb3NpdGlvbjNET2JqZWN0IHtcbiAgICAgICAgeDpudW1iZXI7XG4gICAgICAgIHk6bnVtYmVyO1xuICAgICAgICB6Om51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24zRCB7XG5cbiAgICAgICAgcHVibGljIHg6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHk6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHo6IG51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb24zRE9iamVjdCwgeT86IG51bWJlciwgej86IG51bWJlcikge1xuXG4gICAgICAgICAgICBsZXQgeDpudW1iZXI7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeF9vcl9vYmplY3QgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdC54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0Lnk7XG4gICAgICAgICAgICAgICAgdGhpcy56ID0geF9vcl9vYmplY3QuejtcblxuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnbnVtYmVyJyl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4X29yX29iamVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMueiA9IHo7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24zRCh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFBvc2l0aW9uM0QgdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMueCArICcsJyArIHRoaXMueSArICcsJyArIHRoaXMueiArICddJztcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFBvc2l0aW9uUG9sYXJcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvblBvbGFyIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlzdGFuY2U6IG51bWJlcixwdWJsaWMgZGVncmVlczogbnVtYmVyKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMuZGlzdGFuY2UsdGhpcy5kZWdyZWVzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpICogdGhpcy5kaXN0YW5jZVxuICAgICAgICAgICAgKSk7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZSgpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2U7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0RGVncmVlcygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRlZ3JlZXMgKyAzNjApICUgMzYwO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJhZGlhbnMoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBULlRNYXRoLmRlZzJyYWQodGhpcy5kZWdyZWVzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy5kaXN0YW5jZSArICcsJyArIHRoaXMuZGVncmVlcyArICfCsCc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbiB7XG4gICAgICAgIHg6bnVtYmVyO1xuICAgICAgICB5Om51bWJlcjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXBcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUG9zaXRpb24ge1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhfb3Jfb2JqZWN0X29yX3N0cmluZzogbnVtYmVyIHwgUG9zaXRpb24gfCBzdHJpbmcsIHk/OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0X29yX3N0cmluZyA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy54O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy55O1xuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIGlmKHR5cGVvZiB4X29yX29iamVjdF9vcl9zdHJpbmcgPT09ICdzdHJpbmcnKXtcblxuICAgICAgICAgICAgICAgIGlmICgvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeF9vcl9vYmplY3Rfb3Jfc3RyaW5nKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4X3k6QXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHhfeSA9IHhfb3Jfb2JqZWN0X29yX3N0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHhfeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHBhcnNlRmxvYXQoeF95WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBjcmVhdGluZyBQb3NpdGlvbiwgc3RyaW5nIG11c3QgYmUgaW4gZm9ybWF0IHgseSBub3QgJyt4X29yX29iamVjdF9vcl9zdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeF9vcl9vYmplY3Rfb3Jfc3RyaW5nID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geF9vcl9vYmplY3Rfb3Jfc3RyaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG8gY2hlY2tcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY29uc3RydWN0b3IgcGFyYW1zIHdoaWxlIGNyZWF0aW5nIFQuUG9zaXRpb24hJyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwbHVzKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMueSArPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBtaW51cyhwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy54IC09IHBvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLnkgLT0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG11bHRpcGx5KGs6IG51bWJlcikge1xuXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggKiBrO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55ICogaztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEZsb29yZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24oTWF0aC5mbG9vciggdGhpcy54KSxNYXRoLmZsb29yKCB0aGlzLnkpKTtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQb3NpdGlvblBvbGFyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uUG9sYXIoXG4gICAgICAgICAgICAgICAgVC5UTWF0aC54eTJkaXN0KHRoaXMueCwgdGhpcy55KSxcbiAgICAgICAgICAgICAgICBULlRNYXRoLnJhZDJkZWcoTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCkpXG4gICAgICAgICAgICApKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXREaXN0YW5jZShwb3NpdGlvbjogUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdChwb3NpdGlvbi54IC0gdGhpcy54LCBwb3NpdGlvbi55IC0gdGhpcy55KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZygpIHtcblxuICAgICAgICAgICAgcmV0dXJuICcnICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJyc7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBQb3NpdGlvbkRhdGVPYmplY3Qge1xuICAgICAgICB4Om51bWJlcjtcbiAgICAgICAgeTpudW1iZXI7XG4gICAgICAgIGRhdGU6RGF0ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXAgd2l0aCB0aW1lXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uRGF0ZSBleHRlbmRzIFQuUG9zaXRpb24gey8vdG9kbyBpcyB0aGFyZSBzb2x1dGlvbiB3aXRob3V0IHVzaW5nIFQuP1xuXG4gICAgICAgIHB1YmxpYyB4Om51bWJlcjtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgZGF0ZTpEYXRlO1xuXG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4X29yX29iamVjdDogbnVtYmVyIHwgUG9zaXRpb25EYXRlT2JqZWN0LCB5PzogbnVtYmVyLCBkYXRlPzogbnVtYmVyIHwgRGF0ZSA9IDApIHtcblxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHhfb3Jfb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgcG9zaXRpb25EYXRlT2JqZWN0OlBvc2l0aW9uRGF0ZU9iamVjdDtcbiAgICAgICAgICAgICAgICAvL3Bvc2l0aW9uRGF0ZU9iamVjdCA9IHg7XG5cbiAgICAgICAgICAgICAgICB4ID0geF9vcl9vYmplY3QueDtcbiAgICAgICAgICAgICAgICB5ID0geF9vcl9vYmplY3QueTtcbiAgICAgICAgICAgICAgICBkYXRlID0geF9vcl9vYmplY3QuZGF0ZTtcblxuXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB4X29yX29iamVjdCA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIHggPSB4X29yX29iamVjdDtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xuXG5cbiAgICAgICAgICAgIHZhciBkYXRlT2JqZWN0OiBEYXRlO1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gbmV3IERhdGUoZGF0ZS8xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKGRhdGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gZGF0ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZU9iamVjdCAvIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBjb25zdHJ1Y3QgUG9zaXRpb25EYXRlIGlzIG5lZWRlZCB2YWxpZCBEYXRlIG5vdCAnICsgZGF0ZSArICcuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBQb3NpdGlvbiB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJ1snICsgdGhpcy54ICsgJywnICsgdGhpcy55ICsgJ10gYXQgJyArXG4gICAgICAgICAgICAgICAgKHRoaXMuZGF0ZS5nZXREYXkoKSArIDEpICsgJy4nICsgKHRoaXMuZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLicgKyB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArXG4gICAgICAgICAgICAgICAgJyAnICsgdGhpcy5kYXRlLmdldEhvdXJzKCkgKyAnOicgKyB0aGlzLmRhdGUuZ2V0TWludXRlcygpICsgJzonICsgdGhpcy5kYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM6IEFycmF5O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLnBvc2l0aW9uczpULlBvc2l0aW9uW10pIHtcblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9ucy5sZW5ndGg8Myl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBwb2ludHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gcG9zaXRpb25zWzBdLmdldERpc3RhbmNlKHBvc2l0aW9uc1sxXSk7XG4gICAgICAgICAgICB2YXIgYSA9IHBvc2l0aW9uc1sxXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuICAgICAgICAgICAgdmFyIGIgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzJdKTtcblxuICAgICAgICAgICAgLy9yKGEsYixjKTtcblxuICAgICAgICAgICAgaWYoYStiPmMgJiYgYitjPmEgJiYgYStjPmIpe31lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgdGhyZWUgcG9pbnRzIGFyZSBpbiBsaW5lLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXNDb250YWluaW5nKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAvL3RvZG8gd29ya2luZyBvbmx5IGZvciBjb252ZXggYXJlYXNcblxuICAgICAgICAgICAgdmFyIHRlc3RzaWRlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgaWE6IG51bWJlcixcbiAgICAgICAgICAgICAgICBpYjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb246IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiBib29sZWFuO1xuICAgICAgICAgICAgZm9yKHRlc3RzaWRlPTA7dGVzdHNpZGU8Mjt0ZXN0c2lkZSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIHNpZGVjb2xsaXNpb249ZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlhID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWIgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGliID09IHRoaXMucG9zaXRpb25zLmxlbmd0aClpYiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbGxpc2lvbj09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlY29sbGlzaW9uPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKnIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArICh0ZXN0c2lkZS0wLjUpKjEwMDAwMDAwMDAvL3RvZG8gYmV0dGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICApOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmICghc2lkZWNvbGxpc2lvbilyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIFQuQXJyYXlGdW5jdGlvbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5tb2R1bGUgVCB7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZnVuY3Rpb25zIHRvIG1hbmlwdWxhdGUgd2l0aCBhcnJheS5cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQXJyYXlGdW5jdGlvbnMge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBLZXkgb2Ygb2JqZWN0IHdpdGggdGhpcyBJRCwgLTEgaWYgbm90IGV4aXN0XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWQyaShhcnJheTogQXJyYXksIGlkOnN0cmluZyk6YW55IHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcblxuICAgICAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JfbWVzc2FnZSB3aGVuIGl0ZW4gbm90IGV4aXN0c1xuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBPYmplY3Qgd2l0aCB0aGlzIElELCBudWxsIGlmIG5vdCBleGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGlkMml0ZW0oYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nLCBlcnJvcl9tZXNzYWdlID0gJycpOmFueSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogRGVsZXRlIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgaWRSZW1vdmUoYXJyYXk6IEFycmF5LCBpZDogc3RyaW5nKTpib29sZWFuIHsvL3RvZG8gcmVmYWN0b3IgdXNlIHRoaXMgbm90IHNwbGljZVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbD1hcnJheS5sZW5ndGg7aTxsO2krKykge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggMkQgYXJyYXlcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpdGVyYXRlMkQoYXJyYXk6IEFycmF5LCBjYWxsYmFjazogRnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgICAgICAvL3IoYXJyYXkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgeUxlbiA9IGFycmF5Lmxlbmd0aDsgeSA8IHlMZW47IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4TGVuID0gYXJyYXlbeV0ubGVuZ3RoOyB4IDwgeExlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeSwgeCk7XG4gICAgICAgICAgICAgICAgICAgIC8qdG9kbyByZWZhY3RvciB0byB4LHkqL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIGZyb21cbiAgICAgICAgICogQHBhcmFtIHRvXG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBSZW1vdmVkIGl0ZW1zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgcmVtb3ZlSXRlbXMoYXJyYXk6QXJyYXksIGZyb206bnVtYmVyLCB0bzpudW1iZXIpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKiogdG9kbyBzaG91bGQgaXQgYmUgdW5kZXIgVC5BcnJheUZ1bmN0aW9uc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JlY3RcbiAgICAgICAgICogQHBhcmFtIHthcnJheX0gcGF0aFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGZpbHRlclBhdGgob2JqZWN0OiBPYmplY3QsIHBhdGg6IEFycmF5PHN0cmluZz4sIHNldFZhbHVlOiBhbnkpOmFueSB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aF9pIGluIHBhdGgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBvYmplY3Rfa2V5ID0gcGF0aFtwYXRoX2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhdGhfaSA8IHBhdGgubGVuZ3RoIC0gMSB8fCB0eXBlb2Ygc2V0VmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtvYmplY3Rfa2V5XSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rocm93IG5ldyBFcnJvcignZmlsdGVyUGF0aDogS2V5IFxcJycrb2JqZWN0X2tleSsnXFwnIGluIHBhdGggaW4gb2JqZWN0IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W29iamVjdF9rZXldO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3Rbb2JqZWN0X2tleV0gPSBzZXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBBcnJheSBjb250YWluaW5nIG9ubHkgdW5pcXVlIHZhbHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHVuaXF1ZShhcnJheTogQXJyYXkpOkFycmF5IHtcbiAgICAgICAgICAgIHZhciBuID0ge30sIHIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIG5bYXJyYXlbaV1dID0gYXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgaHRtbCB0YWJsZSBmcm9tIEpTIGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IGFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsX2NsYXNzXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhcnJheTJ0YWJsZShhcnJheTpBcnJheSwgYWRkaXRpb25hbF9jbGFzcyA9ICcnKTpzdHJpbmcge1xuICAgICAgICAgICAgLy90b2RvIGNoZWNrXG5cbiAgICAgICAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgICAgICAgIHZhciByb3dzID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbHNfdGFibGUgPSBhcnJheVswXS5sZW5ndGg7Ly90b2RvIGlzIGlzIGJlc3Qgc29sdXRpb24/XG5cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRhYmxlIGNsYXNzPVwiJyArIGFkZGl0aW9uYWxfY2xhc3MgKyAnXCI+JztcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG5cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbHMgPSBhcnJheVtyb3ddLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgY29sc19zcGFuID0gY29sc190YWJsZSAtIGNvbHM7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBjb2xzOyBjb2wrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gY29scyAtIDEgJiYgY29sc19zcGFuICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjb2xzcGFuPVwiJyArIChjb2xzX3NwYW4gKyAxKSArICdcIj4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYXJyYXlbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RkPic7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgICAgICAgIHJldHVybiAoaHRtbCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGV4dHJhY3Qga2V5cyBmcm9tIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldEtleXMob2JqZWN0Ok9iamVjdCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvYmplY3QpIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuXG4gICAgLyoqXG4gICAgICogR2FtZSBjb25kaXRpb25zXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xuXG4gICAgICAgIHB1YmxpYyBhY3Rpb25fY2xhc3NlczpPYmplY3Q7XG4gICAgICAgIHB1YmxpYyBhY3Rpb25fZW1wdHlfaW5zdGFuY2VzOk9iamVjdDtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXhfbGlmZV9tb2RpZmllclxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmljZV9rZXlfbW9kaWZpZXJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWF4X2xpZmVfbW9kaWZpZXI6RnVuY3Rpb24sIHB1YmxpYyBwcmljZV9rZXlfbW9kaWZpZXI6RnVuY3Rpb24pIHtcblxuICAgICAgICAgICAgdGhpcy5hY3Rpb25fY2xhc3NlcyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzID0ge307XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7YXJyYXl9IG9mIG51bWJlcnNcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0OlQuT2JqZWN0KSB7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlcyA9IFtdO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbiBvYmplY3QgJyArIG9iamVjdCArICcgdGhlcmUgYXJlIG5vIGFjdGlvbnMhJyk7Ly90b2RvIGFsbCBvYmplY3RzIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gc3RyaW5nIGxpa2UgdGhpc1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIG9iamVjdC5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbjphbnkpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX2Jhc2UgPSBNYXRoLmNlaWwoYWN0aW9uLmNvdW50UHJpY2VCYXNlKCkpOy8vXG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgTmFOICB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihwcmljZV9iYXNlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnICsgYWN0aW9uLnR5cGUgKyAnIG1ha2VzIHByaWNlIGJlc2UgTmFOLicpO1xuICAgICAgICAgICAgICAgICAgICBwcmljZV9iYXNlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgbm9uIG5lZ2F0aXZlIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHByaWNlX2Jhc2UgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1zIGluIGFjdGlvbiBhYmlsaXR5ICcgKyBhY3Rpb24udHlwZSArICcgc2hvdWxkIG5vdCBtYWtlIHRoaXMgYWN0aW9uIG5lZ2F0aXZlJyk7Ly90b2RvIG1heWJlIG9ubHkgd2FyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgcHJpY2VfYmFzZXMucHVzaChwcmljZV9iYXNlKTtcblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChwcmljZV9iYXNlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSBtYXhpbXVtIGxpZmUgb2Ygb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBnZXRPYmplY3RNYXhMaWZlKG9iamVjdDpULk9iamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gcHJpY2VfYmFzZXMucmVkdWNlKGZ1bmN0aW9uIChwdiwgY3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHYgKyBjdjtcbiAgICAgICAgICAgIH0sIDApO1xuXG5cbiAgICAgICAgICAgIHByaWNlX2Jhc2UgPSB0aGlzLm1heF9saWZlX21vZGlmaWVyKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlX2Jhc2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBvZiBSZXNvdXJjZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlcyhvYmplY3QpIHtcblxuXG4gICAgICAgICAgICB2YXIgcHJpY2VfYmFzZXMgPSB0aGlzLmdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KTtcblxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcHJpY2VzID0gW107XG5cblxuICAgICAgICAgICAgdmFyIGRlc2lnbl9yZXNvdXJjZXMgPSBvYmplY3QuZ2V0TW9kZWwoKS5hZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCk7XG5cblxuICAgICAgICAgICAgb2JqZWN0LmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uOmFueSwgaTpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmdldFByaWNlUmVzb3VyY2VzKCkuc29ydChmdW5jdGlvbiAoYTphbnksIGI6YW55KSB7Ly90b2RvIGlzIGl0IHNhZmU/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNpZ25fcmVzb3VyY2VzLmNvbXBhcmUoYS5jbG9uZSgpLnNpZ251bSgpKSAtIGRlc2lnbl9yZXNvdXJjZXMuY29tcGFyZShiLmNsb25lKCkuc2lnbnVtKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VfcmVzb3VyY2VzID0gcHJpY2VfcmVzb3VyY2VzX2xpc3RbMF0uY2xvbmUoKTtcblxuXG4gICAgICAgICAgICAgICAgcHJpY2VfcmVzb3VyY2VzLm11bHRpcGx5KHByaWNlX2Jhc2VzW2ldKTtcbiAgICAgICAgICAgICAgICBwcmljZXMucHVzaChwcmljZV9yZXNvdXJjZXMpO1xuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSBSZXNvdXJjZXMgLSBwcmljZSBvZiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByaWNlKG9iamVjdDpULk9iamVjdHMpIHtcblxuICAgICAgICAgICAgdmFyIHByaWNlID0gbmV3IFQuUmVzb3VyY2VzKHt9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW1wdHkgcHJpY2UnLHByaWNlKTtcblxuICAgICAgICAgICAgdmFyIHByaWNlcyA9IHRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmljZV8pIHtcblxuICAgICAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJpY2UuYXBwbHkodGhpcy5wcmljZV9rZXlfbW9kaWZpZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHByaWNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBpbnN0YWxsQWN0aW9uQ2xhc3MoYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtczpPYmplY3QsIGFjdGlvbl9jbGFzczphbnkpIHtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25fY2xhc3MuZ2V0VHlwZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IGFjdGlvbiBjbGFzcyBoYXMgbm8gdHlwZSEnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IHRoZXJlIGlzIGFscmVhZHkgaW5zdGFsbGVkIGFjdGlvbiB3aXRoIHR5cGUgJyArIHR5cGUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25fZW1wdHlfaW5zdGFuY2UgPSBuZXcgYWN0aW9uX2NsYXNzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogYWN0aW9uX2VtcHR5X2luc3RhbmNlX3BhcmFtc1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgLy9BZGRpbmcgbWV0aG9kIGNsb25lIHRvIGluc3RhbGxlZCBhY3Rpb24gY2xhc3NcbiAgICAgICAgICAgIGFjdGlvbl9jbGFzcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgYWN0aW9uX2NsYXNzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gPSBhY3Rpb25fY2xhc3M7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbl9lbXB0eV9pbnN0YW5jZXNbdHlwZV0gPSBhY3Rpb25fZW1wdHlfaW5zdGFuY2U7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBY3Rpb25DbGFzcyhhY3Rpb25fdHlwZTpzdHJpbmcpIHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuYWN0aW9uX2NsYXNzZXNbYWN0aW9uX3R5cGVdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbl9jbGFzcyA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJyArIGFjdGlvbl90eXBlICsgJy4gVGhlcmUgYXJlIG9ubHkgdGhlc2UgYWN0aW9uIHR5cGVzOiAnICsgVC5BcnJheUZ1bmN0aW9ucy5nZXRLZXlzKHRoaXMuYWN0aW9uX2NsYXNzZXMpLmpvaW4oJywgJykpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoYWN0aW9uX2NsYXNzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBuZXdBY3Rpb25JbnN0YW5jZShhY3Rpb246YW55KSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyBzb2x2ZSBkZWZlbnNlIHZzLiBkZWZlbmNlXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdkZWZlbnNlJykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi50eXBlID0gJ2RlZmVuY2UnO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5wYXJhbXMuZGVmZW5jZSA9IGFjdGlvbi5wYXJhbXMuZGVmZW5zZTtcbiAgICAgICAgICAgICAgICBkZWxldGUgYWN0aW9uLnBhcmFtcy5kZWZlbnNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2NsYXNzID0gdGhpcy5nZXRBY3Rpb25DbGFzcyhhY3Rpb24udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgYWN0aW9uX2NsYXNzKGFjdGlvbik7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNyZWF0ZUFjdGlvbkV4ZWN1dGUoYWN0aW9uX3R5cGU6c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHZhciBnYW1lID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGUpO1xuXG5cbiAgICAgICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChnYW1lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25fY2xhc3MuZXhlY3V0ZS5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGV4ZWN1dGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRBY3Rpb25FbXB0eUluc3RhbmNlKGFjdGlvbl90eXBlOnN0cmluZykge1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uX2luc3RhbmNlID0gdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25faW5zdGFuY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJyArIGFjdGlvbl90eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChhY3Rpb25faW5zdGFuY2UpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypnZXRBY3Rpb25FeGVjdXRlKGFjdGlvbl9rZXkpe1xuXG4gICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25fY2xhc3Nlc1thY3Rpb25fa2V5XTtcblxuICAgICAgICAgaWYodHlwZW9mIGFjdGlvbj09J3VuZGVmaW5lZCcpdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFjdGlvbiB0eXBlICcrYWN0aW9uX2tleSsnLicpO1xuXG4gICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG5cblxuXG4gICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgIHZhciBhcmdzID0gW2dhbWVdLnB1c2guY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlX2NhbGxiYWNrLmFwcGx5KHRoaXMsYXJncyk7XG5cbiAgICAgICAgIH07XG5cblxuXG4gICAgICAgICByZXR1cm4oZXhlY3V0ZSk7XG4gICAgICAgICB9Ki9cblxuICAgIH1cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5HYW1lLkFjdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuR2FtZSB7XG5cbiAgICBleHBvcnQgY2xhc3MgQWN0aW9uIHtcblxuXG4gICAgICAgIHB1YmxpYyBsYXN0X3VzZTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IoYWN0aW9uOk9iamVjdCkge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uc3RydWN0b3IuZ2V0VHlwZSA9PT0gJ3VuZGVmaW5lZCcpdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBleHRlbmQgVC5HYW1lLkFjdGlvbiBhbmQgYWRkIG1ldGhvZCBnZXRUeXBlIGJlZm9yZSBjcmVhdGluZyBpbnN0YW5jZXMhJyk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlKCk7XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gdHlwZSl0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgJyArIHR5cGUgKyAnIG5vdCAnICsgYWN0aW9uLnR5cGUgKyAnIGNsYXNzIScpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXNbdGhpc19rZXldID0gYWN0aW9uW2tleV07XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1DaGVja2luZyBwYXJhbXNcblxuICAgICAgICAgICAgLypmb3IodmFyIHBhcmFtIGluIGFjdGlvbkFiaWxpdHkucGFyYW1zKXtcbiAgICAgICAgICAgICB2YXIgcGFyYW1fdHlwZSA9IGFjdGlvbi5hYmlsaXR5X3BhcmFtc1twYXJhbV07XG5cbiAgICAgICAgICAgICBpZih0eXBlb2YgYWN0aW9uQWJpbGl0eS5wYXJhbXNbcGFyYW1dIT09cGFyYW1fdHlwZSl7XG4gICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbSAnK3BhcmFtKycgc2hvdWxkIGJlICcrcGFyYW1fdHlwZSsnIGluc3RlYWQgb2YgJyt0eXBlb2YoYWN0aW9uQWJpbGl0eS5hYmlsaXR5X3BhcmFtc1twYXJhbV0pKycgaW4gYWN0aW9uIGFiaWxpdHkgJythY3Rpb25BYmlsaXR5LnR5cGUpO1xuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFtdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIGV4ZWN1dGUoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGV4ZWN1dGUgcGFzc2l2ZSBhY3Rpb24uJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbiBob3cgbWFueSBzZWNvbmRzIGNhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZD9cbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGNhbkJlRXhlY3V0ZWRJbigpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5jb29sZG93biA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0X3VzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcyA9IE1hdGguYWJzKHRoaXMubGFzdF91c2UgLSBuZXcgRGF0ZSgpKSAvIDEwMDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuY29vbGRvd24gPD0gcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5wYXJhbXMuY29vbGRvd24gLSBzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gYmUgdGhpcyBhY3Rpb24gaW5zdGFuY2UgZXhlY3V0ZWQgbm93P1xuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGNhbkJlRXhlY3V0ZWROb3coKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY2FuQmVFeGVjdXRlZEluKCkgPT09IDApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGFjdHVhbCBkYXRlIGFzIGRhdGUgb2YgZXhlY3V0aW9uIHRoaXMgYWN0aW9uIGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBub3dFeGVjdXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdF91c2UgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBodG1sIHByb2ZpbGUgb2YgYWN0aW9uIGFiaWxpdHlcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUh0bWxQcm9maWxlKCkge1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJhY3Rpb24tYWJpbGl0eS1wcm9maWxlXCI+JztcblxuICAgICAgICAgICAgaHRtbCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIyXCI+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSkgKyBgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0X3VzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsICdsYXN0X3VzZWQnKSArIGA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gICsgdGhpcy5sYXN0X3VzZSArIGA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgcGFyYW0gaW4gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+YCArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywgJ2FjdGlvbicsIHRoaXMudHlwZSwgcGFyYW0pICsgYDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPmAgKyB0aGlzLnBhcmFtc1twYXJhbV0gKyBgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgcmV0dXJuIChodG1sKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTWFwR2VuZXJhdG9yXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBNYXBHZW5lcmF0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRaXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHpfbm9ybWFsaXppbmdfdGFibGVcbiAgICAgICAgICogQHBhcmFtIHtULk1hcEdlbmVyYXRvci5CaW90b3BlfSBiaW90b3BlXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHZpcnR1YWxPYmplY3RHZW5lcmF0b3JcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2V0WjpGdW5jdGlvbiwgcHVibGljIHpfbm9ybWFsaXppbmdfdGFibGU6QXJyYXksIHB1YmxpYyBiaW90b3BlOkFycmF5LCBwdWJsaWMgdmlydHVhbE9iamVjdEdlbmVyYXRvcjpGdW5jdGlvbikge1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXI6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciBtYXAgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPD0gcmFkaXVzICogMjsgeSsrKSB7XG5cbiAgICAgICAgICAgICAgICBtYXBbeV0gPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDw9IHJhZGl1cyAqIDI7IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5IC0gcmFkaXVzICsgMSAvIDIsIDIpID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLmdldFooeCAtIHJhZGl1cyArIGNlbnRlcl9pbnRlZ2VyLngsIHkgLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci55KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG1hcFt5XVt4XSA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChtYXApO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGVycmFpbk1hcChtYXA6QXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIG1hcF9iZyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgbCA9IG1hcC5sZW5ndGg7IHkgPCBsOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYmdbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGw7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWFwW3ldW3hdKSA9PT0gJ3VuZGVmaW5lZCcpY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFwX2JnW3ldW3hdID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKG1hcFt5XVt4XSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwX2JnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJfaW50ZWdlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyOm51bWJlciwgcmFkaXVzOm51bWJlcikge1xuXG5cbiAgICAgICAgICAgIHZhciBib3VuZHMgPSAxO1xuXG5cbiAgICAgICAgICAgIHZhciB6X21hcCA9IHRoaXMuZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlciwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMudGVycmFpbk1hcCh6X21hcCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobWFwKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWFwX2FycmF5XG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjb252ZXJ0TWFwQXJyYXlUb09iamVjdHMobWFwX2FycmF5OkFycmF5LCBjZW50ZXJfaW50ZWdlcjpudW1iZXIsIHJhZGl1czpudW1iZXIpIHtcblxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1hcF9hcnJheVt5XVt4XSkgPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihtYXBfYXJyYXlbeV1beF0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnggPSBjZW50ZXJfaW50ZWdlci54IC0gcmFkaXVzICsgeDtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnkgPSBjZW50ZXJfaW50ZWdlci55IC0gcmFkaXVzICsgeTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gbm90X2NlbnRlclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRQdXJlTWFwKGNlbnRlcjpQb3NpdGlvbiwgcmFkaXVzOm51bWJlciwgbm90X2NlbnRlciA9IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2VudGVyLG5vdF9jZW50ZXIpO1xuXG4gICAgICAgICAgICB2YXIgY2VudGVyX2ludGVnZXIgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihjZW50ZXIueCksXG4gICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihjZW50ZXIueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChub3RfY2VudGVyKVxuICAgICAgICAgICAgICAgIG5vdF9jZW50ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IG5vdF9jZW50ZXIueCAtIGNlbnRlcl9pbnRlZ2VyLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IG5vdF9jZW50ZXIueSAtIGNlbnRlcl9pbnRlZ2VyLnlcbiAgICAgICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIC8qdmFyIG1hcF9hcnJheSA9IHRoaXMuZ2V0TWFwQXJyYXlDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKTtcbiAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IHRoaXMuY29udmVydE1hcEFycmF5VG9PYmplY3RzKG1hcF9hcnJheSxjZW50ZXJfaW50ZWdlcixyYWRpdXMpOy8qKi9cblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdmFyIHg6bnVtYmVyLCB5Om51bWJlciwgejpudW1iZXIsIHQ6bnVtYmVyLCBvYmplY3Q6T2JqZWN0O1xuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8PSByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDw9IHJhZGl1cyAqIDI7IHgrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5IC0gcmFkaXVzICsgMSAvIDIsIDIpID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdF9jZW50ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeCAtIG5vdF9jZW50ZXIueCAtIHJhZGl1cyArIDEgLyAyLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeSAtIG5vdF9jZW50ZXIueSAtIHJhZGl1cyArIDEgLyAyLCAyKSA8PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywgMilcbiAgICAgICAgICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHogPSB0aGlzLmdldFooeCAtIHJhZGl1cyArIGNlbnRlcl9pbnRlZ2VyLngsIHkgLSByYWRpdXMgKyBjZW50ZXJfaW50ZWdlci55KTtcbiAgICAgICAgICAgICAgICAgICAgeiA9IHRoaXMuel9ub3JtYWxpemluZ190YWJsZVtNYXRoLmZsb29yKHogKiB0aGlzLnpfbm9ybWFsaXppbmdfdGFibGUubGVuZ3RoKV07XG5cbiAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuYmlvdG9wZS5nZXRaVGVycmFpbih6KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbih0KTtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnggPSBjZW50ZXJfaW50ZWdlci54IC0gcmFkaXVzICsgeDtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnkgPSBjZW50ZXJfaW50ZWdlci55IC0gcmFkaXVzICsgeTtcblxuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAob2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7VC5PYmplY3RzLkFycmF5fSBvYmplY3RzXG4gICAgICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhvYmplY3RzOkFycmF5KSB7XG5cblxuICAgICAgICAgICAgdmFyIHZpcnR1YWxfb2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgdmFyIG9iamVjdHNfMXgxX3JhdyA9IG9iamVjdHMuZ2V0MXgxVGVycmFpbk9iamVjdHMoKS5nZXRBbGwoKTtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNfMXgxX3Jhdy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbE9iamVjdEdlbmVyYXRvcihvYmplY3RzXzF4MV9yYXdbaV0sIHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh2aXJ0dWFsX29iamVjdHMpO1xuXG4gICAgICAgIH1cblxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1QVUJMSUM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wbGV0ZSB0ZXJyYWluIGFuZCB2aXJ0dWFsIG9iamVjdHMgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7VC5PYmplY3RzLkFycmF5fSByZWFsX29iamVjdHNcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpcnR1YWxfb2JqZWN0c1xuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXIgRG9udCBnZXQgb2JqZWN0cyBuZWFyIHRoaXMgY2VudGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fX1cbiAgICAgICAgICovXG4gICAgICAgIGdldENvbXBsZXRlT2JqZWN0cyhyZWFsX29iamVjdHM6VC5PYmplY3RzLkFycmF5LCBjZW50ZXI6VC5Qb3NpdGlvbiwgcmFkaXVzOm51bWJlciwgbmF0dXJhbF9vYmplY3RzID0gdHJ1ZSwgbm90X2NlbnRlciA9IGZhbHNlKSB7XG5cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRlX29iamVjdHMgPSB0aGlzLmdldFB1cmVNYXAoY2VudGVyLCByYWRpdXMsIG5vdF9jZW50ZXIpO1xuXG5cbiAgICAgICAgICAgIHJlYWxfb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIGlmIChuYXR1cmFsX29iamVjdHMpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsX29iamVjdHMgPSB0aGlzLmdldFZpcnR1YWxPYmplY3RzRnJvbVRlcnJhaW5PYmplY3RzKGNvbXBsZXRlX29iamVjdHMpO1xuXG4gICAgICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoY29tcGxldGVfb2JqZWN0cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvci5CaW90b3BlXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk1hcEdlbmVyYXRvciB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBCaW90b3BlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gdGVycmFpbnNcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcih0ZXJyYWlucykge1xuXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgIHRlcnJhaW5zLmZvckVhY2goZnVuY3Rpb24gKHRlcnJhaW4pIHtcbiAgICAgICAgICAgICAgICBzdW0gKz0gdGVycmFpbi5hbW91bnQ7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZnJvbSA9IDA7XG4gICAgICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyYWluKSB7XG5cbiAgICAgICAgICAgICAgICB0ZXJyYWluLmZyb20gPSBmcm9tIC8gc3VtO1xuICAgICAgICAgICAgICAgIGZyb20gKz0gdGVycmFpbi5hbW91bnQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlcnJhaW5zKTtcbiAgICAgICAgICAgIHRoaXMudGVycmFpbnMgPSB0ZXJyYWlucztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5UZXJyYWlufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0WlRlcnJhaW4oejpudW1iZXIpIHtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50ZXJyYWlucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHogPj0gdGhpcy50ZXJyYWluc1tpXS5mcm9tKSByZXR1cm4gKHRoaXMudGVycmFpbnNbaV0udGVycmFpbik7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1vZGVsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cblxuICAgICAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwYXJ0aWNsZXM6QXJyYXk7XG4gICAgICAgIHB1YmxpYyByb3RhdGlvbjpudW1iZXI7XG4gICAgICAgIHB1YmxpYyBzaXplOm51bWJlcjtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWwganNvblxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZSBpbiBjYXNlIG9mIGZhaWxcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihqc29uOk9iamVjdCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGpzb24pID09ICd1bmRlZmluZWQnKXJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5uYW1lID0ganNvbi5uYW1lO1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBqc29uLnBhcnRpY2xlcztcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSBqc29uLnJvdGF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zaXplID0ganNvbi5zaXplO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMucm90YXRpb24pID09ICd1bmRlZmluZWQnKXRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLnNpemUpID09ICd1bmRlZmluZWQnKXRoaXMuc2l6ZSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Nb2RlbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICAgICAqL1xuICAgICAgICBhZGRSb3RhdGlvblNpemUocm90YXRpb246bnVtYmVyLCBzaXplOm51bWJlcikge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemUgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uICs9IHJvdGF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplICogc2l6ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGRpbWVuc2lvbiB4LHkseix4eVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhbmdlXG4gICAgICAgICAqL1xuICAgICAgICByYW5nZShkaW1lbnNpb246c3RyaW5nKSB7XG5cbiAgICAgICAgICAgIGlmIChkaW1lbnNpb24gPT0gJ3h5Jykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFQuVE1hdGgueHkyZGlzdCh0aGlzLnJhbmdlKCd4JyksIHRoaXMucmFuZ2UoJ3knKSAqIHRoaXMuc2l6ZSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuICAgICAgICAgICAgdmFyIG1heCA9IGZhbHNlLCBtaW4gPSBmYWxzZSwgbWF4XzpudW1iZXIsIG1pbl86bnVtYmVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJ0aWNsZXNMaW5lYXIpIHtcblxuXG4gICAgICAgICAgICAgICAgbWluXyA9IHBhcnRpY2xlc0xpbmVhcltpXS5wb3NpdGlvbltkaW1lbnNpb25dO1xuICAgICAgICAgICAgICAgIG1heF8gPSBwYXJ0aWNsZXNMaW5lYXJbaV0ucG9zaXRpb25bZGltZW5zaW9uXSArIHBhcnRpY2xlc0xpbmVhcltpXS5zaXplW2RpbWVuc2lvbl07XG5cbiAgICAgICAgICAgICAgICAvL3RvZG8gZmVhdHVyZSByZXZlcnNlXG5cbiAgICAgICAgICAgICAgICBpZiAobWF4ID09PSBmYWxzZSltYXggPSBtYXhfO1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IGZhbHNlKW1pbiA9IG1pbl87XG5cblxuICAgICAgICAgICAgICAgIGlmIChtYXhfID4gbWF4KW1heCA9IG1heF87XG4gICAgICAgICAgICAgICAgaWYgKG1pbl8gPCBtaW4pbWluID0gbWluXztcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5hYnMobWluIC0gbWF4KS8qdGhpcy5zaXplKi8pOy8vdG9kbyByb3RhdGlvblxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV96XG4gICAgICAgICAqL1xuICAgICAgICBtb3ZlQnkobW92ZV94ID0gMCwgbW92ZV95ID0gMCwgbW92ZV96ID0gMCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMucGFydGljbGVzKSB7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnggKz0gbW92ZV94O1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKz0gbW92ZV95O1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnogKz0gbW92ZV96O1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIFogb2Ygam9pbmluZyBtb2RlbFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV95XG4gICAgICAgICAqL1xuICAgICAgICBqb2luTW9kZWxaKG1vZGVsOlQuTW9kZWwsIG1vdmVfeDpudW1iZXIsIG1vdmVfeTpudW1iZXIpIHsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgICAgICAvL3ZhciAgbW9kZWxfPWRlZXBDb3B5TW9kZWwobW9kZWwpO1xuICAgICAgICAgICAgLy9tb2RlbF8ubW92ZUJ5KG1vdmVfeCxtb3ZlX3kpOy8vdG9kbyBtYXliZSBkZWxldGUgbW92ZUJ5XG5cbiAgICAgICAgICAgIC8vdmFyIG1heF96PXRoaXMucmFuZ2UoJ3onKTtcblxuXG4gICAgICAgICAgICB2YXIgdGhpc19saW5lYXJfcGFydGljbGVzID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcbiAgICAgICAgICAgIHZhciBtb2RlbF9saW5lYXJfcGFydGljbGVzID0gbW9kZWwuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlcyA9IFswXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbW9kZWxfbGluZWFyX3BhcnRpY2xlcykge1xuXG4gICAgICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICs9IG1vdmVfeDtcbiAgICAgICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKz0gbW92ZV95O1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWkgaW4gdGhpc19saW5lYXJfcGFydGljbGVzKSB7Ly90b2RvIG1heWJlIG9wdGltaXplIGJ5IHByZS1zb3J0aW5nXG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoUGFydGljbGVzLmNvbGxpc2lvbjJEKHRoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0sIG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHIodGhpc19saW5lYXJfcGFydGljbGVzW2lpXSwgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzLnB1c2godGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5wb3NpdGlvbi56ICsgdGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5zaXplLnopO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXhfeiA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIGRpc3RhbmNlcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYXhfejtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSm9pbiBtb2RlbHMgdG9nZXRoZXJcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IE1vZGVsXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3hcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAgICAgKi9cbiAgICAgICAgam9pbk1vZGVsKG1vZGVsLCBtb3ZlX3gsIG1vdmVfeSkgey8vdG9kbyBzZWNvbmQgcGFyYW0gc2hvdWxkIGJlIHBvc2l0aW9uXG5cbiAgICAgICAgICAgIHZhciBtYXhfeiA9IHRoaXMuam9pbk1vZGVsWihtb2RlbCwgbW92ZV94LCBtb3ZlX3kpO1xuXG5cbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzID0gW1xuICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpLFxuICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZWwpKVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbMV0ucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogbW92ZV94LFxuICAgICAgICAgICAgICAgIHk6IG1vdmVfeSxcbiAgICAgICAgICAgICAgICB6OiBtYXhfelxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnNpemUgPSAxO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWVwIGNvcHkgdGhpcyBhbmQgY29udmVydHMgbGlua3MgdG8gcmF3IGRhdGFcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gTW9kZWxcbiAgICAgICAgICovXG4gICAgICAgIGdldERlZXBDb3B5V2l0aG91dExpbmtzKCkge1xuXG5cbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMuY2xvbmUoKTtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db252ZXJ0IGxpbmtzIHRvIHJhdyBkYXRhXG5cblxuICAgICAgICAgICAgdmFyIGZpbmRQYXJ0aWNsZUJ5TmFtZSA9IGZ1bmN0aW9uIChwYXJ0aWNsZXMsIG5hbWUpIHsvL3RvZG8gbW92ZSB0byBwcm90b3R5cGVcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRpY2xlc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFydGljbGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBhcnRpY2xlcykgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaW5kZWRfcGFydGljbGUgPSBmaW5kUGFydGljbGVCeU5hbWUocGFydGljbGVzW2ldLnBhcnRpY2xlcywgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaW5kZWRfcGFydGljbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmaW5kZWRfcGFydGljbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmtzID0gZnVuY3Rpb24gKHBhcnRpY2xlcykgey8vdG9kbyBtb3ZlIHRvIHByb3RvdHlwZVxuXG5cbiAgICAgICAgICAgICAgICAvL3IocGFydGljbGVzKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ubGluaykgIT0gJ3VuZGVmaW5lZCcpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlua2VkX3BhcnRpY2xlID0gZmluZFBhcnRpY2xlQnlOYW1lKG1vZGVsLnBhcnRpY2xlcywgcGFydGljbGVzW2ldLmxpbmspO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkX3BhcnRpY2xlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaW5rICcgKyBwYXJ0aWNsZS5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5rZWRfcGFydGljbGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucm90YXRpb24pICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGVzW2ldLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0uc2l6ZSkgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlc1tpXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucG9zaXRpb24pICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlLnBvc2l0aW9uID0gcGFydGljbGVzW2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvIHNrZXdcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNbaV0gPSBsaW5rZWRfcGFydGljbGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhwYXJ0aWNsZXNbaV0ucGFydGljbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhtb2RlbC5wYXJ0aWNsZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IDFEIGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZV9yb290X3JvdGF0aW9uX3NpemVcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBwYXJ0aWNsZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldExpbmVhclBhcnRpY2xlcyhpZ25vcmVfcm9vdF9yb3RhdGlvbl9zaXplID0gZmFsc2UpIHtcblxuXG4gICAgICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyID0gW107XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBwYXJ0aWNsZXMgdG8gMUQgcGFydGljbGVzXG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWNsZXMyTGluZWFyID0gZnVuY3Rpb24gKHBhcnRpY2xlcywgcG9zaXRpb24sIHJvdGF0aW9uLCBzaXplKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJylwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNpemUgPT09ICd1bmRlZmluZWQnKXNpemUgPSAxO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6OiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9wYXJ0aWNsZT1kZWVwQ29weShwYXJ0aWNsZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkRlZmF1bHQgcGFyYW1zIG9mIHBhcnRpY2xlLCBncm91cCBvciBsaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFydGljbGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGUucm90YXRpb24pID09ICd1bmRlZmluZWQnKXBhcnRpY2xlLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5zaXplKSA9PSAndW5kZWZpbmVkJylwYXJ0aWNsZS5zaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flBvc2l0aW9uLCBSb3RhdGlvbiBhbmQgc2l6ZSAvL3RvZG8gc2tld1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0RGVnID0gVC5UTWF0aC54eTJkaXN0RGVnKHBhcnRpY2xlLnBvc2l0aW9uLngsIHBhcnRpY2xlLnBvc2l0aW9uLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRpc3REZWcuZGlzdCA9IGRpc3REZWcuZGlzdCAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIGRpc3REZWcuZGVnICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IFQuVE1hdGguZGlzdERlZzJ4eShkaXN0RGVnLmRpc3QsIGRpc3REZWcuZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0geHkueDtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHh5Lnk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBwYXJ0aWNsZS5wb3NpdGlvbi56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ICs9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgKz0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiArPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2l6ZSA9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplID0gcGFydGljbGUuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGUuc2l6ZS54ID0gcGFydGljbGUuc2l6ZS54ICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueSA9IHBhcnRpY2xlLnNpemUueSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zaXplLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QYXJ0aWNsZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlLnBhcnRpY2xlcykgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihwYXJ0aWNsZS5wYXJ0aWNsZXMsIHBhcnRpY2xlLnBvc2l0aW9uLCBwYXJ0aWNsZS5yb3RhdGlvbiwgcGFydGljbGUuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZS5zaGFwZSkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzTGluZWFyLnB1c2gocGFydGljbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuXG4gICAgICAgICAgICBpZiAoaWdub3JlX3Jvb3Rfcm90YXRpb25fc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsIGZhbHNlLCAwLCAxKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIobW9kZWwucGFydGljbGVzLCBmYWxzZSwgbW9kZWwucm90YXRpb24sIG1vZGVsLnNpemUpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy90b2RvIHN0cmljdCBtb2RlLy9kZWxldGUgbW9kZWw7XG5cbiAgICAgICAgICAgIHJldHVybiAocGFydGljbGVzTGluZWFyKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHBhdGhcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJQYXRoKHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihwYXRoLmZvckVhY2gpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5wYXJ0aWNsZXNbaV07XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHBhdGhcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gcGFydCBvZiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJQYXRoU2libGluZ3MocGF0aCkge1xuXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IG1vZGVsO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBhdGguZm9yRWFjaCkgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlX2ksIHBhdGhfaWkpIHtcblxuICAgICAgICAgICAgICAgIC8qaWYocGF0aF9paTxwYXRoLmxlbmd0aC0xKXtcblxuICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJ0aWNsZXNbcGFydGljbGVfaV07XG5cbiAgICAgICAgICAgICAgICAgfWVsc2V7Ki9cblxuICAgICAgICAgICAgICAgIHZhciBtZSA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudC5wYXJ0aWNsZXMgPSBbbWVdO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1lO1xuICAgICAgICAgICAgICAgIC8vfVxuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKG1vZGVsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdncmVnYXRlIHZvbHVtZSBvZiBlYWNoIHJlc291cmNlIHVzZWQgaW4gbW9kZWxcbiAgICAgICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAgICAgKi9cbiAgICAgICAgYWdncmVnYXRlUmVzb3VyY2VzVm9sdW1lcygpIHtcblxuXG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuXG5cbiAgICAgICAgICAgIHZhciBsaW5lYXJfcGFydGljbGVzID0gdGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuXG4gICAgICAgICAgICBsaW5lYXJfcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmVhcl9wYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZvbHVtZSA9Ly90b2RvIGFsbCBzaGFwZXNcbiAgICAgICAgICAgICAgICAgICAgbGluZWFyX3BhcnRpY2xlLnNpemUueCAqXG4gICAgICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnkgKlxuICAgICAgICAgICAgICAgICAgICBsaW5lYXJfcGFydGljbGUuc2l6ZS56O1xuXG4gICAgICAgICAgICAgICAgdmFyIG1hdGVyaWFsID0gbGluZWFyX3BhcnRpY2xlLm1hdGVyaWFsLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBtYXRlcmlhbFswXTtcblxuICAgICAgICAgICAgICAgIHZhciBwcmljZV8gPSB7fTtcbiAgICAgICAgICAgICAgICBwcmljZV9bbWF0ZXJpYWxdID0gdm9sdW1lO1xuXG4gICAgICAgICAgICAgICAgcHJpY2UuYWRkKHByaWNlXyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKCdwcmljZSBvZicpO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdC5kZXNpZ24uZGF0YSk7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cocHJpY2UpOyovXG5cbiAgICAgICAgICAgIC8vcHJpY2UubXVsdGlwbHkoMC4wMSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocHJpY2UpO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0SGFzaCgpIHtcbiAgICAgICAgICAgIHJldHVybiAneHh4JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFydGljbGVzKS5sZW5ndGg7Ly90b2RvIGJldHRlclxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5Nb2RlbC5QYXJ0aWNsZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuTW9kZWwge1xuXG5cbiAgICAvKipcbiAgICAgKiBNb2RlbCBQYXJ0aWNsZXNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUGFydGljbGVzIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbWlzc2luZyBwYXJhbXMgaW50byBwYXJ0aWNsZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYWRkTWlzc2luZ1BhcmFtcyhwYXJ0aWNsZSkgey8vdG9kbyA/PyBtYXliZSByZW5hbWVcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNrZXcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2tldyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3LnogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2tldy56ID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS50b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUuc2hhcGUudG9wID0gMTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS5ib3R0b20gPSAxO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUucm90YXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgICAgICBzdGF0aWMgZ2V0VHJpYW5nbGVzKHBhcnRpY2xlLCBwb2ludF9jbGFzcykge1xuXG4gICAgICAgICAgICB2YXIgdHJpYW5nbGVzID0gW107XG5cbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNoYXBlLnR5cGUgPT0gJ3ByaXNtJykge1xuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHBhcnRpY2xlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgICAgIHZhciB5XyA9IHBhcnRpY2xlLnNpemUueTtcbiAgICAgICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgICAgICB2YXIgeF9fLCB5X18sIHpfXztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgcGFydGljbGUuc2hhcGUubjsgbisrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVhZWiByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4X18gPSAwLjUgKiB4XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiBiYXNlICsgeV8gKiAobGV2ZWwgKiBwYXJ0aWNsZS5za2V3LnoueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSAoMiAtIChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuVE1hdGguZGVnMnJhZCgxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkpKSAqIHRtcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLSBYWSBSb3RhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULlRNYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIERpc3REZWdfLmRlZyArPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULlRNYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geHlfLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5ldyBwb2ludF9jbGFzcyh4X18sIHlfXywgel9fKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKmlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFsxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCAzRCBtb2RlbCBmcm9tIHBhcnRpY2xlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGRlcHJlY2F0ZWRcbiAgICAgICAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gM0QgbW9kZWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQzRChwYXJ0aWNsZSkge1xuXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSB7fTtcblxuICAgICAgICAgICAgcGFydGljbGUgPSB0aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1wcmlzbVxuXG4gICAgICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHBhcnRpY2xlLnBvc2l0aW9uLno7Ly8gKiAyO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgICAgIHZhciB6XyA9IHBhcnRpY2xlLnNpemUuejtcblxuXG4gICAgICAgICAgICAgICAgLy9yKHhfLHlfKTtcbiAgICAgICAgICAgICAgICAvL3IocGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2ludHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucyA9IFtbXSwgW11dO1xuICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkQgPSBbW10sIFtdXTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUudG9wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfXywgeV9fLCB6X187XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpcyhwYXJ0aWNsZS5zaGFwZS5yb3RhdGVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5UTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5UTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHhfICogKChsZXZlbCAqIDIpIC0gMSk7Ly8qKGxldmVsLTAuNSk7Ly8reF8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei54KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuVE1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gKDEpICogMC41ICogKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULlRNYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfICogKChNYXRoLmNvcyhULlRNYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5UTWF0aC54eTJkaXN0RGVnKHhfXywgeV9fKTsvL3RvZG8gcmVmYWN0b3IgYWxsIGxpa2UgRGlzdERlZywgZXRjLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5UTWF0aC5kaXN0RGVnMnh5KERpc3REZWdfLmRpc3QsIERpc3REZWdfLmRlZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcihuLDEscGFydGljbGUuc2hhcGUubiwobisxK3BhcnRpY2xlLnNoYXBlLm4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzBdLnB1c2gobiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pICsgcGFydGljbGUuc2hhcGUublxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKi9cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIHBhcnRpY2xlIHNoYXBlICcgKyBwYXJ0aWNsZS5zaGFwZS50eXBlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IDJEIGxpbmVzIGZyb20gcGFydGljbGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJhc2UgMD1ib3R0b20sIDE9dG9wXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSAyRCBsaW5lc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldDJEbGluZXMocGFydGljbGUsIGJhc2UpIHtcblxuXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSB0aGlzLmdldDNEKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgdmFyIGxpbmVzID0gW107XG5cbiAgICAgICAgICAgIHZhciBwb2x5Z29uczJEID0gW3Jlc291cmNlLnBvbHlnb25zMkRbYmFzZV1dO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwbiBpbiBwb2x5Z29uczJEKSB7XG5cbiAgICAgICAgICAgICAgICAvKmxpbmVzW3BuXT1bXTtcblxuICAgICAgICAgICAgICAgICBmb3IodmFyIHB0IGluIHJlc291cmNlLnBvbHlnb25zW3BuXSkge1xuXG4gICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IHJlc291cmNlLnBvaW50c1tyZXNvdXJjZS5wb2x5Z29uc1twbl1bcHRdIC0gMV07XG4gICAgICAgICAgICAgICAgIGxpbmVzW3BuXVtwc10gPSBbcG9pbnRbMF0sIHBvaW50WzFdXTtcblxuICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgIHZhciBwb2ludDEsIHBvaW50MjtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAtMSwgbCA9IHBvbHlnb25zMkRbcG5dLmxlbmd0aDsgaSA8IGwgLSAxOyBpKyspIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludDEgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gbCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHBvaW50MiA9IGkgKyAxO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9yKHJlc291cmNlLnBvbHlnb25zW3BuXSxwb2ludDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IHJlc291cmNlLnBvaW50c1twb2x5Z29uczJEW3BuXVtwb2ludDFdIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHBvaW50MiA9IHJlc291cmNlLnBvaW50c1twb2x5Z29uczJEW3BuXVtwb2ludDJdIC0gMV07XG5cblxuICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQxWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludDFbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQyWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MlsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3IobGluZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gKGxpbmVzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvL3RvZG8gbWF5YmUgcmVmYWN0b3IgbW92ZSB0byBNYXRoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY29sbGlzaW9uIGJldHdlZW4gMiAyRCBsaW5lc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IGxpbmVzMVxuICAgICAgICAgKiBAcGFyYW0gKGFycmF5KSBsaW5lczJcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBjb2xsaXNpb25MaW5lc0RldGVjdChsaW5lczEsIGxpbmVzMikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpMSBpbiBsaW5lczEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpMiBpbiBsaW5lczIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoVC5UTWF0aC5saW5lQ29sbGlzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczFbaTFdWzBdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMxW2kxXVsxXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzBdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMyW2kyXVswXS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lczJbaTJdWzFdLnlcbiAgICAgICAgICAgICAgICAgICAgICAgICkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKCdjb2xsaXNpb24yRCBpcyB0cnVlJywgcGFydGljbGUxLCBwYXJ0aWNsZTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIHBhcnRpY2xlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZTEgYm90dG9tXG4gICAgICAgICAqIEBwYXJhbSAob2JqZWN0KSBwYXJ0aWNsZTIgdG9wXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgY29sbGlzaW9uMkQocGFydGljbGUxLCBwYXJ0aWNsZTIpIHtcblxuXG4gICAgICAgICAgICB2YXIgbGluZXMxID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUxLCAxKTtcbiAgICAgICAgICAgIHZhciBsaW5lczIgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTIsIDApO1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db3JuZXIgY29sbGlzaW9uXG5cblxuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChsaW5lczEsIGxpbmVzMik7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUlubmVyIGNvbnZleCBjb2xsaXNpb25cblxuICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgaWYgKCFjb2xsaXNpb24pIHtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBrID0gMTAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRlciwgaW5uZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDI7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lciA9IC8qZGVlcENvcHkqLyhsaW5lczFbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGluZXMxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMyWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXIxID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbm5lcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyMiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5uZXIpKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3ggPSBpbm5lclsxXS54IC0gaW5uZXJbMF0ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcl92ZWN0b3JfeSA9IGlubmVyWzFdLnkgLSBpbm5lclswXS55O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueCAtPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueSAtPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIyWzFdLnggKz0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIyWzFdLnkgKz0gaW5uZXJfdmVjdG9yX3kgKiBrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMSA9IFtpbm5lcjFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIyID0gW2lubmVyMl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb24xID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGlubmVyMSwgb3V0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjIgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIyLCBvdXRlcik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbjEgJiYgY29sbGlzaW9uMikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgfSgpO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKi9cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVidWcgVEREXG4gICAgICAgICAgICAvKip2YXIgc2l6ZT0xMDA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGluZXNfPVtsaW5lczEsbGluZXMyXTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBsaW5lc18pe1xuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPSAwLGw9bGluZXNfW2tleV0ubGVuZ3RoO2k8bDtpKyspe1xuXG4gICAgICAgICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8obGluZXNfW2tleV1baV1bMF0ueCtzaXplLGxpbmVzX1trZXldW2ldWzBdLnkrc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8obGluZXNfW2tleV1baV1bMV0ueCtzaXplLGxpbmVzX1trZXldW2ldWzFdLnkrc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbWcgc3JjPVwiJytzcmMrJ1wiIGJvcmRlcj0nKyhjb2xsaXNpb24/MjowKSsnPicpOy8qKi9cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gKGNvbGxpc2lvbik7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn0iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLkFycmF5XG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5PYmplY3RzIHtcblxuLy90b2RvIFQuT2JqZWN0cy5BcnJheSA9IGNsYXNzIGV4dGVuZHMgQXJyYXl7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBBcnJheSB7XG5cblxuICAgICAgICBwdWJsaWMgb2JqZWN0czpPYmplY3RzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmplY3RzXG4gICAgICAgICAqIHRvZG8gPz8/Pz8/Pz8/IEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob2JqZWN0cz1bXSkge1xuXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMgPSBvYmplY3RzLm1hcChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiBULk9iamVjdHMuT2JqZWN0LmluaXQob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldEFsbCgpOkFycmF5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZpbHRlcihjYWxsYmFjayk6VC5PYmplY3RzLkFycmF5IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIC8vcihmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMpO1xuXG4gICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuZmlsdGVyKGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIChmaWx0ZXJlZF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQdXNoIG5ldyBvYmplY3QgaW50byBPYmplY3RzIEFycmF5XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHB1c2gob2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLnB1c2goVC5PYmplY3RzLk9iamVjdC5pbml0KG9iamVjdCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlIG9yIHB1c2ggb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGUob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0QnlJZChvYmplY3QuaWQsIG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QnlJZChpZCkge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyl0aHJvdyBuZXcgRXJyb3IoJ2dldEJ5SWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKXJldHVybiB0aGlzLm9iamVjdHNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzZXRCeUlkKGlkLCBvYmplY3QpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdzZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5pZCA9PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXSA9IFQuT2JqZWN0cy5PYmplY3QuaW5pdChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVJZChpZCwgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKXRocm93IG5ldyBFcnJvcigncmVtb3ZlSWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmlkID09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0cnVlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlclR5cGVzKC4uLnR5cGVzKSB7XG5cblxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHMgPSBuZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihvYmplY3QudHlwZSkgPT0gLTEpcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyUmFkaXVzKGNlbnRlciwgcmFkaXVzKSB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGNlbnRlcikgPD0gcmFkaXVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZpbHRlcmVkX29iamVjdHMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmaWx0ZXJBcmVhKGFyZWE6QXJlYSkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cyA9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChhcmVhLmlzQ29udGFpbmluZyhvYmplY3QuZ2V0UG9zaXRpb24oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZF9vYmplY3RzLmdldEFsbCgpLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKSB7Ly90b2RvIG1heWJlIHJlZmFjdG9yIHRvIGdldFRlcnJhaW5Db2RlczJEQXJyYXkgb3IgZ2V0VGVycmFpbkNvZGVzTWFwXG5cbiAgICAgICAgICAgIC8qdmFyIHJhZGl1cyA9IHNpemUvMjtcbiAgICAgICAgICAgICB2YXIgY2VudGVyID17XG4gICAgICAgICAgICAgeDogdG9wbGVmdC54K3JhZGl1cyxcbiAgICAgICAgICAgICB5OiB0b3BsZWZ0LnkrcmFkaXVzXG4gICAgICAgICAgICAgfTsqL1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DcmVhdGUgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIHZhciBtYXBfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzICogMjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKTsvLy5zbGljZSgpLnJldmVyc2UoKTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7Ly90b2RvIGlzIHRoaXMgb3B0aW1hbGl6YXRpb24gZWZmZWN0aXZlP1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB5IDwgcmFkaXVzICogMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA8IHJhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfZnJvbSA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyAtIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyArIG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzICsgb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHhjID0gb2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHljID0gb2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cztcblxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoeSA9IHlfZnJvbTsgeSA8PSB5X3RvOyB5KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldW3hdID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFQuVE1hdGgueHkyZGlzdCh4IC0geGMsIHkgLSB5YykgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBfYXJyYXlbeV1beF0gPSBvYmplY3QuZ2V0Q29kZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIHJldHVybiBtYXBfYXJyYXk7XG5cblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgZ2V0TWFwT2ZDb2xsaXNpb25zKGNlbnRlciwgcmFkaXVzKXtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVRlcnJhaW5zXG4gICAgICAgICAgICB2YXIgbWFwX29mX3RlcnJhaW5fY29kZXMgPSB0aGlzLmdldE1hcE9mVGVycmFpbkNvZGVzKGNlbnRlciwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdmFyIG1hcF9vZl9jb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIHZhciB4LHk7XG5cbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMgKiAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCByYWRpdXMgKiAyOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihbMSw1LDExXS5pbmRleE9mKG1hcF9vZl90ZXJyYWluX2NvZGVzW3ldW3hdKSE9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3ldW3hdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBfb2ZfY29sbGlzaW9uc1t5XVt4XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1PYmplY3RzXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcblxuICAgICAgICAgICAgICAgIGlmKG9iamVjdC50eXBlID09ICdidWlsZGluZycgJiYgb2JqZWN0LnN1YnR5cGUgPT0gJ3dhbGwnKXt9ZWxzZXtyZXR1cm47fVxuXG4gICAgICAgICAgICAgICAgdmFyIHg9TWF0aC5yb3VuZChvYmplY3QueCktTWF0aC5yb3VuZChjZW50ZXIueC0ocmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgdmFyIHk9TWF0aC5yb3VuZChvYmplY3QueSktTWF0aC5yb3VuZChjZW50ZXIueS0ocmFkaXVzKSk7XG5cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCsxLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeC0xLHk6IHl9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5KzF9LFxuICAgICAgICAgICAgICAgICAgICB7eDogeCx5OiB5LTF9XG5cbiAgICAgICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24ocF8pe1xuICAgICAgICAgICAgICAgICAgICBpZihwXy54Pj0wICYmIHBfLnk+PTAgJiYgcF8ueDxyYWRpdXMqMiAmJiBwXy55PHJhZGl1cyoyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9vZl9jb2xsaXNpb25zW3BfLnldW3BfLnhdPTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICByZXR1cm4obWFwX29mX2NvbGxpc2lvbnMpO1xuXG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldDF4MVRlcnJhaW5PYmplY3RzKCkge1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfMXgxID0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG5cbiAgICAgICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfcmF3ID0gdGhpcy5maWx0ZXJUeXBlcygndGVycmFpbicpLmdldEFsbCgpLnNsaWNlKCkucmV2ZXJzZSgpOy8vbm9ybWFsIEFycmF5XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1GaWxsIGFycmF5XG5cbiAgICAgICAgICAgIHZhciBibG9ja2VkX3Bvc2l0aW9ucyA9IHt9O1xuICAgICAgICAgICAgdmFyIG9iamVjdF8xeDEsIGtleTtcblxuXG4gICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0ZXJyYWluX29iamVjdHNfcmF3Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IHRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS54KSArICd5JyArIE1hdGgucm91bmQob2JqZWN0XzF4MS55KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrZWRfcG9zaXRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5wdXNoKG9iamVjdF8xeDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcigtb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0geV9mcm9tOyB5IDw9IHlfdG87IHkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHhfZnJvbTsgeCA8PSB4X3RvOyB4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULlRNYXRoLnh5MmRpc3QoeCwgeSkgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS5kZXNpZ24uZGF0YS5zaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS54ID0gTWF0aC5yb3VuZChvYmplY3RfMXgxLnggKyB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS55ID0gTWF0aC5yb3VuZChvYmplY3RfMXgxLnkgKyB5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSAneCcgKyBvYmplY3RfMXgxLnggKyAneScgKyBvYmplY3RfMXgxLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5wdXNoKG9iamVjdF8xeDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICByZXR1cm4gdGVycmFpbl9vYmplY3RzXzF4MTtcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBqc2RvY1xuICAgICAgICBnZXRUZXJyYWluT25Qb3NpdGlvbihwb3NpdGlvbikge1xuXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLm9iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnR5cGUgIT0gJ3RlcnJhaW4nKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLmRlc2lnbi5kYXRhLnNpemUgPD0gcG9zaXRpb24uZ2V0RGlzdGFuY2UobmV3IFQuUG9zaXRpb24odGhpcy5vYmplY3RzW2ldLngsIHRoaXMub2JqZWN0c1tpXS55KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLm9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChudWxsKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvL3RvZG8ganNkb2NcbiAgICAgICAgZ2V0TmVhcmVzdFRlcnJhaW5Qb3NpdGlvbldpdGhDb2RlKHBvc2l0aW9uLCB0ZXJyYWluX2NvZGUpIHtcblxuICAgICAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c18xeDEgPSB0aGlzLmdldDF4MVRlcnJhaW5PYmplY3RzKCk7XG5cbiAgICAgICAgICAgIHZhciBtaW5fZGlzdGFuY2UgPSAtMTtcbiAgICAgICAgICAgIHZhciBuZWFyZXN0X3RlcnJhaW5fMXgxID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRlcnJhaW5fb2JqZWN0c18xeDEuZm9yRWFjaChmdW5jdGlvbiAodGVycmFpbl8xeDEpIHtcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UocG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1pbl9kaXN0YW5jZSA9PT0gLTEgfHwgbWluX2Rpc3RhbmNlID4gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3RfdGVycmFpbl8xeDEgPSB0ZXJyYWluXzF4MTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmVhcmVzdF90ZXJyYWluXzF4MSA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lYXJlc3RfdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLypcblxuICAgICAgICAgZ2V0TWFwT2ZDb2xsaXNpb25Db2RlcyhyZWFsX29iamVjdHMscG9zaXRpb24pe1xuICAgICAgICAgcmV0dXJuIFRlcnJhaW47XG4gICAgICAgICB9O1xuXG4gICAgICAgICAqL1xuXG5cbiAgICB9XG5cbn1cblxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5PYmplY3RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIE9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXI7XG4gICAgICAgIHB1YmxpYyB0eXBlOnN0cmluZztcbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRoaXNfa2V5ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNfa2V5ID09ICdfaWQnKXRoaXNfa2V5ID0gJ2lkJzsvL3RvZG8gbWF5YmUgYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBpbml0KG9iamVjdCkge1xuXG4gICAgICAgICAgICBpZihvYmplY3QgaW5zdGFuY2VvZiBULk9iamVjdHMuT2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKG9iamVjdC50eXBlID09ICdidWlsZGluZycpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuQnVpbGRpbmcob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAndGVycmFpbicpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICdzdG9yeScpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuU3Rvcnkob2JqZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QudHlwZSA9PSAnbmF0dXJhbCcpIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuTmF0dXJhbChvYmplY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgcHV0IGl0ZW0gaW50byBUb3ducyBPYmplY3RzIEFycmF5IGJlY2F1c2Ugb2YgdW5yZWNvZ25pemVkIG9iamVjdCB0eXBlICcgKyBvYmplY3QudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcmV0dXJuIChvYmplY3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFBvc2l0aW9uKCk6UG9zaXRpb24ge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5Qb3NpdGlvbih0aGlzLngsIHRoaXMueSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc01vdmluZygpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuICgnWycgKyB0aGlzLm5hbWUgKyAnXScpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQnVpbGRpbmdcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIEJ1aWxkaW5nIGV4dGVuZHMgVC5PYmplY3RzLk9iamVjdCB7XG5cbiAgICAgICAgcHVibGljIGRlc2lnbjogT2JqZWN0O1xuICAgICAgICBwdWJsaWMgYWN0aW9uczogQXJyYXk7XG4gICAgICAgIHB1YmxpYyBwYXRoOiBQYXRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iamVjdCk7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hY3Rpb25zID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zX2NsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zX2NsYXNzZXMucHVzaChULldvcmxkLmdhbWUubmV3QWN0aW9uSW5zdGFuY2UodGhpcy5hY3Rpb25zW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnNfY2xhc3NlcztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHIodGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGggPSBuZXcgVC5QYXRoKC4uLnRoaXMucGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgdmFyIGxpZmVfYWN0aW9uID0gdGhpcy5nZXRBY3Rpb24oJ2xpZmUnKTtcbiAgICAgICAgICAgIHZhciBtYXhfbGlmZSA9IFQuV29ybGQuZ2FtZS5nZXRPYmplY3RNYXhMaWZlKHRoaXMpO1xuXG5cbiAgICAgICAgICAgIGlmIChsaWZlX2FjdGlvbiA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgbGlmZV9hY3Rpb24gPSBULldvcmxkLmdhbWUubmV3QWN0aW9uSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGlmZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogbWF4X2xpZmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhfbGlmZTogbWF4X2xpZmVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5wdXNoKGxpZmVfYWN0aW9uKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxpZmVfYWN0aW9uLnBhcmFtcy5tYXhfbGlmZSA9IG1heF9saWZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb3NpdGlvbihkYXRlKSB7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKG5ldyBULlBvc2l0aW9uKHRoaXMueCwgdGhpcy55KSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmNvdW50UG9zaXRpb24oZGF0ZSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb3ZpbmcoZGF0ZSkge1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmYWxzZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmluUHJvZ3Jlc3MoZGF0ZSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge1QuT2JqZWN0c31cbiAgICAgICAgICovXG4gICAgICAgIGNsb25lKCkgey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7VC5Nb2RlbH1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1vZGVsKCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5kZXNpZ24uZGF0YSBpbnN0YW5jZW9mIFQuTW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNpZ24uZGF0YSA9IG5ldyBULk1vZGVsKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGFjdGlvbl90eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtULkdhbWUuQWN0aW9uQWJpbGl0eX1cbiAgICAgICAgICovXG4gICAgICAgIGdldEFjdGlvbihhY3Rpb25fdHlwZSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnNbaV0udHlwZSA9PSBhY3Rpb25fdHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5hY3Rpb25zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNyZWF0ZUh0bWxQcm9maWxlKCkge1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uc19wcm9maWxlID0gJyc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zX3Byb2ZpbGUgKz0gdGhpcy5hY3Rpb25zW2ldLmNyZWF0ZUh0bWxQcm9maWxlKCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIChgXG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvYmplY3QtYnVpbGRpbmctcHJvZmlsZVwiPlxuXG4gICAgICAgICAgICAgICAgPGgyPmAgKyB0aGlzLm5hbWUgKyBgPC9oMj5cbiAgICAgICAgICAgICAgICBgICsgdGhpcy5nZXRQb3NpdGlvbigpICsgYFxuXG5cbiAgICAgICAgICAgICAgICBgICsgYWN0aW9uc19wcm9maWxlICsgYFxuXG5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5OYXR1cmFsXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIE5hdHVyYWwgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduOk9iamVjdDtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5OYXR1cmFsKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuT2JqZWN0cyB7XG5cbiAgICBleHBvcnQgY2xhc3MgU3RvcnkgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgY29udGVudDtcblxuICAgICAgICBjbG9uZSgpIHsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHJldHVybiAobmV3IFQuT2JqZWN0cy5TdG9yeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0TWFya2Rvd24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY29udGVudC5kYXRhKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULk9iamVjdHMge1xuXG4gICAgZXhwb3J0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0IHtcblxuICAgICAgICBwdWJsaWMgZGVzaWduO1xuXG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVC5PYmplY3RzLlRlcnJhaW4oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Q29kZShwcmVmZXJlZF93aWR0aCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuaW1hZ2UpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvbG9yKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaWduLmRhdGEuY29sb3IpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vdG9kbyBnZXRJbWFnZSgpe31cblxuXG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBleHBvcnQgY2xhc3MgUmVzb3VyY2VzIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlc291cmNlczpPYmplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHJlc291cmNlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZXN9XG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZSgpOlJlc291cmNlcyB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh0aGlzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY29udGFpbnMgYSBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBjb250YWluc1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbnMocmVzb3VyY2VzOlJlc291cmNlcyk6Ym9vbGVhbiB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNvdXJjZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldIDwgcmVzb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBnaXZlbiByZXNvdXJjZXNcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAgICAgKiBAcmV0dXJuIHtib29sfSBzdWNjZXNzXG4gICAgICAgICAqL1xuICAgICAgICBhZGQocmVzb3VyY2VzOlJlc291cmNlcyk6UmVzb3VyY2VzIHtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gKz0gcmVzb3VyY2VzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG11bHRpcGx5KGs6bnVtYmVyKTpSZXNvdXJjZXMge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbCh0aGlzW2tleV0gKiBrKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzaWdudW0oazpzdHJpbmcpOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgYXBwbHkobW9kaWZpZXI6RnVuY3Rpb24pOlJlc291cmNlcyB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbW9kaWZpZXIodGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBhbGwgcmVzb3VyY2VzIGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3RLZXlzKCk6QXJyYXkge1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZXNvdXJlc1xuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgZ2l2ZW4gUmVzb3VyY2VzXG4gICAgICAgICAqL1xuICAgICAgICBjb21wYXJlKHJlc291cmVzOlJlc291cmNlcyk6bnVtYmVyIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlc19BID0gdGhpcztcbiAgICAgICAgICAgIHZhciByZXNvdXJjZXNfQiA9IHJlc291cmVzO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0EuZXh0cmFjdEtleXMoKSk7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0IuZXh0cmFjdEtleXMoKSk7XG5cblxuICAgICAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbF9BID0gcmVzb3VyY2VzX0Fba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsX0IgPSByZXNvdXJjZXNfQltrZXldO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9BID09ICd1bmRlZmluZWQnKXZhbF9BID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbF9CID09ICd1bmRlZmluZWQnKXZhbF9CID0gMDtcblxuICAgICAgICAgICAgICAgIGRpc3RhbmNlICs9IE1hdGgucG93KHZhbF9BIC0gdmFsX0IsIDIpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlKTtcblxuXG4gICAgICAgICAgICByZXR1cm4gKGRpc3RhbmNlKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGdpdmVuIHJlc291cmNlc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyY2VzXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZShyZXNvdXJjZXM6UmVzb3VyY2VzKTpib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKHJlc291cmNlcykpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcblxuICAgICAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCh0aGlzW2tleV0gKyAnICcgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3Muam9pbignLCAnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0b0hUTUwoKTpzdHJpbmcgey8vdG9kbyBwdXQgdXJsIHByZWZpeCBpbnRvIHBhcmFtc1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSAhPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKC8qJ2VuLVVTJydkZS1ERScqLyk7Ly90b2RvIHRvZG8gYmV0dGVyIHNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmdzX2pvaW5lZCA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICAgICAgc3RyaW5nc19qb2luZWQgPSAnPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPicgKyBzdHJpbmdzX2pvaW5lZCArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nc19qb2luZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgc3RhdGljIGNsYXNzIFQuVE1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQge1xuXG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb24ge1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgcG9zaXRpb25Qb2xhciB7XG4gICAgICAgIGRpc3Q6IG51bWJlcjtcbiAgICAgICAgZGVnOiBudW1iZXI7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVE1hdGgge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7Ly90b2RvIE1hdGguc2lnbiB8fCB0aGlzXG4gICAgICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gYmFzZVxuICAgICAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgYmFzZUxvZyhiYXNlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gQ3V0cyB1bmxlc3MgZGlnaXRzIHRvIHplcm9cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBwcmV0dHlOdW1iZXIobnVtYmVyOiBudW1iZXIsIG51bWJlcl9vZl9ub25femVyb19kaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgPSBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIHx8IDI7Ly90b2RvIHJlZmFjdG9yIGxpa2UgdGhpc1xuXG5cbiAgICAgICAgICAgIHZhciBkaWdpdHMgPSBNYXRoLmNlaWwoVE1hdGguYmFzZUxvZygxMCwgbnVtYmVyKSk7XG4gICAgICAgICAgICB2YXIgayA9IE1hdGgucG93KDEwLCBudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzIC0gZGlnaXRzKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyICogaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciAvIGs7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcxXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gPDA7MTgwPiBkZWdyZWVzIGRpZmZlcmVuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMTogbnVtYmVyLCBkZWcyOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLmFicyhkZWcxIC0gZGVnMikgJSAzNjA7XG4gICAgICAgICAgICBpZiAoZGVnID4gMTgwKWRlZyA9IDM2MCAtIGRlZztcbiAgICAgICAgICAgIHJldHVybiAoZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn0gZGVncmVlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHJhZDJkZWcocmFkaWFuczpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSkpICUgMzYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXNcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpYW5zXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZGVnMnJhZChkZWdyZWVzOm51bWJlcik6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVncmVlcyAlIDM2MCAqIChNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geFxuICAgICAgICAgKiBAcGFyYW0geVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgeHkyZGlzdCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgc3RhdGljIHh5MmRpc3REZWcoeDpudW1iZXIsIHk6bnVtYmVyKTpwb3NpdGlvblBvbGFyIHtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICBkaXN0OiBULlRNYXRoLnh5MmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgICAgZGVnOiAgVC5UTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIoeSwgeCkpXG5cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3Q6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cbiAgICAgICAgICAgIHZhciByYWQgPSBULlRNYXRoLmRlZzJyYWQoZGVnKTtcblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmNvcyhyYWQpICogZGlzdCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnNpbihyYWQpICogZGlzdFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKG91dHB1dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vdG9kbyBteWJlIHJlZmFjdG9yIHRvIHBvc2l0aW9uXG4gICAgICAgIHN0YXRpYyB4eVJvdGF0ZSh4OiBudW1iZXIsIHk6bnVtYmVyLCBkZWc6bnVtYmVyKTpwb3NpdGlvbiB7XG5cblxuICAgICAgICAgICAgdmFyIGRpc3QgPSBULlRNYXRoLnh5MmRpc3QoeCwgeSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMih5LCB4KTtcblxuICAgICAgICAgICAgcmFkICs9IFQuVE1hdGguZGVnMnJhZChkZWcpO1xuXG5cbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5jb3MocmFkKSAqIGRpc3QsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5zaW4ocmFkKSAqIGRpc3RcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChvdXRwdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIHN0YXRpYyByYW5kb21TZWVkUG9zaXRpb24oc2VlZDpudW1iZXIsIHBvc2l0aW9uOnBvc2l0aW9uKSB7XG5cblxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCAqIHBvc2l0aW9uLnkpIC0gc2VlZCwgMikpICsgMSkgLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gZmxvYXRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgdG9GbG9hdCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgZGVmdmFsID09PSAndW5kZWZpbmVkJylkZWZ2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGVmdmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBtdWx0aXR5cGUgdG8gaW50ZWdlclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyB0b0ludCh2YWx1ZTphbnksIGRlZnZhbD0wKTpudW1iZXIge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpcmV0dXJuIChkZWZ2YWwpO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRlZnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGJvdW5kcyh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlciB7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IG1pbilyZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KXJldHVybiBtYXg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHBvaW50W2IxeCxiMXldIGNvbGxpZGluZyBsaW5lP1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBpc09uTGluZShhMXg6bnVtYmVyLCBhMXk6bnVtYmVyLCBhMng6bnVtYmVyLCBhMnk6bnVtYmVyLCBiMXg6bnVtYmVyLCBiMXk6bnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgIGEyeCAtPSBhMXg7XG4gICAgICAgICAgICBhMnkgLT0gYTF5O1xuXG4gICAgICAgICAgICBiMXggLT0gYTF4O1xuICAgICAgICAgICAgYjF5IC09IGExeTtcblxuXG4gICAgICAgICAgICB2YXIgYVNsb3BlID0gYTJ5IC8gYTJ4O1xuICAgICAgICAgICAgdmFyIGJTbG9wZSA9IGIxeSAvIGIxeDtcblxuXG4gICAgICAgICAgICBpZiAoYVNsb3BlICE9IGJTbG9wZSlyZXR1cm4gZmFsc2U7XG5cblxuICAgICAgICAgICAgdmFyIGFEaXN0ID0gVC5UTWF0aC54eTJkaXN0KGEyeSwgYTJ4KTtcbiAgICAgICAgICAgIHZhciBiRGlzdCA9IFQuVE1hdGgueHkyZGlzdChiMXksIGIxeCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoYURpc3QgPj0gYkRpc3QpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBsaW5lIEEgY29sbGlkaW5nIGxpbmUgQj9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMXlcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGEyeFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXhcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMnlcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBsaW5lQ29sbGlzaW9uKGExeDpudW1iZXIsIGExeTpudW1iZXIsIGEyeDpudW1iZXIsIGEyeTpudW1iZXIsIGIxeDpudW1iZXIsIGIxeTpudW1iZXIsIGIyeDpudW1iZXIsIGIyeTpudW1iZXIpOiBib29sZWFuIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAoKGEyeCAtIGExeCkgKiAoYjJ5IC0gYjF5KSkgLSAoKGEyeSAtIGExeSkgKiAoYjJ4IC0gYjF4KSk7XG4gICAgICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgICAgIHZhciBudW1lcmF0b3IyID0gKChhMXkgLSBiMXkpICogKGEyeCAtIGExeCkpIC0gKChhMXggLSBiMXgpICogKGEyeSAtIGExeSkpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgY29pbmNpZGVudCBsaW5lcyAoaGFzIGEgcHJvYmxlbSwgcmVhZCBiZWxvdylcbiAgICAgICAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy92YXIgY29sbGlzaW9uPSAobnVtZXJhdG9yMSA9PSAwICYmIG51bWVyYXRvcjIgPT0gMCk7XG4gICAgICAgICAgICAgICAgLy9jb2xsaXNpb249ZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYk9uQSA9IFQuVE1hdGguaXNPbkxpbmUoYTF4LCBhMXksIGEyeCwgYTJ5LCBiMXgsIGIxeSk7XG4gICAgICAgICAgICAgICAgdmFyIGFPbkIgPSBULlRNYXRoLmlzT25MaW5lKGIxeCwgYjF5LCBiMngsIGIyeSwgYTF4LCBhMXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChiT25BIHx8IGFPbkIpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgciA9IG51bWVyYXRvcjEgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9ICgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLURlYnVnIFRERCBkbyBub3QgZGVsZXRlXG5cbiAgICAgICAgICAgIC8qdmFyIHNpemU9NTA7XG4gICAgICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgICAgICBzaXplKjIsc2l6ZSoyLGZ1bmN0aW9uKGN0eCl7XG5cbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgY3R4Lm1vdmVUbyhhMXgrc2l6ZSxhMXkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuXG4gICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgIGN0eC5tb3ZlVG8oYjF4K3NpemUsYjF5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5saW5lVG8oYjJ4K3NpemUsYjJ5K3NpemUpO1xuICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGltZyBzcmM9XCInK3NyYysnXCIgYm9yZGVyPScrKGNvbGxpc2lvbj8yOjApKyc+Jyk7Ki9cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcjpGdW5jdGlvbiwgYmx1cjpudW1iZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoeCwgeSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHZhciB4eCwgeXk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh5eSA9IHkgLSBibHVyOyB5eSA8PSB5ICsgYmx1cjsgeXkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5wb3coYmx1ciwgMikgPCBNYXRoLnBvdyh4eCAtIHgsIDIpICsgTWF0aC5wb3coeXkgLSB5LCAyKSljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdW0gLyBjb3VudCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgICAgIGlmIChieXRlcyA9PT0gMCkgcmV0dXJuICcwQic7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSkgKyAnJyArIHNpemVzW2ldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfcG9zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGFfZW5kXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX2VuZFxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIHByb3BvcnRpb25zKGFfc3RhcnQ6bnVtYmVyLCBhX3Bvc2l0aW9uOm51bWJlciwgYV9lbmQ6bnVtYmVyLCBiX3N0YXJ0Om51bWJlciwgYl9lbmQ6bnVtYmVyKTpudW1iZXIge1xuXG5cbiAgICAgICAgICAgIHZhciBhX3dob2xlID0gYV9lbmQgLSBhX3N0YXJ0O1xuICAgICAgICAgICAgdmFyIGJfd2hvbGUgPSBiX2VuZCAtIGJfc3RhcnQ7XG5cbiAgICAgICAgICAgIHZhciBhX3BhcnQgPSBhX2VuZCAtIGFfcG9zaXRpb247XG4gICAgICAgICAgICB2YXIgYl9wYXJ0ID0gKGJfd2hvbGUgKiBhX3BhcnQpIC8gYV93aG9sZTtcblxuICAgICAgICAgICAgcmV0dXJuIChiX2VuZCAtIGJfcGFydCk7XG5cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlJlc291cmNlc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cbm1vZHVsZSBUIHtcblxuICAgIGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XG4gICAgICAgIHVzZXJuYW1lOiAnc3RyaW5nJztcbiAgICAgICAgbmFtZTogJ3N0cmluZyc7XG4gICAgICAgIHN1cm5hbWU6ICdzdHJpbmcnO1xuICAgICAgICBlbWFpbDogJ3N0cmluZyc7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XG5cblxuICAgICAgICBwcm9maWxlOiBVc2VyUHJvZmlsZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgcmF3IHVzZXIgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IodXNlcjogVXNlcikge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXNlcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIG9mIHVzZXJzIHNpZ25hdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmF0dXJlSFRNTCgpOnN0cmluZyB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnByb2ZpbGUubmFtZSArICcgJyArIHRoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMucHJvZmlsZS51c2VybmFtZTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgICAgICB2YXIgc2lnbmF0dXJlX2h0bWwgPSBgXG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1zaWduYXR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVzZXItaW1hZ2VcIiBzcmM9XCJodHRwczovLzEuZ3JhdmF0YXIuY29tL2F2YXRhci9gICsgZW1haWxfbWQ1ICsgYD9zPTgwJnI9cGcmZD1tbVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ1c2VyLW5hbWVcIj5gICsgbmFtZSArIGA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArIHRoaXMucHJvZmlsZS5zaWduYXR1cmUuaHRtbDJ0ZXh0KCkgKyBgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNpZ25hdHVyZV9odG1sKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG59IiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGluc3RhbmNlIFQuV29ybGQudGVycmFpbnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUgVC5Xb3JsZHtcblxuXG4gICAgZXhwb3J0IHZhciB0ZXJyYWlucyA9IFtcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAwICxjb2xvcjogJyMwMDAwMDAnLCBzaXplOiAxfX0sIG5hbWU6ICd0ZW1ub3RhJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEgLGNvbG9yOiAnIzMzN0VGQScsIHNpemU6IDF9fSwgbmFtZTogJ21vxZllJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDQgLGNvbG9yOiAnI0Y5Rjk4RCcsIHNpemU6IDF9fSwgbmFtZTogJ3DDrXNlayd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDYgLGNvbG9yOiAnIzVBMkYwMCcsIHNpemU6IDF9fSwgbmFtZTogJ2hsw61uYSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA3ICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOSAsY29sb3I6ICcjNTFGMzExJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKHRveGljKSd9KSxcbiAgICAgICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMCxjb2xvcjogJyM1MzU4MDUnLCBzaXplOiAxfX0sIG5hbWU6ICdsZXMnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTIsY29sb3I6ICcjOEFCQzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKGphcm8pJ30pLFxuICAgICAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDEzLGNvbG9yOiAnIzhBOTAwMicsIHNpemU6IDF9fSwgbmFtZTogJ3Ryw6F2YShwb3ppbSknfSlcbiAgICBdO1xuXG5cbn1cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxubW9kdWxlIFQuV29ybGR7XG5cbiAgICBleHBvcnQgdmFyIG1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgICAgICBULlRNYXRoLmJsdXJYWShmdW5jdGlvbih4OiBudW1iZXIseTogbnVtYmVyKXtcblxuICAgICAgICAgICAgLy90b2RvLy92YXIga2V5PSd4Jyt4Kyd5Jyt5O1xuICAgICAgICAgICAgLy90b2RvLy9pZih0eXBlb2Ygel9tYXBfY2FjaGVba2V5XSE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgLy90b2RvLy99XG5cblxuICAgICAgICAgICAgY29uc3QgZGl2PTEwMDtcblxuXG4gICAgICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgICAgIHZhciBtYXhfcG9zc2libGVfbj0wO1xuXG4gICAgICAgICAgICB2YXIgX3g6IG51bWJlcixfeTogbnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgaz0wLjQ7XG4gICAgICAgICAgICB2YXIga189MS1rO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICAgICAgbiArPSBNYXRoLnJvdW5kKE1hdGgucG93KHgqeS02NiwgMikpICUgKGRpdiArIDEpO1xuXG4gICAgICAgICAgICAgICAgbWF4X3Bvc3NpYmxlX24rPWRpdjtcblxuICAgICAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAgICAgLy95PU1hdGguZmxvb3IoeS8zKTtcbiAgICAgICAgICAgICAgICAvL3ZhciB4eSA9IFQuVE1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgICAgICAvL3g9eHkueDtcbiAgICAgICAgICAgICAgICAvL3k9eHkueTtcblxuICAgICAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICAgICAgX3k9KHgqaykrKHkqa18pO1xuXG4gICAgICAgICAgICAgICAgeD1NYXRoLmZsb29yKF94LzQpO1xuICAgICAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIG49bi9tYXhfcG9zc2libGVfbjtcblxuICAgICAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgICAgICBpZihuPjEpbi09TWF0aC5mbG9vcihuKTtcblxuICAgICAgICAgICAgLy90b2RvLy96X21hcF9jYWNoZVtrZXldPW47XG4gICAgICAgICAgICByZXR1cm4obik7XG5cbiAgICAgICAgfSwyKVxuICAgICAgICAsXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICAsXG5cbiAgICAgICAgbmV3IFQuTWFwR2VuZXJhdG9yLkJpb3RvcGUoW1xuXG4gICAgICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46ICBULldvcmxkLnRlcnJhaW5zWzExXX0sLy/FmWVrYVxuICAgICAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDRdfSwvL3DDrXNla1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNDAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOV19LC8vdHLDoXZhIHRveGljXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxMF19LC8vbGVzXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgICAgICB7IGFtb3VudDogNTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgICAgICB7IGFtb3VudDogMTAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sxM119LC8vdHLDoXZhIHBvemltXG4gICAgICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiAgVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDUgLCB0ZXJyYWluOiAgIFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICAgICAgeyBhbW91bnQ6IDYwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDddfSwvL3Nuw61oL2xlZFxuICAgICAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogIFQuV29ybGQudGVycmFpbnNbIDVdfSwvL2thbWVuw61cblxuXG5cbiAgICAgICAgXSksXG5cblxuICAgICAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICAgICAgaWYob2JqZWN0LnR5cGUhPSd0ZXJyYWluJylyZXR1cm47XG5cbiAgICAgICAgICAgIC8qaWYob2JqZWN0LmdldENvZGUoKT09NSl7XG4gICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgeDogb2JqZWN0LngsLy90b2RvXG4gICAgICAgICAgICAgeTogb2JqZWN0LnksLy90b2RvXG4gICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgIGRlc2lnbjoge1xuICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICBpbWFnZToncm9jaycrTWF0aC5mbG9vcihULlRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigxLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSo2KSU2KydkYXJrJytNYXRoLmZsb29yKFQuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgc2l6ZTogMC41K1QuVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDUse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjFcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgIH1lbHNlKi9cbiAgICAgICAgICAgIGlmKG9iamVjdC5nZXRDb2RlKCk9PTEwKXtcblxuICAgICAgICAgICAgICAgIGlmKFRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbigzLHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KT4wLjk1KXtcblxuICAgICAgICAgICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9iamVjdC54LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IG9iamVjdC55LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOid0cmVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDMrVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDYse3g6b2JqZWN0LngseTpvYmplY3QueX0pLzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogVE1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFRNYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSoyMC0xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiBUTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMzYwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICk7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIGV4cG9ydCB2YXIgZ2FtZSA9IG5ldyBULkdhbWUoXG4gICAgICAgIFQuVE1hdGgucHJldHR5TnVtYmVyLFxuICAgICAgICBULlRNYXRoLnByZXR0eU51bWJlclxuICAgICk7XG5cbn0iLCJcbm1vZHVsZSBULldvcmxkIHtcblxuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgICAgICAgc3RyZW5ndGg6IDAsXG4gICAgICAgICAgICByb3VuZHM6IDEsXG4gICAgICAgICAgICBjb29sZG93bjogMVxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ2F0dGFjaycpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLCAyKSAqIHRoaXMucGFyYW1zLnN0cmVuZ3RoICogdGhpcy5wYXJhbXMucm91bmRzICogKDEgLyB0aGlzLnBhcmFtcy5jb29sZG93bikpICogMTAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMn0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3RhdGljIGV4ZWN1dGUoZ2FtZSwgYXR0YWNrZXIsIGF0dGFja2VkLCByZXNvdXJjZXNfYXR0YWNrZXIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9hdHRhY2sgPSBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdkZWZlbmNlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VkX2RlZmVuY2UgPSBhdHRhY2tlZC5nZXRBY3Rpb24oJ2RlZmVuY2UnKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlcl9saWZlID0gYXR0YWNrZXIuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLU1pc3NpbmcgYWN0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9hdHRhY2sgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyX2F0dGFjay5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9kZWZlbmNlIGluc3RhbmNlb2YgVC5HYW1lLkFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gYXR0YWNrZXJfZGVmZW5jZS5jbG9uZSgpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrID0gYXR0YWNrZWRfYXR0YWNrLmNsb25lKCkucGFyYW1zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjayA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnYXR0YWNrJykucGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRfZGVmZW5jZSBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZSA9IGdhbWUuZ2V0QWN0aW9uRW1wdHlJbnN0YW5jZSgnZGVmZW5jZScpLnBhcmFtcztcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBhdHRhY2tlci5nZXRQb3NpdGlvbigpLmdldERpc3RhbmNlKGF0dGFja2VkLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IGF0dGFja2VyX2F0dGFjay5kaXN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0cyBhcmUgdG9vIGZhciAtICcgKyBkaXN0YW5jZSArICcgZmllbGRzLiBBdHRhY2sgZGlzdGFuY2UgaXMgb25seSAnICsgYXR0YWNrZXJfYXR0YWNrLmRpc3RhbmNlICsgJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29vbGRvd25cbiAgICAgICAgICAgICAgICBpZiAoIWF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZE5vdygpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJyArIGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJykuY2FuQmVFeGVjdXRlZEluKCkgKyAnIHNlY29uZHMuJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5ub3dFeGVjdXRlZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLURlZmVuY2VcblxuICAgICAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvL3IoJ2RlZmVuY2UnLGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZSxhdHRhY2tlZF9kZWZlbmNlLmRlZmVuY2UpO1xuXG4gICAgICAgICAgICAgICAgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIC09XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoIDwgMClhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGggPSAwO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggLT1cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGggPCAwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAvL2F0dGFja2VyX2xpZmUubGlmZT0xMDAwO1xuICAgICAgICAgICAgICAgIC8vYXR0YWNrZWRfbGlmZS5saWZlPTEwMDA7XG5cblxuICAgICAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgIChhdHRhY2tlcl9saWZlLmxpZmUgPiAxICYmIGF0dGFja2VkX2xpZmUubGlmZSA+IDEpXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHIoJ3JvdW5kJywgYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoLCBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByKCdsaWZlJywgYXR0YWNrZWRfbGlmZS5saWZlLCBhdHRhY2tlcl9saWZlLmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZSAtPSBhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZSAtPSBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjay5yb3VuZHMtLTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlcl9saWZlLmxpZmUgPCAxKWF0dGFja2VyX2xpZmUubGlmZSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkX2xpZmUubGlmZSA8IDEpYXR0YWNrZWRfbGlmZS5saWZlID0gMTtcblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufVxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZlbmNlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnZGVmZW5jZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMucGFyYW1zLmRlZmVuY2UpICogODAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAxfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbm1vZHVsZSBULldvcmxkIHtcblxuICAgIFdvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgICAgICB7XG4gICAgICAgICAgICBsaWZlOiAxLFxuICAgICAgICAgICAgbWF4X2xpZmU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdsaWZlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW25ldyBULlJlc291cmNlcygpXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgd29vZDogMCxcbiAgICAgICAgICAgIGlyb246IDAsXG4gICAgICAgICAgICBjbGF5OiAwLFxuICAgICAgICAgICAgc3RvbmU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9uIHtcblxuXG4gICAgICAgICAgICBzdGF0aWMgZ2V0VHlwZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdtaW5lJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY291bnRQcmljZUJhc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5wYXJhbXMuYW1vdW50KSAqIDM2MDAgKiAwLjA1KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBnZXRQcmljZVJlc291cmNlcygpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogM30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogMn0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydzdG9uZSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDR9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gb3IgbWF5YmUgZXhlY3V0ZVxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfVxuICAgICk7XG5cbn1cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwZWVkOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbiB7XG5cblxuICAgICAgICAgICAgc3RhdGljIGdldFR5cGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnbW92ZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE1hdGgucG93KHRoaXMucGFyYW1zLnNwZWVkLCAyKSkgKiAxMCAqIDAuMDUpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMH0pLFxuICAgICAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDB9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6IDF9KVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHN0YXRpYyBleGVjdXRlKGdhbWUsIG9iamVjdCwgZGVzdGluYXRpb25zLyosb2JqZWN0c19uZWFyYnkscmVzb3VyY2VzKi8pIHtcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgYWN0aW9uLy90b2RvIG1heWJlIGF1dG9cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gb2JqZWN0LmdldEFjdGlvbignbW92ZScpO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgaGFzIG5vdCBhYmlsaXR5IHRvIG1vdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0X3Bvc2l0aW9uID0gb2JqZWN0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25zLnVuc2hpZnQoc3RhcnRfcG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy9yKGRlc3RpbmF0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QucGF0aCA9IFQuUGF0aC5uZXdDb25zdGFudFNwZWVkKGRlc3RpbmF0aW9ucywgYWN0aW9uLnBhcmFtcy5zcGVlZCk7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlLy90b2RvIG1heWJlIGF1dG9cbiAgICAgICAgICAgICAgICBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJykubm93RXhlY3V0ZWQoKTsvL3RvZG8gaXMgaXQgbmVlZGVkXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gbWF5YmUgPz8/IHRvZG9cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH1cbiAgICApO1xuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgcmVnZW5lcmF0ZTogMTAwLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3JlZ2VuZXJhdGUnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgxIC8gdGhpcy5wYXJhbXMucmVnZW5lcmF0ZSkgKiAzNjAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDR9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAyfSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7Ly90b2RvIG1heWJlIHRpY2s/Pz8/XG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxufSIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlIFQuV29ybGQge1xuXG4gICAgV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlcGFpcjogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3JlcGFpcicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGNvdW50UHJpY2VCYXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKDEgLyAodGhpcy5wYXJhbXMucmVwYWlyIC8gMTAwKSkgKiAxMDAwICogMC4wNSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnd29vZCc6IDR9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6IDJ9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiA0fSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAgLy90b2RvXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9XG4gICAgKTtcblxuXG59IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUgVC5Xb3JsZCB7XG5cbiAgICBXb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3VnaHB1dDogMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzcyBleHRlbmRzIFQuR2FtZS5BY3Rpb24ge1xuXG5cbiAgICAgICAgICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3Rocm91Z2hwdXQnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb3VudFByaWNlQmFzZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChNYXRoLnBvdyh0aGlzLnBhcmFtcy50aHJvdWdocHV0IC8gMTAwLCAyKSkgKiAxMCAqIDAuMDUpOy8vdG9kb1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGdldFByaWNlUmVzb3VyY2VzKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAyfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2NsYXknOiAzfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogMX0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogMH0pXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgKTtcblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
