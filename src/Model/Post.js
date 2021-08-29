import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.ObjectId, required: true, ref: "User" },
    studyRoom: { type: mongoose.ObjectId, ref: "Study" },
    createdAt: { type: Date, default: Date.now },
    studyStart: { type: String, default: "00:00" },
    studyEnd: { type: String, default: "00:00"},
    breakStart: { type: String, default: "00:00" },
    breakEnd: { type: String, default: "00:00" },
    totalTime: { type: String, default: "0h 0m" },
});

const getTotalTime = ({ studyStart, studyEnd, breakStart, breakEnd }) => {
    const [startHours, startMinutes] = studyStart.split(":");
    const [endHours, endMinutes] = studyEnd.split(":");
    const [breakStartHours, breakStartMinutes] = breakStart.split(":");
    const [breakEndHours, breakEndMinutes] = breakEnd.split(":");
    return `${(endHours - startHours) - (breakEndHours - breakStartHours)}h ${(endMinutes - startMinutes) - (breakEndMinutes - breakStartMinutes)}m`;
}

postSchema.pre("save", async function() {
    this.totalTime = this.studyStart !== "00:00" && this.studyEnd !== "00:00" ? getTotalTime(this) : "0h 0m";
});

const Post = mongoose.model("Post", postSchema);

export default Post;