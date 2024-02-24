const mongoose = require("mongoose");

let user = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        isStudent: Boolean
    },
    {
        versionKey: false
    }
)
const UserModel = mongoose.model("UserCollection", user);

module.exports = UserModel;
