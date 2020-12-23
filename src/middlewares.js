/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "us-west-2",
});

// const multerVideo = multer({ dest: "uploads/videos/" }); // upload video and return URL to save on db
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "jameswetube2/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "jameswetube2/avatar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; // it enables to use routes anyware from now
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
