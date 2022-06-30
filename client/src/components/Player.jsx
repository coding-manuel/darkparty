import React, {useRef, useState, useContext, useEffect} from 'react';
import { Box, Group, Text, Center, Stack, ScrollArea, Title, Tabs, Button, ActionIcon } from '@mantine/core';
import { ArrowLeft, FastForward, Pause, Play, Rewind, X } from 'phosphor-react';
import ReactPlayer from 'react-player/file'

import PlayerControls from './PlayerControls';
import { PlayerContext } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import { axios } from '../utils/axios';
import MovieThumb from './MovieThumb';
import { MessageContext } from '../contexts/MessageContext';

const Player = ({url, roomID}) => {
    const [allMovies, setAllMovies] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [seeking, setSeeking] = useState(false);

    const {
        playerState,
        selecting,
        volume,
        controlVisible,
        handleMouseMove,
        setPlayerState,
        setVolume,
        setPlayerReady,
        setPlayPause,
        setSelecting,
        ready
    } = useContext(PlayerContext);
    const {socket} = useContext(SocketContext);
    const {setMessages} = useContext(MessageContext);

    const navigate = useNavigate()

    const playerRef = useRef(null)

    const handlePlayPause = (isPlay) => {
        setPlayPause(isPlay)
        socket.emit("on_play_pause", isPlay)
    }

    const handleProgress = (state) => {
        if(!seeking){
            socket.volatile.emit("handle_progress", {elapsedTime: state.playedSeconds})
            setPlayerState({...playerState, elapsedTime: state.playedSeconds, loadedTime: state.loadedSeconds})
        }
    }

    const handleSeekBack = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }

    const handleSeekForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }

    const handleSeek = (seekTime) => {
        socket.emit("on_seek", seekTime)
        playerRef.current.seekTo(seekTime, "seconds");
    }

    const handleSeekUp = () => {
        socket.emit("seek_complete")
        setSeeking(false)
    }

    const handleSeekDown = () => {
        setSeeking(true)
    }

    const handleMute = () => {
        setPlayerState({...playerState, muted: !playerState.muted})
    }

    const handleVolumeChange = (newValue) => {
        setVolume(newValue)
    }

    const onMouseMove = () => {
        handleMouseMove()
    }

    const handleBack = () => {
        navigate('/home')
    }

    // const handlePlayerReady = () => {
    //     console.log("ready")
    //     setPlayerReady()
    // }

    const onChange = (active, tabKey) => {
        setActiveTab(active);
    };

    const handleCloseClick = () => {
        setSelecting(false)
    }

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

    useEffect(() => {
        if(playerRef.current){
            playerRef.current.seekTo(playerState.startTime, "seconds");
            setPlayPause(playerState.startPlaying)
        }
    }, []);

    useEffect(()=>{
        if(socket){
            socket.on("handle_play_pause", (isPlay) => {
                setPlayPause(isPlay)
            })
        }
    }, [socket, playerState])

    useEffect(()=>{
        if(socket){
            socket.on("send_player", ({state, username}) => {
                setPlayerState(playerState => ({...playerState, url: state.url, mode: state.mode}))
                setSelecting(false)
                setMessages(messages => ([...messages, {username: username, message: "changed content"}]))
            })
        }
    }, [socket])

    useEffect(()=>{
        if(socket){
            socket.on("handle_seek", (seekTime) => {
                playerRef.current.seekTo(seekTime, "seconds");
                setSeeking(false)
            })
        }
    }, [socket, playerRef.current])

    useEffect(()=>{
        if(socket){
            socket.on("inform_seek", () => {
                setSeeking(true)
            })
        }
    }, [socket])

    useEffect(()=>{
        setPlayerState({...playerState, duration: duration})
    }, [duration])

    useEffect(()=>{
        if(volume === 0)
            setPlayerState({...playerState, muted: true})
        else
            setPlayerState({...playerState, muted: false})
    }, [volume])

    useEffect(() => {
        axios.get("/movie/getallmovie")
        .then(res => setAllMovies(res.data))
    }, []);

    return (
        <Box onMouseMove={onMouseMove} sx={{backgroundColor: '#000', position: 'relative', flexGrow: 2}}>
            {selecting &&
            <Box sx={{width: '100%', position: 'relative', zIndex: 90000, backdropFilter: 'blur(3px)'}}>
                {playerState.url !== '' && <ActionIcon sx={{position: 'absolute', right: 30, top: 16}} onClick={handleCloseClick}><X size={16} weight="fill" /></ActionIcon>}
                <Tabs active={activeTab} onTabChange={onChange} position='center' variant="pills" p={16} sx={{height: '100%'}}>
                    <Tabs.Tab label="Movies">
                        <Stack>
                            <ScrollArea scrollbarSize={4} sx={{height: '85vh'}}>
                                <Group grow position='center'>
                                    {allMovies.length !== 0 && allMovies.map(movie => {
                                    return (
                                        <MovieThumb movie={movie} />
                                    )
                                    })}
                                    {allMovies.length !== 0 && allMovies.map(movie => {
                                    return (
                                        <MovieThumb movie={movie} />
                                    )
                                    })}
                                    {allMovies.length !== 0 && allMovies.map(movie => {
                                    return (
                                        <MovieThumb movie={movie} />
                                    )
                                    })}
                                    {allMovies.length !== 0 && allMovies.map(movie => {
                                    return (
                                        <MovieThumb movie={movie} />
                                    )
                                    })}
                                </Group>
                            </ScrollArea>
                        </Stack>
                    </Tabs.Tab>
                    <Tabs.Tab label="Youtube">
                        <Stack>
                        </Stack>
                    </Tabs.Tab>
                </Tabs>
            </Box>}
            <>
                <Group spacing={24} sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100, transition: 'opacity .2s ease-out', opacity: !controlVisible ? 0 : 1}}>
                    <Rewind size={32} weight="fill" cursor='pointer' onClick={handleSeekBack} />
                    {!playerState.playing ? <Play onClick={() => handlePlayPause(true)} cursor='pointer' size={36} weight="fill" /> : <Pause onClick={() => handlePlayPause(false)} cursor='pointer' size={36} weight="fill" />}
                    <FastForward size={32} cursor='pointer' weight="fill" onClick={handleSeekForward} />
                </Group>
                <Group onClick={handleBack} spacing={4} sx={{position: 'absolute', top: 20, left: 20, transition: '.2s ease-out', opacity: !controlVisible ? 0 : 1, zIndex: 100, cursor: 'pointer', '&:hover': {gap: 6, borderBottom: '1px solid #ffffff'}}}>
                    <ArrowLeft size={16} weight="fill" />
                    <Text>Back</Text>
                </Group>
                <ReactPlayer
                    url={playerState.url}
                    ref={playerRef}
                    style={{position: 'absolute'}}
                    height='100%'
                    width='100%'

                    playing={!seeking ? playerState.playing : false}
                    controls={false}
                    volume={volume}
                    muted={playerState.muted}

                    onProgress={handleProgress}
                />
                <PlayerControls
                    muted={playerState.muted}
                    volume={volume}
                    playing={playerState.playing}

                    duration={playerState.duration}
                    elapsedTime={playerState.elapsedTime}
                    loadedTime={playerState.loadedTime}

                    onPlayPause={handlePlayPause}
                    onSeekUp={handleSeekUp}
                    onSeek={handleSeek}
                    onSeekDown={handleSeekDown}
                    onMute={handleMute}
                    onVolumeChange={handleVolumeChange}
                />
            </>
        </Box>
    );
}

export default Player;
