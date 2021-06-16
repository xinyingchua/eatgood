const mongoose = require ('mongoose')

const recipeSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  })


// to have an option to load user model when we use product rating model
// use virtual if you have collection that is dependent on another
recipeSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id', // property that we use to search for users
  foreignField: '_id',
  justOne: true // mongo to return one result 

})

recipeSchema.set('toObject', {virtuals:true}) // whenever recipe model is called, virtual will show
  
  const RecipeModel = mongoose.model('Recipe', recipeSchema)
  
  module.exports = {
    RecipeModel: RecipeModel
  }
  