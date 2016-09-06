#!/usr/bin/env node
'use strict';

const path = require('path');
const meow = require('meow');
const syncDir = require('../index');

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = require(pkgPath);
pkg.sync = pkg.sync || {};

let cli = meow(`
    Usage
      $ sync-dir [--watch --config <confpath>]
      
      package.json
      {
        "sync": {
          "/path/to/source/**/*": "/path/to/dest"
        }
      }
      
      or
      
      sync.conf.js
      module.exports = {
        "sync": {
          "/path/to/source/**/*": "/path/to/dest"
        }
      }
    Options
      -w, --watch
      -c, --config
      -s, --silent
      -v, --version version
      -h, --help help
    Examples
      $ sync-dir
      $ sync-dir --watch
      $ sync-dir -w
      $ sync-dir --config ./sync.conf.js
`, {
    alias: {
        s: 'silent',
        w: 'watch',
        c: 'config',
        v: 'version',
        h: 'help'
    },
    default: {
        silent: false,
        watch: false
    },
    boolean: [
        'watch',
        'silent'
    ]
});

if (cli.flags.config) {
    let conf = require(path.join(process.cwd(), cli.flags.config));
    Object.assign(pkg.sync, conf);
}

if (cli.flags.watch) {
    syncDir.watch(pkg, cli.flags);
} else {
    syncDir.copy(pkg, cli.flags);
}
