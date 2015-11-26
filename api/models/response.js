var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var responseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  rating: Number,
  comment: String
})

module.exports = mongoose.model('Response', responseSchema);