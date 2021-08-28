import express from "express";
import { getChangePassword, getEdit, postChangePassword, postEdit, profile, remove } from "../Controllers/userController";
import { protectedMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-fA-F]{24})", profile);

userRouter.route("/:id([0-9a-fA-F]{24})/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

userRouter.route("/:id([0-9a-fA-F]{24})/remove").all(protectedMiddleware).get(remove);

userRouter.route("/:id([0-9a-fA-F]{24})/change-password").all(protectedMiddleware).get(getChangePassword).post(postChangePassword);

export default userRouter;