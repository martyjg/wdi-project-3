var Poll   = require('../models/poll');
var Group  = require('../models/group');


function pollsCreate(req, res) {
  var poll = new Poll(req.body);
  poll.created_by = currentUser;
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

  Poll.findById({ _id: id }, function(err, group) {
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

module.exports = {
  pollsCreate: pollsCreate,
  pollsShow:   pollsShow,
  pollsDelete: pollsDelete
}
