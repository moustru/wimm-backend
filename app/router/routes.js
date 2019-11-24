const jsonParser = require('express').json()
const users = require('./../controllers/users')
const lk = require('./../controllers/lk')
const profile = require('./../controllers/profile')
const authMiddleware = require('./../middleware/auth')

module.exports = app => {
    // login
    // авторизация пользователя
    app.post('/auth', jsonParser, users.auth)
    // регистрация пользователя
    app.post('/reg', jsonParser, users.reg)

    // lk
    // получение транзакций
    app.get('/:id/costs', authMiddleware, lk.getCosts)
    // добавление транзакции
    app.post('/add-transaction', jsonParser, lk.addTransaction)

    // profile
    // данные юзера
    app.get('/:id/profile', authMiddleware, profile.getInfo)
}