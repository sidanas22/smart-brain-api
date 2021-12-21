// {
//     "session_id": "a6bc4117-5d03-4d17-ad8c-ea4a9f4385c6",
//     "event_name": "some_name",
//     "event_start_date": "20170103",
//     "event_end_date": "20170103" ,
//     "event_start_time": "0300" , //HH12:MI
//     "event_start_time_period": "PM" ,
//     "event_end_time": "0400",
//     "event_end_time_period": "PM",
//     "event_head": 69, 
//     "event_venue": "SOMEVENUE",
//     "event_description": "DETAILS OF EVENT"
// }

const handleApproveEvent = (req, res, db) => {

    const {
        session_id,
        event_name,
        event_start_date,
        event_end_date,
        event_start_time, //HH12:MI
        event_start_time_period,
        event_end_time,
        event_end_time_period,
        event_venue,
        event_description

    } = req.body;

    const auth_role = [40];

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user => {

            if (user) {

                return db.select('roles').from('users').where({
                    id: user[0].user_id
                })
                    .then(role => {

                        if (role[0].roles == auth_role[0]) {

                            console.log("helloworld");
                            return db('event').insert({
                                event_name: event_name,
                                event_start_date: event_start_date,
                                event_end_date: event_end_date,
                                event_start_time: event_start_time,
                                event_start_time_period: event_start_time_period,
                                event_end_time: event_end_time,
                                event_end_time_period: event_end_time_period,
                                event_venue: event_venue,
                                event_description: event_description,
                                event_head: user[0].user_id
                            })
                                .then(success => {
                                    return res.status(200).json({ eventCreated: true });
                                })
                                .catch(err => {
                                    return res.status(400).json({ error: err.message });
                                })

                        }

                        else {
                            return res.json({
                                error: "noAuth"
                            })
                        }

                    })
                    .catch(err => {
                        return res.status(400).json({ error: err.message });
                    })


            }
            

        })
        .catch(err => {

            return res.status(400).json({ error: err.message });
        })
}


const handleCreateEvent = (req, res, db) => {

    const {
        session_id,
        event_name,
        event_start_date,
        event_end_date,
        event_start_time, //HH12:MI
        event_start_time_period,
        event_end_time,
        event_end_time_period,
        event_venue,
        event_description

    } = req.body;

    const auth_role = [60, 50];

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user => {
            if (user[0].user_id >= auth_role[1]) {

                console.log("helloworld");
                return db('event').insert({
                    event_name: event_name,
                    event_start_date: event_start_date,
                    event_end_date: event_end_date,
                    event_start_time: event_start_time,
                    event_start_time_period: event_start_time_period,
                    event_end_time: event_end_time,
                    event_end_time_period: event_end_time_period,
                    event_venue: event_venue,
                    event_description: event_description,
                    event_head: user[0].user_id
                })
                    .then(success => {
                        return res.status(200).json({ eventCreated: true });
                    })
                    .catch(err => {
                        return res.status(400).json({ error: err.message });
                    })

            }

            else {
                return res.json({
                    hasAuthority: false
                })
            }

        })
        .catch(err => {

            return res.status(400).json({ error: err.message });
        })
}



module.exports = {
    handleCreateEvent
}