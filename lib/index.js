const cpx = require('cpx');
const glob = require('glob');
const chalk = require('chalk');

module.exports = function(pkg, dryRun=false) {
    if (!pkg.sync) return;
    const syncData = pkg.sync;
    let files = [],
        promises = [];
    for (let from in syncData) {
        const sources = glob.sync(from);
        const dest = parseConfString(syncData[from],pkg.config);
        sources.forEach((src) => {
            src = parseConfString(src,pkg.config);
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
function parseConfString(str,conf) {
    if (!conf) return str;
    for (let key in conf) {
        str = str.replace(`$npm_package_config_${key}`,conf[key]);
    }
    return str;
}