const passport = require("passport");

var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser");
// passport = require("passport"),
  (localStretegy = require("passport-local")),
  (Admin = require("./models/admin")),
  (User = require("./models/user")),
  (Product = require("./models/products")),
  (Comment = require("./models/comments"));

// requiring routes
var adminRoutes = require("./routes/admin");
var userRoutes = require("./routes/user");
var commentsRoutes = require("./routes/comments");

mongoose.connect("mongodb://localhost:27017");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(
  require("express-session")({
    secret: "I am the Best!!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStretegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStretegy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


app.use(function (req, res, next) {
  res.locals.currentUser = req.User;
  res.locals.currentAdmin = req.Admin;
  // res.locals.error = req.flash("error");
  // res.locals.success = req.flash("success");
  next();
});

app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/product/:id/comments", commentsRoutes);

var port = 2000;
app.listen(port, function () {
  console.log("Server Started at " + port);
});
