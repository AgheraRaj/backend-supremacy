import express from "express";
import userData from "./data/data.js";

const app = express();

const PORT = 8080;

// 1. GET request (it is used for feching a data from server)

app.get("/route", (req, res) => {
  res.status(200).send("hello world!");
});

// Industry standards

app.get("/api/v1/user", (req, res) => {
  const { name } = req.query;

  if (name) {
    const user = userData.filter((user) => {
      return user.name === name;
    });

    res.status(200).send(user);
  }
  // query parameter
  res.status(200).send(userData);
});

// route parameter

app.get("/api/v1/user/:id", (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id);

  const user = userData.find((user) => {
    return user.id === parsedId;
  });

  res.status(200).send(user);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
