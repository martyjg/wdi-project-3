var Poll   = require('../models/poll');


function pollsCreate(req, res) {
  var poll = new Poll(req.body);
  console.log(req.body);
  poll.save(function(err, poll) {
    if (err) return res.status(500).send(err);
    console.log("poll created" + poll);
  res.status(200).json(poll);
  })

  // Group.findById({_id: })
}

// User.findById({_id: currentUser._id}, function(err, user){
//    user.local.posts.push(post);
//    if (err) return res.status(500).json({ message: "Not saving"});
//    user.save();
//    console.log(user);

//  });

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
