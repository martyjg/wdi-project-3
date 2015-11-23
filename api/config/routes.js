var express           = require('express');
var router            = express.Router();
var passport          = require("passport");

var usersController   = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var groupsController = require('../controllers/groupsController');
var responsesController = require('../controllers/responsesController');

// AUTHENTICATION ROUTE HANDLERS - (REGISTER ACTS AS USER-NEW & CREATE)
router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

// USER ROUTE HANDLERS - (SHOW, EDIT, UPDATE, DELETE. NOT CURRENTLY USING INDEX)
// router.route('/users/:id')
//   .get(usersController.userShow)
//   .patch(usersController.usersUpdate)
//   .delete(usersController.usersDelete)

// router.route('/users/:id/edit')
//   .get(usersController.usersEdit)

// // GROUP ROUTE HANDLERS 
// router.route('/groups')
//   .post(groupsController.groupsCreate)

// router.route('/groups/:id')
//   .get(groupsController.groupsShow)
//   .patch(groupsController.groupsUpdate)
//   .delete(groupsController.groupsDelete)

// router.route('/groups/new')
//   .get(groupsController.groupsNew)

// router.route('/groups/:id/edit')
//   .get(groupsController.groupsEdit)

module.exports = router

