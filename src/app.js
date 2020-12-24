import dotenv from "dotenv"; // hide important info
dotenv.config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import flash from "express-flash";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddlewares } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

var app = express();

const CookieStore = MongoStore(session);
// Middleware
// helmet : set it for csp problem to play a video
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// app.use("/uploads", express.static("uploads")); moved to S3
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // order is very important!
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // from randomkey gen site randomly
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
app.use(passport.initialize()); // create info from cookie above(cookieParser)
app.use(passport.session()); // save session

app.use(localsMiddlewares);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // my detailed child paths
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
