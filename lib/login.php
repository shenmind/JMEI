<?php

    header('Access-Control-Allow-Origin:*'); // CORS
    // 1. 连接数据库
    include('./conn.php');
    

    // 业务逻辑
    // 1. 连接数据库
    // 2. 接收数据
    // 3. 验证数据
    // 4. 根据验证结果进行操作 插入/提示

    // 2. 接收数据
    $telphone = $_REQUEST['telphone'];
    $password = $_REQUEST['password'];

    //var_dump($telphone);
    $name="User_".rand(100000, 999999);

   

   

    // 3. 验证数据  判断用户名是否存在
    $sql = "select * from user where user_telphone='$telphone'";
    $result = $mysqli->query($sql); //执行查询语句

    if($result->num_rows>0){
        // 数据库中有数据
        echo '{"msg":"用户名已存在"}';
        $mysqli->close();
        die;
    }

    $insertSql = "insert into user(user_name,user_telphone,user_password) values('$name','$telphone','$password')";

    // 当使用query函数执行插入操作的时候  返回的是插入的行数
    $res = $mysqli->query($insertSql);

    if($res){
        echo '{"msg":"注册成功,快去登录吧","url":"http://127.0.0.1:8080/My_exercise/JMEI/src/html/enter.html"}';
    }

    $mysqli->close();
    // echo $insertSql;
?>