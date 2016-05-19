
/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Objects.Building
 */
//======================================================================================================================



T.Objects.Building = class extends T.Objects.Object{

    /**
     * @param {object} object
     */
    constructor(object) {
        super(object);

        //-----------------------------
        if (typeof this.actions === 'undefined') {

            this.actions = [];

        }else{


            var actions_classes = [];

            for (var i = 0, l = this.actions.length; i < l; i++) {

                try {
                    actions_classes.push(T.World.game.newActionInstance(this.actions[i]));
                }
                catch(error) {
                    console.warn(error);
                }

            }



            this.actions = actions_classes;

        }
        //-----------------------------


        //-----------------------------
        var life_action = this.getAction('life');
        var max_life = T.World.game.getObjectMaxLife(this);


        if(life_action==null){

            life_action=T.World.game.newActionInstance({
                type: 'life',
                params: {
                    life: max_life,
                    max_life: max_life
                }
            });
            actions_classes.push(life_action);

        }else{

            life_action.params.max_life=max_life;
        }
        //-----------------------------




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
    getAction(action_type){

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
