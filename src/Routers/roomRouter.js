import express from "express";

const roomRouter = express.Router();

roomRouter.get("/:id", (req, res) => res.send("Room Detail!"));

roomRouter.get("/:id/edit", (req, res) => res.send("Edit Room Detail!"));

roomRouter.get("/:id/delete", (req, res) => res.send("Delete Room!"));

export default roomRouter;