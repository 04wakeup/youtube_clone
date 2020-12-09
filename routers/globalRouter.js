import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, postLogin, logout, postJoin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin); // get
globalRouter.post(routes.join, postJoin); // post

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
