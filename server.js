const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const getProfile = require('./controllers/profile')
const handleImage = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'craigdillenbeck',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors()); // Cross-Origin Resource Sharing


// SIGN IN
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })

// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// GET USER
app.get('/profile/:id', (req, res) => { getProfile.getProfile(req, res, db) })

// POST IMAGE and INCREASE ENTRIES
app.put('/image', (req, res) => { handleImage.handleImage(req, res, db) })

app.listen(3001, () => {
  console.log('app is running on port 3001');
})