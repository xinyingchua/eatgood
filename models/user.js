const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, max: 100 },
    hash: { type: String, required: true },
    first_name: { type: String, required: false, max: 100 },
    created_at: { type: Date },
    updated_at: { type: Date },
  })
  
  const UserModel = mongoose.model('User', userSchema)
  
  module.exports = {
    UserModel: UserModel
  }
  