'use strict';
module.exports = function(str,conf) {
    for (let key in conf) {
        str = str.replace(`$npm_package_config_${key}`,conf[key]);
        str = str.replace(`\$\{${key}\}`,conf[key]);
    }
    for (let env in process.env) {
        if (/^npm_package_config_/.test(env)) {
            str = str.replace(`$${env}`, process.env[env]);
            let key = env.replace(/^npm_package_config_/,'');
            str = str.replace(`\$\{${key}\}`,process.env[env]);
        }
    }
    return str;
};