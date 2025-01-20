import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = 8080;

// global middleware
app.use(express.json());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/task" , taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
