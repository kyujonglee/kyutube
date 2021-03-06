import express from "express";
import {
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  userDetail
} from "../controllers/userController";
import routes from "../routes";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route(routes.editProfile)
  .get(onlyPrivate, getEditProfile)
  .post(onlyPrivate, uploadAvatar, postEditProfile);

userRouter
  .route(routes.changePassword)
  .get(onlyPrivate, getChangePassword)
  .post(onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
