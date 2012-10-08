/*!
 * charset - test/charset.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var charset = require('../');
var should = require('should');
var fs = require('fs');
var testContent = fs.readFileSync(__dirname + '/test.txt');
var testContent2 = fs.readFileSync(__dirname + '/test2.txt');

describe('charset.test.js', function () {
  it('should get charset from headers', function () {
    charset({
      'content-type': 'text/html;charset=gBk'
    }, new Buffer('')).should.equal('gbk');
    charset({
      'content-type': 'text/html;charset=UTF8'
    }, new Buffer('')).should.equal('utf8');
    charset({
      'content-type': 'text/html;charset=gb2312'
    }, new Buffer('')).should.equal('gb2312');
  });

  it('should get charset from body', function () {
    charset({}, new Buffer('<meta http-equiv="Content-Type" content="text/html; charset=gBk"/>')).should.equal('gbk');
    charset({}, new Buffer('<meta charset=UTF8>')).should.equal('utf8');
    charset({}, testContent).should.equal('utf-8');
  });

  it('should get null when charset not word, number and -', function () {
    should.not.exist(charset({
      'content-type': 'text/html;charset=中文编码'
    }, new Buffer('')));
    should.not.exist(charset({
      'content-type': 'text/html;charset=|||'
    }, new Buffer('')));
  });

  it('should get null when charset not in top 500 bytes data', function () {
    should.not.exist(charset({}, testContent2));
  });
});