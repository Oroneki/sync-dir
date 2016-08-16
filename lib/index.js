const cpx = require('cpx');
const glob = require('glob');
const chalk = require('chalk');

module.exports = function(syncData, dryRun=false) {
    let files = [],
        promises = [];
    for (let from in syncData) {
        const sources = glob.sync(from);
        const dest = syncData[from];
        sources.forEach((src) => {
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