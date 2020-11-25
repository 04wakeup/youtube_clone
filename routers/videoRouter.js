import express from "express";
import routes from "../routes";
import { upload, editVideo } from "../controllers/videoController";

const videoRouter = express.Router(); 

videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, (req, res) => res.send("Video Detail"));
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Videos"));

export default videoRouter;