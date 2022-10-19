const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  Email: {
    type: String,
    required: true,
  },
  Restaurent: [
    {
      RestaurentName: {
        type: String,
        required: true,
      },
      ItemList: [
        {
          FoodName: {
            type: String,
            required: true,
          },
          Price: {
            type: String,
            required: true,
          },
          Curruncy: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
})

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart