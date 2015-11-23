var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var pollSchema = mongoose.Schema({
  question:  { type: String, required: true },
  responses: [Response]
})

module.exports = mongoose.model('Poll', pollSchema);