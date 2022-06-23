import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { axios } from '../utils/axios';
import { Box, LoadingOverlay } from '@mantine/core';

import {SocketContext} from "../contexts/SocketContext"
import Player from '../components/Player';
import ChatBox from '../components/ChatBox';
import { AuthContext } from '../contexts/AuthContext';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const {socket} = useContext(SocketContext);
    const {username} = useContext(AuthContext);
    const {id, roomid} = useParams()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
            .then(res => setMovieDetails(res.data[0]))
    }, [])

    useEffect(() => {
        if(roomid && socket){
            socket.emit("join_room", {roomID: roomid, username: username, movieID: id})
        }
    }, [roomid, socket])

    return (
        movieDetails === null ?
            <LoadingOverlay visible={true} />
        :
            <Box sx={{height: '100vh', width: '100vw', overflow:'hidden', margin: 0, display: 'flex'}}>
                <Player url={movieDetails.movieurl}/>
                <ChatBox roomID={roomid} username={username} />
            </Box>
    )
}
