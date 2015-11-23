var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var responseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  rating: Number
})

module.exports = mongoose.model('Response', responseSchema);