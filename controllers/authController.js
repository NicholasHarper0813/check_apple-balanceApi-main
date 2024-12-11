module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error_msg", "Please Login to access this page");
  res.redirect("/users/login");
};
