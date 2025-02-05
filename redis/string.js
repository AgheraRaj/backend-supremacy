const client = require("./client");

async function init() {
  const result = await client.set("subject:1" , "maths")
  console.log(result);

  const getResult = await client.get("subject:1")
  console.log(getResult);
};

init();