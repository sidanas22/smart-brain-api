const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }
        )
        .catch(err => {
            res.status(404).json("unable to set entries");
        }
        );

}

module.exports = {
    handleImage: handleImage
}