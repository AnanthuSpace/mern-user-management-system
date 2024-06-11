const express = require("express")
const Router = express.Router()
const Controller = require('../controllers/UserController')

Router.post('/signup', Controller.register)
Router.post('/login', Controller.loginPost)
Router.post('/editProfile', Controller.editProfile)

module.exports = Router;