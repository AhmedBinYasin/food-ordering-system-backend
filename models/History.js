const mongoose = require('mongoose')
const { orderSchema } = require('./Orders')
const { Schema } = mongoose

const historySchema = new Schema({
    Date: {
        type: Date,
        default: new Date
    },
    Order: {
        type:orderSchema,
        required: true,
    }
})

const Orders = mongoose.model('order', orderSchema)
module.exports = Orders
