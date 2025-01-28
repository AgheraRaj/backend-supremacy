import http from "http";
import WebSocket , {WebSocketServer} from "ws";

const server = http.createServer((req , res)=>{
    console.log((new Date()) + "received request for" + req.url);
    res.end("Hi there");
})

const wss = new WebSocketServer({ server });

wss.on("connection" , function connection(ws){
    ws.on("error" , console.error);
    ws.on("message" , function message(data , isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data , {binary:isBinary})
            }
        })
    })
    ws.send("Hello! connection message from ws server")
})

server.listen(8080 , ()=>{
    console.log((new Date()) + "server is up on port:" + 8080);
})