import "@babel/polyfill";
import dotenv from "dotenv"; // hide important info
dotenv.config();
import app from "./app";
import "./db";

import "./models/Video";
import "./models/Comment";
import "./models/User";

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 4001; // find PORT or use default as set

const handleListening = () => console.log(`listening on: http://localhost:${PORT}`); //

app.listen(PORT, HOST, handleListening);
