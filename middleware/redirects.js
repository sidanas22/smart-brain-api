const redirect_root = (req, res, next, db) => {
   
if(req.body.session_id)
{
    db('user_sessions').where({
        expired: false,
        session_id: req.body.session_id,

    }).select('session_id')
    .then(data =>{
        console.log(data);       
        res.redirect('/home');
    } )
    .catch(err => {
        return res.status(200).json({ logged_out: true });
    })
}

else
{
    return res.status(200).json({ logged_out: true });
    
    
}


}

const redirect_home = (req, res, next, db) => {
    
if(req.body.session_id)
{
    db('user_sessions').where({
        expired: false,
        session_id: req.body.session_id,

    }).select('session_id')
    .then(data =>{
        console.log(data);
       
        res.redirect('/home');
    } )
    .catch(err => {
        return next();
        
    })
}

else
{
    next()
    
}



}

const redirect_signin = (req, res, next, db) => {
    
    if(req.body.session_id)
    {
        db('user_sessions').where({
        expired: false,
        session_id: req.body.session_id,

    }).select('session_id')
    .then(data =>{
        console.log(data);
        //res.redirect('/home');
        return next();
    } )
    .catch(err => {
        return res.status(200).json({ logged_out: true });
        //return next();
    })
    }
    else{
        return res.status(200).json({ logged_out: true });
    }
    
}

module.exports={
    redirect_signin,
    redirect_home,
    redirect_root
};