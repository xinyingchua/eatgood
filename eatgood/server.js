const express = require('express');

const app = express();
const port = 3000;
// const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =======================================
//              ROUTES
// =======================================

// index
app.get('/', (req, res) => {
    res.render('recipes/index')
  })

// // new
// app.get('/products/new', productController.newForm)

// show
app.get('/show', (req, res) => {
  res.render('recipes/show')
})
// app.get('/products/:slug', productController.show)

// // create
// app.post('/products', productController.create)

// // edit
// app.get('/products/:slug/edit', productController.editForm)

// // update
// app.patch('/products/:slug', productController.update)

// // delete
// app.delete('/products/:slug', productController.delete)

// // product rating routes

// app.get('/products/:slug/ratings/new', productRatingController.newForm)

// app.post('/products/:slug/ratings', productRatingController.create)

// // users

// app.get('/users/register', guestOnlyMiddleware, userController.registerForm)

// app.post('/users/register', guestOnlyMiddleware,  userController.registerUser)

// app.get('/users/login', guestOnlyMiddleware, userController.loginForm)

// app.post('/users/login', guestOnlyMiddleware, userController.loginUser)

// app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

// app.post('/users/logout', authenticatedOnlyMiddleware, userController.logout)


// =======================================
//              LISTENER
// =======================================
// mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
//   .then(response => {
    app.listen(port, () => {
      console.log(`Biscoff Bakery app listening on port: ${port}`)
    })
//   })
