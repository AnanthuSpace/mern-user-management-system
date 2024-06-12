const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileURL: {
        type: String,
        default: undefined
    }
})

const User = mongoose.model("user", userSchema)
module.exports = {
    User
}