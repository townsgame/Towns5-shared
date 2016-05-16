/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.ActionAbility
 */
//======================================================================================================================


T.Game.ActionAbility = class{

    constructor(object){
        for(var key in object){
            var this_key = key;
            this[this_key] = object[key];
        }
    }


    /**
     * @returns {T.Game.ActionAbility}
     */
    clone(){
        return(new T.Game.ActionAbility(JSON.parse(JSON.stringify(this))));
    }


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
