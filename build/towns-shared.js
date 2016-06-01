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
    function class_5(max_life_modifier, price_key_modifier) {
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
    class_5.prototype.getObjectPriceBases = function (object) {
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
    class_5.prototype.getObjectMaxLife = function (object) {
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
    class_5.prototype.getObjectPrices = function (object) {
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
    class_5.prototype.getObjectPrice = function (object) {
        var price = new T.Resources({});
        //console.log('empty price',price);
        var prices = this.getObjectPrices(object);
        prices.forEach(function (price_) {
            price.add(price_);
        });
        price.apply(this.price_key_modifier);
        return (price);
    };
    class_5.prototype.installActionClass = function (action_empty_instance_params, action_class) {
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
    class_5.prototype.getActionClass = function (action_type) {
        var action_class = this.action_classes[action_type];
        if (typeof action_class == 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type + '. There are only these action types: ' + T.ArrayFunctions.getKeys(this.action_classes).join(', '));
        }
        return (action_class);
    };
    class_5.prototype.newActionInstance = function (action) {
        //todo solve defense vs. defence
        if (action.type === 'defense') {
            action.type = 'defence';
            action.params.defence = action.params.defense;
            delete action.params.defense;
        }
        var action_class = this.getActionClass(action.type);
        return new action_class(action);
    };
    class_5.prototype.createActionExecute = function (action_type) {
        var game = this;
        var action_class = this.getActionClass(action_type);
        var execute = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(game);
            return action_class.execute.apply(this, args);
        };
        return (execute);
    };
    class_5.prototype.getActionEmptyInstance = function (action_type) {
        var action_instance = this.action_empty_instances[action_type];
        if (typeof action_instance === 'undefined') {
            throw new Error('In this game instance thare is no action class type ' + action_type);
        }
        return (action_instance);
    };
    return class_5;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================
T.Game.Action = (function () {
    function class_6(action) {
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
    class_6.prototype.countPriceBase = function () {
        return (0);
    };
    class_6.prototype.getPriceResources = function () {
        return ([]);
    };
    class_6.execute = function () {
        throw new Error('You can not execute passive action.');
    };
    /**
     * In how many seconds can be this action instance executed?
     * @returns {number}
     */
    class_6.prototype.canBeExecutedIn = function () {
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
    class_6.prototype.canBeExecutedNow = function () {
        return (this.canBeExecutedIn() === 0);
    };
    /**
     * Set actual date as date of execution this action instance
     */
    class_6.prototype.nowExecuted = function () {
        this.last_use = new Date();
    };
    /**
     * Creates html profile of action ability
     * @returns {string}
     */
    class_6.prototype.createHtmlProfile = function () {
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
    return class_6;
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
    function class_7(r, g, b, a) {
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
    class_7.prototype.bounds = function () {
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
    class_7.prototype.getCssColor = function () {
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
    class_7.prototype.getHex = function () {
        this.bounds();
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    };
    /**
     * Creates new T.Color form hex code of color
     * @param {string} hex code of color eg. #00ff00
     * @returns {T.Color} Color
     */
    class_7.createFromHex = function (hex) {
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
    return class_7;
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
    function class_8() {
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
    class_8.prototype.toJSON = function () {
        return (this.array_position_date);
    };
    /**
     *
     * @param {Array.<T.Position>} array_position
     * @param {number} speed
     * @param {Date} date
     * @returns {T.Path}
     */
    class_8.newConstantSpeed = function (array_position, speed, date) {
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
    class_8.prototype.countSegment = function (date) {
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
    class_8.prototype.countPosition = function (date) {
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
    class_8.prototype.countRotation = function (date) {
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
    class_8.prototype.countSpeed = function (date) {
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
    class_8.prototype.inProgress = function (date) {
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
    class_8.prototype.toString = function () {
        return this.array_position_date.join(', ');
    };
    return class_8;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Position3D
 */
//======================================================================================================================
T.Position3D = (function () {
    function class_9(x, y, z) {
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
    class_9.prototype.clone = function () {
        return new T.Position3D(this);
    };
    /**
     * Converts Position3D to simple string
     * @return {string}
     */
    class_9.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + ',' + this.z + ']';
    };
    return class_9;
}());
/**
 * @author ©Towns.cz
 * @fileOverview Creates class PositionPolar
 */
//======================================================================================================================
T.PositionPolar = (function () {
    function class_10(distance, degrees) {
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
    class_10.prototype.clone = function () {
        return new T.PositionPolar(this);
    };
    class_10.prototype.getPosition = function () {
        var radians = this.getRadians();
        return (new T.Position(Math.cos(radians) * this.distance, Math.sin(radians) * this.distance));
    };
    class_10.prototype.getDistance = function () {
        return this.distance;
    };
    class_10.prototype.getDegrees = function () {
        return (this.degrees + 360) % 360;
    };
    class_10.prototype.getRadians = function () {
        return T.Math.deg2rad(this.degrees);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_10.prototype.toString = function () {
        return '' + this.distance + ',' + this.degrees + '°';
    };
    return class_10;
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
    function class_11(x, y) {
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
    class_11.prototype.clone = function () {
        return new T.Position(this);
    };
    class_11.prototype.plus = function (position) {
        this.x += position.x;
        this.y += position.y;
        return this;
    };
    class_11.prototype.multiply = function (k) {
        this.x = this.x * k;
        this.y = this.y * k;
        return this;
    };
    class_11.prototype.getPositionPolar = function () {
        return (new T.PositionPolar(T.Math.xy2dist(this.x, this.y), T.Math.rad2deg(Math.atan2(this.y, this.x))));
    };
    class_11.prototype.getDistance = function (position) {
        return T.Math.xy2dist(position.x - this.x, position.y - this.y);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_11.prototype.toString = function () {
        return '' + this.x + ',' + this.y + '';
    };
    return class_11;
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
    __extends(class_12, _super);
    function class_12(x, y, date) {
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
    class_12.prototype.clone = function () {
        return new T.PositionDate(this);
    };
    /**
     * Return only position
     * @returns {T.Position}
     */
    class_12.prototype.getPosition = function () {
        return new T.Position(this.x, this.y);
    };
    /**
     * Converts Position to simple string
     * @return {string}
     */
    class_12.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + '] at ' +
            (this.date.getDay() + 1) + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear() +
            ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
    };
    return class_12;
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
            var c = T.Math.xy2dist(positions[0].getDistance(positions[1]));
            var a = T.Math.xy2dist(positions[1].getDistance(positions[2]));
            var b = T.Math.xy2dist(positions[0].getDistance(positions[2]));
            r(a, b, c);
            if (a + b > c && b + c > a && a + c > b) { }
            else {
                throw new Error('First three points are in line.');
            }
        }
        Area.prototype.isContaining = function (position) {
            var vs = [];
            for (var i = 0; i < this.positions.length; i++) {
                vs.push([
                    this.positions[i].x,
                    this.positions[i].y
                ]);
            }
            var x = position.x, y = position.y;
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0], yi = vs[i][1];
                var xj = vs[j][0], yj = vs[j][1];
                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        return Area;
    }());
    T.Area = Area;
})(T || (T = {}));
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

//# sourceMappingURL=ts/towns-shared.js.map
