const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    phone: String,
    uid: String,
    firstname: String,
    lastname: String
});

module.exports = mongoose.model("User", userSchema);

