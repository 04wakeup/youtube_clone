import express from "express";
import routes from "../routes";
import { editProfile, changePassword, userDetail } from "../controllers/userController";

const userRouter = express.Router();
userRouter.get(routes.users, (req, res) => res.send("Users"));

userRouter.get(routes.editProfile, editProfile); // should be prior to userDetail , it recocgnizes edit-profile as an id
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
