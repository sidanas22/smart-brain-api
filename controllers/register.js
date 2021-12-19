const handleRegister = (req, res, db, bcrypt) => {
    //res.send("signing in");
    const { email, name, password, role,web_view } = req.body;
    if(!email || !name || !password)
    {
       return res.status(400).json('incorrect form submission');
    }

    var flag = false;
    var hash_password;

    db.select('*').from('login').where('email',email)
    .then(data => {
        flag = true;
    })
    .catch(err =>{
        flag = false;
        return res.status(409).json({
            emailExists: true
        })
    })

    console.log("before hash function");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            hash_password = hash;
            console.log("inside hash func");

            //start

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
                                joined: new Date(),
                                roles: role,
                                web_view: role == 0 //retursn true if role is 0
                            })
                            .then(user => {
                                //res.json(user[0]);
                                console.log("The user id is : ", user[0].id);
                                console.log(res.session);
                                res.session.userId = user[0].id;
                                console.log("This is happening");
                                console.log("When registered. User Id is ", req.session.user.id);
                                console.log("When registered Session Id is ", req.session.id);
                                res.status(200);
                                res.redirect('/home')
                            });
        
                    }
                    )
                    .then(trx.commit)
                    .catch(trx.rollback)
        
                    console.log("something 2");
            }
            )
                .catch(err => {
                    some_message= "error is :"+err.message 
                    res.status(400).json( err.message);
                }
                )

        });
    });


    console.log("after hash function");

    // db.transaction(trx => {
    //     console.log("we are here");
    //     trx.insert
    //         (
    //             {
    //                 hash: hash_password,
    //                 email: email,
    //             }
    //         )
    //         .into('login')
    //         .returning('email')
    //         .then(loginemail => {
    //             console.log("inside transaction this has worked");
    //             return trx('users').returning('*')
    //                 .insert({
    //                     email: loginemail[0],
    //                     name: name,
    //                     joined: new Date()
    //                 })
    //                 .then(user => {
    //                     res.json(user[0]);
    //                 });

    //         }
    //         )
    //         .then(trx.commit)
    //         .catch(trx.rollback)

    //         console.log("something 2");
    // }
    // )
    //     .catch(err => {
    //         res.status(400).json( err.message);
    //     }
    //     )

}

module.exports = {
    handleRegister: handleRegister
}