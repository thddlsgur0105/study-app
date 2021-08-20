import express from "express";
import { create, home } from "../Controllers/roomController";
import { getJoin, postJoin, logout, getLogin, postLogin } from "../Controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.route("/login").get(getLogin).post(postLogin);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.get("/logout", logout);

rootRouter.get("/create", create);

export default rootRouter;