import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => console.log("✅ Connected to mongoDB"));