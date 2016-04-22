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

            function log(json){
                $('body').append(
                    $('<pre class="prettyprint"></pre>').html(JSON.stringify(json,null,4))
                );
            }


            var map_radius = 2,
                map_center = {x: 0, y: 0}


                var objects = new T.Objects.Array([
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
                ]);

                var map_array = objects.getMapArray(map_center, map_radius);
                log(map_array);


                T.World.mapGenerator.completeObjects(objects, map_center, map_radius, true);
                log(objects);


                var map_array = objects.getMapArray(map_center, map_radius);
                log(map_array);







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