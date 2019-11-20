require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        shoppingTrolley:"./shoppingTrolley",
        cookie:'./cookie',
        index:'./index'
       
    },
    shim:{
        md5:['jquery']
    }
});


require(['jquery','shoppingTrolley','cookie','index'],function($,shoppingTrolley,cookie,index){
    shoppingTrolley.getData('tbody');
    shoppingTrolley.replaceAmount('#amount','#pirce','#sub_total');
    shoppingTrolley.clearAll();
    shoppingTrolley.gobuy_getData('tbody');

    index.setUsername(window);
    
})