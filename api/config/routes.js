var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users/:id')
  .get(usersController.userShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/users/:id/edit')
  .get(usersController.usersEdit)

router.route('/groups')
  .get(groupsController.groupsIndex)
  .post(groupsController.groupsCreate)

router.route('/groups/:id')
  .get(groupsController.groupsShow)
  .patch(groupsController.groupsUpdate)
  .delete(groupsController.groupsDelete)

router.route('/groups/new')
  .get(groupsController.groupsNew)

router.route('/users/:id/edit')
  .get(groupsController.groupsEdit)

module.exports = router

