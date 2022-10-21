const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { Cart } = require('../models/Cart')

//Route:1 Add to Cart
router.post('/Add', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let restaurantFound = false
    let foundIndexRestaurant
    let itemFound = false
    let foundIndexItem
    //check if Email exist
    let cart = await Cart.findOne({ Email: req.body.Email })
    console.log(req.body)
    if (!cart) {
        Cart.create({
            Email: req.body.Email,
            Restaurent: req.body.Restaurent[0],
        })
        return res.json( 'Item Added' )
    }
    else {
        for (let i = 0; i < cart.Restaurent.length; i++) {
            if (cart.Restaurent[i].RestaurentName == req.body.Restaurent[0].RestaurentName) {
                restaurantFound = true
                foundIndexRestaurant = i
                break
            }
        }
        if (!restaurantFound) {
            cart.Restaurent.push(req.body.Restaurent[0])
            cart.save(function (err) {
                if (err) {
                    console.error('ERROR!')
                }
            })
            return res.json( 'Item Added' )
        }
        else {
            for (let i = 0; i < cart.Restaurent[foundIndexRestaurant].ItemList.length; i++) {
                if (cart.Restaurent[foundIndexRestaurant].ItemList[i].FoodName == req.body.Restaurent[0].ItemList[0].FoodName) {
                    itemFound = true
                    foundIndexItem = i
                    break
                }
            }
            if (!itemFound) {
                cart.Restaurent[foundIndexRestaurant].ItemList.push(req.body.Restaurent[0].ItemList[0],)
                cart.save(function (err) {
                    if (err) {
                        console.error('ERROR!')
                    }
                })
                return res.json( 'Item Added' )
            }
            else {
                cart.Restaurent[foundIndexRestaurant].ItemList[foundIndexItem].quantity = parseInt(cart.Restaurent[foundIndexRestaurant].ItemList[foundIndexItem].quantity,) + parseInt(req.body.Restaurent[0].ItemList[0].quantity)
                cart.save(function (err) {
                    if (err) {
                        console.error('ERROR!')
                    }
                })
                return res.json( 'Item Added' )
            }
        }
    }
})

//Route:2 Remove from Cart
router.post('/Remove', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let restaurantFound = false
    let foundIndexRestaurant
    let itemFound = false
    let foundIndexItem
    //check if Email exist
    let cart = await Cart.findOne({ Email: req.body.Email })
    if (!cart) { }
    else {
        for (let i = 0; i < cart.Restaurent.length; i++) {
            if (cart.Restaurent[i].RestaurentName == req.body.Restaurent[0].RestaurentName) {
                restaurantFound = true
                foundIndexRestaurant = i
                break
            }
        }
        if (!restaurantFound) { }
        else {
            for (let i = 0; i < cart.Restaurent[foundIndexRestaurant].ItemList.length; i++) {
                if (cart.Restaurent[foundIndexRestaurant].ItemList[i].FoodName == req.body.Restaurent[0].ItemList[0].FoodName) {
                    itemFound = true
                    foundIndexItem = i
                    break
                }
            }
            if (!itemFound) { }
            else {
                if (parseInt(cart.Restaurent[foundIndexRestaurant].ItemList[foundIndexItem].quantity,) - parseInt(req.body.Restaurent[0].ItemList[0].quantity) > 0) {
                    cart.Restaurent[foundIndexRestaurant].ItemList[foundIndexItem].quantity = parseInt(cart.Restaurent[foundIndexRestaurant].ItemList[foundIndexItem].quantity,) - parseInt(req.body.Restaurent[0].ItemList[0].quantity)
                    cart.save(function (err) {
                        if (err) {
                            console.error('ERROR!')
                        }
                    })
                    return res.json('Item Removed')
                }
                else {
                    if (cart.Restaurent[foundIndexRestaurant].ItemList.length > 1) {
                        cart.Restaurent[foundIndexRestaurant].ItemList.splice(cart.Restaurent[foundIndexRestaurant].ItemList.indexOf(req.body.Restaurent[0].ItemList[0],), 1,)
                        cart.save(function (err) {
                            if (err) {
                                console.error('ERROR!')
                            }
                        })
                        return res.json('Item Removed')
                    }
                    else {
                        if (cart.Restaurent.length > 1) {
                            cart.Restaurent.splice(cart.Restaurent.indexOf(req.body.Restaurent[0]), 1,)
                            cart.save(function (err) {
                                if (err) {
                                    console.error('ERROR!')
                                }
                            })
                            return res.json('Item Removed')
                        }
                        else {
                            await Cart.findByIdAndDelete(cart._id)
                            return res.json('Item Removed')
                        }
                    }
                }
            }
        }
    }
})

//Route:3 View Cart
router.post('/ViewCart', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return Catalog
    let cart = await Cart.findOne({ Email: req.body.Email })
    return res.json(cart)
  })



module.exports = router