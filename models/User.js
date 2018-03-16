const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  message: {}
});

mongoose.model("users", userSchema);
