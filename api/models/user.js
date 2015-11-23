var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
  username:     { type: String, required: true },
  email:        { type: String, required: true },
  password:     { type: String, required: true },
  image:        String,
  date_created: Date,
  bio:          String
})

User.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', userSchema);