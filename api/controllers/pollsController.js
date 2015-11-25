var Poll   = require('../models/poll');
var Group  = require('../models/group');
var Response = require('../models/response')


function pollsCreate(req, res) {
  var poll = new Poll(req.body);
  poll.created_by = currentUser;
  poll.rating = 0;

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
  var response = new Response(req.body)

  Poll.findById({ _id: id }, function(err, poll) {
    if (err) return res.status(500).send(err);
    if (!poll) return res.status(404).send(err);

    poll.responses.push(response)
    poll.save()

    console.log("response added to " + poll);
    res.status(200).send(poll);
  });
}

module.exports = {
  pollsCreate: pollsCreate,
  pollsShow:   pollsShow,
  pollsDelete: pollsDelete,
  pollsResponsesCreate: pollsResponsesCreate
}
