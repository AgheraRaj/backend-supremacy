const path = require("path");

console.log("Filename🗃️" , __filename);
console.log("Dirname📁" , __dirname);

// School system management

const filename = path.join("folder" , "student" , "data.txt");

console.log(filename);

const parseDataPath = path.parse(filename);
const resolvedPath = path.resolve(filename);
const extname = path.extname(filename);
const basename = path.basename(filename);
const dirname = path.dirname(filename);

console.log({
    parseDataPath,
    resolvedPath,
    extname,
    basename,
    dirname
})
