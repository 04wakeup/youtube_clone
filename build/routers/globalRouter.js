"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line prettier/prettier
var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin); // get

globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin); // post

globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userController.postLogin, _userController.postLogin);
globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].search, _videoController.search);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout); // Github Login

globalRouter.get(_routes["default"].gitHub, _userController.githubLogin);
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: "/login"
}), _userController.postGithubLogIn); // Facebook Login
// 1. Sends user to FB

globalRouter.get(_routes["default"].facebook, _userController.facebookLogin); //3. Authentication Success & Redirect

globalRouter.get(_routes["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: "/login"
}), _userController.postFacebookLogin);
globalRouter.get(_routes["default"].me, _userController.getMe);
var _default = globalRouter;
exports["default"] = _default;