var express = require("express");
var router = express.Router({mergeParams: true});
var Product = require("../models/products");
var Comment = require("../models/comments");
var middleware = require("../middleware");

router.get("/new", middleware.isUserLoggedIn, function (req, res) {
    Product.findById(req.params.id, function(err, product){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {product : product});
        }
    });
});

router.post("/", middleware.isUserLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, product){
        if(err){
            console.log(err);
            res.redirect("/product");
        } else{
            Comment.create(req.body.comment, function (err, comment){
                if (err) {
                    console.log(err);   
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    comment.save();

                    product.comments.push(comment);
                    product.save();

                    res.redirect("/" + product._id);

                }
            });
        }
    });
    
});

router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {product_id: req.params.id, comment:foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, UpdatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/" + req.params.id);
        }
    });
});

module.exports = router;