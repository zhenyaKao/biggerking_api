const Joi = require('joi')
const mongoose = require('mongoose')


const Product = mongoose.model('Product', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 10
    },
    price: {
        type: Number,
        required: true,
        max: 30
    },
    img: {
        type: String,
        required: true,
        maxlength: 20
    },
    stock: {
        type: Number,
        default: 0,
        max: 5
    }
}))

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().max(10).required(),
        price: Joi.number().max(30).required(),
        img: Joi.string().max(20).required(),
        stock: Joi.number().max(5)
    })

    return schema.validate(product)
}

exports.Product = Product
exports.validate = validateProduct