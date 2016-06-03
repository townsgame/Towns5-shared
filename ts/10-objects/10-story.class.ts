
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Story
 */
//======================================================================================================================

module T.Objects {

    export class Story extends T.Objects.Object {

        public content;

        clone() {//todo all classes should have this method
            return (new T.Objects.Story(JSON.parse(JSON.stringify(this))));
        }

        getMarkdown() {
            return (this.content.data);
        }


    }

}
