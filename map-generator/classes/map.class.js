
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================


////-----------------------Creating namespace MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
//-----------------------
//======================================================================================================================



Towns.MapGenerator.Map = module.exports  = function(getZ,biotope,blur){

    this.getZ = getZ;
    this.biotope = biotope;
    this.blur = blur;

};


//======================================================================================================================loadMap


Towns.MapGenerator.Map.prototype.getZMapCircle = function(center,radius){

    var map=[];

    for(var y=0;y<=radius*2;y++){

        map[y]=[];

        for(var x=0;x<=radius*2;x++){


            if(
                Math.pow(x-radius+1/2,2)
                +
                Math.pow(y-radius+1/2,2)
                >
                Math.pow(radius,2)
            )continue;


            map[y][x]=this.getZ(x-radius+center.x,y-radius+center.y);


        }
    }

    return(map);

};

//======================================================================================================================loadMap



/*Towns.MapGenerator.Map.prototype.blurMap = function(map,blur){

    //r(blur,Math.pow(blur*2+1,2));

    var map_=[];

    for(var y= 0,l=map.length;y<l;y++){
        map_[y]=[];
        for(var x=0;x<l;x++){
            map_[y][x]=0;
        }
    }




    for(var y=0;y<l;y++){
        for(var x=0;x<l;x++){

            var z=map[y][x]/Math.pow(blur*2+1,2);//todo optimalizovat

            for(var y_=y-blur;y_<=y+blur;y_++){
                for(var x_=x-blur;x_<=x+blur;x_++){

                    if(x_<0)break;
                    if(y_<0)break;
                    if(x_>=map.length)break;
                    if(y_>=map.length)break;

                    map_[y_][x_]+=z;
                }
            }

        }
    }



    return(map_);

};*/


//======================================================================================================================loadMap


Towns.MapGenerator.Map.prototype.terrainMap = function(map){

    var map_bg=[];

    for(var y=0,l=map.length;y<l;y++){
        map_bg[y]=[];
        for(var x=0;x<l;x++){

            if(typeof(map[y][x])==='undefined')continue;

            map_bg[y][x] = this.biotope.getZTerrain(map[y][x]);

        }
    }

    return(map_bg);

};

//======================================================================================================================loadMap



Towns.MapGenerator.Map.prototype.getMapCircle = function(center,radius){


    var bounds=1;


    var z_map=this.getZMapCircle(center,radius);


    var map=this.terrainMap(z_map);



    return(map);
};


