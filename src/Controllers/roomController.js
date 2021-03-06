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
        }).populate({
            path: "study",
            select: "members",
        });
    } else {
        // if filtering is undefined
        if (searchingBy) {
            // searching By terms
            rooms = await Room.find({
                title: new RegExp("^.{0,}" + searchingBy + ".{0,}$", "i")
            }).populate({
                path: "study",
                select: "members",
            });
        } else {
            rooms = await Room.find({}).populate({
                path: "study",
                select: "members",
            });
        }
    }
    return res.render("home", { pageTitle: "홈", rooms });
}

export const getCreate = (req, res) => {
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
    const room = await Room.findById(id).populate("author").populate("study").populate("comments").populate({
        path: "comments",
        populate: {
            path: "author",
            select: "username",
        }
    });
    return res.render("watchRoom", { pageTitle: `세부정보: ${room.title}`, room });
}

export const getEdit = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    const room = await Room.findById(id).populate("comments").populate({
        path: "study",
        populate: "members",
    });
    if (!room) {
        return res.redirect("/");
    }
    if (String(room.author) !== String(user._id)) {
        return res.redirect("/");
    }
    return res.render("editRoom", { pageTitle: `편집: ${room.title}`, room, user });
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

export const studyDetail = async (req, res) => {
    const { id } = req.params;
    const study = await Study.findById(id).populate({
        path: "members",
        select: "username",
    }).populate({
        path: "author",
        select: "username",
    }).populate({
        path: "posts",
        populate: {
            path: "author",
            select: "username",
        },
    });
    if (!study) {
        return res.redirect("/");
    }
    return res.render("studyDetail", { pageTitle: study.title, study });
}

export const addView = async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
        return res.sendStatus(404);
    }
    room.meta.views = room.meta.views + 1;
    await room.save();
    return res.sendStatus(200);
}

export const removeUser = async (req, res) => {
    const { targetRoom, targetMember } = req.body;
    const room = await Room.findById(targetRoom);
    const studyId = room.study;
    try {
        // Update Study Database
        await Study.findByIdAndUpdate(studyId, {
            $pull: { members: targetMember }
        });
        // Update User Database
        await User.findByIdAndUpdate(targetMember, {
            $pull: { studies: studyId }
        });
    } catch(error) {
        return res.sendStatus(404);
    }
    return res.sendStatus(200);
}

/* Study Controller */

export const removeStudy = async (req, res) => {
    const { targetStudy } = req.body;
    const study = await Study.findById(targetStudy);
    if (!study) {
        return res.sendStatus(404);
    }
    // Update User Document
    
}