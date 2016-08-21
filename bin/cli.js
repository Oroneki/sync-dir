#!/usr/bin/env node
'use strict';

const path = require('path');
const meow = require('meow');
const syncDir = require('../index');

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = require(pkgPath);
if (!pkg.sync) return;

let cli = meow(`
    Usage
      $ sync-dir [--watch]
      
      package.json
      {
        "sync": {
          "/path/to/source/**/*": "/path/to/dest"
        }
      }
    Options
      -w, --watch
      -v, --version version
      -h, --help help
    Examples
      $ sync-dir
      $ sync-dir --watch
      $ sync-dir -w
`, {
    alias: {
        w: 'watch',
        v: 'version',
        h: 'help'
    },
    default: {
        watch: false
    },
    boolean: [
        'watch'
    ]
});

if (cli.flags.watch) {
    let files = syncDir.getFiles(pkg);
    syncDir.watch(files,() => {
        syncDir.copy(pkg);
    });
} else {
    syncDir.copy(pkg);
}