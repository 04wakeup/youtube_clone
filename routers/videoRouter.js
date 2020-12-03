import express from "express";
import routes from "../routes";
import { upload, editVideo, getUpload, postUpload, videoDetail } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Videos"));

export default videoRouter;
