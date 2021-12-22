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

const express = require("express")



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
                    dept_list: JSON.stringify( dept_list)


                }
            )
                .returning('*')
                .then(success => {
                    console.log("Something needed: ",success);
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

module.exports = {
    handleCreateInduction
}