const passport = require("passport");
const mongoose = require("mongoose");

// imports passport's built-in google oauth strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");

// assign mongoose model
const User = mongoose.model("users");

// serializeUser creates a cookie
passport.serializeUser((user, done) => {
  // the first argument is whether there is an error and the second is the MongoDB user model instance id
  done(null, user.id);
});

// deserializeUser retrieves the info from the cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        // check if we already have a record with the given profile ID
        if (existingUser) {
          // if we do, then tell passport that we've finished up the auth process
          done(null, existingUser);
        } else {
          // otherwise, we need to create a user record with the profile ID
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
