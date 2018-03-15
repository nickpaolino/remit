// require the Twilio module and create a REST client
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

module.exports = app => {
  app.use(
    cors({
      origin: "http://localhost:3000"
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // route handler for an incoming SMS message
  app.post("/sms", (req, res) => {
    // text body: req.body.Body
    // const response = services.resolveResponse(req.body.Body);

    // commands.resolveMessage(null, req.body.Body);
    const restructuredBody = { message: req.body.Body };
    const response = commands.resolveIntent(restructuredBody, res, true);
  });

  app.post("/send", (req, res) => {
    const response = commands.resolveIntent(req.body, res);
  });

  app.get("/", (req, res) => {});
};
