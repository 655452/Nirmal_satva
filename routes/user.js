var express = require("express");
var router = express.Router();
var passport = require("passport");
var Product = require("../models/products");
var User = require("../models/user");
var middleware = require("../middleware");
const { isUserLoggedIn } = require("../middleware");


router.get("/", function (req, res) {
    res.render("product-user/landing");
  });

router.get("/register", function (req, res) {
    res.render("product-user/register");
  });
  
  router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("product-user/register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/products");
      });
    });
  });
  
  router.get("/login", function (req, res) {
    res.render("product-user/login");
  });
  
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/products",
      failureRedirect: "/login",
    }),
    function (req, res) { }
    );
    
    router.get("/logout", middleware.isUserLoggedIn, function (req, res) {
    req.logout(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("logged out");
        res.redirect("/login");
      }
    });
  });

  // 
  // admin functionalities
  // create new campground form
  // 
  // find all products
  router.get("/products", function (req, res) {
    Product.find({}, function (err, allProducts) {
      if (err) {
        console.log(err);
      } else {
        res.render("product-user/products", {Products : allProducts});
      }
    });
  });

  // show product detail
  router.get("/:id", middleware.isUserLoggedIn,  function (req, res) {
    // Product.findOne({ _id: req.params.id}).populate("comments").exec(function (err, foundProduct) {
    Product.findById(req.params.id).populate("comments",{option: {strictPopulate: false}}).exec(function (err, foundProduct) {
      if (err) {
        console.log(err);
      }
      else{
        console.log(foundProduct);
        res.render("product-user/show", {Product: foundProduct});
      }
    });
  });

//   router.get("/:id/buy", middleware.isUserLoggedIn, function (req, res) {
        
//   });

module.exports = router;