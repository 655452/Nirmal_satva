var Product = require("../models/products");
var Comment = require("../models/comments");
var middleware = {};


middleware.checkCommentsOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {   
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // req.flash("error", "You don't have permission to de that");
                    res.redirect("back");
                }
            }
        });
    } else{
        // req.flash("error", "You need to be logged in to do that!!");
        res.redirect("back");
    }
}
middleware.isAdminLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("you are not logged in!!!");
    res.redirect("/admin/login");
  };

middleware.isUserLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    console.log("you are logged in!!!");
    res.redirect("/login");
}

module.exports = middleware;
