import express from "express";
import { detail, getCreate, getEdit, postCreate, postEdit, remove } from "../Controllers/roomController";
import { protectedMiddleware } from "../middlewares";

const roomRouter = express.Router();

roomRouter.route("/:id([0-9a-fA-F]{24})").all(protectedMiddleware).get(detail);

roomRouter.route("/:id([0-9a-fA-F]{24})/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

roomRouter.route("/:id([0-9a-fA-F]{24})/delete").all(protectedMiddleware).get(remove);

roomRouter.route("/create").all(protectedMiddleware).get(getCreate).post(postCreate);

export default roomRouter;