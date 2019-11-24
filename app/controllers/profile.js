const mongoose = require('mongoose')
const User = mongoose.model('User')

const getInfo = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, result) => {
    if(err) return res.status(500).json({ message: err.message })
    return res.send({
      login: result.login,
      email: result.email,
      createdAt: result.createdAt
    })
  })
}

module.exports = {
  getInfo
}