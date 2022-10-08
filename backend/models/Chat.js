const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    type: String,
    trim: true,
    required: true,
  },
  receiver: {
    type: String,
    trim: true,
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model("Chat", ChatSchema);
