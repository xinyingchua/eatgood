const mongoose = require ('mongoose')

const recipeSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  })
  
  const RecipeModel = mongoose.model('Recipe', recipeSchema)
  
  module.exports = {
    RecipeModel: RecipeModel
  }
  