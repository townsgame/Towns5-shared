
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace T (=global.Towns).MapGenerator
var T = global.Towns;
T.World = T.World || {};
var A/*Actual Namespace*/ = T.World;
module.exports = Towns;
//-----------------------
//======================================================================================================================





A.mapGenerator = new T.MapGenerator(

    function(x,y){


        const div=100;

        //return(Math.random());
        //var z=(x/y)*50;

        if(x+y<0){
            x=-x;
            y=-y;
        }



        var n= 0,
            max_possible_n=0;


        x=x+1*Math.sin(y);
        y=y+1*Math.sin(x);



        for(var i= 0;i<20;i++){

            if(i%2) {
                n += Math.round(Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 1.1)) % (div + 1);
            }else{
                n += div - Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%(div+1);
            }


            max_possible_n+=div;

            x=Math.floor(x/3);
            y=Math.floor(y/3);

            var xy = T.Math.xyRotate(x,y,50);

            x=xy.x;
            y=xy.y;

        }



        n=n/max_possible_n;


        n-=0.5;
        n=n*3;
        n+=0.5;


        if(n<0)n-=Math.floor(n);
        if(n>1)n-=Math.floor(n);

        return(n);

    },

    new T.MapGenerator.Biotope([
        { from: ( 0/19) , terrain: A.terrains[ 5]},
        { from: ( 1/19) , terrain: A.terrains[ 7]},
        { from: ( 2/19) , terrain: A.terrains[ 3]},
        { from: ( 3/19) , terrain: A.terrains[12]},
        { from: ( 4/19) , terrain: A.terrains[ 9]},
        { from: ( 3/19) , terrain: A.terrains[ 4]},
        { from: ( 6/19) , terrain: A.terrains[11]},
        { from: ( 7/19) , terrain: A.terrains[ 1]},
        { from: ( 8/19) , terrain: A.terrains[11]},
        { from: ( 9/19) , terrain: A.terrains[ 4]},
        { from: (10/19) , terrain: A.terrains[ 9]},
        { from: (11/19) , terrain: A.terrains[12]},
        { from: (12/19) , terrain: A.terrains[ 8]},
        { from: (13/19) , terrain: A.terrains[10]},
        { from: (14/19) , terrain: A.terrains[ 8]},
        { from: (15/19) , terrain: A.terrains[10]},
        { from: (16/19) , terrain: A.terrains[13]},
        { from: (17/19) , terrain: A.terrains[ 4]},
        { from: (18/19) , terrain: A.terrains[ 6]}
    ]),


    function(object,virtual_objects){

        if(object.type!='terrain')return;

        if(object.design.data.image==5){

            virtual_objects.push(
                {

                    x: object.x,
                    y: object.y,
                    type: 'natural',
                    design: {
                        type: 'natural',
                        data:{
                            image:'rock'+Math.floor(T.Math.randomSeedPosition(1,{x:object.x,y:object.y})*6)+'dark'+Math.floor(T.Math.randomSeedPosition(2,{x:object.x,y:object.y})*4),
                            size: 1+T.Math.randomSeedPosition(5,{x:object.x,y:object.y})*3
                        }
                    }

                }
            );


        }else
        if(object.design.data.image==10){


            virtual_objects.push(
                {

                    x: object.x,
                    y: object.y,
                    type: 'natural',
                    design: {
                        type: 'natural',
                        data:{
                            image:'tree'+Math.floor(T.Math.randomSeedPosition(3,{x:object.x,y:object.y})*10),
                            size: 1+T.Math.randomSeedPosition(6,{x:object.x,y:object.y})/2
                        }
                    }

                }
            );


        }


    }


);


















