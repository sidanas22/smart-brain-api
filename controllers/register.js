
const uuid = require('uuid');
const { concat } = require("lodash");
const session = require('express-session');
const { json } = require('express/lib/response');
//const Promise = require('bluebird');
const role = 0;

const handleRegister = (req, res, db, bcrypt, crypto) => {
    //res.send("signing in");
    var ret_value = '';
    var uid;
    const { email, /*name,*/ password/*, role, web_view*/ } = req.body;
    if (!email || !password) {
        return res.status(400).json({ incorrect_form: true });
    }

    var flag = false;
    var hash_password;

    // db.select('*').from('login').where('email','=', email)
    //     .then(data => {
    //         flag = true;
    //         return res.status(400).json({
    //             emailExists: true
    //         })
    //     })
    //     .catch(err => {
    //         flag = false;

    //     })

    console.log("before hash function");
    if (!flag) {
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
                        .catch(err => {
                            return res.status(400).json({ emailExists: true })
                        })
                        .then(function (loginemail) {
                            console.log("inside transaction this has worked");
                            return trx('users').returning('*')
                                .insert({
                                    email: loginemail[0],
                                    name: "default_name",
                                    joined: new Date(),
                                    roles: 0,
                                    
                                    web_view: (role != 5 && role != 0 )   //false for student role
                                })
                                .then(user => {

                                    console.log("inside transaction this is worked");
                                    ret_value = uuid.v4();
                                    uid = user[0].id;

                                    db('user_sessions').insert({
                                        session_id: ret_value,
                                        expired: false,
                                        user_id: uid
                                    }).then(success => {
                                        res.status(200).json({
                                            ret_session_id: ret_value,
                                            isRegistered: true
                                        })
                                    }).catch(err => {
                                        res.send("could not save into database");
                                    });



                                });



                        }).then(trx.commit).catch(trx.rollback);

                }
                )



                // console.log("something 2");sadasd
            }
            )


        });
    }



};

const handleRegisterdetail = (req, res, db) => {

    var ret_value = '';

    const { name, lastname, session_id, accountType } = req.body;



    var flag = false;


    return db.select('user_id')
        .from('user_sessions')
        .where('session_id', '=', session_id)
        .then(
            data => {
                flag = true;
                console.log(data);

                db.transaction(trx => {


                    //                     knex('books')
                    //   .where('published_date', '<', 2000)
                    //   .update({
                    //     status: 'archived',
                    //     thisKeyIsSkipped: undefined
                    //   })


                    trx('users').where('id', '=', data[0].user_id).update({
                        name: name,
                        lastname: lastname,
                        accounttype: accountType

                    })
                        .catch(err => {
                            return res.status(400).json({ error: err.message });
                        })
                        .then(function (some_data) {
                            return res.status(200).json({
                                detailsRegistered: true
                            })
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);

                }
                )

            })
        .catch(err => {
            return res.json({
                sessionExists: false
            })

        })


};


module.exports = {
    handleRegister: handleRegister,
    handleRegisterdetail: handleRegisterdetail
}