require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { RecipeModel } = require('../models/recipes')


const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let data = [
    { name: 'Silverbeet Fatteh with Sumac Yoghurt and Chickpeas', user_id:'60c229336c84ee0ced15632f', category:'Lunch/Dinner', image: 'https://img.delicious.com.au/LC7IwDnQ/del/2020/09/silverbeet-fatteh-with-sumac-yoghurt-and-chickpeas-139202-1.jpg' },
    { name: 'Teriyaki Salmon Sushi Bowl', category:'Lunch/Dinner', user_id:'60c229336c84ee0ced15632f', image: 'https://i.pinimg.com/564x/e7/1e/89/e71e89706c20512804cbff252a91e4df.jpg' },
    { name: 'Salmon with Mango Salsa and Salsa Verde', category:'Lunch/Dinner', user_id:'60c229336c84ee0ced15632f', image: 'https://www.mygfguide.com/wp-content/uploads/2020/07/salmon-bowl-web.jpg' },
    { name: 'Blueberry Oats', category:'Breakfast',user_id:'60c229336c84ee0ced15632f', image: 'https://images.unsplash.com/photo-1567769541715-8c71fe49fd43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80' },
    { name: 'Healthy Eggs Benedict', category:'Breakfast', user_id:'60c229336c84ee0ced15632f', image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/01/Healthy-Eggs-Benedict-9.jpg' },
    { name: 'Baked Salmon with Herbs and Lemon', category:'Lunch/Dinner', user_id:'60c229336c84ee0ced15632f', image: 'https://www.willcookforsmiles.com/wp-content/uploads/2021/01/Healthy-Baked-Salmon-4.jpg' },
    { name: 'Vegan Double Chocolate Chip Cookies', category:'Dessert', user_id:'60c229336c84ee0ced15632f', image: 'https://i.pinimg.com/564x/69/03/05/6903055fb3d98fad5a21c7db45451fcb.jpg' },
    { name: 'Chicken Breast Pasta with Avocado, Tomato and Basil', user_id:'60c229336c84ee0ced15632f', category:'Lunch/Dinner', image: 'https://i.pinimg.com/564x/d9/f8/ff/d9f8ff846b0e17b231a096dab0011fca.jpg' },

]

data = data.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return RecipeModel.insertMany(data)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
      if (connection !== null) {
          connection.disconnect()
      }
  })