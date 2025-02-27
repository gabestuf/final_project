require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
// middleware
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const UserRouter = require('./api/User')
const AuthRouter = require('./api/Auth')
const LeaderboardRouter = require('./api/Leaderboard')


// bodyParser
const bodyParser = require('express').json;
app.use(bodyParser())
// use ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())

//Routes
// home page
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/home', (req, res) => {
    res.render('home')
})
// login page
app.get('/login', (req, res) => {
    res.render('login')
})
// signup page
app.get('/signup', (req, res) => { // changed createaccount to signup cause that's what file is called (less confusion)
    res.render('signup')
})
// leaderboard page
app.get('/leaderboard', (req, res) => {
    res.render('leaderboard') // will change when these pages exist
})
// game page
app.get('/game', (req, res) => {
    res.render('game')
})
// Users route
app.use('/user', UserRouter)
// Auth route
app.use('/auth', AuthRouter)
// Leaderboard route
app.use('/leaderboard', LeaderboardRouter)


// connect to database, ASK ME FOR THE ENV VARIABLES OR THIS WILL NOT WORK!!, 
// if you do not need to test w/ database then comment out this code
// uncomment last comment (app.listen)
connectDB();

const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => {
    console.log("Connected to database");
    app.listen(3000 || process.env.PORT, () => console.log(`Server Started on Port ${process.env.PORT || 3000}`));
})

// app.listen(3000, () => console.log('Server Started on Port 3000'));
