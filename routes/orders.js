const express = require('express')
const router = express.Router()
const { Order, validate } = require('../models/order')

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-date')
    res.send(orders)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    let order = new Order({
        foodList: req.body.foodList,
        totalPrice: req.body.totalPrice
    })

    order = await order.save()
    res.send(order)
})


module.exports = router

