export const home = (req, res) => {
    return res.render("home", { pageTitle: "홈" });
}

export const getCreate = (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).redirect("/");
    }
    return res.render("createRoom", { pageTitle: "스터디 생성" });
}

export const postCreate = (req, res) => {
    const { title, hashtags, content } = req.body;
    return res.end();
}

export const detail = (req, res) => {
    return res.render("watchRoom", { pageTitle: "스터디 세부정보" });
}

export const getEdit = (req, res) => {
    return res.render("editRoom", { pageTitle: "스터디 세부정보" });
}

export const remove = (req, res) => {
    return res.send("Delete Room!");
}