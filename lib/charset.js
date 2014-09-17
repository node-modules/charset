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

module.exports = charset;

/**
 * guest data charset from req.headers, xml, html content-type meta tag
 * headers:
 *  'content-type': 'text/html;charset=gbk'
 * meta tag:
 *  <meta http-equiv="Content-Type" content="text/html; charset=xxxx"/>
 * xml file:
 *  <?xml version="1.0" encoding="UTF-8"?>
 *
 * @param {Object} obj `Content-Type` String, or `res.headers`, or `res` Object
 * @param {Buffer} [data] content buffer
 * @param {Number} [peekSize] max content peek size, default is 512
 * @return {String} charset, lower case, e.g.: utf8, gbk, gb2312, ....
 *  If can\'t guest, return null
 * @api public
 */
function charset(obj, data, peekSize) {
  var matchs = null;
  var end = 0;
  if (data) {
    peekSize = peekSize || 512;
    // https://github.com/node-modules/charset/issues/4
    end = data.length > peekSize ? peekSize : data.length;
  }
  // charset('text/html;charset=gbk')
  var contentType = obj;
  if (contentType && typeof contentType !== 'string') {
    // charset(res.headers)
    var headers = obj;
    if (obj.headers) {
      // charset(res)
      headers = obj.headers;
    }
    contentType = headers['content-type'] || headers['Content-Type'];
  }
  if (contentType) {
    // guest from obj first
    matchs = CHARTSET_RE.exec(contentType);
  }
  if (!matchs && end > 0) {
    // guest from content body (html/xml) header
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
}
