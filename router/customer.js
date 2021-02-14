const knex = require('../connection/knex_connection')
const jwt = require('jsonwebtoken')
// const auth = require('./verification')

module.exports = (Router) => {
    Router.post('/customers',(req,res)=>{
        knex('customer')
        .insert({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }).then((data)=>{
            res.send('register done')
        }).catch((err)=>{
            res.send(err)
        })
    })


    Router.get('/get/customers', (req, res) => {
        knex.select('*').from('customer')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    .post('/login',(req,res)=>{
        knex.select('*').from('customer')
        .where('email',req.body.email )
        .then((data)=>{
            if(data.length>0){
                // console.log(data);
                if(data[0].password==req.body.password){
                    token= jwt.sign({'customer_id':data[0].customer_id}, 'secretkey')
                    res.cookie(token)
                    console.log({msg: '.....you have logged in successfully......', token: token})
                    res.json({msg: '.....you have logged in successfully......', token: token})
                }else{
                    res.send('password is wrong')
                }
            }
            else{
                res.send('email is wrong')
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    })


    Router.get('/get/customers/:customer_id', (req, res) => {
        knex.select('*').from('customer')
        .where('customer_id', req.params.customer_id)
        .then((data) => {
            delete data[0].password
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    Router.get('/get/customers/:customer_id', (req, res) => {
        var cookie_token = req.headers.cookie
        // console.log(cookie_token)
        var token = cookie_token.slice(6)
        var verify = jwt.verify(token, 'secretkey')
        knex.select('*').from('customer')
        .where('customer_id', req.params.customer_id)
        .then((result) => {
            if(result.length > 0){
                if(verify.email == result[0].email){
                    res.send(result)
                }
                else{
                    res.send('wrong id')
                }
            }else{
                res.send('wrong id')
            }
        })
        .catch((err) => {
            res.send(err)
        })
    })



    Router.get('/get/customers/:customer_id',(req,res)=>{
        var token = req.headers.cookie.split(' ')
        token = token[token.length - 1].slice(0,-10)
        jwt.verify(token , 'secretkey', (err,data)=>{
            if(!err){
                // knex('customer')
                // .select('*')
                knex.select('*').from('customer')
                .where('customer.customer_id',data.customer_id)
                .then((data)=>{
                            delete data[0].password
                    res.send(data)
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send(err)
            }
        })
    })

    Router.put('/customer/:customer_id', (req, res) => {
        var token = req.headers.cookie.split(' ')
        token = token[token.length - 1].slice(0, -10)
        jwt.verify(token, 'secretkey', (err, data) => {
            if(!err){
                knex('customer')
                .where('customer_id', req.params.customer_id)
                .update({
                    name: req.body.name,
                    email: req.params.email,
                    address_1: req.body.address_1,
                    address_2: req.body.address_2,
                    city: req.body.city,
                    region: req.body.region,
                    postal_code: req.body.postal_code,
                    country: req.body.country,
                    shipping_region_id: req.body.shipping_region_id,
                    day_phone: req.body.day_phone,
                    eve_phone: req.body.eve_phone,
                    mob_phone: req.body.mob_phone,
                    credit_card: req.body.credit_card
                })
                .then((data) => {
                    res.send('data updated.....')
                })
                .catch((err) => {
                    res.send(err)
                })
            }else{
                console.log(err)
            }
        })
    })

    Router.put('/address/:customer_id', (req, res) => {
        var token = req.headers.cookie.split(' ')
        token = token[token.length - 1].slice(0, -10)
        jwt.verify(token, 'secretkey', (err, data) => {
            if(!err){
                knex('customer')
                .where('customer_id', req.params.customer_id)
                .update({
                    address_1: req.body.address_1,
                    city: req.body.city,
                    region: req.body.region,
                    postal_code: req.body.postal_code,
                    country: req.body.country,
                    shipping_region_id: req.body.shipping_region_id
                })
                .then((data) => {
                    res.send('data updated....')
                })
                .catch((err) => {
                    res.send(err)
                })
            }else{
                console.log(err)
            }
        })
    })

    Router.put('/creditCard/:customer_id', (req, res) => {
        var token = req.headers.cookie.split(' ')
        token = token[token.length - 1].slice(0, -10)
        jwt.verify(token, 'secretkey', (err, data) => {
            if(!err) {
                knex('customer')
                .where('customer_id', req.params.customer_id)
                .update({
                    credit_card: req.body.credit_card
                })
                .then((data) => {
                    res.send('data updated...')
                })
                .catch((err) => {
                    res.send(err)
                })
            }else{
                console.log(err)
            }
        })
    })
      


    

}