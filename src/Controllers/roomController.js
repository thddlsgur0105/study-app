export const home = (req, res) => {
    return res.render("home", { pageTitle: "홈" });
}

export const create = (req, res) => {
    return res.send("Create Room!");
}

export const detail = (req, res) => {
    return res.send("Room Detail!");
}

export const edit = (req, res) => {
    return res.send("Edit Room!");
}

export const remove = (req, res) => {
    return res.send("Delete Room!");
}