const knex = require('../connection/knex_connection')

module.exports = (Router) => {

    // generate the unique CART ID
    Router.get('/shoppingcart/generateUniqueID', (req, res) =>{
        var genrate_value='';
        var char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i=0; i<10; i++){
            genrate_value= genrate_value+char_list.charAt(Math.floor(Math.random()*char_list.length));
        }
        res.send(genrate_value)
    })
    // FHwShoUyHN
    
    
    // Add the product in the CART
    Router.post("/shoppingcart/add", (req, res) => {
        var cart_data = {
            'cart_id': req.body.cart_id,
            'product_id': req.body.product_id,
            'attributes': req.body.attributes,
            'quantity': 1,
            'added_on': new Date()
        }
        knex
        .select('quantity')
        .from('shopping_cart')
        .where('shopping_cart.cart_id', cart_data.cart_id)
        .andWhere('shopping_cart.product_id', cart_data.product_id)
        .andWhere('shopping_cart.attributes', cart_data.attributes)
        .then((data) =>{
            // console.log('quantity', data);
            if(data.length==0){
                // for quantity
                knex('shopping_cart')
                .insert({
                    'cart_id': cart_data.cart_id,
                    'product_id': cart_data.product_id,
                    'attributes': cart_data.attributes,
                    'quantity': 1,
                    'added_on': new Date() 
                })
                .then(() =>{
                    knex
                    .select(
                        'item_id',
                        'name',
                        'attributes',
                        'shopping_cart.product_id',
                        'price',
                        'quantity',
                        'image'
                    )
                    .from('shopping_cart')
                    .join('product',function(){
                        this.on('shopping_cart.product_id','product.product_id')
                    })
                    .then(data => {
                        let datas = []
                        for (let i of data){
                            let subtotal = i.price*i.quantity;
                            i.subtotal = subtotal;
                            // console.log(i);
                            datas.push(i);
                        }
                        console.log(datas)
                        res.send(data);
                    }).catch(err => console.log(err));
                }).catch((err) => console.log(err))
            }else{
                // quantity increase
                let quantity = data[0].quantity+1;
                knex('shopping_cart')
                .update({quantity: quantity})
                .where('shopping_cart.cart_id', cart_data.cart_id)
                .andWhere('shopping_cart.product_id', cart_data.product_id)
                .andWhere('shopping_cart.attributes', cart_data.attributes)
                .then(() => {
                    knex
                    .select(
                        'item_id',
                        'name',
                        'attributes',
                        'shopping_cart.product_id',
                        'price',
                        'quantity',
                        'image'
                    )
                    .from('shopping_cart')
                    .join('product', function() {
                        this.on('product.product_id', 'shopping_cart.product_id')
                    })
                    .then(updatedata => {
                        console.log('data updated!')
    
                        let updated_list = [];
                        for (let i of updatedata){
                            let subtotal = i.price* i.quantity;
                            i.subtotal = subtotal;
                            updated_list.push(i);
                        }
                        
                        res.send(updated_list);
                    })
                    .catch(err => console.log(err));
                })
            }
        })
    })


    // Get List of Products in Shopping Cart
    Router.get('/shoppingcart/:cart_id',(req,res)=>{

        knex.select('item_id','product.name', 'attributes','product.product_id'
        ,'product.price','quantity', 'product.image')
        .from('shopping_cart')
        .join('product','product.product_id','shopping_cart.item_id')
        .where('cart_id',req.params.cart_id)
        .then((result)=>{
            result[0].subtotal=result[0].price*result[0].quantity
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)})
    })


    // Update the cart by item
    Router.put('/shoppingcart/update/:item_id', (req, res) => {
        knex('shopping_cart')
        .update({
            quantity: req.body.quantity
        })
        .where('shopping_cart.item_id', req.params.item_id)
        .then((data) => {
            console.log('update successfully')
            res.send('update successfully')
        })
        .catch((err) => {
            console.log(err)
        })
    })


    // Empty cart delete the cart by cart_id
    Router.delete('/shoppingcart/empty/:cart_id', (req, res) => {
        knex('shopping_cart')
        .where('cart_id', req.params.cart_id)
        .del()
        .then((data) => {
            console.log(data)
            res.send('deleted successfully')
        })
        .catch((err) => {
            console.log(err)
        })
    })
    

    
}

