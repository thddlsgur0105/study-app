import express from "express";
import { create, home } from "../Controllers/roomController";
import { getJoin, login, logout, postJoin } from "../Controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/login", login);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.get("/logout", logout);

rootRouter.get("/create", create);

export default rootRouter;