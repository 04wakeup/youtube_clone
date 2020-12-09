import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // upload video and return URL to save on db

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; // it enables to use routes anyware from now
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
