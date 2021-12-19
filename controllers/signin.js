const handleSignin = (db, bcrypt, crypto) => (req, res) => {


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

                                var buff;
                                crypto.randomBytes(16, (err, buf) => {
                                    if (err) throw err;
                                    buff = buf.toString('hex');
                                 });

                                db('user_sessions').insert({
                                    session_id : buff,
                                    expired: false,
                                    user_id: user[0].id
                                })

                                //console.log(req.session.store.length);
                                res.status(200).json({session_id: buff});
                                
                                res.json({
                                    session_id : 

                                })
                               

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