import express from "express";
import morgan from "morgan";

import roomRouter from "./src/Routers/roomRouter";
import rootRouter from "./src/Routers/rootRouter";
import userRouter from "./src/Routers/userRouter";

const app = express();
const PORT = 4000;

// third party middleware
app.use(morgan("dev"));

app.set("views", "src/views");
app.set("view engine", "pug");

app.use("/", rootRouter);
app.use("/rooms", roomRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`✅ Example app listening at http://localhost:${PORT}`);
})