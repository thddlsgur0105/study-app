import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    StudyRoom: { type: mongoose.ObjectId, ref: "Study" },
    createdAt: { type: Date, default: Date.now },
    durations: [{ type: Number }],
    totalTime: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

export default Post;