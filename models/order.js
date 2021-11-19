const Joi = require('joi')
const mongoose = require('mongoose')

const Order = mongoose.model('Orders', new mongoose.Schema({
    foodList: [{
        type: String,
        enum: ['肉排','火腿','培根','小黃瓜','洋蔥','番茄','蛋','起司','生菜','美乃滋','番茄醬','芥末'],
        required: true,
        maxlength: 10
    }],
    date: {
        type: Date, 
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true,
        max: 1000
    }
}))

function validateOrder(order) {
    const schema = Joi.object({
        foodList: Joi.array().items(Joi.string().max(10).required()),
        totalPrice: Joi.number().max(1000).required()
    })

    return schema.validate(order)
}

exports.Order = Order
exports.validate = validateOrder