const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  designation : {
    type: String,
    trim : true,
  },
  bio: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  contact: {
    type: Number,
    trim: true,
  },
  bloodGroup : {
    type: String,
    trim : true
  },
  city : {
    type: String,
    trim : true
  },
  urls: [String],
  children: [String],
  tags: [String],
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  friends :[String]
});

module.exports = mongoose.model("User", UserSchema);
