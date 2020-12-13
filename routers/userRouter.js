import express from "express";
import routes from "../routes";
// eslint-disable-next-line prettier/prettier
import { getEditProfile, changePassword, userDetail, postEditProfile } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();
userRouter.get(routes.users, (req, res) => res.send("Users")); // used?? if it is, move it to globalRouter.js

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); // should be prior to userDetail , it recocgnizes edit-profile as an id
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
