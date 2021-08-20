import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    author: { type: String, required: true }, 
    comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now }, 
    hashtags: [{ type: String }], 
    users: [{ type: mongoose.ObjectId, ref: "User" }],
    meta: {
        views: Number, 
    }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;