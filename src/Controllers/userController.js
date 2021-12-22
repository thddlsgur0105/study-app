import User from "../Model/User";
import bcrypt from "bcrypt";
import Room from "../Model/Room";
import Study from "../Model/Study";
import Comment from "../Model/Comment";

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
}

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(403).render("login", { pageTitle: "로그인", errorMessage: "해당 유저가 존재하지 않습니다." })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(403).render("login", { pageTitle: "로그인", errorMessage: "패스워드가 일치하지 않습니다." })
    }
    // login success!
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "회원가입" });
}

export const postJoin = async (req, res) => {
    const { name, email, username, password, password2 } = req.body;
    // password confirmation
    if (password !== password2) {
        return res.status(403).render("join", { pageTitle: "회원가입", errorMessage: "패스워드가 일치하지 않습니다." })
    }

    // email & username confirmation
    const exists = await User.exists({
        $or: [{ email }, { username }]
    })
    if (exists) {
        return res.status(403).render("join", { pageTitle: "회원가입", errorMessage: "이메일 혹은 유저이름이 이미 존재합니다." })
    }
    
    await User.create({
        name,
        email,
        username,
        password: await bcrypt.hash(password, 10),
    });
    return res.redirect("/login");
}

export const logout = async (req, res) => {
    await req.session.destroy();
    return res.redirect("/");
}

export const profile = async (req, res) => {
    const { id } = req.params;
    const currentUser = await User.findById(id).populate("studies");
    if (!currentUser) {
        return res.status(404).render("404", { pageTitle: "404" });
    }
    return res.render("profile", { pageTitle: `${currentUser.username} 의 세부정보`, currentUser });
}

export const getEdit = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    if (String(id) !== String(user._id)) {
        return res.redirect(`/users/${id}`);
    }
    const currentUser = await User.findById(id).populate("studies");
    return res.render("editUser", { pageTitle: `${currentUser.username} 의 세부정보 수정`, currentUser });
}

export const postEdit = async (req, res) => {
    const { params: { id }, session: { user }, body: { username, email } } = req;
    if (String(id) !== String(user._id)) {
        return res.redirect(`/users/${id}`);
    }
    const currentUser = await User.findByIdAndUpdate(id, {
        username: username === "" ? user.username : username,
        email: email === "" ? user.email : email,
    },
    {
        new: true,
    })
    req.session.user = currentUser;
    return res.redirect(`/users/${id}`);
}

export const remove = async (req, res) => {
    const { params: { id }, session: { user } } = req;
    if (String(id) !== String(user._id)) {
        return res.redirect("/");
    }
    //- Study database 에서 해당 user 를 members 에서 삭제
    await Study.updateMany({ 
        members: { $elemMatch: { $eq: id } }
     },{
        $pull: { members: id }
    });
    //- User database 에서 User 정보 삭제
    await User.findByIdAndRemove(id);
    req.session.destroy();
    //- Room database 에서 Room 정보 삭제
    await Room.deleteOne({
        author: id,
    })
    return res.redirect("/");
}

export const getChangePassword = (req, res) => {
    const { params: { id }, session: { user } } = req;
    if (String(id) !== String(user._id)) {
        return res.redirect("/");
    }
    return res.render("change-password", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
    const { params: { id }, session: { user }, body: { oldPassword, newPassword, newPassword2 } } = req;
    if (String(id) !== String(user._id)) {
        return res.redirect("/");
    }
    const currentUser = await User.findById(id);
    if (!currentUser) {
        return res.redirect("/");
    }
    const match = await bcrypt.compare(oldPassword, currentUser.password);
    if (!match) {
        return res.status(403).render("change-password", { pageTitle: "비밀번호 변경", errorMessage: "현재 비밀번호가 일치하지 않습니다." })
    }
    if (newPassword !== newPassword2) {
        return res.status(403).render("change-password", { pageTitle: "비밀번호 변경", errorMessage: "변경할 비밀번호와 비밀번호 확인이 일치하지 않습니다." })
    }
    // password update
    await User.findByIdAndUpdate(id, {
        password: await bcrypt.hash(newPassword, 10),
    });
    return res.redirect(`/users/${id}`);
}

export const addComment = async (req, res) => {
    const {
        params: { roomId },
        body: { content },
        session: { user }
    } = req;
    if (!user) {
        return res.sendStatus(403);
    }
    // Create Comment Document
    const newComment = await Comment.create({
        content,
        author: user._id,
        room: roomId,
    });
    // Update User Document
    await User.updateOne({ _id: user._id }, {
        $push: { comments: newComment._id }
    });
    // Update Room Document
    await Room.updateOne({ _id: roomId }, {
        $push: { comments: newComment._id }
    });
    return res.status(201).json({
        author: user.username
    });
}

export const joinUser = async (req, res) => {
    const {
        session: { user },
        params: { roomId }
    } = req;
    if (!user) {
        return res.sendStatus(403);
    }
    const room = await Room.findById(roomId);
    // Update Study Document
    await Study.findByIdAndUpdate(room.study, {
        $push: { members: user._id }
    });
    // Update User Document
    await User.findByIdAndUpdate(user._id, {
        $push: { studies: room.study }
    });
    return res.sendStatus(201);
}