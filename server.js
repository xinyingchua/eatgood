// =======================================
//              DEPENDANCIES
// =======================================

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const recipesController = require('./controllers/recipes_controller')
const userController = require('./controllers/user_controller')
const app = express();
const port = 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// set view engine
app.set('view engine', 'ejs')

// set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// accept spoofed methods based on _method query parameter
app.use(methodOverride('_method'))


// =======================================
//              ROUTES
// =======================================

// index
  app.get('/recipes/', recipesController.index)

// new
// app.get('/products/new', productController.newForm)

// show
app.get('/recipes/:slug', recipesController.show)


// // create
// app.post('/products', productController.create)

// edit
app.get('/recipes/:slug/edit', recipesController.editForm)

// update
app.patch('/recipes/:slug', recipesController.update)

// delete
app.delete('/recipes/:slug', recipesController.delete)

// // product rating routes

// app.get('/products/:slug/ratings/new', productRatingController.newForm)

// app.post('/products/:slug/ratings', productRatingController.create)

// users

// app.get('/users/register', guestOnlyMiddleware, userController.registerForm)

app.get('/users/register', userController.registerForm)

// app.post('/users/register', guestOnlyMiddleware,  userController.registerUser)

app.get('/users/login', userController.loginForm)

// app.post('/users/login', guestOnlyMiddleware, userController.loginUser)

// app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

// app.post('/users/logout', authenticatedOnlyMiddleware, userController.logout)


// =======================================
//              LISTENER
// =======================================
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`Eatgood app listening on port: ${port}`)
    })
  })
