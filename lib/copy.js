'use strict';
const main = require('./index');
module.exports = function(pkg,dryRun) {
    return main(pkg,dryRun).promise;
};