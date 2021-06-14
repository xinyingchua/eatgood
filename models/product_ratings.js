const mongoose = require('mongoose')

const productRatingSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user_id:{ type: String, required: true}, // change to user_id // google mongodb indexes multiple properties //
  comment: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

// to have an option to load user model when we use product rating model
// use virtual if you have collection that is dependent on another
productRatingSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id', // property that we use to search for users
  foreignField: '_id',
  justOne: true // mongo to return one result 

})

productRatingSchema.set('toObject', {virtuals:true}) // whenever product rating model is called, virtual will show


const ProductRatingModel = mongoose.model('ProductRating', productRatingSchema)

module.exports = {
    ProductRatingModel: ProductRatingModel
}
