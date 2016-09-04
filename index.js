var renderToString = require('preact-render-to-string');
var beautifyHTML = require('js-beautify').html;
var diffWords = require('diff').diffWords;
var chalk = require('chalk');
var fail = require('assert').fail;

var inKarma = !!(global.top && global.top.karma);
var colors = new chalk.constructor({
  enabled: inKarma
});

module.exports = function assertEqualJSX(actual, expected, opts) {
  opts = opts || {}

  actual = renderToString(actual);
  expected = renderToString(expected);

  if (opts.sanitize) {
    actual = opts.sanitize(actual);
    expected = opts.sanitize(expected);
  }

  if (actual === expected) {
    return;
  }

  actual = beautifyHTML(actual);
  expected = beautifyHTML(expected);

  var diff = diffWords(actual, expected)
    .map(function(part) {
      if (part.added) {
        return colors.black.bgRed(part.value);
      } else if (part.removed) {
        return colors.black.bgGreen(part.value);
      } else {
        return colors.gray(part.value);
      }
    })
    .join('');

  var message = [
    '',
    '-------------------------------------------------------------------------',
    '',
    colors.gray('Diff:'),
    diff,
    '',
    colors.green('Actual:'),
    colors.green(actual),
    '',
    colors.red('Expected:'),
    colors.red(expected),
    '',
    '-------------------------------------------------------------------------',
  ].join('\n');

  fail(actual, expected, message, '==');
};
