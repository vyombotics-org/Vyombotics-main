import { r as requireStubs } from "./stubs.mjs";
var streamEvents;
var hasRequiredStreamEvents;
function requireStreamEvents() {
  if (hasRequiredStreamEvents) return streamEvents;
  hasRequiredStreamEvents = 1;
  var stubs = requireStubs();
  function StreamEvents(stream) {
    stream = stream || this;
    var cfg = {
      callthrough: true,
      calls: 1
    };
    stubs(stream, "_read", cfg, stream.emit.bind(stream, "reading"));
    stubs(stream, "_write", cfg, stream.emit.bind(stream, "writing"));
    return stream;
  }
  streamEvents = StreamEvents;
  return streamEvents;
}
export {
  requireStreamEvents as r
};
