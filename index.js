const express = require("express");

// creates the express app
const app = express();

const keys = require("./config/keys");

const passport = require("passport");

// imports passport's built-in google oauth strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token:", accessToken);
      console.log("refresh token:", refreshToken);
      console.log("profile:", profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

// uses Heroku's port if it exists, otherwise 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
