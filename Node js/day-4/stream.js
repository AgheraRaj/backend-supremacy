// 3. Create custom streams

const { Readable, Writable } = require("stream");

// Readable
const readableStream = new Readable({
  read() {},
});

// Writeable
const writeableStream = new Writable({
  write(streamData) {
    console, log("Writing...", streamData.toString());
  },
});

readableStream.on("data", (chunk) => {
  console.log("CHUNK: ", chunk.toString());
  writeableStream.write(chunk);
});

readableStream.push("Hello World");
