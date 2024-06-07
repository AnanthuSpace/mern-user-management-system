const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
require('./database/db_connect')

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Server running on http://localhost:3000');
});
