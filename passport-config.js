const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        passwordField: "password",
        usernameField: "username",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username: username });

          if (!user) {
            return done(null, false, {
              message: "No user exit with that email and username!",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, {
              message: "Username or password in incorrect",
            });
          }

          done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
