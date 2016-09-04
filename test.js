var assert = require('assert');
var assertEqualJSX = require('./');
var h = require('preact').h;

describe('assertEqualJSX', function() {
  it('should pass when jsx is equal', function() {
    assertEqualJSX(
      h('div'),
      h('div')
    );
  });

  it('should fail when jsx isnt equal', function() {
    assert.throws(function() {
      assertEqualJSX(
        h('div'),
        h('span')
      );
    });
  });
});
