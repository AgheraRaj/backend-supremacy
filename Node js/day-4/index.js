// [+] Introduction✅
// [+] Streams are NOT ONLY for streaming videos/audios.✅
// [+] Understanding streams and buffers✅
// [+] Create http server✅
// [+] Downloading big files from server (a good way and a bad way)✅
// [+] Copy files on file systems (a good way and a bad way)✅
// [+] Create custom streams (Readable / Writable / Transform)
// [+] String processing (a good way and a bad way)✅
// [+] Pipes✅

const http = require("http");
const fs = require("fs");
const { Transform } = require("stream");

const myServer = http.createServer((req, res) => {
  // 1. Downloading big files from server
  // A bad way

  // const file = fs.readFileSync("stream.txt");
  // res.end(file);

  // A good way (Using stream)

  // const readableStream = fs.createReadStream("stream.txt");
  // readableStream.pipe(res);

  // 2. Copy files on file systems
  // A bad way

  //   const file = fs.readFileSync("stream.txt");
  //   fs.writeFileSync("output.txt" , file);
  //   res.end()

  // A good way (Using stream)

  // const readableStream = fs.createReadStream("stream.txt");
  // const writeableStream = fs.createWriteStream("output.txt");

  // readableStream.on("data" , (chunk)=>{
  //     console.log("CHUNK: " , chunk);
  //     writeableStream.write(chunk);
  // })

  // 4. String processing

  const readableStream = fs.createReadStream("stream.txt");
  const writeableStream = fs.createWriteStream("output.txt");

  // A bad way

  // readableStream.on("data" , (chunk)=>{
  //     const modifiedWord = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "Raj");
  //     writeableStream.write(modifiedWord);
  // });

  // A good way

  // Transform
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const modifiedWord = chunk
        .toString()
        .toUpperCase()
        .replaceAll(/ipsum/gi, "Raj");
      callback(null, modifiedWord);
    },
  });

  readableStream.pipe(transformStream).pipe(writeableStream);

  res.end();
});

myServer.listen(8080, () => {
  console.log("The server is successfully connected at port no.", 8080);
});
