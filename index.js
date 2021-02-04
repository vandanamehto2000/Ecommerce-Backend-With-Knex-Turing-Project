const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = express.Router()
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use('/', router)

require('./router/department')(router)
require('./router/category')(router)
require('./router/attribute')(router)
require('./router/product')(router)
require('./router/customer')(router, jwt)
require('./router/verification')(router, jwt)
require('./router/order')(router, jwt)
require('./router/shipping')(router)
require('./router/tax')(router)
require('./router/shopping')(router)




app.listen(8000, () => {
    console.log('server started on port 80000')
})


