// create table induction_template_approval (
// 	id serial unique not null primary key,
// 	description text ,
// 	title varchar(100) not null,
// 	induction_type_excom boolean not null,
// 	society_id int not null,
// 	dept_list json not null,
// 	foreign key (society_id) references societies (id)
// );
// alter table induction_template_approval add column aproved boolean default false;




//


const express = require("express")


//only for president
//show how many have been created
const handleCreateInduction = (req, res, db) => {

    const { session_id,
        description,
        title,
        induction_type_excom,
        society_id,
        dept_list, //json            
    } = req.body

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(president => {
            //i am alrady only showing this to president


            return db('induction_template_approval').insert(
                {
                    title: title,
                    description: description,
                    title: title,
                    induction_type_excom: induction_type_excom,
                    society_id: society_id,
                    dept_list: JSON.stringify(dept_list)


                }
            )
                .returning('*')
                .then(success => {
                    console.log("Something needed: ", success);
                    return res.status(200).json({
                        inductionProposed: true
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        inductionProposed: false,
                        error: err.message
                    });
                })
        })
        .catch(err => {
            return res.status(400).json({
                inductionProposed: false
                , error: err.message
            });
        })
}

//only for faculty
//show before how many waiting for approval
const handleApproveInduction = (req, res, db) => {

    const { session_id,
        id,
        status
    } = req.body

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(faculty => {



            return db('induction_template_approval').update(
                {
                    aproved: status
                }
            )
                .where(
                    {
                        id: id
                    }
                )
                .returning('*')
                .then(success => {
                    console.log("Something needed: ", success);
                    return res.status(200).json({
                        inductionApproved: status
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        inductionApproved: false,
                        error: err.message
                    });
                })
        })
        .catch(err => {
            return res.status(400).json({
                inductionApproved: false
                , error: err.message
            });
        })

}

//show this to anyone authorized
const showAllInductions = (req, res, db) => {

    const { session_id,
        id
    } = req.body

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(faculty => {



            return db('induction_template_approval').update(
                {
                    aproved: true
                }
            )
                .where(
                    {
                        id: id
                    }
                )
                .returning('*')
                .then(success => {
                    console.log("Something needed: ", success);
                    return res.status(200).json({
                        inductionApproved: true
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        inductionApproved: false,
                        error: err.message
                    });
                })
        })
        .catch(err => {
            return res.status(400).json({
                inductionApproved: false
                , error: err.message
            });
        })

}



// create table induction_responses (
// 	society_id int,
// 	induction_type_excom boolean not null,
// 	induction_id int,
// 	user_id int not null,
// 	title varchar(100) not null,
// 	first_name varchar(50) not null,
// 	last_name varchar(50) not null,
// 	email varchar(100) not null,
// 	dept_name varchar(100) not null,
// 	batch varchar(10) not null,
// 	cgpa varchar (4),
// 	status boolean,
// 	foreign key (society_id) references societies (id) on delete cascade,
// 	foreign key (induction_id) references induction_template_approval (id)
// -- 	,foreign key (dept_name) references dept(dept_name)
// );


//for president
const ApproveInductionResponse = (req, res, db) => {

    const { session_id,
        society_id,
        user_id,
        status,
        induction_type_excom

    } = req.body

    if (status) {

        return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
            .then(faculty => {



                return db('induction_responses').update(
                    {
                        status: status
                    }
                )
                    .where(
                        {
                            society_id: society_id,
                            user_id: user_id,
                            induction_type_excom: induction_type_excom
                        }
                    )
                    .returning('*')
                    .then(success => {
                        console.log("Something needed: ", success);
                        return res.status(200).json({
                            inductionResponseApproved: true
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({
                            inductionResponseApproved: false,
                            error: err.message
                        });
                    })
            })
            .catch(err => {
                return res.status(400).json({
                    inductionResponseApproved: false
                    , error: err.message
                });
            })
    }

    else {
        return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
            .then(faculty => {



                return db('induction_responses').
                    where(
                        {
                            society_id: society_id,
                            user_id: user_id,
                            induction_type_excom: induction_type_excom
                        }
                    ).del()
                    .then(success => {
                        return res.status(200).json({
                            inductionResponseApproved: false
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({

                            error: err.message
                        });
                    })



            })
            .catch(err => {
                return res.status(400).json({

                    error: err.message
                });
            })

    }
}


// //for president
// const ApproveInductionResponse = (req, res, db) => {

//     const { session_id,
//         society_id,
//         user_id,
//         status,
//         induction_type_excom

//     } = req.body

//     if (status) {

//         return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
//             .then(faculty => {



//                 return db('induction_responses').update(
//                     {
//                         status: status
//                     }
//                 )
//                     .where(
//                         {
//                             society_id: society_id,
//                             user_id: user_id,
//                             induction_type_excom: induction_type_excom
//                         }
//                     )
//                     .returning('*')
//                     .then(success => {
//                         console.log("Something needed: ", success);
//                         return res.status(200).json({
//                             inductionResponseApproved: true
//                         })
//                     })
//                     .catch(err => {
//                         return res.status(400).json({
//                             inductionResponseApproved: false,
//                             error: err.message
//                         });
//                     })
//             })
//             .catch(err => {
//                 return res.status(400).json({
//                     inductionResponseApproved: false
//                     , error: err.message
//                 });
//             })
//     }

//     else {
//         return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
//             .then(faculty => {



//                 return db('induction_responses').
//                     where(
//                         {
//                             society_id: society_id,
//                             user_id: user_id,
//                             induction_type_excom: induction_type_excom
//                         }
//                     ).del()
//                     .then(success => {
//                         return res.status(200).json({
//                             inductionResponseApproved: false
//                         })
//                     })
//                     .catch(err => {
//                         return res.status(400).json({

//                             error: err.message
//                         });
//                     })



//             })
//             .catch(err => {
//                 return res.status(400).json({

//                     error: err.message
//                 });
//             })

//     }
// }

const handleGetUpcomingEventsInductions = (req, res, db) => {

    const { session_id, get_what } = req.body

    if (get_what == "induction") {
        return db.select('*').from('induction_template_approval')
            .where(
                {
                    aproved: true
                }
            )
            .then(induction_list => {
                res.status(200).json({
                    induction_list: induction_list
                })

            })
            .catch(err => {
                res.status(400).json({
                    error: err.message
                })
            })

    }

    else if (get_what == "event") {

        const d = new Date();

        month = (d.getMonth() + 1).toString();	// Month	[mm]	(1 - 12)
        date = d.getDate().toString();		// Day		[dd]	(1 - 31)
        year = d.getFullYear().toString();
        var now_date =  year+month+date;
        console.log("Current date:", now_date);

        return db.select('*').from('event')
            .where(
                {
                    approved: true
                }
            )
            .andWhere(function () {
                this.where('event_start_date', '>',now_date)
            })
            .then(event_list => {
                res.status(200).json({
                    event_list: event_list
                })

            })
            .catch(err => {
                res.status(400).json({
                    error: err.message
                })
            })

    }
}


module.exports = {
    handleCreateInduction,
    handleApproveInduction,
    ApproveInductionResponse,
    handleGetUpcomingEventsInductions
}