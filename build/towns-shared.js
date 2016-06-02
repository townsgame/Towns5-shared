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
 * @fileOverview Creates static class T.Math
 */
//======================================================================================================================
/**
 * Mathematical functions to Towns
 */
T.Math = (function () {
    function class_2() {
    }
    /**
     *
     * @static
     * @param {number}
     * @return {number}
     */
    class_2.sign = function (x) {
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
    class_2.baseLog = function (base, number) {
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
    class_2.prettyNumber = function (number, number_of_non_zero_digits) {
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
    class_2.angleDiff = function (deg1, deg2) {
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
    class_2.rad2deg = function (radians) {
        return (radians * (180 / Math.PI)) % 360;
    };
    //-------------------------
    /**
     * @static
     * @param {number} degrees
     * @return {number} radians
     */
    class_2.deg2rad = function (degrees) {
        return (degrees % 360 * (Math.PI / 180));
    };
    //-------------------------
    /**
     * @static
     * @param x
     * @param y
     * @return {number} distance
     */
    class_2.xy2dist = function (x, y) {
        return (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    };
    //-------------------------
    //todo refactor to position
    class_2.xy2distDeg = function (x, y) {
        var output = {};
        output.dist = this.xy2dist(x, y);
        output.deg = this.rad2deg(Math.atan2(y, x));
        return (output);
    };
    //-------------------------
    //todo refactor to position
    class_2.distDeg2xy = function (dist, deg) {
        var rad = this.deg2rad(deg);
        var output = {};
        output.x = Math.cos(rad) * dist;
        output.y = Math.sin(rad) * dist;
        return (output);
    };
    //-------------------------
    //todo mybe refactor to position
    class_2.xyRotate = function (x, y, deg) {
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
    class_2.randomSeedPosition = function (seed, position) {
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
    class_2.toFloat = function (value, defval) {
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
    class_2.toInt = function (value, defval) {
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
    class_2.bounds = function (value, min, max) {
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
    class_2.isOnLine = function (a1x, a1y, a2x, a2y, b1x, b1y) {
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
    class_2.lineCollision = function (a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
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
    class_2.blurXY = function (generator, blur) {
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
    class_2.bytesToSize = function (bytes) {
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
    class_2.proportions = function (a_start, a_position, a_end, b_start, b_end) {
        var a_whole = a_end - a_start;
        var b_whole = b_end - b_start;
        var a_part = a_end - a_position;
        var b_part = (b_whole * a_part) / a_whole;
        return (b_end - b_part);
    };
    return class_2;
}());
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
    function class_3(resources) {
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
    class_3.prototype.clone = function () {
        return new T.Resources(this);
    };
    /**
     * Checks whether this contains a given resources
     * @param {object} Resources
     * @return {bool} contains
     */
    class_3.prototype.contains = function (resources) {
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
    class_3.prototype.add = function (resources) {
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
    class_3.prototype.multiply = function (k) {
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
    class_3.prototype.signum = function (k) {
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
    class_3.prototype.apply = function (modifier) {
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
    class_3.prototype.extractKeys = function () {
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
    class_3.prototype.compare = function (resoures) {
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
    class_3.prototype.remove = function (resources) {
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
    class_3.prototype.toString = function () {
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
    class_3.prototype.toHTML = function () {
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
    return class_3;
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
    function class_4(user) {
        for (var key in user) {
            var this_key = key;
            this[this_key] = user[key];
        }
    }
    /**
     *
     * @returns {string} HTML code of users signature
     */
    class_4.prototype.getSignatureHTML = function () {
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
    return class_4;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Color
 */
//======================================================================================================================
/**
 * Object which represents RGBA color.
 */
T.Color = (function () {
    /**
     *
     * @param r red from 0 to 255
     * @param g green from 0 to 255
     * @param b blue from 0 to 255
     * @param a alpha from 0 to 255
     */
    function class_5(r, g, b, a) {
        if (a === void 0) { a = 255; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Repairs overflowed colors
     * @private
     */
    class_5.prototype.bounds = function () {
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
    class_5.prototype.getCssColor = function () {
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
    class_5.prototype.getHex = function () {
        this.bounds();
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    };
    /**
     * Creates new T.Color form hex code of color
     * @param {string} hex code of color eg. #00ff00
     * @returns {T.Color} Color
     */
    class_5.createFromHex = function (hex) {
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
    return class_5;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Path
 */
//======================================================================================================================
T.Path = (function () {
    /**
     * @param {...T.PositionDate} Position with date at least 2
     */
    function class_6() {
        var args = Array.prototype.slice.call(arguments);
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
            if (position_date instanceof T.PositionDate) { }
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
    class_6.prototype.toJSON = function () {
        return (this.array_position_date);
    };
    /**
     *
     * @param {Array.<T.Position>} array_position
     * @param {number} speed
     * @param {Date} date
     * @returns {T.Path}
     */
    class_6.newConstantSpeed = function (array_position, speed, date) {
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
            if (position_date instanceof T.Position) { }
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
    class_6.prototype.countSegment = function (date) {
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
    class_6.prototype.countPosition = function (date) {
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
    class_6.prototype.countRotation = function (date) {
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
    class_6.prototype.countSpeed = function (date) {
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
    class_6.prototype.inProgress = function (date) {
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
    class_6.prototype.toString = function () {
        return this.array_position_date.join(', ');
    };
    return class_6;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================
T.Position3D = (function () {
    function class_7(x, y, z) {
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
    class_7.prototype.clone = function () {
        return new T.Position3D(this);
    };
    /**
     * Converts Position3D to simple string
     * @return {string}
     */
    class_7.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + ',' + this.z + ']';
    };
    return class_7;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================
T.PositionPolar = (function () {
    function class_8(distance, degrees) {
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
    class_8.prototype.clone = function () {
        return new T.PositionPolar(this);
    };
    class_8.prototype.getPosition = function () {
        var radians = this.getRadians();
        return (new T.Position(Math.cos(radians) * this.distance, Math.sin(radians) * this.distance));
    };
    class_8.prototype.getDistance = function () {
        return this.distance;
    };
    class_8.prototype.getDegrees = function () {
        return (this.degrees + 360) % 360;
    };
    class_8.prototype.getRadians = function () {
        return T.Math.deg2rad(this.degrees);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_8.prototype.toString = function () {
        return '' + this.distance + ',' + this.degrees + '°';
    };
    return class_8;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position
 */
//======================================================================================================================
/**
 * Global position on towns map
 */
T.Position = (function () {
    function class_9(x, y) {
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
    class_9.prototype.clone = function () {
        return new T.Position(this);
    };
    class_9.prototype.plus = function (position) {
        this.x += position.x;
        this.y += position.y;
        return this;
    };
    class_9.prototype.multiply = function (k) {
        this.x = this.x * k;
        this.y = this.y * k;
        return this;
    };
    class_9.prototype.getPositionPolar = function () {
        return (new T.PositionPolar(T.Math.xy2dist(this.x, this.y), T.Math.rad2deg(Math.atan2(this.y, this.x))));
    };
    class_9.prototype.getDistance = function (position) {
        return T.Math.xy2dist(position.x - this.x, position.y - this.y);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_9.prototype.toString = function () {
        return '' + this.x + ',' + this.y + '';
    };
    return class_9;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================
/**
 * Global position on towns map with time
 */
T.PositionDate = (function (_super) {
    __extends(class_10, _super);
    function class_10(x, y, date) {
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
    class_10.prototype.clone = function () {
        return new T.PositionDate(this);
    };
    /**
     * Return only position
     * @returns {T.Position}
     */
    class_10.prototype.getPosition = function () {
        return new T.Position(this.x, this.y);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_10.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + '] at ' +
            (this.date.getDay() + 1) + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear() +
            ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
    };
    return class_10;
}(T.Position));
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
    function class_11(max_life_modifier, price_key_modifier) {
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
    class_11.prototype.getObjectPriceBases = function (object) {
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
    class_11.prototype.getObjectMaxLife = function (object) {
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
    class_11.prototype.getObjectPrices = function (object) {
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
    class_11.prototype.getObjectPrice = function (object) {
        var price = new T.Resources({});
        //console.log('empty price',price);
        var prices = this.getObjectPrices(object);
        prices.forEach(function (price_) {
            price.add(price_);
        });
        price.apply(this.price_key_modifier);
        return (price);
    };
    class_11.prototype.installActionClass = function (action_empty_instance_params, action_class) {
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
    class_11.prototype.getActionClass = function (action_type) {
        var action_class = this.action_classes[action_type];
        if (typeof action_class == 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type + '. There are only these action types: ' + T.ArrayFunctions.getKeys(this.action_classes).join(', '));
        }
        return (action_class);
    };
    class_11.prototype.newActionInstance = function (action) {
        //todo solve defense vs. defence
        if (action.type === 'defense') {
            action.type = 'defence';
            action.params.defence = action.params.defense;
            delete action.params.defense;
        }
        var action_class = this.getActionClass(action.type);
        return new action_class(action);
    };
    class_11.prototype.createActionExecute = function (action_type) {
        var game = this;
        var action_class = this.getActionClass(action_type);
        var execute = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(game);
            return action_class.execute.apply(this, args);
        };
        return (execute);
    };
    class_11.prototype.getActionEmptyInstance = function (action_type) {
        var action_instance = this.action_empty_instances[action_type];
        if (typeof action_instance === 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type);
        }
        return (action_instance);
    };
    return class_11;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
T.Game.Action = (function () {
    function class_12(action) {
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
    class_12.prototype.countPriceBase = function () {
        return (0);
    };
    class_12.prototype.getPriceResources = function () {
        return ([]);
    };
    class_12.execute = function () {
        throw new Error('You can not execute passive action.');
    };
    /**
     * In how many seconds can be this action instance executed?
     * @returns {number}
     */
    class_12.prototype.canBeExecutedIn = function () {
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
    class_12.prototype.canBeExecutedNow = function () {
        return (this.canBeExecutedIn() === 0);
    };
    /**
     * Set actual date as date of execution this action instance
     */
    class_12.prototype.nowExecuted = function () {
        this.last_use = new Date();
    };
    /**
     * Creates html profile of action ability
     * @returns {string}
     */
    class_12.prototype.createHtmlProfile = function () {
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
    return class_12;
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
    function class_13(getZ, z_normalizing_table, biotope, virtualObjectGenerator) {
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
    class_13.prototype.getZMapCircle = function (center_integer, radius) {
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
    class_13.prototype.terrainMap = function (map) {
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
    class_13.prototype.getMapArrayCircle = function (center_integer, radius) {
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
    class_13.prototype.convertMapArrayToObjects = function (map_array, center_integer, radius) {
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
    class_13.prototype.getPureMap = function (center, radius, not_center) {
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
    class_13.prototype.getVirtualObjectsFromTerrainObjects = function (objects) {
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
    class_13.prototype.getCompleteObjects = function (real_objects, center, radius, natural_objects, not_center) {
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
    return class_13;
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
    function class_14(terrains) {
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
    class_14.prototype.getZTerrain = function (z) {
        for (var i = this.terrains.length - 1; i >= 0; i--) {
            if (z >= this.terrains[i].from)
                return (this.terrains[i].terrain);
        }
    };
    return class_14;
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
    function class_15(json) {
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
    class_15.prototype.clone = function () {
        return (new T.Model(JSON.parse(JSON.stringify(this))));
    };
    /**
     * @param {number} rotation
     * @param {number} size
     */
    class_15.prototype.addRotationSize = function (rotation, size) {
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
    class_15.prototype.range = function (dimension) {
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
    class_15.prototype.moveBy = function (move_x, move_y, move_z) {
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
    class_15.prototype.joinModelZ = function (model, move_x, move_y) {
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
    class_15.prototype.joinModel = function (model, move_x, move_y) {
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
    class_15.prototype.getDeepCopyWithoutLinks = function () {
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
     * @returns {Array} array of particles
     */
    class_15.prototype.getLinearParticles = function () {
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
        particles2Linear(model.particles, false, model.rotation, model.size);
        //todo strict mode//delete model;
        return (particlesLinear);
    };
    /**
     *
     * @param path
     * @returns {object} part of this
     */
    class_15.prototype.filterPath = function (path) {
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
    class_15.prototype.filterPathSiblings = function (path) {
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
    class_15.prototype.aggregateResourcesVolumes = function () {
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
    class_15.prototype.getHash = function () {
        return 'xxx' + JSON.stringify(this.particles).length; //todo better
    };
    return class_15;
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
    function class_16() {
    }
    /**
     * Add missing params into particle
     * @static
     * @param {object} particle
     * @return {object} particle
     */
    class_16.addMissingParams = function (particle) {
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
    class_16.getTriangles = function (particle, point_class) {
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
    class_16.get3D = function (particle) {
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
    class_16.get2Dlines = function (particle, base) {
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
    class_16.collisionLinesDetect = function (lines1, lines2) {
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
    class_16.collision2D = function (particle1, particle2) {
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
    return class_16;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Array
 */
//======================================================================================================================
T.setNamespace('Objects');
//todo T.Objects.Array = class extends Array{
T.Objects.Array = (function () {
    /**
     *
     * @param {Array} objects
     * todo ????????? @constructor
     */
    function class_17(objects) {
        this.objects = [];
        if (objects instanceof Array)
            objects.forEach(this.push, this);
    }
    class_17.prototype.getAll = function () {
        return this.objects;
    };
    class_17.prototype.forEach = function () {
        return this.objects.forEach.apply(this.objects, arguments);
    };
    class_17.prototype.filter = function (callback) {
        var filtered_objects = new T.Objects.Array();
        //r(filtered_objects.objects);
        filtered_objects.objects = this.objects.filter(callback);
        return (filtered_objects);
    };
    class_17.initInstance = function (object) {
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
    /**
     * Push new object into Objects Array
     * @param object
     * @returns {Number}
     */
    class_17.prototype.push = function (object) {
        return this.objects.push(T.Objects.Array.initInstance(object));
    };
    /**
     * Update or push object into Objects Array
     * @param object
     */
    class_17.prototype.update = function (object) {
        if (!this.setById(object.id, object)) {
            this.push(object);
        }
    };
    /**
     *
     * @param {string} id
     * @returns {object}
     */
    class_17.prototype.getById = function (id) {
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
    class_17.prototype.setById = function (id, object) {
        if (typeof id !== 'string')
            throw new Error('setById: id should be string');
        for (var i in this.objects) {
            if (this.objects[i].id == id) {
                this.objects[i] = T.Objects.Array.initInstance(object);
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
    class_17.prototype.removeId = function (id, object) {
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
    class_17.prototype.filterTypes = function () {
        var filtered_objects = new T.Objects.Array();
        var types = Array.prototype.slice.call(arguments);
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
    class_17.prototype.filterRadius = function (center, radius) {
        var filtered_objects = new T.Objects.Array();
        this.forEach(function (object) {
            if (object.getPosition().getDistance(center) <= radius) {
                filtered_objects.getAll().push(object);
            }
        });
        return (filtered_objects);
    };
    class_17.prototype.filterArea = function (area) {
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
    class_17.prototype.getMapOfTerrainCodes = function (center, radius) {
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
    class_17.prototype.get1x1TerrainObjects = function () {
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
    class_17.prototype.getTerrainOnPosition = function (position) {
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
    class_17.prototype.getNearestTerrainPositionWithCode = function (position, terrain_code) {
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
    return class_17;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Object
 */
//======================================================================================================================
T.Objects.Object = (function () {
    /**
     * @param {object} object
     */
    function class_18(object) {
        for (var key in object) {
            var this_key = key;
            if (this_key == '_id')
                this_key = 'id'; //todo maybe better solution
            this[this_key] = object[key];
        }
    }
    //todo jsdoc
    class_18.prototype.getPosition = function () {
        return (new T.Position(this.x, this.y));
    };
    /**
     * @returns {boolean}
     */
    class_18.prototype.isMoving = function () {
        return (false);
    };
    /**
     *
     * @returns {string}
     */
    class_18.prototype.toString = function () {
        return ('[' + this.name + ']');
    };
    return class_18;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================
T.Objects.Building = (function (_super) {
    __extends(class_19, _super);
    /**
     * @param {object} object
     */
    function class_19(object) {
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
    class_19.prototype.getPosition = function (date) {
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
    class_19.prototype.isMoving = function (date) {
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
    class_19.prototype.clone = function () {
        return (new T.Objects.Building(JSON.parse(JSON.stringify(this))));
    };
    /**
     * @returns {T.Model}
     */
    class_19.prototype.getModel = function () {
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
    class_19.prototype.getAction = function (action_type) {
        for (var i = 0, l = this.actions.length; i < l; i++) {
            if (this.actions[i].type == action_type) {
                return (this.actions[i]);
            }
        }
        return null;
    };
    class_19.prototype.createHtmlProfile = function () {
        var actions_profile = '';
        for (var i = 0, l = this.actions.length; i < l; i++) {
            actions_profile += this.actions[i].createHtmlProfile();
        }
        return ("\n\n            <div class=\"object-building-profile\">\n\n                <h2>" + this.name + "</h2>\n                " + this.getPosition() + "\n\n\n                " + actions_profile + "\n\n\n\n            </div>\n\n        ");
    };
    return class_19;
}(T.Objects.Object));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Natural
 */
//======================================================================================================================
T.Objects.Natural = (function (_super) {
    __extends(class_20, _super);
    function class_20() {
        _super.apply(this, arguments);
    }
    class_20.prototype.clone = function () {
        return (new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
    };
    class_20.prototype.getCode = function () {
        return (this.design.data.image);
    };
    return class_20;
}(T.Objects.Object));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================
T.Objects.Story = (function (_super) {
    __extends(class_21, _super);
    function class_21() {
        _super.apply(this, arguments);
    }
    class_21.prototype.clone = function () {
        return (new T.Objects.Story(JSON.parse(JSON.stringify(this))));
    };
    class_21.prototype.getMarkdown = function () {
        return (this.content.data);
    };
    return class_21;
}(T.Objects.Object));
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================
T.Objects.Terrain = (function (_super) {
    __extends(class_22, _super);
    function class_22() {
        _super.apply(this, arguments);
    }
    class_22.prototype.clone = function () {
        return (new T.Objects.Terrain(JSON.parse(JSON.stringify(this))));
    };
    class_22.prototype.getCode = function (prefered_width) {
        return (this.design.data.image);
    };
    class_22.prototype.getColor = function () {
        return (this.design.data.color);
    };
    return class_22;
}(T.Objects.Object));
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
    __extends(class_23, _super);
    function class_23() {
        _super.apply(this, arguments);
    }
    class_23.getType = function () {
        return ('attack');
    };
    class_23.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.distance, 2) * this.params.strength * this.params.rounds * (1 / this.params.cooldown)) * 100 * 0.05);
    };
    class_23.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 2 })
        ]);
    };
    class_23.execute = function (game, attacker, attacked, resources_attacker) {
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
    return class_23;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    defence: 0
}, (function (_super) {
    __extends(class_24, _super);
    function class_24() {
        _super.apply(this, arguments);
    }
    class_24.getType = function () {
        return ('defence');
    };
    class_24.prototype.countPriceBase = function () {
        return ((this.params.defence) * 800 * 0.05);
    };
    class_24.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 1 }),
        ]);
    };
    return class_24;
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
    __extends(class_25, _super);
    function class_25() {
        _super.apply(this, arguments);
    }
    class_25.getType = function () {
        return ('life');
    };
    class_25.prototype.countPriceBase = function () {
        return (0);
    };
    class_25.prototype.getPriceResources = function () {
        return ([new T.Resources()]);
    };
    return class_25;
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
    __extends(class_26, _super);
    function class_26() {
        _super.apply(this, arguments);
    }
    class_26.getType = function () {
        return ('mine');
    };
    class_26.prototype.countPriceBase = function () {
        return ((this.params.amount) * 3600 * 0.05);
    };
    class_26.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 3 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_26;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    speed: 0
}, (function (_super) {
    __extends(class_27, _super);
    function class_27() {
        _super.apply(this, arguments);
    }
    class_27.getType = function () {
        return ('move');
    };
    class_27.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.speed, 2)) * 10 * 0.05);
    };
    class_27.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            //new T.Resources({'clay':   0}),
            //new T.Resources({'stone':  0}),
            new T.Resources({ 'iron': 1 })
        ]);
    };
    class_27.execute = function (game, object, destinations /*,objects_nearby,resources*/) {
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
    return class_27;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    regenerate: 100
}, (function (_super) {
    __extends(class_28, _super);
    function class_28() {
        _super.apply(this, arguments);
    }
    class_28.getType = function () {
        return ('regenerate');
    };
    class_28.prototype.countPriceBase = function () {
        return ((1 / this.params.regenerate) * 3600 * 0.05);
    };
    class_28.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 2 }),
            new T.Resources({ 'iron': 2 })
        ]);
    };
    return class_28;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    repair: 0
}, (function (_super) {
    __extends(class_29, _super);
    function class_29() {
        _super.apply(this, arguments);
    }
    class_29.getType = function () {
        return ('repair');
    };
    class_29.prototype.countPriceBase = function () {
        return ((1 / (this.params.repair / 100)) * 1000 * 0.05);
    };
    class_29.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 4 }),
            new T.Resources({ 'clay': 2 }),
            new T.Resources({ 'stone': 3 }),
            new T.Resources({ 'iron': 4 })
        ]);
    };
    return class_29;
}(T.Game.Action)));
/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================
T.World.game.installActionClass({
    throughput: 0
}, (function (_super) {
    __extends(class_30, _super);
    function class_30() {
        _super.apply(this, arguments);
    }
    class_30.getType = function () {
        return ('throughput');
    };
    class_30.prototype.countPriceBase = function () {
        return ((Math.pow(this.params.throughput / 100, 2)) * 10 * 0.05); //todo
    };
    class_30.prototype.getPriceResources = function () {
        return ([
            new T.Resources({ 'wood': 2 }),
            new T.Resources({ 'clay': 3 }),
            new T.Resources({ 'stone': 1 }),
            new T.Resources({ 'iron': 0 })
        ]);
    };
    return class_30;
}(T.Game.Action)));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjA1LXRvd25zLm5hbWVzcGFjZS50cyIsIjEwLWFycmF5LWZ1bmN0aW9ucy5zdGF0aWMudHMiLCIxMC1tYXRoLnN0YXRpYy50cyIsIjEwLXJlc291cmNlcy5jbGFzcy50cyIsIjEwLXVzZXIuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMTAtY29sb3IuY2xhc3MudHMiLCIxMC1fcG9zaXRpb24vMTAtcGF0aC5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wb3NpdGlvbi0zZC5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wb3NpdGlvbi1wb2xhci5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xMC1wb3NpdGlvbi5jbGFzcy50cyIsIjEwLV9wb3NpdGlvbi8xNS1wb3NpdGlvbi1kYXRlLmNsYXNzLnRzIiwiMTAtX3Bvc2l0aW9uLzIwLWFyZWEuY2xhc3MudHMiLCIxMC1nYW1lLzAwLWdhbWUuY2xhc3MudHMiLCIxMC1nYW1lLzA1LWFjdGlvbi5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDAtbWFwLWdlbmVyYXRvci5jbGFzcy50cyIsIjEwLW1hcC1nZW5lcmF0b3IvMDUtYmlvdG9wZS5jbGFzcy50cyIsIjEwLW1vZGVsLzAwLW1vZGVsLmNsYXNzLnRzIiwiMTAtbW9kZWwvMDUtcGFydGljbGVzLnN0YXRpYy50cyIsIjEwLW9iamVjdHMvMDAtYXJyYXkuY2xhc3MudHMiLCIxMC1vYmplY3RzLzA1LW9iamVjdC50cyIsIjEwLW9iamVjdHMvMTAtYnVpbGRpbmcuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLW5hdHVyYWwuY2xhc3MudHMiLCIxMC1vYmplY3RzLzEwLXN0b3J5LmNsYXNzLnRzIiwiMTAtb2JqZWN0cy8xMC10ZXJyYWluLmNsYXNzLnRzIiwiMjAtd29ybGQvMDAtdGVycmFpbnMuaW5zdGFuY2UudHMiLCIyMC13b3JsZC8xMC1tYXAtZ2VuZXJhdG9yLmluc3RhbmNlLnRzIiwiMjAtd29ybGQvMjAtZ2FtZS5pbnN0YW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9hdHRhY2sudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvZGVmZW5jZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9saWZlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL21pbmUudHMiLCIyMC13b3JsZC8zMC1nYW1lLWFjdGlvbnMvbW92ZS50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy9yZWdlbmVyYXRlLnRzIiwiMjAtd29ybGQvMzAtZ2FtZS1hY3Rpb25zL3JlcGFpci50cyIsIjIwLXdvcmxkLzMwLWdhbWUtYWN0aW9ucy90aHJvdWdocHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsd0hBQXdIO0FBRXhIOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUc5QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBR3JCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBR2xDOzs7O0dBSUc7QUFDSCxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVMsU0FBUztJQUUvQixTQUFTLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFFaEIsSUFBSSxHQUFHLENBQUM7SUFDUixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBRXJDLEdBQUcsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsRUFBRSxDQUFBLENBQUMsR0FBRyxLQUFHLEdBQUcsQ0FBQztZQUFB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LEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUc7UUFFbkMsR0FBRyxJQUFFLEdBQUcsQ0FBQztRQUNULEdBQUcsSUFBRSxHQUFHLENBQUM7UUFFVCxHQUFHLElBQUUsR0FBRyxDQUFDO1FBQ1QsR0FBRyxJQUFFLEdBQUcsQ0FBQztRQUlULElBQUksTUFBTSxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUduQixFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUUsTUFBTSxDQUFDO1lBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUcvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUUsS0FBSyxDQUFDLENBQUM7SUFFMUIsQ0FBQztJQUtEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNJLHFCQUFhLEdBQXBCLFVBQXFCLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHO1FBS2hELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxD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TyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7SUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO0lBQy9ILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUM1SCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7SUFDN0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztJQUMvSCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7SUFDcEksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO0lBQ25JLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUs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QUFDLENBQUM7SUFDeEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUFBLENBQUMsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhCLDJCQUEyQjtJQUMzQixNQUFNLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVkLENBQUMsRUFBQyxDQUFDLENBQUMsRUFFSixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUd2dkssSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUV2QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDN0MsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0lBQzdDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDNUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBQztJQUM3QyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxFQUFDO0NBSWhELENBQUMsRUFHRixVQUFTLE1BQU0sRUFBQyxlQUFlO0lBRTNCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUUsU0FBUyxDQUFDO1FBQUEsTUFBTSxD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QjtRQUVJLE1BQU0sQ0FBQSxDQUFDO1lBQ0gsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxFQUFJLENBQUMsRUFBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBSSxDQUFDLEVBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUcsQ0FBQyxFQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxFQUFJLENBQUMsRUFBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHTCxlQUFDO0FBQUQsQ0F4QkEsQUF3QkMsQ0F4QmEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBd0IxQixDQUNKLENBQUMiLCJmaWxlIjoidG93bnMtc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgSW5pdGlhbGl6ZSBuYW1lc3BhY2UgVG93bnNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogVG93bnMgbmFtZXNwYWNlIC0gdW5kZXIgdGhpcyBvYmplY3QgYXJlIGFsbCBUb3ducyBjbGFzc2VzIGFuZCBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7b2JqZWN0fVxuICovXG5nbG9iYWwuVG93bnMgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlRvd25zO1xuXG5cbnZhciBUID0gZ2xvYmFsLlRvd25zO1xuXG5cbnZhciByID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcblxuXG4vKipcbiAqIENoZWNrcyBleGlzdGVuY2Ugb2YgbmFtZXNwYWNlLiBJZiBub3QgZXhpc3RzLCB0aGlzIGZ1bmN0aW9uIGNyZWF0ZXMgaXQuXG4gKiBAcGFyYW0gbmFtZXNwYWNlIGVnLiAnT2JqZWN0cy5BcnJheSdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5ULnNldE5hbWVzcGFjZSA9IGZ1bmN0aW9uKG5hbWVzcGFjZSl7XG5cbiAgICBuYW1lc3BhY2U9bmFtZXNwYWNlLnNwbGl0KCcuJyk7XG5cbiAgICB2YXIgQWN0dWFsPXRoaXM7XG5cbiAgICB2YXIga2V5O1xuICAgIGZvcih2YXIgaT0gMCxsPW5hbWVzcGFjZS5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAga2V5PW5hbWVzcGFjZVtpXTtcblxuICAgICAgICBpZihrZXk9PT0nVCcpdGhyb3cgbmV3IEVycm9yKCdDYW50IHNldCBuYW1lc3BhY2UgVCB1bmRlciBUIScpO1xuXG4gICAgICAgIGlmKHR5cGVvZiBBY3R1YWxba2V5XT09PSd1bmRlZmluZWQnKXtcblxuICAgICAgICAgICAgQWN0dWFsW2tleV09e307XG4gICAgICAgICAgICBBY3R1YWw9QWN0dWFsW2tleV07XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIEFjdHVhbD1BY3R1YWxba2V5XTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJldHVybih0cnVlKTtcblxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBULkFycmF5RnVuY3Rpb25zXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbi8qKlxuICogQWRkaXRpb25hbCBmdW5jdGlvbnMgdG8gbWFuaXB1bGF0ZSB3aXRoIGFycmF5LlxuICovXG5ULkFycmF5RnVuY3Rpb25zPWNsYXNzIHtcblxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIFNlYXJjaGVzIGFuIGl0ZW0gd2l0aCBJRCBpbiBhcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcnJheSBBcnJheSBvZiBvYmplY3RzIHdpdGggSURcbiAgICAgKiBAcGFyYW0geyp9IGlkIFNlYXJjaGVkIElEXG4gICAgICogQHJldHVybnMge251bWJlcn0gS2V5IG9mIG9iamVjdCB3aXRoIHRoaXMgSUQsIC0xIGlmIG5vdCBleGlzdFxuICAgICAqL1xuICAgIHN0YXRpYyBpZDJpKGFycmF5LCBpZCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZClyZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG5cbiAgICB9XG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljXG4gICAgICogU2VhcmNoZXMgYW4gaXRlbSB3aXRoIElEIGluIGFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGFycmF5IEFycmF5IG9mIG9iamVjdHMgd2l0aCBJRFxuICAgICAqIEBwYXJhbSB7Kn0gaWQgU2VhcmNoZWQgSURcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JfbWVzc2FnZSB3aGVuIGl0ZW4gbm90IGV4aXN0c1xuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE9iamVjdCB3aXRoIHRoaXMgSUQsIG51bGwgaWYgbm90IGV4aXN0XG4gICAgICovXG4gICAgc3RhdGljIGlkMml0ZW0oYXJyYXksIGlkLCBlcnJvcl9tZXNzYWdlID0gZmFsc2UpIHtcblxuICAgICAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0uaWQgPT0gaWQpcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yX21lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIERlbGV0ZSBhbiBpdGVtIHdpdGggSUQgaW4gYXJyYXlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJyYXkgQXJyYXkgb2Ygb2JqZWN0cyB3aXRoIElEXG4gICAgICogQHBhcmFtIHsqfSBpZCBTZWFyY2hlZCBJRFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpZFJlbW92ZShhcnJheSwgaWQpIHsvL3RvZG8gcmVmYWN0b3IgdXNlIHRoaXMgbm90IHNwbGljZVxuXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlIHRocm91Z2ggMkQgYXJyYXlcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIGFycmF5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdGF0aWMgaXRlcmF0ZTJEKGFycmF5LCBjYWxsYmFjaykge1xuXG4gICAgICAgIC8vcihhcnJheSk7XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDAsIHlMZW4gPSBhcnJheS5sZW5ndGg7IHkgPCB5TGVuOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4TGVuID0gYXJyYXlbeV0ubGVuZ3RoOyB4IDwgeExlbjsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgICAgICAgICAvKnRvZG8gcmVmYWN0b3IgdG8geCx5Ki9cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgKiBAcGFyYW0gZnJvbVxuICAgICAqIEBwYXJhbSB0b1xuICAgICAqIEByZXR1cm4ge2FycmF5fSBSZW1vdmVkIGl0ZW1zXG4gICAgICovXG4gICAgc3RhdGljIHJlbW92ZUl0ZW1zKGFycmF5LCBmcm9tLCB0bykge1xuICAgICAgICB2YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICAgICAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKiB0b2RvIHNob3VsZCBpdCBiZSB1bmRlciBULkFycmF5RnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JlY3RcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBwYXRoXG4gICAgICovXG4gICAgc3RhdGljIGZpbHRlclBhdGgob2JqZWN0LCBwYXRoLCBzZXRWYWx1ZSkge1xuXG5cbiAgICAgICAgaWYgKCFpcyhvYmplY3QpKSB7Ly90b2RvIHNob3VsZCBpdCBiZSBoZXJlP1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBPYmplY3QgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpcyhwYXRoLmZvckVhY2gpKSB7XG4gICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXJQYXRoOiBULlBhdGggaXMgbm90IGNvcnJlY3QgYXJyYXkuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvcih2YXIgcGF0aF9pIGluIHBhdGgpIHtcblxuICAgICAgICAgICAgdmFyIG9iamVjdF9rZXkgPSBwYXRoW3BhdGhfaV07XG5cbiAgICAgICAgICAgIGlmIChwYXRoX2kgPCBwYXRoLmxlbmd0aCAtIDEgfHwgdHlwZW9mIHNldFZhbHVlID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtvYmplY3Rfa2V5XSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlclBhdGg6IEtleSBcXCcnK29iamVjdF9rZXkrJ1xcJyBpbiBwYXRoIGluIG9iamVjdCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvYmplY3QgPSBvYmplY3Rbb2JqZWN0X2tleV07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3Rbb2JqZWN0X2tleV0gPSBzZXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKG9iamVjdCk7XG5cblxuICAgIH1cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IGNvbnRhaW5pbmcgb25seSB1bmlxdWUgdmFsdWVzXG4gICAgICovXG4gICAgc3RhdGljIHVuaXF1ZShhcnJheSkge1xuICAgICAgICB2YXIgbiA9IHt9LCByID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICBuW2FycmF5W2ldXSA9IGFycmF5O1xuICAgICAgICAgICAgICAgIHIucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBodG1sIHRhYmxlIGZyb20gSlMgYXJyYXlcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBhcnJheVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsX2NsYXNzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbFxuICAgICAqL1xuICAgIHN0YXRpYyBhcnJheTJ0YWJsZShhcnJheSwgYWRkaXRpb25hbF9jbGFzcyA9ICcnKSB7XG4gICAgICAgIC8vdG9kbyBjaGVja1xuXG4gICAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgICAgdmFyIHJvd3MgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIHZhciBjb2xzX3RhYmxlID0gYXJyYXlbMF0ubGVuZ3RoOy8vdG9kbyBpcyBpcyBiZXN0IHNvbHV0aW9uP1xuXG5cbiAgICAgICAgaHRtbCArPSAnPHRhYmxlIGNsYXNzPVwiJyArIGFkZGl0aW9uYWxfY2xhc3MgKyAnXCI+JztcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcblxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+JztcblxuICAgICAgICAgICAgdmFyIGNvbHMgPSBhcnJheVtyb3ddLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb2xzX3NwYW4gPSBjb2xzX3RhYmxlIC0gY29scztcblxuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gY29scyAtIDEgJiYgY29sc19zcGFuICE9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkIGNvbHNwYW49XCInICsgKGNvbHNfc3BhbiArIDEpICsgJ1wiPic7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8L3RkPic7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cblxuICAgICAgICB9XG4gICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcblxuICAgICAgICByZXR1cm4gKGh0bWwpO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIGV4dHJhY3Qga2V5cyBmcm9tIEFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0S2V5cyhvYmplY3Qpe1xuXG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvcih2YXIgayBpbiBvYmplY3QpIGtleXMucHVzaChrKTtcbiAgICAgICAgcmV0dXJuKGtleXMpO1xuXG4gICAgfVxuXG5cblxuXG5cblxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIHN0YXRpYyBjbGFzcyBULk1hdGhcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG4vKipcbiAqIE1hdGhlbWF0aWNhbCBmdW5jdGlvbnMgdG8gVG93bnNcbiAqL1xuVC5NYXRoPWNsYXNze1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn1cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIHNpZ24oeCkgey8vdG9kbyBNYXRoLnNpZ24gfHwgdGhpc1xuICAgICAgICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAgICAgICAgaWYgKHggPT09IDAgfHwgaXNOYU4oeCkpIHtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4ID4gMCA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSBiYXNlXG4gICAgICogQHBhcmFtIG51bWJlclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIGJhc2VMb2coYmFzZSwgbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmxvZyhudW1iZXIpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlcl9vZl9ub25femVyb19kaWdpdHNcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IEN1dHMgdW5sZXNzIGRpZ2l0cyB0byB6ZXJvXG4gICAgICovXG4gICAgc3RhdGljIHByZXR0eU51bWJlcihudW1iZXIsbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cyl7XG5cbiAgICAgICAgbnVtYmVyX29mX25vbl96ZXJvX2RpZ2l0cyA9IG51bWJlcl9vZl9ub25femVyb19kaWdpdHMgfHwgMjsvL3RvZG8gcmVmYWN0b3IgbGlrZSB0aGlzXG5cblxuICAgICAgICB2YXIgZGlnaXRzPU1hdGguY2VpbChULk1hdGguYmFzZUxvZygxMCxudW1iZXIpKTtcbiAgICAgICAgdmFyIGsgPSBNYXRoLnBvdygxMCxudW1iZXJfb2Zfbm9uX3plcm9fZGlnaXRzLWRpZ2l0cyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhkaWdpdHMsayk7XG5cblxuICAgICAgICBudW1iZXI9bnVtYmVyKms7XG4gICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICAgICAgbnVtYmVyPU1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuICAgICAgICBudW1iZXI9bnVtYmVyL2s7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIpO1xuXG4gICAgICAgIHJldHVybiBudW1iZXI7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERpZmZlcmVuY2UgYmV0d2VlbiB0d28gYW5nZWxlc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVnMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSA8MDsxODA+IGRlZ3JlZXMgZGlmZmVyZW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBhbmdsZURpZmYoZGVnMSxkZWcyKXtcbiAgICAgICAgdmFyIGRlZyA9IE1hdGguYWJzKGRlZzEgLSBkZWcyKSUzNjA7XG4gICAgICAgIGlmKGRlZz4xODApZGVnPTM2MC1kZWc7XG4gICAgICAgIHJldHVybihkZWcpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICovXG4gICAgc3RhdGljIHJhZDJkZWcocmFkaWFucyl7XG4gICAgICAgIHJldHVybiAocmFkaWFucyAqICgxODAvTWF0aC5QSSkpJTM2MDtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlc1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gcmFkaWFuc1xuICAgICAqL1xuICAgIHN0YXRpYyBkZWcycmFkKGRlZ3JlZXMpe1xuICAgICAgICByZXR1cm4oZGVncmVlcyUzNjAgKiAoTWF0aC5QSS8xODApKTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHJldHVybiB7bnVtYmVyfSBkaXN0YW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyB4eTJkaXN0KHgseSl7XG4gICAgICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coeCwyKStNYXRoLnBvdyh5LDIpKSk7XG4gICAgfVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vdG9kbyByZWZhY3RvciB0byBwb3NpdGlvblxuICAgIHN0YXRpYyB4eTJkaXN0RGVnKHgseSl7XG5cbiAgICAgICAgdmFyIG91dHB1dD17fTtcblxuICAgICAgICBvdXRwdXQuZGlzdCA9IHRoaXMueHkyZGlzdCh4LHkpO1xuICAgICAgICBvdXRwdXQuZGVnID0gdGhpcy5yYWQyZGVnKE1hdGguYXRhbjIoeSx4KSk7XG5cbiAgICAgICAgcmV0dXJuKG91dHB1dCk7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vdG9kbyByZWZhY3RvciB0byBwb3NpdGlvblxuICAgIHN0YXRpYyBkaXN0RGVnMnh5KGRpc3QsZGVnKXtcblxuICAgICAgICB2YXIgcmFkPXRoaXMuZGVnMnJhZChkZWcpO1xuXG4gICAgICAgIHZhciBvdXRwdXQ9e307XG5cbiAgICAgICAgb3V0cHV0LnggPSBNYXRoLmNvcyhyYWQpKmRpc3Q7XG4gICAgICAgIG91dHB1dC55ID0gTWF0aC5zaW4ocmFkKSpkaXN0O1xuXG4gICAgICAgIHJldHVybihvdXRwdXQpO1xuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvL3RvZG8gbXliZSByZWZhY3RvciB0byBwb3NpdGlvblxuICAgIHN0YXRpYyB4eVJvdGF0ZSh4LHksZGVnKXtcblxuICAgICAgICAvL25ldnl1eml2YW0gZnVua2NlIFRvd25zLkEueHkyZGlzdERlZyBhIEEuZGlzdERlZzJ4eSwgYWJ5Y2ggbmVkZWxhbCB6Ynl0ZWNueSBwcmV2b2QgZG8gc3R1cG51IGEgc3BhdGt5XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy54eTJkaXN0KHgseSk7XG4gICAgICAgIHZhciByYWQgPSBNYXRoLmF0YW4yKHkseCk7XG5cbiAgICAgICAgcmFkICs9IHRoaXMuZGVnMnJhZChkZWcpO1xuXG4gICAgICAgIHZhciBvdXRwdXQ9e307XG4gICAgICAgIG91dHB1dC54ID0gTWF0aC5jb3MocmFkKSpkaXN0O1xuICAgICAgICBvdXRwdXQueSA9IE1hdGguc2luKHJhZCkqZGlzdDtcblxuICAgICAgICByZXR1cm4ob3V0cHV0KTtcblxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICBzdGF0aWMgcmFuZG9tU2VlZFBvc2l0aW9uKHNlZWQscG9zaXRpb24pe1xuXG5cbiAgICAgICAgcmV0dXJuIChNYXRoLnNpbihNYXRoLnBvdygocG9zaXRpb24ueCpwb3NpdGlvbi55KS1zZWVkLDIpKSsxKS8yO1xuXG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIG11bHRpdHlwZSB0byBmbG9hdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmdmFsXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0Zsb2F0KHZhbHVlLGRlZnZhbCl7XG5cbiAgICAgICAgaWYodHlwZW9mIGRlZnZhbCA9PT0gJ3VuZGVmaW5lZCcpZGVmdmFsPTA7XG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0ndW5kZWZpbmVkJylyZXR1cm4oZGVmdmFsKTtcblxuICAgICAgICB2YWx1ZT1wYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYoaXNOYU4odmFsdWUpKXtcbiAgICAgICAgICAgIHJldHVybihkZWZ2YWwpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybih2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgbXVsdGl0eXBlIHRvIGludGVnZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZnZhbFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9JbnQodmFsdWUsZGVmdmFsKXtcblxuICAgICAgICBpZih0eXBlb2YodmFsdWUpPT09J3VuZGVmaW5lZCcpcmV0dXJuKGRlZnZhbCk7XG5cbiAgICAgICAgdmFsdWU9cGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBpZihpc05hTih2YWx1ZSkpe1xuICAgICAgICAgICAgcmV0dXJuKGRlZnZhbCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgYm91bmRzKHZhbHVlLG1pbixtYXgpe1xuXG4gICAgICAgIGlmKHZhbHVlPG1pbilyZXR1cm4gbWluO1xuICAgICAgICBpZih2YWx1ZT5tYXgpcmV0dXJuIG1heDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJcyBwb2ludFtiMXgsYjF5XSBjb2xsaWRpbmcgbGluZT9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNPbkxpbmUoYTF4LGExeSxhMngsYTJ5LGIxeCxiMXkpIHtcblxuICAgICAgICBhMngtPWExeDtcbiAgICAgICAgYTJ5LT1hMXk7XG5cbiAgICAgICAgYjF4LT1hMXg7XG4gICAgICAgIGIxeS09YTF5O1xuXG5cblxuICAgICAgICB2YXIgYVNsb3BlPWEyeS9hMng7XG4gICAgICAgIHZhciBiU2xvcGU9YjF5L2IxeDtcblxuXG4gICAgICAgIGlmKGFTbG9wZSE9YlNsb3BlKXJldHVybiBmYWxzZTtcblxuXG4gICAgICAgIHZhciBhRGlzdCA9IHRoaXMueHkyZGlzdChhMnksYTJ4KTtcbiAgICAgICAgdmFyIGJEaXN0ID0gdGhpcy54eTJkaXN0KGIxeSxiMXgpO1xuXG4gICAgICAgIHJldHVybiAoYURpc3Q+PWJEaXN0KTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIElzIGxpbmUgQSBjb2xsaWRpbmcgbGluZSBCP1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGExeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhMnhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYTJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIxeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiMXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYjJ4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGIyeVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGxpbmVDb2xsaXNpb24oYTF4LGExeSxhMngsYTJ5LGIxeCxiMXksYjJ4LGIyeSl7XG5cblxuXG5cbiAgICAgICAgdmFyIGRlbm9taW5hdG9yID0gKChhMnggLSBhMXgpICogKGIyeSAtIGIxeSkpIC0gKChhMnkgLSBhMXkpICogKGIyeCAtIGIxeCkpO1xuICAgICAgICB2YXIgbnVtZXJhdG9yMSA9ICgoYTF5IC0gYjF5KSAqIChiMnggLSBiMXgpKSAtICgoYTF4IC0gYjF4KSAqIChiMnkgLSBiMXkpKTtcbiAgICAgICAgdmFyIG51bWVyYXRvcjIgPSAoKGExeSAtIGIxeSkgKiAoYTJ4IC0gYTF4KSkgLSAoKGExeCAtIGIxeCkgKiAoYTJ5IC0gYTF5KSk7XG4gICAgICAgIHZhciBjb2xsaXNpb247XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhkZW5vbWluYXRvcixudW1lcmF0b3IxLG51bWVyYXRvcjIpO1xuXG4gICAgICAgIC8vIERldGVjdCBjb2luY2lkZW50IGxpbmVzIChoYXMgYSBwcm9ibGVtLCByZWFkIGJlbG93KVxuICAgICAgICBpZiAoZGVub21pbmF0b3IgPT09IDApe1xuXG4gICAgICAgICAgICAvL3ZhciBjb2xsaXNpb249IChudW1lcmF0b3IxID09IDAgJiYgbnVtZXJhdG9yMiA9PSAwKTtcbiAgICAgICAgICAgIC8vY29sbGlzaW9uPWZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgYk9uQSA9IHRoaXMuaXNPbkxpbmUoYTF4LGExeSxhMngsYTJ5LGIxeCxiMXkpO1xuICAgICAgICAgICAgdmFyIGFPbkIgPSB0aGlzLmlzT25MaW5lKGIxeCxiMXksYjJ4LGIyeSxhMXgsYTF5KTtcblxuICAgICAgICAgICAgcmV0dXJuKGJPbkEgfHwgYU9uQik7XG5cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgdmFyIHIgPSBudW1lcmF0b3IxIC8gZGVub21pbmF0b3I7XG4gICAgICAgICAgICB2YXIgcyA9IG51bWVyYXRvcjIgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAgICAgY29sbGlzaW9uPSgociA+PSAwICYmIHIgPD0gMSkgJiYgKHMgPj0gMCAmJiBzIDw9IDEpKTtcblxuICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGVidWcgVEREIGRvIG5vdCBkZWxldGVcblxuICAgICAgICAvKnZhciBzaXplPTUwO1xuICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAvL2N0eC5zdHJva2VXaWR0aCA9IDI7XG5cbiAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgIGN0eC5tb3ZlVG8oYTF4K3NpemUsYTF5K3NpemUpO1xuICAgICAgICAgY3R4LmxpbmVUbyhhMngrc2l6ZSxhMnkrc2l6ZSk7XG4gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cblxuICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgY3R4Lm1vdmVUbyhiMXgrc2l6ZSxiMXkrc2l6ZSk7XG4gICAgICAgICBjdHgubGluZVRvKGIyeCtzaXplLGIyeStzaXplKTtcbiAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgfVxuXG5cbiAgICAgICAgICk7XG4gICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8aW1nIHNyYz1cIicrc3JjKydcIiBib3JkZXI9JysoY29sbGlzaW9uPzI6MCkrJz4nKTsqL1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgfVxuXG5cblxuXG5cbiAgICBzdGF0aWMgYmx1clhZKGdlbmVyYXRvcixibHVyKSB7XG5cbiAgICAgICAgcmV0dXJuKGZ1bmN0aW9uICh4LCB5KSB7XG5cbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICAgICAgdmFyIHh4LHl5O1xuXG4gICAgICAgICAgICBmb3IgKHh4ID0geCAtIGJsdXI7IHh4IDw9IHggKyBibHVyOyB4eCsrKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHl5ID0geSAtIGJsdXI7IHl5IDw9IHkgKyBibHVyOyB5eSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucG93KGJsdXIsIDIpIDwgTWF0aC5wb3coeHggLSB4LCAyKSArIE1hdGgucG93KHl5IC0geSwgMikpY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGdlbmVyYXRvcih4eCwgeXkpO1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHN1bSAvIGNvdW50KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG5cblxuICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlcykge1xuICAgICAgICB2YXIgc2l6ZXMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzBCJztcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludChNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpKSk7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgaSksIDIpICsgJycgKyBzaXplc1tpXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFfc3RhcnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYV9wb3NpdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhX2VuZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiX3N0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJfZW5kXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJvcG9ydGlvbnMoYV9zdGFydCxhX3Bvc2l0aW9uLGFfZW5kLGJfc3RhcnQsYl9lbmQpe1xuXG5cbiAgICAgICAgdmFyIGFfd2hvbGUgPSBhX2VuZC1hX3N0YXJ0O1xuICAgICAgICB2YXIgYl93aG9sZSA9IGJfZW5kLWJfc3RhcnQ7XG5cbiAgICAgICAgdmFyIGFfcGFydCA9IGFfZW5kLWFfcG9zaXRpb247XG4gICAgICAgIHZhciBiX3BhcnQgPSAoYl93aG9sZSphX3BhcnQpL2Ffd2hvbGU7XG5cbiAgICAgICAgcmV0dXJuKGJfZW5kLWJfcGFydCk7XG5cblxuICAgIH1cblxuICAgIFxuICAgIFxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuXG5ULlJlc291cmNlcyA9IGNsYXNze1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlc291cmNlcylcbiAgICB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNvdXJjZXNba2V5XSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IE1hdGguY2VpbChyZXNvdXJjZXNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgKi9cbiAgICBjbG9uZSgpe1xuICAgICAgICByZXR1cm4gbmV3IFQuUmVzb3VyY2VzKHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGlzIGNvbnRhaW5zIGEgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAqIEByZXR1cm4ge2Jvb2x9IGNvbnRhaW5zXG4gICAgICovXG4gICAgY29udGFpbnMocmVzb3VyY2VzKXtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpc1trZXldIDwgcmVzb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBBZGQgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgKi9cbiAgICBhZGQocmVzb3VyY2VzKXtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gKz0gcmVzb3VyY2VzW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgbXVsdGlwbHkoayl7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gTWF0aC5jZWlsKHRoaXNba2V5XSAqIGspO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgc2lnbnVtKGspe1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAwO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbW9kaWZpZXJcbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBhcHBseShtb2RpZmllcil7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT0gJ251bWJlcicpIHsvL3RvZG8gYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbW9kaWZpZXIodGhpc1trZXldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYWxsIHJlc291cmNlcyBrZXlzXG4gICAgICovXG4gICAgZXh0cmFjdEtleXMoKXtcblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1trZXldID09ICdudW1iZXInKSB7Ly90b2RvIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoa2V5cyk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gUmVzb3VyZXNcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgZ2l2ZW4gUmVzb3VyY2VzXG4gICAgICovXG4gICAgY29tcGFyZShyZXNvdXJlcyl7XG5cbiAgICAgICAgdmFyIHJlc291cmNlc19BID0gdGhpcztcbiAgICAgICAgdmFyIHJlc291cmNlc19CID0gcmVzb3VyZXM7XG5cbiAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQocmVzb3VyY2VzX0EuZXh0cmFjdEtleXMoKSk7XG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChyZXNvdXJjZXNfQi5leHRyYWN0S2V5cygpKTtcblxuXG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIGRpc3RhbmNlID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgICAgICAgIHZhciB2YWxfQSA9IHJlc291cmNlc19BW2tleV07XG4gICAgICAgICAgICB2YXIgdmFsX0IgPSByZXNvdXJjZXNfQltrZXldO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsX0EgPT0gJ3VuZGVmaW5lZCcpdmFsX0EgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxfQiA9PSAndW5kZWZpbmVkJyl2YWxfQiA9IDA7XG5cbiAgICAgICAgICAgIGRpc3RhbmNlICs9IE1hdGgucG93KHZhbF9BIC0gdmFsX0IsIDIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZSk7XG5cblxuICAgICAgICByZXR1cm4gKGRpc3RhbmNlKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZ2l2ZW4gcmVzb3VyY2VzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFJlc291cmNlc1xuICAgICAqIEByZXR1cm4ge2Jvb2x9IHN1Y2Nlc3NcbiAgICAgKi9cbiAgICByZW1vdmUocmVzb3VyY2VzKXtcblxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMocmVzb3VyY2VzKSlyZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc291cmNlcykge1xuXG4gICAgICAgICAgICB0aGlzW2tleV0gLT0gcmVzb3VyY2VzW2tleV07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIFJlc291cmNlcyB0byBzaW1wbGUgc3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCl7XG5cbiAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKHRoaXNba2V5XSArICcgJyArIGtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHJpbmdzLmpvaW4oJywgJyk7XG5cbiAgICB9XG5cblxuXG4gICAgdG9IVE1MKCl7Ly90b2RvIHB1dCB1cmwgcHJlZml4IGludG8gcGFyYW1zXG5cbiAgICAgICAgdmFyIHN0cmluZ3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNba2V5XSA9PSAnbnVtYmVyJykgey8vdG9kbyBiZXR0ZXIgc29sdXRpb25cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gIT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFQuTG9jYWxlLmdldCgncmVzb3VyY2UnLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvY2FsZVN0cmluZygvKidlbi1VUycnZGUtREUnKi8pOy8vdG9kbyB0b2RvIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaCgnPGRpdj48aW1nIHNyYz1cIi9tZWRpYS9pbWFnZS9yZXNvdXJjZXMvJyArIGtleSArICcucG5nXCIgdGl0bGU9XCInICsgbmFtZSArICdcIiBhbHQ9XCInICsgbmFtZSArICdcIiA+JyArIHZhbHVlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgc3RyaW5ncyA9IHN0cmluZ3Muam9pbignICcpO1xuICAgICAgICBzdHJpbmdzID0gJzxkaXYgY2xhc3M9XCJyZXNvdXJjZXNcIj4nICsgc3RyaW5ncyArICc8L2Rpdj4nO1xuXG4gICAgICAgIHJldHVybiBzdHJpbmdzO1xuXG4gICAgfVxuXG5cblxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUmVzb3VyY2VzXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblQuVXNlciA9IGNsYXNze1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdXNlciByYXcgdXNlciBkYXRhXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXNlcil7XG5cbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdXNlcil7XG4gICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IHVzZXJba2V5XTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEhUTUwgY29kZSBvZiB1c2VycyBzaWduYXR1cmVcbiAgICAgKi9cbiAgICBnZXRTaWduYXR1cmVIVE1MKCl7XG5cbiAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5wcm9maWxlLm5hbWUgfHwgdGhpcy5wcm9maWxlLnN1cm5hbWUpe1xuXG4gICAgICAgICAgICBuYW1lID0gdGhpcy5wcm9maWxlLm5hbWUrJyAnK3RoaXMucHJvZmlsZS5zdXJuYW1lO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBuYW1lID0gdGhpcy5wcm9maWxlLnVzZXJuYW1lO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBlbWFpbF9tZDUgPSBtZDUodGhpcy5wcm9maWxlLmVtYWlsKTtcblxuXG4gICAgICAgIHZhciBzaWduYXR1cmVfaHRtbCA9IGBcblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXNpZ25hdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwidXNlci1pbWFnZVwiIHNyYz1cImh0dHBzOi8vMS5ncmF2YXRhci5jb20vYXZhdGFyL2AgKyBlbWFpbF9tZDUgKyBgP3M9ODAmcj1wZyZkPW1tXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXItc2lnbmF0dXJlLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInVzZXItbmFtZVwiPmArbmFtZStgPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPmArdGhpcy5wcm9maWxlLnNpZ25hdHVyZS5odG1sMnRleHQoKStgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBgO1xuXG4gICAgICAgIHJldHVybihzaWduYXR1cmVfaHRtbCk7XG5cbiAgICB9XG5cblxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuQ29sb3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogT2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgUkdCQSBjb2xvci5cbiAqL1xuVC5Db2xvciA9IGNsYXNze1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gciByZWQgZnJvbSAwIHRvIDI1NVxuICAgICAqIEBwYXJhbSBnIGdyZWVuIGZyb20gMCB0byAyNTVcbiAgICAgKiBAcGFyYW0gYiBibHVlIGZyb20gMCB0byAyNTVcbiAgICAgKiBAcGFyYW0gYSBhbHBoYSBmcm9tIDAgdG8gMjU1XG4gICAgICovXG4gICAgY29uc3RydWN0b3IociwgZywgYiwgYSA9IDI1NSl7XG4gICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgIHRoaXMuZyA9IGc7XG4gICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgIHRoaXMuYSA9IGE7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXBhaXJzIG92ZXJmbG93ZWQgY29sb3JzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBib3VuZHMoKXtcblxuICAgICAgICB0aGlzLnIgPSBNYXRoLnJvdW5kKHRoaXMucik7XG4gICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgdGhpcy5iID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICB0aGlzLmEgPSBNYXRoLnJvdW5kKHRoaXMuYSk7XG5cbiAgICAgICAgaWYgKHRoaXMuciA+IDI1NSkge1xuICAgICAgICAgICAgdGhpcy5yID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnIgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmcgPiAyNTUpIHtcbiAgICAgICAgICAgIHRoaXMuZyA9IDI1NTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5nID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5iID4gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLmIgPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYiA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hID4gMjU1KSB7XG4gICAgICAgICAgICB0aGlzLmEgPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCBjc3MgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiByZ2IoMTAwLDIwMCwyMDApXG4gICAgICovXG4gICAgZ2V0Q3NzQ29sb3IoKXtcblxuICAgICAgICB0aGlzLmJvdW5kcygpO1xuICAgICAgICBpZiAodGhpcy5hID09IDI1NSkge1xuICAgICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuciArICcsICcgKyB0aGlzLmcgKyAnLCAnICsgdGhpcy5iICsgJyknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9yKCdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYS8yNTUqMTAwKS8xMDAgKyAnKScpO1xuICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLnIgKyAnLCAnICsgdGhpcy5nICsgJywgJyArIHRoaXMuYiArICcsICcgKyBNYXRoLnJvdW5kKHRoaXMuYSAvIDI1NSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb2xvciAoaWdub3JlcyBhbHBoYSBjaGFuZWwuKVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGVnLiAjMDBmZjAwXG4gICAgICovXG4gICAgZ2V0SGV4KCl7XG4gICAgICAgIHRoaXMuYm91bmRzKCk7XG4gICAgICAgIHJldHVybiAnIycgKyAoKDEgPDwgMjQpICsgKHRoaXMuciA8PCAxNikgKyAodGhpcy5nIDw8IDgpICsgdGhpcy5iKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG5ldyBULkNvbG9yIGZvcm0gaGV4IGNvZGUgb2YgY29sb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4IGNvZGUgb2YgY29sb3IgZWcuICMwMGZmMDBcbiAgICAgKiBAcmV0dXJucyB7VC5Db2xvcn0gQ29sb3JcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlRnJvbUhleChoZXgpe1xuXG4gICAgICAgIHZhciByZXN1bHQsIHNob3J0aGFuZFJlZ2V4O1xuXG4gICAgICAgIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVC5Db2xvcihcbiAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjcmVhdGluZyBULkNvbG9yIGZyb20gJytoZXgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn07XG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuUGF0aFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuUGF0aCA9IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Li4uVC5Qb3NpdGlvbkRhdGV9IFBvc2l0aW9uIHdpdGggZGF0ZSBhdCBsZWFzdCAyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG5cbiAgICAgICAgLy90b2RvIG1heWJlLy9pZihhcmdzLmxlbmd0aD09PTEgJiYgYXJncyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgLy90b2RvIG1heWJlLy8gICAgdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlID0gYXJnc1swXTtcbiAgICAgICAgLy90b2RvIG1heWJlLy99ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSA9IGFyZ3M7XG4gICAgICAgIC8vdG9kbyBtYXliZS8vfVxuXG5cblxuICAgICAgICBpZih0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoPDIpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGFyZSBtdXN0IGJlIGF0IGxlYXN0IDIgcGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aC4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIHBvc2l0aW9uX2RhdGUsbGFzdF9kYXRlPS0xO1xuICAgICAgICBmb3IodmFyIGk9IDAsbD10aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGUubGVuZ3RoO2k8bDtpKyspIHtcblxuICAgICAgICAgICAgcG9zaXRpb25fZGF0ZSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocG9zaXRpb25fZGF0ZSBpbnN0YW5jZW9mIFQuUG9zaXRpb25EYXRlKXt9ZWxzZXtcblxuICAgICAgICAgICAgICAgIGlmKHBvc2l0aW9uX2RhdGUgaW5zdGFuY2VvZiBPYmplY3Qpe1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpXSA9IG5ldyBULlBvc2l0aW9uRGF0ZSh0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0pO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCBtdXN0IGJlIFQuUG9zaXRpb25EYXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihsYXN0X2RhdGU+PXBvc2l0aW9uX2RhdGUuZGF0ZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRlcyBzaG91bGQgYmUgY29uc2VjdXRpdmUgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoICgnK3Bvc2l0aW9uX2RhdGUuZGF0ZSsnIHNob3VsZCBiZSBhZnRlciAnK2xhc3RfZGF0ZSsnKS4gJyt0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFzdF9kYXRlPXBvc2l0aW9uX2RhdGUuZGF0ZTtcblxuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICB0b0pTT04oKXtcbiAgICAgICAgcmV0dXJuKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxULlBvc2l0aW9uPn0gYXJyYXlfcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgKiBAcmV0dXJucyB7VC5QYXRofVxuICAgICAqL1xuICAgIHN0YXRpYyBuZXdDb25zdGFudFNwZWVkKGFycmF5X3Bvc2l0aW9uLHNwZWVkLGRhdGU9MCl7XG5cbiAgICAgICAgaWYoZGF0ZT09PTApe1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1lbHNlXG4gICAgICAgIGlmKHR5cGVvZiBkYXRlPT09J251bWJlcicpe1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNOYU4oc3BlZWQvMSkpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVlZCBtdXN0IGJlIHZhbGlkIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZihzcGVlZDw9MCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWVkIG11c3QgYmUgcG9zaXRpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhcnJheV9wb3NpdGlvbi5sZW5ndGg8Mil7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXJlIG11c3QgYmUgYXQgbGVhc3QgMiBwYXJhbXMgd2hlbiBjb25zdHJ1Y3RpbmcgVC5QYXRoLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFycmF5X3Bvc2l0aW9uX2RhdGUgPSBbXG4gICAgICAgICAgICBuZXcgVC5Qb3NpdGlvbkRhdGUoYXJyYXlfcG9zaXRpb25bMF0ueCxhcnJheV9wb3NpdGlvblswXS55LGRhdGUpXG4gICAgICAgIF07XG5cblxuICAgICAgICB2YXIgbGFzdF9wb3NpdGlvbiA9IGFycmF5X3Bvc2l0aW9uWzBdO1xuXG4gICAgICAgIHZhciBwb3NpdGlvbl9kYXRlLGRpc3RhbmNlO1xuICAgICAgICBmb3IodmFyIGk9MSxsPWFycmF5X3Bvc2l0aW9uLmxlbmd0aDtpPGw7aSsrKSB7XG5cbiAgICAgICAgICAgIHBvc2l0aW9uX2RhdGUgPSBhcnJheV9wb3NpdGlvbltpXTtcblxuXG4gICAgICAgICAgICBpZihwb3NpdGlvbl9kYXRlIGluc3RhbmNlb2YgVC5Qb3NpdGlvbil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgUGFyYW1zIHdoZW4gY29uc3RydWN0aW5nIFQuUGF0aCB2aWEgbmV3Q29uc3RhbnRTcGVlZCBtdXN0IGJlIFQuUG9zaXRpb24nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBkaXN0YW5jZSA9IGxhc3RfcG9zaXRpb24uZ2V0RGlzdGFuY2UocG9zaXRpb25fZGF0ZSk7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS8xICsgZGlzdGFuY2Uvc3BlZWQqMTAwMCk7XG5cblxuICAgICAgICAgICAgbGFzdF9wb3NpdGlvbj1wb3NpdGlvbl9kYXRlO1xuXG5cblxuICAgICAgICAgICAgYXJyYXlfcG9zaXRpb25fZGF0ZS5wdXNoKFxuICAgICAgICAgICAgICAgIG5ldyBULlBvc2l0aW9uRGF0ZShhcnJheV9wb3NpdGlvbltpXS54LGFycmF5X3Bvc2l0aW9uW2ldLnksZGF0ZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9yZXR1cm4gbmV3IHRoaXMuYXBwbHkodGhpcyxhcnJheV9wb3NpdGlvbl9kYXRlKTtcbiAgICAgICAgLy9yZXR1cm4gT2JqZWN0LmNyZWF0ZShULlBhdGgsYXJyYXlfcG9zaXRpb25fZGF0ZSk7XG4gICAgICAgIHJldHVybiBuZXcgVC5QYXRoKC4uLmFycmF5X3Bvc2l0aW9uX2RhdGUpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb3VudCBpbiB3aGljaCBzZWdtZW50IGlzIFQuUGF0aCBwcm9ncmVzc1xuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjb3VudFNlZ21lbnQoZGF0ZSkge1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTm90IHN0YXJ0ZWQgb3IgZmluaXNoZWRcblxuICAgICAgICBpZih0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbMF0uZGF0ZT5kYXRlKXtcbiAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGgtMV0uZGF0ZTw9ZGF0ZSl7XG4gICAgICAgICAgICByZXR1cm4odGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aC0yKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgIHZhciBBLCBCLCB4LHk7XG4gICAgICAgIGZvcih2YXIgaT0wLGw9dGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aC0xO2k8bDtpKyspIHtcbiAgICAgICAgICAgIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbaV0uZGF0ZS8xO1xuICAgICAgICAgICAgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtpKzFdLmRhdGUvMTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpKycoJysoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSsnKScpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnKCcrKEEtZGF0ZSkrJyAtICcrKEItZGF0ZSkrJyknKTtcblxuICAgICAgICAgICAgaWYoQTw9ZGF0ZSAmJiBCPmRhdGUpe1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnPC0tLXRoaXMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4oaSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY291bnRpbmcgc2VnbWVudCBpbiBULlBhdGgsIG1heWJlIGJlY2F1c2Ugb2YgcGFyYW0gZGF0ZSBpcyAnK2RhdGUpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb3VudHMgcG9zaXRpb24gYXQgJ2RhdGUnXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICogQHJldHVybnMge1QuUG9zaXRpb259XG4gICAgICovXG4gICAgY291bnRQb3NpdGlvbihkYXRlPTApIHtcblxuICAgICAgICBpZihkYXRlPT09MCl7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodHlwZW9mIGRhdGU9PT0nbnVtYmVyJyl7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU5vdCBzdGFydGVkIG9yIGZpbmlzaGVkXG5cbiAgICAgICAgaWYodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmRhdGU+ZGF0ZSl7XG4gICAgICAgICAgICByZXR1cm4odGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlWzBdLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICB9ZWxzZVxuICAgICAgICBpZih0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aC0xXS5kYXRlPD1kYXRlKXtcbiAgICAgICAgICAgIHJldHVybih0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlLmxlbmd0aC0xXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1JbiBwcm9ncmVzc1xuXG4gICAgICAgIHZhciBzZWdtZW50ID0gdGhpcy5jb3VudFNlZ21lbnQoZGF0ZSk7XG5cbiAgICAgICAgdmFyIEEgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudF07XG4gICAgICAgIHZhciBCID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnQrMV07XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygoQS1kYXRlKSsnIC0gJysoQi1kYXRlKSk7XG5cbiAgICAgICAgdmFyIHggPSBULk1hdGgucHJvcG9ydGlvbnMoQS5kYXRlLzEsZGF0ZS8xLEIuZGF0ZS8xLCBBLngsIEIueCk7XG4gICAgICAgIHZhciB5ID0gVC5NYXRoLnByb3BvcnRpb25zKEEuZGF0ZS8xLGRhdGUvMSxCLmRhdGUvMSwgQS55LCBCLnkpO1xuXG4gICAgICAgIHJldHVybihuZXcgVC5Qb3NpdGlvbih4LHkpKTtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb3VudHMgcm90YXRpb24gYXQgJ2RhdGUnXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gICAgICovXG4gICAgY291bnRSb3RhdGlvbihkYXRlKSB7XG5cbiAgICAgICAgdmFyIHNlZ21lbnQgPSB0aGlzLmNvdW50U2VnbWVudChkYXRlKTtcblxuICAgICAgICB2YXIgQSA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50XTtcbiAgICAgICAgdmFyIEIgPSB0aGlzLmFycmF5X3Bvc2l0aW9uX2RhdGVbc2VnbWVudCsxXTtcblxuICAgICAgICB2YXIgQkEgPSBCLmdldFBvc2l0aW9uKCkucGx1cyhBLmdldFBvc2l0aW9uKCkubXVsdGlwbHkoLTEpKTtcblxuICAgICAgICB2YXIgcG9sYXIgPSBCQS5nZXRQb3NpdGlvblBvbGFyKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coQkEscG9sYXIpO1xuXG4gICAgICAgIHJldHVybihwb2xhci5nZXREZWdyZWVzKCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ291bnRzIFNwZWVkIGF0ICdkYXRlJ1xuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICogQHJldHVybnMge251bWJlcn0gZmllbGRzL3NcbiAgICAgKi9cbiAgICBjb3VudFNwZWVkKGRhdGUpIHtcblxuICAgICAgICBpZih0aGlzLmluUHJvZ3Jlc3MoZGF0ZSk9PT1mYWxzZSl7XG4gICAgICAgICAgICByZXR1cm4oMCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuY291bnRTZWdtZW50KGRhdGUpO1xuXG4gICAgICAgIHZhciBBID0gdGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3NlZ21lbnRdO1xuICAgICAgICB2YXIgQiA9IHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVtzZWdtZW50KzFdO1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IEEuZ2V0RGlzdGFuY2UoQik7XG4gICAgICAgIHZhciBkdXJhdGlvbj0gQi5kYXRlLSBBLmRhdGU7XG5cbiAgICAgICAgcmV0dXJuKGRpc3RhbmNlLyhkdXJhdGlvbi8xMDAwKSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElzIHBhdGggaW4gcHJvZ3Jlc3MgKHRydWUpIG9yIGl0IGhhcyBub3Qgc3RhcnRlZChmYWxzZSkgb3IgaXQgaXMgZmluaXNoZWQoZmFsc2UpP1xuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGluUHJvZ3Jlc3MoZGF0ZSkge1xuXG4gICAgICAgIGlmKHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZVswXS5kYXRlPmRhdGUpe1xuICAgICAgICAgICAgcmV0dXJuKGZhbHNlKTtcbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodGhpcy5hcnJheV9wb3NpdGlvbl9kYXRlW3RoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5sZW5ndGgtMV0uZGF0ZTw9ZGF0ZSl7XG4gICAgICAgICAgICByZXR1cm4oZmFsc2UpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy90b2RvIG1heWJlIGNvdW50UHJvZ3Jlc3NcblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgVC5QYXRoIHRvIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdG9TdHJpbmcoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlfcG9zaXRpb25fZGF0ZS5qb2luKCcsICcpO1xuICAgIH1cblxuXG5cbn07IiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULlBvc2l0aW9uM0RcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5Qb3NpdGlvbjNEID0gY2xhc3N7XG5cblxuICAgIGNvbnN0cnVjdG9yKHgseSx6KXtcblxuICAgICAgICBpZih0eXBlb2YgeCA9PSAnb2JqZWN0Jyl7XG5cbiAgICAgICAgICAgIHRoaXMueD0geC54O1xuICAgICAgICAgICAgdGhpcy55PSB4Lnk7XG4gICAgICAgICAgICB0aGlzLno9IHguejtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgdGhpcy54PSB4O1xuICAgICAgICAgICAgdGhpcy55PSB5O1xuICAgICAgICAgICAgdGhpcy56PSB6O1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgKi9cbiAgICBjbG9uZSgpe1xuICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24zRCh0aGlzKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgUG9zaXRpb24zRCB0byBzaW1wbGUgc3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCl7XG5cbiAgICAgICAgcmV0dXJuICdbJyt0aGlzLngrJywnK3RoaXMueSsnLCcrdGhpcy56KyddJztcblxuICAgIH1cblxuXG5cbn07XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgUG9zaXRpb25Qb2xhclxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5ULlBvc2l0aW9uUG9sYXIgPSBjbGFzc3tcblxuICAgIGNvbnN0cnVjdG9yKGRpc3RhbmNlLGRlZ3JlZXMpe1xuXG4gICAgICAgIGlmKHR5cGVvZiBkaXN0YW5jZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgZGVncmVlcyA9PSAnbnVtYmVyJyl7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2U9IGRpc3RhbmNlO1xuICAgICAgICAgICAgdGhpcy5kZWdyZWVzPSBkZWdyZWVzO1xuXG4gICAgICAgIH1cbiAgICAgICAgLy90b2RvIGNoZWNrXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBkZWVwIGNsb25lIG9mIHRoaXMuXG4gICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAqL1xuICAgIGNsb25lKCl7XG4gICAgICAgIHJldHVybiBuZXcgVC5Qb3NpdGlvblBvbGFyKHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBnZXRQb3NpdGlvbigpe1xuXG4gICAgICAgIHZhciByYWRpYW5zID0gdGhpcy5nZXRSYWRpYW5zKCk7XG5cbiAgICAgICAgcmV0dXJuKG5ldyBULlBvc2l0aW9uKFxuICAgICAgICAgICAgTWF0aC5jb3MocmFkaWFucykqdGhpcy5kaXN0YW5jZSxcbiAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpKnRoaXMuZGlzdGFuY2VcbiAgICAgICAgKSk7XG5cblxuICAgIH1cblxuXG4gICAgZ2V0RGlzdGFuY2UoKXtcblxuICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcblxuICAgIH1cblxuXG4gICAgZ2V0RGVncmVlcygpe1xuXG4gICAgICAgIHJldHVybiAodGhpcy5kZWdyZWVzKzM2MCklMzYwO1xuXG4gICAgfVxuXG5cbiAgICBnZXRSYWRpYW5zKCl7XG5cbiAgICAgICAgcmV0dXJuIFQuTWF0aC5kZWcycmFkKHRoaXMuZGVncmVlcyk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpe1xuXG4gICAgICAgIHJldHVybiAnJyt0aGlzLmRpc3RhbmNlKycsJyt0aGlzLmRlZ3JlZXMrJ8KwJztcblxuICAgIH1cblxuXG5cbn07XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvblxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4vKipcbiAqIEdsb2JhbCBwb3NpdGlvbiBvbiB0b3ducyBtYXBcbiAqL1xuVC5Qb3NpdGlvbiA9IGNsYXNze1xuXG4gICAgY29uc3RydWN0b3IoeCx5KXtcblxuXG4gICAgICAgIGlmKHR5cGVvZiB4ID09ICdvYmplY3QnKXtcblxuICAgICAgICAgICAgdGhpcy54PSB4Lng7XG4gICAgICAgICAgICB0aGlzLnk9IHgueTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9ZWxzZVxuICAgICAgICBpZigvXlsrLV0/XFxkKyhcXC5cXGQrKT8sWystXT9cXGQrKFxcLlxcZCspPyQvLnRlc3QoeCkpe1xuXG4gICAgICAgICAgICB4PSB4LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB0aGlzLng9IHBhcnNlRmxvYXQoeFswXSk7XG4gICAgICAgICAgICB0aGlzLnk9IHBhcnNlRmxvYXQoeFsxXSk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfWVsc2VcbiAgICAgICAgaWYodHlwZW9mIHggPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpe1xuXG4gICAgICAgICAgICB0aGlzLng9IHg7XG4gICAgICAgICAgICB0aGlzLnk9IHk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuICAgICAgICAvL3RvZG8gY2hlY2tcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjb25zdHJ1Y3RvciBwYXJhbXMgd2hpbGUgY3JlYXRpbmcgVC5Qb3NpdGlvbiEnKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGRlZXAgY2xvbmUgb2YgdGhpcy5cbiAgICAgKiBAcmV0dXJucyB7VC5SZXNvdXJjZXN9XG4gICAgICovXG4gICAgY2xvbmUoKXtcbiAgICAgICAgcmV0dXJuIG5ldyBULlBvc2l0aW9uKHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBwbHVzKHBvc2l0aW9uKXtcblxuICAgICAgICB0aGlzLngrPXBvc2l0aW9uLng7XG4gICAgICAgIHRoaXMueSs9cG9zaXRpb24ueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuICAgIG11bHRpcGx5KGspe1xuXG4gICAgICAgIHRoaXMueD10aGlzLngqaztcbiAgICAgICAgdGhpcy55PXRoaXMueSprO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG5cbiAgICBnZXRQb3NpdGlvblBvbGFyKCl7XG5cbiAgICAgICAgcmV0dXJuKG5ldyBULlBvc2l0aW9uUG9sYXIoXG4gICAgICAgICAgICBULk1hdGgueHkyZGlzdCh0aGlzLngsdGhpcy55KSxcbiAgICAgICAgICAgIFQuTWF0aC5yYWQyZGVnKE1hdGguYXRhbjIodGhpcy55LHRoaXMueCkpXG4gICAgICAgICkpO1xuXG4gICAgfVxuXG5cbiAgICBnZXREaXN0YW5jZShwb3NpdGlvbil7XG5cbiAgICAgICAgcmV0dXJuIFQuTWF0aC54eTJkaXN0KHBvc2l0aW9uLngtdGhpcy54LHBvc2l0aW9uLnktdGhpcy55KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgUG9zaXRpb24gdG8gc2ltcGxlIHN0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpe1xuXG4gICAgICAgIHJldHVybiAnJyt0aGlzLngrJywnK3RoaXMueSsnJztcblxuICAgIH1cblxuXG5cbn07XG5cblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5Qb3NpdGlvbkRhdGVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuLyoqXG4gKiBHbG9iYWwgcG9zaXRpb24gb24gdG93bnMgbWFwIHdpdGggdGltZVxuICovXG5ULlBvc2l0aW9uRGF0ZSA9IGNsYXNzIGV4dGVuZHMgVC5Qb3NpdGlvbntcblxuICAgIGNvbnN0cnVjdG9yKHgseSxkYXRlPTApe1xuXG4gICAgICAgIGlmKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyl7XG5cbiAgICAgICAgICAgIHk9IHgueTtcbiAgICAgICAgICAgIGRhdGU9IHguZGF0ZTtcbiAgICAgICAgICAgIHg9IHgueDtcblxuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIoeCx5KTtcblxuXG4gICAgICAgIGlmKGRhdGU9PT0wKXtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9ZWxzZVxuICAgICAgICBpZih0eXBlb2YgZGF0ZT09PSdudW1iZXInIHx8IHR5cGVvZiBkYXRlPT09J3N0cmluZycpe1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZihpc05hTihkYXRlLzEpKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gY29uc3RydWN0IFBvc2l0aW9uRGF0ZSBpcyBuZWVkZWQgdmFsaWQgRGF0ZSBub3QgJytkYXRlKycuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuZGF0ZT1kYXRlO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gZGVlcCBjbG9uZSBvZiB0aGlzLlxuICAgICAqIEByZXR1cm5zIHtULlJlc291cmNlc31cbiAgICAgKi9cbiAgICBjbG9uZSgpe1xuICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb25EYXRlKHRoaXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIG9ubHkgcG9zaXRpb25cbiAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbigpe1xuICAgICAgICByZXR1cm4gbmV3IFQuUG9zaXRpb24odGhpcy54LHRoaXMueSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIFBvc2l0aW9uIHRvIHNpbXBsZSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgdG9TdHJpbmcoKXtcblxuICAgICAgICByZXR1cm4gJ1snK3RoaXMueCsnLCcrdGhpcy55KyddIGF0ICcrXG4gICAgICAgICAgICAodGhpcy5kYXRlLmdldERheSgpKzEpKycuJysodGhpcy5kYXRlLmdldE1vbnRoKCkrMSkrJy4nK3RoaXMuZGF0ZS5nZXRGdWxsWWVhcigpK1xuICAgICAgICAgICAgJyAnK3RoaXMuZGF0ZS5nZXRIb3VycygpKyc6Jyt0aGlzLmRhdGUuZ2V0TWludXRlcygpKyc6Jyt0aGlzLmRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgfVxuXG5cblxufTtcblxuXG5cblxuIiwiXG5tb2R1bGUgVCB7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWEge1xuXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbnM7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4ucG9zaXRpb25zOlQuUG9zaXRpb25bXSkge1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb25zLmxlbmd0aDwzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBhdCBsZWFzdCAzIHBvaW50cy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGMgPSBwb3NpdGlvbnNbMF0uZ2V0RGlzdGFuY2UocG9zaXRpb25zWzFdKTtcbiAgICAgICAgICAgIHZhciBhID0gcG9zaXRpb25zWzFdLmdldERpc3RhbmNlKHBvc2l0aW9uc1syXSk7XG4gICAgICAgICAgICB2YXIgYiA9IHBvc2l0aW9uc1swXS5nZXREaXN0YW5jZShwb3NpdGlvbnNbMl0pO1xuXG4gICAgICAgICAgICAvL3IoYSxiLGMpO1xuXG4gICAgICAgICAgICBpZihhK2I+YyAmJiBiK2M+YSAmJiBhK2M+Yil7fWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCB0aHJlZSBwb2ludHMgYXJlIGluIGxpbmUuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBpc0NvbnRhaW5pbmcocG9zaXRpb246IFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vdG9kbyB3b3JraW5nIG9ubHkgZm9yIGNvbnZleCBhcmVhc1xuXG4gICAgICAgICAgICB2YXIgdGVzdHNpZGUsaWEsaWIsc2lkZWNvbGxpc2lvbixjb2xsaXNpb247XG4gICAgICAgICAgICBmb3IodGVzdHNpZGU9MDt0ZXN0c2lkZTwyO3Rlc3RzaWRlKyspIHtcblxuXG4gICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj1mYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWEgPSBpO1xuICAgICAgICAgICAgICAgICAgICBpYiA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWIgPT0gdGhpcy5wb3NpdGlvbnMubGVuZ3RoKWliID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBULk1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2lhXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYl0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICsgKHRlc3RzaWRlLTAuNSkqMTAwMDAwMDAwMC8vdG9kbyBiZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihjb2xsaXNpb249PXRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWNvbGxpc2lvbj10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLypyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWFdLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpYV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2liXS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaWJdLnksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAodGVzdHNpZGUtMC41KSoxMDAwMDAwMDAwLy90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXNpZGVjb2xsaXNpb24pcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHYW1lIGNvbmRpdGlvbnNcbiAqL1xuVC5HYW1lID0gY2xhc3N7XG4gICAgXG4gICAgXG4gICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWF4X2xpZmVfbW9kaWZpZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmljZV9rZXlfbW9kaWZpZXJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXhfbGlmZV9tb2RpZmllcixwcmljZV9rZXlfbW9kaWZpZXIpe1xuICAgIFxuICAgICAgICB0aGlzLmFjdGlvbl9jbGFzc2VzID0ge307XG4gICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlcyA9IHt9O1xuICAgICAgICB0aGlzLm1heF9saWZlX21vZGlmaWVyID0gbWF4X2xpZmVfbW9kaWZpZXI7XG4gICAgICAgIHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyID0gcHJpY2Vfa2V5X21vZGlmaWVyO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgbnVtYmVyc1xuICAgICAqL1xuICAgIGdldE9iamVjdFByaWNlQmFzZXMob2JqZWN0KXtcbiAgICBcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIHByaWNlX2Jhc2VzPVtdO1xuICAgIFxuICAgIFxuICAgICAgICBpZih0eXBlb2Ygb2JqZWN0LmFjdGlvbnMubGVuZ3RoPT09MCl7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luIG9iamVjdCAnK29iamVjdCsnIHRoZXJlIGFyZSBubyBhY3Rpb25zIScpOy8vdG9kbyBhbGwgb2JqZWN0cyBzaG91bGQgYmUgY29udmVydGVkIHRvIHN0cmluZyBsaWtlIHRoaXNcbiAgICAgICAgfVxuICAgIFxuICAgIFxuICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbil7XG4gICAgXG5cbiAgICAgICAgICAgIHZhciBwcmljZV9iYXNlID0gTWF0aC5jZWlsKGFjdGlvbi5jb3VudFByaWNlQmFzZSgpKTsvL1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgTmFOICB2YWx1ZVxuICAgICAgICAgICAgaWYoaXNOYU4ocHJpY2VfYmFzZSkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyYW1zIGluIGFjdGlvbiBhYmlsaXR5ICcrYWN0aW9uLnR5cGUrJyBtYWtlcyBwcmljZSBiZXNlIE5hTi4nKTtcbiAgICAgICAgICAgICAgICBwcmljZV9iYXNlPTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIG5vbiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgICAgaWYocHJpY2VfYmFzZTwwKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtcyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbi50eXBlKycgc2hvdWxkIG5vdCBtYWtlIHRoaXMgYWN0aW9uIG5lZ2F0aXZlJyk7Ly90b2RvIG1heWJlIG9ubHkgd2FyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgcHJpY2VfYmFzZXMucHVzaChwcmljZV9iYXNlKTtcblxuICAgIFxuICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlX2Jhc2VzKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7bnVtYmVyfSBtYXhpbXVtIGxpZmUgb2Ygb2JqZWN0XG4gICAgICovXG4gICAgZ2V0T2JqZWN0TWF4TGlmZShvYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9dGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG4gICAgICAgIHZhciBwcmljZV9iYXNlID0gcHJpY2VfYmFzZXMucmVkdWNlKGZ1bmN0aW9uKHB2LCBjdikgeyByZXR1cm4gcHYgKyBjdjsgfSwgMCk7XG4gICAgXG4gICAgXG4gICAgICAgIHByaWNlX2Jhc2U9dGhpcy5tYXhfbGlmZV9tb2RpZmllcihwcmljZV9iYXNlKTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlX2Jhc2UpO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBPYmplY3RcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gb2YgUmVzb3VyY2VzXG4gICAgICovXG4gICAgZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCl7XG5cblxuICAgICAgICB2YXIgcHJpY2VfYmFzZXM9dGhpcy5nZXRPYmplY3RQcmljZUJhc2VzKG9iamVjdCk7XG4gICAgXG4gICAgXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIHZhciBwcmljZXM9W107XG5cbiAgICBcbiAgICAgICAgdmFyIGRlc2lnbl9yZXNvdXJjZXMgPSBvYmplY3QuZ2V0TW9kZWwoKS5hZ2dyZWdhdGVSZXNvdXJjZXNWb2x1bWVzKCk7XG5cblxuICAgICAgICBvYmplY3QuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbixpKXtcbiAgICBcblxuICAgICAgICAgICAgdmFyIHByaWNlX3Jlc291cmNlc19saXN0ID1cbiAgICAgICAgICAgIGFjdGlvbi5nZXRQcmljZVJlc291cmNlcygpLnNvcnQoZnVuY3Rpb24oYSxiKXsvL3RvZG8gaXMgaXQgc2FmZT9cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGEuY2xvbmUoKS5zaWdudW0oKSktZGVzaWduX3Jlc291cmNlcy5jb21wYXJlKGIuY2xvbmUoKS5zaWdudW0oKSk7XG4gICAgXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICBcbiAgICAgICAgICAgIHZhciBwcmljZV9yZXNvdXJjZXMgPSBwcmljZV9yZXNvdXJjZXNfbGlzdFswXS5jbG9uZSgpO1xuICAgIFxuICAgIFxuICAgICAgICAgICAgcHJpY2VfcmVzb3VyY2VzLm11bHRpcGx5KHByaWNlX2Jhc2VzW2ldKTtcbiAgICAgICAgICAgIHByaWNlcy5wdXNoKHByaWNlX3Jlc291cmNlcyk7XG4gICAgXG4gICAgXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICByZXR1cm4ocHJpY2VzKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gT2JqZWN0XG4gICAgICogQHJldHVybiB7b2JqZWN0fSBSZXNvdXJjZXMgLSBwcmljZSBvZiBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRPYmplY3RQcmljZShvYmplY3Qpe1xuICAgIFxuICAgICAgICB2YXIgcHJpY2UgPSBuZXcgVC5SZXNvdXJjZXMoe30pO1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBwcmljZScscHJpY2UpO1xuICAgIFxuICAgICAgICB2YXIgcHJpY2VzPXRoaXMuZ2V0T2JqZWN0UHJpY2VzKG9iamVjdCk7XG4gICAgXG4gICAgICAgIHByaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHByaWNlXyl7XG4gICAgXG4gICAgICAgICAgICBwcmljZS5hZGQocHJpY2VfKTtcbiAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHByaWNlLmFwcGx5KHRoaXMucHJpY2Vfa2V5X21vZGlmaWVyKTtcbiAgICBcbiAgICAgICAgcmV0dXJuKHByaWNlKTtcbiAgICBcbiAgICB9XG5cblxuXG4gICAgaW5zdGFsbEFjdGlvbkNsYXNzKGFjdGlvbl9lbXB0eV9pbnN0YW5jZV9wYXJhbXMsYWN0aW9uX2NsYXNzKXtcblxuICAgICAgICB2YXIgdHlwZSA9IGFjdGlvbl9jbGFzcy5nZXRUeXBlKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHR5cGUhPT0nc3RyaW5nJyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGluc3RhbGxpbmcgYWN0aW9uIGNsYXNzIGludG8gZ2FtZSBpbnN0YW5jZTogYWN0aW9uIGNsYXNzIGhhcyBubyB0eXBlIScpO1xuICAgICAgICB9ZWxzZVxuICAgICAgICBpZih0eXBlb2YgdGhpcy5hY3Rpb25fY2xhc3Nlc1t0eXBlXSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBpbnN0YWxsaW5nIGFjdGlvbiBjbGFzcyBpbnRvIGdhbWUgaW5zdGFuY2U6IHRoZXJlIGlzIGFscmVhZHkgaW5zdGFsbGVkIGFjdGlvbiB3aXRoIHR5cGUgJyt0eXBlKTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICB2YXIgYWN0aW9uX2VtcHR5X2luc3RhbmNlID0gbmV3IGFjdGlvbl9jbGFzcyh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgcGFyYW1zOiBhY3Rpb25fZW1wdHlfaW5zdGFuY2VfcGFyYW1zXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy9BZGRpbmcgbWV0aG9kIGNsb25lIHRvIGluc3RhbGxlZCBhY3Rpb24gY2xhc3NcbiAgICAgICAgYWN0aW9uX2NsYXNzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4obmV3IGFjdGlvbl9jbGFzcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aW9uX2NsYXNzZXNbdHlwZV0gPSBhY3Rpb25fY2xhc3M7XG4gICAgICAgIHRoaXMuYWN0aW9uX2VtcHR5X2luc3RhbmNlc1t0eXBlXSA9IGFjdGlvbl9lbXB0eV9pbnN0YW5jZTtcbiAgICBcbiAgICBcbiAgICBcbiAgICB9XG5cblxuXG4gICAgZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uX3R5cGUpe1xuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmFjdGlvbl9jbGFzc2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uX2NsYXNzPT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW4gdGhpcyBnYW1lIGluc3RhbmNlIHRoYXJlIGlzIG5vIGFjdGlvbiBjbGFzcyB0eXBlICcrYWN0aW9uX3R5cGUrJy4gVGhlcmUgYXJlIG9ubHkgdGhlc2UgYWN0aW9uIHR5cGVzOiAnKyBULkFycmF5RnVuY3Rpb25zLmdldEtleXModGhpcy5hY3Rpb25fY2xhc3Nlcykuam9pbignLCAnKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihhY3Rpb25fY2xhc3MpO1xuXG4gICAgfVxuXG5cbiAgICBuZXdBY3Rpb25JbnN0YW5jZShhY3Rpb24pe1xuXG4gICAgICAgIC8vdG9kbyBzb2x2ZSBkZWZlbnNlIHZzLiBkZWZlbmNlXG4gICAgICAgIGlmKGFjdGlvbi50eXBlPT09J2RlZmVuc2UnKXtcbiAgICAgICAgICAgIGFjdGlvbi50eXBlPSdkZWZlbmNlJztcbiAgICAgICAgICAgIGFjdGlvbi5wYXJhbXMuZGVmZW5jZT1hY3Rpb24ucGFyYW1zLmRlZmVuc2U7XG4gICAgICAgICAgICBkZWxldGUgYWN0aW9uLnBhcmFtcy5kZWZlbnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbl9jbGFzcyA9IHRoaXMuZ2V0QWN0aW9uQ2xhc3MoYWN0aW9uLnR5cGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgYWN0aW9uX2NsYXNzKGFjdGlvbik7XG4gICAgfVxuXG5cblxuXG4gICAgY3JlYXRlQWN0aW9uRXhlY3V0ZShhY3Rpb25fdHlwZSl7XG5cbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG4gICAgICAgIHZhciBhY3Rpb25fY2xhc3MgPSB0aGlzLmdldEFjdGlvbkNsYXNzKGFjdGlvbl90eXBlKTtcblxuXG4gICAgICAgIHZhciBleGVjdXRlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgYXJncy51bnNoaWZ0KGdhbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uX2NsYXNzLmV4ZWN1dGUuYXBwbHkodGhpcyxhcmdzKTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgIH1cblxuXG5cbiAgICBnZXRBY3Rpb25FbXB0eUluc3RhbmNlKGFjdGlvbl90eXBlKXtcblxuICAgICAgICB2YXIgYWN0aW9uX2luc3RhbmNlID0gdGhpcy5hY3Rpb25fZW1wdHlfaW5zdGFuY2VzW2FjdGlvbl90eXBlXTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uX2luc3RhbmNlPT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbiB0aGlzIGdhbWUgaW5zdGFuY2UgdGhhcmUgaXMgbm8gYWN0aW9uIGNsYXNzIHR5cGUgJythY3Rpb25fdHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4oYWN0aW9uX2luc3RhbmNlKTtcblxuXG4gICAgfVxuXG5cblxuICAgIC8qZ2V0QWN0aW9uRXhlY3V0ZShhY3Rpb25fa2V5KXtcblxuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25fY2xhc3Nlc1thY3Rpb25fa2V5XTtcblxuICAgICAgICBpZih0eXBlb2YgYWN0aW9uPT0ndW5kZWZpbmVkJyl0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYWN0aW9uIHR5cGUgJythY3Rpb25fa2V5KycuJyk7XG5cbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzO1xuXG5cblxuICAgICAgICB2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gW2dhbWVdLnB1c2guY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlX2NhbGxiYWNrLmFwcGx5KHRoaXMsYXJncyk7XG5cbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgcmV0dXJuKGV4ZWN1dGUpO1xuICAgIH0qL1xuICAgIFxufTsiLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuR2FtZS5BY3Rpb25cbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5HYW1lLkFjdGlvbiA9IGNsYXNze1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbil7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNvbnN0cnVjdG9yLmdldFR5cGUgPT09ICd1bmRlZmluZWQnKXRocm93IG5ldyBFcnJvcignWW91IG11c3QgZXh0ZW5kIFQuR2FtZS5BY3Rpb24gYW5kIGFkZCBtZXRob2QgZ2V0VHlwZSBiZWZvcmUgY3JlYXRpbmcgaW5zdGFuY2VzIScpO1xuXG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRUeXBlKCk7XG5cbiAgICAgICAgaWYoYWN0aW9uLnR5cGUhPT10eXBlKXRocm93IG5ldyBFcnJvcignVGhpcyBpcyAnK3R5cGUrJyBub3QgJythY3Rpb24udHlwZSsnIGNsYXNzIScpO1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIGFjdGlvbil7XG4gICAgICAgICAgICB2YXIgdGhpc19rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IGFjdGlvbltrZXldO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLUNoZWNraW5nIHBhcmFtc1xuXG4gICAgICAgIC8qZm9yKHZhciBwYXJhbSBpbiBhY3Rpb25BYmlsaXR5LnBhcmFtcyl7XG4gICAgICAgICAgICB2YXIgcGFyYW1fdHlwZSA9IGFjdGlvbi5hYmlsaXR5X3BhcmFtc1twYXJhbV07XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBhY3Rpb25BYmlsaXR5LnBhcmFtc1twYXJhbV0hPT1wYXJhbV90eXBlKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtICcrcGFyYW0rJyBzaG91bGQgYmUgJytwYXJhbV90eXBlKycgaW5zdGVhZCBvZiAnK3R5cGVvZihhY3Rpb25BYmlsaXR5LmFiaWxpdHlfcGFyYW1zW3BhcmFtXSkrJyBpbiBhY3Rpb24gYWJpbGl0eSAnK2FjdGlvbkFiaWxpdHkudHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSovXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgfVxuXG5cbiAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICByZXR1cm4oMCk7XG4gICAgfVxuXG5cbiAgICBnZXRQcmljZVJlc291cmNlcygpe1xuICAgICAgICByZXR1cm4oW10pO1xuICAgIH1cblxuXG5cbiAgICBzdGF0aWMgZXhlY3V0ZSgpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGV4ZWN1dGUgcGFzc2l2ZSBhY3Rpb24uJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbiBob3cgbWFueSBzZWNvbmRzIGNhbiBiZSB0aGlzIGFjdGlvbiBpbnN0YW5jZSBleGVjdXRlZD9cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNhbkJlRXhlY3V0ZWRJbigpe1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnBhcmFtcy5jb29sZG93bj09PSdudW1iZXInKXtcblxuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMubGFzdF91c2U9PT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcyA9IE1hdGguYWJzKHRoaXMubGFzdF91c2UgLSBuZXcgRGF0ZSgpKS8xMDAwO1xuXG4gICAgICAgICAgICBpZih0aGlzLnBhcmFtcy5jb29sZG93bjw9cyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuKDApO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuKHRoaXMucGFyYW1zLmNvb2xkb3duLXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICByZXR1cm4oMCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIHRoaXMgYWN0aW9uIGluc3RhbmNlIGV4ZWN1dGVkIG5vdz9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5CZUV4ZWN1dGVkTm93KCl7XG4gICAgICAgIHJldHVybih0aGlzLmNhbkJlRXhlY3V0ZWRJbigpPT09MCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgYWN0dWFsIGRhdGUgYXMgZGF0ZSBvZiBleGVjdXRpb24gdGhpcyBhY3Rpb24gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBub3dFeGVjdXRlZCgpe1xuICAgICAgICB0aGlzLmxhc3RfdXNlPW5ldyBEYXRlKCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgaHRtbCBwcm9maWxlIG9mIGFjdGlvbiBhYmlsaXR5XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjcmVhdGVIdG1sUHJvZmlsZSgpe1xuXG4gICAgICAgIHZhciBodG1sPSc8dGFibGUgY2xhc3M9XCJhY3Rpb24tYWJpbGl0eS1wcm9maWxlXCI+JztcblxuICAgICAgICBodG1sKz1gXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIyXCI+YCsgVC5Mb2NhbGUuZ2V0KCdvYmplY3QnLCdhY3Rpb24nLHRoaXMudHlwZSkrYDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcblxuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmxhc3RfdXNlIT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgaHRtbCs9YFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5gKyBULkxvY2FsZS5nZXQoJ29iamVjdCcsJ2FjdGlvbicsJ2xhc3RfdXNlZCcpK2A8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gK3RoaXMubGFzdF91c2UrYDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZm9yKHZhciBwYXJhbSBpbiB0aGlzLnBhcmFtcyl7XG4gICAgICAgICAgICBodG1sKz1gXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPmArIFQuTG9jYWxlLmdldCgnb2JqZWN0JywnYWN0aW9uJyx0aGlzLnR5cGUscGFyYW0pK2A8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5gK3RoaXMucGFyYW1zW3BhcmFtXStgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG5cblxuICAgICAgICBodG1sKz0nPC90YWJsZT4nO1xuXG4gICAgICAgIHJldHVybihodG1sKTtcbiAgICB9XG5cbn07XG5cblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5NYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuVC5NYXBHZW5lcmF0b3IgPSBjbGFzc3tcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0WlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHpfbm9ybWFsaXppbmdfdGFibGVcbiAgICAgKiBAcGFyYW0ge1QuTWFwR2VuZXJhdG9yLkJpb3RvcGV9IGJpb3RvcGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB2aXJ0dWFsT2JqZWN0R2VuZXJhdG9yXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ2V0Wix6X25vcm1hbGl6aW5nX3RhYmxlLGJpb3RvcGUsdmlydHVhbE9iamVjdEdlbmVyYXRvcil7XG5cbiAgICAgICAgdGhpcy5nZXRaID0gZ2V0WjtcbiAgICAgICAgdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlID0gel9ub3JtYWxpemluZ190YWJsZTtcbiAgICAgICAgdGhpcy5iaW90b3BlID0gYmlvdG9wZTtcbiAgICAgICAgdGhpcy52aXJ0dWFsT2JqZWN0R2VuZXJhdG9yID0gdmlydHVhbE9iamVjdEdlbmVyYXRvcjtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0Wk1hcENpcmNsZShjZW50ZXJfaW50ZWdlcixyYWRpdXMpe1xuXG4gICAgICAgIHZhciBtYXA9W107XG5cbiAgICAgICAgZm9yKHZhciB5PTA7eTw9cmFkaXVzKjI7eSsrKXtcblxuICAgICAgICAgICAgbWFwW3ldPVtdO1xuXG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PD1yYWRpdXMqMjt4Kyspe1xuXG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeC1yYWRpdXMrMS8yLDIpK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyh5LXJhZGl1cysxLzIsMik+XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHJhZGl1cywyKVxuICAgICAgICAgICAgICAgICljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLmdldFooeC1yYWRpdXMrY2VudGVyX2ludGVnZXIueCx5LXJhZGl1cytjZW50ZXJfaW50ZWdlci55KTtcblxuXG4gICAgICAgICAgICAgICAgbWFwW3ldW3hdID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG1hcCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbWFwXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGVycmFpbk1hcChtYXApe1xuXG4gICAgICAgIHZhciBtYXBfYmc9W107XG5cbiAgICAgICAgZm9yKHZhciB5PTAsbD1tYXAubGVuZ3RoO3k8bDt5Kyspe1xuICAgICAgICAgICAgbWFwX2JnW3ldPVtdO1xuICAgICAgICAgICAgZm9yKHZhciB4PTA7eDxsO3grKyl7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YobWFwW3ldW3hdKT09PSd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbWFwX2JnW3ldW3hdID0gdGhpcy5iaW90b3BlLmdldFpUZXJyYWluKG1hcFt5XVt4XSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihtYXBfYmcpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VC5Qb3NpdGlvbn0gY2VudGVyX2ludGVnZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0TWFwQXJyYXlDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKXtcblxuXG4gICAgICAgIHZhciBib3VuZHM9MTtcblxuXG4gICAgICAgIHZhciB6X21hcD10aGlzLmdldFpNYXBDaXJjbGUoY2VudGVyX2ludGVnZXIscmFkaXVzKTtcblxuICAgICAgICB2YXIgbWFwPXRoaXMudGVycmFpbk1hcCh6X21hcCk7XG5cbiAgICAgICAgcmV0dXJuKG1hcCk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXBfYXJyYXlcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlcl9pbnRlZ2VyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnZlcnRNYXBBcnJheVRvT2JqZWN0cyhtYXBfYXJyYXksY2VudGVyX2ludGVnZXIscmFkaXVzKXtcblxuICAgICAgICB2YXIgb2JqZWN0cz0gbmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcmFkaXVzICogMjsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHJhZGl1cyAqIDI7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihtYXBfYXJyYXlbeV1beF0pID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBULk9iamVjdHMuVGVycmFpbihtYXBfYXJyYXlbeV1beF0pO1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3QueD1jZW50ZXJfaW50ZWdlci54LXJhZGl1cyt4O1xuICAgICAgICAgICAgICAgIG9iamVjdC55PWNlbnRlcl9pbnRlZ2VyLnktcmFkaXVzK3k7XG5cblxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybihvYmplY3RzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBub3RfY2VudGVyXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UHVyZU1hcChjZW50ZXIscmFkaXVzLCBub3RfY2VudGVyPWZhbHNlKXtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNlbnRlcixub3RfY2VudGVyKTtcblxuICAgICAgICB2YXIgY2VudGVyX2ludGVnZXI9e1xuICAgICAgICAgICAgeDogTWF0aC5mbG9vcihjZW50ZXIueCksXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGNlbnRlci55KVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG5vdF9jZW50ZXIpXG4gICAgICAgIG5vdF9jZW50ZXI9e1xuICAgICAgICAgICAgeDogbm90X2NlbnRlci54LWNlbnRlcl9pbnRlZ2VyLngsXG4gICAgICAgICAgICB5OiBub3RfY2VudGVyLnktY2VudGVyX2ludGVnZXIueVxuICAgICAgICB9O1xuXG5cblxuICAgICAgICAvKnZhciBtYXBfYXJyYXkgPSB0aGlzLmdldE1hcEFycmF5Q2lyY2xlKGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7XG4gICAgICAgIHZhciBvYmplY3RzID0gdGhpcy5jb252ZXJ0TWFwQXJyYXlUb09iamVjdHMobWFwX2FycmF5LGNlbnRlcl9pbnRlZ2VyLHJhZGl1cyk7LyoqL1xuXG5cbiAgICAgICAgdmFyIG9iamVjdHM9IG5ldyBULk9iamVjdHMuQXJyYXkoKTtcblxuICAgICAgICB2YXIgeCx5LHosdCxvYmplY3Q7XG4gICAgICAgIGZvcih5PTA7eTw9cmFkaXVzKjI7eSsrKXtcbiAgICAgICAgICAgIGZvcih4PTA7eDw9cmFkaXVzKjI7eCsrKXtcblxuXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHgtcmFkaXVzKzEvMiwyKStcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coeS1yYWRpdXMrMS8yLDIpPlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsMilcbiAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmKG5vdF9jZW50ZXIpXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHgtbm90X2NlbnRlci54LXJhZGl1cysxLzIsMikrXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHktbm90X2NlbnRlci55LXJhZGl1cysxLzIsMik8PVxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhyYWRpdXMsMilcbiAgICAgICAgICAgICAgICApY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIHogPSB0aGlzLmdldFooeC1yYWRpdXMrY2VudGVyX2ludGVnZXIueCx5LXJhZGl1cytjZW50ZXJfaW50ZWdlci55KTtcbiAgICAgICAgICAgICAgICB6ID0gdGhpcy56X25vcm1hbGl6aW5nX3RhYmxlW01hdGguZmxvb3IoeiAqIHRoaXMuel9ub3JtYWxpemluZ190YWJsZS5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLmJpb3RvcGUuZ2V0WlRlcnJhaW4oeik7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHQpO1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0PSBuZXcgVC5PYmplY3RzLlRlcnJhaW4odCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lng9Y2VudGVyX2ludGVnZXIueC1yYWRpdXMreDtcbiAgICAgICAgICAgICAgICBvYmplY3QueT1jZW50ZXJfaW50ZWdlci55LXJhZGl1cyt5O1xuXG5cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4ob2JqZWN0cyk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULk9iamVjdHMuQXJyYXl9IG9iamVjdHNcbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0VmlydHVhbE9iamVjdHNGcm9tVGVycmFpbk9iamVjdHMob2JqZWN0cyl7XG5cblxuICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gW107XG4gICAgICAgIHZhciBvYmplY3RzXzF4MV9yYXcgPSBvYmplY3RzLmdldDF4MVRlcnJhaW5PYmplY3RzKCkuZ2V0QWxsKCk7XG5cblxuICAgICAgICBmb3IodmFyIGk9MCxsPW9iamVjdHNfMXgxX3Jhdy5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgIHRoaXMudmlydHVhbE9iamVjdEdlbmVyYXRvcihvYmplY3RzXzF4MV9yYXdbaV0sdmlydHVhbF9vYmplY3RzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKHZpcnR1YWxfb2JqZWN0cyk7XG5cbiAgICB9XG5cblxuXG5cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UFVCTElDPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRlcnJhaW4gYW5kIHZpcnR1YWwgb2JqZWN0cyBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgKiBAcGFyYW0ge1QuT2JqZWN0cy5BcnJheX0gcmVhbF9vYmplY3RzXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2aXJ0dWFsX29iamVjdHNcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IG5vdF9jZW50ZXIgRG9udCBnZXQgb2JqZWN0cyBuZWFyIHRoaXMgY2VudGVyLlxuICAgICAqIEByZXR1cm5zIHtULk9iamVjdHMuQXJyYXl9fVxuICAgICAqL1xuICAgIGdldENvbXBsZXRlT2JqZWN0cyhyZWFsX29iamVjdHMsY2VudGVyLHJhZGl1cyxuYXR1cmFsX29iamVjdHM9dHJ1ZSxub3RfY2VudGVyPWZhbHNlKXtcblxuXG5cbiAgICAgICAgdmFyIGNvbXBsZXRlX29iamVjdHMgPSB0aGlzLmdldFB1cmVNYXAoY2VudGVyLCByYWRpdXMsIG5vdF9jZW50ZXIpO1xuXG5cblxuICAgICAgICByZWFsX29iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICAgICAgY29tcGxldGVfb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICBpZihuYXR1cmFsX29iamVjdHMpe1xuXG4gICAgICAgICAgICB2YXIgdmlydHVhbF9vYmplY3RzID0gdGhpcy5nZXRWaXJ0dWFsT2JqZWN0c0Zyb21UZXJyYWluT2JqZWN0cyhjb21wbGV0ZV9vYmplY3RzKTtcblxuICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZV9vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cblxuICAgICAgICByZXR1cm4oY29tcGxldGVfb2JqZWN0cyk7XG5cbiAgICB9XG4gICAgXG5cblxufTtcbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk1hcEdlbmVyYXRvci5CaW90b3BlXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblQuTWFwR2VuZXJhdG9yLkJpb3RvcGUgPSBjbGFzc3tcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGVycmFpbnNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0ZXJyYWlucyl7XG5cbiAgICAgICAgdmFyIHN1bT0wO1xuICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uKHRlcnJhaW4pe1xuICAgICAgICAgICAgc3VtKz10ZXJyYWluLmFtb3VudDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgZnJvbT0wO1xuICAgICAgICB0ZXJyYWlucy5mb3JFYWNoKGZ1bmN0aW9uKHRlcnJhaW4pe1xuXG4gICAgICAgICAgICB0ZXJyYWluLmZyb209ZnJvbS9zdW07XG4gICAgICAgICAgICBmcm9tKz10ZXJyYWluLmFtb3VudDtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRlcnJhaW5zKTtcbiAgICAgICAgdGhpcy50ZXJyYWlucyA9IHRlcnJhaW5zO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6XG4gICAgICogQHJldHVybnMge1QuT2JqZWN0cy5UZXJyYWlufVxuICAgICAqL1xuICAgIGdldFpUZXJyYWluKHope1xuXG5cbiAgICAgICAgZm9yKHZhciBpPXRoaXMudGVycmFpbnMubGVuZ3RoLTE7aT49MDtpLS0pe1xuXG4gICAgICAgICAgICBpZih6ID49IHRoaXMudGVycmFpbnNbaV0uZnJvbSApIHJldHVybih0aGlzLnRlcnJhaW5zW2ldLnRlcnJhaW4pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cblxufTtcblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuTW9kZWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULk1vZGVsID0gY2xhc3N7XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWwganNvblxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlIGluIGNhc2Ugb2YgZmFpbFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGpzb24pe1xuXG4gICAgICAgIGlmKHR5cGVvZihqc29uKT09J3VuZGVmaW5lZCcpcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMubmFtZT1qc29uLm5hbWU7XG4gICAgICAgIHRoaXMucGFydGljbGVzPWpzb24ucGFydGljbGVzO1xuICAgICAgICB0aGlzLnJvdGF0aW9uPWpzb24ucm90YXRpb247XG4gICAgICAgIHRoaXMuc2l6ZT1qc29uLnNpemU7XG5cbiAgICAgICAgaWYodHlwZW9mKHRoaXMucm90YXRpb24pPT0ndW5kZWZpbmVkJyl0aGlzLnJvdGF0aW9uPTA7XG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnNpemUpPT0ndW5kZWZpbmVkJyl0aGlzLnNpemU9MTtcbiAgICB9XG5cblxuICAgIGNsb25lICgpe1xuICAgICAgICByZXR1cm4obmV3IFQuTW9kZWwoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcbiAgICAgKi9cbiAgICBhZGRSb3RhdGlvblNpemUocm90YXRpb24sc2l6ZSl7XG5cbiAgICAgICAgaWYodHlwZW9mIHJvdGF0aW9uID09PSAndW5kZWZpbmVkJylyb3RhdGlvbj0wO1xuICAgICAgICBpZih0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZT0xO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24rPXJvdGF0aW9uO1xuICAgICAgICB0aGlzLnNpemU9dGhpcy5zaXplKnNpemU7XG5cbiAgICB9XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaW1lbnNpb24geCx5LHoseHlcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHJhbmdlXG4gICAgICovXG4gICAgcmFuZ2UoZGltZW5zaW9uKXtcblxuICAgICAgICBpZihkaW1lbnNpb249PSd4eScpe1xuXG4gICAgICAgICAgICByZXR1cm4gVC5NYXRoLnh5MmRpc3QodGhpcy5yYW5nZSgneCcpLHRoaXMucmFuZ2UoJ3knKSp0aGlzLnNpemUpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBwYXJ0aWNsZXNMaW5lYXI9dGhpcy5nZXRMaW5lYXJQYXJ0aWNsZXMoKTtcblxuICAgICAgICB2YXIgbWF4PWZhbHNlLG1pbj1mYWxzZSxtYXhfLG1pbl87XG4gICAgICAgIGZvcih2YXIgaSBpbiBwYXJ0aWNsZXNMaW5lYXIpe1xuXG5cbiAgICAgICAgICAgIG1pbl89cGFydGljbGVzTGluZWFyW2ldLnBvc2l0aW9uW2RpbWVuc2lvbl07XG4gICAgICAgICAgICBtYXhfPXBhcnRpY2xlc0xpbmVhcltpXS5wb3NpdGlvbltkaW1lbnNpb25dK3BhcnRpY2xlc0xpbmVhcltpXS5zaXplW2RpbWVuc2lvbl07XG5cbiAgICAgICAgICAgIC8vdG9kbyBmZWF0dXJlIHJldmVyc2VcblxuICAgICAgICAgICAgaWYobWF4PT09ZmFsc2UpbWF4PW1heF87XG4gICAgICAgICAgICBpZihtaW49PT1mYWxzZSltaW49bWluXztcblxuXG4gICAgICAgICAgICBpZihtYXhfPm1heCltYXg9bWF4XztcbiAgICAgICAgICAgIGlmKG1pbl88bWluKW1pbj1taW5fO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybihNYXRoLmFicyhtaW4tbWF4KS8qdGhpcy5zaXplKi8pOy8vdG9kbyByb3RhdGlvblxuXG5cblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3ZlX3pcbiAgICAgKi9cbiAgICBtb3ZlQnkobW92ZV94LG1vdmVfeSxtb3ZlX3ope1xuXG4gICAgICAgIGlmKHR5cGVvZiBtb3ZlX3ggPT09ICd1bmRlZmluZWQnKW1vdmVfeD0wO1xuICAgICAgICBpZih0eXBlb2YgbW92ZV95ID09PSAndW5kZWZpbmVkJyltb3ZlX3k9MDtcbiAgICAgICAgaWYodHlwZW9mIG1vdmVfeiA9PT0gJ3VuZGVmaW5lZCcpbW92ZV96PTA7XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMucGFydGljbGVzKXtcblxuXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54Kz1tb3ZlX3g7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55Kz1tb3ZlX3k7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi56Kz1tb3ZlX3o7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIFxuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHVybiBaIG9mIGpvaW5pbmcgbW9kZWxcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAqL1xuICAgIGpvaW5Nb2RlbFoobW9kZWwsbW92ZV94LG1vdmVfeSl7Ly90b2RvIHNlY29uZCBwYXJhbSBzaG91bGQgYmUgcG9zaXRpb25cblxuICAgICAgICAvL3ZhciAgbW9kZWxfPWRlZXBDb3B5TW9kZWwobW9kZWwpO1xuICAgICAgICAvL21vZGVsXy5tb3ZlQnkobW92ZV94LG1vdmVfeSk7Ly90b2RvIG1heWJlIGRlbGV0ZSBtb3ZlQnlcblxuICAgICAgICAvL3ZhciBtYXhfej10aGlzLnJhbmdlKCd6Jyk7XG5cblxuICAgICAgICB2YXIgdGhpc19saW5lYXJfcGFydGljbGVzPXRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG4gICAgICAgIHZhciBtb2RlbF9saW5lYXJfcGFydGljbGVzPW1vZGVsLmdldExpbmVhclBhcnRpY2xlcygpO1xuXG5cbiAgICAgICAgdmFyIGRpc3RhbmNlcz1bMF07XG4gICAgICAgIGZvcih2YXIgaSBpbiBtb2RlbF9saW5lYXJfcGFydGljbGVzKXtcblxuICAgICAgICAgICAgbW9kZWxfbGluZWFyX3BhcnRpY2xlc1tpXS5wb3NpdGlvbi54Kz1tb3ZlX3g7XG4gICAgICAgICAgICBtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldLnBvc2l0aW9uLnkrPW1vdmVfeTtcblxuICAgICAgICAgICAgZm9yKHZhciBpaSBpbiB0aGlzX2xpbmVhcl9wYXJ0aWNsZXMpey8vdG9kbyBtYXliZSBvcHRpbWl6ZSBieSBwcmUtc29ydGluZ1xuXG5cbiAgICAgICAgICAgICAgICBpZihQYXJ0aWNsZXMuY29sbGlzaW9uMkQodGhpc19saW5lYXJfcGFydGljbGVzW2lpXSxtb2RlbF9saW5lYXJfcGFydGljbGVzW2ldKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgcih0aGlzX2xpbmVhcl9wYXJ0aWNsZXNbaWldLG1vZGVsX2xpbmVhcl9wYXJ0aWNsZXNbaV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzLnB1c2godGhpc19saW5lYXJfcGFydGljbGVzW2lpXS5wb3NpdGlvbi56K3RoaXNfbGluZWFyX3BhcnRpY2xlc1tpaV0uc2l6ZS56KTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1heF96PU1hdGgubWF4LmFwcGx5KE1hdGgsZGlzdGFuY2VzKTtcblxuICAgICAgICByZXR1cm4gbWF4X3o7XG5cbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogSm9pbiBtb2RlbHMgdG9nZXRoZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gTW9kZWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZV94XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdmVfeVxuICAgICAqL1xuICAgIGpvaW5Nb2RlbChtb2RlbCxtb3ZlX3gsbW92ZV95KXsvL3RvZG8gc2Vjb25kIHBhcmFtIHNob3VsZCBiZSBwb3NpdGlvblxuXG4gICAgICAgIHZhciBtYXhfej10aGlzLmpvaW5Nb2RlbFoobW9kZWwsbW92ZV94LG1vdmVfeSk7XG5cblxuICAgICAgICB0aGlzLnBhcnRpY2xlcz1bXG4gICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSxcbiAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZWwpKVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMucGFydGljbGVzWzFdLnBvc2l0aW9uPXtcbiAgICAgICAgICAgIHg6bW92ZV94LFxuICAgICAgICAgICAgeTptb3ZlX3ksXG4gICAgICAgICAgICB6Om1heF96XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yb3RhdGlvbj0wO1xuICAgICAgICB0aGlzLnNpemU9MTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIERlZXAgY29weSB0aGlzIGFuZCBjb252ZXJ0cyBsaW5rcyB0byByYXcgZGF0YVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IE1vZGVsXG4gICAgICovXG4gICAgZ2V0RGVlcENvcHlXaXRob3V0TGlua3MoKSB7XG5cblxuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNsb25lKCk7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db252ZXJ0IGxpbmtzIHRvIHJhdyBkYXRhXG5cblxuICAgICAgICB2YXIgZmluZFBhcnRpY2xlQnlOYW1lID0gZnVuY3Rpb24ocGFydGljbGVzLCBuYW1lKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFydGljbGVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnRpY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmRlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShwYXJ0aWNsZXNbaV0ucGFydGljbGVzLCBuYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkX3BhcnRpY2xlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmaW5kZWRfcGFydGljbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlc0xpbmtzID0gZnVuY3Rpb24ocGFydGljbGVzKSB7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cblxuICAgICAgICAgICAgLy9yKHBhcnRpY2xlcyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcGFydGljbGVzKSB7XG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+TGlua1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLmxpbmspIT0ndW5kZWZpbmVkJykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZF9wYXJ0aWNsZSA9IGZpbmRQYXJ0aWNsZUJ5TmFtZShtb2RlbC5wYXJ0aWNsZXMsIHBhcnRpY2xlc1tpXS5saW5rKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkX3BhcnRpY2xlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpbmsgJyArIHBhcnRpY2xlLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua2VkX3BhcnRpY2xlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5rZWRfcGFydGljbGUpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBhcnRpY2xlc1tpXS5yb3RhdGlvbikhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZXNbaV0ucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0uc2l6ZSkhPSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rZWRfcGFydGljbGUuc2l6ZSA9IHBhcnRpY2xlc1tpXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocGFydGljbGVzW2ldLnBvc2l0aW9uKSE9J3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZF9wYXJ0aWNsZS5wb3NpdGlvbiA9IHBhcnRpY2xlc1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3RvZG8gc2tld1xuXG5cbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGVzW2ldID0gbGlua2VkX3BhcnRpY2xlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fkdyb3VwXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihwYXJ0aWNsZXNbaV0ucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZXNMaW5rcyhwYXJ0aWNsZXNbaV0ucGFydGljbGVzKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcGFydGljbGVzTGlua3MobW9kZWwucGFydGljbGVzKTtcblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IDFEIGFycmF5IG9mIHBhcnRpY2xlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgcGFydGljbGVzXG4gICAgICovXG4gICAgZ2V0TGluZWFyUGFydGljbGVzKCl7XG5cblxuICAgICAgICB2YXIgcGFydGljbGVzTGluZWFyPVtdO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29udmVydCBwYXJ0aWNsZXMgdG8gMUQgcGFydGljbGVzXG5cbiAgICAgICAgdmFyIHBhcnRpY2xlczJMaW5lYXIgPSBmdW5jdGlvbihwYXJ0aWNsZXMscG9zaXRpb24scm90YXRpb24sc2l6ZSl7Ly90b2RvIG1vdmUgdG8gcHJvdG90eXBlXG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcpcG9zaXRpb249ZmFsc2U7XG4gICAgICAgICAgICBpZih0eXBlb2Ygcm90YXRpb24gPT09ICd1bmRlZmluZWQnKXJvdGF0aW9uPTA7XG4gICAgICAgICAgICBpZih0eXBlb2Ygc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpc2l6ZT0xO1xuXG5cbiAgICAgICAgICAgIGlmKHBvc2l0aW9uPT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtcbiAgICAgICAgICAgICAgICAgICAgeDowLFxuICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgIHo6MFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnRpY2xlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlKXtcblxuICAgICAgICAgICAgICAgIC8vcGFydGljbGU9ZGVlcENvcHkocGFydGljbGUpO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+RGVmYXVsdCBwYXJhbXMgb2YgcGFydGljbGUsIGdyb3VwIG9yIGxpbmtcbiAgICAgICAgICAgICAgICBpZighcGFydGljbGUucG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbj17XG4gICAgICAgICAgICAgICAgICAgICAgICB4OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6OjBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnJvdGF0aW9uKT09J3VuZGVmaW5lZCcpcGFydGljbGUucm90YXRpb249MDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUuc2l6ZSk9PSd1bmRlZmluZWQnKXBhcnRpY2xlLnNpemU9MTtcbiAgICAgICAgICAgICAgICAvL35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5Qb3NpdGlvbiwgUm90YXRpb24gYW5kIHNpemUgLy90b2RvIHNrZXdcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0RGVnID0gVC5NYXRoLnh5MmRpc3REZWcocGFydGljbGUucG9zaXRpb24ueCwgcGFydGljbGUucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgICAgICBkaXN0RGVnLmRpc3QgPSBkaXN0RGVnLmRpc3QgKiBzaXplO1xuICAgICAgICAgICAgICAgIGRpc3REZWcuZGVnICs9IHJvdGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgdmFyIHh5ID0gVC5NYXRoLmRpc3REZWcyeHkoZGlzdERlZy5kaXN0LCBkaXN0RGVnLmRlZyk7XG5cbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSB4eS54O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB4eS55O1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBwYXJ0aWNsZS5wb3NpdGlvbi56ICogc2l6ZTtcblxuICAgICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggKz0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ICs9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiArPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBhcnRpY2xlLnNpemUgPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplID0gcGFydGljbGUuc2l6ZSAqIHNpemU7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnggPSBwYXJ0aWNsZS5zaXplLnggKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnkgPSBwYXJ0aWNsZS5zaXplLnkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zaXplLnogKiBzaXplO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGFydGljbGVcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFydGljbGUucGFydGljbGVzKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlczJMaW5lYXIocGFydGljbGUucGFydGljbGVzLHBhcnRpY2xlLnBvc2l0aW9uLHBhcnRpY2xlLnJvdGF0aW9uLHBhcnRpY2xlLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdyb3VwXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhcnRpY2xlLnNoYXBlKSE9J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlc0xpbmVhci5wdXNoKHBhcnRpY2xlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzLmdldERlZXBDb3B5V2l0aG91dExpbmtzKCk7XG5cbiAgICAgICAgcGFydGljbGVzMkxpbmVhcihtb2RlbC5wYXJ0aWNsZXMsZmFsc2UsbW9kZWwucm90YXRpb24sbW9kZWwuc2l6ZSk7XG5cbiAgICAgICAgLy90b2RvIHN0cmljdCBtb2RlLy9kZWxldGUgbW9kZWw7XG5cbiAgICAgICAgcmV0dXJuKHBhcnRpY2xlc0xpbmVhcik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJ0IG9mIHRoaXNcbiAgICAgKi9cbiAgICBmaWx0ZXJQYXRoKHBhdGgpe1xuXG4gICAgICAgIHZhciBtb2RlbD10aGlzO1xuXG4gICAgICAgIGlmKHR5cGVvZihwYXRoLmZvckVhY2gpPT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICByKHBhdGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIGlzIG5vdCBjb3JyZWN0IGFycmF5LicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLnBhcnRpY2xlc1tpXTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4obW9kZWwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnQgb2YgdGhpc1xuICAgICAqL1xuICAgIGZpbHRlclBhdGhTaWJsaW5ncyhwYXRoKXtcblxuICAgICAgICB2YXIgbW9kZWw9dGhpcy5nZXREZWVwQ29weVdpdGhvdXRMaW5rcygpO1xuICAgICAgICB2YXIgY3VycmVudD1tb2RlbDtcblxuICAgICAgICBpZih0eXBlb2YocGF0aC5mb3JFYWNoKT09J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgcihwYXRoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBpcyBub3QgY29ycmVjdCBhcnJheS4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlX2kscGF0aF9paSl7XG5cbiAgICAgICAgICAgIC8qaWYocGF0aF9paTxwYXRoLmxlbmd0aC0xKXtcblxuICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcnRpY2xlc1twYXJ0aWNsZV9pXTtcblxuICAgICAgICAgICAgIH1lbHNleyovXG5cbiAgICAgICAgICAgIHZhciBtZSA9IGN1cnJlbnQucGFydGljbGVzW3BhcnRpY2xlX2ldO1xuXG4gICAgICAgICAgICBjdXJyZW50LnBhcnRpY2xlcyA9IFttZV07XG5cbiAgICAgICAgICAgIGN1cnJlbnQ9bWU7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybihtb2RlbCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFnZ3JlZ2F0ZSB2b2x1bWUgb2YgZWFjaCByZXNvdXJjZSB1c2VkIGluIG1vZGVsXG4gICAgICogQHJldHVybnMge1QuUmVzb3VyY2VzfVxuICAgICAqL1xuICAgIGFnZ3JlZ2F0ZVJlc291cmNlc1ZvbHVtZXMoKXtcblxuXG4gICAgICAgIHZhciBwcmljZSA9IG5ldyBULlJlc291cmNlcyh7fSk7XG5cblxuICAgICAgICB2YXIgbGluZWFyX3BhcnRpY2xlcyA9IHRoaXMuZ2V0TGluZWFyUGFydGljbGVzKCk7XG5cblxuICAgICAgICBsaW5lYXJfcGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24obGluZWFyX3BhcnRpY2xlKXtcblxuICAgICAgICAgICAgdmFyIHZvbHVtZT0vL3RvZG8gYWxsIHNoYXBlc1xuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnggKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLnkgKlxuICAgICAgICAgICAgICAgIGxpbmVhcl9wYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciBtYXRlcmlhbD1saW5lYXJfcGFydGljbGUubWF0ZXJpYWwuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIG1hdGVyaWFsPW1hdGVyaWFsWzBdO1xuXG4gICAgICAgICAgICB2YXIgcHJpY2VfPXt9O1xuICAgICAgICAgICAgcHJpY2VfW21hdGVyaWFsXT12b2x1bWU7XG5cbiAgICAgICAgICAgIHByaWNlLmFkZChwcmljZV8pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coJ3ByaWNlIG9mJyk7XG4gICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuZGVzaWduLmRhdGEpO1xuICAgICAgICAgY29uc29sZS5sb2cocHJpY2UpOyovXG5cbiAgICAgICAgLy9wcmljZS5tdWx0aXBseSgwLjAxKTtcblxuICAgICAgICByZXR1cm4ocHJpY2UpO1xuXG5cbiAgICB9XG5cblxuXG5cbiAgICBnZXRIYXNoKCl7XG4gICAgICAgIHJldHVybiAneHh4JytKU09OLnN0cmluZ2lmeSh0aGlzLnBhcnRpY2xlcykubGVuZ3RoOy8vdG9kbyBiZXR0ZXJcbiAgICB9XG5cblxuICAgIFxuICAgIFxuXG59O1xuXG4iLCIvKipcbiAqIEBhdXRob3IgVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBzdGF0aWMgY2xhc3MgVC5Nb2RlbC5QYXJ0aWNsZXNcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuLyoqXG4gKiBNb2RlbCBQYXJ0aWNsZXNcbiAqL1xuVC5Nb2RlbC5QYXJ0aWNsZXMgPSBjbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICogQWRkIG1pc3NpbmcgcGFyYW1zIGludG8gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBwYXJ0aWNsZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKSB7Ly90b2RvID8/IG1heWJlIHJlbmFtZVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5za2V3ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUuc2tldy56ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFydGljbGUuc2tldy56ID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWNsZS5zaGFwZS50b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaGFwZS50b3AgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNoYXBlLmJvdHRvbSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2YgcGFydGljbGUucm90YXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHBhcnRpY2xlKTtcblxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICBzdGF0aWMgZ2V0VHJpYW5nbGVzKHBhcnRpY2xlLHBvaW50X2NsYXNzKXtcblxuICAgICAgICB2YXIgdHJpYW5nbGVzID1bXTtcblxuICAgICAgICBwYXJ0aWNsZT10aGlzLmFkZE1pc3NpbmdQYXJhbXMocGFydGljbGUpO1xuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5zaGFwZS50eXBlID09ICdwcmlzbScpIHtcblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpc21cblxuICAgICAgICAgICAgdmFyIHggPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgdmFyIHkgPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgdmFyIHogPSBwYXJ0aWNsZS5wb3NpdGlvbi56Oy8vICogMjtcblxuXG4gICAgICAgICAgICB2YXIgeF8gPSBwYXJ0aWNsZS5zaXplLng7XG4gICAgICAgICAgICB2YXIgeV8gPSBwYXJ0aWNsZS5zaXplLnk7XG4gICAgICAgICAgICB2YXIgel8gPSBwYXJ0aWNsZS5zaXplLno7XG5cbiAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHBhcnRpY2xlLnNoYXBlLm47IG4rKykge1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsZXZlbCA9IDA7IGxldmVsIDwgMjsgbGV2ZWwrKykge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLmJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS1YWVogcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzKHBhcnRpY2xlLnNoYXBlLnJvdGF0ZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHhfXyA9IDAuNSAqIHhfICogTWF0aC5jb3MobiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB4XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSAqIGJhc2UgKyB5XyAqIChsZXZlbCAqIHBhcnRpY2xlLnNrZXcuei55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9IHpfICogbGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9ICgyIC0gKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpOy8vdG9kbyBiZXR0ZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0geF8gKiAoKGxldmVsICogMikgLSAxKTsvLyoobGV2ZWwtMC41KTsvLyt4XyoobGV2ZWwqcGFydGljbGUuc2tldy56LngpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB5X18gPSAwLjUgKiB5XyAqIE1hdGguc2luKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSk7Ly8reV8qKGxldmVsKnBhcnRpY2xlLnNrZXcuei55KSxcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB6X18gPSAoMSkgKiAwLjUgKiAoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogdG1wICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgel8gKiAoKE1hdGguY29zKFQuTWF0aC5kZWcycmFkKDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKSkpICogdG1wXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tIFhZIFJvdGF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIERpc3REZWdfID0gVC5NYXRoLnh5MmRpc3REZWcoeF9fLCB5X18pOy8vdG9kbyByZWZhY3RvciBhbGwgbGlrZSBEaXN0RGVnLCBldGMuLi5cbiAgICAgICAgICAgICAgICAgICAgRGlzdERlZ18uZGVnICs9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHlfID0gVC5NYXRoLmRpc3REZWcyeHkoRGlzdERlZ18uZGlzdCwgRGlzdERlZ18uZGVnKTtcblxuICAgICAgICAgICAgICAgICAgICB4X18gPSB4eV8ueDtcbiAgICAgICAgICAgICAgICAgICAgeV9fID0geHlfLnk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gobmV3IHBvaW50X2NsYXNzKHhfXyx5X18sel9fKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZXNvdXJjZS5wb2ludHMucHVzaChbeCArIHhfXywgeSArIHlfXywgeiArIHpfX10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLyppZiAobGV2ZWwgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yKG4sMSxwYXJ0aWNsZS5zaGFwZS5uLChuKzErcGFydGljbGUuc2hhcGUubikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnNbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1sxXS5wdXNoKG4gKyAxICsgcGFydGljbGUuc2hhcGUubik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMF0ucHVzaChuICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uczJEWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gIT09IDAgPyBuIDogcGFydGljbGUuc2hhcGUubikgKyBwYXJ0aWNsZS5zaGFwZS5uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biBwYXJ0aWNsZSBzaGFwZSAnICsgcGFydGljbGUuc2hhcGUudHlwZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuXG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogR2V0IDNEIG1vZGVsIGZyb20gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IDNEIG1vZGVsXG4gICAgICovXG4gICAgc3RhdGljIGdldDNEKHBhcnRpY2xlKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0ge307XG5cbiAgICAgICAgcGFydGljbGU9dGhpcy5hZGRNaXNzaW5nUGFyYW1zKHBhcnRpY2xlKTtcblxuICAgICAgICBpZiAocGFydGljbGUuc2hhcGUudHlwZSA9PSAncHJpc20nKSB7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXNtXG5cbiAgICAgICAgICAgIHZhciB4ID0gcGFydGljbGUucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHZhciB5ID0gcGFydGljbGUucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHZhciB6ID0gcGFydGljbGUucG9zaXRpb24uejsvLyAqIDI7XG5cblxuICAgICAgICAgICAgdmFyIHhfID0gcGFydGljbGUuc2l6ZS54O1xuICAgICAgICAgICAgdmFyIHlfID0gcGFydGljbGUuc2l6ZS55O1xuICAgICAgICAgICAgdmFyIHpfID0gcGFydGljbGUuc2l6ZS56O1xuXG5cbiAgICAgICAgICAgIC8vcih4Xyx5Xyk7XG4gICAgICAgICAgICAvL3IocGFydGljbGUuc2hhcGUubik7XG5cblxuICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzID0gW107XG4gICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29ucyA9IFtbXSwgW11dO1xuICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRCA9IFtbXSwgW11dO1xuICAgICAgICAgICAgdmFyIGJhc2U7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGxldmVsID0gMDsgbGV2ZWwgPCAyOyBsZXZlbCsrKSB7XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiYXNlID0gcGFydGljbGUuc2hhcGUuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZSA9IHBhcnRpY2xlLnNoYXBlLnRvcDtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHZhciB4X18sIHlfXywgel9fO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBwYXJ0aWNsZS5zaGFwZS5uOyBuKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLVhZWiByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXMocGFydGljbGUuc2hhcGUucm90YXRlZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeF9fID0gMC41ICogeF8gKiBNYXRoLmNvcyhuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHhfICogKGxldmVsICogcGFydGljbGUuc2tldy56LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeV9fID0gMC41ICogeV8gKiBNYXRoLnNpbihuIC8gcGFydGljbGUuc2hhcGUubiAqIE1hdGguUEkgKiAyICsgVC5NYXRoLmRlZzJyYWQoMTgwICsgMTgwIC8gcGFydGljbGUuc2hhcGUubikpICogYmFzZSArIHlfICogKGxldmVsICogcGFydGljbGUuc2tldy56LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgel9fID0gel8gKiBsZXZlbDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gKDIgLSAoTWF0aC5jb3MoVC5NYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSk7Ly90b2RvIGJldHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICB4X18gPSB4XyAqICgobGV2ZWwgKiAyKSAtIDEpOy8vKihsZXZlbC0wLjUpOy8vK3hfKihsZXZlbCpwYXJ0aWNsZS5za2V3LnoueCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHlfXyA9IDAuNSAqIHlfICogTWF0aC5zaW4obiAvIHBhcnRpY2xlLnNoYXBlLm4gKiBNYXRoLlBJICogMiArIFQuTWF0aC5kZWcycmFkKDE4MCArIDE4MCAvIHBhcnRpY2xlLnNoYXBlLm4pKTsvLyt5XyoobGV2ZWwqcGFydGljbGUuc2tldy56LnkpLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHpfXyA9ICgxKSAqIDAuNSAqIChcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqIE1hdGguY29zKG4gLyBwYXJ0aWNsZS5zaGFwZS5uICogTWF0aC5QSSAqIDIgKyBULk1hdGguZGVnMnJhZCgxODAgKyAxODAgLyBwYXJ0aWNsZS5zaGFwZS5uKSkgKiB0bXAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XyAqICgoTWF0aC5jb3MoVC5NYXRoLmRlZzJyYWQoMTgwIC8gcGFydGljbGUuc2hhcGUubikpKSkgKiB0bXBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0gWFkgUm90YXRpb25cblxuICAgICAgICAgICAgICAgICAgICB2YXIgRGlzdERlZ18gPSBULk1hdGgueHkyZGlzdERlZyh4X18sIHlfXyk7Ly90b2RvIHJlZmFjdG9yIGFsbCBsaWtlIERpc3REZWcsIGV0Yy4uLlxuICAgICAgICAgICAgICAgICAgICBEaXN0RGVnXy5kZWcgKz0gcGFydGljbGUucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eV8gPSBULk1hdGguZGlzdERlZzJ4eShEaXN0RGVnXy5kaXN0LCBEaXN0RGVnXy5kZWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhfXyA9IHh5Xy54O1xuICAgICAgICAgICAgICAgICAgICB5X18gPSB4eV8ueTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9pbnRzLnB1c2goW3ggKyB4X18sIHkgKyB5X18sIHogKyB6X19dKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3IobiwxLHBhcnRpY2xlLnNoYXBlLm4sKG4rMStwYXJ0aWNsZS5zaGFwZS5uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5wb2x5Z29uc1swXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zWzFdLnB1c2gobiArIDEgKyBwYXJ0aWNsZS5zaGFwZS5uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucG9seWdvbnMyRFswXS5wdXNoKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zMkRbMV0ucHVzaChuICsgMSArIHBhcnRpY2xlLnNoYXBlLm4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnBvbHlnb25zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuICE9PSAwID8gbiA6IHBhcnRpY2xlLnNoYXBlLm4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gKyAxICsgcGFydGljbGUuc2hhcGUubixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiAhPT0gMCA/IG4gOiBwYXJ0aWNsZS5zaGFwZS5uKSArIHBhcnRpY2xlLnNoYXBlLm5cblxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqL1xuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcGFydGljbGUgc2hhcGUgJyArIHBhcnRpY2xlLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IDJEIGxpbmVzIGZyb20gcGFydGljbGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJhc2UgMD1ib3R0b20sIDE9dG9wXG4gICAgICogQHJldHVybiB7QXJyYXl9IDJEIGxpbmVzXG4gICAgICovXG4gICAgc3RhdGljIGdldDJEbGluZXMocGFydGljbGUsIGJhc2UpIHtcblxuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IHRoaXMuZ2V0M0QocGFydGljbGUpO1xuXG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xuXG4gICAgICAgIHZhciBwb2x5Z29uczJEID0gW3Jlc291cmNlLnBvbHlnb25zMkRbYmFzZV1dO1xuXG4gICAgICAgIGZvciAodmFyIHBuIGluIHBvbHlnb25zMkQpIHtcblxuICAgICAgICAgICAgLypsaW5lc1twbl09W107XG5cbiAgICAgICAgICAgICBmb3IodmFyIHB0IGluIHJlc291cmNlLnBvbHlnb25zW3BuXSkge1xuXG4gICAgICAgICAgICAgdmFyIHBvaW50ID0gcmVzb3VyY2UucG9pbnRzW3Jlc291cmNlLnBvbHlnb25zW3BuXVtwdF0gLSAxXTtcbiAgICAgICAgICAgICBsaW5lc1twbl1bcHNdID0gW3BvaW50WzBdLCBwb2ludFsxXV07XG5cbiAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgdmFyIHBvaW50MSwgcG9pbnQyO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gLTEsIGwgPSBwb2x5Z29uczJEW3BuXS5sZW5ndGg7IGkgPCBsIC0gMTsgaSsrKSB7XG5cblxuICAgICAgICAgICAgICAgIGlmIChpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50MSA9IGk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gbCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBwb2ludDIgPSBpICsgMTtcblxuXG4gICAgICAgICAgICAgICAgLy9yKHJlc291cmNlLnBvbHlnb25zW3BuXSxwb2ludDEpO1xuXG4gICAgICAgICAgICAgICAgcG9pbnQxID0gcmVzb3VyY2UucG9pbnRzW3BvbHlnb25zMkRbcG5dW3BvaW50MV0gLSAxXTtcbiAgICAgICAgICAgICAgICBwb2ludDIgPSByZXNvdXJjZS5wb2ludHNbcG9seWdvbnMyRFtwbl1bcG9pbnQyXSAtIDFdO1xuXG5cbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQxWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50MVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQyWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQyWzFdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vcihsaW5lcyk7XG5cbiAgICAgICAgcmV0dXJuIChsaW5lcyk7XG5cbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLy90b2RvIG1heWJlIHJlZmFjdG9yIG1vdmUgdG8gTWF0aFxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIDJEIGxpbmVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YXJyYXl9IGxpbmVzMVxuICAgICAqIEBwYXJhbSAoYXJyYXkpIGxpbmVzMlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaTEgaW4gbGluZXMxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpMiBpbiBsaW5lczIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChULk1hdGgubGluZUNvbGxpc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMVtpMV1bMV0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzMltpMl1bMV0ueVxuICAgICAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yKCdjb2xsaXNpb24yRCBpcyB0cnVlJywgcGFydGljbGUxLCBwYXJ0aWNsZTIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiAyIHBhcnRpY2xlc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUxIGJvdHRvbVxuICAgICAqIEBwYXJhbSAob2JqZWN0KSBwYXJ0aWNsZTIgdG9wXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY29sbGlzaW9uMkQocGFydGljbGUxLCBwYXJ0aWNsZTIpIHtcblxuXG4gICAgICAgIHZhciBsaW5lczEgPSBQYXJ0aWNsZXMuZ2V0MkRsaW5lcyhwYXJ0aWNsZTEsIDEpO1xuICAgICAgICB2YXIgbGluZXMyID0gUGFydGljbGVzLmdldDJEbGluZXMocGFydGljbGUyLCAwKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db3JuZXIgY29sbGlzaW9uXG5cblxuICAgICAgICB2YXIgY29sbGlzaW9uID0gUGFydGljbGVzLmNvbGxpc2lvbkxpbmVzRGV0ZWN0KGxpbmVzMSwgbGluZXMyKTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbm5lciBjb252ZXggY29sbGlzaW9uXG5cbiAgICAgICAgLyoqL1xuICAgICAgICBpZiAoIWNvbGxpc2lvbikge1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBrID0gMTAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIG91dGVyLCBpbm5lcjtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxpbmVzMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSAvKmRlZXBDb3B5Ki8obGluZXMxWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsaW5lczEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyID0gLypkZWVwQ29weSovKGxpbmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lcjIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGlubmVyKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJfdmVjdG9yX3ggPSBpbm5lclsxXS54IC0gaW5uZXJbMF0ueDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyX3ZlY3Rvcl95ID0gaW5uZXJbMV0ueSAtIGlubmVyWzBdLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIxWzBdLnggLT0gaW5uZXJfdmVjdG9yX3ggKiBrO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjFbMF0ueSAtPSBpbm5lcl92ZWN0b3JfeSAqIGs7XG5cblxuICAgICAgICAgICAgICAgICAgICBpbm5lcjJbMV0ueCArPSBpbm5lcl92ZWN0b3JfeCAqIGs7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyMlsxXS55ICs9IGlubmVyX3ZlY3Rvcl95ICogaztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlubmVyMSA9IFtpbm5lcjFdO1xuICAgICAgICAgICAgICAgICAgICBpbm5lcjIgPSBbaW5uZXIyXTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uMSA9IFBhcnRpY2xlcy5jb2xsaXNpb25MaW5lc0RldGVjdChpbm5lcjEsIG91dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbjIgPSBQYXJ0aWNsZXMuY29sbGlzaW9uTGluZXNEZXRlY3QoaW5uZXIyLCBvdXRlcik7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uMSAmJiBjb2xsaXNpb24yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGZhbHNlKTtcblxuICAgICAgICAgICAgfSgpO1xuXG5cbiAgICAgICAgfVxuICAgICAgICAvKiovXG5cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWJ1ZyBURERcbiAgICAgICAgLyoqdmFyIHNpemU9MTAwO1xuICAgICAgICAgdmFyIHNyYz1jcmVhdGVDYW52YXNWaWFGdW5jdGlvbkFuZENvbnZlcnRUb1NyYyhcbiAgICAgICAgIHNpemUqMixzaXplKjIsZnVuY3Rpb24oY3R4KXtcblxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVdpZHRoID0gMjtcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgICAgIHZhciBsaW5lc189W2xpbmVzMSxsaW5lczJdO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGxpbmVzXyl7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9IDAsbD1saW5lc19ba2V5XS5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyhsaW5lc19ba2V5XVtpXVswXS54K3NpemUsbGluZXNfW2tleV1baV1bMF0ueStzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhsaW5lc19ba2V5XVtpXVsxXS54K3NpemUsbGluZXNfW2tleV1baV1bMV0ueStzaXplKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgKTtcbiAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbWcgc3JjPVwiJytzcmMrJ1wiIGJvcmRlcj0nKyhjb2xsaXNpb24/MjowKSsnPicpOy8qKi9cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgcmV0dXJuIChjb2xsaXNpb24pO1xuXG4gICAgfVxuXG59OyIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQXJyYXlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5ULnNldE5hbWVzcGFjZSgnT2JqZWN0cycpO1xuXG5cblxuLy90b2RvIFQuT2JqZWN0cy5BcnJheSA9IGNsYXNzIGV4dGVuZHMgQXJyYXl7XG5cblxuXG5ULk9iamVjdHMuQXJyYXkgPSBjbGFzc3tcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmplY3RzXG4gICAgICogdG9kbyA/Pz8/Pz8/Pz8gQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2JqZWN0cyl7XG5cbiAgICAgICAgdGhpcy5vYmplY3RzID0gW107XG5cbiAgICAgICAgaWYob2JqZWN0cyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgb2JqZWN0cy5mb3JFYWNoKHRoaXMucHVzaCx0aGlzKTtcblxuICAgIH1cblxuXG4gICAgZ2V0QWxsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgfVxuXG5cblxuICAgIGZvckVhY2goKXtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5mb3JFYWNoLmFwcGx5KHRoaXMub2JqZWN0cyxhcmd1bWVudHMpO1xuICAgIH1cblxuXG4gICAgZmlsdGVyKGNhbGxiYWNrKXtcblxuICAgICAgICB2YXIgZmlsdGVyZWRfb2JqZWN0cz1uZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cbiAgICAgICAgLy9yKGZpbHRlcmVkX29iamVjdHMub2JqZWN0cyk7XG5cbiAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5vYmplY3RzID0gdGhpcy5vYmplY3RzLmZpbHRlcihjYWxsYmFjayk7XG5cbiAgICAgICAgcmV0dXJuKGZpbHRlcmVkX29iamVjdHMpO1xuXG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBpbml0SW5zdGFuY2Uob2JqZWN0KSB7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGlmIChvYmplY3QudHlwZSA9PSAnYnVpbGRpbmcnKSB7XG5cbiAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuQnVpbGRpbmcob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICd0ZXJyYWluJykge1xuXG4gICAgICAgICAgICBvYmplY3QgPSBuZXcgVC5PYmplY3RzLlRlcnJhaW4ob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG9iamVjdC50eXBlID09ICdzdG9yeScpIHtcblxuICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFQuT2JqZWN0cy5TdG9yeShvYmplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAob2JqZWN0LnR5cGUgPT0gJ25hdHVyYWwnKSB7XG5cbiAgICAgICAgICAgIG9iamVjdCA9IG5ldyBULk9iamVjdHMuTmF0dXJhbChvYmplY3QpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgcHV0IGl0ZW0gaW50byBUb3ducyBPYmplY3RzIEFycmF5IGJlY2F1c2Ugb2YgdW5yZWNvZ25pemVkIG9iamVjdCB0eXBlICcgKyBvYmplY3QudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgcmV0dXJuKG9iamVjdCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2ggbmV3IG9iamVjdCBpbnRvIE9iamVjdHMgQXJyYXlcbiAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBwdXNoKG9iamVjdCl7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMucHVzaChULk9iamVjdHMuQXJyYXkuaW5pdEluc3RhbmNlKG9iamVjdCkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG9yIHB1c2ggb2JqZWN0IGludG8gT2JqZWN0cyBBcnJheVxuICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgKi9cbiAgICB1cGRhdGUob2JqZWN0KXtcbiAgICAgICAgaWYoIXRoaXMuc2V0QnlJZChvYmplY3QuaWQsb2JqZWN0KSl7XG4gICAgICAgICAgICB0aGlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIGdldEJ5SWQoaWQpe1xuXG4gICAgICAgIGlmKHR5cGVvZiBpZCE9PSdzdHJpbmcnKXRocm93IG5ldyBFcnJvcignZ2V0QnlJZDogaWQgc2hvdWxkIGJlIHN0cmluZycpO1xuXG4gICAgICAgIGZvcih2YXIgaSBpbiB0aGlzLm9iamVjdHMpe1xuICAgICAgICAgICAgaWYodGhpcy5vYmplY3RzW2ldLmlkPT1pZClyZXR1cm4gdGhpcy5vYmplY3RzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzZXRCeUlkKGlkLG9iamVjdCl7XG5cbiAgICAgICAgaWYodHlwZW9mIGlkIT09J3N0cmluZycpdGhyb3cgbmV3IEVycm9yKCdzZXRCeUlkOiBpZCBzaG91bGQgYmUgc3RyaW5nJyk7XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMub2JqZWN0cyl7XG4gICAgICAgICAgICBpZih0aGlzLm9iamVjdHNbaV0uaWQ9PWlkKXtcblxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXT1ULk9iamVjdHMuQXJyYXkuaW5pdEluc3RhbmNlKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuKHRydWUpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVJZChpZCxvYmplY3Qpe1xuXG4gICAgICAgIGlmKHR5cGVvZiBpZCE9PSdzdHJpbmcnKXRocm93IG5ldyBFcnJvcigncmVtb3ZlSWQ6IGlkIHNob3VsZCBiZSBzdHJpbmcnKTtcblxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5vYmplY3RzKXtcbiAgICAgICAgICAgIGlmKHRoaXMub2JqZWN0c1tpXS5pZD09aWQpe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgIHJldHVybih0cnVlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXJUeXBlcygpe1xuXG4gICAgICAgIHZhciBmaWx0ZXJlZF9vYmplY3RzPW5ldyBULk9iamVjdHMuQXJyYXkoKTtcbiAgICAgICAgdmFyIHR5cGVzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG9iamVjdCl7XG5cbiAgICAgICAgICAgIGlmKHR5cGVzLmluZGV4T2Yob2JqZWN0LnR5cGUpPT0tMSlyZXR1cm47XG5cbiAgICAgICAgICAgIGZpbHRlcmVkX29iamVjdHMuZ2V0QWxsKCkucHVzaChvYmplY3QpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybihmaWx0ZXJlZF9vYmplY3RzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtULlBvc2l0aW9ufSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybnMge1QuT2JqZWN0cy5BcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXJSYWRpdXMoY2VudGVyLHJhZGl1cyl7XG5cbiAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHM9bmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuXG4gICAgICAgICAgICBpZihvYmplY3QuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShjZW50ZXIpPD1yYWRpdXMpe1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4oZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgfVxuXG5cblxuICAgIGZpbHRlckFyZWEoYXJlYTogQXJlYSl7XG5cbiAgICAgICAgdmFyIGZpbHRlcmVkX29iamVjdHM9bmV3IFQuT2JqZWN0cy5BcnJheSgpO1xuXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihvYmplY3Qpe1xuXG4gICAgICAgICAgICBpZihhcmVhLmlzQ29udGFpbmluZyhvYmplY3QuZ2V0UG9zaXRpb24oKSkpe1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRfb2JqZWN0cy5nZXRBbGwoKS5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4oZmlsdGVyZWRfb2JqZWN0cyk7XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1QuUG9zaXRpb259IGNlbnRlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0TWFwT2ZUZXJyYWluQ29kZXMoY2VudGVyLHJhZGl1cyl7Ly90b2RvIG1heWJlIHJlZmFjdG9yIHRvIGdldFRlcnJhaW5Db2RlczJEQXJyYXkgb3IgZ2V0VGVycmFpbkNvZGVzTWFwXG5cbiAgICAgICAgLyp2YXIgcmFkaXVzID0gc2l6ZS8yO1xuICAgICAgICAgdmFyIGNlbnRlciA9e1xuICAgICAgICAgeDogdG9wbGVmdC54K3JhZGl1cyxcbiAgICAgICAgIHk6IHRvcGxlZnQueStyYWRpdXNcbiAgICAgICAgIH07Ki9cbiAgICAgICAgdmFyIHgseTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ3JlYXRlIGVtcHR5IGFycmF5XG4gICAgICAgIHZhciBtYXBfYXJyYXk9W107XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCByYWRpdXMqMjsgeSsrKSB7XG4gICAgICAgICAgICBtYXBfYXJyYXlbeV09W107XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgcmFkaXVzKjI7IHgrKykge1xuICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XT1mYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRmlsbCBhcnJheVxuXG4gICAgICAgIHZhciB0ZXJyYWluX29iamVjdHNfcmF3ID0gdGhpcy5maWx0ZXJUeXBlcygndGVycmFpbicpLmdldEFsbCgpOy8vLnNsaWNlKCkucmV2ZXJzZSgpO1xuXG5cblxuICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICBmb3IodmFyIGk9MCxsPXRlcnJhaW5fb2JqZWN0c19yYXcubGVuZ3RoO2k8bDtpKyspe1xuICAgICAgICAgICAgb2JqZWN0PXRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgaWYob2JqZWN0LmRlc2lnbi5kYXRhLnNpemU9PTEpIHsvL3RvZG8gaXMgdGhpcyBvcHRpbWFsaXphdGlvbiBlZmZlY3RpdmU/XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iob2JqZWN0LnggLSBjZW50ZXIueCArIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3Iob2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgeT49MCAmJlxuICAgICAgICAgICAgICAgICAgICB4Pj0wICYmXG4gICAgICAgICAgICAgICAgICAgIHk8cmFkaXVzKjIgJiZcbiAgICAgICAgICAgICAgICAgICAgeDxyYWRpdXMqMlxuICAgICAgICAgICAgICAgICl7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFwX2FycmF5W3ldW3hdID0gb2JqZWN0LmdldENvZGUoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICB2YXIgeF9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueCAtIGNlbnRlci54ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgIHZhciB4X3RvID0gTWF0aC5jZWlsKG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgeV9mcm9tID0gTWF0aC5mbG9vcihvYmplY3QueSAtIGNlbnRlci55ICsgcmFkaXVzIC0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuICAgICAgICAgICAgICAgIHZhciB5X3RvID0gTWF0aC5jZWlsKG9iamVjdC55IC0gY2VudGVyLnkgKyByYWRpdXMgKyBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgIHZhciB4YyA9IG9iamVjdC54IC0gY2VudGVyLnggKyByYWRpdXM7XG4gICAgICAgICAgICAgICAgdmFyIHljID0gb2JqZWN0LnkgLSBjZW50ZXIueSArIHJhZGl1cztcblxuXG4gICAgICAgICAgICAgICAgZm9yICh5ID0geV9mcm9tOyB5IDw9IHlfdG87IHkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwX2FycmF5W3ldID09PSAndW5kZWZpbmVkJyljb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBfYXJyYXlbeV1beF0gPT09ICd1bmRlZmluZWQnKWNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULk1hdGgueHkyZGlzdCh4IC0geGMsIHkgLSB5YykgPD0gb2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcF9hcnJheVt5XVt4XSA9IG9iamVjdC5nZXRDb2RlKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIHJldHVybiBtYXBfYXJyYXk7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzLkFycmF5fVxuICAgICAqL1xuICAgIGdldDF4MVRlcnJhaW5PYmplY3RzKCl7XG5cblxuICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzXzF4MT1uZXcgVC5PYmplY3RzLkFycmF5KCk7XG5cblxuICAgICAgICB2YXIgdGVycmFpbl9vYmplY3RzX3JhdyA9IHRoaXMuZmlsdGVyVHlwZXMoJ3RlcnJhaW4nKS5nZXRBbGwoKS5zbGljZSgpLnJldmVyc2UoKTsvL25vcm1hbCBBcnJheVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1GaWxsIGFycmF5XG5cbiAgICAgICAgdmFyIGJsb2NrZWRfcG9zaXRpb25zPXt9O1xuICAgICAgICB2YXIgb2JqZWN0XzF4MSwga2V5O1xuXG5cblxuICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICBmb3IodmFyIGk9MCxsPXRlcnJhaW5fb2JqZWN0c19yYXcubGVuZ3RoO2k8bDtpKyspe1xuICAgICAgICAgICAgb2JqZWN0PXRlcnJhaW5fb2JqZWN0c19yYXdbaV07XG5cblxuICAgICAgICAgICAgaWYgKG9iamVjdC5kZXNpZ24uZGF0YS5zaXplID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgICAgICBvYmplY3RfMXgxID0gb2JqZWN0O1xuXG4gICAgICAgICAgICAgICAga2V5ID0gJ3gnICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLngpICsgJ3knICsgTWF0aC5yb3VuZChvYmplY3RfMXgxLnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja2VkX3Bvc2l0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAgICAgICAgIHZhciB4X2Zyb20gPSBNYXRoLmZsb29yKC1vYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHhfdG8gPSBNYXRoLmNlaWwob2JqZWN0LmRlc2lnbi5kYXRhLnNpemUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHlfZnJvbSA9IE1hdGguZmxvb3IoLW9iamVjdC5kZXNpZ24uZGF0YS5zaXplKTtcbiAgICAgICAgICAgICAgICB2YXIgeV90byA9IE1hdGguY2VpbChvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSk7XG5cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSB5X2Zyb207IHkgPD0geV90bzsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4X2Zyb207IHggPD0geF90bzsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChULk1hdGgueHkyZGlzdCh4LCB5KSA8PSBvYmplY3QuZGVzaWduLmRhdGEuc2l6ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MSA9IG9iamVjdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0XzF4MS5kZXNpZ24uZGF0YS5zaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnggPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueCt4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RfMXgxLnkgPSBNYXRoLnJvdW5kKG9iamVjdF8xeDEueSt5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9ICd4JyArIG9iamVjdF8xeDEueCArICd5JyArIG9iamVjdF8xeDEueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tlZF9wb3NpdGlvbnNba2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkX3Bvc2l0aW9uc1trZXldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJyYWluX29iamVjdHNfMXgxLnB1c2gob2JqZWN0XzF4MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIHJldHVybiB0ZXJyYWluX29iamVjdHNfMXgxO1xuXG5cbiAgICB9XG5cblxuXG5cbiAgICAvL3RvZG8ganNkb2NcbiAgICBnZXRUZXJyYWluT25Qb3NpdGlvbihwb3NpdGlvbil7XG5cblxuICAgICAgICBmb3IodmFyIGk9dGhpcy5vYmplY3RzLmxlbmd0aC0xO2k+PTA7aS0tKXtcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0udHlwZSAhPSAndGVycmFpbicpY29udGludWU7XG5cblxuICAgICAgICAgICAgaWYodGhpcy5vYmplY3RzW2ldLmRlc2lnbi5kYXRhLnNpemU8PXBvc2l0aW9uLmdldERpc3RhbmNlKG5ldyBULlBvc2l0aW9uKHRoaXMub2JqZWN0c1tpXS54LHRoaXMub2JqZWN0c1tpXS55KSkpe1xuICAgICAgICAgICAgICAgIHJldHVybih0aGlzLm9iamVjdHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKG51bGwpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLy90b2RvIGpzZG9jXG4gICAgZ2V0TmVhcmVzdFRlcnJhaW5Qb3NpdGlvbldpdGhDb2RlKHBvc2l0aW9uLHRlcnJhaW5fY29kZSl7XG5cbiAgICAgICAgdmFyIHRlcnJhaW5fb2JqZWN0c18xeDEgPSB0aGlzLmdldDF4MVRlcnJhaW5PYmplY3RzKCk7XG5cbiAgICAgICAgdmFyIG1pbl9kaXN0YW5jZT0tMTtcbiAgICAgICAgdmFyIG5lYXJlc3RfdGVycmFpbl8xeDE9ZmFsc2U7XG5cbiAgICAgICAgdGVycmFpbl9vYmplY3RzXzF4MS5mb3JFYWNoKGZ1bmN0aW9uKHRlcnJhaW5fMXgxKXtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGVycmFpbl8xeDEuZ2V0UG9zaXRpb24oKS5nZXREaXN0YW5jZShwb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGlmKG1pbl9kaXN0YW5jZT09PS0xIHx8IG1pbl9kaXN0YW5jZT5kaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlPWRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGVycmFpbl8xeDE9dGVycmFpbl8xeDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobmVhcmVzdF90ZXJyYWluXzF4MT09PWZhbHNlKXtcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHJldHVybiBuZWFyZXN0X3RlcnJhaW5fMXgxLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cblxuXG4gICAgLypcblxuICAgICBnZXRNYXBPZkNvbGxpc2lvbkNvZGVzKHJlYWxfb2JqZWN0cyxwb3NpdGlvbil7XG4gICAgIHJldHVybiBUZXJyYWluO1xuICAgICB9O1xuXG4gICAgICovXG5cbiAgICBcblxufTtcblxuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk9iamVjdFxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuT2JqZWN0cy5PYmplY3QgPSBjbGFzc3tcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3Qpe1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIG9iamVjdCl7XG5cbiAgICAgICAgICAgIHZhciB0aGlzX2tleSA9IGtleTtcblxuICAgICAgICAgICAgaWYodGhpc19rZXk9PSdfaWQnKXRoaXNfa2V5PSdpZCc7Ly90b2RvIG1heWJlIGJldHRlciBzb2x1dGlvblxuXG4gICAgICAgICAgICB0aGlzW3RoaXNfa2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvL3RvZG8ganNkb2NcbiAgICBnZXRQb3NpdGlvbigpe1xuICAgICAgICByZXR1cm4obmV3IFQuUG9zaXRpb24odGhpcy54LHRoaXMueSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNNb3ZpbmcoKXtcbiAgICAgICAgcmV0dXJuKGZhbHNlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpe1xuICAgICAgICByZXR1cm4oJ1snK3RoaXMubmFtZSsnXScpO1xuICAgIH1cblxufTtcbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuQnVpbGRpbmdcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULk9iamVjdHMuQnVpbGRpbmcgPSBjbGFzcyBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3R7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdCk7XG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICAgICAgfWVsc2V7XG5cblxuICAgICAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3NlcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnNfY2xhc3Nlcy5wdXNoKFQuV29ybGQuZ2FtZS5uZXdBY3Rpb25JbnN0YW5jZSh0aGlzLmFjdGlvbnNbaV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnNfY2xhc3NlcztcblxuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHIodGhpcy5wYXRoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aD1uZXcgVC5QYXRoKC4uLnRoaXMucGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgdmFyIGxpZmVfYWN0aW9uID0gdGhpcy5nZXRBY3Rpb24oJ2xpZmUnKTtcbiAgICAgICAgdmFyIG1heF9saWZlID0gVC5Xb3JsZC5nYW1lLmdldE9iamVjdE1heExpZmUodGhpcyk7XG5cblxuICAgICAgICBpZihsaWZlX2FjdGlvbj09PW51bGwpe1xuXG4gICAgICAgICAgICBsaWZlX2FjdGlvbj1ULldvcmxkLmdhbWUubmV3QWN0aW9uSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaWZlJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlmZTogbWF4X2xpZmUsXG4gICAgICAgICAgICAgICAgICAgIG1heF9saWZlOiBtYXhfbGlmZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2gobGlmZV9hY3Rpb24pO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBsaWZlX2FjdGlvbi5wYXJhbXMubWF4X2xpZmU9bWF4X2xpZmU7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAgICAgKiBAcmV0dXJucyB7VC5Qb3NpdGlvbn1cbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbihkYXRlKXtcblxuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnBhdGg9PT0ndW5kZWZpbmVkJyl7XG5cbiAgICAgICAgICAgIHJldHVybihuZXcgVC5Qb3NpdGlvbih0aGlzLngsdGhpcy55KSk7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGguY291bnRQb3NpdGlvbihkYXRlKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNNb3ZpbmcoZGF0ZSl7XG5cblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wYXRoPT09J3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICByZXR1cm4oZmFsc2UpO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmluUHJvZ3Jlc3MoZGF0ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7VC5PYmplY3RzfVxuICAgICAqL1xuICAgIGNsb25lKCl7Ly90b2RvIGFsbCBjbGFzc2VzIHNob3VsZCBoYXZlIHRoaXMgbWV0aG9kXG4gICAgICAgIHJldHVybihuZXcgVC5PYmplY3RzLkJ1aWxkaW5nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7VC5Nb2RlbH1cbiAgICAgKi9cbiAgICBnZXRNb2RlbCgpe1xuICAgICAgICBpZighKHRoaXMuZGVzaWduLmRhdGEgaW5zdGFuY2VvZiBULk1vZGVsKSl7XG4gICAgICAgICAgICB0aGlzLmRlc2lnbi5kYXRhPW5ldyBULk1vZGVsKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuKHRoaXMuZGVzaWduLmRhdGEpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhY3Rpb25fdHlwZVxuICAgICAqIEByZXR1cm5zIHtULkdhbWUuQWN0aW9uQWJpbGl0eX1cbiAgICAgKi9cbiAgICBnZXRBY3Rpb24oYWN0aW9uX3R5cGUpe1xuXG4gICAgICAgIGZvcih2YXIgaT0gMCxsPXRoaXMuYWN0aW9ucy5sZW5ndGg7aTxsO2krKyl7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aW9uc1tpXS50eXBlPT1hY3Rpb25fdHlwZSl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4odGhpcy5hY3Rpb25zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG5cblxuICAgIGNyZWF0ZUh0bWxQcm9maWxlKCl7XG5cbiAgICAgICAgdmFyIGFjdGlvbnNfcHJvZmlsZT0nJztcbiAgICAgICAgZm9yKHZhciBpPSAwLGw9dGhpcy5hY3Rpb25zLmxlbmd0aDtpPGw7aSsrKXtcbiAgICAgICAgICAgIGFjdGlvbnNfcHJvZmlsZSs9dGhpcy5hY3Rpb25zW2ldLmNyZWF0ZUh0bWxQcm9maWxlKCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgcmV0dXJuKGBcblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdC1idWlsZGluZy1wcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICA8aDI+YCt0aGlzLm5hbWUrYDwvaDI+XG4gICAgICAgICAgICAgICAgYCt0aGlzLmdldFBvc2l0aW9uKCkrYFxuXG5cbiAgICAgICAgICAgICAgICBgK2FjdGlvbnNfcHJvZmlsZStgXG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICBgKTtcblxuICAgIH1cbn07XG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY2xhc3MgVC5PYmplY3RzLk5hdHVyYWxcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5cblQuT2JqZWN0cy5OYXR1cmFsID0gY2xhc3MgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0e1xuXG4gICAgY2xvbmUoKXsvL3RvZG8gYWxsIGNsYXNzZXMgc2hvdWxkIGhhdmUgdGhpcyBtZXRob2RcbiAgICAgICAgcmV0dXJuKG5ldyBULk9iamVjdHMuTmF0dXJhbChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgIH1cblxuXG4gICAgZ2V0Q29kZSgpe1xuICAgICAgICByZXR1cm4odGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG4gICAgfVxuXG5cblxufTtcbiIsIlxuLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjbGFzcyBULk9iamVjdHMuU3RvcnlcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULk9iamVjdHMuU3RvcnkgPSBjbGFzcyBleHRlbmRzIFQuT2JqZWN0cy5PYmplY3R7XG5cbiAgICBjbG9uZSgpey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICByZXR1cm4obmV3IFQuT2JqZWN0cy5TdG9yeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSkpO1xuICAgIH1cblxuICAgIGdldE1hcmtkb3duKCl7XG4gICAgICAgIHJldHVybih0aGlzLmNvbnRlbnQuZGF0YSk7XG4gICAgfVxuXG5cblxuXG59O1xuIiwiXG4vKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNsYXNzIFQuT2JqZWN0cy5TdG9yeVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuT2JqZWN0cy5UZXJyYWluID0gY2xhc3MgZXh0ZW5kcyBULk9iamVjdHMuT2JqZWN0e1xuXG5cbiAgICBjbG9uZSgpey8vdG9kbyBhbGwgY2xhc3NlcyBzaG91bGQgaGF2ZSB0aGlzIG1ldGhvZFxuICAgICAgICByZXR1cm4obmV3IFQuT2JqZWN0cy5UZXJyYWluKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKSk7XG4gICAgfVxuXG5cbiAgICBnZXRDb2RlKHByZWZlcmVkX3dpZHRoKXtcblxuICAgICAgICByZXR1cm4odGhpcy5kZXNpZ24uZGF0YS5pbWFnZSk7XG5cbiAgICB9XG5cblxuICAgIGdldENvbG9yKCl7XG5cbiAgICAgICAgcmV0dXJuKHRoaXMuZGVzaWduLmRhdGEuY29sb3IpO1xuXG4gICAgfVxuXG5cblxuXG5cblxuICAgIC8vdG9kbyBnZXRJbWFnZSgpe31cblxuXG59O1xuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC50ZXJyYWluc1xuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblQuc2V0TmFtZXNwYWNlKCdXb3JsZCcpO1xuXG5cblxuVC5Xb3JsZC50ZXJyYWlucyA9IFtcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDAgLGNvbG9yOiAnIzAwMDAwMCcsIHNpemU6IDF9fSwgbmFtZTogJ3RlbW5vdGEnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxICxjb2xvcjogJyMzMzdFRkEnLCBzaXplOiAxfX0sIG5hbWU6ICdtb8WZZSd9KSxcbiAgICBuZXcgVC5PYmplY3RzLlRlcnJhaW4oe3R5cGU6J3RlcnJhaW4nLCBkZXNpZ246IHt0eXBlOid0ZXJyYWluJywgZGF0YTp7aW1hZ2U6IDIgLGNvbG9yOiAnIzU0NTQ1NCcsIHNpemU6IDF9fSwgbmFtZTogJ2RsYcW+YmEnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAzICxjb2xvcjogJyNFRkY3RkInLCBzaXplOiAxfX0sIG5hbWU6ICdzbsOtaC9sZWQnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA0ICxjb2xvcjogJyNGOUY5OEQnLCBzaXplOiAxfX0sIG5hbWU6ICdww61zZWsnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA1ICxjb2xvcjogJyM4Nzg3ODcnLCBzaXplOiAxfX0sIG5hbWU6ICdrYW1lbsOtJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNiAsY29sb3I6ICcjNUEyRjAwJywgc2l6ZTogMX19LCBuYW1lOiAnaGzDrW5hJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogNyAsY29sb3I6ICcjRUZGN0ZCJywgc2l6ZTogMX19LCBuYW1lOiAnc27DrWgvbGVkJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogOCAsY29sb3I6ICcjMkE3MzAyJywgc2l6ZTogMX19LCBuYW1lOiAndHLDoXZhKG5vcm1hbCknfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiA5ICxjb2xvcjogJyM1MUYzMTEnLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEodG94aWMpJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTAsY29sb3I6ICcjNTM1ODA1Jywgc2l6ZTogMX19LCBuYW1lOiAnbGVzJ30pLFxuICAgIG5ldyBULk9iamVjdHMuVGVycmFpbih7dHlwZTondGVycmFpbicsIGRlc2lnbjoge3R5cGU6J3RlcnJhaW4nLCBkYXRhOntpbWFnZTogMTEsY29sb3I6ICcjNmFhMmZmJywgc2l6ZTogMX19LCBuYW1lOiAnxZlla2EnfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMixjb2xvcjogJyM4QUJDMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEoamFybyknfSksXG4gICAgbmV3IFQuT2JqZWN0cy5UZXJyYWluKHt0eXBlOid0ZXJyYWluJywgZGVzaWduOiB7dHlwZTondGVycmFpbicsIGRhdGE6e2ltYWdlOiAxMyxjb2xvcjogJyM4QTkwMDInLCBzaXplOiAxfX0sIG5hbWU6ICd0csOhdmEocG96aW0pJ30pXG5dO1xuXG4iLCJcbi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgaW5zdGFuY2UgVC5Xb3JsZC5tYXBHZW5lcmF0b3JcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLm1hcEdlbmVyYXRvciA9IG5ldyBULk1hcEdlbmVyYXRvcihcblxuICAgIFQuTWF0aC5ibHVyWFkoZnVuY3Rpb24oeCx5KXtcblxuICAgICAgICAvL3RvZG8vL3ZhciBrZXk9J3gnK3grJ3knK3k7XG4gICAgICAgIC8vdG9kby8vaWYodHlwZW9mIHpfbWFwX2NhY2hlW2tleV0hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgLy90b2RvLy8gICAgcmV0dXJuKHpfbWFwX2NhY2hlW2tleV0pO1xuICAgICAgICAvL3RvZG8vL31cblxuXG4gICAgICAgIGNvbnN0IGRpdj0xMDA7XG5cblxuICAgICAgICB2YXIgbj0gMDtcbiAgICAgICAgdmFyIG1heF9wb3NzaWJsZV9uPTA7XG5cbiAgICAgICAgdmFyIF94LF95O1xuXG4gICAgICAgIHZhciBrPTAuNDtcbiAgICAgICAgdmFyIGtfPTEtaztcblxuICAgICAgICBmb3IodmFyIGk9IDA7aTwxMTtpKyspe1xuXG4gICAgICAgICAgICBuICs9IE1hdGgucm91bmQoTWF0aC5wb3coeCp5LTY2LCAyKSkgJSAoZGl2ICsgMSk7XG5cbiAgICAgICAgICAgIG1heF9wb3NzaWJsZV9uKz1kaXY7XG5cbiAgICAgICAgICAgIC8veD1NYXRoLmZsb29yKHgvMyk7XG4gICAgICAgICAgICAvL3k9TWF0aC5mbG9vcih5LzMpO1xuICAgICAgICAgICAgLy92YXIgeHkgPSBULk1hdGgueHlSb3RhdGUoeCx5LDU3KTtcbiAgICAgICAgICAgIC8veD14eS54O1xuICAgICAgICAgICAgLy95PXh5Lnk7XG5cbiAgICAgICAgICAgIF94PSgteSprKSsoeCprXyk7XG4gICAgICAgICAgICBfeT0oeCprKSsoeSprXyk7XG5cbiAgICAgICAgICAgIHg9TWF0aC5mbG9vcihfeC80KTtcbiAgICAgICAgICAgIHk9TWF0aC5mbG9vcihfeS80KTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBuPW4vbWF4X3Bvc3NpYmxlX247XG5cbiAgICAgICAgaWYobjwwKW4tPU1hdGguZmxvb3Iobik7XG4gICAgICAgIGlmKG4+MSluLT1NYXRoLmZsb29yKG4pO1xuXG4gICAgICAgIC8vdG9kby8vel9tYXBfY2FjaGVba2V5XT1uO1xuICAgICAgICByZXR1cm4obik7XG5cbiAgICB9LDIpXG4gICAgLFxuICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMSwwLjAwMDEsMC4wMDAxLDAuMDAwMiwwLjAwMDMsMC4wMDAzLDAuMDAwNSwwLjAwMDYsMC4wMDA3LDAuMDAwOSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMTIsMC4wMDE0LDAuMDAxNSwwLjAwMTYsMC4wMDIxLDAuMDAyNSwwLjAwMywwLjAwMzMsMC4wMDM0LDAuMDAzNywwLjAwMzgsMC4wMDQyLDAuMDA0NiwwLjAwNDksMC4wMDU3LDAuMDA2NSwwLjAwNjgsMC4wMDcyLDAuMDA3NCwwLjAwNzksMC4wMDg0LDAuMDA5LDAuMDA5NiwwLjAxMDUsMC4wMTE1LDAuMDEyMywwLjAxMzEsMC4wMTQyLDAuMDE0OCwwLjAxNTksMC4wMTY2LDAuMDE4NCwwLjAxOSwwLjAyMDQsMC4wMjEsMC4wMjIsMC4wMjMyLDAuMDI0NSwwLjAyNiwwLjAyNjYsMC4wMjc3LDAuMDI5LDAuMDI5NywwLjAzMSwwLjAzMTgsMC4wMzMxLDAuMDM0NiwwLjAzNjEsMC4wMzc4LDAuMDM4OSwwLjA0MDQsMC4wNDE0LDAuMDQzMSwwLjA0NTYsMC4wNDc1LDAuMDUwMSwwLjA1MTcsMC4wNTMzLDAuMDU0OCwwLjA1NjYsMC4wNTg5LDAuMDYwOSwwLjA2MjIsMC4wNjM1LDAuMDY1OCwwLjA2NzgsMC4wNjkyLDAuMDcxMiwwLjA3MzMsMC4wNzUxLDAuMDc3NCwwLjA3OSwwLjA4MTMsMC4wODM3LDAuMDg1OSwwLjA4OCwwLjA5MDIsMC4wOTI3LDAuMDk2MSwwLjA5ODgsMC4xMDAzLDAuMTAzMSwwLjEwNSwwLjEwNzEsMC4xMSwwLjExMTMsMC4xMTM3LDAuMTE2NSwwLjExODcsMC4xMjE4LDAuMTI0MywwLjEyNzcsMC4xMjk3LDAuMTMyMywwLjEzNTMsMC4xMzcxLDAuMTM5NSwwLjE0MjYsMC4xNDQ5LDAuMTQ3NCwwLjE1MDksMC4xNTM2LDAuMTU2LDAuMTU4MiwwLjE2MDUsMC4xNjMzLDAuMTY2MiwwLjE2OTIsMC4xNzI2LDAuMTc1NSwwLjE3ODEsMC4xODEzLDAuMTg0MiwwLjE4NjksMC4xODk5LDAuMTkzOSwwLjE5NzUsMC4yMDAxLDAuMjAyOSwwLjIwNywwLjIxMDgsMC4yMTM1LDAuMjE1OCwwLjIxODcsMC4yMjEsMC4yMjM4LDAuMjI2LDAuMjI4MywwLjIzMjYsMC4yMzYyLDAuMjM5NCwwLjI0MjcsMC4yNDU1LDAuMjQ4NSwwLjI1MDgsMC4yNTMyLDAuMjU2OCwwLjI1OTQsMC4yNjI4LDAuMjY1MSwwLjI2NzgsMC4yNzEyLDAuMjczOCwwLjI3NiwwLjI3OTIsMC4yODE5LDAuMjg1MiwwLjI4ODUsMC4yOTA4LDAuMjk0MywwLjI5NjksMC4yOTk0LDAuMzAxOSwwLjMwNDksMC4zMDc3LDAuMzEwOCwwLjMxMzUsMC4zMTYyLDAuMzE5NCwwLjMyMTYsMC4zMjQzLDAuMzI3NiwwLjMzMDcsMC4zMzM0LDAuMzM2LDAuMzM4NiwwLjM0MjEsMC4zNDQzLDAuMzQ2MiwwLjM0ODQsMC4zNTEsMC4zNTM1LDAuMzU2OSwwLjM1OTMsMC4zNjE4LDAuMzY0MiwwLjM2NTksMC4zNjgxLDAuMzcwNiwwLjM3MjIsMC4zNzQyLDAuMzc3MiwwLjM3OTQsMC4zODE2LDAuMzgzNywwLjM4NjUsMC4zODc5LDAuMzkwNywwLjM5MjUsMC4zOTQ3LDAuMzk2NywwLjM5ODUsMC4zOTk4LDAuNDAyMSwwLjQwMzUsMC40MDU0LDAuNDA2NywwLjQwODgsMC40MTA3LDAuNDEzMywwLjQxNDEsMC40MTYxLDAuNDE3NywwLjQxOTMsMC40MjA5LDAuNDIxOSwwLjQyMzQsMC40MjQ1LDAuNDI2NCwwLjQyODMsMC40MzAyLDAuNDMxOCwwLjQzMjcsMC40MzQ2LDAuNDM2MywwLjQzODEsMC40NCwwLjQ0MDksMC40NDM1LDAuNDQ1LDAuNDQ2MiwwLjQ0ODQsMC40NDkyLDAuNDUwNiwwLjQ1MTgsMC40NTMzLDAuNDU0OCwwLjQ1NTQsMC40NTYsMC40NTczLDAuNDU4OCwwLjQ2MDUsMC40NjE2LDAuNDYzLDAuNDYzOCwwLjQ2NTYsMC40NjYzLDAuNDY3MiwwLjQ2ODQsMC40Njk2LDAuNDcwOCwwLjQ3MjEsMC40NzMsMC40NzM3LDAuNDc0NywwLjQ3NTYsMC40NzY1LDAuNDc4MSwwLjQ3OTEsMC40ODAyLDAuNDgwOSwwLjQ4MTksMC40ODI0LDAuNDgzLDAuNDgzOCwwLjQ4NDcsMC40ODU5LDAuNDg2NSwwLjQ4NywwLjQ4NzUsMC40ODgzLDAuNDg5NCwwLjQ5MDEsMC40OTA3LDAuNDkxNSwwLjQ5MjksMC40OTM0LDAuNDk0LDAuNDk0OSwwLjQ5NTUsMC40OTYsMC40OTY3LDAuNDk3MSwwLjQ5NzUsMC40OTgxLDAuNDk5LDAuNDk5NywwLjUwMDUsMC41MDA4LDAuNTAxOCwwLjUwMjQsMC41MDMyLDAuNTAzOCwwLjUwNDIsMC41MDQ2LDAuNTA1LDAuNTA1OSwwLjUwNjcsMC41MDcsMC41MDc0LDAuNTA3NywwLjUwODQsMC41MDg2LDAuNTA5NSwwLjUxMDQsMC41MTA5LDAuNTExNywwLjUxMjIsMC41MTI5LDAuNTEzNiwwLjUxNCwwLjUxNDEsMC41MTQ1LDAuNTE1LDAuNTE1MywwLjUxNTcsMC41MTYyLDAuNTE2OSwwLjUxNzIsMC41MTc2LDAuNTE4LDAuNTE4NiwwLjUxOTMsMC41MTk3LDAuNTIwMiwwLjUyMDcsMC41MjA5LDAuNTIxNCwwLjUyMTgsMC41MjIzLDAuNTIzMSwwLjUyMzcsMC41MjQ0LDAuNTI0NiwwLjUyNDksMC41MjU5LDAuNTI2MSwwLjUyNjksMC41MjcyLDAuNTI3NSwwLjUyODEsMC41MjgzLDAuNTI4NSwwLjUyOTEsMC41MzAyLDAuNTMxLDAuNTMxNywwLjUzMiwwLjUzMjYsMC41MzM0LDAuNTMzNiwwLjUzNDEsMC41MzQzLDAuNTM0NSwwLjUzNDksMC41MzUzLDAuNTM1NywwLjUzNjQsMC41Mzc3LDAuNTM4MiwwLjUzODgsMC41MzkzLDAuNTM5OSwwLjU0MDMsMC41NDEyLDAuNTQxOSwwLjU0MywwLjU0MzcsMC41NDQ2LDAuNTQ1NywwLjU0NjYsMC41NDc2LDAuNTQ4MiwwLjU0ODYsMC41NDkxLDAuNTQ5NSwwLjU1MDMsMC41NTA2LDAuNTUxNSwwLjU1MjIsMC41NTI3LDAuNTU0LDAuNTU1LDAuNTU1MywwLjU1NTcsMC41NTYyLDAuNTU2OSwwLjU1NzgsMC41NTg2LDAuNTU5NSwwLjU2MDgsMC41NjE2LDAuNTYyNiwwLjU2MzQsMC41NjQ1LDAuNTY1MiwwLjU2NjcsMC41NjczLDAuNTY4MywwLjU2OTcsMC41NzA3LDAuNTcyMywwLjU3MzksMC41NzUsMC41NzU4LDAuNTc3MSwwLjU3NzksMC41NzkxLDAuNTgwMywwLjU4MTcsMC41ODMzLDAuNTg0OSwwLjU4NjUsMC41ODc2LDAuNTg4NCwwLjU4OTksMC41OTE5LDAuNTkyOSwwLjU5NDIsMC41OTU0LDAuNTk2OSwwLjU5ODcsMC41OTk4LDAuNjAxOCwwLjYwMzYsMC42MDUyLDAuNjA2MywwLjYwNzcsMC42MDk5LDAuNjExNiwwLjYxMzYsMC42MTU0LDAuNjE2NiwwLjYxODUsMC42MjAxLDAuNjIyMywwLjYyMzgsMC42MjU4LDAuNjI3OCwwLjYyOTUsMC42MzEsMC42MzI0LDAuNjM0NCwwLjYzNTgsMC42MzcyLDAuNjM5NSwwLjY0MTQsMC42NDM0LDAuNjQ1MSwwLjY0NzIsMC42NDkzLDAuNjUxMywwLjY1MzYsMC42NTU5LDAuNjU3OCwwLjY1OTgsMC42NjIyLDAuNjYzOCwwLjY2NywwLjY2OTYsMC42NzEsMC42NzQsMC42NzY1LDAuNjc5LDAuNjgxMSwwLjY4MzYsMC42ODYxLDAuNjg4NCwwLjY5MDMsMC42OTMzLDAuNjk0NiwwLjY5NzYsMC42OTk3LDAuNzAyNywwLjcwNDksMC43MDg0LDAuNzEwOSwwLjcxMjgsMC43MTY0LDAuNzE4OSwwLjcyMjIsMC43MjQ1LDAuNzI3MSwwLjczMDUsMC43MzI2LDAuNzM2NywwLjczOTgsMC43NDIxLDAuNzQ0MywwLjc0NjEsMC43NDgzLDAuNzUwNywwLjc1NCwwLjc1NjYsMC43NTg3LDAuNzYxNSwwLjc2MzksMC43NjYyLDAuNzY5MywwLjc3MjMsMC43NzUzLDAuNzc2OSwwLjc3OTcsMC43ODIyLDAuNzg0MywwLjc4NjksMC43ODkxLDAuNzkxOCwwLjc5NDQsMC43OTgyLDAuODAxLDAuODA0MSwwLjgwNjgsMC44MDk0LDAuODEyLDAuODE0OCwwLjgxNzQsMC44MiwwLjgyMTksMC44MjQsMC44MjU5LDAuODI4NywwLjgzMTEsMC44MzMzLDAuODM0OSwwLjgzNzQsMC44NDEsMC44NDMzLDAuODQ1NiwwLjg0ODEsMC44NTE4LDAuODU0LDAuODU2MiwwLjg1ODgsMC44NjIsMC44NjQsMC44NjY2LDAuODY5MywwLjg3MTksMC44NzM3LDAuODc0OSwwLjg3NzMsMC44NzkzLDAuODgxNiwwLjg4MzksMC44ODcsMC44ODg4LDAuODkwNSwwLjg5MjQsMC44OTQ4LDAuODk2NiwwLjg5ODYsMC45MDA5LDAuOTAyOSwwLjkwMzksMC45MDYzLDAuOTA4LDAuOTA5NSwwLjkxMSwwLjkxMjUsMC45MTUsMC45MTczLDAuOTE4NiwwLjkyMDksMC45MjI4LDAuOTI0OSwwLjkyNTksMC45MjcsMC45MjksMC45MzAzLDAuOTMyMiwwLjkzMzIsMC45MzQzLDAuOTM1NiwwLjkzNzIsMC45Mzg3LDAuOTQwNywwLjk0MjcsMC45NDQsMC45NDU5LDAuOTQ3MywwLjk0OSwwLjk1MDgsMC45NTIxLDAuOTUzMywwLjk1NTUsMC45NTY5LDAuOTU4LDAuOTU5MiwwLjk2MDYsMC45NjEyLDAuOTYxNywwLjk2MiwwLjk2MjcsMC45NjQyLDAuOTY0NiwwLjk2NTgsMC45NjcsMC45NjgsMC45Njg0LDAuOTY4OCwwLjk2OTgsMC45NzA2LDAuOTcxOSwwLjk3MjcsMC45NzQsMC45NzQ3LDAuOTc2MSwwLjk3NzQsMC45Nzg1LDAuOTc5MywwLjk4MDIsMC45ODExLDAuOTgxNywwLjk4MjMsMC45ODI4LDAuOTg0LDAuOTg0NiwwLjk4NTEsMC45ODU4LDAuOTg2MywwLjk4NjksMC45ODcsMC45ODc0LDAuOTg3OSwwLjk4ODYsMC45ODg4LDAuOTg5NSwwLjk5MDMsMC45OTA0LDAuOTkwNywwLjk5MTIsMC45OTEzLDAuOTkxNywwLjk5MiwwLjk5MjgsMC45OTI5LDAuOTkzNiwwLjk5MzksMC45OTQyLDAuOTk0NiwwLjk5NDksMC45OTU1LDAuOTk1NSwwLjk5NTksMC45OTYzLDAuOTk2NCwwLjk5NjYsMC45OTY2LDAuOTk2OCwwLjk5NjksMC45OTcxLDAuOTk3MywwLjk5NzgsMC45OTgxLDAuOTk4NSwwLjk5ODYsMC45OTg4LDAuOTk4OCwwLjk5ODksMC45OTg5LDAuOTk5LDAuOTk5LDAuOTk5LDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5MywwLjk5OTMsMC45OTkzLDAuOTk5NiwwLjk5OTYsMC45OTk3LDAuOTk5NywwLjk5OTcsMC45OTk4LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwwLjk5OTksMC45OTk5LDAuOTk5OSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXVxuICAgICxcblxuICAgIG5ldyBULk1hcEdlbmVyYXRvci5CaW90b3BlKFtcblxuICAgICAgICB7IGFtb3VudDogMTIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgMV19LC8vbW/FmWVcbiAgICAgICAgeyBhbW91bnQ6IDQwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMV19LC8vxZlla2FcbiAgICAgICAgeyBhbW91bnQ6IDMwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgIHsgYW1vdW50OiAyMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTJdfSwvL3Ryw6F2YSBqYXJvXG4gICAgICAgIHsgYW1vdW50OiA0MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDldfSwvL3Ryw6F2YSB0b3hpY1xuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgOF19LC8vdHLDoXZhIG5vcm1hbFxuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWzEwXX0sLy9sZXNcbiAgICAgICAgeyBhbW91bnQ6IDIwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sxMl19LC8vdHLDoXZhIGphcm9cbiAgICAgICAgeyBhbW91bnQ6IDUwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNF19LC8vcMOtc2VrXG4gICAgICAgIHsgYW1vdW50OiAxMCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTNdfSwvL3Ryw6F2YSBwb3ppbVxuICAgICAgICB7IGFtb3VudDogMjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA1XX0sLy9rYW1lbsOtXG4gICAgICAgIHsgYW1vdW50OiA2MCAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbIDNdfSwvL3Nuw61oL2xlZFxuICAgICAgICB7IGFtb3VudDogNSAsIHRlcnJhaW46IFQuV29ybGQudGVycmFpbnNbMTBdfSwvL2xlc1xuICAgICAgICB7IGFtb3VudDogNjAgLCB0ZXJyYWluOiBULldvcmxkLnRlcnJhaW5zWyA3XX0sLy9zbsOtaC9sZWRcbiAgICAgICAgeyBhbW91bnQ6IDEwICwgdGVycmFpbjogVC5Xb3JsZC50ZXJyYWluc1sgNV19LC8va2FtZW7DrVxuXG5cblxuICAgIF0pLFxuXG5cbiAgICBmdW5jdGlvbihvYmplY3QsdmlydHVhbF9vYmplY3RzKXtcblxuICAgICAgICBpZihvYmplY3QudHlwZSE9J3RlcnJhaW4nKXJldHVybjtcblxuICAgICAgICAvKmlmKG9iamVjdC5nZXRDb2RlKCk9PTUpe1xuICAgICAgICAgICAgdmlydHVhbF9vYmplY3RzLnB1c2goXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIHg6IG9iamVjdC54LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICB5OiBvYmplY3QueSwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICBkZXNpZ246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICduYXR1cmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOidyb2NrJytNYXRoLmZsb29yKFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqNiklNisnZGFyaycrTWF0aC5mbG9vcihULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDIse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjQpJTQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMC41K1QuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNSx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG5cbiAgICAgICAgfWVsc2UqL1xuICAgICAgICBpZihvYmplY3QuZ2V0Q29kZSgpPT0xMCl7XG5cbiAgICAgICAgICAgIGlmKFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oMyx7eDpvYmplY3QueCx5Om9iamVjdC55fSk+MC45NSl7XG5cbiAgICAgICAgICAgICAgICB2aXJ0dWFsX29iamVjdHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBvYmplY3QueCwvL3RvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IG9iamVjdC55LC8vdG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ25hdHVyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDondHJlZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDMrVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig2LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBULk1hdGgucmFuZG9tU2VlZFBvc2l0aW9uKDcse3g6b2JqZWN0LngseTpvYmplY3QueX0pKjIwLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogVC5NYXRoLnJhbmRvbVNlZWRQb3NpdGlvbig3LHt4Om9iamVjdC54LHk6b2JqZWN0Lnl9KSoyMC0xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IFQuTWF0aC5yYW5kb21TZWVkUG9zaXRpb24oNyx7eDpvYmplY3QueCx5Om9iamVjdC55fSkqMzYwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbik7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUgPSBuZXcgVC5HYW1lKFxuICAgIFQuTWF0aC5wcmV0dHlOdW1iZXIsXG4gICAgVC5NYXRoLnByZXR0eU51bWJlclxuKTsiLCJcblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgZGlzdGFuY2U6ICAgMCxcbiAgICAgICAgc3RyZW5ndGg6ICAgMCxcbiAgICAgICAgcm91bmRzOiAgICAgMSxcbiAgICAgICAgY29vbGRvd246ICAgMVxuICAgIH0sXG4gICAgY2xhc3MgZXh0ZW5kcyBULkdhbWUuQWN0aW9ue1xuXG5cbiAgICAgICAgc3RhdGljIGdldFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybignYXR0YWNrJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvdW50UHJpY2VCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4oKE1hdGgucG93KHRoaXMucGFyYW1zLmRpc3RhbmNlLDIpKnRoaXMucGFyYW1zLnN0cmVuZ3RoKnRoaXMucGFyYW1zLnJvdW5kcyooMS90aGlzLnBhcmFtcy5jb29sZG93bikpKjEwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICAyfSksXG4gICAgICAgICAgICAgICAgLy9uZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAwfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgM30pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDJ9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBleGVjdXRlKGdhbWUsYXR0YWNrZXIsYXR0YWNrZWQscmVzb3VyY2VzX2F0dGFja2VyKXtcblxuICAgICAgICAgICAgdmFyIGF0dGFja2VyX2F0dGFjayA9IGF0dGFja2VyLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZXJfZGVmZW5jZSA9IGF0dGFja2VyLmdldEFjdGlvbignZGVmZW5jZScpO1xuICAgICAgICAgICAgdmFyIGF0dGFja2VkX2F0dGFjayA9IGF0dGFja2VkLmdldEFjdGlvbignYXR0YWNrJyk7XG4gICAgICAgICAgICB2YXIgYXR0YWNrZWRfZGVmZW5jZSA9IGF0dGFja2VkLmdldEFjdGlvbignZGVmZW5jZScpO1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXJfbGlmZSA9IGF0dGFja2VyLmdldEFjdGlvbignbGlmZScpLnBhcmFtcztcbiAgICAgICAgICAgIHZhciBhdHRhY2tlZF9saWZlID0gYXR0YWNrZWQuZ2V0QWN0aW9uKCdsaWZlJykucGFyYW1zO1xuXG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1NaXNzaW5nIGFjdGlvblxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjaz1hdHRhY2tlcl9hdHRhY2suY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFja2VyIGhhcyBub3QgYWJpbGl0eSB0byBhdHRhY2snKTtcbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VyX2RlZmVuY2UgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlPWF0dGFja2VyX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2F0dGFjayBpbnN0YW5jZW9mIFQuR2FtZS5BY3Rpb24pe1xuICAgICAgICAgICAgICAgIGF0dGFja2VkX2F0dGFjaz1hdHRhY2tlZF9hdHRhY2suY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2sgPSBnYW1lLmdldEFjdGlvbkVtcHR5SW5zdGFuY2UoJ2F0dGFjaycpLnBhcmFtcztcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2RlZmVuY2UgaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlPWF0dGFja2VkX2RlZmVuY2UuY2xvbmUoKS5wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZF9kZWZlbmNlID0gZ2FtZS5nZXRBY3Rpb25FbXB0eUluc3RhbmNlKCdkZWZlbmNlJykucGFyYW1zO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tRGlzdGFuY2VcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGF0dGFja2VyLmdldFBvc2l0aW9uKCkuZ2V0RGlzdGFuY2UoYXR0YWNrZWQuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICBpZihkaXN0YW5jZT5hdHRhY2tlcl9hdHRhY2suZGlzdGFuY2Upe1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3RzIGFyZSB0b28gZmFyIC0gJytkaXN0YW5jZSsnIGZpZWxkcy4gQXR0YWNrIGRpc3RhbmNlIGlzIG9ubHkgJythdHRhY2tlcl9hdHRhY2suZGlzdGFuY2UrJyBmaWVsZHMuJyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLUNvb2xkb3duXG4gICAgICAgICAgICBpZighYXR0YWNrZXIuZ2V0QWN0aW9uKCdhdHRhY2snKS5jYW5CZUV4ZWN1dGVkTm93KCkpe1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGFjdGlvbiBjYW4gYmUgZXhlY3V0ZWQgaW4gJythdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLmNhbkJlRXhlY3V0ZWRJbigpKycgc2Vjb25kcy4nKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tU2V0IHVzYWdlXG4gICAgICAgICAgICBhdHRhY2tlci5nZXRBY3Rpb24oJ2F0dGFjaycpLm5vd0V4ZWN1dGVkKCk7XG5cblxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1EZWZlbmNlXG5cbiAgICAgICAgICAgIC8vcignYXR0YWNrJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgIC8vcignZGVmZW5jZScsYXR0YWNrZXJfZGVmZW5jZS5kZWZlbmNlLGF0dGFja2VkX2RlZmVuY2UuZGVmZW5jZSk7XG5cbiAgICAgICAgICAgIGF0dGFja2VyX2F0dGFjay5zdHJlbmd0aC09XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfZGVmZW5jZS5kZWZlbmNlO1xuICAgICAgICAgICAgaWYoYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoPDApYXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoPTA7XG5cblxuXG4gICAgICAgICAgICBhdHRhY2tlZF9hdHRhY2suc3RyZW5ndGgtPVxuICAgICAgICAgICAgICAgIGF0dGFja2VyX2RlZmVuY2UuZGVmZW5jZTtcbiAgICAgICAgICAgIGlmKGF0dGFja2VkX2F0dGFjay5zdHJlbmd0aDwwKWF0dGFja2VkX2F0dGFjay5zdHJlbmd0aD0wO1xuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vYXR0YWNrZXJfbGlmZS5saWZlPTEwMDA7XG4gICAgICAgICAgICAvL2F0dGFja2VkX2xpZmUubGlmZT0xMDAwO1xuXG5cbiAgICAgICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgICAgICAgICAoYXR0YWNrZXJfYXR0YWNrLnJvdW5kcyB8fCBhdHRhY2tlZF9hdHRhY2sucm91bmRzKSAmJlxuICAgICAgICAgICAgICAgICAgICAoYXR0YWNrZXJfbGlmZS5saWZlPjEgJiYgYXR0YWNrZWRfbGlmZS5saWZlPjEpXG4gICAgICAgICAgICAgICAgKXtcblxuICAgICAgICAgICAgICAgIHIoJ3JvdW5kJyxhdHRhY2tlcl9hdHRhY2suc3RyZW5ndGgsYXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoKTtcbiAgICAgICAgICAgICAgICByKCdsaWZlJyxhdHRhY2tlZF9saWZlLmxpZmUsYXR0YWNrZXJfbGlmZS5saWZlKTtcblxuICAgICAgICAgICAgICAgIGF0dGFja2VkX2xpZmUubGlmZS09YXR0YWNrZXJfYXR0YWNrLnN0cmVuZ3RoO1xuICAgICAgICAgICAgICAgIGF0dGFja2VyX2xpZmUubGlmZS09YXR0YWNrZWRfYXR0YWNrLnN0cmVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICBhdHRhY2tlcl9hdHRhY2sucm91bmRzLS07XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRfYXR0YWNrLnJvdW5kcy0tO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgICAgICAgICAgaWYoYXR0YWNrZXJfbGlmZS5saWZlPDEpYXR0YWNrZXJfbGlmZS5saWZlPTE7XG4gICAgICAgICAgICBpZihhdHRhY2tlZF9saWZlLmxpZmU8MSlhdHRhY2tlZF9saWZlLmxpZmU9MTtcblxuXG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cbik7XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBkZWZlbmNlOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2RlZmVuY2UnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigodGhpcy5wYXJhbXMuZGVmZW5jZSkqODAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMX0pLFxuICAgICAgICAgICAgICAgIC8vbmV3IFQuUmVzb3VyY2VzKHsnaXJvbic6ICAgMH0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgfVxuKTtcblxuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICBsaWZlOiAgIDEsXG4gICAgICAgIG1heF9saWZlOiAgIDFcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ2xpZmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtuZXcgVC5SZXNvdXJjZXMoKV0pO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxuKTtcblxuXG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHdvb2Q6ICAgMCxcbiAgICAgICAgaXJvbjogICAwLFxuICAgICAgICBjbGF5OiAgIDAsXG4gICAgICAgIHN0b25lOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ21pbmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigodGhpcy5wYXJhbXMuYW1vdW50KSozNjAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDR9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gb3IgbWF5YmUgZXhlY3V0ZVxuICAgICAgICB9Ki9cblxuXG5cblxuICAgIH1cbik7XG5cblxuIiwiLyoqXG4gKiBAYXV0aG9yIMKpVG93bnMuY3pcbiAqIEBmaWxlT3ZlcnZpZXcgQ3JlYXRlcyBjb25maWd1cmF0aW9uIG9mIGdhbWUgY29uZGl0aW9ucyB2aWEgaW5zdGFuY2UgVC5Xb3JsZC5nYW1lXG4gKi9cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblxuVC5Xb3JsZC5nYW1lLmluc3RhbGxBY3Rpb25DbGFzcyhcbiAgICB7XG4gICAgICAgIHNwZWVkOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ21vdmUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoTWF0aC5wb3codGhpcy5wYXJhbXMuc3BlZWQsMikpKjEwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J2NsYXknOiAgIDB9KSxcbiAgICAgICAgICAgICAgICAvL25ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDB9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICAxfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgZXhlY3V0ZShnYW1lLG9iamVjdCxkZXN0aW5hdGlvbnMvKixvYmplY3RzX25lYXJieSxyZXNvdXJjZXMqLyl7XG5cbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hlY2tpbmcgYWN0aW9uLy90b2RvIG1heWJlIGF1dG9cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJyk7XG4gICAgICAgICAgICBpZihhY3Rpb24gaW5zdGFuY2VvZiBULkdhbWUuQWN0aW9uKXt9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCBoYXMgbm90IGFiaWxpdHkgdG8gbW92ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICAgICAgICB2YXIgc3RhcnRfcG9zaXRpb249b2JqZWN0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbnMudW5zaGlmdChzdGFydF9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIC8vcihkZXN0aW5hdGlvbnMpO1xuXG4gICAgICAgICAgICBvYmplY3QucGF0aCA9IFQuUGF0aC5uZXdDb25zdGFudFNwZWVkKGRlc3RpbmF0aW9ucyxhY3Rpb24ucGFyYW1zLnNwZWVkKTtcblxuXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVNldCB1c2FnZS8vdG9kbyBtYXliZSBhdXRvXG4gICAgICAgICAgICBvYmplY3QuZ2V0QWN0aW9uKCdtb3ZlJykubm93RXhlY3V0ZWQoKTsvL3RvZG8gaXMgaXQgbmVlZGVkXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIHRpY2soKXsvL3RvZG8gbWF5YmUgPz8/IHRvZG9cbiAgICAgICAgfSovXG5cblxuICAgIH1cbik7XG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICByZWdlbmVyYXRlOiAgIDEwMCxcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3JlZ2VuZXJhdGUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoMS90aGlzLnBhcmFtcy5yZWdlbmVyYXRlKSozNjAwKjAuMDUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDR9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAyfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDJ9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qc3RhdGljIGV4ZWN1dGUoKXsvL3RvZG8gbWF5YmUgdGljaz8/Pz9cbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG4iLCIvKipcbiAqIEBhdXRob3IgwqlUb3ducy5jelxuICogQGZpbGVPdmVydmlldyBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gb2YgZ2FtZSBjb25kaXRpb25zIHZpYSBpbnN0YW5jZSBULldvcmxkLmdhbWVcbiAqL1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG5ULldvcmxkLmdhbWUuaW5zdGFsbEFjdGlvbkNsYXNzKFxuICAgIHtcbiAgICAgICAgcmVwYWlyOiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3JlcGFpcicpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb3VudFByaWNlQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuKCgxLyh0aGlzLnBhcmFtcy5yZXBhaXIvMTAwKSkqMTAwMCowLjA1KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0UHJpY2VSZXNvdXJjZXMoKXtcblxuICAgICAgICAgICAgcmV0dXJuKFtcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeyd3b29kJzogICA0fSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnY2xheSc6ICAgMn0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3N0b25lJzogIDN9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydpcm9uJzogICA0fSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKnN0YXRpYyBleGVjdXRlKCl7XG4gICAgICAgICAgICAvL3RvZG9cbiAgICAgICAgfSovXG5cblxuXG5cbiAgICB9XG4pO1xuXG5cbiIsIi8qKlxuICogQGF1dGhvciDCqVRvd25zLmN6XG4gKiBAZmlsZU92ZXJ2aWV3IENyZWF0ZXMgY29uZmlndXJhdGlvbiBvZiBnYW1lIGNvbmRpdGlvbnMgdmlhIGluc3RhbmNlIFQuV29ybGQuZ2FtZVxuICovXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG5cblQuV29ybGQuZ2FtZS5pbnN0YWxsQWN0aW9uQ2xhc3MoXG4gICAge1xuICAgICAgICB0aHJvdWdocHV0OiAgIDBcbiAgICB9LFxuICAgIGNsYXNzIGV4dGVuZHMgVC5HYW1lLkFjdGlvbntcblxuXG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4oJ3Rocm91Z2hwdXQnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY291bnRQcmljZUJhc2UoKXtcbiAgICAgICAgICAgIHJldHVybigoTWF0aC5wb3codGhpcy5wYXJhbXMudGhyb3VnaHB1dC8xMDAsMikpKjEwKjAuMDUpOy8vdG9kb1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRQcmljZVJlc291cmNlcygpe1xuXG4gICAgICAgICAgICByZXR1cm4oW1xuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J3dvb2QnOiAgIDJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgVC5SZXNvdXJjZXMoeydjbGF5JzogICAzfSksXG4gICAgICAgICAgICAgICAgbmV3IFQuUmVzb3VyY2VzKHsnc3RvbmUnOiAgMX0pLFxuICAgICAgICAgICAgICAgIG5ldyBULlJlc291cmNlcyh7J2lyb24nOiAgIDB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuKTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
