// Assignment:

// CREATE A PROGRAM USING NODE-JS EVENTEMITTER THAT:

// ? LISTENS FOR MULTIPLE TYPES OF USER EVENTS (E.G LOGIN ,LOGOUT , PURCHASE , AND PROFILE UPDATE)
// ? tRACKS HOW MANY TIMES EACH EVENT IS EMITTED.
// ? LOGS A SUMMARY OF ALL EVENTS OCCURRENCES WHEN A SPECIAL SUMMARRY EVENT IS TRIGGERED

const { isUtf8 } = require("buffer");
const EventEmitter = require("events");
const fs = require("fs");

const userEmitter = new EventEmitter();

const eventsCounts = {
    login: 0,
    logout: 0,
    purchase: 0,
    profile_update: 0
}

const logFile = "eventlog.json";

if(fs.existsSync(logFile)){
    const data = fs.readFileSync(logFile , "utf-8");
    Object.assign(eventsCounts , JSON.parse(data))
}

function saveEventsCount(){
    fs.writeFileSync(logFile , JSON.stringify(eventsCounts , null , 2))
}

userEmitter.on("LOGIN" , (username)=>{
    console.log(`${username} successfully login ✅`);
    eventsCounts.login++
    saveEventsCount();
})

userEmitter.on("LOGOUT" , (username)=>{
    console.log(`${username} successfully logout`);
    eventsCounts.logout++
    saveEventsCount();
})

userEmitter.on("PURCHASE" , (username , item)=>{
    console.log(`${username} purchased ${item}`);
    eventsCounts.purchase++
    saveEventsCount();
})

userEmitter.on("PROFILE_UPDATE" , (username , filed)=>{
    console.log(`${username} update theire profile filed: ${filed}`);
    eventsCounts.profile_update++
    saveEventsCount();
})

userEmitter.on("SUMMARY" , ()=>{
    console.log("\n Event Summary:");
    console.log(`login: ${eventsCounts.login}`);
    console.log(`logout: ${eventsCounts.logout}`);
    console.log(`purchase: ${eventsCounts.purchase}`);
    console.log(`profile_update: ${eventsCounts.profile_update}`);

})

userEmitter.emit("LOGIN" , "Raj");
userEmitter.emit("LOGOUT" , "Raj");
userEmitter.emit("PURCHASE" , "Raj" , "iphone16");
userEmitter.emit("PROFILE_UPDATE" , "Raj" , "Email Address");
userEmitter.emit("SUMMARY");