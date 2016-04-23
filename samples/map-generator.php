<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Towns-shared object price sample</title>



    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
    <script>
        var module={};
        var global=window;
        global.Towns = {};
    </script>
    <?php
    $files=array_merge(
        glob('../js/*.js'),
        glob('../js/*/*.js')
    );
    foreach($files as $file):

        ?>
        <script src="<?=$file?>"></script>
    <?php endforeach; ?>




    <script>
        $(function(){

            function log(title,json){
                $('body').append(
                    $('<h3></h3>').text(title)
                );
                $('body').append(
                    $('<pre class="prettyprint"></pre>').html(JSON.stringify(json,null,4))
                );

            }


            var map_radius = 2;
            var map_center = new T.Position({x: 20600, y: 378535});
            var position1 =  map_center.getMoved(1,2);
            var position2 =  map_center.getMoved(-2,1);



                $.ajax({
                    url: 'http://api.towns.cz/objects/?x='+map_center.x+'&y='+map_center.y+'&radius='+map_radius
                }).done(function(response){



                    var server_objects = new T.Objects.Array(response/*[
                     {
                     "type": "terrain",
                     "design": {
                     "type": "terrain",
                     "data": {
                     "image": 7,
                     "color": "#EFF7FB",
                     "size": 1
                     }
                     },
                     "name": "My own terrain object",
                     "x": -1,
                     "y": -2
                     }
                     ]*/);

                    log('Objects from API near '+map_center,server_objects);

                    var map_array = server_objects.getMapOfTerrainCodes(map_center, map_radius);
                    log('Getting map array created from that objects',map_array)//todo map of codes


                    var complete_objects = T.World.mapGenerator.getCompleteObjects(server_objects, map_center, map_radius, true);
                    log('Getting complete objects via MapGenerator.completeObjects',complete_objects);


                    var map_array = complete_objects.getMapOfTerrainCodes(map_center, map_radius);
                    log('Getting map of terrain codes created from that objects',map_array);



                    var terrain_code = complete_objects.getTerrainCodeOnPosition(position1);
                    log('Getting terrain code on '+position1,terrain_code);


                    var position3 = complete_objects.getPositionOfNearestTerrain(position2,terrain_code);
                    log('Getting position of nearest terrain with code '+terrain_code,position3);

                    log('Distance between '+position2+' and '+position3+' is',position2.getDistance(position3));



                });

        });


    </script>
    <style>

        .mapCircle{

            display: inline-block;

            border: 2px solid #444;
            border-radius: 9999px;

            /**/
        }


    </style>
</head>
<body>


</body>
</html>