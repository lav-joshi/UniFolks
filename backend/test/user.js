process.env.NODE_ENV = 'test'
let chai = require("chai")
let chaiHttp=require("chai-http");
const request = require("../routes/user")
chai.should()
const expect = chai.expect();

chai.use(chaiHttp);

var express = require('express');
var app = express();
var Strategy;
 
if (process.env.NODE_ENV == 'test' ) {
  Strategy = require('passport-mock').Strategy;
} else {
  Strategy = require('passport-google').Strategy;
}
 
passport.use(new Strategy({
    name: 'google',
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
);

