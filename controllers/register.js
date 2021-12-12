const handleRegister = (req, res, db, bcrypt) => {
    //res.send("signing in");
    const { email, name, password } = req.body;
    if(!email || !name || !password)
    {
       return res.status(400).json('incorrect form submission');
    }

    var hash_password;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            hash_password = hash;
        });
    });

    db.transaction(trx => {
        trx.insert
            (
                {
                    hash: hash_password,
                    email: email,
                }
            )
            .into('login')
            .returning('email')
            .then(loginemail => {
                return trx('users').returning('*')
                    .insert({
                        email: loginemail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })

            }
            )
            .then(trx.commit)
            .catch(trx.rollback)
    }
    )
        .catch(err => {
            res.status(400).json("unable to register");
        }
        )

}

module.exports = {
    handleRegister: handleRegister
}