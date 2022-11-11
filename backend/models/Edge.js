const mongoose = require("mongoose");

const EdgeSchema = new mongoose.Schema({
  src: {
    type: String,
    trim: true,
    required: true,
  },
  dest: {
    type: String,
    trim: true,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model("Edge", EdgeSchema);
