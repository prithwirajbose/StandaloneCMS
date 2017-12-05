var _ = require('./lodash.min.js');
var db = require('./db');

function createPage(req, res) {
    var newdata = db.data();
    console.log(req.body);
    _.set(newdata.pages, _.get(req.body, 'url').replace(/\-/g, ' '), {
        'contentType': _.get(req.body, 'contentType'),
        'content': _.get(req.body, 'content'),
        'name': _.get(req.body, 'name')
    });
    db.saveData(newdata);
    req.result = 'createpage.html';
}

module.exports.createPage = createPage;