const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Food = require('../models/Food')
const Restaurant = require('../models/Restaurants')

//Route:1 Get Catalog
router.post('/ViewCatalog', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //return Catalog
  let restaurants = await Restaurant.find()
  let food = await Food.find()
  let restaurantList = []
  for (let i = 0; i < restaurants.length; i++) {
    restaurantList.push(
      {
        Email: restaurants[i].Email,
        Name: restaurants[i].Name,
        Address: restaurants[i].Address,
        Country: restaurants[i].Country,
        State: restaurants[i].State,
        City: restaurants[i].City,
        Zip: restaurants[i].Zip,
        OpeningTime: restaurants[i].OpeningTime,
        ClosingTime: restaurants[i].ClosingTime,
        FoodItems: food.filter(food => food.ResturantName == restaurants[i].Name),
        Image: restaurants[i].Image,
      }
    )
    //restaurantList.push({...restaurants[i],FoodItems:food.filter(food => food.ResturantName == restaurants[i].Name)})
  }
  return res.json(restaurantList)
})

// //Route:1 Delete Catalogue Item
// router.post('/DeleteItem', [], async (req, res) => {
//   //return errors if found
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   let catalog = await Catalogue.findOne({ CatagoryName: req.body.CatagoryName })
//   catalog.ItemList.splice(catalog.ItemList.indexOf(req.body.Id), 1)
//   catalog.save(function (err) {
//     if (err) {
//       console.error('ERROR!')
//     }
//   })
//   return res.json('Sucessfull')
// })

// //Route:1 Add Catalogue Item
// router.post('/AddItem', upload.single('image'), async (req, res) => {
//   //return errors if found
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   let catalog = await Catalogue.findOne({ CatagoryName: req.body.Category })
//   if (!catalog) {
//     let allcatalog = await Catalogue.find()
//     let catalogLength = allcatalog.length - 1
//     let lastAssignedID =
//       allcatalog[catalogLength].ItemList[
//         allcatalog[catalogLength].ItemList.length - 1
//       ].Id
//     let itemId = '0' + String(Number(lastAssignedID) + 10)
//     Catalogue.create({
//       CatagoryName: req.body.Category,
//       ItemList: [
//         {
//           Id: itemId,
//           Name: req.body.Name,
//           Price: req.body.Price,
//           img: '/assets/' + req.file.filename,
//         },
//       ],
//     })
//   } else {
//     let itemId =
//       '0' + String(Number(catalog.ItemList[catalog.ItemList.length - 1].Id) + 1)
//     catalog.ItemList.push({
//       Id: itemId,
//       Name: req.body.Name,
//       Price: req.body.Price,
//       img: '/assets/' + req.file.filename,
//     })
//     catalog.save(function (err) {
//       if (err) {
//         console.error('ERROR!')
//       }
//     })
//   }

//   return res.json('Sucessfull')
// })

module.exports = router
