const handleCreateInduction = (req, res, db) => {


    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user => { })
}

module.exports = {
    handleCreateInduction
}