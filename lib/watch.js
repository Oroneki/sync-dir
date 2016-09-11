'use strict';
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const syncDir = require('../lib/index');
const parser = require('./parser');
const DEFAULT_OPTIONS = require('./constants').DEFAULT_OPTIONS;
const globBase = require('glob-base');

module.exports = function (pkg, options) {
    const syncData = pkg.sync;
    if (!syncData) return;
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    for (let from in syncData) {
        const basePath = parser(syncData[from], pkg.config);
        const base = globBase(from).base;
        let watcher = chokidar.watch(from);
        if (!options.silent) {
            console.log(`${chalk.blue('[watching]')} ${from}`);
        }
        watcher.on('change', (filepath) => {
            if (!options.silent) {
                console.log(`${chalk.yellow('---- changed ----')}`);
            }
            const dest = path.join(basePath,path.dirname(filepath.replace(base,'')));
            let target = {sync: {}};
            target.sync[filepath] = dest;
            syncDir.copy(target,options);
        });
    }
};
