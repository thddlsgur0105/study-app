import express from "express";
import { studyDetail } from "../Controllers/roomController";

const studyRouter = express.Router();

studyRouter.get("/:id", studyDetail);

export default studyRouter;