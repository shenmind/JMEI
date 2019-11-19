define(['jquery', 'md5'], function ($, md5) {
    return {
        //用户注册获取数据到数据库
        loginEv: function (selector, mess, word1, word2) {
            // console.log($.md5($('#password').val()));
            $(selector).on('click', function () {
                //手机验证码为123456,重复密码一致
                if ($(mess).val() == 123456 && $(word1).val() == $(word2).val()) {
                    $.ajax({
                        url: 'http://127.0.0.1:8080/My_exercise/JMEI/lib/login.php',
                        type: 'post',
                        dataType:'json',
                        data: {
                            telphone: $('#telphone').val(),
                            password: $.md5($('#password').val())
                        },
                        success: function (res) {
                            console.log( res);
                             alert(res.msg);
                             location.href = res.url;
                             //location.reload();
                         }
                    
                    });
                }
                    else {
                        alert('信息错误');
                    }
                   
                
               
            });

        },



        //输入框获得焦点时显示提示
        reg: function (selector, tip) {
            $(selector).on('focus', function () {
                $(tip).css('display', 'block');
            })
        },


        //输入框失去焦点时验证手机号和密码格式是否规范
        regExp: function (selector, tip, regStr) {
            $(selector).on('blur', function () {
                // if(this.val()!=null&&this.val()!='')
                // {
                    if (regStr.test(this.value)) {
                        // console.log("验证通过");
                         $(tip).css('display', 'none');
                     }
                     else {
                         $(tip).text('请按要求正确填写信息').css('color', 'red');
                     }

                //}
                // else{
                //     $(tip).css('display', 'block');
                // }
                
            })
        }
    }
});

