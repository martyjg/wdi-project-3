var Response   = require('../models/response');

function responsesCreate(req, res) {
  var response = new Response(req.body.response);
  response.save(function(err, response) {
    if (err) return res.status(500).send(err);
    console.log("response created" + group);
  })
}

module.exports = {
  responsesCreate: responsesCreate
}