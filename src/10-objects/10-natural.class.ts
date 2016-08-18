
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Objects.Natural
 */
//======================================================================================================================


namespace TOWNS.Objects {

    interface ImageObject{
        image: any;
    }

    interface DesignObject{
        type: string;
        data: ImageObject;
    }


    export class Natural extends TOWNS.Objects.Object {


        public design:DesignObject;



        clone() {//todo all classes should have this method
            return (new TOWNS.Objects.Natural(JSON.parse(JSON.stringify(this))));
        }


        getCode() {
            return (this.design.data.image);
        }


    }

}
