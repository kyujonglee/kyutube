import express from "express";
import passport from "passport";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter
  .route(routes.join)
  .get(onlyPublic, getJoin)
  .post(onlyPublic, postJoin, postLogin);

globalRouter
  .route(routes.login)
  .get(onlyPublic, getLogin)
  .post(onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github"),
  postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

globalRouter.get(routes.me, onlyPrivate, getMe);

export default globalRouter;
