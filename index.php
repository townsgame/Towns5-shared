<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Towns shared</title>


    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
    <script>
        var module={};
        var global=window;
    </script>
    <?php
    $scripts = array_merge(glob('./js/**.js'),glob('./js/**/*.js'));
    sort($scripts);
    foreach($scripts as $script){
        echo('<script src="'.$script.'"></script>'."\n");
    }
    ?>




    <script>

        $(function(){




        });

    </script>
    <style>

        body {
            padding: 5px;
            font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;


            padding-top: 100px;
        }


        nav{

            position:fixed;
            top: 0px;
            right: 0px;
            left: 0px;
            /*float: right;*/



        }

        nav h1{


            display: block;

            background-color: #AAD5F0;


            margin:0px;
            padding:10px;

            text-align: center;

            font-size: 1.2em;
            font-weight: bold;


        }

        nav ul{
            margin:0px;
            padding:0px;
            background-color: #a1b7cc;


        }

        nav li{

            display: inline-block;
            list-style: none;

            /*border: 2px solid #999;*/

            margin:0px;

            padding: 10px;
            padding-left: 20px;
            padding-right: 20px;


            /*min-width: 200px;*/


            color: #000000;
            text-decoration: none;


            text-align: center;

        }


        nav li.selected{

            background-color: #AAD5F0;
            font-weight: bold;


        }






    </style>
</head>
<body>


<?php

    $pages = array_merge(glob('samples/*.html'),glob('samples/**/*.html'));

    if(!isset($_GET['page'])){
        $current_page=$pages[0];
    }else
    if(in_array($_GET['page'],$pages)!==false) {
        $current_page = $_GET['page'];
    }else{
        $current_page = false;
    }



?>

<nav>
    <h1>Towns Shared</h1>
    <ul><!--

        <?php foreach($pages as $page){ ?>

        --><a href="?page=<?=$page?>"><li <?=($page===$current_page?'class="selected"':'')?>><?=basename($page,'.html')?></li></a><!--

        <?php } ?>
    --></ul>
</nav>



<!--<h1><?=$current_page?></h1>-->

<article>

    <?php


    if(!$current_page){

        http_response_code(404);
        echo('Not found :(');

    }else{

        include($current_page);

    }


    ?>

</article>


</body>
</html>