const mongoose = require('mongoose')
const { Schema } = mongoose

const restaurantSchema = new Schema({
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
    Country: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Zip: {
        type: String,
        required: true,
    },
    OpeningTime: {
        time:{
            type: String,
        required: true,
        },
        AMPM:{
            type: String,
        required: true,
        },
    },
    ClosingTime: {
        time:{
            type: String,
        required: true,
        },
        AMPM:{
            type: String,
        required: true,
        },
    },
    Image: {
        type: String,
    },
})

const Restaurant = mongoose.model('restaurant', restaurantSchema)
module.exports = Restaurant
