const fse = require('fs-extra');
const path = require('path');
fse.copySync(path.join(__dirname, '/dist'), path.join(__dirname, '/public'));