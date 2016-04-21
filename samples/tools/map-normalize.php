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

    const parts=800;
    const times=10000;
    const horizonts=10;


    z_count=[];
    for(z=0;z<parts;z++) {
        z_count[z]=0;
    }




    var max_z_count=0;


    for(i=0;i<horizonts;i++) {
        for(ii=0;ii<(times/horizonts);ii++) {


            var horizont = Math.pow(2, i + 9);


            var x = Math.floor((Math.random() - 0.5) * horizont),
                y = Math.floor((Math.random() - 0.5) * horizont);


            var z = T.World.mapGenerator.getZ(x, y);


            z = Math.floor(z*parts);

            z_count[z]++;

            if(z_count[z]>max_z_count)max_z_count=z_count[z];


        }
    }


    $('#info').text(max_z_count);


    var ctx = $('#graph')[0].getContext('2d');

    for(z=0;z<parts;z++) {



        ctx.beginPath();
        ctx.rect((z/parts)*ctx.canvas.width,ctx.canvas.height,(1/parts)*ctx.canvas.width,-(z_count[z]/max_z_count)*ctx.canvas.height);
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