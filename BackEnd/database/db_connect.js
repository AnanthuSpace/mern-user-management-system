const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const host = process.env.DATABASE_URL
const dbconnect = mongoose.connect(host)

dbconnect
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err.message))