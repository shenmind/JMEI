<?php

header('Access-Control-Allow-Origin:*'); // CORS
// 1. 连接数据库
include('./conn.php');
//include('./login.php');
//获取用户输入的手机号和密码
//查询数据库看是否有这个用户，验证手机号和密码

// $telphone = $_REQUEST['telphone'];
// $password = $_REQUEST['password'];

$sql = "select * from user where user_telphone='$telphone' and user_password='$password'";

$res = $mysqli->query($sql);
//var_dump($res);
if($res->num_rows > 0){
    //$row1 = $res->fetch_assoc();
    //var_dump($row1);
    echo '{"msg":"登录成功！","url":"http://127.0.0.1:8080/My_exercise/JMEI/src/html/index.html"}';
  
    //echo "<script>location.href='../src/html/index.html'</script>";

}
else{
  
      echo '{"msg":"亲，您还未注册！"}';

}



?>