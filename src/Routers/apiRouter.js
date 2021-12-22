import express from "express";
import { addComment, joinUser } from "../Controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/rooms/:roomId/comment", addComment);
apiRouter.post("/rooms/:roomId/join", joinUser);

export default apiRouter;