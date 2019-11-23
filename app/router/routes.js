const jsonParser = require('express').json()
const users = require('./../controllers/users')
const lk = require('./../controllers/lk')
const authMiddleware = require('./../middleware/auth')

module.exports = app => {
    // login
    // авторизация пользователя
    app.post('/auth', jsonParser, users.auth)
    // регистрация пользователя
    app.post('/reg', jsonParser, users.reg)

    // lk
    // получение итоговой суммы транзакций
    app.get('/:id/costs', authMiddleware, lk.getCosts)
    // получение всех транзакций определенной категории
    app.get('/:id/costs-categories', authMiddleware, lk.getCostsFromCategories)
    // добавление транзакции
    app.post('/add-transaction', jsonParser, lk.addTransaction)
}