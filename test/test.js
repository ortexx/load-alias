"use strict";

let assert = require('chai').assert;
let path = require('path');
let LoadAlias = require('../load-alias');

describe('LoadAlias:', function() {
  describe('api:', function() {
    let alias;
    let config = {
      test: 'test',
      what: '@test/what',
      is: '@what/is',
      it: () => '@is/it',
      do: '@what/do',
      you: '@do/you',
    };

    describe('#constructor()', function () {
      it('check instance', function () {
        alias = new LoadAlias(config);
        assert.instanceOf(alias, LoadAlias);
      });
    });

    describe('#getConfig(), #setConfig()', function () {
      it('check config getting', function () {
        assert.strictEqual(alias.getConfig(), config);
      });

      it('check config setting', function () {
        let newValue = "hi";

        alias.setConfig({ newValue: newValue });
        assert.equal(alias.config.newValue, newValue);
      });
    });

    describe('#get(), #set(), #del()', function () {
      it('check getting an alias', function () {
        assert.equal(alias.get('test'), 'test');
      });

      it('check setting an alias', function () {
        alias.set('new', 'new');
        assert.equal(alias.config.new, 'new');
      });

      it('check deleting an alias', function () {
        alias.del('new', 'new');
        assert.isUndefined(alias.config.new);
      });
    });

    describe('#transform(), #getPath(), #getFullPath()', function () {
      let _in = '@what/@do/@you/@do';
      let _out = 'test/what/test/what/do/test/what/do/you/test/what/do';

      it('check transformation', function () {
        assert.equal(alias.transform(_in), _out);
      });

      it('check unkown key', function () {
        assert.equal(alias.transform('@unkown/test'), '@unkown/test');
      });

      it('check full transformation', function () {
        assert.equal(alias.getFullPath(_in), path.join(alias.rootPath, _out));
      });
    });

    describe('#load(), #require()', function () {
      it('check loading', function () {
        assert.equal('hello', alias.load('@it'));
      });

      it('check requiring', function () {
        assert.strictEqual(path, alias.require('path'));
      });
    });
  })
});