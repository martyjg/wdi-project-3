var Response   = require('../models/response');
var Poll   = require('../models/poll');


function responsesCreate(req, res) {
  var response = new Response(req.body.response);
  response.created_by = currentUser;
  console.log(response);
  response.save(function(err, response) {
    if (err) return res.status(500).send(err);
    console.log("response created" + response);
  })
}

module.exports = {
  responsesCreate: responsesCreate
}