const express = require('express')
const Router = express.Router()
const Controller = require('../controllers/AdminController')

const a = (req,res,next)=>{
    console.log("Middlewear works");
}


Router.post('/login', Controller.adminLogin)
Router.delete('/deleteUser', Controller.deleteUser)
Router.post('/updateUser', Controller.updateUser)


module.exports = Router;