const mongoose = require("mongoose");

// though mongoDB doesnt require a schema, mongoose requires it
const { Schema } = mongoose;

// we can add properties whenever we'd like
const commandSchema = new Schema({
  phone: String,
  message: {},
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

// telling mongoose to create a new collection with the above schema
mongoose.model("commands", commandSchema);
