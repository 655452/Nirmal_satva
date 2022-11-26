var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    // _id:{ type: mongoose.Schema.Types.ObjectId },
    name: String,
    description: String,
    image: String,
    price: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);