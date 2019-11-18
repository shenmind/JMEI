require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        login:"./login",
        enter:"./enter",
        cookie:'./cookie'
       
    },
    shim:{
        md5:['jquery']
    }
});


var passwordReg=/^.{6,16}$/;//密码规范
var telphoneReg=/^1[3-9]\d{9}$/;//手机号规范
require(['jquery','login','enter','cookie'],function($,login,enter,cookie){
    login.reg('#telphone','.telp_tip');
   login.reg('#password','.pword_tip');

   login.regExp('#telphone','.telp_tip',telphoneReg);
   login.regExp('#password','.pword_tip',passwordReg);

   enter.enter('#enter','#telphone','#password');
   //cookie.set()


})