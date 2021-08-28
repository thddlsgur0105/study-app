import express from "express";
import { home } from "../Controllers/roomController";
import { getJoin, postJoin, logout, getLogin, postLogin } from "../Controllers/userController";
import { protectedMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);

rootRouter.route("/logout").all(protectedMiddleware).get(logout);

export default rootRouter;