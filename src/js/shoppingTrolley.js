let baseUrl = "http://127.0.0.1:8080/My_exercise/JMEI";

define(['jquery','cookie'], function ($,cookie) {
    return {
        getData: function (selector) {
            var amount=cookie.get('amount');
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
                    res.forEach(element => {
                        temp = `
                        <tr>
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
                            <input type="number" value="${amount}" id="amount">
                        </td>
                        <td>
                        ￥<b id="sub_total">${(element.price*amount).toFixed(2)}</b>
                        </td>
                        <td>
                            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </td>
                    </tr>
                        `
                        $('#amountAll').text(amount);
                        $('#pirceAll').text((amount*element.price).toFixed(2));
                    });
                    $(selector).append(temp);
                  
                }
            })
        },



        replaceAmount:function(selector,pirce,sub_total){
           $('table').on('blur',selector,function(){
                 $(sub_total).text($(selector).val()*$(pirce).text());
                 $('#amountAll').text($(selector).val());
                 $('#pirceAll').text($(selector).val()*$(pirce).text());

            })
           
        },

        clearAll:function(){
            $('#clearAll').on('click',function(){
                $('tbody').empty();
                $('#amountAll').text('0');
                $('#pirceAll').text('0.00');
            })

        }


       
    }
})