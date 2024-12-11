const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router
  .route("/register")
  .get(userController.registerPage)
  .post(userController.register);

router.route("/login").get(userController.loginPage);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("error_msg", "No user exist with this username");
      return res.redirect("/users/login");
    }

    let isExpired = new Date(user.expiredAt) - new Date(user.createdAt);

    if (isExpired <= 0) {
      req.flash(
        "error_msg",
        "Your trail period has expired. Contact us to buy the product"
      );
      return res.redirect("/users/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

router.get("/logout", userController.logout);

// router
//   .route("/change-password")
//   .get(userController.changePasswordPage)
//   .post(userController.changePassword);

module.exports = router;
