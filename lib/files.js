'use strict';
const main = require('./index');
module.exports = function(syncData,dryRun) {
    return main(syncData,dryRun).files;
};