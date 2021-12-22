import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    author: { type: mongoose.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now }, 
    filtering: { type: String, required: true }, 
    study: { type: mongoose.ObjectId, ref: "Study" },
    meta: {
        views: { type: Number, default: 0 }, 
    }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;