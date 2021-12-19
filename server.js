const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

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

//middleware
const { redirect_home, redirect_signin, redirect_root } = require('./middleware/redirects');




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
app.use(cors());





app.get('/', (req,res,next)=>{ redirect_root(req,res,next,db) }, (req, res) => {

    res.json({
        connectionEstablished: true
    });
})

app.get('/home',(req, res, next) => {redirect_signin(req,res, next, db)} ,(req,res)=> {
    res.send("This is the homepage");
})


// app.put('/image', (req, res, db) => { image.handleImage(req, res, db) })

// app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//curried func use
app.post('/signin', (req,res, next)=> {redirect_home(req,res,next,db) }, signin.handleSignin(db, bcrypt,crypto))

app.post('/register', (req,res, next)=>
{redirect_home(req,res,next,db)}, (req, res) => { register.handleRegister(req, res, db, bcrypt, crypto) })

app.post('/logout', logout.handle_logout);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})