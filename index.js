const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// uses Heroku's port if it exists, otherwise 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
