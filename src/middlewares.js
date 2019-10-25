import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

const endpoint = new aws.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";

const s3 = new aws.S3({
  accessKeyId: process.env.NCLOUD_KEY,
  secretAccessKey: process.env.NCLOUD_PRIVATE_KEY,
  region,
  endpoint
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "kyutube/avatar"
  })
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "kyutube/video"
  })
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
