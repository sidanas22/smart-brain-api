const redirect_home = (req, res, next) => {
    if (req.session.userID) {

        console.log("When redirecting to home: User Id is ", req.user.id);
        console.log("When redirecting to home Session Id is ", req.session.id);
        res.redirect('/home');
    }
    else {
        next();
    }
}

const redirect_signin = (req, res, next) => {
    if (!req.session.userID) {
        //how can i redirect when frontend is some other code
        //res.redirect('/signin');
        res.status(200).json({ logged_out: true });
    }
    else {
        next();
    }
}

module.exports={
    redirect_signin,
    redicrect_home
};