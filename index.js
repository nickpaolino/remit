const express = require("express");
// creates the express app
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/Command");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

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
