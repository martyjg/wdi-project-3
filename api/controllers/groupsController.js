var Group    = require('../models/group');
var User     = require('../models/user');
var Poll     = require('../models/poll');
var Response = require('../models/response');


function groupsCreate(req, res) {
  var group = new Group(req.body.group);
  group.save(function(err, group) {
    if (err) return res.status(500).send(err);
    console.log("group created" + group);
  })
};


function groupsShow(req, res) {
  var id = req.params.id;

  Group.findById({ _id: id }, function(err, group) {
    if (err) return res.status(500).send(err);
    if (!group) return res.status(404).send(err);

    res.status(200).send(group);
  });
};


function groupsUpdate(req, res) {
  var id = req.params.id;

  Group.findByIdAndUpdate({ _id: id }, req.body.group, function(err, group){
    if (err) return res.status(500).send(err);
    if (!group) return res.status(404).send(err);

    res.status(200).send(group);
  });
};


function groupsDelete(req, res) {
  var id = req.params.id;

  Group.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  });
};


module.exports = {
  groupsCreate: groupsCreate,
  groupsShow:   groupsShow,
  groupsUpdate: groupsUpdate,
  groupsDelete: groupsDelete,
}
