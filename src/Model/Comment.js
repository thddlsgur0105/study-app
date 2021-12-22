import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    room: { type: mongoose.ObjectId, ref: "Room" }
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;