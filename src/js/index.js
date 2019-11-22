var baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

define(['jquery', 'cookie','lazy'], function ($, cookie,lazy) {
    return {

        //登录或获取用户名
        setUsername: function (selector) {

            // $(selector).on('load', function () {
            if (cookie.get('user_name') != null && cookie.get('user_name') != '') {
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



        //点击退出后清除用户名cookie
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


        //获取商品数据渲染页面
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
                    $(function() {
                        $("img").lazyload({effect: "fadeIn"});
                    });




                }
            });
        },

        //点击加入购物车
        addCommodity: function (selector, btn_add) {
            // console.log(cookie.get('id'));
            var str_id = '';//商品id
            var number = 0;//商品个数
            //var arr = [];

            $(selector).on('click', btn_add, function () {
                var id = $(this).attr('data-btnid');
                str_id += `${id},`;
                number++;
                // if (cookie.get('id') == undefined) {

                //     str_id = `${id},`;
                //     console.log(str_id);
                //     cookie.set("id", str_id, 1);

                //     $(this).attr("disabled", "disabled").attr("value", "已加入购物车").css('background', '#666');//添加后不能再点击
                //     $('#number').text(number);
                //     //  alert('商品已成功添加到购物车！')
                //     number++;

                // }
                // else {
                //     str_id = cookie.get('id');
                //     arr = str_id.split(',');
                //     var tem;
                //     for (var i = 0; i < arr.length - 1; i++) {
                //         if (id != arr[i]) {
                //             str_id += `${id},`

                //         }
                //     }
                //     console.log(str_id);
                //     cookie.set("id", str_id, 1);
                //     cookie.set('numbers', number, 1);//保存数量cookie
                //     // $('.settle_accounts').css('display', 'block');
                //     //alert('商品已成功添加到购物车！')
                //     $('#number').text(number);
                //     $(this).attr("disabled", "disabled").attr("value", "已加入购物车").css('background', '#666');//添加后不能再点击


                // }
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:8080/My_exercise/JMEI/lib/details.php",
                    data: {
                        article_id: id
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
                        });
                        $('.shopes').append(temp);
                        $('.settle_accounts').css('display', 'block');
                        $('#timer').text('购物车将在20分钟后清空，请尽快结算！').css('color', '#ED145B');
                    }
                })
                $('#number').text(number);
                $(this).attr("disabled", "disabled").attr("value", "已加入购物车").css('background', '#666');//添加后不能再点击
                cookie.set("id", str_id, 1);
                cookie.set('numbers', number, 1);//保存数量cookie
            })
        },









        go_settleaccounts: function (selector) {
            $(selector).on('click', function () {


            })

        },





    }
})