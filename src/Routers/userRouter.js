import express from "express";
import { getEdit, profile, remove } from "../Controllers/userController";
import { protectedMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id", profile);

userRouter.route("/:id/edit").all(protectedMiddleware).get(getEdit);

userRouter.route("/:id/delete").all(protectedMiddleware).get(remove);

export default userRouter;