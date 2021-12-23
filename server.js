const express = require('express');
const session = require('express-session');
//const KnexSessionStore = require('connect-session-knex')(session);


const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const cors = require('cors');
const { response } = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//controllers
const logout = require('./controllers/logout');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const access_control = require('./controllers/access_control');
const event_s = require('./controllers/events');
const induction = require('./controllers/induction');

//middleware
const { redirect_for_register,
    redirect_for_sigin, redirect_signin, redirect_root } = require('./middleware/redirects');
const { Events } = require('pg');




//env variables
const {
    SESS_LIFETIME = 1800000,
    SESS_NAME,
    SESS_SECRET
} = process.env;

//FOR HEROKU SERVER
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }

    }

});

const db = knex;




const app = express();

app.use(express.json());
app.use(cors())

// app.use(cors({
//     origin: '*'
// }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     //res.setHeader('Access-Control-Allow-Origin', "https://localhost:30")
//     next();
//   })



app.get('/', (req, res, next) => { redirect_root(req, res, next, db) }, (req, res) => {

    res.json({
        connectionEstablished: true
    });
})

app.get('/home'/*,(req, res, next) => {redirect_signin(req,res, next, db)}*/, (req, res) => {
    res.send("This is the homepage");
})


app.post('/signin', (req, res, next) => { redirect_for_sigin(req, res, next, db) }, signin.handleSignin(db, bcrypt, crypto))

app.post('/register', (req, res, next) => { redirect_for_register(req, res, next, db) }, (req, res) => { register.handleRegister(req, res, db, bcrypt, crypto) })

app.post('/registerdetail', (req, res) => { register.handleRegisterdetail(req, res, db) })

app.post('/logout'/*,(req,res,next)=>{ logout.redirect_for_logout(req,res,db,next) }*/ ,(req, res) => { logout.handle_logout(req, res, db) });

//have to update this
app.post('/accesscontrol' ,(req, res) => { access_control.handle_access_control(req, res, db) });

app.post('/create-event', (req, res) => { event_s.handleCreateEvent(req,res,db) });

app.post('/create-induction', (req,res) => { induction.handleCreateInduction(req, res, db) })


app.post('/approve-induction', (req,res) => { induction.handleApproveInduction(req, res, db) })

app.post('/approve-induction-response', (req,res) =>{ induction.ApproveInductionResponse(req, res,db)})

app.post('/get-upcoming-inductions-events', (req,res) =>{ induction.handleGetUpcomingEventsInductions(req, res,db)})

app.post('/get-inductions-data', (req,res) =>{ induction.GetInductionsData(req, res,db)});



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})