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
    glob('../js/*.js'),
    glob('../js/*/*.js')
);
foreach($files as $file):

    ?>
    <script src="<?=$file?>"></script>
<?php endforeach; ?>





<script>



    $(function(){

        /*



        */

        $.ajax({
            url: 'http://api.towns.cz/objects/prototypes'
        }).done(function(response) {

            $('#object-json').val(JSON.stringify(response[0],null,4));
            change();

        });





        var change = function(){

            var object_json = $('#object-json').val();

            object_json=JSON.parse(object_json);

            var price_bases = T.World.game.getObjectPriceBases(object_json);
            var max_life = T.World.game.getObjectMaxLife(object_json);
            var prices = T.World.game.getObjectPrices(object_json);
            var price = T.World.game.getObjectPrice(object_json);
            var design_price = T.World.game.getObjectDesignPrice(object_json);

            $('#object-price').html('');

            $('#object-price').append('<b>Max life of building:</b><br>');
            $('#object-price').append(price_bases.join(' <br>+ ')+' <br>~= ');
            $('#object-price').append(max_life);


            $('#object-price').append('<br><hr><br>');


            $('#object-price').append('<b>Design price of building:</b><br>');
            $('#object-price').append(design_price.toString());


            $('#object-price').append('<br><br>');


            $('#object-price').append('<b>Price of building:</b><br>');
            $('#object-price').append('( '+prices.join(' ) <br>+ ( ')+' ) <br>~= ');
            $('#object-price').append(price.toString());

        };

        $('#object-json').change(change);
        $('#object-json').keypress(function(){setTimeout(change,100)});

    });

</script>
<style>


    #object-json{
        display: inline-block;
        vertical-align: top;
        width: calc(50vw - 35px);
        height: calc(100vh - 35px);
    }


    #object-price{
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 400px;
        max-width: calc(50vw - 35px);
        height: calc(100vh - 35px);
    }

</style>
</head>
<body>


<textarea id="object-json"></textarea>




<div id="object-price"></div>


</body>
</html>