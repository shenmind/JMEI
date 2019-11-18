let baseUrl = "http://localhost:8080/My_exercise/JMEI";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        setUsername: function (selector) {

            // $(selector).on('load', function () {
                if (cookie.get('user_name') != null) {
                    //console.log(cookie.get('user_name'));
                    var u_name = cookie.get('user_name');
                    $('#enter_exit').html('退出').css('color', '#ED145B');
                    $('#log_welcom').html(`欢迎您，${u_name}`).removeAttr("href");
                    $('#hovertip_log_hi').html('您好,');
                    $('#hovertip_log_uname').html(`${u_name}`).removeAttr("href");;
                    $('#hovertip_log_null').html('');

                }

            // })


        },




        exit: function (selector) {
            $(selector).on('click', function () {
                
                $('#enter_exit').html('登录').css('color', '#777777').attr("href", './enter.html');
                $('#log_welcom').html('注册').css('color', '#777777').attr("href", './login.html');
                $('#hovertip_log_hi').html('你好！请');
                $('#hovertip_log_uname').html('登录').attr("href", './enter.html');
                $('#hovertip_log_null').html('注册').attr("href", './login.html');
                
                cookie.remove('user_name');

            })
            
        },



        showdata:function(selector,page){
            $.ajax({
                type: "get",
                url: "http://localhost:8080/My_exercise/JMEI/lib/index.php",
                data: {
                    page:page
                },
                dataType: "json",
                success: function (res) {
                    console.log(res);

                    let temp='';
                    res.forEach(elm=>{
                        temp+=`
                        <li>
                        <a href="${baseUrl}/src/html/details.html?id=${elm.article_id}" data-id="${elm.article_id}" class="aclick">
                        <img src="${baseUrl}/src${elm.section_img}" alt="">
                        <div class="tite">
                            <h5>${elm.title}</h5>
                        </div>
                        <div class="price">
                            <span>￥${elm.price}</span>
                            <button>加入购物车</button>
                        </div>
                        </a>
                    </li>
                        `

                        
                    })
                    $(selector).append(temp);
                 
                    
                   
                    
                }
            });
        },


    


    }
})