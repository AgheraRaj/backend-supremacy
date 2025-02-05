const client = require("./client");

async function init() {
  const result = await client.set("subject:1" , "maths")
  console.log(result);
};

init();