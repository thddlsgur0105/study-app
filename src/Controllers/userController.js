import User from "../Model/User";

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
}

export const postLogin = (req, res) => {
    return res.end();
}

// postLogin
// mongo database 정보와 비교해서 유저 정보 일치 확인
// 일치한다면 req.session 에 user, loggedIn 정보 저장
// middleware.js 를 이용해서 res.locals = req.session...  이용해서 pug template에 적용 
// home 으로 이동

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "회원가입" });
}

export const postJoin = async (req, res) => {
    const { name, email, username, password, password2 } = req.body;
    // password confirmation
    if (password !== password2) {
        return res.render("join", { pageTitle: "회원가입", errorMessage: "패스워드가 일치하지 않습니다." })
    }
    // email & username confirmation
    const exists = await User.exists({
        $or: [{ email }, { username }]
    })
    if (exists) {
        return res.render("join", { pageTitle: "회원가입", errorMessage: "이메일 혹은 유저이름이 이미 존재합니다." })
    }
    
    await User.create({
        name,
        email,
        username,
        password,
    });
    return res.redirect("/login");
}

export const logout = (req, res) => {
    // destroy session
    // redirect to Home
    return res.send("Log Out!");
}

export const profile = (req, res) => {
    return res.render("profile", { pageTitle: "유저 세부정보" });
}

export const edit = (req, res) => {
    return res.render("editUser", { pageTitle: "유저 세부정보 수정" });
}

export const remove = (req, res) => {
    return res.send("Remove User!");
}