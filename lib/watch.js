'use strict';
const chalk = require('chalk');
const chokidar = require('chokidar');
const syncDir = require('../lib/index');
const parser = require('./parser');

module.exports = function(pkg) {
    const syncData = pkg.sync;
    if (!syncData) return;
    for (let from in syncData) {
        const dest = parser(syncData[from],pkg.config);
        let watcher = chokidar.watch(from);
        console.log(`${chalk.blue('[watching]')} ${from}`);
        watcher.on('all',(e,path) => {
            console.log(`${chalk.yellow('---- changed ----')}`);
            let target = {sync:{}};
            target.sync[from] = syncData[from];
            syncDir.copy(target);
        });
    }
};