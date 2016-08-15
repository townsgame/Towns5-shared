/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Model
 */
//======================================================================================================================


module T {

    interface ModelObject{
        name:string;
        particles:Array;
        rotation:number;
        size:number;
    }


    export class Model {


        public name:string;
        public particles:Array;
        public rotation:number;
        public size:number;


        /**
         * @param {object} Model json
         * @return {boolean} false in case of fail
         * @constructor
         */
        constructor(json:ModelObject) {

            if (typeof(json) == 'undefined')return false;

            this.name = json.name;
            this.particles = json.particles;
            this.rotation = json.rotation;
            this.size = json.size;

            if (typeof(this.rotation) == 'undefined')this.rotation = 0;
            if (typeof(this.size) == 'undefined')this.size = 1;
        }


        clone() {
            return (new T.Model(JSON.parse(JSON.stringify(this))));
        }


        /**
         * @param {number} rotation
         * @param {number} size
         */
        addRotationSize(rotation:number, size:number) {

            if (typeof rotation === 'undefined')rotation = 0;
            if (typeof size === 'undefined')size = 1;

            this.rotation += rotation;
            this.size = this.size * size;

        }


        /**
         * @param {string} dimension x,y,z,xy
         * @return {number} range
         */
        range(dimension:string) {

            if (dimension == 'xy') {

                return T.TMath.xy2dist(this.range('x'), this.range('y') * this.size);

            }


            var particlesLinear = this.getLinearParticles();

            var max:number, min:number, max_:number, min_:number;
            for (var i in particlesLinear) {


                min_ = particlesLinear[i].position[dimension];
                max_ = particlesLinear[i].position[dimension] + particlesLinear[i].size[dimension];

                //todo feature reverse

                if (typeof max === 'undefined')max = max_;
                if (typeof min === 'undefined')min = min_;


                if (max_ > max)max = max_;
                if (min_ < min)min = min_;

            }


            return (Math.abs(min - max)/*this.size*/);//todo rotation


        }


        /**
         * @param {number} move_x
         * @param {number} move_y
         * @param {number} move_z
         */
        moveBy(move_x = 0, move_y = 0, move_z = 0) {

            for (var i in this.particles) {


                this.particles[i].position.x += move_x;
                this.particles[i].position.y += move_y;
                this.particles[i].position.z += move_z;

            }


        }


        /**
         * Return Z of joining model
         * @param {object} Model
         * @param {number} move_x
         * @param {number} move_y
         */
        joinModelZ(model:T.Model, move_x:number, move_y:number) {//todo second param should be position

            //var  model_=deepCopyModel(model);
            //model_.moveBy(move_x,move_y);//todo maybe delete moveBy

            //var max_z=this.range('z');


            var this_linear_particles = this.getLinearParticles();
            var model_linear_particles = model.getLinearParticles();


            var distances = [0];
            for (var i in model_linear_particles) {

                model_linear_particles[i].position.x += move_x;
                model_linear_particles[i].position.y += move_y;

                for (var ii in this_linear_particles) {//todo maybe optimize by pre-sorting


                    if (T.Model.Particles.collision2D(this_linear_particles[ii], model_linear_particles[i])) {

                        r(this_linear_particles[ii], model_linear_particles[i]);


                        distances.push(this_linear_particles[ii].position.z + this_linear_particles[ii].size.z);

                    }


                }

            }

            var max_z = Math.max.apply(Math, distances);

            return max_z;

        }


        /**
         * Join models together
         * @param {object} Model
         * @param {number} move_x
         * @param {number} move_y
         */
        joinModel(model, move_x, move_y) {//todo second param should be position

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

        }


