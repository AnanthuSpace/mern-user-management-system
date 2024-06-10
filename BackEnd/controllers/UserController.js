const { User } = require('../models/userDB')
const bcrypt = require('bcrypt')

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

module.exports = {
    register
}