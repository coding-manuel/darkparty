const express = require('express');
const session = require('express-session')
const morgan = require('morgan')
const cors = require('cors')

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const pool = require('./utils/db');

//! Config

require('dotenv').config()

const app = express()
const port = 9000

const server = require('http').createServer(app)

// session store and session config
const store = require('connect-pg-simple')(session)

//! Middleware

app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    })
)
app.use(express.urlencoded({ extended: true }))
app.use(morgan('common'))

app.use(
    session({
        store : new store({
            conString: "postgres://postgres:gautam1234@localhost:5432/darkparty"
        }),
        secret: process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)

//! Routes

app.use("/api/auth", authRoutes)
app.use("/api/movie", movieRoutes)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

server.listen(port, () => {
    console.log(`App running on port ${port}.`)
})