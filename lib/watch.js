'use strict';
const chalk = require('chalk');
const chokidar = require('chokidar');
const syncDir = require('../lib/index');
module.exports = function(pkg,callback) {
    let files = syncDir.getFiles(pkg,true);
    console.log(`${chalk.blue('[watching]')} ${files.join(',')}`);
    let watcher = chokidar.watch();
    files.forEach((file) => {
        watcher.add(file);
    });
    watcher.on('change',(e,path) => {
        console.log(`${chalk.yellow('---- changed ----')}`);
        callback(files);
    });
};