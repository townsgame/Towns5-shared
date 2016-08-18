
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================

namespace T.Objects {

    export class Terrain extends T.Objects.Object {

        public design;

        clone() {
            return (new T.Objects.Terrain(JSON.parse(JSON.stringify(this))));
        }


        getCode(prefered_width) {

            return (this.design.data.image);

        }


        getColor() {

            return (this.design.data.color);

        }


        //todo getImage(){}


    }

}

