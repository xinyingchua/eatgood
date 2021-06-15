// DEPENDANCIES //

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const recipesController = require('./controllers/recipes_controller')
const userController = require('./controllers/user_controller')
const productRatingController = require('./controllers/product_ratings_controller')
const { setUserVarMiddleware } = require('./middlewares/auth-middleware')
const {
  authenticatedOnly: authenticatedOnlyMiddleware,
  guestOnly: guestOnlyMiddleware,
} = require('./middlewares/auth-middleware')

const app = express();
const port = process.env.PORT || 3000 // tenary operator: if process.env.PORT is not available, use port: 3000
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// SETTING VIEW ENGINE //
app.set('view engine', 'ejs')

// SETTING MIDDLEWARE //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// accept spoofed methods based on _method query parameter
app.use(methodOverride('_method'))

// set up middleware to support session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'user_session',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

// setting middleware to ensure global template user variable
app.use(setUserVarMiddleware)

// ROUTES //

app.get('/', (req,res) => {
  res.redirect('/recipes')
})

// index
  app.get('/recipes/', recipesController.index)

// new
app.get('/recipes/new', recipesController.newForm)

// show
app.get('/recipes/:slug', recipesController.show)


// create
app.post('/recipes', recipesController.create)

// edit
app.get('/recipes/:slug/edit', recipesController.editForm)

// update
app.patch('/recipes/:slug', recipesController.update)

// delete
app.delete('/recipes/:slug', recipesController.delete)

// product rating routes

app.post('/recipes/:slug/ratings', productRatingController.create)

// users


app.get('/users/register', guestOnlyMiddleware, userController.registerForm)

app.post('/users/register', guestOnlyMiddleware, userController.registerNewUser)

app.get('/users/login', userController.loginForm)

app.post('/users/login', userController.loginUser)

app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

app.post('/users/logout', authenticatedOnlyMiddleware, userController.logout)



//  LISTENER // 

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`Eatgood app listening on port: ${port}`)
    })
  })
