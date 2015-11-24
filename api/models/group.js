var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var Poll     = require("../models/poll");

var groupSchema = new mongoose.Schema({
  name:        String,
  image:       String,
  description: String,
  // users:       [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],
  created_by:  { type: mongoose.Schema.ObjectId, ref: "User" },
  polls:       [Poll.schema]

})

module.exports = mongoose.model('Group', groupSchema);