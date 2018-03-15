// require the Twilio module and create a REST client
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const keys = require("../config/keys.js");
const client = require("twilio")(keys.accountSid, keys.authToken);

const sendMessage = body => {
  client.messages.create({
    to: keys.testNumber,
    from: keys.twilioNumber,
    body
  });
};

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
    const message = req.body.Body;
    // get command response from MongoDB and save here to send back
    // getResponse(message)
    sendMessage(message);
    res.send({ status: "finished" });
  });

  app.post("/commands", (req, res) => {
    const body = req.body;
    res.send({ body });
  });
};
