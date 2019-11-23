const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')

const getCosts = (req, res) => {
  Transaction.find({ 
    user: req.params.id, 
    createdAt: { $gte: Number(req.query.dateFrom), $lte: Number(req.query.dateTo) }
  }, (err, results) => {
    if(err) return res.status(500).json({ message: err.message })
    
    return res.send(results)
  })
}

const getCostsFromCategories = (req, res) => {
  Transaction.find({
    user: req.params.id,
    createdAt: req.query.dateFrom <= this.createdAt <= req.query.dateTo,
    category: req.query.category
  }, (err, results) => {
    if(err) return res.status(500).json({ message: err.message })
    
    return res.send(results)
  })
}

const addTransaction = (req, res) => {
  if(!req.body || !req.body.money) return res.sendStatus(400)

  Transaction.create({
    user: req.body.user,
    createdAt: new Date().getTime(),
    money: req.body.money,
    category: req.body.category,
    comment: req.body.comment
  }, (err, results) => {
    if(err) return res.status(400).json({ message: err.message })
    
    return res.status(200).json('Success!')
  })
}

module.exports = {
  getCosts,
  getCostsFromCategories,
  addTransaction
}