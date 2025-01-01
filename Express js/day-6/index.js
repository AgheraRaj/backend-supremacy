import express from "express";
import userData from "./data/data.js";

const app = express();

app.use(express.json());

const PORT = 8080;

// 1. GET request (it is used for feching a data from server)

app.get("/route", (req, res) => {
  res.status(200).send("hello world!");
});

// Industry standards

app.get("/api/v1/user", (req, res) => {
  // query parameter
  const { name } = req.query;

  if (name) {
    const user = userData.filter((user) => {
      return user.name === name;
    });

    res.status(200).send(user);
  }

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

// 2. POST request (it is used for creating a data on server)

app.post("/api/v1/user", (req, res) => {
  const { name, displayname } = req.body;

  const newUser = {
    id: userData.length + 1,
    name,
    displayname,
  };

  userData.push(newUser);

  res.status(201).send({
    message: "User created successfully",
    data: newUser,
  });
});

// 3. PUT request (it is used for update all fields of a data on server)

app.put("/api/v1/user/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  const userIndex = userData.findIndex((user) => {
    return user.id === parsedId;
  });

  if (userIndex === -1) {
    res.status(404).send({
      message: "User not found",
    });
  }

  userData[userIndex] = {
    id: parsedId,
    ...body,
  };

  res.status(200).send({
    message: "User updated successfully",
    data: userData[userIndex],
  });
});

// 4. PATCH request (it is used for updating a perticular filed of data on server)

app.patch("/api/v1/user/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  const userIndex = userData.findIndex((user) => {
    return user.id === parsedId;
  });

  if (userIndex === -1) {
    res.status(404).send({
      message: "User not found",
    });
  }

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };

  res.status(200).send({
    message: "User updated successfully",
    data: userData[userIndex],
  });
});

// 5. DELETE request (it is used for deleting a data on server)

app.delete("/api/v1/user/:id", (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id);

  const userIndex = userData.findIndex((user) => {
    return user.id === parsedId;
  });

  if (userIndex === -1) {
    res.status(404).send({
      message: "User not found",
    });
  }

  userData.splice(userIndex, 1);

  res.status(200).send({
    message: "User deleted successfully",
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
