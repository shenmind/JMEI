require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        details:"./details",
        cookie:'./cookie',
       
       
    },
    shim:{
        md5:['jquery']
    }
});


require(['jquery','details','cookie'],function($,details,cookie){
    details.showdata('#allContent');
    details. replacePic('#s_img01');
    details. replacePic('#s_img02');
   details. replacePic('#s_img03');
   details.goBuy('#gobuy_btn','input[type=number]');
    //details.replacePic();

    details.add_comit('#allContent','#add_comit')


    
})
