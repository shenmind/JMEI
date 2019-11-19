require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        md5:"./jquery.md5",
        shoppingTrolley:"./shoppingTrolley",
        cookie:'./cookie'
       
    },
    shim:{
        md5:['jquery']
    }
});


require(['jquery','shoppingTrolley','cookie'],function($,shoppingTrolley,cookie){
    shoppingTrolley.getData('tbody');
    shoppingTrolley.replaceAmount('#amount','#pirce','#sub_total');
    shoppingTrolley.clearAll();
})