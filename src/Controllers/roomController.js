import Room from "../Model/Room";
import User from "../Model/User";

export const home = async (req, res) => {
    const rooms = await Room.find({}).populate("author");
    return res.render("home", { pageTitle: "홈", rooms });
}

export const getCreate = (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).redirect("/");
    }
    return res.render("createRoom", { pageTitle: "스터디 생성" });
}

export const postCreate = async (req, res) => {
    const { body: { title, hashtags, content }, session: { user } } = req;
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
        return res.status(401).redirect("/");
    }
    await Room.create({
        title,
        author: currentUser._id,
        content,
        hashtags: hashtags.split(",").map(one => one.startsWith("#") ? one : `#${one}`),
        members: currentUser._id,
    })
    // redirect to home
    return res.status(200).redirect("/");
}

export const detail = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).populate("author").populate("members");
    return res.render("watchRoom", { pageTitle: room.title, room });
}

export const getEdit = (req, res) => {
    return res.render("editRoom", { pageTitle: "스터디 세부정보" });
}

export const remove = (req, res) => {
    return res.send("Delete Room!");
}