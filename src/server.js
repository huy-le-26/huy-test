import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);
connectDB();

let PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
    console.log(" backend app is running on the port :" + PORT);
});