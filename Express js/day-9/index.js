import cookieParser from "cookie-parser";
import e from "express";
import express from "express";
import session from "express-session";

const app = express();
app.use(session({
    secret: "mySecretKey",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(cookieParser("icodenode"));

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
  res.send("Hello World");
});

app.get("/login", (req, res) => {
    req.session.user = {
        name: "John Doe",
        email: "john@example.com",
        age: 30
    };
    res.send(`${req.session.user.name} is logged in`);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("User logged out");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
