/*!
 * charset - lib/charset.js
 *
 * Copyright(c) 2012 - 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   Oleg Slobodskoi <oleg008@gmail.com> (https://github.com/kof)
 */

"use strict";

/**
 * Module dependencies.
 */

var CHARTSET_RE = /(?:charset|encoding)\s*=\s*['"]? *([\w\-]+)/i;

/**
 * guest data charset from req.headers, xml, html content-type meta tag
 * headers:
 *  'content-type': 'text/html;charset=gbk'
 * meta tag:
 *  <meta http-equiv="Content-Type" content="text/html; charset=xxxx"/>
 * xml file:
 *  <?xml version="1.0" encoding="UTF-8"?>
 *
 * @param {Object} headers `res.headers`
 * @param {Buffer} data
 * @return {String} charset, lower case, e.g.: utf-8, gbk, gb2312, ....
 *  If can\'t guest, return null
 * @api public
 */
module.exports = function charset(headers, data) {
  var matchs = null;
  var end = 0;
  if (data) {
    end = data.length > 512 ? 512 : data.length;
  }
  var contentType = headers['content-type'] || headers['Content-Type'];
  if (contentType) {
    // guest from header first
    matchs = CHARTSET_RE.exec(contentType);
  }
  if (!matchs && end > 0) {
    // guest from html header
    contentType = data.slice(0, end).toString();
    matchs = CHARTSET_RE.exec(contentType);
  }
  var cs = null;
  if (matchs) {
    cs = matchs[1].toLowerCase();
    if (cs === 'utf-8') {
      cs = 'utf8';
    }
  }
  return cs;
};
