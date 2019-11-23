const mongoose = require('mongoose')

const transactionScheme = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: false
  },

  createdAt: {
    type: Number,
    required: true,
    unique: false
  },

  money: {
    type: Number,
    required: true,
    unique: false
  },

  category: {
    type: String,
    required: true,
    unique: false
  },

  comment: {
    type: String,
    required: false,
    unique: false
  }
})

mongoose.model('Transaction', transactionScheme)