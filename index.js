const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
require('./app/models');

const app = express();
const PORT = process.env.PORT || 8002;
require('./config/express')(app);
require('./app/router/routes')(app);

app.get('/', (req, res) => {
    res.send('Hello, Express!')
});

mongoose.connect(process.env.DB_CONN, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => console.error('Error connecting', err));
