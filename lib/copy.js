'use strict';
const main = require('./index');
module.exports = function(pkg) {
    return main(pkg).promise;
};