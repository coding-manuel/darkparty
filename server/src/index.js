const express = require('express');
const session = require('express-session')
const morgan = require('morgan')
const cors = require('cors')
const {Server} = require('socket.io')
const { v4: uuidv4 } = require('uuid');
const { _ } = require('lodash')

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const pool = require('./utils/db');

//! Config

require('dotenv').config()

const rooms = []
//rooms -> [{roomID, movieID, users = [socketID: username]}]
const app = express()
const port = 9000

const server = require('http').createServer(app)
const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: 'true'
    }
})

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

//! Sockets

function findUser (socket) {
    const room = _.find(rooms, (room) => {
        return room
    })

    const user = room.users.filter((user) => socket.id in user)

    return {roomID: room.roomID, username: user[0][socket.id]}
}

io.on("connection", (socket) => {
    socket.on("create_room", (movieID, username) => {
        const roomID = uuidv4()
        rooms.push({roomID: roomID, movieID: movieID, users: []})
        socket.emit("send_roomID", {roomID: roomID})
    })

    socket.on("join_room", ({roomID, username, movieID}) => {
        const room = rooms.find(room => room.roomID === roomID)
        room.users.push({[socket.id]: username})
        socket.join(roomID)
        socket.to(roomID).emit("new_event", {username: username, message: 'joined the party'})
    })

    socket.on("send_message", (messageData) => {
        socket.to(messageData.room).emit("receive_message", messageData)
    })

    socket.on("on_play_pause", (roomID, username) => {
        const user = findUser(socket)
        socket.to(user.roomID).emit("handle_play_pause")
        socket.to(user.roomID).emit("new_event", {username: user.username, message: 'paused the movie'})
    })

    socket.on("disconnect", () => {
        try {
            const user = findUser(socket)

            rooms.find(room => {
                if(room.roomID === user.roomID){
                    room.users = room.users.filter((user) => !(socket.id in user))
                }
            })

            socket.to(user.roomID).emit("left_user", {username: user.username, message: 'left the party'})
        } catch (error) {
            console.log(error)
        }
    })
})

server.listen(port, () => {
    console.log(`App running on port ${port}.`)
})