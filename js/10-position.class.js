/**
 * @author ©Towns.cz
 * @fileOverview Creates class Position
 */
//======================================================================================================================
var A/*Actual Namespace*/ = T;




A.Position = function(x,y){

    if(typeof x == 'object'){

        this.x= x.x;
        this.y= x.y;

    }else{

        this.x= x;
        this.y= y;

    }

};


A.Position.prototype.getMoved = function(x,y){

    return new T.Position(this.x+x,this.y+y);

};


A.Position.prototype.getDistance = function(position){

    return T.Math.xy2dist(position.x-this.x,position.y-this.y);

};



/**
 * Converts Position to simple string
 * @return {string}
 */
A.Position.prototype.toString = function(){

    return '['+this.x+','+this.y+']';

};

