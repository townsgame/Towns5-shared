
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace T (=global.Towns).MapGenerator
var T = global.Towns;
T.Objects = T.Objects || {};
var A/*Actual Namespace*/ = T.Objects;
module.exports = Towns;
//-----------------------
//======================================================================================================================



T.Objects.Neutral = function(object){

    for(var key in object){
        this[key] = object[key];
    }



};
