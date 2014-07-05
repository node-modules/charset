charset
=======

[![Build Status](https://secure.travis-ci.org/node-modules/charset.png)](http://travis-ci.org/node-modules/charset)
[![Coverage Status](https://coveralls.io/repos/node-modules/charset/badge.png)](https://coveralls.io/r/node-modules/charset)

[![NPM](https://nodei.co/npm/charset.png?downloads=true&stars=true)](https://nodei.co/npm/charset)

![logo](https://raw.github.com/node-modules/charset/master/logo.png)

Get the content charset from header and html content-type.

## Install

```bash
$ npm install charset --save
```

## Usage

### Detect charset from http client response and content

```js
var charset = require('charset');
var http = require('http');

http.get('http://nodejs.org', function (res) {
  res.on('data', function (chunk) {
    console.log(charset(res.headers, chunk));
    // or `console.log(charset(res, chunk));`
    res.destroy();
  });
});
```

Stdout will should log: `utf8` .

### Detect from String

```js
charset(res.headers['content-type']);
```

## License

(The MIT License)

Copyright (c) 2012 - 2014 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
