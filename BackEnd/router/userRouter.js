const express = require("express")
const Router = express.Router()
const upload = require('../config/multer')
const Controller = require('../controllers/UserController')


Router.post('/signup', Controller.register)
Router.post('/login', Controller.loginPost)
Router.post('/editProfile',upload.single("newImage"),Controller.editProfile)

module.exports = Router;