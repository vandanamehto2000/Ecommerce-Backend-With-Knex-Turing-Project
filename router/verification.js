const knex = require('../connection/knex_connection')
const jwt = require('jsonwebtoken')

module.exports = (Router) => {
    Router.get('/get/verify', (req, res) => {
        var token = req.headers.cookie.split(' ')
        // console.log(token)
        token = token[token.length - 1].slice(0, -10)
        // console.log(token)
        jwt.verify(token, 'secretkey', (err, data) => {
            if(err) {
                console.log(err)
            }else{
                console.log(data)
            }
        })
        
    })
}