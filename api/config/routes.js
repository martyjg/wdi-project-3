var express           = require('express');
var router            = express.Router();
var passport          = require("passport");

var usersController   = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var groupsController = require('../controllers/groupsController');
var pollsController = require('../controllers/pollsController');

// AUTHENTICATION ROUTE HANDLERS - (REGISTER ACTS AS USER-NEW & CREATE)
router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)

// USER ROUTE HANDLERS - (SHOW, EDIT, UPDATE, DELETE. NOT CURRENTLY USING INDEX)
router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/users/:id/edit')
  // .get(usersController.usersEdit)

// GROUP ROUTE HANDLERS 
router.route('/groups')
  .post(groupsController.groupsCreate)

router.route('/groups/:id')
  .get(groupsController.groupsShow)
  .patch(groupsController.groupsUpdate)
//   .delete(groupsController.groupsDelete)

router.route('/groups/:id/adduser')
  .put(groupsController.groupsAddUser)

// POLL ROUTE HANDLERS
router.route('/polls')
  .post(pollsController.pollsCreate)

router.route('/polls/:id')
  .get(pollsController.pollsShow)

// RESPONSE ROUTE HANDLER
router.route('/polls/:id/response')
  .patch(pollsController.pollsResponsesCreate)

  
module.exports = router

