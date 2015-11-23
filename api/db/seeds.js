var mongoose = require('mongoose');

var databaseURL = 'mongodb://localhost:27017/viberate';
mongoose.connect(databaseURL);

var User     = require("../models/user");
var Group    = require("../models/group");
var Poll     = require("../models/poll");
var Response = require("../models/response");

var user1 = new User({
  username:     "ollie",
  email:        "ollie@ollie.com",
  password:     "password"
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

var poll1 = new Poll({
  question:  "How is the vibe in team _moji right now?",
  responses: [response1]
})

poll1.save(function(err, poll) {
  if (err) return console.log(err);
  console.log("Poll saved! ", poll);
})

var group1 = new Group({
  name:        "_moji",
  description: "the baddest boys in town",
  users:       [user1],
  created_by:  user1,
  polls:       [poll1]
})

group1.save(function(err, group) {
  if (err) return console.log(err);
  console.log("Group saved! ", group);
})

var response1 = new Response({
  user: user1,
  rating: 2
})

response1.save(function(err, response) {
  if (err) return console.log(err);
  console.log("Response saved! ", response);
})





