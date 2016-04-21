<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Towns-shared object price sample</title>



    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script>
        var module={};
        var global=window;
        global.Towns = {};
    </script>
    <?php
    $files=array_merge(
        glob('../../js/*.js'),
        glob('../../js/*/*.js')
    );
    foreach($files as $file):

        ?>
        <script src="<?=$file?>"></script>
    <?php endforeach; ?>




    <script>
        $(function(){

            const points=100;
            const start={x:10,y:10};
            const stop={x:100,y:100};



            var ctx = $('#graph')[0].getContext('2d');



            for(i=0;i<points;i++) {


                var x = (start.x*(i/points))+(stop.x*((points-i)/points)),
                    y = (start.y*(i/points))+(stop.y*((points-i)/points));


                var z = T.World.mapGenerator.getZ(x, y);

                ctx.beginPath();
                ctx.rect(

                    (i/points)*ctx.canvas.width,
                    ctx.canvas.height,
                    (1/points)*ctx.canvas.width,
                    -z*ctx.canvas.height

                );
                ctx.fillStyle = '#f44';
                ctx.fill();


            }




        });
    </script>
    <style>

        #graph{

            display: inline-block;

            border: 2px solid #444;

            /**/
        }


    </style>
</head>
<body>

<canvas id="graph" width="1000" height="300"></canvas>


<div id="info" style="text-align: center;width: 100%;">
</div>




</body>
</html>