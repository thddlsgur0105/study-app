export const login = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
}

export const join = (req, res) => {
    return res.render("join", { pageTitle: "회원가입" });
}

export const logout = (req, res) => {
    // destroy session
    // redirect to Home
    return res.send("Log Out!");
}

export const profile = (req, res) => {
    return res.send("See User Profile!");
}

export const edit = (req, res) => {
    return res.send("Edit User!");
}

export const remove = (req, res) => {
    return res.send("Remove User!");
}