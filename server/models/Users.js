const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    image:String
})
const UserModel = mongoose.model("Images",UserSchema)
module.exports = UserModel;