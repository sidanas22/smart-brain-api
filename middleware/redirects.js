const redicrect_home = (req, res, next) => {
    if (req.session.userID) {
        res.redirect('/home');
    }
    else {
        next();
    }
}

const redirect_signin = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect('/signin');
    }
    else {
        next();
    }
}

module.exports({
    redirect_signin,
    redicrect_home
})