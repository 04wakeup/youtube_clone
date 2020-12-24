/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // automatically loads .env contents

mongoose.connect(process.env.PORDUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   userFindAndModify: false,
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
