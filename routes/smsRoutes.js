// require the Twilio module and create a REST client
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Command = mongoose.model("commands");

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
    const body = req.body.Body;
    // get command response from MongoDB and save here to send back

    // find command model for corresponding phone number
    Command.find({ phone: "+16467913080" }).then(command => {
      console.log(command);
      console.log(body);
      if (command[0].message && command[0].message[body]) {
        sendMessage(command[0].message[body]);
      } else {
        sendMessage("command not found");
      }
    });
    res.send({ status: "finished" });
  });

  app.post("/commands", (req, res) => {
    const body = req.body;
    const message = { [body.toMessage]: body.fromMessage };
    const phone = body.phone;
    new Command({ message, phone })
      .save()
      .then(command => res.send({ body: command }));
  });
};
