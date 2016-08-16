'use strict';
const main = require('./index');
module.exports = function(syncData) {
    return main(syncData).promise;
};