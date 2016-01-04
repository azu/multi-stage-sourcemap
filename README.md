# multi-stage-sourcemap [![Build Status](https://travis-ci.org/azu/multi-stage-sourcemap.svg?branch=master)](https://travis-ci.org/azu/multi-stage-sourcemap)

This library provide re-mapping function for multi-level sourcemap.

## Installation

``` sh
npm install multi-stage-sourcemap
```

## Concept

### Basic SourceMap

well-know basic sourcemap is no problem.

![basic-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/basic-sourcemap.png)

### Multi-level SourceMap

Multi-level SourceMap has a problem.

[Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit# "Source Map Revision 3 Proposal - Google ドキュメント") doens't provide the way of mapping `Minified Code ` to `Original Code` in the following figure.

![multiple-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/multiple-sourcemap.png)

Example:

```
A.js -> B.js     -> C.js
        B.js.map -> C.js.map
```

We can't see from C.js to A.js.

### [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "azu/multi-stage-sourcemap") <= THIS LIBRARY

`multi-stage-sourcemap` can mapping `C.js` to `A.js`

![multiple-stage-sourcemap.png](http://efcl.info/wp-content/uploads/2014/09/multiple-stage-sourcemap.png)

> The easy but lossy way is to ignore the intermediate steps in the process for the purposes of debugging, the source location information from the translation is either ignored (the intermediate translation is considered the “Original Source”) or the source location information is carried through (the intermediate translation hidden).  -- [Source Map Revision 3 Proposal ](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit# "Source Map Revision 3 Proposal - Google ドキュメント")

`multi-stage-sourcemap` does that!

```
C.js -> ... -> A.js
```

Code:

``` js
var transfer = require("multi-stage-sourcemap").transfer;
var cToAMap = transfer({fromSourceMap: cMap, toSourceMap: bMap});
```

## Usage

### `transfer`

Return the re-mapped `rawSourceMap` string.

The only argument is an object with the following properties:

- `fromSourceMap` : Object - rawSourceMap or String - JSON.stringify(rawSourceMap)
- `toSourceMap` : Object - rawSourceMap or String - JSON.stringify(rawSourceMap)

`rawSourceMap` is like below object.

``` js
var rawSourceMap = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['one.js', 'two.js'],
  sourceRoot: 'http://exammuple.com/www/js/',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
```

For details, please see [mozilla/source-map](https://github.com/mozilla/source-map/#sourcemapconsumer "mozilla/source-map").

## Use Case

- [AltJS][] -> JavaScript -> minify
- [AltJS][] -> JavaScript -> [power-assert][]
  - [power-assert][] supports multi-level sourcemaps using this module.
  - [twada/battlefield-sourcemaps](https://github.com/twada/battlefield-sourcemaps "twada/battlefield-sourcemaps")
  - [power-assert 多段 SourceMap 対応の方針](https://gist.github.com/twada/103d34a3237cecd463a6 "power-assert 多段 SourceMap 対応の方針")

etc...

AltJS is languages that compile to JS.
(It's contain ES6 with [Traceur](https://github.com/google/traceur-compiler "Traceur"). )


[AltJS]: https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS  "List of languages that compile to JS · jashkenas/coffeescript Wiki"
[power-assert]: https://github.com/twada/power-assert  "twada/power-assert"

## Related library

- [Rich-Harris/sorcery](https://github.com/Rich-Harris/sorcery "Rich-Harris/sorcery")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
