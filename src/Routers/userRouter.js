import express from "express";
import { getChangePassword, getEdit, postEdit, profile, remove } from "../Controllers/userController";
import { protectedMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id", profile);

userRouter.route("/:id/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

userRouter.route("/:id/remove").all(protectedMiddleware).get(remove);

userRouter.route("/:id/change-password").all(protectedMiddleware).get(getChangePassword)

export default userRouter;