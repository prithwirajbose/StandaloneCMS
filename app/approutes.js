const routes = require('express').Router();
var path = require("path");
var fs = require('file-system');
var _ = require('./libs/lodash.min.js');
var db = require('./libs/db');
var util = require('./libs/util');
var action = require('./libs/action');

var urllib = require('url');

routes.get('/admin/*', function(req, res) {
    var url = _.get(req, 'url');
    var urlparts = urllib.parse(url, true);
    if (fs.existsSync(path.join(__dirname, urlparts.pathname))) {

        if (_.has(req.query, 'action')) {
            _.get(action, _.get(req.query, 'action'))(req, res);

            res.status(200).sendFile(path.join(__dirname, 'admin', _.get(req, 'result')));
        } else {
            res.status(200).sendFile(path.join(__dirname, urlparts.pathname));
        }
    } else {
        res.status(404).send("Page Not Found");
    }

});

routes.post('/admin/*', function(req, res) {
    var url = _.get(req, 'url');
    var urlparts = urllib.parse(url, true);
    if (fs.existsSync(path.join(__dirname, urlparts.pathname))) {
        if (_.has(req.query, 'action')) {
            _.get(action, _.get(req.query, 'action'))(req, res);

            res.status(200).sendFile(path.join(__dirname, 'admin', _.get(req, 'result')));
        } else {
            res.status(200).sendFile(path.join(__dirname, urlparts.pathname));
        }
    } else {
        res.status(404).send("Page Not Found");
    }

});

routes.get('/pages/*', function(req, res) {
    var urlparts = urllib.parse(_.get(req, 'url'), true);
    var url = urlparts.pathname.replace(/\-/g, ' ');
    url = !_.isNil(url) && url.indexOf('/pages/') >= 0 ? url.replace('/pages/', '') : url;
    if (util.pageExists(url)) {
        var page = _.get(db.data().pages, url);
        res.status(200).contentType(_.has(page, 'contentType') ? _.get(page, 'contentType') : 'text/html').send(_.get(page, 'content'));

    } else {
        res.status(404).send("Page Not Found");
    }

});


module.exports = routes;