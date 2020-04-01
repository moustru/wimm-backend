const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  createdAt: {
    type: Number,
    required: true,
    unique: false
  }
})

mongoose.model('User', userSchema)