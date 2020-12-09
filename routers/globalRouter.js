import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, postLogin, logout, postJoin } from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // get
globalRouter.post(routes.join, onlyPublic, postJoin); // post

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPublic, logout);

export default globalRouter;
