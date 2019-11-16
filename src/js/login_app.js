$(function () {
    //页面一加载就出现模态框
    $('#myModal').modal();
})


//配置
require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        login:"./login",
        reg:"./login_regExp"
    },
    shim:{
        md5:['jquery']
    }
});


var passwordReg=/^.{6,16}$/;//密码规范
var telphoneReg=/^1[3-9]\d{9}$/;//手机号规范
require(['jquery','login'],function($,login){
   
   login.reg('#telphone','.telp_tip');
   login.reg('#password','.pword_tip');
   login.reg('#message','.mess_tip');
   login.reg('#password2','.pword_tip2');
   login.regExp('#telphone','.telp_tip',telphoneReg);
   login.regExp('#password','.pword_tip',passwordReg);
   login.regExp('#password2','.pword_tip2',passwordReg);

   
   login.loginEv('#login','#message','#password','#password2');
    
   
  
    
})