        /**
         * Deep copy this and converts links to raw data
         * @returns {object} Model
         */
        getDeepCopyWithoutLinks() {


            var model = this.clone();

            //---------------------------------------------Convert links to raw data


            var findParticleByName = function (particles, name) {//todo move to prototype

                for (var i in particles) {

                    if (particles[i].name == name) {
                        return (particles[i]);
                    }

                    if (typeof(particles[i].particles) != 'undefined') {
                        var finded_particle = findParticleByName(particles[i].particles, name);

                        if (finded_particle !== false) {
                            return (finded_particle);
                        }

                    }


                }

                return (false);

            };


            var particlesLinks = function (particles) {//todo move to prototype


                //r(particles);

                for (var i in particles) {


                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Link
                    if (typeof(particles[i].link) != 'undefined') {


                        var linked_particle = findParticleByName(model.particles, particles[i].link);

                        if (linked_particle === false) {
                            throw new Error('Invalid link ' + particles[i].link);
                        }

                        linked_particle = JSON.parse(JSON.stringify(linked_particle));

                        if (typeof(particles[i].rotation) != 'undefined') {
                            linked_particle.rotation = particles[i].rotation;
                        }
                        if (typeof(particles[i].size) != 'undefined') {
                            linked_particle.size = particles[i].size;
                        }
                        if (typeof(particles[i].position) != 'undefined') {
                            linked_particle.position = particles[i].position;
                        }
                        //todo skew


                        particles[i] = linked_particle;
                    }
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Group
                    if (typeof(particles[i].particles) != 'undefined') {

                        particlesLinks(particles[i].particles);

                    }
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


                }

            };


            particlesLinks(model.particles);

            return (model);

        }


        /**
         * Get 1D array of particles
         * @param {boolean} ignore_root_rotation_size
         * @returns {Array} array of particles
         */
        getLinearParticles(ignore_root_rotation_size = false) {


            var particlesLinear = [];

            //---------------------------------------------Convert particles to 1D particles

            var particles2Linear = function (particles, position, rotation, size) {//todo move to prototype

                if (typeof position === 'undefined')position = false;
                if (typeof rotation === 'undefined')rotation = 0;
                if (typeof size === 'undefined')size = 1;


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
                    if (typeof(particle.rotation) == 'undefined')particle.rotation = 0;
                    if (typeof(particle.size) == 'undefined')particle.size = 1;
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

                    } else {

                        particle.size.x = particle.size.x * size;
                        particle.size.y = particle.size.y * size;
                        particle.size.z = particle.size.z * size;

                    }

                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


                    //------------------------------------------Particle
                    if (typeof(particle.particles) != 'undefined') {

                        particles2Linear(particle.particles, particle.position, particle.rotation, particle.size);

                    } else
                    //------------------------------------------Group
                    if (typeof(particle.shape) != 'undefined') {

                        particlesLinear.push(particle);

                    }
                    //------------------------------------------


                });


            };

            var model = this.getDeepCopyWithoutLinks();

            if (ignore_root_rotation_size) {

                particles2Linear(model.particles, false, 0, 1);

            } else {

                particles2Linear(model.particles, false, model.rotation, model.size);

            }


            //todo strict mode//delete model;

            return (particlesLinear);

        }


        /**
         *
         * @param path
         * @returns {object} part of this
         */
        filterPath(path) {

            var model = this;

            if (typeof(path.forEach) == 'undefined') {
                r(path);
                throw new Error('Path is not correct array.');
            }


            path.forEach(function (i) {
                model = model.particles[i];
            });


            return (model);

        }


        /**
         *
         * @param path
         * @returns {object} part of this
         */
        filterPathSiblings(path) {

            var model = this.getDeepCopyWithoutLinks();
            var current = model;

            if (typeof(path.forEach) == 'undefined') {
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

        }


        /**
         * Aggregate volume of each resource used in model
         * @returns {T.Resources}
         */
        aggregateResourcesVolumes() {


            var price = new T.Resources({});


            var linear_particles = this.getLinearParticles();


            linear_particles.forEach(function (linear_particle) {

                var volume =//todo all shapes
                    linear_particle.size.x *
                    linear_particle.size.y *
                    linear_particle.size.z;

                var material = linear_particle.material.split('_');
                material = material[0];

                var price_:T.Resources = new T.Resources({});
                price_[material] = volume;

                price.add(price_);

            });

            /*console.log('price of');
             console.log(object.design.data);
             console.log(price);*/

            //price.multiply(0.01);

            return (price);


        }


        getHash() {
            return 'xxx' + JSON.stringify(this.particles).length;//todo better
        }


    }

}

