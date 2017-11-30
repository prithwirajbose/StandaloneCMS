const routes = require('express').Router();
var path = require("path");
var fs = require('file-system');
var _ = require('./libs/lodash.min.js');

routes.get('/*', function(req, res) {
    var url = _.get(req, 'url');
    if (url.indexOf('/static/') >= 0 && fs.existsSync(path.join(__dirname + url))) {
        res.status(200).sendFile(path.join(__dirname + url));
    } else {
        res.status(404).send("Page Not Found");
    }

});


module.exports = routes;