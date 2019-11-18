<?php

    header('Access-Control-Allow-Origin:*'); // CORS
    // 1. 连接数据库
    include('./conn.php');

    $art_id=$_REQUEST['article_id'];
    //var_dump($art_id);

   

   

    $sql = "select * from articles where article_id=$art_id";

    $res = $mysqli->query($sql); //执行查询语句

   
    $arr=array();
    //$row1=$res->fetch_assoc();
    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
    
?>