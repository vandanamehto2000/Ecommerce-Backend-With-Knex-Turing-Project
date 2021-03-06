const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    // Get all Taxes
    Router.get('/', (req, res) => {
        knex.select('*').from('tax')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
    
    
    
    // Get Tax by ID    
    Router.get('/tax/:tax_id', (req, res) => {
        knex.select('*').from('tax')
        .where('tax.tax_id', req.params.tax_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
}