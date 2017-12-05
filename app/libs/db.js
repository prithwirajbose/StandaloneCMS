var path = require("path");
var fs = require('file-system');
var _ = require('./lodash.min.js');

var dat = null;

function data() {
    return dat;
}

function loadData() {
    if (_.isNil(dat)) {
        if (!fs.existsSync(path.join(__dirname, 'data.json'))) {
            dat = { pages: {}, users: [], sessions: [] };
            fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(dat));
        }
        dat = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
    }
}

function saveData(newdata) {
    dat = newdata;
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(newdata));
}

module.exports.data = data;
module.exports.loadData = loadData;
module.exports.saveData = saveData;