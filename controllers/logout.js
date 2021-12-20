//const { append } = require("express/lib/response")
const express = require('express');

//const { decodeBase64 } = require("bcryptjs");

const redirect_for_logout = (req, res, db, next) =>{
    flag2 = false;
    console.log("Hello!");

   return db.select('*').from('user_sessions').where('session_id', '=', req.body.session_id)
        .then(success => {
            console.log("success haha!")
            return next();
        } )
        .catch(err => {
            return res.json({
                logged_in: false
            })
            
        })

 
}


const handle_logout = (req, res, db) => {
    //console.log("When logging out. User Id is ", req.user.id);
    if (req.body.session_id) {

        flag = false;
      


        console.log("When logging out Session Id is ", req.body.session_id);

        db.transaction(function (trx) {
            return db('user_sessions').transacting(trx).where('session_id', req.body.session_id).del()
                .then((data) => {
                    flag = true;
                    res.status(200).json({ logged_out: true });
                    trx.commit();


                })
                .catch((err) => { flag = false; trx.rollback(); res.status(200).json({ logged_out: false }); });
        })
        .catch(err => {
            console.log("Error is :", err.message);
        });

        //db('user_sessions').where('session_id', req.body.session_id).del();
        //res.clearCookie(process.env.SESS_NAME);

        if (flag) {
            return res.status(200).json({ logged_out: false });
        }
    }

    else {
        return res.status(400).json({ logged_in: false })
    }

}

module.exports = {
    handle_logout: handle_logout,
    redirect_for_logout: redirect_for_logout
}