/**
 * @author ©Towns.cz
 * @fileOverview Initialize namespace Towns
 */
//======================================================================================================================


module T{
    export class Locale{

        /**
         * Blank emulator of locale object
         * @param locale_keys {Array<string>}
         * @returns {string}
         */
        static get(...locale_keys:Array<string>):string{

            return(locale_keys.join(' '));

        }
    }
}