const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  accessToken: [String],
  name: {
    type: String,
    trim: true,
   // required: true
  },
  bio: {
    type: String,
    trim: true
  },
  googleId:{
     type:String,
     trim:true,
    // required:true
  },
  email: {
    type: String,
    trim: true,
   // required: true
  },
  displayPicture: {
    type: String,
    trim: true
  },
  contact:{
      type:Number,
      trim:true
  },
  linkedin:{
    type:String
  },
  children: [String]
});

module.exports = mongoose.model("User", UserSchema);