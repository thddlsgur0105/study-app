import Post from "../Model/Post";
import Study from "../Model/Study";

export const getCreate = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    const exists = await Study.exists({
        $and: [{ _id: id }, { members: { $elemMatch: { $eq: user._id } } }]
    });
    if (!exists) {
        return res.redirect("/");
    }
    return res.render("createPost", { pageTitle: "공부 기록 작성" })
}

export const postCreate = async (req, res) => {
    const { params: { id }, session: { user }, body: { title, studyStart, studyEnd, breakStart, breakEnd } } = req;
    const exists = await Study.exists({
        $and: [{ _id: id }, { members: { $elemMatch: { $eq: user._id } } }]
    });
    if (!exists) {
        return res.redirect("/");
    }

    //- Create one post
    const post = await Post.create({
        author: user._id,
        StudyRoom: id,
        title,
        studyStart,
        studyEnd,
        breakStart: breakStart === "" ? "00:00" : breakStart,
        breakEnd: breakEnd === "" ? "00:00" : breakEnd,
    })

    //- Update Study model
    await Study.findByIdAndUpdate(id, {
        $push: { posts: post._id }
    });

    return res.redirect(`/studies/${id}`);
}

export const detail = (req, res) => {
    const { params: { id, id2 } } = req;
    res.send("Post Detail!");
}