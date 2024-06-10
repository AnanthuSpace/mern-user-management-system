const express = require('express');
const cors = require('cors')
const userRoute = require('./router/userRouter')
require('dotenv').config()
require('./database/db_connect')

const port = process.env.PORT
const app = express();

app.use(express.json())
app.use(cors())

app.use("/", userRoute);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
