import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    author: { type: mongoose.ObjectId, required: true, ref: "User" },
    members: [{ type: mongoose.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.ObjectId, ref: "Post" }]
})

const Study = mongoose.model("Study", studySchema);

export default Study;