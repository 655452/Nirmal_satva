const { Int32 } = require("bson");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var adminSchema = new mongoose.Schema({
    username: String,
    // email: String,
    // mobile_no: Int32;
    password: String
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);