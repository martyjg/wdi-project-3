// Requiring our packages

var express        = require('express');
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var methodOverride = require('method-override'); 
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

var app            = express();

// Setup the Database

mongoose.connect(config.database);


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  })
);


// Express settings

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});


var routes = require(__dirname + "/config/routes");
app.use(routes);

app.listen(3000);
console.log("Heard loud and clear")