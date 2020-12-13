import express from "express";
import routes from "../routes";
import { editProfile, changePassword, userDetail } from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();
userRouter.get(routes.users, (req, res) => res.send("Users")); // used?? if it is, move it to globalRouter.js

userRouter.get(routes.editProfile, onlyPrivate, editProfile); // should be prior to userDetail , it recocgnizes edit-profile as an id
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
