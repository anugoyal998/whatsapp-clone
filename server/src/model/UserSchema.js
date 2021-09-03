const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: String,
    imageUrl: String,
    googleId: {
        type: String
    }
})

const UserModel = new mongoose.model('User', UserSchema)
module.exports = UserModel