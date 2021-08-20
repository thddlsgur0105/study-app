import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
    author: { type: String, required: true },
    targetRoom: { type: mongoose.ObjectId, ref: "Room" },
    createdAt: { type: Date, default: Date.now },
    durations: [{ type: Number }],
    totalTime: { type: Number, default: 0 },
});

const Study = mongoose.model("Study", studySchema);

export default Study;