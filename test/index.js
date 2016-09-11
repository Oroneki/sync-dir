'use strict';
const assert = require('power-assert');
const fs = require('fs');
const syncDir = require('../index');
const rimraf = require('rimraf');

describe('sync-dir', function() {
    const DEST = './dest';
    const SYNC_DATA = {
        sync: {
            "./test/files/*.txt": DEST
        }
    };

    beforeEach(() => {
        rimraf.sync(DEST);
    });
    afterEach(() => {
        rimraf.sync(DEST);
    });
    it('getFiles',() => {
        let files = syncDir.getFiles(SYNC_DATA);
        assert(files.length === 2);
        assert(files[0] === './test/files/dummy.txt');
        assert(files[1] === './test/files/dummy2.txt');
    });
    it('copy',(done) => {
        syncDir.copy(SYNC_DATA).then((res) => {
            assert(fs.existsSync(`${DEST}/dummy.txt`));
            assert(fs.existsSync(`${DEST}/dummy2.txt`));
            done();
        });
    });
    it('core - dry run',() => {
        let files = syncDir(SYNC_DATA).files;
        assert(files.length === 2);
        assert(files[0] === './test/files/dummy.txt');
        assert(files[1] === './test/files/dummy2.txt');
    });
    it('core',(done) => {
        syncDir(SYNC_DATA).promise.then((res) => {
            assert(fs.existsSync(`${DEST}/dummy.txt`));
            assert(fs.existsSync(`${DEST}/dummy2.txt`));
            done();
        });
    });
});