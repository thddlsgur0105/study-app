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
        studyRoom: id,
        title,
        studyStart: studyStart === "" ? "00:00" : studyStart,
        studyEnd: studyEnd === "" ? "00:00" : studyEnd,
        breakStart: breakStart === "" ? "00:00" : breakStart,
        breakEnd: breakEnd === "" ? "00:00" : breakEnd,
    })

    //- Update Study model
    await Study.findByIdAndUpdate(id, {
        $push: { posts: post._id }
    });

    return res.redirect(`/studies/${id}`);
}

export const detail = async (req, res) => {
    const { params: { id, id2 } } = req;
    //- id : studyId & id2: postId
    const postExists = await Study.exists({
        $and: [{ _id: id }, { posts: { $elemMatch: { $eq: id2 } } }]
    });
    if (!postExists) {
        return res.redirect(`/studies/${id}`)
    }
    const post = await Post.findById(id2);
    return res.render("postDetail", { pageTitle: post.title, post })
}

export const getEdit = async (req, res) => {
    const { params: { id, id2 }, session: { user } } = req;
    //- id : studyId & id2: postId
    const postExists = await Study.exists({
        $and: [{ _id: id }, { posts: { $elemMatch: { $eq: id2 } } }]
    });
    if (!postExists) {
        return res.redirect(`/studies/${id}`)
    }
    const post = await Post.findOne({
        $and: [{ _id: id2 }, { author: user._id }]
    });
    if (!post) {
        return res.redirect(`/studies/${id}`)
    }
    return res.render("editPost", { pageTitle: post.title, post })
};

export const postEdit = async (req, res) => {
    const { params: { id, id2 }, session: { user }, body: { title, studyStart, studyEnd, breakStart, breakEnd } } = req;
    //- id : studyId & id2: postId
    const postExists = await Study.exists({
        $and: [{ _id: id }, { posts: { $elemMatch: { $eq: id2 } } }]
    });
    if (!postExists) {
        return res.redirect(`/studies/${id}`)
    }
    const post = await Post.findOne({
        $and: [{ _id: id2 }, { author: user._id }]
    });

    post.title = title;
    post.studyStart = studyStart;
    post.studyEnd = studyEnd;
    post.breakStart = breakStart;
    post.breakEnd = breakEnd;

    await post.save();
    
    return res.redirect(`/studies/${id}`);
}

export const remove = async (req, res) => {
    const { params: { id, id2 }, session: { user }, body: { title, studyStart, studyEnd, breakStart, breakEnd } } = req;
    //- id : studyId & id2: postId
    const postExists = await Study.exists({
        $and: [{ _id: id }, { posts: { $elemMatch: { $eq: id2 } } }]
    });
    if (!postExists) {
        return res.redirect(`/studies/${id}`)
    }

    //- remove post from Post model
    await Post.findOneAndRemove({
        $and: [{ _id: id2 }, { author: user._id }]
    });

    //- remove post from Study model
    await Study.findOneAndUpdate({
        $and: [{
            members: { $elemMatch: { $eq: user._id } }
        }, { _id: id }]
    }, {
        $pull: { posts: id2 }
    });

    return res.redirect(`/studies/${id}`);
};