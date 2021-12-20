//const { append } = require("express/lib/response")
const express = require('express');

const { decodeBase64 } = require("bcryptjs");

const handle_logout = (req, res) => {
    //console.log("When logging out. User Id is ", req.user.id);
    console.log("When logging out Session Id is ", req.body.session_id);
    
    db.transaction( function (trx)
    {
        db('user_sessions').transacting(trx).where('session_id', req.body.session_id).del()
        .then(trx.commit)
        .catch(trx.rollback);
    });
    
    //db('user_sessions').where('session_id', req.body.session_id).del();
    //res.clearCookie(process.env.SESS_NAME);
    res.status(200).json({logged_out: true});
}

module.exports={
    handle_logout
}