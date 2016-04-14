//todo headers


if(typeof MapGenerator=='undefined'){


    var MapGenerator = require(__dirname+'/../classes/map-generator.class.js');


}



var terrains = [
    new Terrain(0, '#000000', 'temnota'),
    new Terrain(1, '#337EFA' ,'moře'),
    new Terrain(2, '#545454' ,'dlažba'),
    new Terrain(3, '#EFF7FB' ,'sníh/led'),
    new Terrain(4, '#F9F98D' ,'písek'),
    new Terrain(5, '#878787' ,'kamení'),
    new Terrain(6, '#5A2F00' ,'hlína'),
    new Terrain(7, '#EFF7FB' ,'sníh/led'),
    new Terrain(8, '#2A7302' ,'tráva(normal)'),
    new Terrain(9, '#51F311' ,'tráva(toxic)'),
    new Terrain(10,'#535805' ,'les'),
    new Terrain(11,'#337EFA' ,'řeka'),
    new Terrain(12,'#8ABC02' ,'tráva(jaro)'),
    new Terrain(13,'#8A9002' ,'tráva(pozim)')
];



var mapGenerator = module.exports  = new MapGenerator(
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

            var xy = Math.xyRotate(x,y,57);

            x=xy.x;
            y=xy.y;

        }



        n=n/max_possible_n;



        n=n-0.5;
        var sign=Math.sign(n);
        n=Math.abs(n)*2;
        n=Math.pow(n,1/3);
        n=(n/2*sign)+0.5;



        //return(0.1);//only grass
        //return(0.2);//only watter
        return(n);

    },

    new Biotope([
        { from: ( 0/100) , terrain: terrains[ 5]},
        { from: ( 5/100) , terrain: terrains[ 7]},
        { from: ( 7/100) , terrain: terrains[ 3]},
        { from: ( 9/100) , terrain: terrains[12]},
        { from: (11/100) , terrain: terrains[ 9]},
        { from: (12/100) , terrain: terrains[ 4]},
        { from: (14/100) , terrain: terrains[11]},
        { from: (29/100) , terrain: terrains[ 1]},
        { from: (30/100) , terrain: terrains[11]},
        { from: (39/100) , terrain: terrains[ 4]},
        { from: (42/100) , terrain: terrains[ 9]},
        { from: (49/100) , terrain: terrains[12]},
        { from: (57/100) , terrain: terrains[ 8]},
        { from: (59/100) , terrain: terrains[10]},
        { from: (60/100) , terrain: terrains[ 8]},
        { from: (34/100) , terrain: terrains[10]},
        { from: (68/100) , terrain: terrains[13]},
        { from: (73/100) , terrain: terrains[ 4]},
        { from: (87/100) , terrain: terrains[ 6]}
    ])


);





















