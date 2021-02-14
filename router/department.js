const knex = require('../connection/knex_connection')

module.exports = (Router) => {
    // get departments data
    Router.get('/department', (req, res) => {
        knex.select('*').from('department')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // get departments data by {department_id}
    Router.get('/department/:department_id', (req, res) => {
        knex.select('*').from('department')
        .where('department_id', req.params.department_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
}







