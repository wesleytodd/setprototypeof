'use strict'
/* eslint no-proto: 0 */
module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : (Object.defineProperty && definePropertySupport()) ? inheritProperties : mixinProperties)

function setProtoOf (obj, proto) {
  obj.__proto__ = proto
  return obj
}

function inheritProperties (obj, proto) {
  for (var prop in proto) {
    if (!obj.hasOwnProperty(prop)) {
      Object.defineProperty(obj, prop, {
        get: function() { return proto[prop] },
        set: function(val) { delete obj[prop]; obj[prop] = val },
        enumerable: proto.propertyIsEnumerable(prop),
        configurable: true
      })
    }
  }
  return obj
}

function mixinProperties (obj, proto) {
  for (var prop in proto) {
    if (!obj.hasOwnProperty(prop)) {
      obj[prop] = proto[prop]
    }
  }
  return obj
}

function definePropertySupport() {
  try {
    Object.defineProperty({}, 'x', {});
    return true;
  } catch (e) {
    return false;
  }
}
