import "./db"

import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import roomRouter from "./src/Routers/roomRouter";
import rootRouter from "./src/Routers/rootRouter";
import userRouter from "./src/Routers/userRouter";
import { localsMiddleware } from "./src/middlewares";
import studyRouter from "./src/Routers/studyRouter";

const app = express();
const PORT = 4000;

// third party middleware
app.use(morgan("dev"));
app.use(session({
    secret: "Hi",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/test' })
}));

app.use(express.urlencoded({ extended: true }));
app.use(localsMiddleware);
app.use("/assets", express.static("assets"));

app.set("views", "src/views");
app.set("view engine", "pug");

app.use("/", rootRouter);
app.use("/rooms", roomRouter);
app.use("/users", userRouter);
app.use("/studies", studyRouter);

app.listen(PORT, () => {
    console.log(`✅ Example app listening at http://localhost:${PORT}`);
})