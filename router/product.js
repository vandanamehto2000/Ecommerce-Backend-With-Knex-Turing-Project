const knex = require('../connection/knex_connection')

module.exports = (Router) => {

    // get all products
    Router.get('/products', (req, res) => {
        knex('product')
        .select('product_id','name','description','price','discounted_price','thumbnail')
        .then((data) => {
            var wholeData = {
                count: data.length,
                rows: data
            }
            res.send(wholeData)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // search products
    Router.get('/:search',(req,res)=>{
        knex('product')
        .select('product_id','name','description','price','discounted_price','thumbnail')
        .where('product.name',req.params.search)
        .then((data)=>{
            var wholeData = {
                count: data.length,
                rows: data
            }
            res.send(wholeData)
        })
        .catch((err)=>{
            console.log(err);
        })
    })


    // get product by id
    Router.get('/products/:product_id', (req, res) => {
        knex.select('*').from('product')
        .where('product.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })

   
    // get a list of products of categories
    Router.get('/products/inCategory/:category_id', (req, res) => {
        knex('product').select('product.product_id',
        'product.name',
        'product.description',
        'product.price',
        'product.discounted_price',
        'product.thumbnail')
        .join('product_category', 'product_category.product_id', '=', 'product.product_id')
        .join('category', 'category.category_id', '=', 'product_category.category_id')
        .where('category.category_id', req.params.category_id)
        .then((data) => {
            var wholeData = {
                count: data.length,
                row: data
            }
            res.send(wholeData)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // get a list of products of department
    Router.get('/products/inDepartment/:department_id', (req, res) => {
        knex('product').select('product.product_id',
        'product.name',
        'product.description',
        'product.price',
        'product.discounted_price',
        'product.thumbnail')
        .join('product_category', 'product_category.product_id', '=', 'product.product_id')
        .join('category', 'category.category_id', '=', 'product_category.category_id')
        .join('department', 'department.department_id', '=', 'category.department_id')
        .where('category.department_id', req.params.department_id)
        .then((data) => {
            var wholeData = {
                count: data.length,
                row: data
            }
            res.send(wholeData)
        })
        .catch((err) => {
            res.send(err)
        })
    })
    
    
    // get details of a product
    Router.get('/products/:product_id/details', (req, res) => {
        knex('product')
        .select('product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'image',
        'image_2')
        .where('product.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })


    // get locations of a product
    Router.get('/products/:product_id/locations', (req, res) => {
        knex('product')
        .select('category.category_id',
        'category.name as category_name',
        'department.department_id',
        'department.name as department_name')
        .join('product_category', 'product_category.product_id', '=', 'product.product_id')
        .join('category', 'category.category_id', '=', 'product_category.category_id')
        .join('department', 'department.department_id', '=', 'category.department_id')
        .where('product.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })



// get reviews of a Product
    Router.get('/products/:product_id/reviews', (req, res) => {
        knex('review')
        .select('product.name',
        'review.review',
        'review.rating',
        'review.created_on'
        )
        .join('product', 'review.product_id', '=', 'product.product_id')
        .where('product.product_id', req.params.product_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })



// post reviews of a Product
    Router.post('/post/:product_id/reviews', (req, res) => {
        knex('review')
        .insert({
            review: req.body.review,
            rating: req.body.rating,
            created_on: new Date(),
            customer_id: '2',
            product_id: req.params.product_id
        })
        .where('product.product_id',req.params.product_id)
        .then(()=>{
            res.send('done')
        }).catch((err)=>{
            res.send(err)
        })
    })
}

