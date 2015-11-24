var User   = require('../models/user');
var Group  = require('../models/group');

function usersIndex(req, res) {
  User.find(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res){
  console.log("linked to controller");
  User.findById(req.params.id).populate("groups").exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    console.log(user.groups);
    res.status(200).json(user);
  });
}

function usersUpdate(req, res){
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}


module.exports = {
  usersIndex:  usersIndex,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
}