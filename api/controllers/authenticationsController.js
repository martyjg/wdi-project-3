var passport = require('passport');

//POST/REGISTER

function register(req, res) {
  var registerStrategy = passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash:    true
  });

  return registerStrategy(req, res);
}

