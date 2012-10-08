/*!
 * charset - index.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

var CHARTSET_RE = /charset=['"]?([\w\-]+)/i;

/**
 * guest data charset from req.headers and html content-type meta tag
 * headers:
 *  'content-type': 'text/html;charset=gbk'
 * meta tag:
 *  <meta http-equiv="Content-Type" content="text/html; charset=xxxx"/>
 * 
 * @param {Object} headers, res.headers.
 * @param {Buffer} data
 * @return {String} charset, lower case, e.g.: utf-8, gbk, gb2312, ....
 *  If can\'t guest, return null
 * @api public
 */
module.exports = function charset(headers, data) {
  var matchs = null;
  var end = data.length > 512 ? 512 : data.length;
  var contentType = headers['content-type'];
  if (contentType) {
    // guest from header first
    matchs = CHARTSET_RE.exec(contentType);
  }
  if (!matchs) {
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