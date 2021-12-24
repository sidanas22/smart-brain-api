
const uuid = require('uuid');
const express = require('express');
const handleSignin = (db, bcrypt, crypto) => (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log("Req: ", req.body);
    var uid;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json("email or password missing");
    }
// haseeb pinted out fault
    //new code
   
    // db.select('id').from('users').where('email', '=', email)
    //     .then(user_id => {

    //         if (user_id) {

    //             db.select('session_id').from('user_sessions')
    //                 .where('user_id', '=', user_id[0])
    //                 .then(success => {

    //                 })
    //         }

            
    //     })
    //     .catch(err => {
    //         return res.status(400).json({
    //             error: err
    //         })
    //     })
    //////


    console.log("THIS IS TRUE");
    return db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash)
                .then(result => {

                    console.log(result);
                    if (result === true) {
                        return db.select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {

                                uid = uuid.v4();


                                db('user_sessions').insert({
                                    session_id: uid,
                                    expired: false,
                                    user_id: user[0].id
                                }).then(success => {

                                    console.log("HELLO");
                                    return res.status(200).json({
                                        ret_session_id: uid,
                                        logged_in: true
                                    });
                                }
                                )
                                    .catch(err => {
                                        console.log("Error is: ", error);
                                        //cannot be logged in from diff devices
                                        return res.status(200).json({
                                            loginError: true
                                            , error: err.message
                                        });
                                    })



                                //res.status(200).json({session_id: buff});


                            })
                            .catch(err => {
                                console.log("Error01 is:", err);

                                res.status(200).json({
                                    loginError: true,
                                    error: err.message
                                });
                            })
                    }

                    else {
                        console.log("anas")
                        return res.status(200).json({
                            loginError: true,
                            error: err.message
                        });
                    }

                })
                .catch(err => {
                    console.log("The error 02", err);
                    return res.status(200).json({
                        loginError: true,
                        error: err.message
                    });
                });
        }
        ).catch(err => {
            console.log("The error is: ", err);
            return res.status(200).json({ loginError: true, error: err.message })
        })



    //////
}

module.exports = {
    handleSignin: handleSignin
}