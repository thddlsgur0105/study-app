import express from "express";
import { addComment } from "../Controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/rooms/:roomId/comment", addComment);

export default apiRouter;