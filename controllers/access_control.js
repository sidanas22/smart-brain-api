

const handle_access_control = (req, res, db) => {
    const { session_id, user_id, new_val } = req.body;


    db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user_id => {

            console.log(user_id);

            //////////////////////////////////
            // db.transaction(function (trx) {



            //     return trx
            //         .insert({ name: 'Old Books' }, 'id')
            //         .into('catalogues')
            //         .then(function (ids) {
            //             books.forEach((book) => book.catalogue_id = ids[0]);
            //             return trx('books').insert(books);
            //         });
            // })
            //     .then(function (inserts) {
            //         console.log(inserts.length + ' new books saved.');
            //     })
            //     .catch(function (error) {
            //         // If we get here, that means that neither the 'Old Books' catalogues insert,
            //         // nor any of the books inserts will have taken place.
            //         console.error(error);
            //     });
            //////////////////////////////
        })
}



module.exports = {
    handle_access_control
}