//const session = require('express-session');

const session = require("express-session");
const { concat } = require("lodash");
//const Promise = require('bluebird');


const handleRegister = (req, res, db, bcrypt, crypto) => {
    //res.send("signing in");
    const { email, name, password, role, web_view } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }

    var flag = false;
    var hash_password;

    db.select('*').from('login').where('email', email)
        .then(data => {
            flag = true;
        })
        .catch(err => {
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
                    .then(function (loginemail) {
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

                                console.log("inside transaction this is worked");
                                random_string = '';
                                crypto.randomBytes(16, (err, buf) => {
                                    if (err) throw err;

                                    random_string = buf.toString('hex');
                                    console.log(random_string);
                                    //concat()
                                    var chose = 'insert into user_sessions where (session_id, expired, user_id) values(' + random_string + ',' + ' false,( select id from users where id = ' + user[0].id.toString() + '));'

                                    //const sub_query = trx.select('user_id').from('users').where()
                                    res.status(200).json({
                                        random_string: random_string
                                    })

                                    return trx('user_sessions').insert({
                                        session_id: random_string,
                                        expired: false,
                                        user_id: user[0].id
                                    })

                                })
                                //trx.raw(chose);
                                // console.log("inside transaction this has worked too");
                                // return trx;


                            });




                        // db('user_sessions').returning('session_id').insert({
                        //     session_id: random_string,
                        //     expired: false,
                        //     //user_id: 
                        // }).then((session_data) => {
                        //     db('users')
                        //     db.select('id').from('users').insetr()where('id','=', user[0].id)
                        // //     console.data("Session ID: ", session_data);
                        // // }

                        // );




                    }).then(trx.commit).catch(trx.rollback);

            }
            )

            // console.log("something 2");sadasd
        }
        )
        //.catch(err => {
        //         some_message = "error is :" + err.message
        //         res.status(400).json(err.message);
        //     }
        //     )

    });
    // });


    console.log("after hash function");



}

module.exports = {
    handleRegister: handleRegister
}