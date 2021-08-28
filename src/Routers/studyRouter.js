import express from "express";
import { detail, getCreate, postCreate } from "../Controllers/postController";
import { studyDetail } from "../Controllers/roomController";
import { protectedMiddleware } from "../middlewares";

const studyRouter = express.Router();

studyRouter.route("/:id([0-9a-fA-F]{24})").all(protectedMiddleware).get(studyDetail);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/create").all(protectedMiddleware).get(getCreate).post(postCreate);

studyRouter.route("/:id([0-9a-fA-F]{24})/posts/:id2([0-9a-fA-F]{24})").get(detail)

export default studyRouter;