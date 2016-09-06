'use strict';
const chalk = require('chalk');
const chokidar = require('chokidar');
const syncDir = require('../lib/index');
const parser = require('./parser');
const DEFAULT_OPTIONS = require('./constants').DEFAULT_OPTIONS;

module.exports = function (pkg, options) {
  const syncData = pkg.sync;
  if (!syncData) return;
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  for (let from in syncData) {
    const dest = parser(syncData[from], pkg.config);
    let watcher = chokidar.watch(from);
    if (!options.silent) {
      console.log(`${chalk.blue('[watching]')} ${from}`);
    }
    watcher.on('change', (path) => {
      if (!options.silent) {
        console.log(`${chalk.yellow('---- changed ----')}`);
      }
      let target = {sync: {}};
      target.sync[path] = syncData[from];
      syncDir.copy(target,options);
    });
  }
};
