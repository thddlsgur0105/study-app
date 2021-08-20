export const home = (req, res) => {
    return res.render("home", { pageTitle: "홈" });
}

export const create = (req, res) => {
    return res.render("createRoom", { pageTitle: "스터디 생성" });
}

export const detail = (req, res) => {
    return res.render("watchRoom", { pageTitle: "스터디 세부정보" });
}

export const edit = (req, res) => {
    return res.render("editRoom", { pageTitle: "스터디 세부정보" });
}

export const remove = (req, res) => {
    return res.send("Delete Room!");
}