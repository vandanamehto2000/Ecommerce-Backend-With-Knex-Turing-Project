const env = require('dotenv').config()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.host,
        user: process.env.username,
        password: process.env.password,
        database: process.env.database_name
    }
})

module.exports = knex;
