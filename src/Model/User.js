import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studies: [{ type: mongoose.ObjectId, ref: "Study" }],
    comments: [{ type: mongoose.ObjectId, ref: "Comment" }]
});

const User = mongoose.model("User", userSchema);

export default User;