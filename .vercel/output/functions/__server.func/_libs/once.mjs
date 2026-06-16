import { r as requireWrappy } from "./wrappy.mjs";
var once = { exports: {} };
var hasRequiredOnce;
function requireOnce() {
  if (hasRequiredOnce) return once.exports;
  hasRequiredOnce = 1;
  var wrappy = requireWrappy();
  once.exports = wrappy(once$1);
  once.exports.strict = wrappy(onceStrict);
  once$1.proto = once$1(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once$1(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
      value: function() {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once$1(fn) {
    var f = function() {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function() {
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
  return once.exports;
}
export {
  requireOnce as r
};
