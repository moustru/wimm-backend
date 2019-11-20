const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');

    if(!authHeader) {
        res.status(401).json({ message: 'Токен не найден' })
    } else {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch(e) {
            if(e instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ message: 'Неверный токен' })
            }
        }
    }

    next();
}
