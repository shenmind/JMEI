<?php

    header('Access-Control-Allow-Origin:*'); // CORS
    // 1. 连接数据库
    include('./conn.php');

    $currentPage = $_REQUEST['page']; //当前的页数
    $pagesize = 3; //每一次查询的数据数量
    $startRow = ($currentPage-1)*$pagesize;

    $sql = "select * from articles limit $startRow,$pagesize";

    //$sql="select * from articles";

    $res = $mysqli->query($sql); //执行查询语句

   
    $arr=array();
    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
    
?>