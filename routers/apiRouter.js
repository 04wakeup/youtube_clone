import express from "express";
import routes from "../routes";
import { postAddCommnet, postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddCommnet);

export default apiRouter;
