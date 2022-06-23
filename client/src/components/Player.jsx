import React, {useRef, useState, useContext, useEffect} from 'react';
import { Box, Group } from '@mantine/core';
import { FastForward, Pause, Play, Rewind } from 'phosphor-react';
import ReactPlayer from 'react-player/file'

import PlayerControls from './PlayerControls';
import { PlayerContext } from '../contexts/PlayerContext';

const Player = ({url}) => {
    const {playerState, setPlayerState, volume, setVolume, handleMouseMove, controlVisible} = useContext(PlayerContext);

    const playerRef = useRef(null)

    const handlePlayPause = () => {
        setPlayerState({...playerState, playing: !playerState.playing})
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

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

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
                {!playerState.playing ? <Play onClick={handlePlayPause} cursor='pointer' size={36} weight="fill" /> : <Pause onClick={handlePlayPause} cursor='pointer' size={36} weight="fill" />}
                <FastForward size={32} cursor='pointer' weight="fill" onClick={handleSeekForward} />
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
