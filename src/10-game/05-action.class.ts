/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Game.Action
 */
//======================================================================================================================

module T.Game {


    interface ActionObject{
        type: string;
        params: Object;
    }

    export class Action {


        public last_use:number;
        public type:string;
        public params:Object;


        constructor(action:ActionObject) {

            //console.log(this.constructor.getType);
            //console.log(this);

            if (typeof this.getType() === 'undefined'){
                throw new Error('You must extend T.Game.Action and add method getType before creating instances!');
            }

            var type = this.getType();


            if (action.type !== type){
                throw new Error('This is ' + type + ' not ' + action.type + ' class!');
            }

            for (var key in action) {
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


        getType():string{
            return ('undefined');
        }

        countPriceBase():number {
            return (0);
        }


        getPriceResources() {
            return ([]);
        }


        /**
         * Creates html profile of action ability
         * @returns {string}
         */
        createHtmlProfile() {

            var html = '<table class="action-ability-profile">';

            html += `
            <tr>
                <th colspan="2">` + T.Locale.get('object', 'action', this.type) + `</th>
            </tr>
            `;


            if (typeof this.last_use !== 'undefined') {
                html += `
            <tr>
                <td>` + T.Locale.get('object', 'action', 'last_used') + `</td>
                <td>` + this.last_use + `</td>
            </tr>
            `;
            }


            for (var param in this.params) {
                html += `
            <tr>
                <td>` + T.Locale.get('object', 'action', this.type, param) + `</td>
                <td>` + this.params[param] + `</td>
            </tr>
            `;
            }


            html += '</table>';

            return (html);
        }

    }

}