'use strict'
/* eslint-env mocha */
/* eslint no-proto: 0 */
var assert = require('assert')
var setPrototypeOf = require('..')

function protoTest (obj, proto) {
  if (Object.getPrototypeOf) {
    assert.strictEqual(Object.getPrototypeOf(obj), proto)
  } else if ({ __proto__: [] } instanceof Array) {
    assert.strictEqual(obj.__proto__, proto)
  } else {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        assert.strictEqual(obj[prop], proto[prop])
      }
    }
  }
}

describe('setProtoOf(obj, proto)', function () {
  it('should merge objects', function () {
    var obj = { a: 1, b: 2 }
    var proto = { c: 3, d: 4 }
    var mergeObj = setPrototypeOf(obj, proto)
    protoTest(obj, proto)
    protoTest(mergeObj, proto)
    assert.strictEqual(mergeObj, obj)
  })
})
