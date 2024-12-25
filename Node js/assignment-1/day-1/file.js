const fs = require("fs");

const os = require("os");

console.log(os.cpus().length)

// mkdirSync;

// fs.mkdirSync("./test.txt", (error) => {
//   if (error) {
//     console.log(error);
//   }
// });

// // statSync;

// const stat = fs.statSync("./text.txt");

// console.log(stat);

// // UnlinkSync;

// fs.unlinkSync("./world.txt");

// // copyFileSync;

// fs.writeFileSync("./text.txt", "Hello, World!");

// fs.copyFileSync("./text.txt", "./world.txt");
