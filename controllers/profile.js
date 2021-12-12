handleProfileGet = (req, res, db) => {
    const { id } = req.params;
   
    db.select('*').from('users')
        .where(
            {
                id: id
                //we could have also done .where({id}) bcz of
                //es6 syntax
            }
        )
        .then(user => {
            if (user.length) {
                
                res.json(user[0]);
            }
            else {
                res.status(404).json("user not found");
            }

        })
        .catch(err => {
            res.status(404).json("no such user");
        })



}

module.exports = {
    handleProfileGet //: this.handleProfileGet cuz we actually dont need this part when key and value are identical here with es6
}