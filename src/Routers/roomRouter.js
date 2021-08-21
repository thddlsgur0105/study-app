import express from "express";
import { detail, getEdit, remove } from "../Controllers/roomController";
import { protectedMiddleware } from "../middlewares";

const roomRouter = express.Router();

roomRouter.get("/:id", detail);

roomRouter.route("/:id/edit").all(protectedMiddleware).get(getEdit);

roomRouter.route("/:id/delete").all(protectedMiddleware).get(remove);

export default roomRouter;