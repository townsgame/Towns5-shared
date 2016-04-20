
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

        //var z=(x/y)*50;

        if(x+y<0){
            x=-x;
            y=-y;
        }



        var n= 0,
            max_possible_n=0;


        x=x+1*Math.sin(y);
        y=y+1*Math.sin(x);


        //x=Math.floor(x/2.6);
        //y=Math.floor(y/2.6);
        //x=Math.floor(x/4);
        //y=Math.floor(y/4);


        for(var i= 0;i<19;i++){


            n+=Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%3;
            max_possible_n+=2;

            x=Math.floor(x/3);
            y=Math.floor(y/3);

            var xy = T.Math.xyRotate(x,y,57);

            x=xy.x;
            y=xy.y;

        }



        n=n/max_possible_n;



        n=n-0.5;
        var sign=T.Math.sign(n);
        n=Math.abs(n)*2;
        n=Math.pow(n,1/3);
        n=(n/2*sign)+0.5;



        //return(0.1);//only grass
        //return(0.2);//only watter

        //console.log(n);
        return(n);

    },

    new T.MapGenerator.Biotope([
        { from: ( 0/100) , terrain: A.terrains[ 5]},
        { from: ( 5/100) , terrain: A.terrains[ 7]},
        { from: ( 7/100) , terrain: A.terrains[ 3]},
        { from: ( 9/100) , terrain: A.terrains[12]},
        { from: (11/100) , terrain: A.terrains[ 9]},
        { from: (12/100) , terrain: A.terrains[ 4]},
        { from: (14/100) , terrain: A.terrains[11]},
        { from: (29/100) , terrain: A.terrains[ 1]},
        { from: (30/100) , terrain: A.terrains[11]},
        { from: (39/100) , terrain: A.terrains[ 4]},
        { from: (42/100) , terrain: A.terrains[ 9]},
        { from: (49/100) , terrain: A.terrains[12]},
        { from: (57/100) , terrain: A.terrains[ 8]},
        { from: (59/100) , terrain: A.terrains[10]},
        { from: (60/100) , terrain: A.terrains[ 8]},
        { from: (34/100) , terrain: A.terrains[10]},
        { from: (68/100) , terrain: A.terrains[13]},
        { from: (73/100) , terrain: A.terrains[ 4]},
        { from: (87/100) , terrain: A.terrains[ 6]}
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


















