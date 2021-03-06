[![Build Status](https://travis-ci.org/derberg/arghun.svg?branch=master)](https://travis-ci.org/derberg/arghun)
[![npm version](https://badge.fury.io/js/arghun.svg)](https://badge.fury.io/js/arghun)
[![npm](https://img.shields.io/npm/dm/arghun.svg)](https://www.npmjs.com/package/arghun)
[![npm](https://img.shields.io/npm/dt/arghun.svg)](https://www.npmjs.com/package/arghun)


![Arghun](arghun.png)

Blazingly fast and nifty directories traverser :)

* Zero dependencies
* Zero callbacks
* Node 7.x
* ES6 and beyond
* Clear and beautiful async-await
* Based on `for` loop (`while` performance was exactly the same but with 2 extra lines of code)
```
Traversing of 101 files (23 directories) takes 13-15ms (0.01sec)
Traversing of 1000000 (1M) files (231248 directories) takes 121884.282ms (121sec) -> measured with perf test run on travis.
```

### Install

`npm install arghun`

### Quick usage

Async/await in Node.js <7.6 is hidden behind the harmony flag (`--harmony-async-await`). Keep that in mind when running your code. Otherwise compiler complains on the async function definition.

Since 7.6 no harmony flag is needed, I suggest you to upgrade to latest version with latest v8 engine.

1. Create a 'myWalk.js' in your Node.js project
2. Add this content to the project:
 ```
 const arghun = require('arghun');
 const myPath = './';

 async function sampleWalkDir(path) {

  console.time('Walking and getting total number of files took');
  const walkDirResult = await arghun.walkDir(path);
  const sumAllFiles = await arghun.getTotal(walkDirResult);
  console.timeEnd('Walking and getting total number of files took');
  console.log('Number of files in the directory', sumAllFiles);
 }

 sampleWalkDir(myPath);
 ```
3. Run the code with the following call: `node myWalk.js`

### Quick start with project development

1. `git clone https://github.com/derberg/arghun.git`
2. `cd arghun`
3. `npm install` (just kidding, there are no dependencies to install)
4. `npm run sample` or `SAMPLE_PATH='../' npm run sample`:
 * `SAMPLE_PATH`: Set path for traverse, default points to test sample data
 * `SAMPLE_OPT`: Set to true to use the options hardcoded in the sample file, default is {}
 * `SAMPLE_PATTERN`: Set to true to use the options hardcoded in the sample file, default is {}

### API

[Sample usage](samples/index.js)

#### `arghun.walkDir(path[, opt])`

Dir crawler that recursively per dir name lists all file names or sum number of those. Specific blacklists of dirs and files that should be ignored can be applied through the opt object.

Arguments:
* `path` - Path to the dir you want to traverse
* `opt` - Object with more options like:
 * blFiles - Blacklist of files you want to ignore during traversing
 * blDir - Blacking of dirs you want to ignore during traversing
 * dirMap - Instead of counting down the list of files in dirs, set to `true` to get array list of filenames

Sample result without options:
```
{ './test/testData/testDirectory/A-characters': 7,
  './test/testData/testDirectory/A-characters/even-more-A': 6,
  './test/testData/testDirectory/A-characters/how-abou-moreA': 6,
  './test/testData/testDirectory/G-characters': 7 }
```

Sample `opt` object:
```
{
  blFiles: ['^index\.', 'meta-inf', 'api.raml', 'apireference.html', 'client.zip', 'apiconsole.html'],
  blDir: ['.git', 'apiconsole', 'apinotebooks', 'blog', 'bower_components', 'build', 'error', 'fonts', 'images', 'img', 'internal', 'lunr', 'matrix', 'placeholders', 'scripts', 'styles', 'services/beta', 'services/eu', 'services/us', 'latest$', '/client', '/download', 'vendor'],
  dirMap: true
}
```

Sample result with filenames instead of total sum of files:
```
{ './test/testData/testDirectory/A-characters':
      [ 'Acros-Krik.txt',
        'AdmiralGialAckbar.html',
        'Ak-Rev.xml',
        'Almec.json',
        'AskAak.json',
        'MasAmedda.html',
        'StassAllie.raml' ],
     './test/testData/testDirectory/B-characters/more-B/inside-B': [ 'MinaBonteri.js', 'TheBendu.html' ],
     './test/testData/testDirectory/B-characters/more-B/inside-B/custom':
      [ 'BorvotheHutt.css',
        'Bossk.js',
        'Depa-Billable.json',
        'SioBibble.js' ],
     './test/testData/testDirectory/B-characters/my-man': [ 'BB-8.css' ],
     './test/testData/testDirectory/G-characters':
      [ 'Adi Gallia.js',
        'Commander Gree.raml',
        'Gardulla the Hutt.html',
        'Garindan.less',
        'Gonk droid.html',
        'Saw Gerrera.raml',
        'Yarna d\'al\' Gargan.js' ] }
```

#### `arghun.getTotal(o)`

Depending on a given object. If it contains Numbers, then it is a sum value, if Strings, then it is an array of strings.

Arguments:
* `o` - Object with Number values or String values. Cannot be mixed.

#### `arghun.getCustomDetails(o, patterns)`

Depending on a given object.  If it contains Numbers, then returned object contains sum values, if Strings, then returned object keys have arrays of strings. Getting more reduced results from a given object basing on a given pattern.

Arguments:
* `o` - Object that has to be reduced
* `patterns` - List of objects with name and pattern keys. `name` becomes a key in returned object, while `pattern` string is used to identify the same keys in `o` object to sum them up under a given `name`.

Sample patterns array:
```
[
  {
    "name": "A-characters",
    "pattern": "\/A-characters"
  },
  {
    "name": "B-characters",
    "pattern": "\/B-characters"
  },
  {
    "name": "C-characters",
    "pattern": "\/C-characters"
  }
]
```

Sample returned reduced object:
```
{
  'A-characters': 19,
  'B-characters': 18,
  'C-characters': 12
}
```

#### `arghun.isBlacklisted(str, arr)`

Checks weather given string is present in a given array

Arguments:
* `str` - Value that has to be checked if it is blacklisted.
* `arr` - List of strings that a given str is validated against. Regex values are supported.

### Run tests

`npm test`

### Debugging

To enable logging add the following environment variable: `ARGHUN_LOG=true`

### Releasing

```
npm run release:patch # for patch release
npm run release:minor # for minor release

```
