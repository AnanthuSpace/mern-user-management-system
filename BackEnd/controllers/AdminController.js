const bcrypt = require('bcrypt')
const { User } = require('../models/userDB');
const { createToken } = require('../config/jwt');
require("dotenv").config

const adminLogin = async (req, res) => {
    try {
        console.log("wrkng");
        const { email, password } = req.body
        orginalEmail = process.env.ADMIN_EMAIL
        orginalPass = process.env.ADMIN_PASS
        if (email == orginalEmail) {
            if (orginalPass == password) {
                const adminToken = createToken(email);
                res.json(adminToken);
            } else {
                res.send("wrongpassword")
            }
        } else {
            res.send("EmailNotFound")
        }
    } catch (error) {
        console.log(error.message);
    }
}


const deleteUser = async (req, res) => {
    try {
        console.log("wrkng");
        const userID = req.body.userID;
        const deleteUser = await User.deleteOne({ _id: userID });
        res.send(deleteUser);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
      const { userID, username } = req.body;
      const updateUser = await User.updateOne({ _id: userID }, { username: username });
      res.json(updateUser);
    } catch (error) {
      console.log(error);
    }
  }
module.exports = {
    adminLogin,
    deleteUser,
    updateUser
}