import express from "express";
import { getEdit, postEdit, profile, remove } from "../Controllers/userController";
import { protectedMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id", profile);

userRouter.route("/:id/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

userRouter.route("/:id/remove").all(protectedMiddleware).get(remove);

export default userRouter;