import express from "express";
import routes from "../routes";
import { getEditVideo, postEditVideo, getUpload, postUpload, videoDetail, deleteVideo } from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("Videos")); // need it?
// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo); // 1st param: function type
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
