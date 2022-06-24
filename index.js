'use strict'
/* eslint no-proto: 0 */
module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : (Object.defineProperty && definePropertySupport()) ? inheritProperties : mixinProperties)

function setProtoOf (obj, proto) {
  obj.__proto__ = proto
  return obj
}

function inheritProperties (obj, proto) {
  var props = Object.getOwnPropertyNames(proto)
  for (var i=0; i<props.length; i++) {
    var prop = props[i]
    if (!obj.hasOwnProperty(prop)) {
      Object.defineProperty(obj, prop, {
        get: (function(prop) {return function() { return proto[prop] }})(prop),
        set: (function(prop) {return function(val) { delete obj[prop]; obj[prop] = val }})(prop),
        enumerable: proto.propertyIsEnumerable(prop),
        configurable: true
      })
    }
  }
  return obj
}

function mixinProperties (obj, proto) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
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
