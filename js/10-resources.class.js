/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================




T.Resources = class{

    /**
     * @param {object} Resources
     * @constructor
     */
    constructor(resources)
    {

        for (var key in resources) {
            if (typeof resources[key] == 'number') {
                this[key] = Math.ceil(resources[key]);
            }
        }

    }


    /**
     * @static
     * @return {array} new Resources
     */
    static newSingles(resources){

        var resources_array = [];

        for (var key in resources) {
            if (typeof resources[key] == 'number') {
                if (resources[key] > 0) {

                    var resources_ = {};
                    resources_[key] = resources[key];

                    resources_array.push(new T.Resources(resources_));

                }
            }
        }

        return resources_array;

    }


    /**
     * Return deep clone of this.
     * @returns {T.Resources}
     */
    clone(){
        return new T.Resources(this);
    }



    /**
     * Checks whether this contains a given resources
     * @param {object} Resources
     * @return {bool} contains
     */
    contains(resources){

        for (var key in resources) {

            if (typeof this[key] == 'number') {
                return false;
            }

            if (this[key] < resources[key]) {
                return false;
            }
        }

        return true;

    }



    /**
     * Add given resources
     * @param {object} Resources
     * @return {bool} success
     */
    add(resources){

        for (var key in resources) {

            if (typeof this[key] == 'undefined') {
                this[key] = 0;
            }

            if (typeof this[key] == 'number') {
                this[key] += resources[key];
            }

        }

        return this;

    }



    /**
     * @param {number} k
     * @return this
     */
    multiply(k){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                this[key] = Math.ceil(this[key] * k);
            }


        }

        return this;

    }



    /**
     * @param {number} k
     * @return this
     */
    signum(k){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] > 0) {

                    this[key] = 1;

                } else {

                    this[key] = 0;

                }

            }


        }

        return this;

    }



    /**
     * @param {function} modifier
     * @return this
     */
    apply(modifier){

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                this[key] = modifier(this[key]);
            }

        }

        return this;

    }



    /**
     *
     * @return {Array} all resources keys
     */
    extractKeys(){

        var keys = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution
                keys.push(key);
            }


        }

        return (keys);

    }



    /**
     *
     * @param {object} Resoures
     * @return {number} Distance between this and given Resources
     */
    compare(resoures){

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


            if (typeof val_A == 'undefined')val_A = 0;
            if (typeof val_B == 'undefined')val_B = 0;

            distance += Math.pow(val_A - val_B, 2);

        }

        distance = Math.sqrt(distance);


        return (distance);

    }



    /**
     * Remove given resources
     * @param {object} Resources
     * @return {bool} success
     */
    remove(resources){

        if (!this.contains(resources))return false;

        for (var key in resources) {

            this[key] -= resources[key];

        }

        return true;

    }



    /**
     * Converts Resources to simple string
     * @return {string}
     */
    toString(){

        var strings = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] !== 0) {
                    strings.push(this[key] + ' ' + key);
                }

            }

        }

        return strings.join(', ');

    }



    toHTML(){//todo put url prefix into params

        var strings = [];

        for (var key in this) {

            if (typeof this[key] == 'number') {//todo better solution

                if (this[key] !== 0) {

                    var name = T.Locale.get('resource', key);
                    var value = this[key];

                    value = value.toLocaleString(/*'en-US''de-DE'*/);//todo todo better solution

                    strings.push('<div><img src="/media/image/resources/' + key + '.png" title="' + name + '" alt="' + name + '" >' + value + '</div>');
                }

            }

        }
        strings = strings.join(' ');
        strings = '<div class="resources">' + strings + '</div>';

        return strings;

    }



};