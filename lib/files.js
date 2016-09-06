'use strict';
const main = require('./index');
module.exports = function(syncData,options) {
    return main(syncData,options).files;
};
