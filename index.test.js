var assert = require('assert')
var setProtoOf = require('.')

describe('setProtoOf(obj, proto)', function() {
	it('should merge objects', function(){
		var obj = { a: 1, b: 2 }
		var proto = { c: 3, d: 4 }
		var mergeObj = setProtoOf(obj, proto);
		var expected = { a: 1, b: 2 };
		expected.__proto__ = proto;

		assert.deepStrictEqual(obj, expected);
	})
})
