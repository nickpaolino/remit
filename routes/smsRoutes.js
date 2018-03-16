// require the Twilio module and create a REST client
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Command = mongoose.model("commands");

const configure = require("../services/configure.js");

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
  // allows the React server on port 3000 access to GET and POST on the express server
  app.use(
    cors({
      origin: "http://localhost:3000"
    })
  );

  // bodyParser is required to get the Twilio webhook route working
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // route handler for an incoming SMS message
  app.post("/sms", (req, res) => {
    // this is the text message that is sent to the configured number
    const body = req.body.Body;
    // get command response from MongoDB and save here to send back
    configure.sendResponse(body);
    // find command model for corresponding phone number
    // Command.find({}).then(commands => {
    //   const command = commands.find(msg => msg.message[body]);
    //   if (command.message && command.message[body]) {
    //     sendMessage(command.message[body]);
    //   } else {
    //     sendMessage("command not found");
    //   }
    // });
    res.send({ status: "finished" });
  });

  app.post("/commands", (req, res) => {
    const body = req.body;
    configure.createCommand(body);
    // const message = { [body.toMessage]: body.fromMessage };
    // const phone = body.phone;
    // new Command({ message, phone })
    //   .save()
    //   .then(command => res.send({ body: command }));
  });
};
