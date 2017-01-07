/*eslint no-console: "error" */
'use strict';

const assert = require('assert');
const arghun = require('../../');
const expected = { './test/testData/A-characters': 7,
  './test/testData/A-characters/even-more-A': 6,
  './test/testData/A-characters/how-abou-moreA': 6,
  './test/testData/B-characters': 6,
  './test/testData/B-characters/crap': 1,
  './test/testData/B-characters/even-more-B': 1,
  './test/testData/B-characters/more-B': 3,
  './test/testData/B-characters/more-B/inside-B': 2,
  './test/testData/B-characters/more-B/inside-B/custom': 4,
  './test/testData/B-characters/my-man': 1,
  './test/testData/C-characters': 6,
  './test/testData/C-characters/even-more-c': 4,
  './test/testData/C-characters/my-man': 2,
  './test/testData/D-characters': 7,
  './test/testData/D-characters/even-more-d': 6,
  './test/testData/D-characters/more-and-more-D': 6,
  './test/testData/D-characters/my-man': 1,
  './test/testData/E-characters': 12,
  './test/testData/F-characters': 5,
  './test/testData/F-characters/even-more-f': 4,
  './test/testData/F-characters/moremoremore': 3,
  './test/testData/F-characters/my-man': 1,
  './test/testData/G-characters': 7 };

async function walkDirBasic(path) {

  try {

    const result = await arghun.walkDir(path);
    assert.deepEqual(result, expected, 'walkDir failed with basic flow');
  }

  catch(err) {

    console.log(err);
    throw new Error(err);
  }
}

module.exports = walkDirBasic;