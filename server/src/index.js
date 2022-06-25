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
//rooms -> [{roomID, movieID, state = {playing, elapsedTime} users = [socketID: username]}]
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
    try {
        const room = _.find(rooms, (room) => {
            return room
        })

        if(!room) return false

        const user = room.users.filter((user) => socket.id in user)

        return {roomID: room.roomID, username: user[0][socket.id]}
    } catch (error) {
        console.log(error)
    }
}

function convertSeconds(seconds) {
    var convert = function(x) { return (x < 10) ? "0"+x : x; }

    let hours = convert(parseInt(seconds / (60*60)))
    let minutes = convert(parseInt(seconds / 60 % 60))
    let second = convert(parseInt(seconds) % 60)

    if(hours == 0)
        return minutes + ":" + second
    else
        return hours + ":" + minutes + ":" + second
}

io.on("connection", (socket) => {
    socket.on("create_room", (movieID, username) => {
        const roomID = uuidv4()
        rooms.push({roomID: roomID, movieID: movieID, users: []})
        socket.emit("send_roomID", {roomID: roomID})
    })

    socket.on("join_room", ({roomID, username, movieID}, callback) => {
        try {
            const room = rooms.find(room => room.roomID === roomID)
            if(room){
                room.users.push({[socket.id]: username})
                socket.join(roomID)
                socket.to(roomID).emit("new_event", {username: username, message: 'joined the party'})
                callback({
                    joined: true
                });
            }else{
                callback({
                    joined: false
                });
            }
        }
        catch(error){
            console.log(error)
        }
    })

    socket.on("send_message", (messageData) => {
        socket.to(messageData.room).emit("receive_message", messageData)
    })

    socket.on("on_play_pause", (isPlay) => {
        try {
            const user = findUser(socket)
            socket.to(user.roomID).emit("handle_play_pause", isPlay)
            socket.broadcast.to(user.roomID).emit("new_event", {username: user.username, message: isPlay ? 'played the movie' : 'paused the movie'})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("on_seek", (seekTime) => {
        try {
            const user = findUser(socket)
            socket.to(user.roomID).emit("handle_seek", seekTime)
            socket.to(user.roomID).emit("new_event", {username: user.username, message: `seeked to ${convertSeconds(seekTime)}`})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("disconnect", () => {
        try {
            const user = findUser(socket)
            if(user){
                rooms.find(room => {
                    if(room.roomID === user.roomID){
                        room.users = room.users.filter((user) => !(socket.id in user))
                    }
                })
                socket.to(user.roomID).emit("left_user", {username: user.username, message: 'left the party'})
            }
        } catch (error) {
            console.log(error)
        }
    })
})

server.listen(port, () => {
    console.log(`App running on port ${port}.`)
})