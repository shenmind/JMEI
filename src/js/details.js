//let baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

define(['jquery', 'cookie', 'index','lazy'], function ($, cookie, index,lazy) {
    return {
        //图片切换
        replacePic: function (selector) {

            $('#allContent').on('click mouseover', selector, function () {
                $('#big_img').attr('src', $(selector).attr('src'));

            });


        },

        //立即购买
        goBuy: function (selector, input_amount) {
            $('#allContent').on('click', selector, function () {
                let id = location.search.split('=')[1];
                if (cookie.get('id') != null) {
                    //获取添加到了购物车的商品id,并和当前商品id比较，点击立即购买时，没有则添加到id cookie
                    var tep;
                    var str = cookie.get('id');
                    var arr = str.split(',');
                    for (var i = 0; i < arr.length - 1; i++) {
                        if (arr[i] != id) {
                            tep = `${id},`;
                        } else {

                        }
                        console.log(str);
                    }
                    str += tep;
                    cookie.set("id", str, 1);

                } else {
                    cookie.set("id", id, 1);
                }


                //获取当前商品数量
                var amount = $(input_amount).val();
                cookie.set('amount', amount, 1);





                //获取商品种类个数，没有则加一
                var number = cookie.get('numbers');
                number = Number(number) + 1
                cookie.set('numbers', number, 1);

            })

        },


        //   获取数据渲染商品详情页
        showdata: function (selector) {

            let id = location.search.split('=')[1];


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
                        var arr_img = JSON.parse(elm.detail_img);
                        console.log(arr_img);
                        var arr_pic = JSON.parse(elm.detail_pic);
                        // var arr_pic02 = JSON.parse(elm.detail_pic02);
                        // var arr_pic03 = JSON.parse(elm.detail_pic03);
                        temp = `
                        <div id="detail">
                        <div class="detail_img">
                            <img data-original="${baseUrl}/src${arr_img.img01}" alt="" id="big_img">
                            <ul class="small_imges">
                                    <li class="s_img"><img data-original="${baseUrl}/src${arr_img.img01}" alt="" id="s_img01" src="../img/lazypic02.jpg"></li>
                                    <li class="s_img"><img data-original="${baseUrl}/src${arr_img.img02}" alt="" id="s_img02" src="../img/lazypic02.jpg"></li>
                                    <li class="s_img"><img data-original="${baseUrl}/src${arr_img.img03}" alt="" id="s_img03" src="../img/lazypic02.jpg"></li>
                
                            </ul>
                        </div>
                        <div class="detail_mess">
                            <ul class="small_mess">
                                <li>
                                    <b>${elm.title}</b>
                                </li>
                                <li><b>￥${elm.price}</b></li>
                                <li>
                                   <p>运费:<b>&nbsp;新人包邮&nbsp;</b><span>月销${elm.sales}</span></p>
                                    
                                </li>
                                <li>
                                    <p>服务:<span>质量保险</span> |<span>本商品支持7天无条件退货（拆封后不支持）</span>|<span>本商品不支持换货</span></p>
                                </li>
                                <li>
                                    <p><span>型号:</span>
                                        <input type="button" value="${elm.type}">
                                     </p>
                                </li>
                                <li>
                                   <span>数量:</span><input type="number" name="" id="input_amount" value="1">
                                </li>
                                <li>
                                   <p> 
                                   <a href="${baseUrl}/src/html/shoppingTrolley.html?id=${elm.article_id}"> 
                                   <input type="button" value="立即购买" id="gobuy_btn"></a>
                                    <input type="button" value="加入购物车" id="add_comit"></p>
                                </li>
                                <li>
                                    <p>本商品由<a href="#">第三方国际</a>直接发货并提供售后服务，您在购买过程中有任何疑问可咨询聚美客服。</p>
                                </li>
                
                            </ul>
                
                        </div>
                </div>

                
                    <div id="allpic">
                    <div class="pic_title">
                        
                    </div>
                    <div class="pices">
                            <img data-original="${baseUrl}/src${arr_pic.pic01}" alt="">
                            <img data-original="${baseUrl}/src${arr_pic.pic02}" alt="">
                            <img data-original="${baseUrl}/src${arr_pic.pic03}" alt="">
                            <img data-original="${baseUrl}/src${arr_pic.pic04}" alt="">
                           
                    </div>
                 </div>
                
                      `
                    })
                    $(selector).append(temp);

                    $(function() {
                        $("img").lazyload({effect: "fadeIn"});
                    });

                    // <img data-original="${baseUrl}/src${arr_pic02.pic05}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic02.pic06}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic02.pic07}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic02.pic08}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic03.pic09}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic03.pic10}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic03.pic11}" alt="">
                    // <img data-original="${baseUrl}/src${arr_pic03.pic12}" alt="">


                }
            });
        },

        //详情页点击加入购物车，小购物车添加
        add_comit: function (selector, btn_add) {
            var number = cookie.get('numbers');
            $('#number').text(number);
            $(selector).on('click', btn_add, function () {
                if(cookie.get('id')!=null){

              
                var tep;
                var str = cookie.get('id');
                 var arr = str.split(',');
                let id = location.search.split('=')[1];
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i] != id) {
                        tep = `${id},`;
                    }
                }
                str += tep;
                cookie.set("id", str, 1);
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
                            <ul>
                            <img src="${baseUrl}/src${elm.section_img}" alt="">
                            <div>
                                <p>${elm.title}</p>
                                <p>型号：${elm.type}</p></br>
                                <p>￥${elm.price} X 1</p>
                            </div>
                        </ul>
                      `
                        })
                        $('.shopes').append(temp);
                        $('#timer').text('购物车将在20分钟后清空，请尽快结算！').css('color', '#ED145B');
                        number++;
                    }
                })
                console.log(number);
                $('.settle_accounts').css('display', 'block');
                number = Number(number) + 1
                $('#number').text(number);
                cookie.set('numbers', number, 1);
                $(this).attr("disabled", "disabled").attr("value", "已加入购物车").css('background', '#666');
            }

            else{

                let id = location.search.split('=')[1];
                cookie.set('id',id,1);
                cookie.set('amount',$('#input_amount').val(),1);
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
                            <ul>
                            <img src="${baseUrl}/src${elm.section_img}" alt="">
                            <div>
                                <p>${elm.title}</p>
                                <p>型号：${elm.type}</p></br>
                                <p>￥${elm.price} X 1</p>
                            </div>
                        </ul>
                      `
                        })
                        $('.shopes').append(temp);
                        $('#timer').text('购物车将在20分钟后清空，请尽快结算！').css('color', '#ED145B');
                        number++;
                    }
                })
                console.log(number);
                $('.settle_accounts').css('display', 'block');
               // number = Number(number) + 1
                $('#number').text(1);
                cookie.set('numbers', 1, 1);
                $(this).attr("disabled", "disabled").attr("value", "已加入购物车").css('background', '#666');
           
            }
            })
        },



    }
})