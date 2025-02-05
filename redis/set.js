const client = require("./client");

async function setDataType() {
    // SADD: Add elements to a set
    await client.sadd("subject:2" , "OOP");
    await client.sadd("subject:2" , "DS");
    await client.sadd("subject:2" , "MCWC");
    await client.sadd("subject:2" , "PS");

    // SMEMBERS: Retrieve all members of a set
    const result = client.smembers("subject:2");
    console.log("subject is: " , result);

    // SISMEMBER: Check if a member exists in the set
    const hasOOP = await client.sismember("subject:2", "OOP");
    console.log(`SISMEMBER fruits apple: ${hasOOP ? "Yes" : "No"}`);

    // SREM: Remove a member from the set
    const remove =  await client.srem("subject:2", "PS");
    console.log(`remove PS: ${remove ? "yes" : "no"}`);
    
    // SINTER: Find the intersection of multiple sets
    await client.sadd("subject:3", "DM");
    await client.sadd("subject:3", "PS");
    await client.sadd("subject:3", "OOP"); // Common element
    const intersection = await client.sinter("subject:2", "subject:3");
    console.log(`SINTER subject:2 and subject:3: ${intersection}`);

    // SUNION: Find the union of multiple sets
    const union = await client.sunion("subject:2", "subject:3");
    console.log(`SUNION subject:2 and subject:3: ${union}`);

     // SDIFF: Find the difference between sets
     const difference = await client.sdiff("subject:2", "subject:3");
     console.log(`SDIFF subject:2 and subject:3: ${difference}`);
}

setDataType()