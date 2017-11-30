var PORT = 5050;

var express = require('express'),
    request = require('request'),
    cors = require('cors');

//Include routes and controllers
var routes = require('./approutes.js');

//Create Express App
var app = express();


app.use(cors());


//Setup Routes
app.use('/', routes);

var server = app.listen(PORT, function() {
    console.log('SimpleCMS running on port ' + PORT);
});
module.exports = server;