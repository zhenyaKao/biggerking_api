const express = require('express')
const router = express.Router()
const { Product, validate } = require('../models/product')

router.get('/', async (req, res) => {
    const products = await Product.find().sort('-price')
    res.send(products)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        stock: req.body.stock
    })

    product = await product.save()
    res.send(product)
})

router.put('/', async (req, res) => {
    // const { error } = validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    const product = await Product.findOneAndUpdate({name:req.body.name},
        {
            $inc: {stock:req.body.stock}
        },
        {
            new: true
        }
    )

    if (!product) return res.status(404).send('Product not found!')

    res.send(product)
})

module.exports = router

