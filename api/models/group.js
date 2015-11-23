var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  users: [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],
  created_by: { type: mongoose.Schema.ObjectId, ref: "User" },

  //polls embedded

})

module.exports = mongoose.model('Group', groupSchema);