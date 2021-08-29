import express from "express";
import { detail, getCreate, getEdit, postCreate, postEdit, remove } from "../Controllers/postController";
import { studyDetail } from "../Controllers/roomController";
import { protectedMiddleware } from "../middlewares";

const studyRouter = express.Router();

studyRouter.route("/:id([0-9a-fA-F]{24})").all(protectedMiddleware).get(studyDetail);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/create").all(protectedMiddleware).get(getCreate).post(postCreate);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/:id2([0-9a-fA-F]{24})").all(protectedMiddleware).get(detail);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/:id2([0-9a-fA-F]{24})/edit").all(protectedMiddleware).get(getEdit).post(postEdit);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/:id2([0-9a-fA-F]{24})/remove").all(protectedMiddleware).get(remove);

export default studyRouter;