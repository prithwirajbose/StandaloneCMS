var PORT = 5050;

var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    cors = require('cors');

//Include routes and controllers
var routes = require('./approutes.js');
var db = require('./libs/db');

//Create Express App
var app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.use(cors());


//Setup Routes
app.use('/', routes);

var server = app.listen(PORT, function() {
    db.loadData();
    console.log('SimpleCMS running on port ' + PORT);
});
module.exports = server;