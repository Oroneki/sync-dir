'use strict';
const cpx = require('cpx');
const glob = require('glob');
const chalk = require('chalk');
const parser = require('./parser');

module.exports = function(pkg, dryRun) {
    if (!pkg.sync) return;
    if (!dryRun) {
        dryRun = false;
    }
    const syncData = pkg.sync;
    let files = [],
        promises = [];
    for (let from in syncData) {
        const sources = glob.sync(from);
        const dest = parser(syncData[from],pkg.config);
        sources.forEach((src) => {
            src = parser(src,pkg.config);
            files.push(src);
            if (dryRun === true) return;
            promises.push(new Promise((resolve, reject) => {
                console.log(`${chalk.green('[sync]')} ${src} -> ${dest}`);
                cpx.copy(src, dest, (err) => {
                    if (err) return reject(err);
                    resolve({src:src,dest:dest});
                });
            }));
        });
    }
    return {
        files: files,
        promise: Promise.all(promises)
    };
};
