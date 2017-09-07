'use strict';

const assert = require('assert');
const charset = require('..');

describe('performance.test.js', () => {
  function genstr(len, chr) {
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chr;
    }
    return result;
  }
  const longspace = genstr(800000, ' ');
  const longa = genstr(800000, 'a');

  it('should run fast', () => {
    assert(charset('encoding=' + longspace + '"utf8') === null);
  });

  it('should ignore space > 10', () => {
    assert(charset('encoding=' + genstr(0, ' ') + '"utf8') === 'utf8');
    assert(charset('encoding=' + genstr(9, ' ') + '"utf8') === 'utf8');
    assert(charset('encoding=' + genstr(10, ' ') + '"utf8') === 'utf8');
    assert(charset('encoding=' + genstr(11, ' ') + '"utf8') === null);
  });

  it('should ignore charset length > 100', () => {
    assert(charset('encoding=' + genstr(11, 'a')) === genstr(11, 'a'));
    assert(charset('encoding=' + genstr(99, 'a')) === genstr(99, 'a'));
    assert(charset('encoding=' + genstr(100, 'a')) === genstr(100, 'a'));
    assert(charset('encoding=' + genstr(101, 'a')) === genstr(100, 'a'));
    assert(charset('encoding=' + longa) === genstr(100, 'a'));
  });
});
