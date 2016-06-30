var expect = require('./lib/expect');
var rewire = require('rewire');
var sinon = require('sinon');

describe('unwin module', function() {
  var os, platform, unwin;

  function setup() {
    unwin = rewire('../lib/unwin');
    platform = 'win32';

    os = {
      platform: sinon.spy(function() {
        return platform;
      })
    };
    unwin.__set__('os', os);
  }

  beforeEach(setup);

  describe('on Windows', function() {
    it('replaces backslash with forward slash', function() {
      expect(unwin('\\top\\test\\file1.test.js')).to.eq('/top/test/file1.test.js');
    });

    it('removes c:/', function() {
      expect(unwin('c:\\')).to.eq('/');
      expect(unwin('c:\\top\\test\\file1.test.js')).to.eq('/top/test/file1.test.js');
    });
  });

  describe('on Linux', function() {
    beforeEach(function() {
      platform = 'linux';
    });

    it('does not replace backslash with forward slash', function() {
      var input = '\\top\\test\\file1.test.js';
      expect(unwin(input)).to.eq(input);
    });

    it('does not remove c:/', function() {
      var input = 'c:\\';
      expect(unwin(input)).to.eq(input);
      input = 'c:\\top\\test\\file1.test.js';
      expect(unwin(input)).to.eq(input);
    });
  });
});
