const express = require('express');

const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const cors = require('cors');
const { response } = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const THIRTY_MIN = 1000 * 60 * 30
//code for session
const session = require('express-session');
const { cookie } = require('express/lib/response');
const KnexSessionStore = require('connect-session-knex')(session);

const {
    SESS_LIFETIME,
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

// const store = KnexSessionStore(
//     {
//         knex: db,
//         //createtable: true,
//         tablename: 'sessions'
//     });






const app = express();

app.use(express.json());
app.use(cors());
// app.use(session(
//     {
//         name: SESS_NAME,
//         resave: false,
//         rolling: false,
//         saveUninitialized: false,
//         secret: SESS_SECRET,
//         cookie: {
//             maxAge: SESS_LIFETIME,
//             sameSite: true,
//             secure: false //only currently false. cahnge in future
//         },
//         store//,
//         // genid: function(req) {
//         //     return genuuid() // use UUIDs for session IDs
//         //   },
//     }
// ));




app.get('/', (req, res) => {
    res.send("success reaching homepage!");
})

//app.get('/home', (req) )

app.put('/image', (req, res, db) => { image.handleImage(req, res, db) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//here we have used curried function concept. handleSignin when first introduced will return another function.
// dont get confused because handleSign(db, bcrypt) gets exxecuted immediately since otherwise if there were no
// arguments I would have just passed handleSignin as a pure callback function without the arguments

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})