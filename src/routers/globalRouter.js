import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
// eslint-disable-next-line prettier/prettier
import {
  getJoin,
  getLogin,
  postLogin,
  logout,
  postJoin,
  githubLogin,
  postGithubLogIn,
  googleLogin,
  postGoogleLogIn,
  googleLoginCallback,
  getMe,
  facebookLogin,
  postFacebookLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // get
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // post

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

// SNS Join & Login parts(SocialLogin.pug) are using one process "xxxLogin"
// Github Login
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate("github", { failureRedirect: "/login" }), postGithubLogIn);

// Google Login
globalRouter.get(routes.google, googleLogin);
globalRouter.get(routes.googleCallback, passport.authenticate("google", { failureRedirect: "/login" }), postGoogleLogIn);
// globalRouter.get(routes.googleCallback, passport.authenticate("google", { failureRedirect: "/login" }), postGoogleLogIn);

// Facebook Login
// 1. Sends user to FB
globalRouter.get(routes.facebook, facebookLogin);
//3. Authentication Success & Redirect
globalRouter.get(routes.facebookCallback, passport.authenticate("facebook", { failureRedirect: "/login" }), postFacebookLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;
