<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Towns shared</title>


    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
    <script>
        var module={};
        var global=window;
    </script>
    <?php
    $scripts = array_merge(glob('./js/*.js'),glob('./js/*/*.js'),glob('./js/*/*/*.js'));
    sort($scripts);
    foreach($scripts as $script){
        echo('<script src="'.$script.'"></script>'."\n");
    }
    ?>




    <script>

        T.Locale = class{

            static get(){
                return(Array.join(arguments,' '));
            }

        }

    </script>


    <link rel="stylesheet" href="style-samples.js.css" />






</head>
<body>


<?php

    $pages = array_merge(
        glob('samples/*.html')
        ,glob('samples/**/*.html')
        //,array('documentation/index.html')

    );

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

        --><a href="?page=<?=$page?>"><li <?=($page===$current_page?'class="selected"':'')?>><?=ucfirst(str_replace('-',' ',basename($page,'.html')))?></li></a><!--

        <?php } ?>
    --><a href="./documentation" target="_blank"><li>Documentation</li></a></ul>
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