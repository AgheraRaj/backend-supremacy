import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/user.router.js";

const PORT = 3000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api", router);

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
