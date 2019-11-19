let baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        replacePic: function (selector) {
           
            $('#allContent').on('click mouseover',selector, function () {
                $('#big_img').attr('src', $(selector).attr('src'));

            });


        },


        goBuy:function(selector,number){
            $('#allContent').on('click',selector,function(){
            //   location.href=`${baseUrl}/src/html/shoppingTrolley.html`;
             var amount=$(number).val();
             cookie.set('amount',amount,1);
            
            })

        },


        //   
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
                   // console.log(res);

                    let temp = '';
                    res.forEach(elm => {
                        var arr_img=JSON.parse(elm.detail_img);
                        //console.log(arr_img);
                        var arr_pic=JSON.parse(elm.detail_pic);
                        temp = `
                        <div id="detail">
                        <div class="detail_img">
                            <img src="${baseUrl}/src${arr_img.img01}" alt="" id="big_img">
                            <ul class="small_imges">
                                    <li class="s_img"><img src="${baseUrl}/src${arr_img.img01}" alt="" id="s_img01"></li>
                                    <li class="s_img"><img src="${baseUrl}/src${arr_img.img02}" alt="" id="s_img02"></li>
                                    <li class="s_img"><img src="${baseUrl}/src${arr_img.img03}" alt="" id="s_img03"></li>
                
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
                                    <p>服务:<span>质量保险</span> |<span>本商品支持7天无条件退货（拆封后不支持）</span>|<span>本商品不支持换货</span>|<span>闪电发货</span></p>
                                </li>
                                <li>
                                    <p><span>型号:</span>
                                        <input type="button" value="${elm.type}">
                                     </p>
                                </li>
                                <li>
                                   <span>数量:</span><input type="number" name="" id="" value="1">
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
                            <img src="${baseUrl}/src${arr_pic.pic01}" alt="">
                            <img src="${baseUrl}/src${arr_pic.pic02}" alt="">
                    </div>
                 </div>
                
                      `
                    })
                    $(selector).append(temp);
                    
                    


                }
            });
        },


        add_comit:function(selector, btn_add){
            // if(cookie.get('numbers')!=null&&cookie.get('numbers')!=undefined){
                var number=cookie.get('numbers');
                $('#number').text(number);
          
           
            
           // $('#number').text(number);
            //console.log(cookie.get());
            $(selector).on('click', btn_add, function () {
               
                let id = location.search.split('=')[1];
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
                       cookie.set(`id${id}`, id, 1);
                     
                        $('.shopes').append(temp);
                        $('#timer').text('购物车将在20分钟后清空，请尽快结算！').css('color','#ED145B');

                        number++;
                    }
                  
                })
                console.log(number);
                 $('.settle_accounts').css('display','block');
                 number=Number(number)+1
                 $('#number').text(number);

                 cookie.set('numbers',number,1);
                 //.attr("disabled","disabled")
                 $(this).attr("disabled","disabled").attr("value","已加入购物车").css('background','#666');
            })
        // }
        //     else{
        //         $('#number').text('0');
        //     }
        },



    }
})