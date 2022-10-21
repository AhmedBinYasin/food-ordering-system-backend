const mongoose = require('mongoose')
const { cartSchema } = require('./Cart')

const { Schema } = mongoose

const orderSchema = new Schema({
    Email: {
      type: String,
      required: true,
    },
      Name: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      },
      Zip: {
        type: String,
        required: true,
      },
      OrderPrice: {
        type: String,
        required: true,
      },
      MaillingAdress: {
        type: Boolean,
        required: true,
      },
    Cart: {
        type: cartSchema,
        required:true
    }
  })
  
  const Orders = mongoose.model('order', orderSchema)
  module.exports = Orders
  