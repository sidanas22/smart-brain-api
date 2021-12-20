

const handle_access_control = (req, res, db) => {
    const { session_id, target_user_id, new_val } = req.body;


   return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user_id => {

            console.log(user_id[0]);

            

        //     return db.select('roles').from('users').where('id', '=', user_id[0].id)
        //         .then(role => {
        //             //role[0].roles
        //             var my_role = role[o].roles;

        //            return db.select('roles').from('users').where('id', '=', target_user_id)
        //                 .then(target_id => {

        //                     if (my_role >= target_id[0].id && my_role >= 20 && new_val <= my_role ) {
        //                         //////////////////////////////////
        //                         return db.transaction(function (trx) {

                                 
        //                             return trx('users')
        //                                 .where('id','=', target_id[0].id)
        //                                 .update(
        //                                     {
        //                                         roles: new_val
        //                                     }
        //                                 )
        //                                 .then(function (ids) {
        //                                     // books.forEach((book) => book.catalogue_id = ids[0]);
        //                                     //return trx('books').insert(books);
        //                                     return res.status(200).json({
        //                                         valueUpdated: true
        //                                     })
        //                                 })
        //                                 .catch( err => {
        //                                     return res.status(400).json({
        //                                         valueUpdated: false,
        //                                         error : err.message
        //                                     })  
        //                                 });
        //                         })
        //                             .then(function (inserts) {
        //                                 return res.status(200).json({
        //                                     valueUpdated: true
        //                                 })
        //                             })
        //                             .catch(function (error) {
        //                                 return res.status(400).json({
        //                                     valueUpdated: false,
        //                                     error : err.message
        //                                 })
        //                                 console.error(error);
        //                             });
        //                         //////////////////////////////

        //                     }

        //                     else{
        //                         return res.json("not allowed for current role")
        //                     }
        //                 })
        //                 .catch(err => {
        //                     return res.status(400).json({
        //                         valueUpdated: false,
        //                         error : err.message
        //                     })
        //                 })






        //         })
        //         .catch(err => {
        //             return res.status(400).json({
        //                 valueUpdated: false,
        //                 error : err.message
        //             })
        //         })


        // })
        // .catch(err => {
            
            
        //     // return res.status(400).json({
        //     //     valueUpdated: false,
        //     //     error : err.message
        //     // })

        //     return res.json("not ")


         })
}



module.exports = {
    handle_access_control
}