const mongoose = require('mongoose')
const { Schema } = mongoose

const foodSchema = new Schema({
    Email: {
        type: String,
        required: true,
    },
    ResturantName: {
        type: String,
        required: true,
    },
    FoodName: {
        type: String,
        required: true,
    },
    ServingDiscription: {
        type: String,
        required: true,
    },
    Price: {
        price: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        }
    },
    Image: {
        type: String,
    },
})

const Food = mongoose.model('food', foodSchema)
module.exports = Food
