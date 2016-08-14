/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Path
 */
//======================================================================================================================

module T{

    export class Path {

        /**
         * @param {...T.PositionDate} Position with date at least 2
         */
        constructor(...args) {


            //todo maybe//if(args.length===1 && args instanceof Array){
            //todo maybe//    this.array_position_date = args[0];
            //todo maybe//}else{
            this.array_position_date = args;
            //todo maybe//}


            if (this.array_position_date.length < 2) {
                throw new Error('Thare must be at least 2 params when constructing T.Path.');
            }


            var position_date: PositionDate, last_date = -1;
            for (var i = 0, l = this.array_position_date.length; i < l; i++) {

                position_date = this.array_position_date[i];

                if (position_date instanceof T.PositionDate) {
                } else {

                    if (position_date instanceof Object) {

                        this.array_position_date[i] = new T.PositionDate(this.array_position_date[i]);

                    } else {

                        throw new Error('All Params when constructing T.Path must be T.PositionDate');
                    }


                }

                if (last_date >= position_date.date) {
                    throw new Error('Dates should be consecutive when constructing T.Path (' + position_date.date + ' should be after ' + last_date + '). ' + this);
                }

                last_date = position_date.date;


            }

        }


        toJSON() {
            return (this.array_position_date);
        }


        /**
         *
         * @param {Array.<T.Position>} array_position
         * @param {number} speed
         * @param {Date} date
         * @returns {T.Path}
         */
        static newConstantSpeed(array_position: Array, speed: number, date = 0): Path {

            if (date === 0) {
                date = new Date();
            } else if (typeof date === 'number') {
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

            var position_date: PositionDate, distance: number;
            for (var i = 1, l = array_position.length; i < l; i++) {

                position_date = array_position[i];


                if (position_date instanceof T.Position) {
                } else {
                    throw new Error('All Params when constructing T.Path via newConstantSpeed must be T.Position');
                }


                distance = last_position.getDistance(position_date);
                date = new Date(date / 1 + distance / speed * 1000);


                last_position = position_date;


                array_position_date.push(
                    new T.PositionDate(array_position[i].x, array_position[i].y, date)
                );

            }


            //return new this.apply(this,array_position_date);
            //return Object.create(T.Path,array_position_date);
            return new T.Path(...array_position_date);

        }



        getPositions() {

            var positions = [];

            for (var i = 0, l = this.array_position_date.length; i < l; i++) {

                positions.push(this.array_position_date[i].getPosition());

            }

            return(positions);
        }





        /**
         * Count in which segment is T.Path progress
         * @param date
         * @returns {number}
         */
        countSegment(date: Date) {

            //------------------------Not started or finished

            if (this.array_position_date[0].date > date) {
                return (0);
            } else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
                return (this.array_position_date.length - 2);
            }


            //------------------------In progress

            var A: PositionDate, B:PositionDate, x: number, y: number;
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

        }


        /**
         * Counts position at 'date'
         * @param {Date} date
         * @returns {T.Position}
         */
        countPosition(date = 0) {

            if (date === 0) {
                date = new Date();
            } else if (typeof date === 'number') {
                date = new Date(date);
            }

            //------------------------Not started or finished

            if (this.array_position_date[0].date > date) {
                return (this.array_position_date[0].getPosition());
            } else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
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


        }


        /**
         * Counts rotation at 'date'
         * @param date
         * @returns {number} degrees
         */
        countRotation(date = 0) {


            if (date === 0) {
                date = new Date();
            } else if (typeof date === 'number') {
                date = new Date(date);
            }


            var segment = this.countSegment(date);

            var A = this.array_position_date[segment];
            var B = this.array_position_date[segment + 1];

            var BA = B.getPosition().plus(A.getPosition().multiply(-1));

            var polar = BA.getPositionPolar();
            //console.log(BA,polar);

            return (polar.getDegrees());

        }

        /**
         * Counts Speed at 'date'
         * @param date
         * @returns {number} fields/s
         */
        countSpeed(date: Date) {

            if (this.inProgress(date) === false) {
                return (0);
            }

            var segment = this.countSegment(date);

            var A = this.array_position_date[segment];
            var B = this.array_position_date[segment + 1];

            var distance = A.getDistance(B);
            var duration = B.date - A.date;

            return (distance / (duration / 1000));

        }


        /**
         * Is path in progress (true) or it has not started(false) or it is finished(false)?
         * @param {Date} date
         * @returns {boolean}
         */
        inProgress(date: Date) {

            if (this.array_position_date[0].date > date) {
                return (false);
            } else if (this.array_position_date[this.array_position_date.length - 1].date <= date) {
                return (false);
            } else {
                return (true);
            }
        }


        //todo maybe countProgress


        /**
         * Converts T.Path to string
         * @returns {string}
         */
        toString() {
            return this.array_position_date.join(', ');
        }


    }

}