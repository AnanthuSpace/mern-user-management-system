const JWT = require('jsonwebtoken')
require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET

const createToken = (userID) => {
    const token = JWT.sign({ userID }, jwtSecret, { expiresIn: "1h" });
    return token;
}

const verification = (req, res, next) => {
    
}


module.exports = { createToken };