const EventEmitter = require("events");

const emitter = new EventEmitter();

//key methods (on , emit)

emitter.on("GREET" , (args)=>{
    console.log(`Hello ${args.username} your id is: ${args.id}`);
})

emitter.emit("GREET" ,{
    username: "Raj",
    id: "103s1v651srv1scsdcs30113"
});
