var express = require("express");
var router = express.Router();
var passport = require("passport");
var Admin = require("../models/admin");
var Product = require("../models/products");
var middleware = require("../middleware");

router.get("/register", function (req, res) {
    res.render("product-admin/register");
  });
  
  router.post("/register", function (req, res) {
    var newAdmin = new Admin({ username: req.body.username });
    Admin.register(newAdmin, req.body.password, function (err, admin) {
      if (err) {
        console.log(err);
        return res.render("product-admin/register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/admin/products");
      });
    });
  });
  
  router.get("/login", function (req, res) {
    res.render("product-admin/login");
  });
  
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/admin/products",
      failureRedirect: "/admin/login",
    }),
    function (req, res) { }
    );
    
    router.get("/logout", middleware.isAdminLoggedIn, function (req, res) {
    req.logout(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("logged out");
        res.redirect("/admin/login");
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
        res.render("product-admin/products", {Products : allProducts});
      }
    });
  });
  
  // new product form
  router.get("/new", middleware.isAdminLoggedIn, function (req, res) {
    res.render("product-admin/new");
  });
  
  // create new campground
  
  router.post("/new", middleware.isAdminLoggedIn, function (req, res) {
    var author = {
      id: req.user._id,
      username: req.user.username,
    };
    var newProduct = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      author: author,
    };
    Product.create(newProduct, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/products");
      }
    });
  });
  
  // show product detail
  router.get("/:id", middleware.isAdminLoggedIn,  function (req, res) {
    // Product.findOne({ _id: req.params.id}).populate("comments").exec(function (err, foundProduct) {
    Product.findById(req.params.id).populate("comments",{option: {strictPopulate: false}}).exec(function (err, foundProduct) {
      if (err) {
        console.log(err);
      }
      else{
        console.log(foundProduct);
        res.render("product-admin/show", {Product: foundProduct});
      }
    });
  });
  
  // edit product 
  router.get("/:id/edit", middleware.isAdminLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, foundProduct) {
      res.render("product-admin/edit", {product: foundProduct});
    });
  });
  
  // update product
  router.put("/:id", middleware.isAdminLoggedIn, function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body.product, function (err, updatedProduct) {
      if (err) {
        console.log(err);
        res.redirect("/admin/products");
      } else {
        res.redirect("/admin/" + req.params.id);
      }
    });
  });
  
  // delete product
  router.delete("/:id", middleware.isAdminLoggedIn, function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log(err);
        res.redirect("/admin/products");
      }
      else{
        res.redirect("/admin/products");
      }
    });
  });
  

  module.exports = router;