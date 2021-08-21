export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
}

export const protectedMiddleware = (req, res, next) => {
    // 로그인 되는 경우만 계속 진행
    if (!req.session.loggedIn) {
        return res.status(403).redirect("/");
    }
    next();
}

export const publicOnlyMiddleware = (req, res, next) => {
    // 로그인 되지 않는 경우만 계속 진행
    if (req.session.loggedIn) {
        return res.status(403).redirect("/");
    }
    next();
}