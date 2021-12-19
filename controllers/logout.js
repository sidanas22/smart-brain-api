//const { append } = require("express/lib/response")

const handle_logout = (req, res) => {
    console.log("When logging out. User Id is ", req.user.id);
    console.log("When logging out Session Id is ", req.session.id);
    req.session.destroy(err => {
        if (err) {
            console.log("error logging out");
        }

    });

    res.clearCookie(process.env.SESS_NAME);
    res.status(200).json({logged_out: true});
}

module.exports={
    handle_logout
}