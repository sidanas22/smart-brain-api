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

const handleCreateEvent = (req, res, db) => {

    const { session_id,

        event_name,
        event_start_date,
        event_end_date,
        event_start_time, //HH12:MI
        event_start_time_period,
        event_end_time,
        event_end_time_period,
        //event_head,
        event_venue,
        event_description


    } = res.body;

    const min_auth_role = [60, 50];

    return db.select('user_id').from('user_sessions').where('session_id', '=', session_id)
        .then(user => {
            if (user[0].user_id >= auth_role[1] ) {
                
                db.select('event_venue')
                .from('event').where('event_venue','=', event_venue )
                .then( event => {
                    console.log(event.event_venue);
                })
                .catch(err => {
                    console.log( "we are okay to go");
                })
                
                //if ()
                // return db.insert({

                // })
            }

            else{
                return res.json({
                    hasAuthority : false
                })
            }

        })
        .catch(err => {
            
            error: err.message
        })
} 