const chalk = require('chalk');
const nodemon = require('nodemon');
module.exports = function(dirs,callback) {
    console.log(`${chalk.blue('[watching]')} ${dirs.join(',')}`);
    nodemon({
        script: '#',
        watch: dirs
    }).on('start', () => {
        console.log(`${chalk.yellow('---- changed ----')}`);
        callback(dirs);
    }).on('quit', () => {
        process.exit(0);
    });
};