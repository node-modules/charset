'use strict';

const assert = require('assert');
const fs = require('fs');
const charset = require('../');

const testContent = fs.readFileSync(__dirname + '/test.txt');
const testContent2 = fs.readFileSync(__dirname + '/test2.txt');

describe('charset.test.js', function() {
  it('should get charset from headers', function() {
    assert(charset({
      'content-type': 'text/html;charset=gBk',
    }, new Buffer('')) === 'gbk');
    assert(charset({
      'content-type': 'text/html;charset=UTF8',
    }, new Buffer('')) === 'utf8');
    assert(charset({
      'content-type': 'text/html;charset=UTF-8',
    }, new Buffer('')) === 'utf8');
    assert(charset({
      'content-type': 'text/html;charset=gb2312',
    }, new Buffer('')) === 'gb2312');
    assert(charset({
      'Content-Type': 'text/html;Charset=UTF-8',
    }) === 'utf8');
  });

  it('should get charset from res', function() {
    const res = {
      headers: {
        'content-type': 'text/html;charset=gb2312',
      },
    };
    assert(charset(res) === 'gb2312');
  });

  it('should get charset from Content-Type string', function() {
    assert(charset('text/html;charset=gb2312') === 'gb2312');
  });

  it('should get charset from body', function() {
    assert(charset({}, new Buffer('<meta http-equiv="Content-Type" content="text/html; charset=gBk"/>')) === 'gbk');
    assert(charset({}, new Buffer('<meta charset=UTF8>')) === 'utf8');
    assert(charset({}, testContent) === 'utf8');
    // work for string body
    assert(charset(null, testContent.toString()) === 'utf8');
  });

  it('should get charset from xml header', function() {
    assert(charset({}, new Buffer('<?xml version="1.0" encoding="utf-8"?>')) === 'utf8');
  });

  it('should get charset with white space chars around "="', function() {
    assert(charset({}, new Buffer('<?xml version="1.0" encoding =  "utf-8"?>')) === 'utf8');
    assert(charset({}, new Buffer('<?xml version="1.0" encoding =  "utf-8"?>').toString()) === 'utf8');
  });

  it('should get charset with white space chars around charset', function() {
    assert(charset({}, new Buffer('<?xml version="1.0" encoding=" utf-8 "?>')) === 'utf8');
  });

  it('should get null when charset not word, number and -', function() {
    assert(!charset({
      'content-type': 'text/html;charset=中文编码',
    }, new Buffer('')));
    assert(!charset({
      'content-type': 'text/html;charset=|||',
    }, new Buffer('')));
  });

  it('should get null when charset not in top 500 bytes data', function() {
    assert(!charset({}, testContent2));
  });
});
