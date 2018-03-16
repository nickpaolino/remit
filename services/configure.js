// this file is for all functions that require communication with the database for configuring commands
const mongoose = require("mongoose");
const Command = mongoose.model("commands");
const sms = require("./sms.js");

const sendResponse = (body, res, isSMS) => {
  // find command model for corresponding phone number
  Command.find({}).then(commands => {
    // find the corresponding response from the command in the message object
    const command = commands.find(msg => msg.message[body]);

    // setup message variable for control logic
    let message;

    // if the message object exists for that command and the command is a key
    if (command.message && command.message[body]) {
      // then send message with command response
      message = command.message[body];
    } else {
      // otherwise let the user know that the command is not found
      message = "command not found";
      // list user's commands here or something similar
    }

    if (isSMS) {
      sms.sendMessage(message);
      // send a response to avoid a Heroku timeout and Twilio error
      res.send({ status: "finished" });
    } else {
      res.send({ message });
    }
  });
};

const createCommand = body => {
  const message = { [body.toMessage]: body.fromMessage };
  const phone = body.phone;
  new Command({ message, phone }).save();
};

module.exports = {
  sendResponse,
  createCommand
};
