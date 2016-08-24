'use strict';
const assert = require('power-assert');
const fs = require('fs');
const syncDir = require('../index');
const rimraf = require('rimraf');

describe('sync-dir', function() {
    const SYNC_DATA = {
        sync: {
            "./test/files/*": "./test/files/dest"
        }
    };
    beforeEach(() => {
        rimraf.sync('./test/files/dest');
    });
    afterEach(() => {
        rimraf.sync('./test/files/dest');
    });
    it('getFiles',() => {
        let files = syncDir.getFiles(SYNC_DATA);
        assert(files.length === 2);
        assert(files[0] === './test/files/dummy.txt');
        assert(files[1] === './test/files/dummy2.txt');
    });
    it('copy',(done) => {
        syncDir.copy(SYNC_DATA).then((res) => {
            assert(fs.existsSync('./test/files/dest/dummy.txt'));
            assert(fs.existsSync('./test/files/dest/dummy2.txt'));
            done();
        });
    });
    it('core - dry run',() => {
        let files = syncDir(SYNC_DATA,true).files;
        assert(files.length === 2);
        assert(files[0] === './test/files/dummy.txt');
        assert(files[1] === './test/files/dummy2.txt');
    });
    it('core',(done) => {
        syncDir(SYNC_DATA,false).promise.then((res) => {
            assert(fs.existsSync('./test/files/dest/dummy.txt'));
            assert(fs.existsSync('./test/files/dest/dummy2.txt'));
            done();
        });
    });
});