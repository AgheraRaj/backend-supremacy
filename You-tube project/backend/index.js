import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.config.js";
import userRoutes from "./routers/user.routes.js";
import videoRoutes from "./routers/video.routes.js";

dotenv.config();

const app = express();
connectDB()

app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
app.use("/api/v1/user" , userRoutes)
app.use("/api/v1/video" ,videoRoutes)

app.listen(process.env.PORT , ()=>{
    console.log(`Server is runnig on http://localhost:${process.env.PORT}`)
})
