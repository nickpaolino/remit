// this file is for all functions that require communication with the database for configuring commands
const mongoose = require("mongoose");
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

const sendResponse = body => {
  Command.find({}).then(commands => {
    const command = commands.find(msg => msg.message[body]);
    if (command.message && command.message[body]) {
      sendMessage(command.message[body]);
    } else {
      sendMessage("command not found");
    }
  });
};

const createCommand = body => {
  const message = { [body.toMessage]: body.fromMessage };
  const phone = body.phone;
  new Command({ message, phone })
    .save()
    .then(command => res.send({ body: command }));
};

module.exports = {
  sendResponse,
  createCommand
};
