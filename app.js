const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const userRrouter = require("./routes/userRouter");
const authController = require("./controllers/authController");

require("./passport-config")(passport);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.get("/", (req, res, next) => res.redirect("/users/login"));
app.use("/users", userRrouter);
app.get("/dashboard", authController, (req, res, next) => {
  return res.render("dashboard.ejs", {
    title: "Apple Balance Check",
  });
});

module.exports = app;
