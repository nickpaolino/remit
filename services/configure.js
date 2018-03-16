// this file is for all functions that require communication with the database for configuring commands
const mongoose = require("mongoose");
const Command = mongoose.model("commands");
const sms = require("./sms.js");

const sendResponse = body => {
  // find command model for corresponding phone number
  Command.find({}).then(commands => {
    // find the corresponding response from the command in the message object
    const command = commands.find(msg => msg.message[body]);
    // if the message object exists for that command and the command is a key
    if (command.message && command.message[body]) {
      // then send message with command response
      sms.sendMessage(command.message[body]);
    } else {
      // otherwise let the user know that the command is not found
      sms.sendMessage("command not found");
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
