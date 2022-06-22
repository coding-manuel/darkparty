import React, {useRef, useState, useContext, useEffect} from 'react';
import { AspectRatio, Box } from '@mantine/core';
import ReactPlayer from 'react-player/file'

import PlayerControls from './PlayerControls';
import { PlayerContext } from '../contexts/PlayerContext';

const Player = ({url}) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const {playerState, setPlayerState, volume, setVolume} = useContext(PlayerContext);

    const playerRef = useRef(null)

    const handlePlayPause = () => {
        setPlayerState({...playerState, playing: !playerState.playing})
    }

    const handleProgress = (state) => {
        if(!playerState.seeking){
            setPlayerState({...playerState, elapsedTime: state.playedSeconds, loadedTime: state.loadedSeconds})
        }
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
        <Box sx={{height: '100%', backgroundColor: '#000', position: 'relative'}}>
            <ReactPlayer
                ref={playerRef}
                playing={playerState.playing}
                onProgress={handleProgress}
                controls={false}
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
