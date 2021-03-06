import cors from "cors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "express-flash";
import path from "path";
import passport from "passport";

import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

import "./passport";

import "./models/Comment";
import "./models/Video";
import "./models/User";

import apiRouter from "./routers/apiRouter";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
