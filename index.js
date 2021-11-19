// database
const mongoose = require('mongoose')
require('dotenv/config')

// express
const cors = require('cors')
const express = require('express')
const app = express()
const products = require('./routes/products')
const orders = require('./routes/orders')

// connect to database
mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed'))

// route
app.use(express.json())
app.use(cors())
app.use('/api/products', products)
app.use('/api/orders', orders)

const port = process.env.PORT || 3000;
app.listen(port,  () => console.log(`Listening on port ${port}...`))