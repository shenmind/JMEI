require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        details:"./details",
        cookie:'./cookie'
       
    },
    shim:{
        md5:['jquery']
    }
});


require(['jquery','details','cookie'],function($,details,cookie){
    details.showdata('#allContent');
    //details. replacePic('.detail_img','s_img01','http://localhost:8080/My_exercise/JMEI/src/img/list_img/section01_list01_detail01.jpg');
    //details. replacePic('.detail_img','s_img02','http://localhost:8080/My_exercise/JMEI/src/img/list_img/section01_list01_detail02.jpg');
   // details. replacePic('.detail_img','s_img03','http://localhost:8080/My_exercise/JMEI/src/img/list_img/section01_list01_detail03.jpg');

})
