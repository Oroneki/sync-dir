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

### CLI

```
$ sync-dir [options]
```

### Options

- -w, --watch: watch directories
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