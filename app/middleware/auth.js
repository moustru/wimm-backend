const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        res.status(401).json({ message: 'Токен не найден' })
    } else {
        const token = authHeader.replace('Bearer ', '');

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
