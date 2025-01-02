import express from "express";

const app = express();

// global middleware

function SayHiMiddleware(req, res, next) {
  console.log("Hello from middleware");
  next();
}

// app.use(SayHiMiddleware);

// specific routes middleware

app.get("/", SayHiMiddleware, (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
