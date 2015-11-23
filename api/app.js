// Requiring our packages

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var methodOverride = require('method-override'); 

// Setup the Database

var databaseURL = 'mongodb://localhost/viberate'
mongoose.connect(databaseURL); 

// Setup Middleware 

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'viberate-password' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
// have left out method overwrite stuff


// Express settings

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

// require('./config/passport')(passport);



var routes = require(__dirname + "/config/routes");
// app.use(routes);



app.listen(3000);
console.log("Heard loud and clear")