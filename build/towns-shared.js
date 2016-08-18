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
            for (var i = 0, l = array.length; i < l; i++) {
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
            var virtual_objects = new T.Objects.Array();
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
         * @param {boolean} natural_objects
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
            function Biotope(biotopeItemAmountObjects) {
                var sum = 0;
                biotopeItemAmountObjects.forEach(function (biotopeItemAmountObject) {
                    sum += biotopeItemAmountObject.amount;
                });
                var from = 0;
                this.terrains = biotopeItemAmountObjects.map(function (biotopeItemAmountObject) {
                    var biotopeItemFromObject = {
                        from: from / sum,
                        terrain: biotopeItemAmountObject.terrain
                    };
                    from += biotopeItemAmountObject.amount;
                    return (biotopeItemFromObject);
                });
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
                this.objects.push(T.Objects.Object.init(object));
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
                    //if (this.objects[i].type != 'terrain')continue;
                    if (this.objects[i] instanceof T.Objects.Terrain) {
                        if (this.objects[i].design.data.size <= position.getDistance(new T.Position(this.objects[i].x, this.objects[i].y))) {
                            return (this.objects[i]);
                        }
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
                    this.path = new ((_a = T.Path).bind.apply(_a, [void 0].concat(this.path)))();
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
                var _a;
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
            return new ((_a = T.Path).bind.apply(_a, [void 0].concat(array_position_date)))();
            var _a;
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
            regenerate: 100,
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
