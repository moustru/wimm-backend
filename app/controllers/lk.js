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

const addTransaction = (req, res) => {
  if(!req.body || !req.body.money) return res.sendStatus(400)

  const { user, money, category, comment } = req.body

  Transaction.create({
    user,
    createdAt: new Date().getTime(),
    money,
    category,
    comment
  }, err => {
    if(err) return res.status(400).json({ message: err.message })
    
    return res.status(200).json('Success!')
  })
}

module.exports = {
  getCosts,
  addTransaction
}