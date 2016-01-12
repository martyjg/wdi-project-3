var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var Response = require("../models/response");

var pollSchema = new mongoose.Schema({
  question:  String,
  responses: [Response.schema],
  rating: Number,
  created_by: { type: mongoose.Schema.ObjectId, ref: "User" } 
});

module.exports = mongoose.model('Poll', pollSchema);