var Group    = require('../models/group');
var User     = require('../models/user');
var Poll     = require('../models/poll');
var Response = require('../models/response');


function groupsCreate(req, res) {
  var group = new Group(req.body);
  group.save(function(err, group) {
    if (err) return res.status(500).json(err);
    console.log("group created" + group);
    res.status(200).json(group);
  });

  User.findOneAndUpdate({ 
    username: currentUser.username
  }, { 
    $addToSet: { groups: group._id }
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json(err);

    console.log("user " + user + " added to group");

    res.status(204).json({ message: "Current user was added to the new group" }); 
  });

  console.log(group);
};


function groupsShow(req, res) {
  var id = req.params.id;

  Group.findById({ _id: id }, function(err, group) {
    if (err) return res.status(500).json(err);
    if (!group) return res.status(404).json(err);

    res.status(200).json(group);
  });
};


function groupsUpdate(req, res) {
  var id = req.params.id;

  Group.findByIdAndUpdate({ _id: id }, req.body.group, function(err, group){
    if (err) return res.status(500).json(err);
    if (!group) return res.status(404).json(err);

    res.status(200).json(group);
  });
};

function groupsAddUser(req, res){
  var id = req.params.id;

  Group.findById(id, function(err, group){
    if (err) return res.status(500).json(err);
    if (!group) return res.status(404).json(err);

    User.findOneAndUpdate({ 
      username: req.body.username 
    }, { 
      $addToSet: { groups: group._id } 
    }, function(err, user) {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(404).json(err);

      res.status(204).json({ message: "User was added to the group" }); 
    });
  });
}

function groupsDelete(req, res) {
  var id = req.params.id;

  Group.remove({ _id: id }, function(err) {
    if (err) return res.status(500).json(err);
    res.status(200)
  });
};


module.exports = {
  groupsCreate: groupsCreate,
  groupsShow:   groupsShow,
  groupsUpdate: groupsUpdate,
  groupsDelete: groupsDelete,
  groupsAddUser: groupsAddUser
}
