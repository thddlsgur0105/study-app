import express from "express";
import { create, home } from "../Controllers/roomController";
import { join, login, logout } from "../Controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/login", login);

rootRouter.get("/join", join);

rootRouter.get("/logout", logout);

rootRouter.get("/create", create);

export default rootRouter;