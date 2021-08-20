import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => console.log("✅ Connected to mongoDB"));