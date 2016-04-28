/**
 * @author ©Towns.cz
 * @fileOverview Creating namespace Towns
 */
//======================================================================================================================


global.Towns = {};
module.exports = global.Towns;


var T = global.Towns;


/**
 * Checks existence of namespace. If not exists, this function creates it.
 * @param namespace eg. 'Objects.Array'
 * @returns {boolean}
 */
T.setNamespace = function(namespace){

    namespace=namespace.split(',');

    var Actual=this;

    var key;
    for(var i= 0,l=namespace.length;i<l;i++){

        key=namespace[i];
        if(typeof Actual[key]==='undefined'){

            Actual[key]={};
            Actual=Actual[key];

        }else{

            return(true);

        }


    }

    return(true);

};