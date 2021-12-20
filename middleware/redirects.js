const redirect_root = (req, res, next, db) => {

    if (req.body.session_id) {
        return db('user_sessions').where({
            expired: false,
            session_id: req.body.session_id,

        }).select('session_id')
            .then(data => {
                console.log(data);
                res.redirect('/home');
            })
            .catch(err => {
                res.status(200).json({ bogged_out: true });
            })
    }

    else {
        return res.status(200).json({ logged_out: true });


    }


}

const redirect_home = (req, res, next, db) => {

    if (req.body.session_id) {
        return db('user_sessions').where({
            expired: false,
            session_id: req.body.session_id,

        }).select('session_id')
            .then(data => {
                console.log(data);

                res.redirect('/home');
            })
            .catch(err => {
                next();

            })
    }

    else {
        next()

    }



}

const redirect_signin = (req, res, next, db) => {

    if (req.body.session_id) {
        return db('user_sessions').where({
            expired: false,
            session_id: req.body.session_id,

        }).select('session_id')
            .then(data => {
                console.log(data);
                //res.redirect('/home');
                next();
            })
            .catch(err => {
                //return res.status(200).json({ logged_out: true });
                res.send("error there was")
                //return next();
            })
    }
    else {
        return res.status(200).json({ logged_out: true });
    }

}

module.exports = {
    redirect_signin,
    redirect_home,
    redirect_root
};