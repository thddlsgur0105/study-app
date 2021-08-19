import express from "express";
import { edit, profile, remove } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", profile);

userRouter.get("/:id/edit", edit);

userRouter.get("/:id/delete", remove);

export default userRouter;