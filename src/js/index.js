let baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

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



        showdata: function (selector, page) {

            $.ajax({
                type: "get",
                url: "http://127.0.0.1:8080/My_exercise/JMEI/lib/index.php",
                data: {
                    page: page
                },
                dataType: "json",
                success: function (res) {
                    console.log(res);

                    let temp = '';
                    res.forEach(elm => {
                        temp += `
                        <li>
                        <a href="${baseUrl}/src/html/details.html?id=${elm.article_id}" data-id="${elm.article_id}" class="aclick">
                        <img data-original="${baseUrl}/src${elm.section_img}" alt="" src="${baseUrl}/src/img/lazypic02.jpg">
                        <div class="tite">
                            <h5>${elm.title}</h5>
                        </div>
                        </a>
                        <div class="price">
                            <span>￥${elm.price}</span>
                            <input type="button" class="addCommodity" data-btnid="${elm.article_id}" value="加入购物车" style=" width: 92px;
                            height: 31px;
                            float: right;
                            margin-right: 10px;
                            background: #ED145B; border: none;
                            color: #fff;"></input>
                        </div>
                       
                    </li>
                        `


                    })
                    $(selector).append(temp);




                }
            });
        },


        addCommodity: function (selector, btn_add) {
            // var number=cookie.get('numbers');
            // $('#number').text(number);
            var number = 1;
            $(selector).on('click', btn_add, function () {
               
                var id = $(this).attr('data-btnid');
                console.log(id);

                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:8080/My_exercise/JMEI/lib/details.php",
                    data: {
                        article_id:id
                    },
                    dataType: "json",
                    success: function (res) {
                        console.log(res);

                        let temp = '';
                        res.forEach(elm => {

                            temp += `
                            <ul data_artid="${elm.article_id}">
                            <img src="${baseUrl}/src${elm.section_img}" alt="">
                            <div>
                                <p>${elm.title}</p>
                                <p>型号：${elm.type}</p></br>
                                <p>￥${elm.price} X 1</p>
                            </div>
                        </ul>
                      `
                     
                        })
                      cookie.set(`id${id}`, id, 1);
                   

                     
                        $('.shopes').append(temp);
                        $('#timer').text('购物车将在20分钟后清空，请尽快结算！').css('color','#ED145B');

                        number++;

                      
                    }
                    
                })
                console.log(number);
                 $('.settle_accounts').css('display','block');
                 $('#number').text(number);
                 cookie.set('numbers',number,1);
                 $(this).attr("disabled","disabled").attr("value","已加入购物车").css('background','#666');
            })
            
           
           
        },



        go_settleaccounts:function(selector){
            $(selector).on('click',function(){
                   
            })

        }





    }
})