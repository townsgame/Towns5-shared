
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Natural
 */
//======================================================================================================================


namespace T.Objects {

    interface ImageObject{
        image: any;
    }

    interface DesignObject{
        type: string;
        data: ImageObject;
    }


    export class Natural extends T.Objects.Object {


        public design:DesignObject;



        clone() {//todo all classes should have this method
            return (new T.Objects.Natural(JSON.parse(JSON.stringify(this))));
        }


        getCode() {
            return (this.design.data.image);
        }


    }

}
