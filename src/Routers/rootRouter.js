import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("Home!"));

rootRouter.get("/login", (req, res) => res.send("Login!"));

rootRouter.get("/join", (req, res) => res.send("Join!"));

rootRouter.get("/logout", (req, res) => res.send("Log Out!"));

rootRouter.get("/create", (req, res) => res.send("Create Room!"));

export default rootRouter;