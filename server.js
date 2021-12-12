const express = require('express');
var bcrypt = require('bcryptjs');
const cors = require('cors');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        //port : 3306,
        user: 'sid',
        password: 'helloworld',
        database: 'smart-brain'
    }
});
const db = knex;


const app = express();

app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
    res.send("success reaching homepage!");
})

app.put('/image', (req, res, db) => { image.handleImage(req, res, db) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//here we have used curried function concept. handleSignin when first introduced will return another function.
// dont get confused because handleSign(db, bcrypt) gets exxecuted immediately since otherwise if there were no
// arguments I would have just passed handleSignin as a pure callback function without the arguments

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})