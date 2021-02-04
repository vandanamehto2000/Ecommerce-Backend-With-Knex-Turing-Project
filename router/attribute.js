const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    Router.get('/attributes', (req, res) => {
        knex.select('*').from('attribute')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    Router.get('/attributes/:attribute_id', (req, res) => {
        knex.select('*').from('attribute')
        .where('attribute_id', req.params.attribute_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    Router.get('/attributes/values/:attribute_id', (req, res) => {
        knex('attribute_value')
        .select('attribute_value.attribute_value_id', 'attribute_value.value')
        .join('attribute', 'attribute_value.attribute_id', '=', 'attribute.attribute_id')
        .where('attribute_value.attribute_id', req.params.attribute_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    Router.get('/attributes/inProduct/:product_id', (req, res) => {
        knex('attribute')
        .select('attribute.name', 'product_attribute.attribute_value_id','attribute_value.value')
        .join('attribute_value', 'attribute_value.attribute_id', '=', 'attribute.attribute_id')
        .join('product_attribute', 'product_attribute.attribute_value_id', '=', 'attribute_value.attribute_value_id')
        .where('product_attribute.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
}
