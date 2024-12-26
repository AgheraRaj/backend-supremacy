const http = require("http");
const fs = require("fs");

const PORT = 3000;

const Log = `${Date.now()}: New Request Received\n`;

const myServer = http.createServer((request , response) => {

    fs.appendFile("log.txt" , Log , (err)=>{
        if(err){
            console.error("Error writing to the log file" , err);
            response.statusCode = 500;
            response.end("Internal Server Error");
            return;
        }

        response.end("hello from server");
    })
   
});

myServer.listen(PORT , ()=>{
    console.log(`The server is connected successfully in port no. ${PORT}`);
})