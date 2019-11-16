define(['jquery','md5'], function ($,md5) {
    return {
       enter:function(selector){
           $(selector).on('click',function(){
               console.log("111111");
             
            $.ajax({
                url: 'http://localhost:8080/My_exercise/JMEI/lib/enter.php',
                type: 'post',
                data: {
                    telphone: $('#telphone').val(),
                    password: $.md5($('#password').val())
                },
                success: function (res) {
                    console.log(res);
                    alert(reg.msg);

                  
                }
            });
           })
       }

        

    }
})