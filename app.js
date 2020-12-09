import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localMiddlewares } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

var app = express();
// Middleware
// helmet : set it for csp problem to play a video
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // order is very important!
app.use(passport.initialize()); // create info from cookie above(cookieParser)
app.use(passport.session()); // save session

app.use(localMiddlewares);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // my detailed child paths
app.use(routes.videos, videoRouter);

export default app;
