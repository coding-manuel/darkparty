import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axios } from '../utils/axios';
import { Box, Center, LoadingOverlay, Text, Button } from '@mantine/core';

import {SocketContext} from "../contexts/SocketContext"
import Player from '../components/Player';
import ChatBox from '../components/ChatBox';
import { AuthContext } from '../contexts/AuthContext';
import { PlayerContext } from '../contexts/PlayerContext';
import { MessageContext } from '../contexts/MessageContext';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const [joined, setJoined] = useState(null);

    const {socket} = useContext(SocketContext);
    const {setRoomID, setPlayerState} = useContext(PlayerContext);
    const {username} = useContext(AuthContext);
    const {setMessages} = useContext(MessageContext);

    const {id, roomid} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
            .then(res => setMovieDetails(res.data[0]))
    }, [])

    useEffect(() => {
        if(roomid && socket){
            socket.emit("join_room", {roomID: roomid, username: username, movieID: id}, ({joined, state}) => {
                setJoined(joined)
                setRoomID(roomid)
                setMessages([])
                setPlayerState(playerState => ({...playerState, url: state.url, mode: state.mode, playing: state.playing, elapsedTime: state.elapsedTime}))
            })
        }
    }, [roomid, socket])

    return (
        movieDetails === null && joined !== null ?
            <LoadingOverlay visible={true} />
        :
            joined ?
                <Box sx={{height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, display: 'flex'}}>
                    <Player roomID={roomid}/>
                    <ChatBox roomID={roomid} movieID={id} username={username} />
                </Box>:
                <Center>
                    <Text>Room not found</Text>
                    <Button>Go Home</Button>
                </Center>
    )
}
