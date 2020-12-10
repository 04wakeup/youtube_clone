import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
// eslint-disable-next-line prettier/prettier
import { getJoin, getLogin, postLogin, logout, postJoin, githubLogin, postGithubLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // get
globalRouter.post(routes.join, onlyPublic, postJoin); // post

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
// eslint-disable-next-line prettier/prettier
globalRouter.get(routes.githubCallback, passport.authenticate("github", { failureRedirect: "/login" }, postGithubLogin));

export default globalRouter;
