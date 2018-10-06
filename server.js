var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require('path')
var exphbs = require("express-handlebars");


var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var config = require('./config/database');
mongoose.Promise = Promise;
mongoose.connect(config.db)
  .then( result => {
    console.log(`Connected to database`);
  })
  .catch(err => console.log('There was an error with your connection:', err));

// Configure middleware

// morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting up handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use express.static to serve the public folder as a static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/articles',express.static(path.join(__dirname, 'public')));
app.use('/notes',express.static(path.join(__dirname, 'public')));

//Routes
var index = require('./routes/index');
var articles = require('./routes/articles');
var notes = require('./routes/notes');
var scrape = require('./routes/scrape');

app.use('/', index);
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });