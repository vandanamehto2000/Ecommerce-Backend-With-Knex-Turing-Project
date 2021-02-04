const { Router } = require('express')
const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    Router.get('/tax', (req, res) => {
        knex.select('*').from('tax')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

    Router.get('/tax/:tax_id', (req, res) => {
        knex.select('*').from('tax')
        .where('tax_id', req.params.tax_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
}