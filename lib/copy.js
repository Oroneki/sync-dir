'use strict';
const main = require('./index');
module.exports = function(pkg,options) {
    return main(pkg,options).promise;
};
