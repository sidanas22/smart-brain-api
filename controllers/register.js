const handleRegister = (req, res, db, bcrypt) => {
    //res.send("signing in");
    const { email, name, password } = req.body;
    if(!email || !name || !password)
    {
       return res.status(400).json('incorrect form submission');
    }

    var hash_password;

    console.log("before hash function");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            hash_password = hash;
            console.log("inside hash func");
        });
    });


    console.log("after hash function");

    db.transaction(trx => {
        console.log("we are here");
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
                console.log("inside transaction this has worked");
                return trx('users').returning('*')
                    .insert({
                        email: loginemail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    });

            }
            )
            .then(trx.commit)
            .catch(trx.rollback)

            console.log("something 2");
    }
    )
        .catch(err => {
            res.status(400).json( err.message);
        }
        )

}

module.exports = {
    handleRegister: handleRegister
}