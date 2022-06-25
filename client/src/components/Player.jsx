import React, {useRef, useState, useContext, useEffect} from 'react';
import { Box, Group, Text } from '@mantine/core';
import { ArrowLeft, FastForward, Pause, Play, Rewind } from 'phosphor-react';
import ReactPlayer from 'react-player/file'

import PlayerControls from './PlayerControls';
import { PlayerContext } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';

const Player = ({url, roomID}) => {
    const {
        playerState,
        setPlayerState,
        volume,
        setVolume,
        handleMouseMove,
        controlVisible,
        setVolumeChange,
        setMute,
        setSeekBack,
        setSeekDown,
        setSeekUp,
        setSeekForward,
        setProgress,
        setSeek,
        setPlayPause,
    } = useContext(PlayerContext);
    const {socket} = useContext(SocketContext);

    const navigate = useNavigate()

    const playerRef = useRef(null)

    const handlePlayPause = (isPlay) => {
        setPlayPause(isPlay)
        socket.emit("on_play_pause", isPlay)
    }

    const handleProgress = (state) => {
        if(!playerState.seeking){
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
        if(!playerState.seeking){
            playerRef.current.seekTo(seekTime, "seconds");
        }
    }

    const handleSeekUp = () => {
        socket.emit("on_seek", seekTime)
        setPlayerState({...playerState, seeking: false, playing: true})
    }

    const handleSeekDown = () => {
        setPlayerState({...playerState, seeking: true, playing: false})
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

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

    useEffect(()=>{
        if(socket){
            socket.on("handle_play_pause", (isPlay) => {
                setPlayPause(isPlay)
            })
        }
    }, [socket, playerState])

    useEffect(()=>{
        if(socket){
            socket.on("handle_seek", (seekTime) => {
                playerRef.current.seekTo(seekTime, "seconds");
            })
        }
    }, [socket, playerState])

    useEffect(()=>{
        setPlayerState({...playerState, duration: duration})
    }, [duration])

    useEffect(()=>{
        if(volume === 0)
            setPlayerState({...playerState, muted: true})
        else
            setPlayerState({...playerState, muted: false})
    }, [volume])

    return (
        <Box onMouseMove={onMouseMove} sx={{height: '100%', backgroundColor: '#000', position: 'relative', flexGrow: 10}}>
            <Group spacing={24} sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100, transition: 'opacity .2s ease-out', opacity: !controlVisible ? 0 : 1}}>
                <Rewind size={32} weight="fill" cursor='pointer' onClick={handleSeekBack} />
                {!playerState.playing ? <Play onClick={() => handlePlayPause(false)} cursor='pointer' size={36} weight="fill" /> : <Pause onClick={() => handlePlayPause(true)} cursor='pointer' size={36} weight="fill" />}
                <FastForward size={32} cursor='pointer' weight="fill" onClick={handleSeekForward} />
            </Group>
            <Group onClick={handleBack} spacing={4} sx={{position: 'absolute', top: 20, left: 20, transition: '.2s ease-out', opacity: !controlVisible ? 0 : 1, zIndex: 100, cursor: 'pointer', '&:hover': {gap: 6, borderBottom: '1px solid #ffffff'}}}>
                <ArrowLeft size={16} weight="fill" />
                <Text>Back</Text>
            </Group>
            <ReactPlayer
                ref={playerRef}
                playing={playerState.playing}
                onProgress={handleProgress}
                controls={false}
                style={{position: 'absolute'}}
                volume={volume}
                muted={playerState.muted}
                height='100%'
                width='100%'
                url={"https://d15jncv4xxvixg.cloudfront.net/l4l2q6610.uofdezfuo5d.mp4.mp4"}
            />
            <PlayerControls
                muted={playerState.muted}
                volume={volume}
                playing={playerState.playing}

                duration={playerState.duration}
                elapsedTime={playerState.elapsedTime}
                loadedTime={playerState.loadedTime}

                onPlayPause={handlePlayPause}
                onSeek={handleSeek}
                onSeekUp={handleSeekUp}
                onSeekDown={handleSeekDown}
                onMute={handleMute}
                onVolumeChange={handleVolumeChange}
            />
        </Box>
    );
}

export default Player;
