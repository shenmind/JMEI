require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        shoppingTrolley:"./shoppingTrolley",
        cookie:'./cookie',
        index:'./index',
        lazy:'./jquery.lazyload.min'
       
    },
    shim:{
        md5:['jquery'],
        lazy:['jquery'],
    }
});


require(['jquery','shoppingTrolley','cookie','index'],function($,shoppingTrolley,cookie,index){
    index.setUsername(window);
    shoppingTrolley.getData('tbody');
    
   
    shoppingTrolley.gobuy_getData('tbody');
    shoppingTrolley.replaceAmount('.amount');

    // var amount=document.querySelectorAll('.amount');
    // console.log(amount);

   
    shoppingTrolley.clearAll();
    shoppingTrolley.delete('tbody','#delete_btn');
    
})