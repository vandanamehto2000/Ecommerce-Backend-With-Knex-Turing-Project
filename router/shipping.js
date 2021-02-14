const knex = require('../connection/knex_connection')

module.exports = (Router) => {

    // get shippings regions
    Router.get('/shipping/regions', (req, res) => {
        knex.select('*').from('shipping_region')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


     // Return shippings regions
    Router.get('/shipping_regions/:shipping_region_id',(req,res)=>{
        knex.select('*').from('shipping')
        .where('shipping.shipping_region_id',req.params.shipping_region_id)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{console.log(err);})
    })
}