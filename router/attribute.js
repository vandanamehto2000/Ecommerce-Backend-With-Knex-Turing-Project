const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    // get attribute data
    Router.get('/attributes', (req, res) => {
        knex.select('*').from('attribute')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // get attribute list by attribute_id
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


    // get Values attribute from atributes
    Router.get('/attributes/values/:attribute_id', (req, res) => {
        knex('attribute_value')
        .select('attribute_value.attribute_value_id', 'attribute_value.value')
        .join('attribute', 'attribute_value.attribute_id', '=', 'attribute.attribute_id')
        .where('attribute.attribute_id', req.params.attribute_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // get all attributes with product_id;
    Router.get('/attributes/inProduct/:product_id', (req, res) => {
        knex('attribute')
        .select('attribute.name as attribute_name', 'product_attribute.attribute_value_id', 'attribute_value.value as attribute_value')
        .join('attribute_value', 'attribute.attribute_id', '=', 'attribute_value.attribute_id')
        .join('product_attribute', 'attribute_value.attribute_value_id', '=', 'product_attribute.attribute_value_id')
        .where('product_attribute.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

}
