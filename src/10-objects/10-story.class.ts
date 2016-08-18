
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.Objects.Story
 */
//======================================================================================================================

namespace TOWNS.Objects {

    export class Story extends TOWNS.Objects.Object {

        public content;

        clone() {//todo all classes should have this method
            return (new TOWNS.Objects.Story(JSON.parse(JSON.stringify(this))));
        }

        getMarkdown() {
            return (this.content.data);
        }


    }

}
