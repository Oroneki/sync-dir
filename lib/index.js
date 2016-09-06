'use strict';
const cpx = require('cpx');
const glob = require('glob');
const chalk = require('chalk');
const parser = require('./parser');
const DEFAULT_OPTIONS = require('./constants').DEFAULT_OPTIONS;

module.exports = function (pkg,options) {
  if (!pkg.sync) return;
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  const syncData = pkg.sync;
  let files = [],
    promises = [];
  for (let from in syncData) {
    const sources = glob.sync(from);
    const dest = parser(syncData[from], pkg.config);
    sources.forEach((src) => {
      src = parser(src, pkg.config);
      files.push(src);
      promises.push(new Promise((resolve, reject) => {
        if (!options.silent) {
          console.log(`${chalk.green('[sync]')} ${src} -> ${dest}`);
        }
        cpx.copy(src, dest, options, (err,a,b) => {
          if (err) return reject(err);
          resolve({src: src, dest: dest});
        });
      }));
    });
  }
  return {
    files: files,
    promise: Promise.all(promises)
  };
};
