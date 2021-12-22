import express from "express";
import { addView, removeStudy, removeUser } from "../Controllers/roomController";
import { addComment, joinUser } from "../Controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/rooms/:roomId/comment", addComment);
apiRouter.post("/rooms/:roomId/join", joinUser);
apiRouter.post("/rooms/:roomId/view", addView);
apiRouter.post("/user/remove", removeUser);
apiRouter.post("/study/remove", removeStudy);

export default apiRouter;