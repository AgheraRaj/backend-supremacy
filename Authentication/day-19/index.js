import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import session from "express-session";

import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

dotenv.config();
const app = express();

app.use(express.json());

// session config

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}))

const PORT = process.env.PORT || 5000;

// routes
app.get("/" , (req , res)=>{
    res.send("Hello World!");
});

app.use("/api/user" , userRoutes);
app.use("/api/task" , taskRoutes);

connectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.error("Error connecting to the database:" , error.message);
})


