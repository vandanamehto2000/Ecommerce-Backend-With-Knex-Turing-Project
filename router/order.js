const knex = require('../connection/knex_connection')
const jwt = require('jsonwebtoken')


module.exports = (Router) => {
    Router.post('/',(req,res)=>{

       
        // var token_cookie = req.headers.cookie
        // var token = token_cookie.slice(6)
        // var verify = jwt.verify(token, 'secretkey').customer_id
        var body= {
            'shipping_id':req.body.shipping_id,
            'order_id':req.body.order_id,
            'auth_code':req.body.cart_id,
            'tax_id':req.body.tax_id,
            'created_on':new Date(),
            'shipped_on':new Date()
            // 'customer_id':verify
        }
        knex
        .select('shopping_cart.product_id','item_id','attributes','quantity','price','name')
        .from('shopping_cart')
        .join('product','product.product_id','shopping_cart.item_id')
        .where('cart_id',req.body.cart_id)
        .then((result)=>{
            // console.log(result)
            // return
            var amount=0
            product_list=[]
            if (result.length>0){
                for (i of result){
                    var dict={
                        'Item_id':i.item_id,
                        'order_id':req.body.order_id,
                        'product_id':i.product_id,
                        'attributes':i.attributes,
                        'product_name':i.name,
                        'quantity':i.quantity,
                        'unit_cost':i.price
                    }
                    product_list.push(dict)
                    
                    amount+=i.price*i.quantity
                }
                knex('order_detail').insert(product_list)
                .then(() => {

                })
                .catch((err)=>{
                    console.log(err)
                })
    
                knex.select('*').from('tax')
                .join('shipping')
                .where({'tax_id':body.tax_id, 'shipping_id':body.shipping_id})
                .then((result)=>{
                    amount+=amount*result[0].tax_percentage/100+result[0].shipping_cost;
                    body.total_amount= amount
                
                    knex('orders').insert(body)
                    .then(()=>{
                        console.log('successfully inserted') 
                    })
                    .catch((err)=>{
                        console.log(err)})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                
            }else{
                console.log('please order somthing')
            }
        })
    })


    Router.get('/customer_details',(req,res)=>{
        // var token_cookie= req.headers.cookie
        // var token=token_cookie.slice(6)
        // var verify= jwt.verify(token,process.env.secrate).customer_id

        knex.select('order_id')
        .from('orders')
        // .where('customer_id',verify)
        .then((result)=>{
            
            if (result.length>0){
                knex.select('*')
                .from('order_detail')
                .where('order_id',result[0].order_id)
                .then((result)=>{
                    var order_list=[]
                    if (result.length>0){
                        for (i of result){
                            i.subtotal= parseInt(i.quantity*i.unit_cost)
                            order_list.push(i)
                        }
                        res.send(order_list)
                    }else{
                        res.send('There is no order')
                    }
                })
            }else{
                res.send('No order updated')
            }
        })
    })


    Router.get('/order/:id',(req,res)=>{
        // var token_cookie= req.headers.cookie
        // var token=token_cookie.slice(6)
        // var verify= jwt.verify(token,process.env.secrate).customer_id
        
        knex.select('*').from('order_detail')
        .where('order_id',req.params.id)
        .then((result)=>{
            var list=[]
            if (result.length>0){
                for (i of result){
                    i.subtotal=parseInt(i.unit_cost*i.quantity);
                    list.push(i)
                }
                res.send(list)
            }else{
                res.send('somthing went wrong')
            }
        })

    })

}

