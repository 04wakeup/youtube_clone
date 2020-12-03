import express from "express";
import routes from "../routes";
import { upload, getEditVideo, postEditVideo, getUpload, postUpload, videoDetail } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("Videos")); // need it?
// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo); // 1st param: function type
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Videos"));

export default videoRouter;
