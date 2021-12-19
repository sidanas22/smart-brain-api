const handleSignin = (db, bcrypt) => (req, res) => {


    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }



    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash)
                .then(result => {

                    //console.log(result);
                    if (result === true) {
                        return db.select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {

                                res.session.userID = user[0].id;
                                console.log("Hey Hey Hey:", typeof (user[0].id));
                                console.log("When logging in. User Id is ", req.user.id);
                                console.log("When logging in Session Id is ", req.session.id);
                                res.redirect('/home');

                            })
                            .catch(err => {
                                res.status(400).json('cannot get user');
                            })
                    }

                    else {
                        res.status(400).json("Your Email or Password was incorrect.");
                    }

                })
                .catch(err => {
                    res.status(400).json("Your Email or Password was incorrect.");
                });
        }
        ).catch(err => { res.status(400).json("Your Email or Password was incorrect.") })
}

module.exports = {
    handleSignin: handleSignin
}