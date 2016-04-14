
/**
 * @author ©Towns.cz
 * @fileOverview Creates object MapGenerator with static methods
 */
//======================================================================================================================

//todo this file is deprecated and will be removed

var MapGenerator = module.exports  = function(getZ,biotope,blur){

    this.getZ = getZ;
    this.biotope = biotope;
    this.blur = blur;

};


//======================================================================================================================loadMap


MapGenerator.prototype.getZMap = function(startX,startY,size){

    //r(size,startY,startX);
    var map=[];

    for(var y=startY;y<=startY+size;y++){

        map[y-startY]=[];

        for(var x=startX;x<=startX+size;x++){

            //console.log(x+','+y);
            map[y-startY][x-startX]=this.getZ(x,y);

        }
    }

    //r(map);
    return(map);

};

//======================================================================================================================loadMap



MapGenerator.prototype.blurMap = function(map,blur/*change*/){

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

};


//======================================================================================================================loadMap


MapGenerator.prototype.terrainMap = function(map){

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



MapGenerator.prototype.getMap = function(startX,startY,size,onlyRound){

    if(typeof onlyRound=='undefined')onlyRound=true;
    var bounds=1;



    map=this.getZMap(startX-bounds,startY-bounds,size+(2*bounds));

    map=this.blurMap(map,bounds);


    var map_z=[];

    for(var y=0;y<size;y++){
        map_z[y]=[];
        for(var x=0;x<size;x++){

            if(Math.pow(x-(size/2),2)+Math.pow(y-(size/2),2)<=Math.pow(size/2,2) || !onlyRound){

                map_z[y][x]=map[y+bounds][x+bounds+2/*@todo proc*/];

            }/*else{

                map_z[y][x]=undefined;

            }*/



        }
    }
    //delete map;

    var map_bg=this.terrainMap(map_z);
    return(map_bg);
};

