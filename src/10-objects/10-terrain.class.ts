
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Objects.Story
 */
//======================================================================================================================

namespace TOWNS.Objects {

    export class Terrain extends TOWNS.Objects.Object {

        public design;

        clone() {
            return (new TOWNS.Objects.Terrain(JSON.parse(JSON.stringify(this))));
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

