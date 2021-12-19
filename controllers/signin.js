const uuid = require('uuid');
const handleSignin = (db, bcrypt, crypto) => (req, res) => {

    var uid;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({loginError: true});
    }


console.log("THIS IS TRUE");
    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash)
                .then(result => {

                    //console.log(result);
                    if (result === true) {
                        return db.select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {

                                uid= uuid.v4();
                                // crypto.randomBytes(16, (err, buf) => {
                                //     if (err) throw err;
                                //     buff = buf.toString('hex');
                                //  });
                                console.log(uid);
                                console.log(user[0].id);

                                db('user_sessions').insert({
                                    session_id : uid,
                                    expired: false,
                                    user_id: user[0].id
                                }).then( success =>{
                                   return res.status(200).json({ret_session_id: uid})}
                                )
                                .catch(err =>
                                    {
                                        console.log("This is the error: ", err.message);
                                    })

                                
                                
                                //res.status(200).json({session_id: buff});
                               

                            })
                            .catch(err => {
                                res.status(400).json({loginError : true});
                            })
                    }

                    else {
                        return res.status(400).json({loginError : true});
                    }

                })
                .catch(err => {
                    return res.status(400).json({loginError : true});
                });
        }
        ).catch(err => { return res.status(400).json({loginError : true}) })
}

module.exports = {
    handleSignin: handleSignin
}