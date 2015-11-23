var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {
  passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {

  // FIND A USER WITH THIS USERNAME
    User.findOne({ 'local.username' : username }, function(err, user) {
      if (err) return done(err);

      // ALREADY A USER WITH THIS USERNAME
      if (user) {
        return done(null, false, req.flash('errorMessage', 'This username has been taken!'));
      } else {

        var newUser            = new User();
        newUser.local.username = username;
        newUser.local.password = User.encrypt(password);

        newUser.save(function(err, user) {
          if (err) return done(err);
          return done(null, user);
        });
      }
    });
  }));
}