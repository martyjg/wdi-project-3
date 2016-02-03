var Poll   = require('../models/poll');
var Group  = require('../models/group');
var Response = require('../models/response')


function pollsCreate(req, res) {
  var poll = new Poll(req.body);
  poll.created_by = currentUser._doc;
  poll.question   = "What's your vibe on " + req.body.question + "?";
  poll.rating     = 0;

  poll.save(function(err, poll) {
    if (err) return res.status(500).send(err);
  res.status(200).json(poll);
  })

  var id = req.body.groupId;

  Group.findById({_id: id }, function(err, group) {
      group.polls.push(poll);
      if (err) return res.status(500).json({ message: "Not saving"});
      group.save();
  })
}

function pollsShow(req, res) {
  var id = req.params.id;

  Poll.findById({ _id: id }, function(err, poll) {
    if (err) return res.status(500).send(err);
    if (!poll) return res.status(404).send(err);

    res.status(200).send(poll);
  });
};

function pollsDelete(req, res) {
  var id = req.params.id;

  Poll.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  });
};

function pollsResponsesCreate(req, res){
  var id = req.params.id;
  console.log(req.params);

  Poll.findOne({ 
    _id: id,
  }).populate("responses").exec(function(err, poll) {
    if (err) return res.status(500).send(err);
    if (!poll) return res.status(404).send({ message: "This poll doesn't exist."});

    for (var i=0; i < poll.responses.length; i++) {
      console.log("this is currentUser apparently", currentUser._doc);
      console.log("poll responses: ", poll.responses);

      console.log(poll.responses[i].user.toString() === currentUser._doc._id.toString())
      if (poll.responses[i].user.toString() === currentUser._doc._id.toString()) {
        return res.status(401).send({ messsage: "You have already rated the vibe!"});
      }
    }

    var response = new Response(req.body);
    response.user    = currentUser._doc;
    response.comment = currentUser._doc.username + " - " + req.body.comment;

    poll.responses.push(response);

    poll.save(function(err, poll){
      console.log(err)
      if (err) return res.status(500).send(err);
      if (!poll) return res.status(404).send(err);

      res.status(200).send(poll);
    });
  });
}

module.exports = {
  pollsCreate: pollsCreate,
  pollsShow:   pollsShow,
  pollsDelete: pollsDelete,
  pollsResponsesCreate: pollsResponsesCreate
}
