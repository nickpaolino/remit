const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Command");
require("./services/passport");

mongoose.connect(keys.mongoURI);

// creates the express app
const app = express();

// lets the app use the cookie session with a max storage age of a month
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// imports the auth route handlers
require("./routes/authRoutes")(app);

// imports the sms route handlers
require("./routes/smsRoutes")(app);

// uses Heroku's port if it exists, otherwise 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
