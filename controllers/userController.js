const User = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Pages
// REGISTER PAGE
exports.registerPage = (req, res, next) => {
  return res.render("register.ejs", { title: "Create New Account", error: "" });
};

// LOGIN PAGE
exports.loginPage = (req, res, next) => {
  return res.render("login.ejs", { title: "Login", error: "" });
};

// CHANGE PASSWORD PAGE
exports.changePasswordPage = (req, res, next) => {
  return res.render("changePassword.ejs");
};

// Actuall Functions
// Register User
exports.register = async (req, res, next) => {
  try {
    const { email, username, password, confirmPassword, ipAddress } = req.body;
    let error = [];

    if (!username) {
      error.push("Please provide a username");
    }

    if (!email) {
      error.push("Please provide a Email");
    }

    if (!password) {
      error.push("Please provide a valid password");
    }

    if (!confirmPassword) {
      error.push("Please provide a valid confirm Password");
    }

    if (confirmPassword != password) {
      error.push("Password and confirm Password does not match");
    }

    // Error
    if (error.length > 0) {
      return res.render("register.ejs", {
        title: "Create New Account",
        error,
      });
    }

    // Every thing is Ok register the User
    const pass = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: pass,
      ipAddress,
    });

    console.log(newUser);

    req.flash("success_msg", "You are registered. Login to Continue... ");
    return res.redirect("/users/login");
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.render("register.ejs", {
        title: "Create New Account",
        error: ["You are only allowed to create only one account"],
      });
    }

    return res.render("register.ejs", {
      title: "Create New Accouont",
      error: ["Some Error occured kindly connect to the Customer support"],
    });
  }
};

// Login User
// exports.login = (req, res, next) => {
//   console.log(req.body);
//   // res.redirect("/dashboard");
// };

// Logout User
exports.logout = (req, res, next) => {
  req.logOut();
  req.flash("success_msg", "You are successfully logged out");
  res.redirect("/users/login");
};

// Change User Password
exports.changePassword = (req, res, next) => {
  try {
  } catch (error) {}
};
