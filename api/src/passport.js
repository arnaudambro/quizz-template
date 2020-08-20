const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { SECRET } = require("./config");

// load up the user model
const User = require("./models/user");

module.exports = (app) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: SECRET,
  };

  passport.use(
    "user",
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        const user = await User.findOne({ _id: jwtPayload._id });

        if (user) return done(null, user);
      } catch (e) {}

      return done(null, false);
    })
  );

  app.use(passport.initialize());
};
