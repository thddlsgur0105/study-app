import express from "express";
import { detail, edit, remove } from "../Controllers/roomController";

const roomRouter = express.Router();

roomRouter.get("/:id", detail);

roomRouter.get("/:id/edit", edit);

roomRouter.get("/:id/delete", remove);

export default roomRouter;