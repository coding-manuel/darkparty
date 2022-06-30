import { showNotification } from "@mantine/notifications";
import React, { useState, useEffect, useContext } from "react"
import { notificationStyles } from "../globalStyles";
import { SocketContext } from "./SocketContext";

export const PlayerContext = React.createContext()

export const PlayerProvider = ({children}) => {
    const [playerState, setPlayerState] = useState({
        url: '',
        mode: '',
        playing: false,
        seeking: false,
        ready: false,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        elapsedTime: 0,
        loadedTime: 0,
        playbackRate: 1.0,
        loop: false
    });
    const [selecting, setSelecting] = useState(true);
    const [volume, setVolume] = useState(1);
    const [controlVisible, setControlVisible] = useState(true);
    const [timer, setTimer] = useState(null);
    const [roomID, setRoomID] = useState(null);

    const {socket} = useContext(SocketContext);

    const handleMouseMove = () => {
        if(timer){
            clearTimeout(timer)
            setTimer(null)
        }
            setControlVisible(true)
        setTimer(setTimeout(() => {
            if(!playerState.seeking) setControlVisible(false)
        }, 2500))
    }

    const setPlayPause = (isPlay) => {
        setPlayerState({...playerState, playing: isPlay})
    }

    const setProgress = (state) => {
        if(!playerState.seeking){
            setPlayerState({...playerState, elapsedTime: state.playedSeconds, loadedTime: state.loadedSeconds})
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

    const setPlayerReady = () => {
        setPlayerState({...playerState, ready: true})
    }

    const setPlayerMode = ({url, mode, show}) => {
        console.log("dfgksdk")
        socket.emit('set_player', {url: url, mode: mode, roomID: roomID})
        setPlayerState(playerState => ({...playerState, url: url, mode: mode}))

        show && showNotification({
            title: 'Added to the player',
            styles: notificationStyles
        })
        setSelecting(false)
    }

    return(
        <PlayerContext.Provider value={{
            setVolumeChange,
            setMute,
            setSeekDown,
            setSeekUp,
            setProgress,
            setPlayPause,
            setPlayerState,
            setVolume,
            setSelecting,
            setPlayerMode,
            setPlayerReady,
            setRoomID,
            handleMouseMove,

            selecting,
            playerState,
            volume,
            controlVisible,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}