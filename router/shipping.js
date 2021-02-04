const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    Router.get('/shipping/regions', (req, res) => {
        knex.select('*').from('shipping_region')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    Router.get('/shipping_regions/:id',(req,res)=>{
        knex.select(
            'shipping_id',
            'shipping_type',
            'shipping_cost',
            'shipping.shipping_region_id'
        )
        .from('shipping')
        .where('shipping.shipping_region_id',req.params.id)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{console.log(err);})
    })
}