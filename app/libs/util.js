var path = require("path");
var db = require('./db');
var _ = require('./lodash.min.js');

function pageExists(urlslug) {
    return !_.isNil(db.data().pages) && _.has(db.data().pages, urlslug);
}


module.exports.pageExists = pageExists;