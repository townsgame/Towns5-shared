
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================



T.Objects.Building = class extends T.Objects.Object{

    /**
     * @param {object} object
     */
    constructor(object){
        super(object);


        for(var i= 0,l=this.actions.length;i<l;i++){
            this.actions[i]=new T.Game.ActionAbility(this.actions[i]);
        }


    }


    /**
     * @returns {T.Objects}
     */
    clone(){//todo all classes should have this method
        return(new T.Objects.Building(JSON.parse(JSON.stringify(this))));
    }


    /**
     * @returns {T.Model}
     */
    getModel(){
        if(!(this.design.data instanceof T.Model)){
            this.design.data=new T.Model(this.design.data);
        }

        return(this.design.data);
    }



    /**
     *
     * @param action_type
     * @returns {T.Game.ActionAbility}
     */
    getActionAbility(action_type){

        for(var i= 0,l=this.actions.length;i<l;i++){

            if(this.actions[i].type==action_type){

                return(this.actions[i]);
            }
        }

        return null;

    }



    createHtmlProfile(){

        var actions_profile='';
        for(var i= 0,l=this.actions.length;i<l;i++){
            actions_profile+=this.actions[i].createHtmlProfile();
        }



        return(`

            <div class="object-building-profile">

                <h2>`+this.name+`</h2>


                `+actions_profile+`



            </div>

        `);

    }
};
