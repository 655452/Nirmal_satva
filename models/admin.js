const { Int32 } = require("bson")
var mongoose = require("mongoose")

var adminSchema = new mongoose.Schema({
    username: String,
    // email: String,
    // mobile_no: Int32;
    password: String
})

module.exports = mongoose.model("Admin", adminSchema);