/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.PositionDate
 */
//======================================================================================================================

module T {

    interface PositionDateObject {
        x:number;
        y:number;
        date:Date;
    }


    /**
     * Global position on towns map with time
     */
    export class PositionDate extends T.Position {//todo is thare solution without using T.?

        public x:number;
        public y:number;
        public date:Date;



        constructor(x_or_object: number | PositionDateObject, y?: number, date?: number | Date = 0) {

            let x:number;

            if (typeof x_or_object === 'object') {

                //var positionDateObject:PositionDateObject;
                //positionDateObject = x;

                x = x_or_object.x;
                y = x_or_object.y;
                date = x_or_object.date;


            }else
            if (typeof x_or_object === 'number') {

                x = x_or_object;

            }


            super(x, y);


            var dateObject: Date;

            if (date === 0) {
                dateObject = new Date();
            } else if (typeof date === 'number') {
                dateObject = new Date(date/1);
            } else if (typeof date === 'string') {
                dateObject = new Date(date.toString());
            }else{
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
        clone() {
            return new T.PositionDate(this);
        }


        /**
         * Return only position
         * @returns {T.Position}
         */
        getPosition() {
            return new T.Position(this.x, this.y);
        }


        /**
         * Converts Position to simple string
         * @return {string}
         */
        toString() {

            return '[' + this.x + ',' + this.y + '] at ' +
                (this.date.getDay() + 1) + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear() +
                ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();

        }


    }
}




