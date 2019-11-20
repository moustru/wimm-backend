const jsonParser = require('express').json()
const users = require('./../controllers/users')
const authMiddleware = require('./../middleware/auth')

module.exports = app => {
    // login
    app.post('/auth', jsonParser, users.auth)
    app.post('/reg', jsonParser, users.reg)
}