import React, { useState, useEffect } from "react"

export const PlayerContext = React.createContext()

export const PlayerProvider = ({children}) => {
    const [playerState, setPlayerState] = useState({
        url: null,
        playing: true,
        seeking: false,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        elapsedTime: 0,
        loadedTime: 0,
        playbackRate: 1.0,
        loop: false
    });
    const [volume, setVolume] = useState(1);
    const [controlVisible, setControlVisible] = useState(false);
    const [timer, setTimer] = useState(null);

    const handleMouseMove = () => {
        if(timer){
            clearTimeout(timer)
            setTimer(null)
        }
            setControlVisible(true)
        setTimer(setTimeout(() => {
            if(!playerState.seeking) setControlVisible(false)
        }, 1500))
    }

    const setPlayPause = (isPlay) => {
        setPlayerState({...playerState, playing: isPlay})
    }

    const setProgress = (state) => {
        if(!playerState.seeking){
            setPlayerState({...playerState, elapsedTime: state.playedSeconds, loadedTime: state.loadedSeconds})
        }
    }

    const setSeekBack = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }

    const setSeekForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }

    const setSeek = (seekTime) => {
        if(!playerState.seeking){
            playerRef.current.seekTo(seekTime, "seconds");
        }
    }

    const setSeekUp = () => {
        setPlayerState({...playerState, seeking: false, playing: true})
    }

    const setSeekDown = () => {
        setPlayerState({...playerState, seeking: true, playing: false})
    }

    const setMute = () => {
        setPlayerState({...playerState, muted: !playerState.muted})
    }

    const setVolumeChange = (newValue) => {
        setVolume(newValue)
    }

    return(
        <PlayerContext.Provider value={{
            setVolumeChange,
            setMute,
            setSeekBack,
            setSeekDown,
            setSeekUp,
            setSeekForward,
            setProgress,
            setSeek,
            setPlayPause,
            playerState,
            setPlayerState,
            volume,
            setVolume,
            controlVisible,
            handleMouseMove
        }}>
            {children}
        </PlayerContext.Provider>
    )
}