const express = require("express");
require("./services/passport");

// creates the express app
const app = express();

// imports the auth route handlers
require("./routes/authRoutes")(app);

// uses Heroku's port if it exists, otherwise 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
