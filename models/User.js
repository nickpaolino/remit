const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  message: {},
  phone: String
});

mongoose.model("users", userSchema);
