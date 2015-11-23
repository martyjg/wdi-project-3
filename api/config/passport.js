var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {

  // FIND A USER WITH THIS USERNAME
    User.findOne({ 'local.username' : username }, function(err, user) {
      if (err) return done(err);

      // ALREADY A USER WITH THIS USERNAME
      if (user) {
        return done(null, false, { message: "please choose another username."});
      } else {

        var newUser            = new User();
        newUser.local.username = username;
        newUser.local.email    = req.body.email;
        newUser.local.image    = req.body.image;
        newUser.local.password = User.encrypt(password);

        newUser.save(function(err, user) {
          if (err) return done(err);
          return done(null, user);
        });
      }
    });
  }));
}