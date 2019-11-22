//let baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

define(['jquery', 'cookie'], function ($, cookie) {
    return {

        //立即购买
        getData: function (selector) {
            var amount = cookie.get('amount');
            let id = cookie.get('id');
            

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
                    res.forEach(element => {
                        temp = `
                        <tr id="${element.article_id}">
                        <td></td>
                        <td>
                            <div>
                                <input type="checkbox" checked>
                                <img src="${baseUrl}/src${element.section_img}" alt="">
    
                            </div>
                            <b>
                                <a href="">${element.title}</a>
                            </b>
                            <br>
                            <p>容量：${element.type}</p>
                        </td>
                        <td>
                        ￥<b id="pirce">${element.price}</b>
                        </td>
                        <td>
                            <input type="number" value="${amount}" class="amount" data_count="${element.article_id}">
                        </td>
                        <td>
                        ￥<b class="sub_total">${(element.price * 1).toFixed(2)}</b>
                        </td>
                        <td>
                            <span class="glyphicon glyphicon-trash" aria-hidden="true" id="delete_btn"></span>
                        </td>
                    </tr>
                        `
                        $('#amountAll').text(amount);
                        $('#pirceAll').text((amount * element.price).toFixed(2));
                    });
                    $(selector).append(temp);


                }
            })
        },


        //用户更改商品数量后更新总个数和总价格
      
        replaceAmount: function (selector) {

          
            var pirceAll=0;
           
          var  amountAll=Number(cookie.get('numbers'));

          
            $('tbody').on('blur', selector, function () {
               
                var  input_num=Number($(this).val());
               // console.log(input_num);
                var xiaoji=$(input_num * Number($(this).parent().prev().children('#pirce').text()))[0].toFixed(2);
               // console.log();
                $(this).parent().next().children('.sub_total').text(xiaoji);//小计
                
                pirceAll=pirceAll+Number(xiaoji); 
               // console.log(pirceAll)
                amountAll+=input_num-1;
               // console.log(amountAll);

               
              
                $('#amountAll').text(amountAll);

               
                $('#pirceAll').text(pirceAll);

            });
         
           
         



        },

        //清空购物车
        clearAll: function () {
            $('#clearAll').on('click', function () {
                $('tbody').empty();
                $('#amountAll').text('0');
                $('#pirceAll').text('0.00');
                cookie.remove('id');
                cookie.remove('numbers');
                location.reload();
            })

        },


        //删除单个商品
        delete: function (selector, delete_btn) {
          
            var number = Number(cookie.get('numbers'));
            //console.log(number);
            $(selector).on('click', delete_btn, function () {
                $(delete_btn).parent().parent().remove();
                var delete_id = $(delete_btn).parent().parent().attr('id');
               // console.log(delete_id);
                var id = cookie.get('id');
                var arr = id.split(',');
                //console.log(arr);
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i] == delete_id) {
                        arr.splice(i, 1);
                    }
                }

                var str = arr.join();
                cookie.set('id', str, 1);
                if (number > 1) {
                    --number;
                    cookie.set('numbers', number, 1);
                     location.reload();   
                }
                else {
                    cookie.remove('id');
                    cookie.remove('numbers');
                    //location.reload();   
                }

            })

        },



        //点击右侧 去购物车结算
        gobuy_getData: function (selector) {
            var amount=Number(cookie.get('amount'));
            var number = cookie.get('numbers');
            var id = cookie.get('id');
            var arr = id.split(',');
            var all = 0;//总价格
            var pir = 0;//单个价格
           // var sub_total=0;
            for (var i = 0; i < arr.length - 1; i++) {
                art_id = Number(arr[i]);
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:8080/My_exercise/JMEI/lib/details.php",
                    data: {
                        article_id: art_id
                    },
                    dataType: "json",
                    success: function (res) {

                        let temp = '';
                        res.forEach(element => {
                           
                            temp += `
                                <tr id="${element.article_id}">
                                <td></td>
                                <td>
                                    <div>
                                        <input type="checkbox" checked>
                                        <img src="${baseUrl}/src${element.section_img}" alt="">
            
                                    </div>
                                    <b>
                                        <a href="">${element.title}</a>
                                    </b>
                                    <br>
                                    <p>容量：${element.type}</p>
                                </td>
                                <td>
                                ￥<b id="pirce">${element.price}</b>
                                </td>
                                <td>
                                    <input type="number" value="1" class="amount" data_count="${element.article_id}">
                                </td>
                                <td>
                                ￥<b class="sub_total">${(element.price * 1).toFixed(2)}</b>
                                </td>
                                <td>
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true" id="delete_btn"></span>
                                </td>
                            </tr>
                             `
                           // sub_total=Number(Number(element.price)*Number($('.amount').val())[0]);
                           pir = Number(element.price);


                        });
                        $(function() {
                            $("img").lazyload({effect: "fadeIn"});
                        });
                        if(cookie.get('amount')){
                             $('.amount').text(amount) ;
                        }
                        $(selector).append(temp);
                        $('#amountAll').text(number);//获取商品数量
                        all +=pir;//计算总价格
                        //console.log(all);
                      $('#pirceAll').text(all);
                     
                    }


                })
            }

















        },




    }
})