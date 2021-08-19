import express from "express";

const userRouter = express.Router();

userRouter.get("/profile", (req, res) => res.send("See My Profile!"));

userRouter.get("/edit", (req, res) => res.send("Edit My Profile!"));

userRouter.get("/delete", (req, res) => res.send("Delete User!"));

export default userRouter;