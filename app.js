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
var path           = require('path');
var cors           = require('cors');

var port           = process.env.PORT || 3000; // added this in socket
var router         = express.Router(); // added this in socket
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;


// Setup the Database

var mongoUri =  process.env.MONGOLAB_URI || config.database;


mongoose.connect(mongoUri);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
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

app.use(function(req, res, next){
  global.currentUser = req.user;
  next();
})

// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json({message: 'Unauthorized request.'});
//   }
//   next();
// });

// SASS 
// var result = sass.renderSync({
//  data: scss_content
//  [, options..]
// });

// THIS IS SOCKET STUFF THAT I TRIED TO ADD
// app.set("views", "./views"); // not sure if this needs to go at the top
// app.set("view engine", "ejs"); // not sure if this needs to go at the top (also, we havent used ejs?)
// app.get('/', function(req, res){
//   res.render("index");
// });

app.use("/", router);
// server.listen(port);
// console.log("SERVER STARTED ON " + port);

// var io = require("socket.io")(server);

// io.sockets.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//   })
//   socket.on("chat message", function(msg) {
//     io.emit("chat message", msg);
//   })
// });

// The below is everything that was previously there before I dived in.

var routes = require("./config/routes");
app.use("/api", routes);

app.listen(port); // This seems to be causing me a problem
console.log("Heard loud and clear")