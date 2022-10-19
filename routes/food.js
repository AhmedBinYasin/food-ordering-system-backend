const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Restaurant = require('../models/Restaurants')
const upload=require('../middleware/upload')
const Food = require('../models/Food')

// Route:1 create a new Food
router.post(
    '/CreateNew',upload.single('file'),async (req, res) => {
      // return errors if found
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      // check if Email exist
      let restaurant = await Food.findOne({ FoodName: req.body.FoodName })
      if (restaurant == null) {
        Food.create({
          Email: req.body.Email,
          ResturantName: req.body.ResturantName,
          FoodName: req.body.FoodName,
          ServingDiscription: req.body.ServingDiscription,
          Price: {price:req.body.Price,currency:req.body.Currency},
          Image: req.file.filename,
        })
        return res.json('success')
      } else {
        return res.status(400).json({ error: 'name already exist' })
      }
    },
  )

  // Route:1 get all food items Food
  router.post(
    '/getFood',[],async (req, res) => {
      // return errors if found
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      // check if Email exist
      let food = await Food.find().sort({"ResturantName": 1})
      return res.json(food)
    },
  )


  router.post('/Remove', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    await Food.deleteOne({FoodName: req.body.Name})
    return res.json('success')
  })


  module.exports = router