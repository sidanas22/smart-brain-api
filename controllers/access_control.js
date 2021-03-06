

const handle_access_control = (req, res, db) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    const { session_id, target_user_id, new_val } = req.body;


   return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user_id => {

            //console.log(user_id[0]);

            

            return db.select('roles').from('users').where('id', '=', user_id[0].user_id)
                .then(role => {
                    //role[0].roles
                    var my_role = role[0].roles;

                   return db.select('roles').from('users').where('id', '=', target_user_id)
                        .then(target_id => {

                            console.log(" The target id is: ", target_user_id);
                            console.log("My role is ", my_role)

                            if (my_role >= target_id[0].roles && my_role >= 20 && new_val <= my_role ) {
                                //////////////////////////////////
                                return db.transaction(function (trx) {

                                 
                                    return trx('users')
                                        .where('id','=', target_user_id)
                                        .update(
                                            {
                                                roles: new_val
                                            }
                                        )
                                        .then(function (ids) {
                                            
                                            return res.status(200).json({
                                                valueUpdated: true
                                            })
                                        })
                                        .catch( err => {
                                            return res.status(400).json({
                                                valueUpdated5: false,
                                                error : err.message
                                            })  
                                        });
                                })
                                    .then(function (inserts) {
                                        return res.status(200).json({
                                            valueUpdated4: true
                                        })
                                    })
                                    .catch(function (error) {
                                        return res.status(400).json({
                                            valueUpdated3: false,
                                            error : err.message
                                        })
                                        console.error(error);
                                    });
                                //////////////////////////////

                            }

                            else{
                                return res.status(400).json({
                                    valueUpdated2_5: false,
                                    error : "no_privelege"
                                })
                            }
                        })
                        .catch(err => {
                            return res.status(400).json({
                                valueUpdated2: false,
                                error : err.message
                            })
                        })






                })
                .catch(err => {
                    return res.status(400).json({
                        valueUpdated1: false,
                        error : err.message
                    })
                })


        })
        .catch(err => {
            
            
            return res.status(400).json({
                valueUpdated0: false,
                error : err.message
            })

         })
}



// const show_view = (req, res, db) => {
//     res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//     const { session_id, target_user_id, new_val } = req.body;


//    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
//         .then(user_id => {

//             //console.log(user_id[0]);
//             var id_one ;
            

//             return db.select('roles').from('users').where('id', '=', user_id[0].user_id)
//                 .then(role => {
//                     //role[0].roles
//                     var my_role = role[0].roles;

//                     if(my_role == 90){
                        
//                         return db.select('*').from('users').where('id', '=',  )
//                         .then(target_id => {

//                             console.log(" The target id is: ", target_user_id);
//                             console.log("My role is ", my_role)

//                             if (my_role >= target_id[0].roles && my_role >= 20 && new_val <= my_role ) {
//                                 //////////////////////////////////
//                                 return db.transaction(function (trx) {

                                 
//                                     return trx('users')
//                                         .where('id','=', target_user_id)
//                                         .update(
//                                             {
//                                                 roles: new_val
//                                             }
//                                         )
//                                         .then(function (ids) {
                                            
//                                             return res.status(200).json({
//                                                 valueUpdated: true
//                                             })
//                                         })
//                                         .catch( err => {
//                                             return res.status(400).json({
//                                                 valueUpdated5: false,
//                                                 error : err.message
//                                             })  
//                                         });
//                                 })
//                                     .then(function (inserts) {
//                                         return res.status(200).json({
//                                             valueUpdated4: true
//                                         })
//                                     })
//                                     .catch(function (error) {
//                                         return res.status(400).json({
//                                             valueUpdated3: false,
//                                             error : err.message
//                                         })
//                                         console.error(error);
//                                     });
//                                 //////////////////////////////

//                             }

//                             else{
//                                 return res.status(400).json({
//                                     valueUpdated2_5: false,
//                                     error : "no_privelege"
//                                 })
//                             }
//                         })
//                         .catch(err => {
//                             return res.status(400).json({
//                                 valueUpdated2: false,
//                                 error : err.message
//                             })
//                         })


//                         return res.json({
                            
//                         })

//                         ////
//                     }

//                    return db.select('roles').from('users').where('id', '=', target_user_id)
//                         .then(target_id => {

//                             console.log(" The target id is: ", target_user_id);
//                             console.log("My role is ", my_role)

//                             if (my_role >= target_id[0].roles && my_role >= 20 && new_val <= my_role ) {
//                                 //////////////////////////////////
//                                 return db.transaction(function (trx) {

                                 
//                                     return trx('users')
//                                         .where('id','=', target_user_id)
//                                         .update(
//                                             {
//                                                 roles: new_val
//                                             }
//                                         )
//                                         .then(function (ids) {
                                            
//                                             return res.status(200).json({
//                                                 valueUpdated: true
//                                             })
//                                         })
//                                         .catch( err => {
//                                             return res.status(400).json({
//                                                 valueUpdated5: false,
//                                                 error : err.message
//                                             })  
//                                         });
//                                 })
//                                     .then(function (inserts) {
//                                         return res.status(200).json({
//                                             valueUpdated4: true
//                                         })
//                                     })
//                                     .catch(function (error) {
//                                         return res.status(400).json({
//                                             valueUpdated3: false,
//                                             error : err.message
//                                         })
//                                         console.error(error);
//                                     });
//                                 //////////////////////////////

//                             }

//                             else{
//                                 return res.status(400).json({
//                                     valueUpdated2_5: false,
//                                     error : "no_privelege"
//                                 })
//                             }
//                         })
//                         .catch(err => {
//                             return res.status(400).json({
//                                 valueUpdated2: false,
//                                 error : err.message
//                             })
//                         })






//                 })
//                 .catch(err => {
//                     return res.status(400).json({
//                         valueUpdated1: false,
//                         error : err.message
//                     })
//                 })


//         })
//         .catch(err => {
            
            
//             return res.status(400).json({
//                 valueUpdated0: false,
//                 error : err.message
//             })

//          })
// }


module.exports = {
    handle_access_control
}