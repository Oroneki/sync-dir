# sync-dir

sync directory in package.json

## Require

Node.js =< 5.0

## Install

```
npm i sync-dir --save-dev
```

## Usage

Add 'sync' property to package.json.

```
{
  "sync": {
    "/path/to/source/**/*": "/path/to/dest"
  }
}
```

Or create `sync.conf.js`. When, execute `sync-dir` command with `-c ./sync.conf.js` option.

```
module.exports = {
    "/path/to/source/**/*": "/path/to/dest"
};
```

### CLI

```
# from package.json's sync property.
$ sync-dir 

# watch files
$ sync-dir -w

# from `sync.conf.js`
$ sync-dir -c ./sync.conf.js
```

### Options

- -w, --watch: watch directories
- -c, --config: load sync files config
- -v, --version version: show version number
- -h, --help help: show help

### Module

```
const syncDir = require('sync-dir');
syncDir.copy({
    '/path/to/source/**/*': '/path/to/dest'
}).then(() => {
    // done
}).catch(() => {
    // error
});
```

```
const syncDir = require('sync-dir');
const DATA = {
    '/path/to/source/**/*': '/path/to/dest'
};
let files = syncDir.getFiles(DATA);
syncDir.watch(files,() => {
    syncDir.copy(DATA);
});
```