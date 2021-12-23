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
                res.status(200).json({ logged_in: false });
            })
    }

    else {
        return res.status(200).json({ logged_in: false });


    }


}

const redirect_for_sigin = (req, res, next, db) => {

    if (req.body.session_id) {
        return db('user_sessions').where({
            expired: false,
            session_id: req.body.session_id,

        }).select('session_id')
            .then(data => {
                //console.log(data);
                if(data){
                return res.status(200).json({
                    logged_in: true
                })}
                else
                {
                    return res.status(400).json({
                        invalid_session_id: true
                    })
                }
                //res.redirect('/home');
            })
            .catch(err => {
                return res.status(400).json({
                    error: err.messaage
                })

            })
    }

    else {
        
        
        return next()

    }



}

const redirect_for_register = (req, res, next, db) => {

    if (req.body.session_id) {
        return db('user_sessions').where({
            expired: false,
            session_id: req.body.session_id,

        }).select('session_id')
            .then(data => {
                //console.log(data);
                return res.status(200).json({
                    alredyRegisterd: true
                })
                //res.redirect('/home');
            })
            .catch(err => {
                return next();

            })
    }

    else {
        return next()

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

                return next();
            })
            .catch(err => {
                return res.status(200).json({ logged_out: true });
                res.send("error there was")

            })
    }
    else {
        return res.status(200).json({ logged_out: true });
        return res.send("error here is");
    }

}

module.exports = {
    redirect_signin,
    redirect_for_register,
    redirect_for_sigin,
    redirect_root
};