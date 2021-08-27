import Room from "../Model/Room";
import Study from "../Model/Study";
import User from "../Model/User";

export const home = async (req, res) => {
    const { searchingBy, filtering } = req.query;
    let rooms;
    if (filtering) {
        // filtering By terms
        rooms = await Room.find({
            filtering
        }).populate("author");
    } else {
        // if filtering is undefined
        if (searchingBy) {
            // searching By terms
            rooms = await Room.find({
                title: new RegExp("^.{0,}" + searchingBy + ".{0,}$", "i")
            }).populate("author");
        } else {
            rooms = await Room.find({}).populate("author");
        }
    }
    return res.render("home", { pageTitle: "홈", rooms });
}

export const getCreate = (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect("/");
    }
    return res.render("createRoom", { pageTitle: "스터디 생성" });
}

export const postCreate = async (req, res) => {
    const { body: { title, filtering, content }, session: { user } } = req;
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
        return res.redirect("/");
    }
    try {
        const study = await Study.create({
            title,
            author: currentUser._id,
            members: currentUser._id,
        });
        await Room.create({
            title,
            author: currentUser._id,
            content,
            filtering,
            study: study._id,
        });
        await User.findByIdAndUpdate(user._id, {
            $push: { studies: study._id }
        });
        // redirect to home
        return res.redirect("/");
    } catch(error) {
        console.log(error);
        return res.status(400).render("createRoom", { pageTitle: "스터디 생성", errorMessage: "스터디 생성에 실패하였습니다." })
    }
}

export const detail = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).populate("author").populate("study");
    return res.render("watchRoom", { pageTitle: `세부정보: ${room.title}`, room });
}

export const getEdit = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    const room = await Room.findById(id).populate({
        path: "study",
        populate: "members",
    });
    if (!room) {
        return res.redirect("/");
    }
    if (String(room.author) !== String(user._id)) {
        return res.redirect("/");
    }
    return res.render("editRoom", { pageTitle: `편집: ${room.title}`, room });
}

export const postEdit = async (req, res) => {
    const { params: { id }, session: { user }, body: { title, content, filtering } } = req;
    const room = await Room.findById(id);
    if (!room) {
        return res.redirect("/")
    }
    if (String(room.author) !== String(user._id)) {
        return res.redirect("/");
    }
    await Room.findByIdAndUpdate(id, {
        title,
        content,
        filtering,
    })
    return res.redirect("/");
}

export const remove = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    const room = await Room.findById(id);
    if (!room) {
        return res.redirect("/")
    }
    if (String(room.author) !== String(user._id)) {
        return res.redirect("/");
    }
    await Room.findByIdAndRemove(id);
    return res.redirect("/");
}

// Study Model

export const studyDetail = (req, res) => {
    return res.send("Study Detail!");
}