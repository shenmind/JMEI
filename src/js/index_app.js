require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        index:"./index",
        cookie:'./cookie'
       
    },
    shim:{
        md5:['jquery']
    }
});
require(['jquery','index','cookie'],function($,index,cookie){
    index.setUsername(window);
   // index.exit('#enter_exit');
  index.showdata('.list01',1);
   index.showdata('.list02',2);

   index.addCommodity('.list','.addCommodity');

  

    

})



