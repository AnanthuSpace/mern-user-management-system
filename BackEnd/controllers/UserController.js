const { User } = require('../models/userDB')
const bcrypt = require('bcrypt')
const { createToken } = require('../config/jwt')

const register = async (req, res) => {
    const { username, email, password } = req.body
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const create = await newUser.save();
        res.json(create)
    } else {
        res.send("UserExist")
    }
}


const loginPost = async (req, res) => {
    const { email, password } = req.body
    const userData = await User.findOne({ email: email })
    if (userData) {
        const bcriptPass = await bcrypt.compare(password, userData.password)
        if (bcriptPass) {
            const token = createToken(userData._id)
            res.json({ userData, token })
        } else {
            res.send(" Wrong Password! ")
        }
    } else {
        res.send("User not found");
    }
}

const editProfile = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const { userID, username } = req.body;
    const updatedData = {
        username: username
    }
    const updateUser = await User.updateOne({ _id: userID }, updatedData);
    res.send(updateUser);
}


module.exports = {
    register,
    loginPost,
    editProfile
}