define(['jquery', 'md5', 'cookie'], function ($, md5, cookie) {
    return {
        enter: function (selector, input_telp, input_pass) {
            $(selector).on('click', function () {
                if ($(input_telp) != '' && $(input_telp) != null && $(input_pass) != '' && $(input_pass) != null) {
                    $.ajax({
                        url: 'http://127.0.0.1:8080/My_exercise/JMEI/lib/enter.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            telphone: $('#telphone').val(),
                            password: $.md5($('#password').val())
                        },
                        success: function (res) {
                            //console.log(res);
                            alert(res[1]);
                            var user_n = res[0];
                            location.href = res[2];
                            //document.cookie="user_name="+user_n+";expires=1;path=/";
                            cookie.set("user_name", user_n,1);
                        }
                    });

                }
                else{
                    alert('账号或密码错误');
                }

            })
        }



    }
})