const mongoose = require('mongoose')
const User = mongoose.model('User')

const getInfo = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, result) => {
    if(err) return res.status(500).json({ message: err.message })
    
    const { login, email, createdAt } = result
    return res.send({ login, email, createdAt })
  })
}

module.exports = {
  getInfo
}