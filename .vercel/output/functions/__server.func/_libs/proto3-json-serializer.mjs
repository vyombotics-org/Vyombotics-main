var src = {};
var toproto3json = {};
var any = {};
var fromproto3json = {};
var bytes = {};
var hasRequiredBytes;
function requireBytes() {
  if (hasRequiredBytes) return bytes;
  hasRequiredBytes = 1;
  Object.defineProperty(bytes, "__esModule", { value: true });
  bytes.bytesToProto3JSON = bytesToProto3JSON;
  bytes.bytesFromProto3JSON = bytesFromProto3JSON;
  function bytesToProto3JSON(obj) {
    if (Buffer.isBuffer(obj)) {
      return obj.toString("base64");
    } else {
      return Buffer.from(obj.buffer, 0, obj.byteLength).toString("base64");
    }
  }
  function bytesFromProto3JSON(json) {
    return Buffer.from(json, "base64");
  }
  return bytes;
}
var _enum = {};
var hasRequired_enum;
function require_enum() {
  if (hasRequired_enum) return _enum;
  hasRequired_enum = 1;
  Object.defineProperty(_enum, "__esModule", { value: true });
  _enum.resolveEnumValueToString = resolveEnumValueToString;
  _enum.resolveEnumValueToNumber = resolveEnumValueToNumber;
  function resolveEnumValueToString(enumType, enumValue) {
    if (typeof enumValue === "number") {
      const value2 = enumType.valuesById[enumValue];
      if (typeof value2 === "undefined") {
        return enumValue;
      }
      return value2;
    }
    if (typeof enumValue === "string") {
      return enumValue;
    }
    throw new Error("resolveEnumValueToString: enum value must be a string or a number");
  }
  function resolveEnumValueToNumber(enumType, enumValue) {
    if (typeof enumValue === "number") {
      return enumValue;
    }
    if (typeof enumValue === "string") {
      const num = enumType.values[enumValue];
      if (typeof num === "undefined") {
        return enumValue;
      }
      return num;
    }
    throw new Error("resolveEnumValueToNumber: enum value must be a string or a number");
  }
  return _enum;
}
var value = {};
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  Object.defineProperty(util, "__esModule", { value: true });
  util.wrapperTypes = void 0;
  util.getFullyQualifiedTypeName = getFullyQualifiedTypeName;
  util.assert = assert;
  function getFullyQualifiedTypeName(type) {
    let fullyQualifiedTypeName = "";
    while (type.parent) {
      fullyQualifiedTypeName = `.${type.name}${fullyQualifiedTypeName}`;
      type = type.parent;
    }
    return fullyQualifiedTypeName;
  }
  util.wrapperTypes = /* @__PURE__ */ new Set([
    ".google.protobuf.DoubleValue",
    ".google.protobuf.FloatValue",
    ".google.protobuf.Int64Value",
    ".google.protobuf.UInt64Value",
    ".google.protobuf.Int32Value",
    ".google.protobuf.UInt32Value",
    ".google.protobuf.BoolValue",
    ".google.protobuf.StringValue",
    ".google.protobuf.BytesValue"
  ]);
  function assert(assertion, message) {
    if (!assertion) {
      throw new Error(message);
    }
  }
  return util;
}
var hasRequiredValue;
function requireValue() {
  if (hasRequiredValue) return value;
  hasRequiredValue = 1;
  Object.defineProperty(value, "__esModule", { value: true });
  value.googleProtobufStructToProto3JSON = googleProtobufStructToProto3JSON;
  value.googleProtobufListValueToProto3JSON = googleProtobufListValueToProto3JSON;
  value.googleProtobufValueToProto3JSON = googleProtobufValueToProto3JSON;
  value.googleProtobufStructFromProto3JSON = googleProtobufStructFromProto3JSON;
  value.googleProtobufListValueFromProto3JSON = googleProtobufListValueFromProto3JSON;
  value.googleProtobufValueFromProto3JSON = googleProtobufValueFromProto3JSON;
  const util_1 = requireUtil();
  function googleProtobufStructToProto3JSON(obj) {
    const result = {};
    const fields = obj.fields;
    for (const [key, value2] of Object.entries(fields)) {
      result[key] = googleProtobufValueToProto3JSON(value2);
    }
    return result;
  }
  function googleProtobufListValueToProto3JSON(obj) {
    (0, util_1.assert)(Array.isArray(obj.values), "ListValue internal representation must contain array of values");
    return obj.values.map(googleProtobufValueToProto3JSON);
  }
  function googleProtobufValueToProto3JSON(obj) {
    if (Object.prototype.hasOwnProperty.call(obj, "nullValue")) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(obj, "numberValue") && typeof obj.numberValue === "number") {
      if (!Number.isFinite(obj.numberValue)) {
        return obj.numberValue.toString();
      }
      return obj.numberValue;
    }
    if (Object.prototype.hasOwnProperty.call(obj, "stringValue") && typeof obj.stringValue === "string") {
      return obj.stringValue;
    }
    if (Object.prototype.hasOwnProperty.call(obj, "boolValue") && typeof obj.boolValue === "boolean") {
      return obj.boolValue;
    }
    if (Object.prototype.hasOwnProperty.call(obj, "structValue") && typeof obj.structValue === "object") {
      return googleProtobufStructToProto3JSON(obj.structValue);
    }
    if (Object.prototype.hasOwnProperty.call(obj, "listValue") && typeof obj === "object" && typeof obj.listValue === "object") {
      return googleProtobufListValueToProto3JSON(obj.listValue);
    }
    return null;
  }
  function googleProtobufStructFromProto3JSON(json) {
    const fields = {};
    for (const [key, value2] of Object.entries(json)) {
      fields[key] = googleProtobufValueFromProto3JSON(value2);
    }
    return { fields };
  }
  function googleProtobufListValueFromProto3JSON(json) {
    return {
      values: json.map((element) => googleProtobufValueFromProto3JSON(element))
    };
  }
  function googleProtobufValueFromProto3JSON(json) {
    if (json === null) {
      return { nullValue: "NULL_VALUE" };
    }
    if (typeof json === "number") {
      return { numberValue: json };
    }
    if (typeof json === "string") {
      return { stringValue: json };
    }
    if (typeof json === "boolean") {
      return { boolValue: json };
    }
    if (Array.isArray(json)) {
      return {
        listValue: googleProtobufListValueFromProto3JSON(json)
      };
    }
    if (typeof json === "object") {
      return {
        structValue: googleProtobufStructFromProto3JSON(json)
      };
    }
    throw new Error(`googleProtobufValueFromProto3JSON: incorrect parameter type: ${typeof json}`);
  }
  return value;
}
var duration = {};
var hasRequiredDuration;
function requireDuration() {
  if (hasRequiredDuration) return duration;
  hasRequiredDuration = 1;
  Object.defineProperty(duration, "__esModule", { value: true });
  duration.googleProtobufDurationToProto3JSON = googleProtobufDurationToProto3JSON;
  duration.googleProtobufDurationFromProto3JSON = googleProtobufDurationFromProto3JSON;
  function googleProtobufDurationToProto3JSON(obj) {
    let durationSeconds = obj.seconds.toString();
    if (typeof obj.nanos === "number" && obj.nanos > 0) {
      const nanosStr = obj.nanos.toString().padStart(9, "0").replace(/^((?:\d\d\d)+?)(?:0*)$/, "$1");
      durationSeconds += "." + nanosStr;
    }
    durationSeconds += "s";
    return durationSeconds;
  }
  function googleProtobufDurationFromProto3JSON(json) {
    const match = json.match(/^(\d*)(?:\.(\d*))?s$/);
    if (!match) {
      throw new Error(`googleProtobufDurationFromProto3JSON: incorrect value ${json} passed as google.protobuf.Duration`);
    }
    let seconds = 0;
    let nanos = 0;
    if (typeof match[1] === "string" && match[1].length > 0) {
      seconds = parseInt(match[1]);
    }
    if (typeof match[2] === "string" && match[2].length > 0) {
      nanos = parseInt(match[2].padEnd(9, "0"));
    }
    const result = {};
    if (seconds !== 0) {
      result.seconds = seconds;
    }
    if (nanos !== 0) {
      result.nanos = nanos;
    }
    return result;
  }
  return duration;
}
var timestamp = {};
var hasRequiredTimestamp;
function requireTimestamp() {
  if (hasRequiredTimestamp) return timestamp;
  hasRequiredTimestamp = 1;
  Object.defineProperty(timestamp, "__esModule", { value: true });
  timestamp.googleProtobufTimestampToProto3JSON = googleProtobufTimestampToProto3JSON;
  timestamp.googleProtobufTimestampFromProto3JSON = googleProtobufTimestampFromProto3JSON;
  function googleProtobufTimestampToProto3JSON(obj) {
    const durationSeconds = obj.seconds;
    const date = new Date(durationSeconds * 1e3).toISOString();
    let nanos = obj.nanos?.toString().padStart(9, "0");
    while (nanos && nanos.length > 3 && nanos.endsWith("000")) {
      nanos = nanos.slice(0, -3);
    }
    return date.replace(/(?:\.\d{0,9})/, "." + nanos);
  }
  function googleProtobufTimestampFromProto3JSON(json) {
    const match = json.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?/);
    if (!match) {
      throw new Error(`googleProtobufDurationFromProto3JSON: incorrect value ${json} passed as google.protobuf.Duration`);
    }
    const date = new Date(json);
    const millisecondsSinceEpoch = date.getTime();
    const seconds = Math.floor(millisecondsSinceEpoch / 1e3);
    let nanos = 0;
    const secondsFromDate = json.split(".")[1];
    if (secondsFromDate) {
      nanos = parseInt(secondsFromDate.slice(0, -1).padEnd(9, "0"));
    }
    const result = {};
    if (seconds !== 0) {
      result.seconds = seconds;
    }
    if (nanos !== 0) {
      result.nanos = nanos;
    }
    return result;
  }
  return timestamp;
}
var wrappers = {};
var hasRequiredWrappers;
function requireWrappers() {
  if (hasRequiredWrappers) return wrappers;
  hasRequiredWrappers = 1;
  Object.defineProperty(wrappers, "__esModule", { value: true });
  wrappers.wrapperToProto3JSON = wrapperToProto3JSON;
  wrappers.wrapperFromProto3JSON = wrapperFromProto3JSON;
  const bytes_1 = requireBytes();
  const util_1 = requireUtil();
  function wrapperToProto3JSON(obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, "value")) {
      return null;
    }
    if (Buffer.isBuffer(obj.value) || obj.value instanceof Uint8Array) {
      return (0, bytes_1.bytesToProto3JSON)(obj.value);
    }
    if (typeof obj.value === "object") {
      (0, util_1.assert)(obj.value.constructor.name === "Long", `wrapperToProto3JSON: expected to see a number, a string, a boolean, or a Long, but got ${obj.value}`);
      return obj.value.toString();
    }
    if (typeof obj.value === "number" && !Number.isFinite(obj.value)) {
      return obj.value.toString();
    }
    return obj.value;
  }
  function wrapperFromProto3JSON(typeName, json) {
    if (json === null) {
      return {
        value: null
      };
    }
    if (typeName === ".google.protobuf.BytesValue") {
      if (typeof json !== "string") {
        throw new Error(`numberWrapperFromProto3JSON: expected to get a string for google.protobuf.BytesValue but got ${typeof json}`);
      }
      return {
        value: (0, bytes_1.bytesFromProto3JSON)(json)
      };
    }
    return {
      value: json
    };
  }
  return wrappers;
}
var fieldmask = {};
var hasRequiredFieldmask;
function requireFieldmask() {
  if (hasRequiredFieldmask) return fieldmask;
  hasRequiredFieldmask = 1;
  Object.defineProperty(fieldmask, "__esModule", { value: true });
  fieldmask.googleProtobufFieldMaskToProto3JSON = googleProtobufFieldMaskToProto3JSON;
  fieldmask.googleProtobufFieldMaskFromProto3JSON = googleProtobufFieldMaskFromProto3JSON;
  function googleProtobufFieldMaskToProto3JSON(obj) {
    return obj.paths.join(",");
  }
  function googleProtobufFieldMaskFromProto3JSON(json) {
    return {
      paths: json.split(",")
    };
  }
  return fieldmask;
}
var hasRequiredFromproto3json;
function requireFromproto3json() {
  if (hasRequiredFromproto3json) return fromproto3json;
  hasRequiredFromproto3json = 1;
  Object.defineProperty(fromproto3json, "__esModule", { value: true });
  fromproto3json.fromProto3JSONToInternalRepresentation = fromProto3JSONToInternalRepresentation;
  fromproto3json.fromProto3JSON = fromProto3JSON;
  const any_1 = requireAny();
  const bytes_1 = requireBytes();
  const enum_1 = require_enum();
  const value_1 = requireValue();
  const util_1 = requireUtil();
  const duration_1 = requireDuration();
  const timestamp_1 = requireTimestamp();
  const wrappers_1 = requireWrappers();
  const fieldmask_1 = requireFieldmask();
  function fromProto3JSONToInternalRepresentation(type, json) {
    const fullyQualifiedTypeName = typeof type === "string" ? type : (0, util_1.getFullyQualifiedTypeName)(type);
    if (typeof type !== "string" && "values" in type) {
      if (fullyQualifiedTypeName === ".google.protobuf.NullValue") {
        return "NULL_VALUE";
      }
      return (0, enum_1.resolveEnumValueToString)(type, json);
    }
    if (typeof type !== "string") {
      type.resolveAll();
    }
    if (typeof type === "string") {
      return json;
    }
    if (fullyQualifiedTypeName === ".google.protobuf.Value") {
      return (0, value_1.googleProtobufValueFromProto3JSON)(json);
    }
    if (util_1.wrapperTypes.has(fullyQualifiedTypeName)) {
      if (json !== null && typeof json === "object" || Array.isArray(json)) {
        throw new Error(`fromProto3JSONToInternalRepresentation: JSON representation for ${fullyQualifiedTypeName} expects a string, a number, or a boolean, but got ${typeof json}`);
      }
      return (0, wrappers_1.wrapperFromProto3JSON)(fullyQualifiedTypeName, json);
    }
    if (json === null) {
      return null;
    }
    if (fullyQualifiedTypeName === ".google.protobuf.Any") {
      return (0, any_1.googleProtobufAnyFromProto3JSON)(type.root, json);
    }
    if (fullyQualifiedTypeName === ".google.protobuf.Struct") {
      if (typeof json !== "object") {
        throw new Error(`fromProto3JSONToInternalRepresentation: google.protobuf.Struct must be an object but got ${typeof json}`);
      }
      if (Array.isArray(json)) {
        throw new Error("fromProto3JSONToInternalRepresentation: google.protobuf.Struct must be an object but got an array");
      }
      return (0, value_1.googleProtobufStructFromProto3JSON)(json);
    }
    if (fullyQualifiedTypeName === ".google.protobuf.ListValue") {
      if (!Array.isArray(json)) {
        throw new Error(`fromProto3JSONToInternalRepresentation: google.protobuf.ListValue must be an array but got ${typeof json}`);
      }
      return (0, value_1.googleProtobufListValueFromProto3JSON)(json);
    }
    if (fullyQualifiedTypeName === ".google.protobuf.Duration") {
      if (typeof json !== "string") {
        throw new Error(`fromProto3JSONToInternalRepresentation: google.protobuf.Duration must be a string but got ${typeof json}`);
      }
      return (0, duration_1.googleProtobufDurationFromProto3JSON)(json);
    }
    if (fullyQualifiedTypeName === ".google.protobuf.Timestamp") {
      if (typeof json !== "string") {
        throw new Error(`fromProto3JSONToInternalRepresentation: google.protobuf.Timestamp must be a string but got ${typeof json}`);
      }
      return (0, timestamp_1.googleProtobufTimestampFromProto3JSON)(json);
    }
    if (fullyQualifiedTypeName === ".google.protobuf.FieldMask") {
      if (typeof json !== "string") {
        throw new Error(`fromProto3JSONToInternalRepresentation: google.protobuf.FieldMask must be a string but got ${typeof json}`);
      }
      return (0, fieldmask_1.googleProtobufFieldMaskFromProto3JSON)(json);
    }
    const result = {};
    for (const [key, value2] of Object.entries(json)) {
      const field = type.fields[key];
      if (!field) {
        continue;
      }
      const resolvedType = field.resolvedType;
      const fieldType = field.type;
      if (field.repeated) {
        if (value2 === null) {
          result[key] = [];
        } else {
          if (!Array.isArray(value2)) {
            throw new Error(`fromProto3JSONToInternalRepresentation: expected an array for field ${key}`);
          }
          result[key] = value2.map((element) => fromProto3JSONToInternalRepresentation(resolvedType || fieldType, element));
        }
      } else if (field.map) {
        const map = {};
        for (const [mapKey, mapValue] of Object.entries(value2)) {
          map[mapKey] = fromProto3JSONToInternalRepresentation(resolvedType || fieldType, mapValue);
        }
        result[key] = map;
      } else if (fieldType.match(/^(?:(?:(?:u?int|fixed)(?:32|64))|float|double)$/)) {
        if (typeof value2 !== "number" && typeof value2 !== "string") {
          throw new Error(`fromProto3JSONToInternalRepresentation: field ${key} of type ${field.type} cannot contain value ${value2}`);
        }
        result[key] = value2;
      } else if (fieldType === "string") {
        if (typeof value2 !== "string") {
          throw new Error(`fromProto3JSONToInternalRepresentation: field ${key} of type ${field.type} cannot contain value ${value2}`);
        }
        result[key] = value2;
      } else if (fieldType === "bool") {
        if (typeof value2 !== "boolean") {
          throw new Error(`fromProto3JSONToInternalRepresentation: field ${key} of type ${field.type} cannot contain value ${value2}`);
        }
        result[key] = value2;
      } else if (fieldType === "bytes") {
        if (typeof value2 !== "string") {
          throw new Error(`fromProto3JSONToInternalRepresentation: field ${key} of type ${field.type} cannot contain value ${value2}`);
        }
        result[key] = (0, bytes_1.bytesFromProto3JSON)(value2);
      } else {
        (0, util_1.assert)(resolvedType !== null, `Expected to be able to resolve type for field ${field.name}`);
        const deserializedValue = fromProto3JSONToInternalRepresentation(resolvedType, value2);
        result[key] = deserializedValue;
      }
    }
    return result;
  }
  function fromProto3JSON(type, json) {
    const internalRepr = fromProto3JSONToInternalRepresentation(type, json);
    if (internalRepr === null) {
      return null;
    }
    (0, util_1.assert)(typeof internalRepr === "object" && !Array.isArray(internalRepr), `fromProto3JSON: expected an object, not ${json}`);
    return type.fromObject(internalRepr);
  }
  return fromproto3json;
}
var hasRequiredAny;
function requireAny() {
  if (hasRequiredAny) return any;
  hasRequiredAny = 1;
  Object.defineProperty(any, "__esModule", { value: true });
  any.googleProtobufAnyToProto3JSON = googleProtobufAnyToProto3JSON;
  any.googleProtobufAnyFromProto3JSON = googleProtobufAnyFromProto3JSON;
  const fromproto3json_1 = requireFromproto3json();
  const toproto3json_1 = requireToproto3json();
  const specialJSON = /* @__PURE__ */ new Set([
    "google.protobuf.Any",
    "google.protobuf.Duration",
    "google.protobuf.FieldMask",
    "google.protobuf.ListValue",
    "google.protobuf.Struct",
    "google.protobuf.Timestamp",
    "google.protobuf.Value"
  ]);
  function googleProtobufAnyToProto3JSON(obj, options) {
    const typeName = obj.type_url.replace(/^.*\//, "");
    let type;
    try {
      type = obj.$type.root.lookupType(typeName);
    } catch (err) {
      throw new Error(`googleProtobufAnyToProto3JSON: cannot find type ${typeName}: ${err}`);
    }
    const valueMessage = type.decode(obj.value);
    const valueProto3JSON = (0, toproto3json_1.toProto3JSON)(valueMessage, options);
    if (specialJSON.has(typeName)) {
      return {
        "@type": obj.type_url,
        value: valueProto3JSON
      };
    }
    valueProto3JSON["@type"] = obj.type_url;
    return valueProto3JSON;
  }
  function googleProtobufAnyFromProto3JSON(root, json) {
    if (json === null || typeof json !== "object" || Array.isArray(json)) {
      throw new Error("googleProtobufAnyFromProto3JSON: must be an object to decode google.protobuf.Any");
    }
    const typeUrl = json["@type"];
    if (!typeUrl || typeof typeUrl !== "string") {
      throw new Error("googleProtobufAnyFromProto3JSON: JSON serialization of google.protobuf.Any must contain @type field");
    }
    const typeName = typeUrl.replace(/^.*\//, "");
    let type;
    try {
      type = root.lookupType(typeName);
    } catch (err) {
      throw new Error(`googleProtobufAnyFromProto3JSON: cannot find type ${typeName}: ${err}`);
    }
    let value2 = json;
    if (specialJSON.has(typeName)) {
      if (!("value" in json)) {
        throw new Error(`googleProtobufAnyFromProto3JSON: JSON representation of google.protobuf.Any with type ${typeName} must contain the value field`);
      }
      value2 = json.value;
    }
    const valueMessage = (0, fromproto3json_1.fromProto3JSON)(type, value2);
    if (valueMessage === null) {
      return {
        type_url: typeUrl,
        value: null
      };
    }
    const uint8array = type.encode(valueMessage).finish();
    const buffer = Buffer.from(uint8array, 0, uint8array.byteLength);
    const base64 = buffer.toString("base64");
    return {
      type_url: typeUrl,
      value: base64
    };
  }
  return any;
}
var hasRequiredToproto3json;
function requireToproto3json() {
  if (hasRequiredToproto3json) return toproto3json;
  hasRequiredToproto3json = 1;
  Object.defineProperty(toproto3json, "__esModule", { value: true });
  toproto3json.toProto3JSON = toProto3JSON;
  const any_1 = requireAny();
  const bytes_1 = requireBytes();
  const util_1 = requireUtil();
  const enum_1 = require_enum();
  const value_1 = requireValue();
  const duration_1 = requireDuration();
  const timestamp_1 = requireTimestamp();
  const wrappers_1 = requireWrappers();
  const fieldmask_1 = requireFieldmask();
  function convertSingleValue(value2) {
    if (typeof value2 === "object") {
      if (value2?.constructor?.name === "Long") {
        return value2.toString();
      }
      throw new Error(`toProto3JSON: don't know how to convert value ${value2}`);
    }
    return value2;
  }
  function convertRepeatedOrMapValue(type, value2, options) {
    if (type && "values" in type) {
      return convertEnum(type, value2, options);
    }
    if (type) {
      return toProto3JSON(value2, options);
    }
    return convertSingleValue(value2);
  }
  function convertEnum(type, value2, options) {
    if (options?.numericEnums) {
      return (0, enum_1.resolveEnumValueToNumber)(type, value2);
    } else {
      return (0, enum_1.resolveEnumValueToString)(type, value2);
    }
  }
  function toProto3JSON(obj, options) {
    const objType = obj.$type;
    if (!objType) {
      throw new Error("Cannot serialize object to proto3 JSON since its .$type is unknown. Use Type.fromObject(obj) before calling toProto3JSON.");
    }
    objType.resolveAll();
    const typeName = (0, util_1.getFullyQualifiedTypeName)(objType);
    if (typeName === ".google.protobuf.Any") {
      return (0, any_1.googleProtobufAnyToProto3JSON)(obj, options);
    }
    if (typeName === ".google.protobuf.Value") {
      return (0, value_1.googleProtobufValueToProto3JSON)(obj);
    }
    if (typeName === ".google.protobuf.Struct") {
      return (0, value_1.googleProtobufStructToProto3JSON)(obj);
    }
    if (typeName === ".google.protobuf.ListValue") {
      return (0, value_1.googleProtobufListValueToProto3JSON)(obj);
    }
    if (typeName === ".google.protobuf.Duration") {
      return (0, duration_1.googleProtobufDurationToProto3JSON)(obj);
    }
    if (typeName === ".google.protobuf.Timestamp") {
      return (0, timestamp_1.googleProtobufTimestampToProto3JSON)(obj);
    }
    if (typeName === ".google.protobuf.FieldMask") {
      return (0, fieldmask_1.googleProtobufFieldMaskToProto3JSON)(obj);
    }
    if (util_1.wrapperTypes.has(typeName)) {
      return (0, wrappers_1.wrapperToProto3JSON)(obj);
    }
    const result = {};
    for (const [key, value2] of Object.entries(obj)) {
      const field = objType.fields[key];
      const fieldResolvedType = field.resolvedType;
      const fieldFullyQualifiedTypeName = fieldResolvedType ? (0, util_1.getFullyQualifiedTypeName)(fieldResolvedType) : null;
      if (value2 === null) {
        result[key] = null;
        continue;
      }
      if (Array.isArray(value2)) {
        if (value2.length === 0) {
          continue;
        }
        result[key] = value2.map((element) => {
          return convertRepeatedOrMapValue(fieldResolvedType, element, options);
        });
        continue;
      }
      if (field.map) {
        const map = {};
        for (const [mapKey, mapValue] of Object.entries(value2)) {
          map[mapKey] = convertRepeatedOrMapValue(fieldResolvedType, mapValue, options);
        }
        result[key] = map;
        continue;
      }
      if (fieldFullyQualifiedTypeName === ".google.protobuf.NullValue") {
        result[key] = null;
        continue;
      }
      if (fieldResolvedType && "values" in fieldResolvedType && value2 !== null) {
        result[key] = convertEnum(fieldResolvedType, value2, options);
        continue;
      }
      if (fieldResolvedType) {
        result[key] = toProto3JSON(value2, options);
        continue;
      }
      if (typeof value2 === "string" || typeof value2 === "number" || typeof value2 === "boolean" || value2 === null) {
        if (typeof value2 === "number" && !Number.isFinite(value2)) {
          result[key] = value2.toString();
          continue;
        }
        result[key] = value2;
        continue;
      }
      if (Buffer.isBuffer(value2) || value2 instanceof Uint8Array) {
        result[key] = (0, bytes_1.bytesToProto3JSON)(value2);
        continue;
      }
      result[key] = convertSingleValue(value2);
      continue;
    }
    return result;
  }
  return toproto3json;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromProto3JSON = exports.toProto3JSON = void 0;
    var toproto3json_1 = requireToproto3json();
    Object.defineProperty(exports, "toProto3JSON", { enumerable: true, get: function() {
      return toproto3json_1.toProto3JSON;
    } });
    var fromproto3json_1 = requireFromproto3json();
    Object.defineProperty(exports, "fromProto3JSON", { enumerable: true, get: function() {
      return fromproto3json_1.fromProto3JSON;
    } });
  })(src);
  return src;
}
export {
  requireSrc as r
};
