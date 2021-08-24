import express from "express";
import { detail, getEdit, postEdit, remove } from "../Controllers/roomController";
import { protectedMiddleware } from "../middlewares";

const roomRouter = express.Router();

roomRouter.route("/:id").all(protectedMiddleware).get(detail);

roomRouter.route("/:id/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

roomRouter.route("/:id/delete").all(protectedMiddleware).get(remove);

export default roomRouter;