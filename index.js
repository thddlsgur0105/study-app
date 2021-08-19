import express from "express";
import roomRouter from "./src/Routers/roomRouter";
import rootRouter from "./src/Routers/rootRouter";
import userRouter from "./src/Routers/userRouter";

const app = express();
const PORT = 4000;

app.use("/", rootRouter);
app.use("/rooms", roomRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`✅ Example app listening at http://localhost:${PORT}`);
})