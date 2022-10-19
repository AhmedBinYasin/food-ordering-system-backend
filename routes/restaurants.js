const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Restaurant = require('../models/Restaurants')
const upload=require('../middleware/upload')

// Route:1 create a new Restauran
router.post(
    '/CreateNew',upload.single('file'),async (req, res) => {
      // return errors if found
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      // check if Email exist
      let restaurant = await Restaurant.findOne({ Name: req.body.Name })
      if (restaurant == null) {
        Restaurant.create({
          Email: req.body.Email,
          Name: req.body.Name,
          Address: req.body.Address,
          Country: req.body.Country,
          State: req.body.State,
          City: req.body.city,
          ZIP: req.body.Zip,
          OpeningTime: {time:req.body.OpeningTimeTime,AMPM:req.body.OpeningTimeAMPM},
          ClosingTime: {time:req.body.ClosingTimeTime,AMPM:req.body.ClosingTimeAMPM},
          Image: req.file.filename,
        })
        return res.json('success')
      } else {
        return res.status(400).json({ error: 'Restaurant already exist' })
      }
    },
  )


  //Route:2 Get AllRestarants
router.post('/ViewAll', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    let bioData = await Restaurant.find()
    return res.json(bioData)
  })

    //Route:2 Search Restarants
router.post('/Search', [
  body('Name', 'Name cannot be blank').exists(),
], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //return BioData
  let restaurant = await Restaurant.findOne({Name: req.body.Name})
  if (restaurant == null) {return res.json('Not Found')}
  return res.json(restaurant)
})

  router.post('/Remove', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    await Restaurant.deleteOne({Name: req.body.Name})
    return res.json('success')
  })



  module.exports = router