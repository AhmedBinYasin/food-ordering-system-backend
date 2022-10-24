const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { Cart } = require('../models/Cart')
const {Orders} = require('../models/Orders')

// Route:1 create a new Order
router.post(
    '/CreateNew', [], async (req, res) => {
        // return errors if found
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // check if Email exist
        Cart.findOneAndDelete({ Email: req.body.Email },function(err,data){
            if (err){
                return res.json(err)

            }
            else{
                Orders.create({
                    Email: req.body.Email,
                    Name: req.body.fName+' '+req.body.mName+' '+req.body.lName,
                    Address: req.body.address+', '+req.body.city+', '+req.body.state+', '+req.body.country,
                    Zip: req.body.zip,
                    OrderPrice: String(req.body.TotalPrice),
                    MaillingAdress: req.body.addAck,
                    Cart:data
                })
                return res.json('OrderPlaced')
            }
        })
    },
)

// Route:2 get all Order
router.post(
    '/getActive', [], async (req, res) => {
        // return errors if found
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // check if Email exist
        let orders=await Orders.find()
        return res.json(orders)
    },
)


module.exports = router