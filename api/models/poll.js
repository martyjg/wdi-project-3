var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var Response = require("../models/response");


var pollSchema = mongoose.Schema({
  question:  String,
  responses: [Response.schema]
})

module.exports = mongoose.model('Poll', pollSchema);