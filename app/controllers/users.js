const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = mongoose.model('User')

const auth = (req, res) => {
  if(!req.body) return res.sendStatus(400)

  const { login, password } = req.body

  User.findOne({ login }, (err, response) => {
    if(err) return res.status(400).json('Bad request')

    if(!response) {
      return res.status(401).send({
        type: 'USER_NOT_FOUND',
        message: 'Пользователь не найден'
      })
    } else {
      const isValid = bCrypt.compareSync(password, response.password)

      if(isValid) {
        const token = jwt.sign(response._id.toString(), process.env.SECRET_KEY)
        return res.json({ token, login: response._id })
      } else {
        return res.status(401).json('Неправильный логин/пароль')
      }
    }
  })
}

const reg = (req, res) => {
  if(!req.body || !req.body.login) return res.sendStatus(400)

  const salt = bCrypt.genSaltSync(10)
  const { login, email, password } = req.body

  User.create({
    login,
    email,
    password: bCrypt.hashSync(password, salt),
    createdAt: new Date().getTime()
  }, (err, results) => {
    if(err) return res.status(400).json({ message: 'Bad request' })

    if(results) {
      const token = jwt.sign(results._id.toString(), process.env.SECRET_KEY)
      return res.json({
        id: results.insertedId,
        token,
        login
      })
    } else {
      return res.status(400).json({ message: 'Bad request' })
    }
  })
}

module.exports = {
  auth,
  reg
}