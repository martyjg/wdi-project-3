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

// Set up the Database

var databaseURL = 'mongodb://localhost/viberate'
mongoose.connect(databaseURL); 

app.listen(3000);
console.log("Heard loud and clear")