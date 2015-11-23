var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var Response = require("../models/response");


var pollSchema = mongoose.Schema({
  question:  String,
  responses: [Response.schema],
  created_by: { type: mongoose.Schema.ObjectId, ref: "User" } 
})

module.exports = mongoose.model('Poll', pollSchema);