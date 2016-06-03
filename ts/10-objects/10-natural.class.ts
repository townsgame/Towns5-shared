
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Natural
 */
//======================================================================================================================


module T.Objects {

    export class Natural extends T.Objects.Object {

        public design;

        clone() {//todo all classes should have this method
            return (new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
        }


        getCode() {
            return (this.design.data.image);
        }


    }

}
