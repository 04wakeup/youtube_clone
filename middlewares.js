import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // upload video and return URL to save on db

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; // it enables to use routes anyware from now
  res.locals.user = {
    isAuthenticated: false,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
