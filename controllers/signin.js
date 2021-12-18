const handleSignin = (db, bcrypt) => (req, res) => {


    const { email, password } = req.body;
    if(!email || !password)
    {
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
                                //res.json(user[0]);
                                //res.session.userID = user[0].i
                                console.log("Hey Hey Hey:",typeof(user[0].id));
                                res.json(
                                    {
                                        signedin : true
                                    }
                                    )
                            })
                            .catch(err => {
                                res.status(400).json('cannot get user');
                            })
                    }

                    else {
                        res.status(400).json('wrong credentials');
                    }

                })
                .catch(err => {
                    res.status(400).json('wrong credentials');
                });
        }
        )
}

module.exports = {
    handleSignin: handleSignin
}