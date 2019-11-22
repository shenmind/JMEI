require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        details:"./details",
        cookie:'./cookie',
        index:'./index',
      lazy:'./jquery.lazyload.min'
      
       
       
    },
    shim:{
        md5:['jquery'],
        lazy:['jquery']
    }
});


require(['jquery','details','cookie','index'],function($,details,cookie,index){
    details.showdata('#allContent');
    details. replacePic('#s_img01');
    details. replacePic('#s_img02');
   details. replacePic('#s_img03');
   details.goBuy('#gobuy_btn','#input_amount');
    //details.replacePic();
    
    details.add_comit('#allContent','#add_comit');
   // index.addCommodity('#allContent','#add_comit');
    index.setUsername(window);




    
})
