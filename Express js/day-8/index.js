import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("secret"));

app.get("/", (req, res) => {
    res.cookie("userId" , 123 , {
        maxAge: 1000 * 60 * 60 * 24,
        signed: true
    });
  res.send("Hello World!");
});

app.get("/products" , (req , res) => {

    // console.log(req.cookies);
    // console.log(req.headers.cookie);
    
    console.log("cookies" , req.cookies);
    console.log("signedCookies" , req.signedCookies);

    if(req.cookies.name && req.cookies.name === "express"){
        res.status(200).send({
            "id": 1,
            "item": "Item 1",
            "price": "$500"
        });
    }
    else{
        res.status(403).send("Unauthorized");
    }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
