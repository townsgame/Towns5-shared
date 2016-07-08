/**
 * @author ©Towns.cz
 * @fileOverview Creates class Resources
 */
//======================================================================================================================



module T {


    export class Resources {

        /**
         * @param {object} Resources
         * @constructor
         */
        constructor(resources:Object) {

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
        clone():Resources {
            return new Resources(this);
        }


        /**
         * Checks whether this contains a given resources
         * @param {object} Resources
         * @return {bool} contains
         */
        contains(resources:Resources):boolean {

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
        add(resources:Resources):Resources {

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
        multiply(k:number):Resources {

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
        signum(k:string):Resources {

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
        apply(modifier:Function):Resources {

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
        extractKeys():Array {

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
        compare(resoures:Resources):number {

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
        remove(resources:Resources):boolean {

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
        toString():string {

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


        toHTML():string {//todo put url prefix into params

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
            var strings_joined = strings.join(' ');
            strings_joined = '<div class="resources">' + strings_joined + '</div>';

            return strings_joined;

        }


    }


}