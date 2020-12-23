"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddlewares = exports.uploadAvatar = exports.uploadVideo = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_dotenv["default"].config();

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "us-west-2"
}); // const multerVideo = multer({ dest: "uploads/videos/" }); // upload video and return URL to save on db

var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "jameswetube2/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "jameswetube2/avatar"
  })
});
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;

var localsMiddlewares = function localsMiddlewares(req, res, next) {
  res.locals.siteName = "WeTube";
  res.locals.routes = _routes["default"]; // it enables to use routes anyware from now

  res.locals.loggedUser = req.user || null; // console.log(req.user);

  next();
};

exports.localsMiddlewares = localsMiddlewares;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;