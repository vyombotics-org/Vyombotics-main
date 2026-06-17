var arrify_1;
var hasRequiredArrify;
function requireArrify() {
  if (hasRequiredArrify) return arrify_1;
  hasRequiredArrify = 1;
  const arrify = (value) => {
    if (value === null || value === void 0) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return [value];
    }
    if (typeof value[Symbol.iterator] === "function") {
      return [...value];
    }
    return [value];
  };
  arrify_1 = arrify;
  return arrify_1;
}
export {
  requireArrify as r
};
