import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.ObjectId, required: true, ref: "User" },
    StudyRoom: { type: mongoose.ObjectId, ref: "Study" },
    createdAt: { type: Date, default: Date.now },
    studyStart: { type: String, default: "00:00" },
    studyEnd: { type: String, default: "00:00"},
    breakStart: { type: String },
    breakEnd: { type: String },
    totalTime: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

export default Post;