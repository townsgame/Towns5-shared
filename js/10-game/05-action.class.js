/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================


T.Game.Action = class{



    constructor(action){

        console.log(this.constructor.getType);
        console.log(this);


        if(typeof this.constructor.getType === 'undefined')throw new Error('You must extend T.Game.Action and add method getType before creating instances!');

        var type = this.constructor.getType();
        if(action.type!==type)throw new Error('This is '+type+' not '+action.type+' class!');

        for(var key in action){
            var this_key = key;
            this[this_key] = action[key];
        }


        //---------------Checking params

        /*for(var param in actionAbility.params){
            var param_type = action.ability_params[param];

            if(typeof actionAbility.params[param]!==param_type){
                throw new Error('Param '+param+' should be '+param_type+' instead of '+typeof(actionAbility.ability_params[param])+' in action ability '+actionAbility.type);
            }

        }*/
        //---------------



    }


    countPriceBase(){
        return(0);
    }


    getPriceResources(){
        return([]);
    }



    static execute(){
        throw new Error('You can not execute passive action.');
    }



    /**
     * @returns {T.Game.ActionAbility}
     */
    /*clone(){
        return(new T.Game.ActionAbility(JSON.parse(JSON.stringify(this))));
    }*/


    /**
     * Creates html profile of action ability
     * @returns {string}
     */
    createHtmlProfile(){

        var html='<table class="action-ability-profile">';

        html+=`
            <tr>
                <th colspan="2">`+ T.Locale.get('object','actionability',this.type)+`</th>
            </tr>
            `;

        for(var param in this.params){
            html+=`
            <tr>
                <td>`+ T.Locale.get('object','actionability',this.type,param)+`</td>
                <td>`+this.params[param]+`</td>
            </tr>
            `;
        }


        html+='</table>';

        return(html);
    }

};



