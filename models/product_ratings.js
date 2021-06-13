const mongoose = require('mongoose')

const productRatingSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  rating_user:{ type: String, required: true},
  comment: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

const ProductRatingModel = mongoose.model('ProductRating', productRatingSchema)

module.exports = {
    ProductRatingModel: ProductRatingModel
}
