const connectToMongo=require('./db')
const express = require('express')
const cors = require("cors")

connectToMongo()
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/restaurant',require('./routes/restaurants'))
app.use('/api/food',require('./routes/food'))
app.use('/api/catalogeLists',require('./routes/catalogeLists'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/order',require('./routes/orders'))


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})