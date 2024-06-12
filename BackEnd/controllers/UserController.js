const { User } = require('../models/userDB');
const bcrypt = require('bcrypt');
const { createToken } = require('../config/jwt');
const upload = require('../config/multer');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword
            });
            const create = await newUser.save();
            res.json(create);
        } else {
            res.status(400).send("UserExist");
        }
    } catch (error) {
        console.error("Error during registration: ", error);
        res.status(500).send("Internal Server Error");
    }
};

const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const bcryptPass = await bcrypt.compare(password, userData.password);
            if (bcryptPass) {
                const token = createToken(userData._id);
                res.json({ userData, token });
            } else {
                res.status(400).send("Wrong Password!");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).send("Internal Server Error");
    }
};

const editProfile = async (req, res) => {
    try {
        const { userID, username } = req.body;
        const file = req.file;
        const updatedData = {
            username: username,
            ...(file && { profileURL: file.originalname })
        };
        const updateUser = await User.updateOne({ _id: userID }, updatedData);
        res.json(updateUser);
    } catch (error) {
        console.error("Error updating profile: ", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    register,
    loginPost,
    editProfile
};
