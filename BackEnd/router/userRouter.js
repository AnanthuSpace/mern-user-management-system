const express = require("express")
const Router = express.Router()
const Controller = require('../controllers/UserController')

Router.post('/signup', Controller.register)

module.exports = Router;